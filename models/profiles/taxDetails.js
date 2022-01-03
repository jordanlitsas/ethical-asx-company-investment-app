const mongoose = require('mongoose');

const taxDetailsSchema = mongoose.Schema({

    userId: {type: String, default: "", required: true},
    tfn: {type: Number, default: -1, required: true},
    country: {type: String, default: "", required: true}
})
var taxDetailsData = mongoose.model('tax_details', taxDetailsSchema);
module.exports = taxDetailsData;