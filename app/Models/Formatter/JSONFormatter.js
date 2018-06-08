const Formatter = require("./Formatter");

/**
 * apply JSON format for string with specific options and special handling for it out format
 */
class JSONFormatter extends Formatter {
    /**
     * for assigned object as strigified JSON object according to specific options
     * @param data
     * @param options
     * @returns {string}
     */
    format(data, options) {
        return options.jsonStr ?
            JSON.stringify(data, null, options.indentation) : JSON.parse(JSON.stringify(data));
    }
}

module.exports = JSONFormatter;