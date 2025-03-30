const express = require("express");
const { createOrder, getMyOrders } = require("../services/orderService");

const { createOrderValidator } = require("../utils/validators/orderValidator");

const { protect, allowedTo } = require("../services/authService");
const router = express.Router();

router.use(protect, allowedTo("user"));

router.get("/", getMyOrders);
router.post("/", createOrderValidator, createOrder);

module.exports = router;
