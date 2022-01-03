const mongoose = require('mongoose');

const employmentDetailsSchema = mongoose.Schema({

    userId: {type: String, default: "", required: true},
    employment: {type: String, default: "", required: true},
    employmentType: {type: String, default: "", required: true},
    netWealth: {type: Number, default: -1, required: true},
    invTimeHorizon: {type: Number, default: -1, required: true},
    annualIncome: {type: Number, default: -1, required: true}
})
var employmentDetailsData = mongoose.model('employment_details', employmentDetailsSchema);
module.exports = employmentDetailsData;