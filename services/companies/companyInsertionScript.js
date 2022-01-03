

const run = async (req, res) => {
    var fs = require('fs');
    var companyController = require('../../controllers/company_dashboard_controller')
    
    var data = fs.readFileSync('C:/uni/inaam/inaam/backend/services/company_data.csv')
        .toString() // convert Buffer to string
        .split('\n') // split string to lines
        .map(e => e.trim()) // remove white spaces for each line
        .map(e => e.split(',,,').map(e => e.trim())); // split each line to array
    
    let cleanArray = [];
    data.forEach(subArray => {
            let businessFocus = subArray[0];
            
            businessFocus = subArray[0].substring(4);
            businessFocus = businessFocus.replace(/['"]+/g, '');
            businessFocus = businessFocus.trim();
            let companyData = {asxCode: subArray[0].substring(0, 3), businessFocus: businessFocus};
            cleanArray.push(companyData);
        
       
    });
    
    let categories = ["Clean Energy", "Waste & Recycling", "Sustainable Agriculture", "Sustainable Consumption", "Health & Wellbeing"];
    let subcategories = [
        "Solar Plant",
        "Wind Farm",
        "Hydroelectric Plant",
        "Biomass Plant",
        "Electric Vehicle Production",
        "Recycling Plant",
        "Food Waste Transformation",
        "Ocean Clean Up",
        "CO2 Capture",
        "Ocean Water Purification",
        "Hydroponic Facility",
        "Plant Based Meat",
        "Sustainable Farming",
        "Seaweed Farming",
        "Reforestation Carbon Credits",
        "Responsible Fashion",
        "Responsible Coffee",
        "Responsible Cocoa",
        "Zero Carbon Tech",
        "Responsible Packaging"
    ];
    
    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
      }

      
    let i = 0;
    for (i; i < cleanArray.length; i++){
    // cleanArray.forEach( async company => {
        
        let category = randomIntFromInterval(0, 4);
        category = categories[category];
    
        let subcategory = randomIntFromInterval(0, 18);
        subcategory = subcategories[subcategory];
    
        let res = {}
        let req = {};
        req['body'] = {};
        req.body['companyData'] = {asxCode: cleanArray[i].asxCode, impactCategory: category, impactSubcategory: subcategory, businessFocus: cleanArray[i].businessFocus};
        
        if (req.body.companyData.asxCode.length == 3 && req.body.companyData.businessFocus.length > 5){
            res = await companyController.insertCompany(req, res);
            console.log(cleanArray[i])
        }
        
       
    }
}

module.exports = {run}