"use strict";
var fs = require('fs');
var CircularJSON = require('circular-json');
var protester_1 = require("./protester");
var protest_1 = require("./protest");
var movement_1 = require("./movement");
var ResistanceModel = (function () {
    function ResistanceModel() {
        this.protesters = [];
        this.protests = [];
        this.movements = [];
    }
    /**
     * Registers a new protester with the system
     * @param name
     * @param email
     * @param zipcode
     */
    ResistanceModel.prototype.addMember = function (name, email, zipcode) {
        this.protesters.push(new protester_1.Protester(name, email, zipcode));
    };
    /**
     *  Register a new protest with the system
     * @param newName
     * @param zipcode
     * @param time
     * @return {string} name of the new protest
     */
    ResistanceModel.prototype.addProtest = function (newName, zipcode, time) {
        this.protests.push(new protest_1.Protest(newName, zipcode, time));
        return newName;
    };
    /**
     * Register a new movement with the system
     * @param newName
     * @return {string} name of the new movement
     */
    ResistanceModel.prototype.addMovement = function (newName) {
        this.movements.push(new movement_1.Movement(newName));
        return newName;
    };
    /**
     * Adds a Protester to a Protest
     * @param memberName
     * @param protestName
     */
    ResistanceModel.prototype.addMemberToProtest = function (memberName, protestName) {
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
    /**
     * Returns Protesters in the system who match the search string
     * @param searchName
     * @return {string[]} an array of matches
     */
    ResistanceModel.prototype.findMemberNames = function (searchName) {
        return this.find(this.protesters, searchName).map(function (item) { return item.getName(); });
    };
    /**
     * Returns Protests in the system that match the search string
     * @param searchName
     * @return {string[]} an array of matches
     */
    ResistanceModel.prototype.findProtestNames = function (searchName) {
        return this.find(this.protests, searchName).map(function (item) { return item.getName(); });
    };
    /**
     * Returns Movements in the system that match the search string
     * @param searchName
     * @return {string[]} an array of matches
     */
    ResistanceModel.prototype.findMovementNames = function (searchName) {
        return this.find(this.movements, searchName).map(function (item) { return item.getName(); });
    };
    // General search helper function
    ResistanceModel.prototype.find = function (searchArray, searchName) {
        var results = [];
        searchArray.filter(function (item) {
            if (item.getName().toLowerCase().includes(searchName.toLowerCase())) {
                results.push(item);
            }
        });
        return results;
    };
    /**
     * Alters the name and/or the time of the protest
     * @param name name of the protest to look for
     * @param newName
     * @param newTime
     */
    ResistanceModel.prototype.modifyProtest = function (name, newName, newTime) {
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
    /**
     * Adds a Protest to a Movement
     * @param protestName
     * @param movementName
     */
    ResistanceModel.prototype.addProtestToMovement = function (protestName, movementName) {
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
    /**
     * Returns all the Protesters involved in a Protest and their email addresses.
     * @param protestName
     * @return {string[]} An array of protesters' names and email addresses
     */
    ResistanceModel.prototype.getProtesters = function (protestName) {
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
    /**
     * Returns Protesters who are near a Protest
     * @param protestName
     * @param radius
     * @return {string[]} an array of matches
     */
    ResistanceModel.prototype.getUsersNearProtest = function (protestName, radius) {
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
    /**
     * Returns Protests near a location, as well as the Movements they are part of
     * @param zipcode
     * @param radius
     * @return {string[]} an array of matches
     */
    ResistanceModel.prototype.getNearbyProtests = function (zipcode, radius) {
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
    /**
     * Process the json and construct the objects
     * @param data json data as string
     */
    ResistanceModel.prototype.processResistanceData = function (data) {
        var _this = this;
        var obj = JSON.parse(data);
        var protesters = obj.Protesters;
        var protests = obj.Protests;
        var movements = obj.Movements;
        if (protesters.length > 0) {
            protesters.forEach(function (protester) {
                var newProtester = new protester_1.Protester(protester.name, protester.email, protester.location.zipcode);
                _this.protesters.push(newProtester);
            });
        }
        if (protests.length > 0) {
            protests.forEach(function (protest) {
                var newProtest = new protest_1.Protest(protest.name, protest.location.zipcode, protest.time, protest.protesters, protest.movements);
                _this.protests.push(newProtest);
            });
        }
        if (movements.length > 0) {
            movements.forEach(function (movement) {
                var newMovement = new movement_1.Movement(movement.name, movement.protests);
                _this.movements.push(newMovement);
            });
        }
    };
    /**
     * Save the application data to a json file
     * @param fileName name of the json file
     */
    ResistanceModel.prototype.saveResistanceData = function (fileName) {
        var json = '{ \"Protesters\":' + CircularJSON.stringify(this.protesters, null, '\t') + ', \n\t\"Protests\":'
            + CircularJSON.stringify(this.protests, null, '\t')
            + ', \n\t\"Movements\":' + CircularJSON.stringify(this.movements, null, '\t') + ' }';
        fs.writeFile(fileName, json, function (err) {
            if (err) {
                return console.error(err);
            }
            console.log("Data written successfully!");
        });
    };
    // Getter methods
    ResistanceModel.prototype.getMembers = function () {
        return this.protesters;
    };
    ResistanceModel.prototype.getProtests = function () {
        return this.protests;
    };
    ResistanceModel.prototype.getMovements = function () {
        return this.movements;
    };
    return ResistanceModel;
}());
exports.ResistanceModel = ResistanceModel;
