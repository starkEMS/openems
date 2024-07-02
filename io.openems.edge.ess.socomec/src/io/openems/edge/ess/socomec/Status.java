package io.openems.edge.ess.socomec;

import io.openems.common.types.OptionsEnum;
import io.openems.edge.bridge.modbus.api.ElementToChannelConverter;

public enum Status implements OptionsEnum {
	UNDEFINED(-1, "Undefined"), //
	OFF(0, "Off"), //
	SLEEPING(1, "Sleeping"), //
	STARTING(2, "Starting"), //
	RUNNING(3, "Running"), //
	THROTTLED(4, "Throttled"), //
	SHUTTING_DOWN(5, "Shutting down"), //
	FAULT(6, "Fault"), //
	STANDBY(7, "Standby"); //

	private final int value;
	private final String name;

	Status(int value, String name) {
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
				for (Status a : Status.values()) {
					if (s == a.value) return a;
				}
				return UNDEFINED;
			});
}
