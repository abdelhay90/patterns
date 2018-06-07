const rateCodes = require("../Constants");
const RentalCalculator = require("../Rental/RentalCalculator");
const formats = require("../Formatter/Constants");
const JSONFormatter = require("../Formatter/JSONFormatter");

/**
 * customer model used to have the rental contacts and rate the customer and
 * also calculate the total fees of all rental contact assigned
 */
class Customer {

    constructor(name) {
        this._name = name;
        this._rentals = [];
        this._totalAmount = 0.0;
    }

    /**
     * add rental contract to current customer
     * @param Rental contract
     */
    addRental(arg) {
        this._rentals.push(arg)
    }

    /**
     * get customer name
     * @returns {string}
     */
    getName() {
        return this._name;
    }

    /**
     * get customer final statement after calculating the rental contracts
     * @returns {string}
     */
    statement(format) {
        let totalAmount = 0;
        let rewardPoints = 0;

        // loop on rental contracts
        for (let i = 0; i < this._rentals.length; i++) {
            let each = this._rentals[i];

            // initial Amount
            let thisAmount = 50;

            // calculate rental fees per vehicle
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
            totalAmount += thisAmount;
        }
        this._totalAmount = totalAmount;

        // decide which format the state will be generated [JSON - PLAIN]
        let result;
        switch (format) {
            case formats.JSON:
                result = this._getJSONFormat(rewardPoints);
                break;
            case formats.PLAIN_TEXT:
            default:
                result = this._getPlainTextFormat(rewardPoints);
                break;
        }

        return result;
    }

    /**
     * generate customer state in plain text format
     * @param rewardPoints
     * @returns {{}}
     * @private
     */
    _getJSONFormat(rewardPoints) {
        //let statement = _.cloneDeep(this);
        return new JSONFormatter().format(this, {indentation: 4});
    }

    /**
     * generate customer state in plain text format
     * @param rewardPoints
     * @returns {string}
     * @private
     */
    _getPlainTextFormat(rewardPoints) {
        let result = "Rental Record for:" + this.getName() + "\n";
        for (let i = 0; i < this._rentals.length; i++) {
            let each = this._rentals[i];
            result += "\t" + each.getRentedVehicle().toPlainTextFormat({}) + "\n";
        }
        // add footer lines
        result += "Amount owed is LE " + this._totalAmount.toFixed(2) + "\n";

        result += "You earned: " + rewardPoints + " new Reward Points\n\n";
        return result;
    }
}

module.exports = Customer;

