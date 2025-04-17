const express = require("express");
const {
  createOrder,
  getMyOrders,
  getAllOrders,
  acceptOrder,
} = require("../services/orderService");

const { createOrderValidator } = require("../utils/validators/orderValidator");

const { protect, allowedTo } = require("../services/authService");
const router = express.Router();

router.use(protect);
router.get("/", allowedTo("user"), getMyOrders);
router.post("/", allowedTo("user"), createOrderValidator, createOrder);

router.get("/all", allowedTo("student"), getAllOrders);
router.post("/accept", allowedTo("student"), acceptOrder);

module.exports = router;
