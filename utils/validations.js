const moment = require("moment");
const District = require("../constants/district");

const validateIndexes = (element, value) => {

    // find the district and assign id
    if (element?.validation?.table == 'district') {
        value = District.find(row => {
            return row.name.toLocaleLowerCase().trim() == value.toLocaleLowerCase().trim()
        })?.id || value
    }

    // validate date
    if (element?.validation?.date) {
        value = moment(new Date(value)).format("YYYY-MM-DD");
    }

    // Default Value
    if (element?.validation?.defaultValue) {
        value = element?.validation?.defaultValue
    }

    return value

}


module.exports = { validateIndexes }