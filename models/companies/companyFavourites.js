const mongoose = require('mongoose');

const companyFavouritesSchema = mongoose.Schema({

    userId: String,
    asxCodes: [String]

})
var companyFavouriteData = mongoose.model('company_favourite', companyFavouritesSchema);
module.exports = companyFavouriteData;