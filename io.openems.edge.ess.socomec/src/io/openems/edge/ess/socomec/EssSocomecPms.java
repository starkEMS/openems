package io.openems.edge.ess.socomec;

import io.openems.common.channel.AccessMode;
import io.openems.common.types.OpenemsType;
import io.openems.edge.bridge.modbus.api.ModbusComponent;
import io.openems.edge.common.channel.Doc;
import io.openems.edge.common.component.OpenemsComponent;
import io.openems.edge.common.modbusslave.ModbusSlave;
import io.openems.edge.ess.api.ManagedSymmetricEss;

public interface EssSocomecPms extends ManagedSymmetricEss, ModbusComponent, ModbusSlave, OpenemsComponent {
  enum ChannelId implements io.openems.edge.common.channel.ChannelId {
    STATUS(Doc.of(Status.values())
        .accessMode(AccessMode.READ_WRITE)),
    HEARTBEAT(Doc.of(OpenemsType.INTEGER)
        .accessMode(AccessMode.READ_ONLY)),
    CHARGE_SATUS(Doc.of(ChargeStatus.values()).accessMode(AccessMode.READ_ONLY)),
    BATTERY_SATUS(Doc.of(BatteryStatus.values()).accessMode(AccessMode.READ_ONLY)),
    BATTERY_EVENT(Doc.of(BatteryEvent.values()).accessMode(AccessMode.READ_ONLY)),
    ALARM(Doc.of(AlarmStatus.values()));
    private final Doc doc;

    ChannelId(Doc doc) {
      this.doc = doc;
    }

    @Override
    public Doc doc() {
      return this.doc;
    }
  }
}
