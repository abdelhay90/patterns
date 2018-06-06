const assert = require('chai').assert;
const VehicleFactory = require('../app/Models/Vehicle/VehicleFactory');
const rateCodes = require('../app/Models/Constants');
const Rental = require("../app/Models/Rental/Rental.js");
const Customer = require("../app/Models/Customer/Customer.js");
const JSONFormatter = require("../app/Models/Formatter/JSONFormatter");
/////////////////////////////////////////////////////////////
/////////// This is where your tests should go //////////////
/////////////////////////////////////////////////////////////
describe('The JSON Formatter should', () => {
    it('should match format with indentaion [4]', () => {
        let jsonFormatter = new JSONFormatter();
        assert.equal(jsonFormatter.format({name: 'ahmed', job: "developer"}, {indentation: 4}), `{
    "name": "ahmed",
    "job": "developer"
}`);
    });

    it('should match vehicle format with indentation [\\t]', () => {
        let blueHonda = VehicleFactory.getVehicle("Blue Honda 2008", rateCodes.SEDAN);
        let jsonFormatter = new JSONFormatter();
        let formattedText = jsonFormatter.format(blueHonda, {indentation: "\t"});
        assert.equal(formattedText, '{\n\t"_makeAndModel": "Blue Honda 2008",\n\t"_rateCode": 0\n}');
    });

});
