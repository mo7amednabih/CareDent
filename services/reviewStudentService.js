const ReviewStudentModel = require("../models/review(Student)Model");
const factory = require("./handlerFactory");
const Order = require("../models/orderModel");

const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

//Nested route
// Get /products/sdjsdjshdsjsd/reviews
exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.studentId) filterObject = { student: req.params.studentId };
  req.filterObj = filterObject;
  next();
};

exports.getReviews = asyncHandler(async (req, res, next) => {
  const reviews = await ReviewStudentModel.find()
    // .populate(
    //   "user",
    //   "fullName profileImg"
    // );
    .populate("user", "fullName profileImg");

  res.status(200).json({
    reviews,
  });
});

exports.getReview = factory.getOne(ReviewStudentModel);

//Nested route
// Post /products/sdjsdjshdsjsd/reviews
exports.setStudentIdAndUserIdToBody = (req, res, next) => {
  if (!req.body.student) req.body.student = req.params.studentId;
  if (!req.body.user) req.body.user = req.user._id;
  next();
};
// exports.createReview = factory.createOne(ReviewStudentModel);
exports.createReview = asyncHandler(async (req, res, next) => {
  const test = await ReviewStudentModel.findOne({
    appointment: req.body.appointment,
  });
  if (test) {
    return next(
      new ApiError(`the student was reviewed already in this order`, 404)
    );
  }

  const review = await ReviewStudentModel.create(req.body);
  await Order.findByIdAndUpdate(
    req.body.appointment,
    { status: "Completed" },
    {
      new: true,
    }
  );
  res.status(201).json({ data: review });
});
exports.updateReview = factory.updateOne(ReviewStudentModel);
exports.deleteReview = factory.deleteOne(ReviewStudentModel);
