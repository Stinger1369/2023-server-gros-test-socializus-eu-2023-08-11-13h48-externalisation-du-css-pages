const express = require("express");
const {
  signin,
  signup,
  changePassword,
  testUser,
  // sendEmailVerification,
  sendCode,
  checkCode,
  checkMail,
} = require("../../controllers/v1/LoginControllers");
const router = express.Router();
const validate = require("../../middleware/validators/validate");
const loginValidator = require("../../middleware/validators/loginValidator");
const emailValidator = require("../../middleware/validators/testEmailValidator");

router.post("/login", validate(loginValidator), signin);
// router.post("/email-send", sendEmailVerification);
router.post("/change-password", changePassword);
router.post("/signup", validate(loginValidator), signup);
router.post("/verify-email", checkMail);
router.post("/sendcode", sendCode);
router.post("/checkcode", checkCode); // sendEmailVerification,
router.post("/test-email", validate(emailValidator), testUser);

module.exports = router;
