const express = require("express");
const { isAuth } = require("../middlewares/authMiddlewares");
const {
  createRazorpayOrder,
  verifyPayment,
  razorpayWebhook,
} = require("../controllers/orderController");

const orderRoutes = express.Router();

orderRoutes.post("/create-razorpay-order", isAuth, createRazorpayOrder);
orderRoutes.post("/verify-payment", isAuth, verifyPayment);
orderRoutes.post("/-webhook", razorpayWebhook);

module.exports = orderRoutes;
