const express = require("express");
const Controllers = require('../../controllers');
const router = express.Router();


router.get('/', (req, res) => {
    Controllers.taxDetailsController.getTaxDetails(req, res);
});

router.post('/', (req, res) => {
    Controllers.taxDetailsController.insertTaxDetails(req, res);
});

router.delete('/', (req, res) => {
    Controllers.taxDetailsController.deleteTaxDetails(req, res);
});

router.put('/', (req, res) => {
    Controllers.taxDetailsController.updateTaxDetails(req, res);
});

module.exports = router;