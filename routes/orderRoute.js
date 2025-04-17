const express = require("express");
const {
  createOrder,
  getMyOrders,
  getAvailableOrders,
  acceptOrder,
  getMyOrdersStudent,
} = require("../services/orderService");

const { createOrderValidator } = require("../utils/validators/orderValidator");

const { protect, allowedTo } = require("../services/authService");
const router = express.Router();

router.use(protect);
router.get("/", allowedTo("user"), getMyOrders);
router.post("/", allowedTo("user"), createOrderValidator, createOrder);

router.get("/student/available", allowedTo("student"), getAvailableOrders);
router.post("/student/accept", allowedTo("student"), acceptOrder);
router.get("/student/myOrders", allowedTo("student"), getMyOrdersStudent);

module.exports = router;
