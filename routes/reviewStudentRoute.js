const express = require("express");
const authService = require("../services/authService");
const {
  createReview,
  getReviews,
  getReviewsForSpecificDoctor,
  getReview,
  updateReview,
  deleteReview,
  createFilterObj,
  setStudentIdAndUserIdToBody,
} = require("../services/reviewStudentService");

// const {
//   getReviewValidator,
//   createReviewsValidator,
//   updateReviewsValidator,
//   deleteReviewsValidator,
// } = require("../utils/validators/reviewValidator");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(
    authService.protect,
    authService.allowedTo("user"),
    setStudentIdAndUserIdToBody,
    // createReviewsValidator,
    createReview
  )
  .get(createFilterObj, getReviews);
router.route("/specificdoctor/:id").get(
  // getReviewValidator,
  getReviewsForSpecificDoctor
);

router
  .route("/:id")
  .get(
    // getReviewValidator,
    getReview
  )
  .put(
    authService.protect,
    authService.allowedTo("user"),
    // updateReviewsValidator,
    updateReview
  )
  .delete(
    authService.protect,
    authService.allowedTo("admin"),
    // deleteReviewsValidator,
    deleteReview
  );
module.exports = router;
