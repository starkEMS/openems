package io.openems.edge.controller.ess.imbalance.edmij;

import java.time.ZonedDateTime;
import java.util.List;

import org.osgi.service.cm.ConfigurationAdmin;
import org.osgi.service.component.ComponentContext;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.ConfigurationPolicy;
import org.osgi.service.component.annotations.Deactivate;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.metatype.annotations.Designate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import io.openems.common.exceptions.OpenemsError;
import io.openems.common.exceptions.OpenemsError.OpenemsNamedException;
import io.openems.edge.common.component.AbstractOpenemsComponent;
import io.openems.edge.common.component.OpenemsComponent;
import io.openems.edge.controller.api.Controller;
import io.openems.edge.controller.ess.imbalance.edmij.api.EdmijImbalancePredictor;
import io.openems.edge.controller.ess.imbalance.edmij.api.Perdiction;
import io.openems.edge.ess.api.ManagedSymmetricEss;
import io.openems.edge.meter.api.ElectricityMeter;

@Designate(ocd = Config.class, factory = true)
@Component(//
		name = "Controller.io.openems.edge.controller.ess.imbalance.edmij", //
		immediate = true, //
		configurationPolicy = ConfigurationPolicy.REQUIRE //
)
public class ImbalanceEdmijControllerImpl extends AbstractOpenemsComponent implements ImbalanceEdmijController, Controller, OpenemsComponent {

	private final Logger log = LoggerFactory.getLogger(ImbalanceEdmijControllerImpl.class);

	@Reference
	private ConfigurationAdmin cm;
	
	private Config config = null;
	private EdmijImbalancePredictor predictor;

	@Reference
	private ManagedSymmetricEss ess;

	@Reference
	private ElectricityMeter meter;

	public ImbalanceEdmijControllerImpl() {
		super(//
				OpenemsComponent.ChannelId.values(), //
				Controller.ChannelId.values(), //
				ImbalanceEdmijController.ChannelId.values() //
		);
	}

	@Activate
	private void activate(ComponentContext context, Config config) {
		super.activate(context, config.id(), config.alias(), config.enabled());
		this.config = config;
		this.predictor = new EdmijImbalancePredictor(config.email(), config.password(), false);
		if (OpenemsComponent.updateReferenceFilter(this.cm, this.servicePid(), "ess", config.ess_id())) {
			return;
		}
		OpenemsComponent.updateReferenceFilter(this.cm, this.servicePid(), "meter", config.meter_id());
	}

	@Deactivate
	protected void deactivate() {
		super.deactivate();
	}

	@Override
	public void run() throws OpenemsNamedException {
		try {
			List<Perdiction> predictions = this.predictor.predict(ZonedDateTime.now().minusMinutes(5));
			Perdiction prediction = predictions.get(predictions.size() - 1);
            this.channel(ImbalanceEdmijController.ChannelId.PREDICTED_IMPORT_PRICE).setNextValue(prediction.priceTake());
            this.channel(ImbalanceEdmijController.ChannelId.PREDICTED_EXPORT_PRICE).setNextValue(prediction.priceFeed());
            this.channel(ImbalanceEdmijController.ChannelId.PREDICTED_TIMESTAMP).setNextValue(prediction.startDateTime());
            
			if (prediction.priceTake() > this.config.imbalanceUpperThreshold()) {
				this.usePowerFromEss();
			} else if(this.config.imbalanceLowerThreshold() <= 0 && prediction.priceFeed() < this.config.imbalanceLowerThreshold()) {
				this.usePowerFromGrid();
			}
            
        } catch (Exception e) {
            throw new OpenemsNamedException(OpenemsError.GENERIC, e.getMessage());
			
		}
	}

	private void usePowerFromGrid() throws OpenemsNamedException {
		if (this.ess.getActivePower().getOrError() > 0) {
			this.ess.setActivePowerEqualsWithPid(0);
			this.ess.setReactivePowerEquals(0);
		}
	}

	private void usePowerFromEss() throws OpenemsNamedException {
		if (this.meter.getActivePower().getOrError() > 0) {
			var calculatedPower = this.meter.getActivePower().getOrError() +  this.ess.getActivePower().getOrError();
			this.ess.setActivePowerEqualsWithPid(calculatedPower);
			this.ess.setReactivePowerEquals(0);
		}		
	}
}
