const Vehicle = require("../Vehicle/Vehicle");
const JSONFormatter = require("../Formatter/JSONFormatter");
const _ = require('lodash');
/**
 * Rented Vehicle a
 */
class RentedVehicle extends Vehicle{
    constructor(vehicle) {
        super();
        this._vehicle = vehicle;
        this._rentalAmount = 0.0;
        delete this._rateCode;
    }

    /**
     * return json string format output from current entity
     * @param options
     * @returns {string}
     */
    toJSONFormat(options){
        let vehicle = _.cloneDeep(this._vehicle);
        vehicle._rentalAmount = this._rentalAmount;
        return new JSONFormatter().format(vehicle, options ? options : {indentation: 4});
    }

    /**
     * return plan text string format output from current entity according to specific options
     * @param options
     * @returns {string}
     */
    toPlainTextFormat(options){
        let vehicleName = this._vehicle.getMakeAndModel();
        let amount = this._rentalAmount.toFixed(2);
        return `"${vehicleName}"\tLE ${amount}`;
    }

    /**
     * get rental amount
     * @returns {number}
     */
    getRentalFees() {
        return this._rentalAmount;
    }

    /**
     * set rental amount
     * @param amount
     */
    setRentalFees(amount) {
        this._rentalAmount =  amount;
    }
}

module.exports = RentedVehicle;