const Vehicle = require('./Vehicle');
const rateCodes = require('../Constants');
class FourxFour extends Vehicle{
    constructor(makeAndModel){
        super(makeAndModel);
        this._rateCode = rateCodes.FOURxFOUR;
    }
    calculateRentalFees(options){
        return options.initialAmount + 200 * options.daysRented;
    }
}

module.exports = FourxFour;