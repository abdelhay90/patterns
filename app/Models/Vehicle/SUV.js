const Vehicle = require('./Vehicle');
const rateCodes = require('../Constants');
class SUV extends Vehicle{
    constructor(makeAndModel){
        super(makeAndModel);
        this._rateCode = rateCodes.SUV;
    }
    calculateRentalFees(options){
        let t_amount = options.initialAmount + 150 * options.daysRented;
        if (options.mileage > options.daysRented * 70) {
            t_amount = t_amount + (options.mileage - options.daysRented * 70) * 2;
        }
        return t_amount;
    }

}

module.exports = SUV;