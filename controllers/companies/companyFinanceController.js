const Services = require('../../services')

const getCompany = async (req, res) => {
    let selectedCompanyAsxCode = req.params.asxCode;
    selectedCompanyAsxCode = selectedCompanyAsxCode.toUpperCase();
    let companyFinanceDoc = await Services.companyFinanceService.getCompany({asxCode: selectedCompanyAsxCode});
    if (companyFinanceDoc != null){
        companyFinanceDoc = await structureResponse(companyFinanceDoc);
        res.status(200).send({code: 0, result: companyFinanceDoc});
    } else {
        res.status(204).send();
    }
    
}

const insertCompanyFinance = async (asxCode, name, res) => {

        let existingCompany = await Services.companyFinanceService.getCompany({asxCode: asxCode});
        if (existingCompany != null){
            res.status(400).send({code: 1, errMsg: "A record of this company finance doc already exists."})
        } else {
            let companyFinanceDoc = {asxCode: asxCode, name: name};    
            companyFinanceDoc = await Services.companyFinanceService.insertCompany(companyFinanceDoc);            
            Services.companyFinanceTracker.addCompanyOnCreate(companyFinanceDoc);
            res.status(200).send({code: 0});
       
      
        }
       

    
}

const structureResponse = async (companyFinanceDoc) => {

    let structuredResponse = {
        name: companyFinanceDoc.name,
        asxCode: companyFinanceDoc.asxCode,
        priceLast: companyFinanceDoc.priceLast,
        volume: companyFinanceDoc.volume,
        priceHigh: companyFinanceDoc.priceHigh,
        priceLow: companyFinanceDoc.priceLow,
        priceOpen: companyFinanceDoc.priceOpen,
        priceChangePct: companyFinanceDoc.priceChangePct,
        priceBuy: companyFinanceDoc.priceBuy,
        priceSell: companyFinanceDoc.priceSell,
        marketCap: companyFinanceDoc.marketCap,
        priceChangeToday: companyFinanceDoc.priceChangeToday
    }

    return structuredResponse;
}




module.exports = {getCompany, insertCompanyFinance}

