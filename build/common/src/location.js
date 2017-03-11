"use strict";
/**
 * Created by Wei-Jen on 1/17/17.
 */
var zipcodeMap = require('../../../data/zipcode-locations.json');
var geolib = require('geolib');
var ZcLocation = (function () {
    function ZcLocation(zipcode) {
        this.zipcode = zipcode;
    }
    // Deteremines whether or not this falls with the desired radius.
    ZcLocation.prototype.isWithinRadius = function (zipcode, radius) {
        var distance = geolib.getDistance(zipcodeMap[this.zipcode], zipcodeMap[zipcode]);
        var distanceInMiles = distance * 0.000621371;
        return distanceInMiles <= radius;
    };
    ZcLocation.prototype.getZipCode = function () {
        return this.zipcode;
    };
    return ZcLocation;
}());
exports.ZcLocation = ZcLocation;
