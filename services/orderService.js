const asyncHandler = require("express-async-handler");

const ApiError = require("../utils/apiError");
const sendEmail = require("../utils/sendEmail");

const User = require("../models/userModel");
const Order = require("../models/orderModel");

exports.createOrder = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new ApiError("User not found", 404));
  }
  await Order.create({
    user: user._id,
    type: req.body.type,
  });

  res.status(200).json({
    msg: "appointment created",
  });
});

exports.getMyOrders = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new ApiError("User not found", 404));
  }
  const orders = await Order.find({ user: user._id });

  res.status(200).json({
    count: orders.length,
    orders,
  });
});

exports.getAllOrders = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new ApiError("User not found", 404));
  }
  const orders = await Order.find().populate({
    path: "user",
    select: "fullName profileImg Email Phone",
  });

  res.status(200).json({
    count: orders.length,
    orders,
  });
});
