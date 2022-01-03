const Models = require('../../models');
const asxApi = require('./asxApi');
const companyFinanceService = require('./companyFinanceService');
var companyList = [];


//populate the array holding the asxCode to update company, and date of last update
const intialFillCompanyList = async () => {
    let companies = await Models.companyFinance.find();
    companies.forEach(company => {
        companyList.push({asxCode: company.asxCode, lastUpdateTime: new Date()});
    });
    updateDocs();
}


const addCompanyOnCreate = (newCompanyAsxCode) => {
    companyList.push({asxCode: newCompanyAsxCode, lastUpdateTime: new Date()});
}



//Checks the local time in syndey, and returns true if asx is trading (between 10am and 4pm)
const isAsxTrading = () => {
    let date = new Date();
    let options = {
        hour: 'numeric', minute: 'numeric', second: 'numeric',
        timeZone: 'Australia/Sydney',
        timeZoneName: 'short',
        hour12: false
      };
    let SydneyLocalTime = new Intl.DateTimeFormat('en-AU', options).format(date);

    SydneyLocalTime = SydneyLocalTime.substring(0, 2);
    SydneyLocalTime = parseInt(SydneyLocalTime);
    if (SydneyLocalTime > 8 && SydneyLocalTime < 16){
        return true;
    } else {
        return false;
    }
}

//updates each finance company doc with recent data if the asx is still trading
setInterval(async () => {
    if (isAsxTrading()){
      updateDocs();
    }
  }, (20*60000)); //company finance collection is updated in 60 min interval

const updateDocs = async () => {
    let i = 0;
    console.log('\nUpdating company finance data')
    for (i; i < companyList.length; i++){

        //Time of update
        let date = new Date();
        let options = {
            hour: 'numeric', minute: 'numeric', second: 'numeric',
            timeZone: 'Australia/Sydney',
            timeZoneName: 'short',
            hour12: false
        };
        let SydneyLocalTime = new Intl.DateTimeFormat('en-AU', options).format(date);

        let data = await asxApi.shareTimeData(companyList[i].asxCode);
        data = data.data;
        let updateObj = {
            priceLast: data.last_price,
            priceOpen: data.open_price,
            priceHigh: data.day_high_price,
            priceLow: data.day_low_price,
            date: SydneyLocalTime,
            volume: data.volume,
            priceChangePct: data.change_in_percent.substring(0, data.change_in_percent.length -1),
            priceBuy: data.offer_price,
            priceSell: data.bid_price,
            marketcap: data.market_cap, 
            priceChangeToday: data.change_price
        }


        await companyFinanceService.updateCompany(companyList[i].asxCode, updateObj);
        console.log('>>>>>', companyList[i].asxCode)
    }
    console.log('Update finished\n')
}





module.exports = { addCompanyOnCreate, intialFillCompanyList, addCompanyOnCreate}
