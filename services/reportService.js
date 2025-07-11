const Report = require("../models/reportModel");
const factory = require("./handlerFactory");
const User = require("../models/userModel");

const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

// exports.createReport = asyncHandler(async (req, res, next) => {
//   const user = await User.findById(req.user.id);
//   if (!user || user.createReport) {
//     return next(
//       new ApiError(
//         `No user found with id ${req.user.id} or user create report already`,
//         404
//       )
//     );
//   }

//   const existingReport = await Report.findOne({
//     $or: [{ student: req.user.id }, { user: req.user.id }],
//   });
//   if (existingReport) {
//     return next(new ApiError(`The user has already reported this order`, 400));
//   }

//   const report = await Report.create(req.body);
//   user.createReport = true;
//   user.save();

//   res.status(201).json({ data: report, message: "Report saved successfully" });
// });

exports.createReport = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user || user.createReport) {
    return next(
      new ApiError(
        `No user found with id ${req.user.id} or user already created a report`,
        404
      )
    );
  }

  // تأكد إن المستخدم مكنش قدم تقرير قبل كده سواء كان طالب أو يوزر
  const existingReport = await Report.findOne({
    $or: [{ student: req.user.id }, { user: req.user.id }],
  });

  if (existingReport) {
    return next(new ApiError(`The user has already submitted a report`, 400));
  }

  // حدد هل هو طالب أو يوزر حسب الـ role (أو استخدم شرط مناسب لحالتك)
  let reportData = { ...req.body };
  if (user.role === "student") {
    reportData.student = req.user.id;
  } else {
    reportData.user = req.user.id;
  }

  const report = await Report.create(reportData);
  user.createReport = true;
  await user.save();

  res.status(201).json({
    data: report,
    message: "Report saved successfully",
  });
});

exports.getMyreport = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new ApiError("User not found", 404));
  }
  const report = await Report.find({
    $or: [{ student: req.user.id }, { user: req.user.id }],
  });

  res.status(200).json({
    report,
  });
});

exports.getReports = asyncHandler(async (req, res, next) => {
  // استخدم aggregate لحساب متوسط التقييم
  const stats = await Report.aggregate([
    {
      $group: {
        _id: null,
        averageRating: { $avg: "$ratings" },
        totalReports: { $sum: 1 },
      },
    },
  ]);

  const reports = await Report.find()
    .populate("user", "fullName profileImg")
    .populate("student", "fullName profileImg");

  const average = stats.length > 0 ? stats[0].averageRating : 0;
  const ratingOutOfFive = Math.round((average / 5) * 100); // كنسبة مئوية من 5 نجوم

  res.status(200).json({
    reports,
    stats: {
      averageRating: average.toFixed(2),
      percentage: `${ratingOutOfFive}%`,
      totalReports: stats.length > 0 ? stats[0].totalReports : 0,
    },
  });
});

exports.getReport = factory.getOne(Report);

// exports.updateReport = factory.updateOne(Report);
exports.updateReport = asyncHandler(async (req, res, next) => {
  const currentUserId = req.user.id;
  const user = await User.findById(currentUserId);

  if (!user) {
    return next(new ApiError("No user found with this ID", 404));
  }

  // حدد نوع الفيلد اللي هتدور فيه بناءً على الـ role أو نوع المستخدم
  let searchField = user.role === "student" ? "student" : "user";

  // ابحث عن التقرير الموجود لهذا المستخدم
  const report = await Report.findOne({ [searchField]: currentUserId });

  if (!report) {
    return next(new ApiError("No report found for this user", 404));
  }

  // حدث التقرير
  const updatedReport = await Report.findOneAndUpdate(
    { [searchField]: currentUserId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    data: updatedReport,
    message: "Report updated successfully",
  });
});

exports.deleteReport = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const document = await Report.findByIdAndDelete(id);

  if (!document) {
    return next(new ApiError(`No document for this id ${id}`, 404));
  }
  const user = await User.findOne({
    _id: { $in: [document.student, document.user] },
  });

  if (user) {
    user.createReport = false;
    await user.save();
  }
  res.status(204).json({
    user,
  });
});
