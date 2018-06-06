const Formatter = require("./Formatter");

class JSONFormatter extends Formatter {
    format(data, options) {
        return JSON.stringify(data, null, options.indentation);
    }
}

module.exports = JSONFormatter;