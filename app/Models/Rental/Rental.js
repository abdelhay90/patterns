class Rental {

    constructor(vehicle, mileage, daysRented, lateFee) {
        this._vehicle = vehicle;
        this._kilometersRented = mileage;
        this._daysRented = daysRented;
        this._lateFee = lateFee;
    }

    getMileage() {
        return this._kilometersRented;
    }

    getVehicle() {
        return this._vehicle;
    }

    getDaysRented() {
        return this._daysRented;
    }

    isLate() {
        return this._lateFee;
    }

    calculate(){

    }
}

module.exports = Rental;
