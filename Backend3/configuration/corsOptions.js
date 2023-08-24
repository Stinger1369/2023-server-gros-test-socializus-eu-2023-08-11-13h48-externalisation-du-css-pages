const allowedOrigins = require("./allowedOrigins"); // require : permet d'importer un module

const corsOptions = {
  origin: (origin, callback) => { // origin : permet de définir l'origine de la requette
    callback(null, true); // callback : permet de retourner le résultat de la requette
  },
  credentials: true, // credentials : permet d'envoyer les cookies
  optionsSuccessStatus: 200 // optionsSuccessStatus : permet de définir le status de la requette
};

module.exports = corsOptions;
