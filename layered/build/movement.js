/**
 * Created by Wei-Jen on 1/18/17.
 */
"use strict";
var Movement = (function () {
    /**
     * Constructs a new Movement
     * @param name
     * @param protests
     */
    function Movement(name, protests) {
        this.name = name;
        this.protests = protests ? protests : [];
    }
    /**
     * Adds a Protest belonging to this Movement
     * @param newProtest
     */
    Movement.prototype.addProtest = function (newProtest) {
        for (var i = 0; i < this.protests.length; i++) {
            if (this.protests[i].getName() === newProtest.getName()) {
                return;
            }
        }
        this.protests.push(newProtest);
    };
    // Getter methods
    Movement.prototype.getName = function () {
        return this.name;
    };
    Movement.prototype.getProtests = function () {
        return this.protests;
    };
    return Movement;
}());
exports.Movement = Movement;
