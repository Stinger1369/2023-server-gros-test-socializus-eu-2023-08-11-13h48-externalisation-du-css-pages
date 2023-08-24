const chalk = require('chalk'); // Chalk permet de colorer les messages dans la console
const path = require('path');  // Path permet de manipuler les chemins de fichiers
const Liana = require('forest-express-mongoose'); // Forest-express-mongoose permet de créer un back-office
const { objectMapping, connections } = require('../models');

module.exports = async function forestadmin(app) { // On exporte une fonction qui prend en paramètre app
  app.use(await Liana.init({  // On utilise le middleware Liana
    configDir: path.join(__dirname, '../forest'), // On indique le chemin du dossier forest
    envSecret: process.env.FOREST_ENV_SECRET, // On indique la clé secrète de l'environnement
    authSecret: process.env.FOREST_AUTH_SECRET, // On indique la clé secrète de l'authentification
    schemaDir: process.env.FOREST_SCHEMA_DIR, // On indique le chemin du dossier schema
    objectMapping, // On indique l'objet objectMapping
    connections, // On indique l'objet connections
  }));

  console.log(chalk.cyan('Your admin panel is available here: https://app.forestadmin.com/projects'));
};
