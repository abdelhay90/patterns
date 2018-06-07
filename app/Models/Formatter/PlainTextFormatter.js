const Formatter = require("./Formatter");
const _ = require('lodash');
class PlainTextFormatter extends Formatter {
    format(data, options) {
        return '';
    }
}

module.exports = PlainTextFormatter;