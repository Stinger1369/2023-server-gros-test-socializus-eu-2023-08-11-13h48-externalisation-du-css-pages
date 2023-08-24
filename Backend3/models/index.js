const fs = require('fs');
const path = require('path');
const Mongoose = require('mongoose');

const databasesConfiguration = require('../config/databases');

const connections = {};
const db = {};

// Create connections and models
databasesConfiguration.forEach((databaseInfo) => {
  const connection = Mongoose.createConnection(databaseInfo.connection.url, databaseInfo.connection.options);
  connections[databaseInfo.name] = connection;

  const modelsDir = databaseInfo.modelsDir || path.join(__dirname, databaseInfo.name);
  fs
    .readdirSync(modelsDir) // Read all files in the models directory
    .filter((file) => file.indexOf('.') !== 0 && file !== 'index.js') // Filter out non js files and index.js
    .forEach((file) => {  // For each model file
      try {
        const model = require(path.join(modelsDir, file))(connection, Mongoose); // Require the model file
        db[model.modelName] = model;  // Add the model to the db object
      } catch (error) {
        console.error(`Model creation error: ${error}`);
      }
    });
});

db.objectMapping = Mongoose;
db.connections = connections;

module.exports = db;
