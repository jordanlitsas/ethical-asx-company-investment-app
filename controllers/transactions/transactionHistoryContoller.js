const Services = require('../../services')


//get transaction history associated with a userId
const getTransactionHistory = async (req, res) => {
    let userId = req.query.userId;

    //validate user
    let validUser = await Services.userService.validateUser(userId);
    if (typeof(validUser) == 'string'){
        res.status(400).send({code: 1, errMsg: validUser})
    }

    let transactionHistory = await Services.transactionHistoryService.getTransactionHistory(userId);
    if (transactionHistory == null){
        res.status(204).send();
    } else {
        res.status(200).send({code: 0, result: transactionHistory.transactions});
    }
}

const createTransactionRecord = async (transactionReference) => {
    // For reference: transactionReference = {userId, purchaseDate, purchasePrice, quantity, asxCode}
    
    //validate user
    let validUser = await Services.userService.validateUser(transactionReference.userId);
    if (typeof(validUser) == 'string'){
        return {error: validUser}
    }

    //verify asxCode is listed in our system. We will not record transactions that are irrelevant to this app. 
    //Technically, at this point this should already be verified.
    let existingCompany = await Services.companyService.getCompany({asxCode: transactionReference.asxCode});
    if (existingCompany == null){
        return {error: "This asx code is not associated with a company in this system."}
    }


    //check if user has existing transactions
    let transactionHistory = await Services.transactionHistoryService.getTransactionHistory(transactionReference.userId);

    //create initial doc if no transactions are associated with the userId
    if (transactionHistory == null){
        transactionReference = {
            userId: transactionReference.userId,
            transactions: [{
                purchasePrice: transactionReference.purchasePrice,
                purchaseDate: transactionReference.purchaseDate,
                quantity: transactionReference.quantity,
                asxCode: transactionReference.asxCode
            }]
        }

        let success = await Services.transactionHistoryService.createInitialTransactionHistoryDoc(transactionReference);
        if (success == null){
            return {error: "Could not create initial transaction history doc."}
        }
    } else {
        
        //add transaction to transactionHistory doc's array if there are existing transactions associated with the user
        let transaction = {
            purchasePrice: transactionReference.purchasePrice,
            purchaseDate: transactionReference.purchaseDate,
            quantity: transactionReference.quantity,
            asxCode: transactionReference.asxCode
        }
        let success = await Services.transactionHistoryService.addTransaction(transactionReference.userId, transaction);
        if (success == null){
            return {error: "Could not add transaction to transaction history doc."}
        } else {
            return 0;
        }
    }
        
    
}

module.exports = {createTransactionRecord, getTransactionHistory};
