/**
 * Formatter base class model
 */
class Formatter {
    /**
     * format function used to be overridden in child classes
     * @param data
     * @param options
     * @returns {string}
     */
    format(data, options) {
        return '';
    }
}

module.exports = Formatter;