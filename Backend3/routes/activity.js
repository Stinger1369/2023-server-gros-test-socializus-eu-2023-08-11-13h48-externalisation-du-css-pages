const express = require('express');
const { PermissionMiddlewareCreator } = require('forest-express-mongoose');
const { activity } = require('../models');

const router = express.Router(); //🇬🇧Create a router to implement the activity resource
const permissionMiddlewareCreator = new PermissionMiddlewareCreator('activity'); //🇬🇧Create a permission middleware for the activity resource

//🇬🇧This file contains the logic of every route in Forest Admin for the collection activity:
//🇬🇧 - Native routes are already generated but can be extended/overriden - Learn how to extend a route here: https://docs.forestadmin.com/documentation/reference-guide/routes/extend-a-route
//🇬🇧 - Smart action routes will need to be added as you create new Smart Actions - Learn how to create a Smart Action here: https://docs.forestadmin.com/documentation/reference-guide/actions/create-and-manage-smart-actions

//🇬🇧 Create a Activity 🇫🇷 Créer une activité
router.post('/activity', permissionMiddlewareCreator.create(), (request, response, next) => {
  //v Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#create-a-record
  next();
});

// 🇬🇧Update a Activity 🇫🇷Mettre à jour une activité
router.put('/activity/:recordId', permissionMiddlewareCreator.update(), (request, response, next) => {
  //🇬🇧 Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#update-a-record
  next();
});

// 🇬🇧Delete a Activity 🇫🇷Supprimer une activité
router.delete('/activity/:recordId', permissionMiddlewareCreator.delete(), (request, response, next) => {
  // 🇬🇧Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#delete-a-record
  next();
});

// 🇬🇧Get a list of Activities 🇫🇷Obtenez une liste d'activités
router.get('/activity', permissionMiddlewareCreator.list(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#get-a-list-of-records
  next();
});

// 🇬🇧Get a number of Activities 🇫🇷Obtenez un certain nombre d'activités
router.get('/activity/count', permissionMiddlewareCreator.list(), (request, response, next) => {
  // 🇬🇧Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#get-a-number-of-records
  // 🇬🇧Improve performances disabling pagination: https://docs.forestadmin.com/documentation/reference-guide/performance#disable-pagination-count
  next();
});

//🇬🇧 Get a Activity 🇫🇷 Obtenir une activité
router.get('/activity/\\b(?!count\\b):recordId', permissionMiddlewareCreator.details(), (request, response, next) => {
  // 🇬🇧Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#get-a-record
  next();
});

//🇬🇧 Export a list of Activities 🇫🇷 Exporter une liste d'Activités
router.get('/activity.csv', permissionMiddlewareCreator.export(), (request, response, next) => {
  // 🇬🇧Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#export-a-list-of-records
  next();
});

// 🇬🇧Delete a list of Activities 🇫🇷Supprimer une liste d'Activités
router.delete('/activity', permissionMiddlewareCreator.delete(), (request, response, next) => {
  // 🇬🇧Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#delete-a-list-of-records
  next();
});

module.exports = router;
