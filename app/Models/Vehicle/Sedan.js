const Vehicle = require('./Vehicle');
const rateCodes = require('../Constants');
class Sedan extends Vehicle{
    constructor(makeAndModel){
        super(makeAndModel);
        this._rateCode = rateCodes.SEDAN;
    }
}

module.exports = Sedan;