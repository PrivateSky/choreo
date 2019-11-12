let cm = require("callflow");


let swarmUtils = require("./swarmTypes/swarm_template");


$$.swarms           = cm.createSwarmEngine("swarm", swarmUtils);
$$.swarm            = $$.swarms;
