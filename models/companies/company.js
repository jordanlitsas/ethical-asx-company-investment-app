const mongoose = require('mongoose');


const companySchema = mongoose.Schema({
    name: {
        type: String,
        default:"",
        required: true
    },
    industry: {
        type: String,
        default: "",
        required: false
    },
    impactCategory: {
        type: String,
        default: "",
        required: true
    },
    impactSubcategory: {
        type: [String],
        default: "",
        required: true
    },
    businessFocus: {
        type: String,
        default: "",
        required: false
    },
    asxCode: {
        type: String,
        default: "",
        required: true
    },
    
    website: {
        type: String,
        default: "",
        required: false
    },
    description: {
        type: String,
        defualt: "",
        required: false
    }
})

var companyData = mongoose.model('companie', companySchema);
module.exports = companyData;