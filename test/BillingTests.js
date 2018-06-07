const assert = require('chai').assert;
const Rental = require("../app/Models/Rental/Rental.js");
const Customer = require("../app/Models/Customer/Customer.js");
const VehicleFactory = require('../app/Models/Vehicle/VehicleFactory');
const rateCodes = require('../app/Models/Constants');
const JSONFormatter = require("../app/Models/Formatter/JSONFormatter");
const PlainTextFormatter = require("../app/Models/Formatter/PlainTextFormatter");
const Formatter = require("../app/Models/Formatter/Formatter");
/////////////////////////////////////////////////////////////
/////////// This is where your tests should go //////////////
/////////////////////////////////////////////////////////////
describe('The JSON Formatter', () => {
    it('should match format with indentaion [4]', () => {
        let jsonFormatter = new JSONFormatter();
        assert.equal(jsonFormatter.format({name: 'ahmed', job: "developer"}, {indentation: 4}), `{
    "name": "ahmed",
    "job": "developer"
}`);
    });

    it('should match vehicle format with indentation [\\t]', () => {
        let blueHonda = VehicleFactory.getVehicle("Blue Honda 2008", rateCodes.SEDAN);
        assert.equal(blueHonda.toJSONFormat({indentation: '\t'}), '{\n\t"_makeAndModel": "Blue Honda 2008",\n\t"_rateCode": 0\n}');
    });

    it('should format rented vehicle', function () {
        let blueHonda = VehicleFactory.getVehicle("Blue Honda 2008", rateCodes.SEDAN);
        let truck = VehicleFactory.getVehicle("Truck");
        let blueSUV = VehicleFactory.getVehicle("Blue SUV", rateCodes.SUV);
        let blueFOURxFOUR = VehicleFactory.getVehicle("Blue FOURxFOUR", rateCodes.FOURxFOUR);
        //let blueHonda = VehicleFactory.getVehicle("Blue Honda 2008", rateCodes.SEDAN);

        let hondaRental = new Rental(blueHonda, 431, 4, false);
        let truckRental = new Rental(truck, 431, 4, false);
        let SUVRental = new Rental(blueSUV, 201201, 6, false);
        let FOURxFOURSUVRental = new Rental(blueFOURxFOUR, 250, 15, false);

        let virginGates = new Customer("Virgin Gates");
        virginGates.addRental(hondaRental);
        virginGates.addRental(truckRental);
        virginGates.addRental(SUVRental);
        virginGates.addRental(FOURxFOURSUVRental);
        let statement = virginGates.statement();

        assert.equal(hondaRental.getRentedVehicle().toJSONFormat({indentation: '\t'}), '{\n\t"_makeAndModel": "Blue Honda 2008",\n\t"_rateCode": 0,\n\t"_rentalAmount": 912\n}');

        assert.equal(hondaRental.getRentedVehicle().toPlainTextFormat({}), "Blue Honda 2008: LE 912");
        assert.equal(hondaRental.getRentedVehicle().getRentalFees(), 912);
    });
});


describe('The Plain Text Formatter', function () {
    it('should match format plain text', () => {
        let plainTextFormatter = new PlainTextFormatter();
        let formatted = plainTextFormatter.format({name: 'ahmed', job: "developer"}, {});
        assert.equal(formatted, '');

        let dFormatter = new Formatter();
        let dformatted = dFormatter.format({name: 'ahmed', job: "developer"}, {});
        assert.equal(dformatted, '');
    });
});
