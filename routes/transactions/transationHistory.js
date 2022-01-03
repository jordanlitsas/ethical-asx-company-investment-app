const express = require("express");
const transactionHistoryController = require("../../controllers/transactions/transactionHistoryContoller");
const router = express.Router();



router.get("/", (req, res) => {
    transactionHistoryController.getTransactionHistory(req, res);
});

module.exports = router;
