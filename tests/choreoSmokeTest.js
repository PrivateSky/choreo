require('../../../psknode/bundles/pskruntime');
let dc = require('../../double-check');
let assert = dc.assert;
let choreo = require('../index');

let swarmCommunicationStrategy = choreo.createCommunicationStrategy("local");
let nameService = choreo.createNameService("default");
let serialisationStrategy = choreo.createSerialisationStrategy();
let securityContext = choreo.createSecurityContext();

choreo.initialiseSwarmEngine(swarmCommunicationStrategy, nameService, serialisationStrategy, securityContext);

$$.swarm.define("TestSwarm", {

})
