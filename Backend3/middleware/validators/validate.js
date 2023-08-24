const { validationResult } = require("express-validator");
// const { logger } = require("../../middleware/logger");
/**
 *
 * @param {ValidationChain[]} validations inputs validator to validate
 * @returns 400 Bad request with error messages or go to the next middleware
 */
// validate est une fonction qui prend en paramètre un tableau de validations et qui retourne une fonction qui prend en paramètre req, res et next.
const validate = (validations) => async (req, res, next) => {
  for (const validation of validations) { // Pour chaque validation dans le tableau de validations
    const result = await validation.run(req); // On exécute la validation sur la requête
    if (result.errors.length) break; // Si la validation échoue, on sort de la boucle
  }

  const errors = validationResult(req).formatWith(({ msg }) => msg); // On récupère les erreurs de la requête

  if (!errors.isEmpty()) {
    return res.status(400).json({ // Si il y a des erreurs, on renvoie une erreur 400 avec les erreurs
      status: "Bad Request",
      error: errors,
    });
  }

  return next();  // Si tout est bon, on passe au middleware suivant
};

module.exports = validate;
