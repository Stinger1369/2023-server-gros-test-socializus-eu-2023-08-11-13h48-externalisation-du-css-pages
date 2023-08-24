const mongoose = require('mongoose');//🇫🇷mongoose : permet de gérer la base de données //🇬🇧mongoose: used to manage the database
mongoose.set('useCreateIndex', true); //🇫🇷set : permet de gérer les options de la base de données //🇬🇧set: used to manage database options
const path = require('path'); //🇫🇷path : permet de gérer les chemins //🇬🇧path: used to manage paths

const databaseOptions = { //🇫🇷databaseOptions : permet de gérer les options de la base de données //🇬🇧databaseOptions: allows you to manage database options
  useNewUrlParser: true, //🇫🇷This option is specific to MongoDB's driver for Node.js. //🇬🇧Cette option est spécifique au pilote de MongoDB pour Node.js.
  useUnifiedTopology: true, //🇬🇧This option is also specific to MongoDB's driver for Node.js. //🇫🇷Cette option est également spécifique au pilote de MongoDB pour Node.js.
};

//🇫🇷 permet d'exporter un module ou un objet en tant que module dans Node.js. //🇬🇧 allows to export a module or an object as a module in Node.js.
module.exports = [{ //🇫🇷module.exports : permet d'exporter un module ou un objet en tant que module dans Node.js. //🇬🇧module.exports: allows to export a module or an object as a module in Node.js.
  name: 'default', //🇫🇷name : permet de gérer le nom de la base de données //🇬🇧name: used to manage the name of the database
  modelsDir: path.resolve(__dirname, '../models'), //🇫🇷modelsDir : permet de gérer les modèles //🇬🇧modelsDir: used to manage models
  connection: { //🇫🇷connection : permet de gérer la connexion à la base de données //🇬🇧connection: used to manage the connection to the database
    url: process.env.DATABASE_URL, //🇫🇷url : permet de gérer l'url de la base de données //🇬🇧url: used to manage the database url
    options: { ...databaseOptions }, //🇫🇷options : permet de gérer les options de la base de données //🇬🇧options: allows to manage database options
  },
}];
