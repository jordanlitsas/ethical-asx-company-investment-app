const express = require("express");
const portfolioController = require("../../controllers/transactions/portfolioController");
const router = express.Router();



router.get("/", (req, res) => {
    portfolioController.getPortfolio(req, res);
});

module.exports = router;
