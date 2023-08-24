const express = require('express');
const { PermissionMiddlewareCreator } = require('forest-express-mongoose');
const { comment } = require('../models');

const router = express.Router();
const permissionMiddlewareCreator = new PermissionMiddlewareCreator('comment');

// This file contains the logic of every route in Forest Admin for the collection comment:
// - Native routes are already generated but can be extended/overriden - Learn how to extend a route here: https://docs.forestadmin.com/documentation/reference-guide/routes/extend-a-route
// - Smart action routes will need to be added as you create new Smart Actions - Learn how to create a Smart Action here: https://docs.forestadmin.com/documentation/reference-guide/actions/create-and-manage-smart-actions

//🇬🇧  Create a Comment //🇫🇷 Créer un commentaire
router.post('/comment', permissionMiddlewareCreator.create(), (request, response, next) => {
  //🇬🇧  Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#create-a-record
  next();
});

//🇬🇧  Update a Comment //🇫🇷 Mettre à jour un commentaire
router.put('/comment/:recordId', permissionMiddlewareCreator.update(), (request, response, next) => {
  //🇬🇧  Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#update-a-record
  next();
});

//🇬🇧  Delete a Comment //🇫🇷 Supprimer un commentaire
router.delete('/comment/:recordId', permissionMiddlewareCreator.delete(), (request, response, next) => {
  //🇬🇧  Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#delete-a-record
  next();
});

//🇬🇧  Get a list of Comments //🇫🇷 Obtenez une liste de commentaires
router.get('/comment', permissionMiddlewareCreator.list(), (request, response, next) => {
  //🇬🇧  Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#get-a-list-of-records
  next();
});

//🇬🇧  Get a number of Comments //🇫🇷 Obtenez un certain nombre de commentaires
router.get('/comment/count', permissionMiddlewareCreator.list(), (request, response, next) => {
  //🇬🇧  Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#get-a-number-of-records
  //🇬🇧  Improve performances disabling pagination: https://docs.forestadmin.com/documentation/reference-guide/performance#disable-pagination-count
  next();
});

//🇬🇧  Get a Comment //🇫🇷 Obtenir un commentaire
router.get('/comment/\\b(?!count\\b):recordId', permissionMiddlewareCreator.details(), (request, response, next) => {
  //🇬🇧  Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#get-a-record
  next();
});

//🇬🇧  Export a list of Comments //🇫🇷 Exporter une liste de commentaires
router.get('/comment.csv', permissionMiddlewareCreator.export(), (request, response, next) => {
  //🇬🇧  Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#export-a-list-of-records
  next();
});

//🇬🇧  Delete a list of Comments //🇫🇷 Supprimer une liste de commentaires
router.delete('/comment', permissionMiddlewareCreator.delete(), (request, response, next) => {
  //🇬🇧  Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#delete-a-list-of-records
  next();
});

module.exports = router;
