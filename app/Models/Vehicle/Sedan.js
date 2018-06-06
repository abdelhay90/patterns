const Vehicle = require('./Vehicle');
const rateCodes = require('../Constants');
class Sedan extends Vehicle{
    constructor(makeAndModel){
        super(makeAndModel);
        this._rateCode = rateCodes.SEDAN;
    }
    calculateRentalFees(options){
        let t_amount = options.initialAmount + 100 * options.daysRented;
        if (options.mileage > options.daysRented * 50) {
            t_amount = t_amount + (options.mileage - options.daysRented * 50) * 2;
        }
        return t_amount;
    }
}

module.exports = Sedan;