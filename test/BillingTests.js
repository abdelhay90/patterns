const assert = require('chai').assert;
const expect = require('chai').expect;
const Rental = require("../app/Models/Rental/Rental.js");
const Customer = require("../app/Models/Customer/Customer.js");
const VehicleFactory = require('../app/Models/Vehicle/VehicleFactory');
const rateCodes = require('../app/Models/Constants');
const JSONFormatter = require("../app/Models/Formatter/JSONFormatter");
const PlainTextFormatter = require("../app/Models/Formatter/PlainTextFormatter");
const Formatter = require("../app/Models/Formatter/Formatter");
const formats = require("../app/Models/Formatter/Constants");
/////////////////////////////////////////////////////////////
/////////// This is where your tests should go //////////////
/////////////////////////////////////////////////////////////
describe('The JSON Formatter', () => {
    it('should match format with indentaion [4]', () => {
        let jsonFormatter = new JSONFormatter();
        assert.equal(jsonFormatter.format({name: 'ahmed', job: "developer"}, {jsonStr: true, indentation: 4}), `{
    "name": "ahmed",
    "job": "developer"
}`);
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

describe('the customer', function () {
    it('should match vehicle format with indentation [\\t]', () => {
        let blueHonda = VehicleFactory.getVehicle("Blue Honda 2008", rateCodes.SEDAN);
        assert.equal(blueHonda.toJSONFormat({
            jsonStr: true,
            indentation: '\t'
        }), '{\n\t"_makeAndModel": "Blue Honda 2008",\n\t"_rateCode": 0\n}');
    });

    it('should format rented vehicle', function () {
        let blueHonda = VehicleFactory.getVehicle("Blue Honda 2008", rateCodes.SEDAN);
        let blueSUV = VehicleFactory.getVehicle("Blue SUV", rateCodes.SUV);
        let blueFOURxFOUR = VehicleFactory.getVehicle("Blue FOURxFOUR", rateCodes.FOURxFOUR);
        //let blueHonda = VehicleFactory.getVehicle("Blue Honda 2008", rateCodes.SEDAN);

        let hondaRental = new Rental(blueHonda, 431, 4, false);
        let SUVRental = new Rental(blueSUV, 201201, 6, false);
        let FOURxFOURSUVRental = new Rental(blueFOURxFOUR, 250, 15, false);

        let virginGates = new Customer("Virgin Gates");
        virginGates.addRental(hondaRental);
        virginGates.addRental(SUVRental);
        virginGates.addRental(FOURxFOURSUVRental);
        let statement = virginGates.statement();
        /*let jsonFormatter = new JSONFormatter();
        console.log(jsonFormatter.format(virginGates, {indentation: 4}));*/
        assert.equal(hondaRental.getRentedVehicle().toJSONFormat({
            jsonStr: true,
            indentation: '\t'
        }), '{\n\t"_makeAndModel": "Blue Honda 2008",\n\t"_rateCode": 0,\n\t"_rentalAmount": 912\n}');
        assert.equal(hondaRental.getRentedVehicle().toPlainTextFormat({}), "\"Blue Honda 2008\"\tLE 912.00");
        assert.equal(hondaRental.getRentedVehicle().getRentalFees(), 912);
    });

    it('should have three rental contract', function () {
        let blueHonda = VehicleFactory.getVehicle("Blue Honda 2008", rateCodes.SEDAN);
        let blueSUV = VehicleFactory.getVehicle("Blue SUV", rateCodes.SUV);
        let blueFOURxFOUR = VehicleFactory.getVehicle("Blue FOURxFOUR", rateCodes.FOURxFOUR);
        //let blueHonda = VehicleFactory.getVehicle("Blue Honda 2008", rateCodes.SEDAN);

        let hondaRental = new Rental(blueHonda, 431, 4, false);
        let SUVRental = new Rental(blueSUV, 201201, 6, false);
        let FOURxFOURSUVRental = new Rental(blueFOURxFOUR, 250, 15, false);

        let virginGates = new Customer("Virgin Gates");
        virginGates.addRental(hondaRental);
        virginGates.addRental(SUVRental);
        virginGates.addRental(FOURxFOURSUVRental);
        assert.equal(virginGates._rentals.length, 3);
    });

    it('should handle in case of unknown vehicle', function () {
        let truck = VehicleFactory.getVehicle("Truck");
        let truckRental = new Rental(truck, 431, 4, false);
        let virginGates = new Customer("Virgin Gates");
        virginGates.addRental(truckRental);
        let statement = virginGates.statement();
        assert.equal(truckRental.getRentedVehicle().getRentalFees(), 50)
    });

    it('should match the characterization test', () => {
        let mockedJSON = {
            "_name": "Sharm Dreams",
            "_rentals": [
                {
                    "_vehicle": {
                        "_makeAndModel": "Blue X3 2017",
                        "_rateCode": 2
                    },
                    "_kilometersRented": 240,
                    "_daysRented": 5,
                    "_lateFee": false,
                    "_rentedVehicle": {
                        "_vehicle": {
                            "_makeAndModel": "Blue X3 2017",
                            "_rateCode": 2
                        },
                        "_rentalAmount": 760
                    }
                }
            ],
            "_totalAmount": 760
        };
        let blueHonda = VehicleFactory.getVehicle("Blue Honda 2008", rateCodes.SEDAN);
        let greyJeep = VehicleFactory.getVehicle("Grey Jeep 2013", rateCodes.FOURxFOUR);
        let RedSunny = VehicleFactory.getVehicle("Red Sunny 2014", rateCodes.SEDAN);
        let BlueBMW = VehicleFactory.getVehicle("Blue X3 2017", rateCodes.SUV);

        let hondaRental = new Rental(blueHonda, 431, 4, false);
        let jeepRental = new Rental(greyJeep, 744, 4, false);
        let sunnnyRental = new Rental(RedSunny, 591, 3, true);
        let x3Rental = new Rental(BlueBMW, 240, 5, false);

        let virginGates = new Customer("Virgin Gates");
        let sharmDreams = new Customer("Sharm Dreams");

        virginGates.addRental(hondaRental);
        virginGates.addRental(jeepRental);
        virginGates.addRental(sunnnyRental);

        sharmDreams.addRental(x3Rental);

        assert.equal(virginGates.statement(formats.PLAIN_TEXT), "Rental Record for:Virgin Gates\n\t\"Blue Honda 2008\"\tLE 912.00\n\t\"Grey Jeep 2013\"\tLE 850.00\n\t\"Red Sunny 2014\"\tLE 1268.96\nAmount owed is LE 3030.96\nYou earned: 4 new Reward Points\n\n");

        expect(
            sharmDreams.statement(formats.JSON)
        ).to.deep.equal(
            mockedJSON
        );
    });
});


