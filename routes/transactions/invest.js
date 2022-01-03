const express = require("express");
const investController = require("../../controllers/transactions/investController");
const router = express.Router();

//comment

router.post("/", (req, res) => {
    investController.makeInvestment(req, res);
});

module.exports = router;
