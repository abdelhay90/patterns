const JSONFormatter = require("../Formatter/JSONFormatter");

/**
 * Vehicle base class model
 */
class Vehicle {

    constructor(makeAndModel) {
        this._makeAndModel = makeAndModel;
    }

    /**
     * get rate code of this car
     * @returns string
     */
    getRateCode() {
        return this._rateCode;
    }

    /**
     * set the rate code of this car
     * @param arg
     */
    setRateCode(arg) {
        this._rateCode = arg;
    }

    /**
     * return makeAndModel
     * @returns string
     */
    getMakeAndModel() {
        return this._makeAndModel;
    }

    /**
     * calculate rental fees of the current vehicle "to be overridden in child classes"
     * @param options -> used to calculate the fees of the rental of this car
     * @returns number
     */
    calculateRentalFees(options) {
        return options.initialAmount;
    }

    /**
     * convert current object to json string
     * @param options -> options used to formatted JSON format
     * @returns string
     */
    toJSONFormat(options) {
        return new JSONFormatter().format(this, options ? options : {indentation: 4});
    }
}

module.exports = Vehicle;

