const Services = require('../../services')

const getBankDetails = async (req, res) => {
    let userId = req.query.userId;

    let userIdValidation = await Services.userService.validateUser(userId);
    if (typeof(userIdValidation) == 'string'){
        res.status(400).send({code: 1, errMsg: userIdValidation})
    } else {

        let bankDetails = await Services.bankDetailsService.getBankDetails(userId);

        if (bankDetails != null){
            res.send({result: bankDetails});
        } else {
            res.status(204).send(); 
        }
    }
}


const insertBankDetails = async (req, res) => {

    let userId = req.body.userId;

    let validUserId = Services.userService.validateUser(userId);
    if (validUserId){
        validUserId = await Services.userService.getUserWithUserId(userId);
    }
    if (!validUserId){
        res.status(400).send({code: 1, errMsg: "userId is not associated with a user."});
    } else {
        let bankDetails = await Services.bankDetailsService.getBankDetails(userId);

        if (bankDetails != null){
          
            res.status(400).send({code: 1, errMsg: "User bank details already exist."})
        } else {    
            let bankDetailsDoc = {userId: userId};    
            bankDetailsDoc = await Services.bankDetailsService.insertBankDetails(bankDetailsDoc);            
            res.status(200).send({code: 0});
        }
    }
}


const updateBankDetails = async (req, res) => {

    let userId = req.body.userId;

    let validUserId = Services.userService.validateUser(userId);
    if (validUserId){
        validUserId = await Services.userService.getUserWithUserId(userId);
    }
    if (!validUserId){
        res.status(400).send({code: 1, errMsg: "userId is not associated with a user."});
    } else {
        let bankDetails = await Services.bankDetailsService.getBankDetails(userId);

        if (bankDetails != null){
            let bankDetailsDoc = bankDetails;
            bankDetailsDoc = await Services.bankDetailsService.updateBankDetails(userId,bankDetailsDoc);            
            res.status(200).send({code: 0});
        } else {    
            res.status(400).send({code: 1, errMsg: "User bank record does not exist to update."})
        }
    }
}


const deleteBankDetails = async (req, res) => {
    
    let userId = req.body.userId;

    let validUserId = Services.userService.validateUser(userId);
    if (validUserId){
        validUserId = await Services.userService.getUserWithUserId(userId);
    }
    if (!validUserId){
        res.status(400).send({code: 1, errMsg: "userId is not associated with a user."});
    } else {
        let bankDetails = await Services.bankDetailsService.getBankDetails(userId);

        if (bankDetails != null){
            await Services.bankDetailsService.removeBankDetailsDoc(userId);
            res.status(200).send({code: 0});
        } else {    
            res.status(400).send({code: 1, errMsg: "User bank record does not exist to delete."})
        }
    }    
}

module.exports = {getBankDetails, insertBankDetails, updateBankDetails, deleteBankDetails}