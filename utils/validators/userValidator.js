const { check } = require("express-validator");
const validatorMiddleware = require("../../middleware/validatorMiddleware");

const User = require("../../models/userModel");

exports.idUserValidator = [
  check("id")
    .notEmpty()
    .withMessage("User ID is required")
    .isMongoId()
    .withMessage("User ID is not valid"),
  validatorMiddleware,
];

exports.updateUserValidator = [
  check("fullName")
    .optional()
    .isLength({ min: 3 })
    .withMessage("fullName must be at least 3 characters long")
    .matches(/^[\p{L}'][ \p{L}'-]{1,49}$/u)
    .withMessage("fullName should only contain English letters"),

  validatorMiddleware,
];
