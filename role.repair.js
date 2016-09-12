/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.repair');
 * mod.thing == 'a thing'; // true
 */
var roleRepair = {
    run: function(creep) {
        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvesting');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('building');
	    }
        if(creep.memory.building) {
            var structure = creep.room.find(FIND_STRUCTURES, {
            filter: function(structure) {
                return structure.hits < structure.hitsMax / 2;
            }
            });
           
            if (structure.length){
                if(creep.repair(creep.pos.findClosestByPath(structure)) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.pos.findClosestByPath(structure));
                    creep.say('moving');
                }
               creep.say('repairing');
                console.log(roadToRepair);
                // perhaps check the results again?
            
            } 
            else {
            
                 creep.say("Des heures sup'!");
            
            }
        }
        else {
            
            var sources = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN) && structure.energy == structure.energyCapacity;
                    }
            });
           if (sources.length){
               if(creep.withdraw(creep.pos.findClosestByPath(sources),RESOURCE_ENERGY,100) == ERR_NOT_IN_RANGE) {
                   creep.moveTo(creep.pos.findClosestByPath(sources));
               }
           }
           else {
                var sources = creep.room.find(FIND_SOURCES);
               
                if(creep.harvest(creep.pos.findClosestByPath(sources)) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.pos.findClosestByPath(sources));
                }
           }
	    }
    }
};
module.exports = roleRepair;