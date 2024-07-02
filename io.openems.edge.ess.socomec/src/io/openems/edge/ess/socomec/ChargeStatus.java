package io.openems.edge.ess.socomec;

import io.openems.common.types.OptionsEnum;
import io.openems.edge.bridge.modbus.api.ElementToChannelConverter;

public enum ChargeStatus implements OptionsEnum {
	UNDEFINED(-1, "Undefined"), //
	OFF(1, "OFF"), //
	EMPTY(2, "EMPTY"), //
	DISCHARGING(3, "DISCHARGING"), //
	CHARGING(4, "CHARGING"), //
	FULL(5, "FULL"), //
	HOLDING(6, "HOLDING"), //
	TESTING(7, "TESTING"); //

	private final int value;
	private final String name;

	ChargeStatus(int value, String name) {
		this.value = value;
		this.name = name;
	}

	@Override
	public int getValue() {
		return this.value;
	}

	@Override
	public String getName() {
		return this.name;
	}

	@Override
	public OptionsEnum getUndefined() {
		return UNDEFINED;
	}

	public static final ElementToChannelConverter STATUS_CONVERTER = new ElementToChannelConverter(//
			// element -> channel
			value -> {
				int s = (int) value;
				for (ChargeStatus a : ChargeStatus.values()) {
					if (s == a.value) return a;
				}
				return UNDEFINED;
			});
}
