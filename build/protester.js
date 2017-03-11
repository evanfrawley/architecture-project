/**
 * Created by Wei-Jen on 1/18/17.
 */
"use strict";
var Protester = (function () {
    function Protester(name, email, zipcode) {
        this.name = name;
        this.email = email;
        this.location = new ZcLocation(zipcode);
    }
    // Getter methods
    Protester.prototype.getName = function () {
        return this.name;
    };
    Protester.prototype.getEmail = function () {
        return this.email;
    };
    Protester.prototype.getLocation = function () {
        return this.location;
    };
    return Protester;
}());
exports.Protester = Protester;
