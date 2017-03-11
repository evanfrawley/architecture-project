/**
 * Created by Wei-Jen on 1/18/17.
 */
"use strict";
var Movement = (function () {
    function Movement(name) {
        this.name = name;
        this.protests = [];
    }
    // Adds a Protest
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
