class Vehicle {

    constructor(makeAndModel) {
        this._makeAndModel = makeAndModel;
    }

    getRateCode() {
        return this._rateCode;
    }

    setRateCode(arg) {
        this._rateCode = arg;
    }

    getMakeAndModel() {
        return this._makeAndModel;
    }

    calculateRentalFees(options){
        return options.initialAmount;
    }
}
module.exports = Vehicle;

