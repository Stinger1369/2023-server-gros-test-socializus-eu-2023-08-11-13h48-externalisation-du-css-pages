const express = require('express');
const { PermissionMiddlewareCreator } = require('forest-express-mongoose');
const { verifyEmail } = require('../models');

const router = express.Router();
const permissionMiddlewareCreator = new PermissionMiddlewareCreator('verifyEmail');

//🇬🇧 This file contains the logic of every route in Forest Admin for the collection verifyEmail:
//🇬🇧 - Native routes are already generated but can be extended/overriden - Learn how to extend a route here: https://docs.forestadmin.com/documentation/reference-guide/routes/extend-a-route
//🇬🇧 - Smart action routes will need to be added as you create new Smart Actions - Learn how to create a Smart Action here: https://docs.forestadmin.com/documentation/reference-guide/actions/create-and-manage-smart-actions

//🇬🇧 Create a Verify Email //🇫🇷 Créer un e-mail de vérification
router.post('/verifyEmail', permissionMiddlewareCreator.create(), (request, response, next) => {
  //🇬🇧 Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#create-a-record
  next();
});

//🇬🇧 Update a Verify Email //🇫🇷 Mettre à jour un e-mail de vérification
router.put('/verifyEmail/:recordId', permissionMiddlewareCreator.update(), (request, response, next) => {
  //🇬🇧 Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#update-a-record
  next();
});

//🇬🇧 Delete a Verify Email //🇫🇷 Supprimer un e-mail de vérification
router.delete('/verifyEmail/:recordId', permissionMiddlewareCreator.delete(), (request, response, next) => {
  //🇬🇧 Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#delete-a-record
  next();
});

//🇬🇧 Get a list of Verify Emails //🇫🇷 Obtenez une liste des e-mails de vérification
router.get('/verifyEmail', permissionMiddlewareCreator.list(), (request, response, next) => {
  //🇬🇧 Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#get-a-list-of-records
  next();
});

//🇬🇧 Get a number of Verify Emails //🇫🇷 Obtenez un certain nombre d'e-mails de vérification
router.get('/verifyEmail/count', permissionMiddlewareCreator.list(), (request, response, next) => {
  //🇬🇧 Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#get-a-number-of-records
  //🇬🇧 Improve performances disabling pagination: https://docs.forestadmin.com/documentation/reference-guide/performance#disable-pagination-count
  next();
});

//🇬🇧 Get a Verify Email //🇫🇷 Recevez un e-mail de vérification
router.get('/verifyEmail/\\b(?!count\\b):recordId', permissionMiddlewareCreator.details(), (request, response, next) => {
  //🇬🇧 Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#get-a-record
  next();
});

//🇬🇧 Export a list of Verify Emails //🇫🇷 Exporter une liste d'e-mails de vérification
router.get('/verifyEmail.csv', permissionMiddlewareCreator.export(), (request, response, next) => {
  //🇬🇧 Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#export-a-list-of-records
  next();
});

//🇬🇧 Delete a list of Verify Emails //🇫🇷 Supprimer une liste d'emails actuels
router.delete('/verifyEmail', permissionMiddlewareCreator.delete(), (request, response, next) => {
  //🇬🇧 Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#delete-a-list-of-records
  next();
});

module.exports = router;
