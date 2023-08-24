const express = require('express');
const { PermissionMiddlewareCreator } = require('forest-express-mongoose');
const { otp } = require('../models');

const router = express.Router();
const permissionMiddlewareCreator = new PermissionMiddlewareCreator('otp');

//🇬🇧 This file contains the logic of every route in Forest Admin for the collection otp:
//🇬🇧 - Native routes are already generated but can be extended/overriden - Learn how to extend a route here: https://docs.forestadmin.com/documentation/reference-guide/routes/extend-a-route
//🇬🇧 - Smart action routes will need to be added as you create new Smart Actions - Learn how to create a Smart Action here: https://docs.forestadmin.com/documentation/reference-guide/actions/create-and-manage-smart-actions

//🇬🇧 Create a Otp //🇫🇷 Créer un OTP
router.post('/otp', permissionMiddlewareCreator.create(), (request, response, next) => {
  //🇬🇧 Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#create-a-record
  next();
});

//🇬🇧 Update a Otp //🇫🇷 Mettre à jour un OTP
router.put('/otp/:recordId', permissionMiddlewareCreator.update(), (request, response, next) => {
  //🇬🇧 Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#update-a-record
  next();
});

//🇬🇧 Delete a Otp //🇫🇷 Supprimer un OTP
router.delete('/otp/:recordId', permissionMiddlewareCreator.delete(), (request, response, next) => {
  //🇬🇧 Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#delete-a-record
  next();
});

//🇬🇧 Get a list of Otps //🇫🇷 Obtenir une liste d'OTPS
router.get('/otp', permissionMiddlewareCreator.list(), (request, response, next) => {
  //🇬🇧 Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#get-a-list-of-records
  next();
});

//🇬🇧 Get a number of Otps //🇫🇷 Obtenez un certain nombre d'OTPS
router.get('/otp/count', permissionMiddlewareCreator.list(), (request, response, next) => {
  //🇬🇧 Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#get-a-number-of-records
  //🇬🇧 Improve performances disabling pagination: https://docs.forestadmin.com/documentation/reference-guide/performance#disable-pagination-count
  next();
});

//🇬🇧 Get a Otp //🇫🇷 Obtenez un OTP
router.get('/otp/\\b(?!count\\b):recordId', permissionMiddlewareCreator.details(), (request, response, next) => {
  //🇬🇧 Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#get-a-record
  next();
});

//🇬🇧 Export a list of Otps //🇫🇷 Exporter une liste d'OTPS
router.get('/otp.csv', permissionMiddlewareCreator.export(), (request, response, next) => {
  //🇬🇧 Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#export-a-list-of-records
  next();
});

//🇬🇧 Delete a list of Otps //🇫🇷 Supprimer une liste d'OTPS
router.delete('/otp', permissionMiddlewareCreator.delete(), (request, response, next) => {
  //🇬🇧 Learn what this route does here: https://docs.forestadmin.com/documentation/reference-guide/routes/default-routes#delete-a-list-of-records
  next();
});

module.exports = router;
