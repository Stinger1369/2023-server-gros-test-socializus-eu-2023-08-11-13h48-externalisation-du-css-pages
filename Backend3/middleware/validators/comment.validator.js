const { body } = require("express-validator");
const {
  Types: { ObjectId }, // Types : permet de gérer les types
} = require("mongoose"); // mongoose : permet de gérer la base de données

// Create a comment
const commentValidator = [
  body("user") // body : permet de récupérer les données envoyées par le client
    .isString()
    .custom((value) => {
      // custom : permet de gérer les erreurs
      if (!ObjectId.isValid(value)) {
        // isValid : permet de vérifier si la valeur est valide
        throw new Error("Invalid user id");
      }
      return true;
    }),
  body("activity_id")
    .isString()
    .custom((value) => {
      if (!ObjectId.isValid(value)) {
        throw new Error("Invalid activity id");
      }
      return true;
    }),
];

module.exports = commentValidator;
