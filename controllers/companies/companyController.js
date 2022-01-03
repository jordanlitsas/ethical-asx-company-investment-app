
const Services = require('../../services')
const companyFinanceController = require('./companyFinanceController')



/*
    operator: used to specify whether the user is looking at companies based on their category(clean energy, recycling and waste management etc.)
    query: the value to the operator(key) to query from the database with
 */
const getCompanies = async (req, res) => {
    let operator = req.query.operator;
    let query = req.query.query;
    let companies = "";
    let errorMessage = "";

    if (query != null){
        //replace % with space to successfuly query db
        decodeURI(query.toString());
    }
  
    if (operator == "category"){
        companies = await Services.companyService.getCompanies({impactCategory: query});
    } else if (operator == "subcategory"){
        companies = await Services.companyService.getCompanies({impactSubcategory: query});
    } else if (operator == "all"){
        companies = await Services.companyService.getCompanies({});
        companies = await structureResponse(companies, operator);
    } 
    else {
        errorMessage += "Your operator was incorrect.\n"
    }
    
    console.log(companies)

    if (companies instanceof Array){
        if (companies.length == 0){
            res.status(204).send();
        } else {
            //tailors the response for the fe requirements on the company dashboard
            
            if (operator == 'all'){
                res.status(200).send({code: 0, result: companies})
            } else {
                structureResponse(companies).then(structuredResponse => {
                    res.status(200).send({code: 0, result: structuredResponse});
                })
            }
           
        }
    } else {
        res.status(400).send(errorMessage)
    }


}


//Takes a Company document and structures it for the company dashboard
const structureResponse =  async (companies, operator) => {
    let structuredResponse = [];
    let i = 0;

    if (operator == 'all'){
        for (i; i < companies.length; i++){
            let responseObject = {
                asxCode: companies[i].asxCode,
                asxName: companies[i].name
            };
            structuredResponse.push(responseObject);
        }
        return structuredResponse;
    }

    for (i; i < companies.length; i++){
        
        let financeData = await Services.companyFinanceService.getCompany({asxCode: companies[i].asxCode});
        let responseObject = {
            asxCode: companies[i].asxCode,
            asxName: companies[i].name,
            introduction: `${companies[i].description} Industry: ${companies[i].industry}. Primary business focus: ${companies[i].businessFocus}`,
            currentPrice: financeData.priceLast,
            priceChange: financeData.priceChangePct,
        }
        structuredResponse.push(responseObject)
        }
        return structuredResponse;
    }
        

        




const insertCompany = async (req, res) => {
    let company = req.body.companyData;
    let existingCompany = await Services.companyService.getCompany({asxCode: company.asxCode});
    
    if (existingCompany != null){
        res.status(400).send({code: 0, errMsg: "This company is already listed."})
    } else {
        let data = await Services.asxApi.header(company.asxCode);
        let contactData = await Services.asxApi.descriptive(company.asxCode);
    
        let companyDoc = {
            name: data.data.data.displayName, 
            industry: data.data.data.industryGroup,
            impactCategory: company.impactCategory,
            impactSubcategory: company.impactSubcategory,
            businessFocus: company.businessFocus,
            asxCode: company.asxCode,
            marketCap: data.data.data.marketCap, 
            website: contactData.data.data.websiteUrl,
            description: contactData.data.data.description
        };
    
        let successfulInsert = true;
        try {
            let success = await Services.companyService.insertCompany(companyDoc);
            if (success == null){
                successfulInsert = false;
            }
        }
        catch (error){
            console.log('>>>', error);
            successfulInsert = false;
        }
         
    
        if (successfulInsert){
            console.log('>>>> Successful insert: ', successfulInsert)
    
            companyFinanceController.insertCompanyFinance(company.asxCode, companyDoc.name, res);
        } else {
            res.status(400).send({code: 1, errMsg: "Failed to insert company doc."})
        } 
    }
    

  


}


module.exports = {getCompanies, insertCompany}