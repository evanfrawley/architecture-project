/**
 * Created by Wei-Jen on 1/17/17.
 */
let zipcodeMap = require('../data/zipcode-locations.json');
let geolib = require('geolib');

class ZcLocation {
    private zipcode: string;

    constructor(zipcode: string) {
        this.zipcode = zipcode;
    }

    // Deteremines whether or not this falls with the desired radius.
    isWithinRadius(zipcode: string, radius: number): boolean {
        let distance = geolib.getDistance(zipcodeMap[this.zipcode], zipcodeMap[zipcode]);
        let distanceInMiles = distance * 0.000621371;
        return distanceInMiles <= radius;
    }

    getZipCode(): string {
        return this.zipcode;
    }

}