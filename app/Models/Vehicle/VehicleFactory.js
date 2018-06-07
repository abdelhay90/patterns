const Vehicle = require('./Vehicle');
const rateCodes = require('../Constants');
const SUV = require('./SUV');
const Sedan = require('./Sedan');
const FourxFour = require('./FourxFour');

/**
 * Vehicle Factory model
 */
class VehicleFactory {
    /**
     * generate vehicle according to the rate code specified
     * @param makeAndModel
     * @param rateCode
     * @returns Vehicle
     */
    static getVehicle(makeAndModel, rateCode) {
        switch (rateCode) {
            case rateCodes.SUV:
                return new SUV(makeAndModel);
            case rateCodes.SEDAN:
                return new Sedan(makeAndModel);
            case rateCodes.FOURxFOUR:
                return new FourxFour(makeAndModel);
            default:
                return new Vehicle(makeAndModel ? makeAndModel : "UNKNOWN");
        }
    }
}

module.exports = VehicleFactory;