const Models = require('../../models');



const getTransactionHistory = async (userId) => {
    let transactionHistory = Models.transactionHistory.findOne({userId: userId});
    return transactionHistory;
}

const createInitialTransactionHistoryDoc = async (transactionReference) => {
 
    let transactionHistoryDoc = new Models.transactionHistory(transactionReference);
    transactionHistoryDoc = await transactionHistoryDoc.save();
    return transactionHistoryDoc;
}

const addTransaction = async (userId, transaction) => {
    let success = await Models.transactionHistory.findOneAndUpdate({userId: userId}, {$addToSet: {transactions: transaction}}, {new: true});
    return success;
}

module.exports = {getTransactionHistory, createInitialTransactionHistoryDoc, addTransaction}