const express = require("express");
const { createOrder, getMyOrders } = require("../services/orderService");

const { protect, allowedTo } = require("../services/authService");
const router = express.Router();

router.use(protect, allowedTo("user"));

router.get("/", getMyOrders);
router.post("/", createOrder);

module.exports = router;
