const Models = require('../../models');

const getCompanies = async (userId) => {
    let companyFavouritesList = await Models.companyFavourites.findOne({userId: userId});
    return companyFavouritesList;
}

const insertInitialCompanyFavouritesDoc = async (userId, asxCode) => {
    let companyFavouritesDoc = new Models.companyFavourites({userId: userId, asxCodes: [asxCode]});
    let success = companyFavouritesDoc.save();
    return success
}

const addCompanyToFavouritesList = async (userId, asxCode) => {
    let success = await Models.companyFavourites.findOneAndUpdate({userId: userId}, {$addToSet: {asxCodes: [asxCode]}}, {new: true});
    return success;
}

const removeCompanyFromFavouritesList = async (userId, asxCode) => {
    let success = await Models.companyFavourites.findOneAndUpdate({userId: userId}, {$pull: {asxCodes: asxCode}}, {new: true});
    return success;
}

const removeCompanyFavouriteListDoc = async (userId) => {
    await Models.companyFavourites.findOneAndDelete({userId: userId});

}

module.exports = {
    getCompanies, 
    insertInitialCompanyFavouritesDoc, 
    addCompanyToFavouritesList, 
    removeCompanyFromFavouritesList, 
    removeCompanyFavouriteListDoc
}