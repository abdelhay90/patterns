const rateCodes = require("../Constants");
const Rental = require("../Rental/Rental.js");

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
            var each = this._rentals[i];
            var thisAmount = 0.0;

            //determine amounts for each line
            if (each.getVehicle().getRateCode() == rateCodes.SEDAN || each.getVehicle().getRateCode() == rateCodes.SUV) {
                thisAmount = 50 * each.getDaysRented() + (each.getMileage() - each.getDaysRented() * 60) * 2;
            }
            else {
                thisAmount = 80 * each.getDaysRented() + (each.getMileage() - each.getDaysRented() * 70) * 3;
            }

            // Setup fee, as decided by management in Dec 2016
            thisAmount = 50.0;

            switch (each.getVehicle().getRateCode()) {
                case rateCodes.SEDAN:
                    thisAmount += 100 * each.getDaysRented();
                    if (each.getMileage() > each.getDaysRented() * 50) {
                        thisAmount += (each.getMileage() - each.getDaysRented() * 50) * 2;
                    }
                    break;
                case rateCodes.FOURxFOUR:
                    /* New Price applied
                    thisAmount += Double(190*each.getDaysRented())
                    */
                    thisAmount += 200 * each.getDaysRented();
                    break;

                case rateCodes.SUV:
                    thisAmount += 150 * each.getDaysRented();
                    if (each.getMileage() > each.getDaysRented() * 70)
                        thisAmount += (each.getMileage() - each.getDaysRented() * 70) * 2;
                    break;

                default:
                    thisAmount += 0;
            }

            // New rule of 2017, by john
            if (!(each.getMileage() < 200)) {
                if (each.getDaysRented() > 10 && each.getVehicle().getRateCode() == rateCodes.FOURxFOUR) {
                    thisAmount -= thisAmount * 0.05;
                }
                else if (each.getVehicle().getRateCode() == rateCodes.SUV) {
                    thisAmount -= thisAmount * 0.05;
                }
            }

            if (!each.isLate()) {
                // add frequent renter points
                rewardPoints++;

                // add bonus for SUV rental
                if ((each.getVehicle().getRateCode() == rateCodes.FOURxFOUR)) rewardPoints *= 2;

                // add bonus for SUV rental
                if ((each.getVehicle().getRateCode() == rateCodes.SUV) && each.getDaysRented() > 5)
                    rewardPoints += (each.getDaysRented() - 5);
            }
            else {
                // strict policy application as of Jan 2018
                thisAmount += thisAmount * 0.03;
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

