package io.openems.edge.controller.ess.imbalance.edmij;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.AttributeType;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(//
		name = "Controller io.openems.edge.controller.ess.imbalance.edmij", //
		description = "")
@interface Config {

	@AttributeDefinition(name = "Component-ID", description = "Unique ID of this Component")
	String id() default "ctrlio.openems.edge.controller.ess.imbalance.edmij0";

	@AttributeDefinition(name = "Alias", description = "Human-readable name of this Component; defaults to Component-ID")
	String alias() default "";

	@AttributeDefinition(name = "Is enabled?", description = "Is this Component enabled?")
	boolean enabled() default true;
	
	@AttributeDefinition(name = "Edmij Email", description = "Email account to authenticate with the Edmij API")
	String email();

	@AttributeDefinition(name = "Edmij Password", description = "Password to authenticate with the Edmij API", type = AttributeType.PASSWORD)
	String password();
	
	@AttributeDefinition(name = "Ess-ID", description = "ID of Ess device.")
	String ess_id();

	@AttributeDefinition(name = "Grid-Meter-ID", description = "ID of the Grid-Meter.")
	String meter_id();
	
	@AttributeDefinition(name = "Imbalance Lower Threshold", description = "The lower threshold for the imbalance price when to use from grid in euro per MhW, default is 0")
	double imbalanceLowerThreshold() default 0;
	
	@AttributeDefinition(name = "Imbalance Upper Threshold", description = "The upper threshold for the imbalance price when to use from grid in euro per MhW, default is 100")
	double imbalanceUpperThreshold() default 100;
	

	String webconsole_configurationFactory_nameHint() default "Controller io.openems.edge.controller.ess.imbalance.edmij [{id}]";

}