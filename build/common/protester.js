/**
 * Created by Wei-Jen on 1/18/17.
 */
"use strict";
var Protester = (function () {
    function Protester(name, email, zipcode) {
        this.name = name;
        this.email = email;
        this.zipcode = zipcode;
    }
    // Getter methods
    Protester.prototype.getName = function () {
        return this.name;
    };
    Protester.prototype.getEmail = function () {
        return this.email;
    };
    Protester.prototype.getZipcode = function () {
        return this.zipcode;
    };
    return Protester;
}());
exports.Protester = Protester;
