/**
 * Created by Wei-Jen on 1/18/17.
 */
"use strict";
var Protest = (function () {
    function Protest(name, zipcode, time) {
        this.name = name;
        this.zipcode = zipcode;
        this.time = new Date(time);
        this.protesters = [];
    }
    // Change the name or time of the Protest
    Protest.prototype.modify = function (newName, newTime) {
        if (newName) {
            this.name = newName;
        }
        if (newTime) {
            this.time = new Date(newTime);
        }
    };
    // Adds a Protester
    Protest.prototype.addProtester = function (newProtester) {
        // If the name already exists, bail out.
        for (var i = 0; i < this.protesters.length; i++) {
            if (this.protesters[i].getName() === newProtester.getName()) {
                return;
            }
        }
        this.protesters.push(newProtester);
    };
    // Getter methods
    Protest.prototype.getName = function () {
        return this.name;
    };
    Protest.prototype.getZipcode = function () {
        return this.zipcode;
    };
    Protest.prototype.getTime = function () {
        return this.time;
    };
    Protest.prototype.getProtesters = function () {
        return this.protesters;
    };
    return Protest;
}());
exports.Protest = Protest;
