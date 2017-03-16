/**
 * Created by Wei-Jen on 1/18/17.
 */
"use strict";
var location_1 = require("./location");
var Protester = (function () {
    /**
     * Constructs a Protester
     * @param name
     * @param email
     * @param zipcode
     */
    function Protester(name, email, zipcode) {
        this.name = name;
        this.email = email;
        this.location = new location_1.ZcLocation(zipcode);
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
