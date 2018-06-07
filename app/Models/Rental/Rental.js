const RentedVehicle = require("./RentedVehicle");

/**
 * Car Rental model contains the current vehicle and related options used to calculate the car rental fees
 */
class Rental {

    constructor(vehicle, mileage, daysRented, lateFee) {
        this._vehicle = vehicle;
        this._kilometersRented = mileage;
        this._daysRented = daysRented;
        this._lateFee = lateFee;
        this.registerVehicle();
    }

    /**
     * ger mileage quantity
     * @returns number
     */
    getMileage() {
        return this._kilometersRented;
    }

    /**
     * get current vehicle
     * @returns Vehicle
     */
    getVehicle() {
        return this._vehicle;
    }

    /**
     * get days the car was rented
     * @returns number
     */
    getDaysRented() {
        return this._daysRented;
    }

    /**
     * returns late fees if the car rented returned late
     * @returns boolean
     */
    isLate() {
        return this._lateFee;
    }

    /**
     * register the decorator rented vehicle
     */
    registerVehicle() {
        this._rentedVehicle = new RentedVehicle(this._vehicle);
    }

    /**
     * assigned rental amount on rental contract to current vehicle
     * @param amount
     */
    assignRentalFees(amount) {
        this._rentedVehicle.setRentalFees(amount);
    }

    /**
     * get rented vehicle
     * @returns {RentedVehicle}
     */
    getRentedVehicle(){
        return this._rentedVehicle;
    }

}

module.exports = Rental;
