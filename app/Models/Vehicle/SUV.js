const Vehicle = require('./Vehicle');
const rateCodes = require('../Constants');
class SUV extends Vehicle{
    constructor(makeAndModel){
        super(makeAndModel);
        this._rateCode = rateCodes.SUV;
    }
}

module.exports = SUV;