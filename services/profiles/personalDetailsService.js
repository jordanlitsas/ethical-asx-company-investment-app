const Models = require('../../models');

const getPersonalDetails = async (userId) => {
    let personalDetailsDoc = await Models.personalDetails.findOne(userId);
    return personalDetailsDoc;
}

const insertPersonalDetails = async (personalDetailsData) => {
    let personalDetailsDoc = new Models.personalDetails(personalDetailsData);
    let success = personalDetailsDoc.save();
    return success;
}

const updatePersonalDetails = async (userId, personalDetailsUpdatedData) => {
    let personalDetailsDoc = await Models.personalDetails.findOneAndUpdate({userId: userId}, personalDetailsUpdatedData, {new: true});
    return personalDetailsDoc;
}

const removePersonalDetailsDoc = async (userId) => {
    await Models.personalDetails.findOneAndDelete({userId: userId});
}

module.exports = {getPersonalDetails, insertPersonalDetails, updatePersonalDetails, removePersonalDetailsDoc};