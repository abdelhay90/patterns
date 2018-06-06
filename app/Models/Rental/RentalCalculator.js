const rateCodes = require('../Constants');

class RentalCalculator {
    constructor(rental) {
        this._rental = rental;
        this._rewardPoints = 0;
    }

    getRewardsPoints() {
        return this._rewardPoints;
    }

    setRewardsPoints(prevPoints) {
        this._rewardPoints = prevPoints;
    }

    calculate(initialAmount) {
        let total = 0.0;
        let options = {
            initialAmount: initialAmount,
            daysRented: this._rental.getDaysRented(),
            mileage: this._rental.getMileage()
        };
        total = this._rental._vehicle.calculateRentalFees(options);

        total = this._applyMileAgeRule(total);

        total = this._applyLateRule(total)

        return total;
    }

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