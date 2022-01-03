const Models = require('../../models')

const getCompanies = async (query) => {
    let companies = await Models.company.find(query);
    return companies;
}

const getCompany = async (query) => {
    let company = await Models.company.findOne(query);
    return company;
}


const insertCompany = async (companyData) => {
    let company = new Models.company(companyData);
    let success = await company.save();
    return success;
}


module.exports = {getCompanies, getCompany, insertCompany}