const Vehicle = require('./Vehicle');
const rateCodes = require('../Constants');
class FourxFour extends Vehicle{
    constructor(makeAndModel){
        super(makeAndModel);
        this._rateCode = rateCodes.FOURxFOUR;
    }
}

module.exports = FourxFour;