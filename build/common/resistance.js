"use strict";
var zipcodeMap = require('../data/zipcode-locations.json');
var geolib = require('geolib');
var protester_1 = require('./protester');
var protest_1 = require('./protest');
var movement_1 = require('./movement');
var ResistanceManager = (function () {
    function ResistanceManager() {
        this.protests = [];
        this.protesters = [];
        this.movements = [];
    }
    // Register a new protester with the system
    ResistanceManager.prototype.addMember = function (name, email, zipcode) {
        this.protesters.push(new protester_1.Protester(name, email, zipcode));
    };
    // Register a new protest with the system
    ResistanceManager.prototype.addProtest = function (newName, zipcode, time) {
        this.protests.push(new protest_1.Protest(newName, zipcode, time));
        return newName;
    };
    // Register a new movement with the system
    ResistanceManager.prototype.addMovement = function (newName) {
        this.movements.push(new movement_1.Movement(newName));
        return newName;
    };
    // Adds a Protester to a Protest
    ResistanceManager.prototype.addMemberToProtest = function (memberName, protestName) {
        var _this = this;
        // Find the protester
        this.protesters.forEach(function (protester) {
            if (protester.getName() === memberName) {
                // Find the protest
                _this.protests.forEach(function (protest) {
                    if (protest.getName() === protestName) {
                        protest.addProtester(protester);
                    }
                });
            }
        });
    };
    // Returns Protesters in the system who match the search string
    ResistanceManager.prototype.findMemberNames = function (searchName) {
        return this.find(this.protesters, searchName);
    };
    //  Returns Protests in the system that match the search string
    ResistanceManager.prototype.findProtestNames = function (searchName) {
        return this.find(this.protests, searchName);
    };
    //  Returns Movements in the system that match the search string
    ResistanceManager.prototype.findMovementNames = function (searchName) {
        return this.find(this.movements, searchName);
    };
    // General search helper function
    ResistanceManager.prototype.find = function (searchArray, searchName) {
        var results = [];
        searchArray.filter(function (item) {
            if (item.getName().toLowerCase().includes(searchName.toLowerCase())) {
                results.push(item.getName());
            }
        });
        return results;
    };
    // Alters the name and/or the time of the protest
    ResistanceManager.prototype.modifyProtest = function (name, newName, newTime) {
        this.protests.forEach(function (protest) {
            if (protest.getName() === name) {
                protest.modify(newName, newTime);
                return;
            }
        });
    };
    // Adds a Protest to a Movement
    ResistanceManager.prototype.addProtestToMovement = function (protestName, movementName) {
        var _this = this;
        this.protests.forEach(function (protest) {
            if (protest.getName() === protestName) {
                _this.movements.forEach(function (movement) {
                    if (movement.getName() === movementName) {
                        movement.addProtest(protest);
                    }
                });
            }
        });
    };
    // Returns all the Protesters involved in a Protest and their email addresses
    ResistanceManager.prototype.getProtesters = function (protestName) {
        var results = [];
        this.protests.forEach(function (protest) {
            if (protest.getName() === protestName) {
                protest.getProtesters().forEach(function (protester) {
                    results.push(protester.getName() + ' (' + protester.getEmail() + ')');
                });
            }
        });
        return results;
    };
    // Returns Protesters who are near a Protest
    ResistanceManager.prototype.getUsersNearProtest = function (protestName, radius) {
        var results = [];
        this.protests.forEach(function (protest) {
            if (protest.getName() === protestName) {
                protest.getProtesters().forEach(function (protester) {
                    var distance = geolib.getDistance(zipcodeMap[protest.getZipcode()], zipcodeMap[protester.getZipcode()]); // in meters
                    var distanceInMiles = distance * 0.000621371;
                    if (distanceInMiles <= radius) {
                        results.push(protester.getName() + ' (' + protester.getEmail() + ')');
                    }
                });
            }
        });
        return results;
    };
    // Returns Protests near a location, as well as the Movement they are part of
    ResistanceManager.prototype.getNearbyProtests = function (zipcode, radius) {
        var results = [];
        // First, add the protest with no movement to the result
        this.protests.forEach(function (protest) {
            var distance = geolib.getDistance(zipcodeMap[zipcode], zipcodeMap[protest.getZipcode()]); // in meters
            var distanceInMiles = distance * 0.000621371;
            if (distanceInMiles <= radius) {
                var result = {
                    name: protest.getName(),
                    movement: 'Not part of a movement'
                };
                results.push(result);
            }
        });
        // Then, check if any Protest belongs to a movement.
        this.movements.forEach(function (movement) {
            movement.getProtests().forEach(function (protest) {
                results.forEach(function (result) {
                    if (result.name === protest.getName()) {
                        result.movement = movement.getName();
                    }
                });
            });
        });
        // String it together
        for (var i = 0; i < results.length; i++) {
            results[i] = results[i].name + ' (' + results[i].movement + ')';
        }
        return results;
    };
    // Getter methods
    ResistanceManager.prototype.getMembers = function () {
        return this.protesters;
    };
    ResistanceManager.prototype.getProtests = function () {
        return this.protests;
    };
    ResistanceManager.prototype.getMovements = function () {
        return this.movements;
    };
    return ResistanceManager;
}());
exports.ResistanceManager = ResistanceManager;
