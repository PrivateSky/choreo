let cm = require("callflow");


let swarmUtils = require("./swarmTypes/swarm_template");


$$.swarms           = cm.createSwarmEngine("swarm", swarmUtils);
$$.swarm            = $$.swarms;

$$.swarmInstanceManager = require("./swarmTypes/choreographies/swarmInstancesManager");

function SwarmEngine(swarmCommunicationStrategy, nameService, serialisationStrategy, securityContext){

}

module.exports = {
    initialiseSwarmEngine:function(swarmCommunicationStrategy, nameService, serialisationStrategy, securityContext){
        return new SwarmEngine(swarmCommunicationStrategy, nameService, serialisationStrategy, securityContext);
    },
    createSerialisationStrategy:function(strategyName, ...args){
        switch(strategyName){
            case "JSON":return require("strategies/JSONSerialisationStrategy").crateStrategy(args);
            default: console.error("Unknown strategy ", strategyName);
        }
        return undefined;
    },
    createCommunicationStrategy:function(strategyName, ...args){
        switch(strategyName){
            case "fake":return require("strategies/fakeCommunicationStrategy").crateStrategy(args);
            case "sandbox":return require("strategies/fakeCommunicationStrategy").crateStrategy(args);
            case "serviceWorkers":return require("strategies/fakeCommunicationStrategy").crateStrategy(args);
            default: console.error("Unknown strategy ", strategyName);
        }
        return undefined;
    },
    createNameService:function(strategyName, ...args){
        switch(strategyName){
            case "default":return require("strategies/defaultNameService").crateStrategy(args);
            default: console.error("Unknown strategy ", strategyName);
        }
        return undefined;
    },
    createSecurityContext:function(strategyName, ...args){
        switch(strategyName){
            case "default":return require("strategies/defaultSecurityContext").crateStrategy(args);
            case "CSB":return require("strategies/defaultSecurityContext").crateStrategy(args);
            case "sandbox":return require("strategies/defaultSecurityContext").crateStrategy(args);
            case "rootCSB":return require("strategies/defaultSecurityContext").crateStrategy(args);
            default: console.error("Unknown strategy ", strategyName);
        }
        return undefined;
    }
}