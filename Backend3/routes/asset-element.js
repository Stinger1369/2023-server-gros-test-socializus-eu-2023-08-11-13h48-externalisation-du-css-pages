const express = require('express');
const { PermissionMiddlewareCreator } = require('forest-express-mongoose');
const { assetElement } = require('../models');

const router = express.Router();
const permissionMiddlewareCreator = new PermissionMiddlewareCreator('assetElement');

//🇬🇧This file contains the logic of every route in Forest Admin for the collection assetElement:
//🇬🇧 - Native routes are already generated but can be extended/overriden - Learn how to extend a route here: https://docs.forestadmin.com/documentation/reference-guide/routes/extend-a-route
//🇬🇧 - Smart action routes will need to be added as you create new Smart Actions - Learn how to create a Smart Action here: https://docs.forestadmin.com/documentation/reference-guide/actions/create-and-manage-smart-actions

//🇬🇧Create a Asset Element 🇫🇷Créer un élément d'actif
router.post('/assetElement', permissionMiddlewareCreator.create(), (request, response, next) => {
  //🇬🇧 Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#create-a-record
  next();
});

//🇬🇧 Update a Asset Element 🇫🇷 Mettre à jour un élément d'actif
router.put('/assetElement/:recordId', permissionMiddlewareCreator.update(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#update-a-record
  next();
});

//🇬🇧 Delete a Asset Element 🇫🇷 Supprimer un élément d'actif
router.delete('/assetElement/:recordId', permissionMiddlewareCreator.delete(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#delete-a-record
  next();
});

//🇬🇧 Get a list of Asset Elements 🇫🇷 Obtenez une liste des éléments d'actif
router.get('/assetElement', permissionMiddlewareCreator.list(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#get-a-list-of-records
  next();
});

//🇬🇧 Get a number of Asset Elements 🇫🇷 Obtenez un certain nombre d'éléments d'actif
router.get('/assetElement/count', permissionMiddlewareCreator.list(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#get-a-number-of-records
  // Improve performances disabling pagination: https://docs.forestadmin.com/documentation/reference-guide/performance#disable-pagination-count
  next();
});

//🇬🇧 Get a Asset Element 🇫🇷 Obtenir un élément d'actif
router.get('/assetElement/\\b(?!count\\b):recordId', permissionMiddlewareCreator.details(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#get-a-record
  next();
});

//🇬🇧 Export a list of Asset Elements 🇫🇷 Exporter une liste d'éléments d'actifs
router.get('/assetElement.csv', permissionMiddlewareCreator.export(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#export-a-list-of-records
  next();
});

//🇬🇧 Delete a list of Asset Elements 🇫🇷 Supprimer une liste d'éléments d'actif
router.delete('/assetElement', permissionMiddlewareCreator.delete(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#delete-a-list-of-records
  next();
});

module.exports = router;
