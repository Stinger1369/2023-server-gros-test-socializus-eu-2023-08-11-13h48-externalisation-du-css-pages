const express = require('express');
const { PermissionMiddlewareCreator } = require('forest-express-mongoose');
const { user } = require('../models');

const router = express.Router();
const permissionMiddlewareCreator = new PermissionMiddlewareCreator('user');

//🇬🇧 This file contains the logic of every route in Forest Admin for the collection user:
//🇬🇧 - Native routes are already generated but can be extended/overriden - Learn how to extend a route here: https://docs.forestadmin.com/documentation/reference-guide/routes/extend-a-route
//🇬🇧 - Smart action routes will need to be added as you create new Smart Actions - Learn how to create a Smart Action here: https://docs.forestadmin.com/documentation/reference-guide/actions/create-and-manage-smart-actions

//🇬🇧 Create a User //🇫🇷 Créer un utilisateur
router.post('/user', permissionMiddlewareCreator.create(), (request, response, next) => {
  //🇬🇧 Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#create-a-record
  next();
});

//🇬🇧 Update a User //🇫🇷 Mettre à jour un utilisateur
router.put('/user/:recordId', permissionMiddlewareCreator.update(), (request, response, next) => {
  //🇬🇧 Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#update-a-record
  next();
});

//🇬🇧 Delete a User //🇫🇷 Supprimer un utilisateur
router.delete('/user/:recordId', permissionMiddlewareCreator.delete(), (request, response, next) => {
  //🇬🇧 Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#delete-a-record
  next();
});

//🇬🇧 Get a list of Users //🇫🇷 Obtenir une liste d'utilisateurs
router.get('/user', permissionMiddlewareCreator.list(), (request, response, next) => {
  //🇬🇧 Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#get-a-list-of-records
  next();
});

//🇬🇧 Get a number of Users //🇫🇷 Obtenir un nombre d'utilisateurs
router.get('/user/count', permissionMiddlewareCreator.list(), (request, response, next) => {
  //🇬🇧 Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#get-a-number-of-records
  //🇬🇧 Improve performances disabling pagination: https://docs.forestadmin.com/documentation/reference-guide/performance#disable-pagination-count
  next();
});

//🇬🇧 Get a User //🇫🇷 Obtenir un utilisateur
router.get('/user/\\b(?!count\\b):recordId', permissionMiddlewareCreator.details(), (request, response, next) => {
  //🇬🇧 Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#get-a-record
  next();
});

//🇬🇧 Export a list of Users //🇫🇷 Exporter une liste d'utilisateurs
router.get('/user.csv', permissionMiddlewareCreator.export(), (request, response, next) => {
  //🇬🇧 Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#export-a-list-of-records
  next();
});
 
//🇬🇧 Delete a list of Users //🇫🇷 Supprimer une liste d'utilisateurs
router.delete('/user', permissionMiddlewareCreator.delete(), (request, response, next) => {
  //🇬🇧 Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#delete-a-list-of-records
  next();
});

module.exports = router;
