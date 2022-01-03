const Models = require('../../models');

const getBankDetails = async (userId) => {
    let bankDetailsDoc = await Models.bankDetails.findOne(userId);
    return bankDetailsDoc;
}

const insertBankDetails = async (bankDetailsData) => {
    let bankDetailsDoc = new Models.bankDetails(bankDetailsData);
    let success = bankDetailsDoc.save();
    return success;
}

const updateBankDetails = async (userId, bankDetailsUpdatedData) => {
    let bankDetailsDoc = await Models.bankDetails.findOneAndUpdate({userId: userId}, bankDetailsUpdatedData, {new: true});
    return bankDetailsDoc;
}

const removeBankDetailsDoc = async (userId) => {
    await Models.bankDetails.findOneAndDelete({userId: userId});
}

module.exports = {getBankDetails, insertBankDetails, updateBankDetails, removeBankDetailsDoc};