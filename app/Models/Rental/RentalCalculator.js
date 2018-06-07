const rateCodes = require('../Constants');

/**
 * car rental calculator class with specified rules
 */
class RentalCalculator {
    constructor(rental) {
        this._rental = rental;
    }

    /**
     * calculate the fees of car rental
     * @param initialAmount
     * @returns number
     */
    calculate(initialAmount) {
        let total = 0.0;
        let options = {
            initialAmount: initialAmount, // initial amount assigned
            daysRented: this._rental.getDaysRented(), // get number of days the car rented
            mileage: this._rental.getMileage() // get mileage
        };
        //calculate default car rental according to its type
        total = this._rental._vehicle.calculateRentalFees(options);

        // apply mileage rule
        total = this._applyMileAgeRule(total);

        //apply late rule
        total = this._applyLateRule(total);

        this._rental.assignRentalFees(total);

        return total;
    }

    /**
     * apply mileage rule of current car rental contract according to its type
     * @param amount
     * @returns number
     * @private
     */
    _applyMileAgeRule(amount) {
        var t_amount = amount;
        if (!(this._rental.getMileage() < 200)) {
            if (this._rental.getDaysRented() > 10 && this._rental.getVehicle().getRateCode() === rateCodes.FOURxFOUR) {
                t_amount -= t_amount * 0.05;
            }
            else if (this._rental.getVehicle().getRateCode() === rateCodes.SUV) {
                t_amount -= t_amount * 0.05;
            }
        }
        return t_amount;
    }

    /**
     * apply late rule on car retrieval
     * @param amount
     * @returns number
     * @private
     */
    _applyLateRule(amount) {
        var t_amount = amount;
        if (this._rental.isLate()) {
            // strict policy application as of Jan 2018
            t_amount += t_amount * 0.03;
        }

        return t_amount;
    }
}

module.exports = RentalCalculator;