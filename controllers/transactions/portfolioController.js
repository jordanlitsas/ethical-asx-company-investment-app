const { response } = require('express');
const transactionHistory = require('../../models/transactions/transactionHistory');
const Services = require('../../services');

const getPortfolio = async (req, res) => {
    let userId = req.query.userId;

    //validate userId
    let validUserId = await Services.userService.validateUser(userId);

    if (typeof(validUserId) == 'string'){
        res.status(400).send({code: 1, errMsg: validUserId});
    } else {
        
        //get transaction history for user to calculate sum values for shares and net value, as well as structure response object
        let transactionHistory = await Services.transactionHistoryService.getTransactionHistory(userId);
        let transactions = transactionHistory.transactions;
        let i = 0, j = 0;
        
        
        let totalCurrenyInvested = 0;
        transactions.forEach(transaction => {
            totalCurrenyInvested += transaction.purchasePrice;
        })

        //remove one transaction per company for comparison array to loop
        var responseArray = transactions.reduce((unique, o) => {
            if(!unique.some(obj => obj.asxCode === o.asxCode)) {
              unique.push(o);
              transactions.splice(i, 1);
            }
            i++;
            return unique;
        },[]);
        i = 0;
      
        //structure the appropriate data for the portfolio view
        for (i; i < responseArray.length; i++){
            responseArray[i] = await structureResponseForNewCompany(responseArray[i])
        }
       

        //compares asxcodes between arrays, updated the matching responseArray element. 
        //This aggregates the quantities and purchase prices of a share with a given company
        i = 0;
        for (i; i < transactions.length; i++){
            let responesObj = {};
            let responseArrayTemp = [];
            let newCompany = false;

            for (j; j < responseArray.length; j++){

                if (responseArray[j].asxCode == transactions[i].asxCode){
                    responseObj = await structureResponseForChangingCompany(transactions[i], responseArray[j]); //structure object for portfolio view reqs
                    responseArray[j] = responseObj;
                    
                } else {
                    newCompany = true;
                }

               
            }
            if (newCompany){
                responesObj = await structureResponseForNewCompany(transactions[i]);
            }
            responseArray = responseArray.concat(responseArrayTemp); //concat after the loop so it's not infinite
            j = 0;
        }

        for (i = 0; i < responseArray.length; i++){
            let currentSellPrice = await Services.companyFinanceService.getCompany({asxCode:  responseArray[i].asxCode});
            currentSellPrice = currentSellPrice.priceSell;
            responseArray[i].profitAndLoss = ((currentSellPrice * responseArray[i].totalQuantity) - responseArray[i].profitAndLoss);
            responseArray[i]['portfolioPct'] = responseArray[i].totalQuantity*currentSellPrice

           
        }
       
        //change to map()
        let totalShareValue = 0;
        responseArray.forEach(portfolioLine => {
            totalShareValue += portfolioLine.portfolioPct;
        })
        responseArray.forEach(portfolioLine => {
            portfolioLine.portfolioPct = portfolioLine.portfolioPct/(totalShareValue/100)
        })
        

        res.send({code: 0, result: responseArray, totalInvestment: totalCurrenyInvested})
    }
}

const structureResponseForChangingCompany = (transaction, portfolioLineInArray) => {
    // console.log(transaction)
    // console.log(portfolioLineInArray)
    portfolioLineInArray.totalQuantity += transaction.quantity;
    portfolioLineInArray.profitAndLoss += (transaction.purchasePrice * transaction.quantity);
    // console.log(portfolioLineInArray)
    return portfolioLineInArray;
}

const structureResponseForNewCompany = async (transaction) => {
    let companyDoc = await Services.companyService.getCompany({asxCode:transaction.asxCode});
    let companyFinanceDoc = await Services.companyFinanceService.getCompany({asxCode: transaction.asxCode});
    let responseObj = {};
    
    responseObj['asxCode'] = transaction.asxCode;
    responseObj['category'] = companyDoc.impactCategory;
    responseObj['priceLast'] = companyFinanceDoc.priceLast;
    responseObj['totalQuantity'] = transaction.quantity;    
    responseObj['profitAndLoss'] = transaction.purchasePrice*transaction.quantity;  
    return responseObj;
}


module.exports = {getPortfolio};