const Vehicle = require('./Vehicle');
const rateCodes = require('../Constants');
const SUV = require('./SUV');
const Sedan = require('./Sedan');
const FourxFour = require('./FourxFour');
class VehicleFactory {
    static getVehicle(makeAndModel, rateCode){
        switch (rateCode){
            case rateCodes.SUV:
                return new SUV(makeAndModel);
            case rateCodes.SEDAN:
                return new Sedan(makeAndModel);
            case rateCodes.FOURxFOUR:
                return new FourxFour(makeAndModel);
        }
    }
}

module.exports = VehicleFactory;