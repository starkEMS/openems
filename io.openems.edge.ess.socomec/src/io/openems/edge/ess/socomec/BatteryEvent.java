package io.openems.edge.ess.socomec;

import io.openems.common.types.OptionsEnum;
import io.openems.edge.bridge.modbus.api.ElementToChannelConverter;

public enum BatteryEvent implements OptionsEnum {
	UNDEFINED(-1, "Undefined"), //
	COMMUNICATION_ERROR(0, "COMMUNICATION_ERROR"), //
	OVER_TEMP_ALARM(1, "OVER_TEMP_ALARM"), //
	OVER_TEMP_WARNING(2, "OVER_TEMP_WARNING"), //
	UNDER_TEMP_ALARM(3, "UNDER_TEMP_ALARM"), //
	UNDER_TEMP_WARNING(4, "UNDER_TEMP_WARNING"), //
	OVER_CHARGE_CURRENT_ALARM(5, "OVER_CHARGE_CURRENT_ALARM"), //
	OVER_CHARGE_CURRENT_WARNING(6, "OVER_CHARGE_CURRENT_WARNING"), //
	OVER_DISCHARGE_CURRENT_ALARM(7, "OVER_DISCHARGE_CURRENT_ALARM"), //
	OVER_DISCHARGE_CURRENT_WARNING(8, "OVER_DISCHARGE_CURRENT_WARNING"), //
	OVER_VOLT_ALARM(9, "OVER_VOLT_ALARM"), //
	OVER_VOLT_WARNING(10, "OVER_VOLT_WARNING"), //
	UNDER_VOLT_ALARM(11, "UNDER_VOLT_ALARM"), //
	UNDER_VOLT_WARNING(12, "UNDER_VOLT_WARNING"), //
	UNDER_SOC_MIN_ALARM(13, "UNDER_SOC_MIN_ALARM"), //
	UNDER_SOC_MIN_WARNING(14, "UNDER_SOC_MIN_WARNING"), //
	OVER_SOC_MAX_ALARM(15, "OVER_SOC_MAX_ALARM"), //
	OVER_SOC_MAX_WARNING(16, "OVER_SOC_MAX_WARNING"), //
	VOLTAGE_IMBALANCE_WARNING(17, "VOLTAGE_IMBALANCE_WARNING"), //
	TEMPERATURE_IMBALANCE_ALARM(18, "TEMPERATURE_IMBALANCE_ALARM"), //
	TEMPERATURE_IMBALANCE_WARNING(19, "TEMPERATURE_IMBALANCE_WARNING"), //
	CONTACTOR_ERROR(20, "CONTACTOR_ERROR"), //
	FAN_ERROR(21, "FAN_ERROR"), //
	GROUND_FAULT(22, "GROUND_FAULT"), //
	OPEN_DOOR_ERROR(23, "OPEN_DOOR_ERROR"), //
	CURRENT_IMBALANCE_WARNING(24, "CURRENT_IMBALANCE_WARNING"), //
	OTHER_ALARM(25, "OTHER_ALARM"), //
	OTHER_WARNING(26, "OTHER_WARNING"), //
	RESERVED_1(27, "RESERVED_1"), //
	CONFIGURATION_ALARM(28, "CONFIGURATION_ALARM"), //
	CONFIGURATION_WARNING(29, "CONFIGURATION_WARNING"); //

	private final int value;
	private final String name;

	BatteryEvent(int value, String name) {
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
				for (BatteryEvent a : BatteryEvent.values()) {
					if (((s >>> 0) & a.value) != 0) return a;
				}
				return UNDEFINED;
			});
}
