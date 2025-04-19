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
  const orders = await Order.find({ user: user._id }).populate({
    path: "student",
    select: "fullName profileImg Email Phone healthRecord",
  });

  res.status(200).json({
    count: orders.length,
    orders,
  });
});

exports.getAvailableOrders = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new ApiError("User not found", 404));
  }
  const orders = await Order.find({ student: { $exists: false } }).populate({
    path: "user",
    select: "fullName profileImg Email Phone healthRecord",
  });

  res.status(200).json({
    count: orders.length,
    orders,
  });
});

exports.acceptOrder = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new ApiError("User not found", 404));
  }

  const test = await Order.findById(req.body.appointment);
  if (test.student) {
    res.status(400).json({ msg: "this appointment is already toke" });
  }

  const order = await Order.findByIdAndUpdate(
    req.body.appointment,
    { student: user._id, date: req.body.date, time: req.body.time },
    { new: true }
  );

  res.status(200).json({
    order,
    msg: "the appointment has been successfully scheduled",
  });
});

exports.getMyOrdersStudent = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new ApiError("User not found", 404));
  }
  const orders = await Order.find({ student: user._id }).populate({
    path: "user",
    select: "fullName profileImg Email Phone healthRecord",
  });

  res.status(200).json({
    count: orders.length,
    orders,
  });
});

exports.deleteOrder = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new ApiError("User not found", 404));
  }

  const test = await Order.findById(req.params.appointment);

  if (!test) {
    return next(new ApiError("Appointment not found", 404));
  }

  // تأكد إن اليوزر هو صاحب الطلب
  if (test.user.toString() !== req.user._id.toString()) {
    return next(
      new ApiError("You are not authorized to delete this appointment", 403)
    );
  }

  // تأكد إن الحجز مش محجوز من قبل طالب
  if (test.student) {
    return res.status(400).json({
      msg: "This appointment is already taken, can't delete",
    });
  }

  const order = await Order.findByIdAndDelete(req.params.appointment);

  res.status(200).json({
    order,
    msg: "The appointment has been successfully deleted",
  });
});
