const Services = require('../../services')

const getTaxDetails = async (req, res) => {
    let userId = req.query.userId;

    let userIdValidation = await Services.userService.validateUser(userId);
    if (typeof(userIdValidation) == 'string'){
        res.status(400).send({code: 1, errMsg: userIdValidation})
    } else {

        let taxDetails = await Services.taxDetailsService.getTaxDetails(userId);

        if (taxDetails != null){
            res.send({result: taxDetails});
        } else {
            res.status(204).send(); 
        }
    }
}


const insertTaxDetails = async (req, res) => {

    let userId = req.body.userId;

    let validUserId = Services.userService.validateUser(userId);
    if (validUserId){
        validUserId = await Services.userService.getUserWithUserId(userId);
    }
    if (!validUserId){
        res.status(400).send({code: 1, errMsg: "userId is not associated with a user."});
    } else {
        let taxDetails = await Services.taxDetailsService.getTaxDetails(userId);

        if (taxDetails != null){
          
            res.status(400).send({code: 1, errMsg: "User tax details already exist."})
        } else {    
            let taxDetailsDoc = {userId: userId};    
            taxDetailsDoc = await Services.taxDetailsService.insertTaxDetails(taxDetailsDoc);            
            res.status(200).send({code: 0});
        }
    }
}


const updateTaxDetails = async (req, res) => {

    let userId = req.body.userId;

    let validUserId = Services.userService.validateUser(userId);
    if (validUserId){
        validUserId = await Services.userService.getUserWithUserId(userId);
    }
    if (!validUserId){
        res.status(400).send({code: 1, errMsg: "userId is not associated with a user."});
    } else {
        let taxDetails = await Services.taxDetailsService.getTaxDetails(userId);

        if (taxDetails != null){
            let taxDetailsDoc = taxDetails;
            taxDetailsDoc = await Services.taxDetailsService.updateTaxDetails(userId,taxDetailsDoc);            
            res.status(200).send({code: 0});
        } else {    
            res.status(400).send({code: 1, errMsg: "User tax record does not exist to update."})
        }
    }
}


const deleteTaxDetails = async (req, res) => {
    
    let userId = req.body.userId;

    let validUserId = Services.userService.validateUser(userId);
    if (validUserId){
        validUserId = await Services.userService.getUserWithUserId(userId);
    }
    if (!validUserId){
        res.status(400).send({code: 1, errMsg: "userId is not associated with a user."});
    } else {
        let taxDetails = await Services.taxDetailsService.getTaxDetails(userId);

        if (taxDetails != null){
            await Services.taxDetailsService.removeTaxDetailsDoc(userId);
            res.status(200).send({code: 0});
        } else {    
            res.status(400).send({code: 1, errMsg: "User tax record does not exist to delete."})
        }
    }    
}

module.exports = {getTaxDetails, insertTaxDetails, updateTaxDetails, deleteTaxDetails}