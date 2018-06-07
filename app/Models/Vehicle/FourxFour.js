const Vehicle = require('./Vehicle');
const rateCodes = require('../Constants');

/**
 * 4x4 vehicle model
 */
class FourxFour extends Vehicle{
    constructor(makeAndModel){
        super(makeAndModel);
        this._rateCode = rateCodes.FOURxFOUR;
    }

    /**
     * calcaulate the fees of car rental for 4x4
     * @param options
     * @returns number
     */
    calculateRentalFees(options){
        return options.initialAmount + 200 * options.daysRented;
    }
}

module.exports = FourxFour;