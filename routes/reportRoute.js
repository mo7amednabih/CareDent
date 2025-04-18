const express = require("express");
const authService = require("../services/authService");
const {
  createReport,
  getMyreport,
  getReports,
  getReport,
  updateReport,
  deleteReport,
} = require("../services/reportService");

// const {
//   getReportValidator,
//   createReportsValidator,
//   updateReportsValidator,
//   deleteReportsValidator,
// } = require("../utils/validators/reportValidator");

const router = express.Router();

router.route("/myreport").get(getMyreport);

router
  .route("/")
  .post(
    authService.protect,
    authService.allowedTo("user", "student"),
    createReport
  )
  .get(getReports);
router
  .route("/:id")
  .get(
    // getReportValidator,
    getReport
  )
  .put(
    authService.protect,
    authService.allowedTo("user", "student"),
    // updateReportsValidator,
    updateReport
  )
  .delete(
    authService.protect,
    authService.allowedTo("admin"),
    // deleteReportsValidator,
    deleteReport
  );
module.exports = router;
