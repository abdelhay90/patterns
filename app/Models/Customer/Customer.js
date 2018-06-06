const rateCodes = require("../Constants");
const Rental = require("../Rental/Rental.js");
const RentalCalculator = require("../Rental/RentalCalculator");

class Customer {

    constructor(name) {
        this._name = name;
        this._rentals = [];
    }

    addRental(arg) {
        this._rentals.push(arg)
    }

    getName() {
        return this._name;
    }

    statement() {

        let totalAmount = 0;
        let rewardPoints = 0;
        let result = "Rental Record for:" + this.getName() + "\n";

        for (let i = 0; i < this._rentals.length; i++) {
            let each = this._rentals[i];
            let thisAmount = 50;
            let rentalCalculator = new RentalCalculator(each);
            thisAmount = rentalCalculator.calculate(thisAmount);

            if (!each.isLate()) {
                // add frequent renter points
                rewardPoints++;

                // add bonus for SUV rental
                if ((each.getVehicle().getRateCode() === rateCodes.FOURxFOUR)) rewardPoints *= 2;

                // add bonus for SUV rental
                if ((each.getVehicle().getRateCode() === rateCodes.SUV) && each.getDaysRented() > 5)
                    rewardPoints += (each.getDaysRented() - 5);
            }
            // show figures for this rental
            result += "\t\"" + each.getVehicle().getMakeAndModel() + "\"\tLE " + thisAmount.toFixed(2) + "\n";

            totalAmount += thisAmount;
        }

        // add footer lines
        result += "Amount owed is LE " + totalAmount.toFixed(2) + "\n";

        result += "You earned: " + rewardPoints + " new Reward Points\n\n";

        return result;
    }
}

module.exports = Customer

