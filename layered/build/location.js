"use strict";
/**
 * Created by Wei-Jen on 1/17/17.
 */
var zipcodeMap = require('../../data/zipcode-locations.json');
var geolib = require('geolib');
var ZcLocation = (function () {
    /**
     * Construct a ZcLocation
     * @param zipcode
     */
    function ZcLocation(zipcode) {
        this.zipcode = zipcode;
    }
    /**
     * Checks whether or not the ZcLocation is within radius of a zipcode
     * @param zipcode the target zipcode
     * @param radius the range of distance to check
     * @return {boolean} true, if the two are within the radius, false otherwise
     */
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
