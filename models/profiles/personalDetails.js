const mongoose = require('mongoose');

const personalDetailsSchema = mongoose.Schema({

    userId: {type: String, default: "", required: true},
    dob: {type: Date, default: "", required: true},
    mobile: {type: Number, default: -1, required: true},
    address: {type: String, default: "", required: true}
})
var personalDetailsData = mongoose.model('personal_details', personalDetailsSchema);
module.exports = personalDetailsData;