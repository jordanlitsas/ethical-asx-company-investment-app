const express = require("express");
const payment_action = require("../../controllers/payments/paymentController");
const router = express.Router();

//comment

router.post("/payment", payment_action.stripePayment);

module.exports = router;
