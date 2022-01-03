const express = require("express");
const Controllers = require('../../controllers');
const router = express.Router();


router.get('/', (req, res) => {
    Controllers.employmentDetailsController.getEmploymentDetails(req, res);
});

router.post('/', (req, res) => {
    Controllers.employmentDetailsController.insertEmploymentDetails(req, res);
});

router.delete('/', (req, res) => {
    Controllers.employmentDetailsController.deleteEmploymentDetails(req, res);
});

router.put('/', (req, res) => {
    Controllers.employmentDetailsController.updateEmploymentDetails(req, res);
});

module.exports = router;