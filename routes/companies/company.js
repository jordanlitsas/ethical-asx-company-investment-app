const express = require("express");
const Controllers = require("../../controllers");
const router = express.Router();




router.get('/', (req, res) => {
    Controllers.companyController.getCompanies(req, res);
});



router.post('/', (req, res) => {
    //add secure method for production.
    Controllers.companyController.insertCompany(req, res);
})




module.exports = router;


