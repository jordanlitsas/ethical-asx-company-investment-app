const Models = require('../../models');

const getTaxDetails = async (userId) => {
    let taxDetailsDoc = await Models.taxDetails.findOne(userId);
    return taxDetailsDoc;
}

const insertTaxDetails = async (taxDetailsData) => {
    let taxDetailsDoc = new Models.taxDetails(taxDetailsData);
    let success = taxDetailsDoc.save();
    return success;
}

const updateTaxDetails = async (userId, taxDetailsUpdatedData) => {
    let taxDetailsDoc = await Models.taxDetails.findOneAndUpdate({userId: userId}, taxDetailsUpdatedData, {new: true});
    return taxDetailsDoc;
}

const removeTaxDetailsDoc = async (userId) => {
    await Models.taxDetails.findOneAndDelete({userId: userId});
}

module.exports = {getTaxDetails, insertTaxDetails, updateTaxDetails, removeTaxDetailsDoc};