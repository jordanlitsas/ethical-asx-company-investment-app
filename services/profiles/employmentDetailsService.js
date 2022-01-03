const Models = require('../../models');

const getEmploymentDetails = async (userId) => {
    let employmentDetailsDoc = await Models.employmentDetails.findOne(userId);
    return employmentDetailsDoc;
}

const insertEmploymentDetails = async (employmentDetailsData) => {
    let employmentDetailsDoc = new Models.employmentDetails(employmentDetailsData);
    let success = employmentDetailsDoc.save();
    return success;
}

const updateEmploymentDetails = async (userId, employmentDetailsUpdatedData) => {
    let employmentDetailsDoc = await Models.employmentDetails.findOneAndUpdate({userId: userId}, employmentDetailsUpdatedData, {new: true});
    return employmentDetailsDoc;
}

const removeEmploymentDetailsDoc = async (userId) => {
    await Models.employmentDetails.findOneAndDelete({userId: userId});
}

module.exports = {getEmploymentDetails, insertEmploymentDetails, updateEmploymentDetails, removeEmploymentDetailsDoc};