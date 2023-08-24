const express = require('express');
const { PermissionMiddlewareCreator } = require('forest-express-mongoose');
const { message } = require('../models');

const router = express.Router();
const permissionMiddlewareCreator = new PermissionMiddlewareCreator('message');

//🇬🇧 This file contains the logic of every route in Forest Admin for the collection message:
//🇬🇧 - Native routes are already generated but can be extended/overriden - Learn how to extend a route here: https://docs.forestadmin.com/documentation/reference-guide/routes/extend-a-route
//🇬🇧 - Smart action routes will need to be added as you create new Smart Actions - Learn how to create a Smart Action here: https://docs.forestadmin.com/documentation/reference-guide/actions/create-and-manage-smart-actions

//🇬🇧 Create a Message //🇫🇷 Créer un message
router.post('/message', permissionMiddlewareCreator.create(), (request, response, next) => {
  //🇬🇧 Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#create-a-record
  next();
});

//🇬🇧 Update a Message //🇫🇷 Mettre à jour un message
router.put('/message/:recordId', permissionMiddlewareCreator.update(), (request, response, next) => {
  //🇬🇧 Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#update-a-record
  next();
});

//🇬🇧 Delete a Message //🇫🇷 Supprimer un message
router.delete('/message/:recordId', permissionMiddlewareCreator.delete(), (request, response, next) => {
  //🇬🇧 Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#delete-a-record
  next();
});

//🇬🇧 Get a list of Messages //🇫🇷 Obtenir une liste de messages
router.get('/message', permissionMiddlewareCreator.list(), (request, response, next) => {
  //🇬🇧 Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#get-a-list-of-records
  next();
});

//🇬🇧 Get a number of Messages //🇫🇷 Obtenez un certain nombre de messages
router.get('/message/count', permissionMiddlewareCreator.list(), (request, response, next) => {
  //🇬🇧 Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#get-a-number-of-records
  //🇬🇧 Improve performances disabling pagination: https://docs.forestadmin.com/documentation/reference-guide/performance#disable-pagination-count
  next();
});
 
//🇬🇧 Get a Message //🇫🇷 Recevez un message
router.get('/message/\\b(?!count\\b):recordId', permissionMiddlewareCreator.details(), (request, response, next) => {
  //🇬🇧 Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#get-a-record
  next();
});

//🇬🇧Export a list of Messages //🇫🇷Exporter une liste de Messages
router.get('/message.csv', permissionMiddlewareCreator.export(), (request, response, next) => {
  //🇬🇧 Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#export-a-list-of-records
  next();
});

//🇬🇧 Delete a list of Messages //🇫🇷 Supprimer une liste de Messages
router.delete('/message', permissionMiddlewareCreator.delete(), (request, response, next) => {
  //🇬🇧 Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#delete-a-list-of-records
  next();
});

module.exports = router;
