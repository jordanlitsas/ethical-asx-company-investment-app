const mongoose = require('mongoose');

const bankDetailsSchema = mongoose.Schema({

    userId: {type: String, default: "", required: true},
    bankAccName: {type: String, default: "", required: true},
    bankAccNum: {type: Number, default: -1, required: true},
    bankBsb: {type: String, default: "", required: true}
})
var bankDetailsData = mongoose.model('bank_details', bankDetailsSchema);
module.exports = bankDetailsData;