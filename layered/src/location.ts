/**
 * Created by Wei-Jen on 1/17/17.
 */
let zipcodeMap = require('../../data/zipcode-locations.json');
let geolib = require('geolib');

export class ZcLocation {
    private zipcode: string;

    constructor(zipcode: string) {
        this.zipcode = zipcode;
    }

    /**
     * Checks whether or not the ZcLocation is within radius of a zipcode
     * @param zipcode the target zipcode
     * @param radius the range of distance to check
     * @return {boolean} true, if the two are within the radius, false otherwise
     */
    isWithinRadius(zipcode: string, radius: number): boolean {
        let distance = geolib.getDistance(zipcodeMap[this.zipcode], zipcodeMap[zipcode]);
        let distanceInMiles = distance * 0.000621371;
        return distanceInMiles <= radius;
    }

    getZipCode(): string {
        return this.zipcode;
    }

}