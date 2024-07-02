package io.openems.edge.controller.ess.imbalance.edmij;

import io.openems.common.channel.Unit;
import io.openems.common.types.OpenemsType;
import io.openems.edge.common.channel.Doc;
import io.openems.edge.common.component.OpenemsComponent;
import io.openems.edge.controller.api.Controller;

public interface ImbalanceEdmijController extends Controller, OpenemsComponent {

	public enum ChannelId implements io.openems.edge.common.channel.ChannelId {
		PREDICTED_IMPORT_PRICE(Doc.of(OpenemsType.FLOAT).unit(Unit.EUROS_PER_MEGAWATT_HOUR)),
		PREDICTED_EXPORT_PRICE(Doc.of(OpenemsType.FLOAT).unit(Unit.EUROS_PER_MEGAWATT_HOUR)),
		PREDICTED_TIMESTAMP(Doc.of(OpenemsType.STRING).text("Timestamp of the prediction"));

		private final Doc doc;

		private ChannelId(Doc doc) {
			this.doc = doc;
		}

		@Override
		public Doc doc() {
			return this.doc;
		}
	}

}
