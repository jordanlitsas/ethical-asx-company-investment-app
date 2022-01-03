const mongoose = require('mongoose');


const transactionHistorySchema = mongoose.Schema({
    userId: {type: String, required: true },
    transactions: [{
        purchasePrice: {type: Number, required: true},
        purchaseDate: {type: Number, required: true},
        quantity: {type: Number, required: true},
        asxCode: {type: String, required: true}
    }]
})

var transactionHistory = mongoose.model('transaction_historie', transactionHistorySchema);
module.exports = transactionHistory;