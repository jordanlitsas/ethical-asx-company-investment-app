const express = require("express");
const Controllers = require('../../controllers');
const router = express.Router();




router.get('/', (req, res) => {
    Controllers.companyFavouritesController.getCompanies(req, res);
});

router.post('/', (req, res) => {
    Controllers.companyFavouritesController.insertCompany(req, res);
})

router.delete('/', (req, res) => {
    Controllers.companyFavouritesController.deleteCompany(req, res);
})




module.exports = router;


