let cm = require("callflow");
let swarmUtils = require("./swarmTypes/swarm_template");

$$.swarmInstanceManager = require("./swarmTypes/choreographies/swarmInstancesManager");


$$.swarms           = cm.createSwarmEngine("swarm", swarmUtils);
$$.swarm            = $$.swarms;
