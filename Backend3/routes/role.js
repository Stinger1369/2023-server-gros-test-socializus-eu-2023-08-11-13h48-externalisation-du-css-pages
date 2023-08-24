const express = require('express');
const { PermissionMiddlewareCreator } = require('forest-express-mongoose');
const { role } = require('../models');

const router = express.Router();
const permissionMiddlewareCreator = new PermissionMiddlewareCreator('role');

//🇬🇧 This file contains the logic of every route in Forest Admin for the collection role:
//🇬🇧 - Native routes are already generated but can be extended/overriden - Learn how to extend a route here: https://docs.forestadmin.com/documentation/reference-guide/routes/extend-a-route
//🇬🇧 - Smart action routes will need to be added as you create new Smart Actions - Learn how to create a Smart Action here: https://docs.forestadmin.com/documentation/reference-guide/actions/create-and-manage-smart-actions

//🇬🇧 Create a Role //🇫🇷 Créer un rôle
router.post('/role', permissionMiddlewareCreator.create(), (request, response, next) => {
  //🇬🇧 Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#create-a-record
  next();
});

//🇬🇧 Update a Role //🇫🇷 Mettre à jour un rôle
router.put('/role/:recordId', permissionMiddlewareCreator.update(), (request, response, next) => {
  //🇬🇧 Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#update-a-record
  next();
});

//🇬🇧 Delete a Role //🇫🇷 Supprimer un rôle
router.delete('/role/:recordId', permissionMiddlewareCreator.delete(), (request, response, next) => {
  //🇬🇧 Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#delete-a-record
  next();
});

//🇬🇧 Get a list of Roles //🇫🇷 Obtenez une liste de rôles
router.get('/role', permissionMiddlewareCreator.list(), (request, response, next) => {
  //🇬🇧 Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#get-a-list-of-records
  next();
});

//🇬🇧 Get a number of Roles //🇫🇷 Obtenez un certain nombre de rôles
router.get('/role/count', permissionMiddlewareCreator.list(), (request, response, next) => {
  //🇬🇧 Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#get-a-number-of-records
  //🇬🇧 Improve performances disabling pagination: https://docs.forestadmin.com/documentation/reference-guide/performance#disable-pagination-count
  next();
});

//🇬🇧 Get a Role //🇫🇷 Obtenir un rôle
router.get('/role/\\b(?!count\\b):recordId', permissionMiddlewareCreator.details(), (request, response, next) => {
  //🇬🇧 Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#get-a-record
  next();
});

//🇬🇧 Export a list of Roles //🇫🇷 Exporter une liste de Rôles
router.get('/role.csv', permissionMiddlewareCreator.export(), (request, response, next) => {
  //🇬🇧 Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#export-a-list-of-records
  next();
});

//🇬🇧 Delete a list of Roles //🇫🇷 Supprimer une liste de Rôles
router.delete('/role', permissionMiddlewareCreator.delete(), (request, response, next) => {
  //🇬🇧 Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#delete-a-list-of-records
  next();
});

module.exports = router;
