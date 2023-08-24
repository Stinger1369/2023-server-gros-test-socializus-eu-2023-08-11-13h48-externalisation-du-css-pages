const { logEvents } = require("./logger");

const errorHandlers = (err, req, res, next) => {
  logEvents(
    `${err?.name}: ${err?.message}\t${req?.method}\t${req?.url}\t${req?.headers?.origin}`,
    "errLog.log"
  );
  console.log(err.stack); // stack : permet de récupérer la pile d'appel

  const status = res?.statusCode ? res?.statusCode : 500; // server error

  res?.status(status); // status : permet de définir le code de statut de la réponse
 
  res?.json({ message: err?.message });
};

module.exports = errorHandlers;
