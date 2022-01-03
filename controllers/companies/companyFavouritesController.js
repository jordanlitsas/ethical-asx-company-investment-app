const Services = require('../../services')

const getCompanies = async (req, res) => {
    let userId = req.query.userId;

    let userIdValidation = await Services.userService.validateUser(userId);
    if (typeof(userIdValidation) == 'string'){
        res.status(400).send({code: 1, errMsg: userIdValidation})
    } else {

        let companyFavouritesList = await Services.companyFavouritesService.getCompanies(userId);
        let responseObj = [];
        let i = 0;

        /*
            for every company in the favourites list
            get their company and companyFinance documents
            extract the necessary values to form the correct response structure
            push to array
        */
        if (companyFavouritesList != null){
            for (i; i < companyFavouritesList.asxCodes.length; i++){
    
                let asxCode = companyFavouritesList.asxCodes[i];
            
                let companyFinanceDoc = await Services.companyFinanceService.getCompany({asxCode: asxCode});
                let companyDoc = await Services.companyService.getCompany({asxCode: asxCode});
                
                let company = {
                    name: companyFinanceDoc.name,
                    asxCode: companyFinanceDoc.asxCode,
                    priceChange: companyFinanceDoc.priceChangePct,
                    currentPrice: companyFinanceDoc.priceLast,
                    introduction: companyDoc.businessFocus
                };
                responseObj.push(company)
                
            }
            res.send({code: 0, result: responseObj});
        } else {
            res.status(204).send(); //user has no company favourite list
        }
    }
    
   

    
}

const insertCompany = async (req, res) => {
    let asxCode = req.body.asxCode;
    let userId = req.body.userId;

    /*
        calling findWithId() with an invalid ObjectId causes a cast error.
        ensures both incorrect ObjectId structure, and correct ObjectId structure but no in the collection, returns the error message: 
            "userId is not associated with a user"
    */
    let validUserId = Services.userService.validateUser(userId);
    if (validUserId){
        validUserId = await Services.userService.getUserWithUserId(userId);
    }
    if (!validUserId){
        res.status(400).send({code: 1, errMsg: "userId is not associated with a user."});
    } else {
        //verify the asx code is related to an existing company in the companies collection
        let company = await Services.companyService.getCompany({asxCode: asxCode});
        if (company != null){

            //get existing doc for this user
            let existingCompanyFavouritesList = await Services.companyFavouritesService.getCompanies(userId);

            //if it doesnt exist, create an instance for this user
            if (existingCompanyFavouritesList == null){
                let newListing = Services.companyFavouritesService.insertInitialCompanyFavouritesDoc(userId, asxCode)
                if (newListing != null){
                    res.status(200).send({code: 0});
                } else {
                    res.status(400).send({code: 1, errMsg: "Could not insert document in database."})
                }
            } 
        else {

            //This user already has an existing instance, so add the asxCode to the array.
            if (existingCompanyFavouritesList.asxCodes.includes(asxCode)){
                res.status(400).send({code: 1, errMsg: "User has already favourited this listing."})
            } else {
                let updatedDoc = await Services.companyFavouritesService.addCompanyToFavouritesList(userId, asxCode);

                //verify the document has been modified
                if (updatedDoc.asxCodes.length == existingCompanyFavouritesList.asxCodes.length){
                    res.status(400).send({code: 1, errMsg: "Company favourite list could not be updated."})
                } else {
                    res.status(200).send({code: 0})
                }
            
            }
            
            }
        } else {
            res.status(400).send({code: 1, errMsg: "This company asx code is not associated with any company document."})
        }
    }

    

    


}

const deleteCompany = async (req, res) => {
    let userId = req.query.userId;
    let asxCode = req.query.asxCode;

    //validate the user
    let validUserId = await Services.userService.validateUser(userId);
    if (typeof(validUserId) == 'string'){
        res.status(400).send({code: 1, errMsg: validUserId})
    } else {

        //validate asxCode
        let validAsxCode = await Services.companyService.getCompany({asxCode: asxCode});
        if (!validAsxCode){
            res.status(400).send({code: 1, errMsg: "asxCode is not associated with a company doc."})
        } else {


            //validate the user has an existing favourite list
            let companyFavouriteList = await Services.companyFavouritesService.getCompanies(userId);
            if (companyFavouriteList != null){
                if (!companyFavouriteList.asxCodes.includes(asxCode)){
                    res.status(400).send({code: 1, errMsg: "This user has not favourited this company."});
                } else {
                    let updatedDoc = await Services.companyFavouritesService.removeCompanyFromFavouritesList(userId, asxCode);
                  
                    //remove companyFavourite doc from collection if the user has no remaining favourite companies
                    if (updatedDoc.asxCodes.length == 0){
                        await Services.companyFavouritesService.removeCompanyFavouriteListDoc(userId);
                    } 
                    res.status(200).send({code: 0});
                }
            } else {
                res.status(400).send({code: 1, errMsg: "This user has no existing company favourite list to delete from."})
            }
        }
        
    }
    
    
}
module.exports = {getCompanies, insertCompany, deleteCompany}