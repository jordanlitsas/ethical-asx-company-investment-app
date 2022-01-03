const express = require("express");
const Controllers = require('../../controllers');
const router = express.Router();


router.get('/', (req, res) => {
    Controllers.bankDetailsController.getBankDetails(req, res);
});

router.post('/', (req, res) => {
    Controllers.bankDetailsController.insertBankDetails(req, res);
});

router.delete('/', (req, res) => {
    Controllers.bankDetailsController.deleteBankDetails(req, res);
});

router.put('/', (req, res) => {
    Controllers.bankDetailsController.updateBankDetails(req, res);
});

module.exports = router;