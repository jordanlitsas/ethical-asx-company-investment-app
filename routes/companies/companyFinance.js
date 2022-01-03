const express = require("express");
const Controllers = require("../../controllers");
const router = express.Router();




router.get('/:asxCode', (req, res) => {
    Controllers.companyFinanceController.getCompany(req, res);
});




module.exports = router;


