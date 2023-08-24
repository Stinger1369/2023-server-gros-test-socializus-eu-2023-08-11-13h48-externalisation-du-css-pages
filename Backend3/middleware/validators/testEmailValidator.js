const { body } = require("express-validator");

const emailValidator = [
  body("email")
    .isEmail()
    .withMessage("email field should be a valid email"),
    
];

module.exports = emailValidator;
