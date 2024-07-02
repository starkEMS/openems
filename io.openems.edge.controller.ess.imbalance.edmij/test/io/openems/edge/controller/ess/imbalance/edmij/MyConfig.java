package io.openems.edge.controller.ess.imbalance.edmij;

import io.openems.common.test.AbstractComponentConfig;
import io.openems.common.utils.ConfigUtils;

@SuppressWarnings("all")
public class MyConfig extends AbstractComponentConfig implements Config {

	protected static class Builder {
		private String id;
		private String email;
		private String password;
		private double imbalanceLowerThreshold;
		private double imbalanceUpperThreshold;
		private String ess_id;
		private String meter_id;

		private Builder() {
		}

		public Builder setId(String id) {
			this.id = id;
			return this;
		}

		public MyConfig build() {
			return new MyConfig(this);
		}
		
		
		public Builder setEmail(String email) {
			this.email = email;
			return this;
		}
		
		public Builder setPassword(String password) {
			this.password = password;
			return this;
		}
		
		public Builder setImbalanceLowerThreshold(double imbalanceLowerThreshold) {
			this.imbalanceLowerThreshold = imbalanceLowerThreshold;
			return this;
		}
		
		public Builder setImbalanceUpperThreshold(double imbalanceUpperThreshold) {
			this.imbalanceUpperThreshold = imbalanceUpperThreshold;
			return this;
		}
		
		public Builder setEssId(String ess_id) {
			this.ess_id = ess_id;
			return this;
		}
		
		public Builder setMeterId(String meter_id) {
			this.meter_id = meter_id;
			return this;
		}
		
	}

	/**
	 * Create a Config builder.
	 * 
	 * @return a {@link Builder}
	 */
	public static Builder create() {
		return new Builder();
	}

	private final Builder builder;

	private MyConfig(Builder builder) {
		super(Config.class, builder.id);
		this.builder = builder;
	}

	@Override
	public String email() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String password() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public double imbalanceLowerThreshold() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public double imbalanceUpperThreshold() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public String ess_id() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String meter_id() {
		// TODO Auto-generated method stub
		return null;
	}


}