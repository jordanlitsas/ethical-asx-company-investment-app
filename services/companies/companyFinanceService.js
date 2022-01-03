const Models = require('../../models');

const getCompany = async (query) => {
    let companyFinanceDoc = await Models.companyFinance.findOne(query);
    return companyFinanceDoc;
}

const insertCompany = async (companyFinanceData) => {
    let companyFinanceDoc = new Models.companyFinance(companyFinanceData);
    return companyFinanceDoc;
}

const updateCompany = async (asxCode, companyUpdate) => {
    let companyFinanceDoc = await Models.companyFinance.findOneAndUpdate({asxCode: asxCode}, companyUpdate, {new: true});
    return companyFinanceDoc;
}

module.exports = {getCompany, insertCompany, updateCompany};