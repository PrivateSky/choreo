let cm = require("callflow");
let CNST = require("../moduleConstants");

let beesHealer = require("swarmutils").beesHealer;

exports.createForObject = function(valueObject, thisObject, localId){

    function messageIdentityFilter (valueObject){
        return valueObject.meta.swarmId;
    }

    let swarmFunction = function(context, phaseName){
        let args =[];
        for(let i = 2; i < arguments.length; i++){
            args.push(arguments[i]);
        }

        //make the execution at level 0  (after all pending events) and wait to have a swarmId
        ret.observe(function(){
            beesHealer.asJSON(valueObject, phaseName, args, function(err,jsMsg){
                jsMsg.meta.target = context;
                var subscribersCount = $$.PSK_PubSub.publish($$.CONSTANTS.SWARM_FOR_EXECUTION, jsMsg);
                if(!subscribersCount){
                    console.log(`Nobody listening for <${$$.CONSTANTS.SWARM_FOR_EXECUTION}>!`);
                }
            });
        },null,null);

        ret.notify();


        return thisObject;
    };

    let asyncReturn = function(err, result){
        let context = valueObject.protectedVars.context;

        if(!context && valueObject.meta.waitStack){
            context = valueObject.meta.waitStack.pop();
            valueObject.protectedVars.context = context;
        }

        beesHealer.asJSON(valueObject, "__return__", [err, result], function(err,jsMsg){
            jsMsg.meta.command = "asyncReturn";
            if(!context){
                context = valueObject.meta.homeSecurityContext;//TODO: CHECK THIS

            }
            jsMsg.meta.target = context;

            if(!context){
                $$.err(new Error("Asynchronous return inside of a swarm that does not wait for results"));
            } else {
                $$.PSK_PubSub.publish($$.CONSTANTS.SWARM_FOR_EXECUTION, jsMsg);
            }
        });
    };

    function home(err, result){
        beesHealer.asJSON(valueObject, "home", [err, result], function(err,jsMsg){
            let context = valueObject.meta.homeContext;
            jsMsg.meta.target = context;
            $$.PSK_PubSub.publish($$.CONSTANTS.SWARM_FOR_EXECUTION, jsMsg);
        });
    }

    function waitResults(callback, keepAliveCheck, swarm){
        if(!swarm){
            swarm = this;
        }
        if(!keepAliveCheck){
            keepAliveCheck = function(){
                return false;
            }
        }
        var inner = swarm.getInnerValue();
        if(!inner.meta.waitStack){
            inner.meta.waitStack = [];
            inner.meta.waitStack.push($$.securityContext)
        }
        $$.swarmsInstancesManager.waitForSwarm(callback, swarm, keepAliveCheck);
    }


    let ret = cm.createStandardAPIsForSwarms(valueObject, thisObject, localId);

    ret.swarm           = swarmFunction;
    ret.home            = home;
    ret.onReturn        = waitResults;
    ret.onResult        = waitResults;
    ret.asyncReturn     = asyncReturn;
    ret.return          = asyncReturn;


    ret.autoInit        = function(blockchain){

    };

    return ret;
};