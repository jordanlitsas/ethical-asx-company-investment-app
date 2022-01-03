const mongoose = require('mongoose');

const companyFinanceSchema = mongoose.Schema({

    asxCode: {type: String, default: "", required: true},
    name: {type: String, default: "", required: true},
    priceLast: {type: Number, default: -1, required: false},
    priceOpen: {type: Number, default: -1, required: false},
    priceHigh: {type: Number, default: -1, required: false},
    priceLow: {type: Number, default: -1, required: false},
    date: {type: String, default: "", required: false},
    volume: {type: Number, default: -1, required: false},
    priceChangePct: {type: String, default: -1, required: false},
    priceBuy: {type: Number, default: -1, required: false},
    priceSell: {type: Number, default: -1, required: false},
    marketCap: {type: Number, default: -1, required: false},
    priceChangeToday: {type: Number, default: -1, required: false}
})
var companyFinanceData = mongoose.model('company_finance', companyFinanceSchema);
module.exports = companyFinanceData;