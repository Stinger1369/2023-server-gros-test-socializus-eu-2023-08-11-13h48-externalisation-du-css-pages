const { body } = require("express-validator"); // body : permet de récupérer les données envoyées par le client

const loginValidator = [
  body("email")
    .isEmail() // isEmail : permet de vérifier si la valeur est un email
    .withMessage("email field should be a valid email"), // withMessage : permet de gérer les messages d'erreur
    
  body("password")
    .isString()
    .isLength({ min: 8 })
    .withMessage("password field should be at least 8 characters"),
];

module.exports = loginValidator;  
