const express = require("express");
const Controllers = require('../../controllers');
const router = express.Router();


router.get('/', (req, res) => {
    Controllers.personalDetailsController.getPersonalDetails(req, res);
});

router.post('/', (req, res) => {
    Controllers.personalDetailsController.insertPersonalDetails(req, res);
});

router.delete('/', (req, res) => {
    Controllers.personalDetailsController.deletePersonalDetails(req, res);
});

router.put('/', (req, res) => {
    Controllers.personalDetailsController.updatePersonalDetails(req, res);
});

module.exports = router;