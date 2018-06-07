const assert = require('chai').assert;
const VehicleFactory = require('../app/Models/Vehicle/VehicleFactory');
const rateCodes = require('../app/Models/Constants');
const JSONFormatter = require("../app/Models/Formatter/JSONFormatter");
const PlainTextFormatter = require("../app/Models/Formatter/PlainTextFormatter");
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
});

xdescribe('The Plain Text Formatter', function () {
    it('should match format plain text', () => {
        let plainTextFormatter = new PlainTextFormatter();
        let formatted = plainTextFormatter.format({name: 'ahmed', job: "developer"}, {
            fields: [
                {
                    name: 'name',
                    type: fieldsTypes.NORMAL,
                    template: '{name} is '
                },
                {
                    name: 'job',
                    type: fieldsTypes.NORMAL,
                    template: '{job}.\n'
                }
            ]
        });
        assert.equal(formatted, 'ahmed is developer.\n');
    });

    it('should match format plain text for vehicle', () => {
        let blueHonda = VehicleFactory.getVehicle("Blue Honda 2008", rateCodes.SEDAN);
        let plainTextFormatter = new PlainTextFormatter();
        let formatted = plainTextFormatter.format(blueHonda, {
            fields: [
                {
                    name: '_makeAndModel',
                    type: fieldsTypes.NORMAL,
                    template: '{_makeAndModel} is '
                },
                {
                    name: '_rateCode',
                    type: fieldsTypes.NORMAL,
                    template: '{_rateCode}.\n'
                }
            ]
        });
        assert.equal(formatted, 'Blue Honda 2008 is 0.\n');
    });
});
