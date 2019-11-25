let cm = require("callflow");
let swarmUtils = require("./swarmTypes/swarm_template");
const SwarmEngine = require('../swarm-engine');

//$$.swarmInstanceManager = require("./swarmTypes/choreographies/swarmInstancesManager");

let nameService = SwarmEngine.createNameService("default");
let serialisationStrategy = SwarmEngine.createSerialisationStrategy("json");
let swarmCommunicationStrategy = SwarmEngine.createCommunicationStrategy("local", nameService, serialisationStrategy);
let securityContext = SwarmEngine.createSecurityContext();

SwarmEngine.initialiseSwarmEngine(swarmCommunicationStrategy, nameService, serialisationStrategy, securityContext);

$$.swarms           = cm.createSwarmEngine("swarm", swarmUtils);
$$.swarm            = $$.swarms;
