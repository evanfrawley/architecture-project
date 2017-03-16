/**
 * Created by Wei-Jen on 1/17/17.
 */
require("data/zipcode-locations.json");
var ZcLocation = (function () {
    function ZcLocation(zipcode) {
        this.zipcode = zipcode;
    }
    ZcLocation.prototype.getGeolocation = function () {
        return;
    };
    return ZcLocation;
}());
