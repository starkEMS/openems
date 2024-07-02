package io.openems.edge.ess.socomec;

import io.openems.common.types.OptionsEnum;
import io.openems.edge.bridge.modbus.api.ElementToChannelConverter;

public enum BatteryStatus implements OptionsEnum {
	UNDEFINED(-1, "Undefined"), //
	DISCONNECTED(1, "DISCONNECTED"), //
	INITIALIZING(2, "INITIALIZING"), //
	CONNECTED(3, "CONNECTED"), //
	STANDBY(4, "STANDBY"), //
	SOC_PROTECTION(5, "SOC_PROTECTION"), //
	SUSPENDING(6, "SUSPENDING"), //
	FAULT(99, "FAULT"); //

	private final int value;
	private final String name;

	BatteryStatus(int value, String name) {
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
				for (BatteryStatus a : BatteryStatus.values()) {
					if (s == a.value) return a;
				}
				return UNDEFINED;
			});
}
