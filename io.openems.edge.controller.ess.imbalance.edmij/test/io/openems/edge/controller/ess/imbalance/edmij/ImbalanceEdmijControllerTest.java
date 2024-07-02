package io.openems.edge.controller.ess.imbalance.edmij;

import org.junit.Test;

import io.openems.common.types.ChannelAddress;
import io.openems.edge.common.test.DummyConfigurationAdmin;
import io.openems.edge.common.test.AbstractComponentTest.TestCase;
import io.openems.edge.controller.test.ControllerTest;
import io.openems.edge.ess.test.DummyManagedSymmetricEss;
import io.openems.edge.ess.test.DummyPower;
import io.openems.edge.meter.test.DummyElectricityMeter;

public class ImbalanceEdmijControllerTest {

	private static final String CTRL_ID = "ctrl0";
	private static final String ESS_ID = "ess0";
	private static final ChannelAddress ESS_ACTIVE_POWER = new ChannelAddress(ESS_ID, "ActivePower");
	private static final ChannelAddress ESS_SET_ACTIVE_POWER_EQUALS = new ChannelAddress(ESS_ID,
			"SetActivePowerEquals");

	private static final String METER_ID = "meter0";
	private static final ChannelAddress METER_ACTIVE_POWER = new ChannelAddress(METER_ID, "ActivePower");

	@Test
	public void test() throws Exception {
		new ControllerTest(new ImbalanceEdmijControllerImpl()) //
		.addReference("cm", new DummyConfigurationAdmin()) //
		.addReference("ess", new DummyManagedSymmetricEss(ESS_ID) //
				.setPower(new DummyPower(0.3, 0.3, 0.1))) //
		.addReference("meter", new DummyElectricityMeter(METER_ID)) //
		.activate(MyConfig.create() //
				.setId(CTRL_ID) //
				.setEssId(ESS_ID) //
				.setMeterId(METER_ID) //
				.build())
				.next(new TestCase());
	}

}
