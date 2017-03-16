"use strict";
var protester_1 = require("./protester");
var protest_1 = require("./protest");
var movement_1 = require("./movement");
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
        // Find the protester
        var protesters = this.find(this.protesters, memberName);
        // Find the protest
        var protests = this.find(this.protests, protestName);
        if (protests.length > 0 && protesters.length > 0) {
            protests.forEach(function (protest) {
                protesters.forEach(function (protester) {
                    protest.addProtester(protester);
                });
            });
        }
    };
    // Returns Protesters in the system who match the search string
    ResistanceManager.prototype.findMemberNames = function (searchName) {
        return this.find(this.protesters, searchName).map(function (item) { return item.getName(); });
    };
    //  Returns Protests in the system that match the search string
    ResistanceManager.prototype.findProtestNames = function (searchName) {
        return this.find(this.protests, searchName).map(function (item) { return item.getName(); });
    };
    //  Returns Movements in the system that match the search string
    ResistanceManager.prototype.findMovementNames = function (searchName) {
        return this.find(this.movements, searchName).map(function (item) { return item.getName(); });
    };
    // General search helper function
    ResistanceManager.prototype.find = function (searchArray, searchName) {
        var results = [];
        searchArray.filter(function (item) {
            if (item.getName().toLowerCase().includes(searchName.toLowerCase())) {
                results.push(item);
            }
        });
        return results;
    };
    // Alters the name and/or the time of the protest
    ResistanceManager.prototype.modifyProtest = function (name, newName, newTime) {
        // Only fires when either newName or newTime is defined, otherwise no point in modifying
        if (newName || newTime) {
            var protests = this.find(this.protests, name);
            // if no protest is found, bail.
            if (protests.length < 0) {
                return;
            }
            protests[0].modify(newName, newTime);
        }
    };
    // Adds a Protest to a Movement
    ResistanceManager.prototype.addProtestToMovement = function (protestName, movementName) {
        var protests = this.find(this.protests, protestName);
        var movements = this.find(this.movements, movementName);
        if (protests.length > 0 && movements.length > 0) {
            movements.forEach(function (movement) {
                protests.forEach(function (protest) {
                    movement.addProtest(protest);
                    protest.addMovement(movement);
                });
            });
        }
    };
    // Returns all the Protesters involved in a Protest and their email addresses
    ResistanceManager.prototype.getProtesters = function (protestName) {
        var results = this.find(this.protests, protestName);
        if (results.length > 0) {
            results.forEach(function (protest) {
                protest.getProtesters().map(function (protester) {
                    return protester.getName() + ' (' + protester.getEmail() + ')';
                });
            });
        }
        return results;
    };
    // Returns Protesters who are near a Protest
    ResistanceManager.prototype.getUsersNearProtest = function (protestName, radius) {
        var _this = this;
        var results = [];
        var protests = this.find(this.protests, protestName);
        if (protests.length > 0) {
            protests.forEach(function (protest) {
                _this.protesters.forEach(function (protester) {
                    if (protest.getLocation().isWithinRadius(protester.getLocation().getZipCode(), radius)) {
                        results.push(protester.getName() + ' (' + protester.getEmail() + ')');
                    }
                });
            });
        }
        return results;
    };
    // Returns Protests near a location, as well as the Movements they are part of
    ResistanceManager.prototype.getNearbyProtests = function (zipcode, radius) {
        var results = [];
        this.protests.forEach(function (protest) {
            if (protest.getLocation().isWithinRadius(zipcode, radius)) {
                var result = protest.getName();
                var movements = protest.getMovements();
                var movementsInNames = movements.map(function (movement) { return movement.getName(); });
                if (movements.length <= 0) {
                    result += " (Not part of any movement)";
                }
                else {
                    result += " (" + movementsInNames.join(", ") + ")";
                }
                results.push(result);
            }
        });
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
