const Formatter = require("./Formatter");
const fieldsTypes = require("./FormatTypes");
const _ = require('lodash');
class PlainTextFormatter extends Formatter {
    format(data, options) {
        let text = '';
        let fields = _.map(options.fields, function (item) {
            if (item.type === fieldsTypes.NORMAL) {
                item.value = (item.template.replace("{" + item.name + "}", data[item.name]));
            }
            text += (item.value);
            return item.value;
        });
        return text
    }
}

module.exports = PlainTextFormatter;