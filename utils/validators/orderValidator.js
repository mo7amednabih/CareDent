const { check } = require("express-validator");
const validatorMiddleware = require("../../middleware/validatorMiddleware");
const Order = require("../../models/orderModel");

exports.createOrderValidator = [
  check("type")
    .notEmpty()
    .withMessage("Type is required")
    .isIn([
      "Tooth Extraction",
      "Veneers",
      "Root Canal Treatment",
      "Dental Filling",
      "Scaling & Polishing",
      "Orthodontics (Braces)",
    ])
    .withMessage("Invalid type value"),

  check("type").custom(async (value, { req }) => {
    const existingOrder = await Order.findOne({
      user: req.user._id,
      type: value,
      status: "upComing",
    });

    if (existingOrder) {
      throw new Error(`You already have an upcoming appointment for ${value}`);
    }
  }),

  validatorMiddleware,
];
