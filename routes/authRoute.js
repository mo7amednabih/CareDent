const express = require("express");
const {
  signup,
  verifyEmailUser,
  protectforget,
  protectCode,
  login,
  forgetPassword,
  verifyPassResetCode,
  resetPassword,
} = require("../services/authService");

// validator function
const {
  signupUserValidator,
  loginValidator,
  resetValidator,
} = require("../utils/validators/authValidator");

const router = express.Router();
// user endpoint
router.post("/signup", signupUserValidator, signup);
router.post("/verifyEmailUser", protectCode, verifyEmailUser);

router.post("/login", loginValidator, login);

router.post("/forgetpass", forgetPassword);
router.post("/verifycode", protectforget, verifyPassResetCode);
router.put("/resetpassword", protectforget, resetValidator, resetPassword);

module.exports = router;
