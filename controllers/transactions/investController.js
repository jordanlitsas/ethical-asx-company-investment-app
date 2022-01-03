const Services = require('../../services');
const transactionHistoryController = require('../../controllers/transactions/transactionHistoryContoller')

const makeInvestment = async (req, res) => {
    let asxCode = req.body.asxCode;
    let transactionUnitPrice = req.body.amount;
    let quantity = req.body.quantity;
    let userId = req.body.userId;
    let transactionDate = + new Date(); //Our system records the date of purchase as the time of actioning an investment on Inaam, not the official transaction time
    let flag = true; //set to false when an error has occured and makeInvestment actions should stop
    let transactionSuccess = false;

    if (asxCode == null || transactionUnitPrice == null || quantity == null || userId == null){
        flag = false;
    }

    if (flag){
        //validate user
        let validUser = await Services.userService.validateUser(userId);
        let validAsxCode = await Services.companyService.getCompany({asxCode: asxCode});
        if (typeof(validUser) == 'string'){
            res.status(400).send({code: 1, errMsg: validUser})
        } else if (!validAsxCode){ //validate asxCode
            res.status(400).send({code: 1, errMsg: "asxCode is not associated with a company doc."})
        }
    } else {
        res.status(400).send({code: 1, errMsg: "Missing request data."})
 
    }
   
    
    if (flag){
        /*
            The current scope of this iteration does not allow for the implementation of making a real-world investment.
            When this is implemented, the return value for this action should be as follows:
                - true: 
                    -- The user associated with the userId (user document's _id value) is the person making the realworld investment.
                    -- The investment was successfuly transacted for the given investmentAUDTotal (amount spent) with the company associated with the asxCode.
                        - Note: the invest functionality currently only allows for AUD. 
                    -- Other validation measures that will be discovered during the design stage of this functionality
                
                - false:
                    -- Any of the three points in the list above were violated.
                    -- For any reason the transaction was not successful/able to be made.
            
            For the time being, success will remain being equal to true for development purposes.

            Assumptions:
                - returns false when the given financial item unit price is not available at the value of transactionUnitPrice
        */
            transactionSuccess = true; 

    }


   
    //if the investment transaction was successful
    if (transactionSuccess){

        let transactionReference = {
            userId: userId, 
            purchaseDate: transactionDate, 
            purchasePrice: transactionUnitPrice,
            quantity: quantity,
            asxCode: asxCode
         };

        let response = await transactionHistoryController.createTransactionRecord(transactionReference);
        if (response == 0){
        
            res.status(200).send({code: 0});
        } else {
            console.log(response)
            res.status(400).send({code: 1, errMsg: response.error});
        }

    }

}

module.exports = {makeInvestment}