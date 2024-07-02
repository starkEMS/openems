package io.openems.edge.ess.socomec;

import io.openems.common.types.OptionsEnum;
import io.openems.edge.bridge.modbus.api.ElementToChannelConverter;

public enum AlarmStatus implements OptionsEnum {
	UNDEFINED(-1, "Undefined"), //
	GROUND_FAULT(0, "GROUND_FAULT"), //
	DC_OVER_VOLT(1, "DC_OVER_VOLT"), //
	AC_DISCONNECT(2, "AC_DISCONNECT"), //
	DC_DISCONNECT(3, "DC_DISCONNECT"), //
	GRID_DISCONNECT(4, "GRID_DISCONNECT"), //
	CABINET_OPEN(5, "CABINET_OPEN"), //
	MANUAL_SHUTDOWN(6, "MANUAL_SHUTDOWN"), //
	OVER_TEMP(7, "OVER_TEMP"), //
	OVER_FREQUENCY(8, "OVER_FREQUENCY"), //
	UNDER_FREQUENCY(9, "UNDER_FREQUENCY"), //
	AC_OVER_VOLT(10, "AC_OVER_VOLT"), //
	AC_UNDER_VOLT(11, "AC_UNDER_VOLT"), //
	BLOWN_STRING_FUSE(12, "BLOWN_STRING_FUSE"), //
	UNDER_TEMP(13, "UNDER_TEMP"), //
	MEMORY_LOSS(14, "MEMORY_LOSS"), //
	HW_TEST_FAILURE(15, "HW_TEST_FAILURE"), //
	MANUFACTURER_ALRM(16, "MANUFACTURER_ALRM"); //

	private final int value;
	private final String name;

	AlarmStatus(int value, String name) {
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
				for (AlarmStatus a : AlarmStatus.values()) {
					if (((s >>> 0) & a.value) != 0) return a;
				}
				return UNDEFINED;
			});
}
