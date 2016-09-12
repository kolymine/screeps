var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepair = require('role.repair');

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');        

    console.log('Harvesters: ' + harvesters.length);

    if(harvesters.length < 10) {
        var newName = Game.spawns['Spawn1'].createCreep(roleHarvester.getBodyParts(), 'Harvester'+Game.time, {role: 'harvester'});
    }
    else if(upgraders.length<2) {
        var newName = Game.spawns['Spawn1'].createCreep(roleUpgrader.getBodyParts(), 'Upgrader'+Game.time, {role: 'upgrader'});
    }
    else if(builders.length < 2) {
        var newName = Game.spawns['Spawn1'].createCreep(roleBuilder.getBodyParts(), 'Builder'+Game.time, {role: 'builder'});
    }
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(!creep.memory.role){
            creep.memory.role='harvester';
        roleHarvester.run(creep);
        }
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
          roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'repair') {
            roleRepair.run(creep);
        }
    }
}