/**
 * hostname.js
 * 🇫🇷 Modifiez la variable settings.devRunMode pour connecter l'application au bon backend
 * 🇬🇧 Modify the settings.devRunMode variable to connect application to the proper backend
 * 🇫🇷 Veuillez aussi à importer hostname ou hostname-and-config et à l'utiliser dans tous vos appels d'API.
 * 🇫🇷 Par exemple :
 * 🇫🇷   `${hostname}/api/...`
 * 🇬🇧 Please also import hostname or hostname-and-config and use it in all your API calls.
 */

/*
 * const string LOCALHOST_IP
 * 🇫🇷 Modifier ici l'adresse IP du PC du développeur sans / final
 * 🇬🇧 Please update with the PC developer Ip address without trailing /
 *
 */
const LOCALHOST_IP = "http://localhost"; //"http://192.168.UVW.XYZ";

/*
 * global settings javascript object
 * 🇫🇷 Changez ici la configuration de l'application pendant le runtime
 * 🇬🇧 Change the application configuration during runtime
 *
 */
let settings = {
  // devRunMode= 0..99 for production
  // 🇫🇷 devRunMode: Valeur 0..99 - La valeur 1 est préférée mais vous pouvez utiliser de 1..99 - voir ligne 77
  // 🇬🇧 devRunMode: Value 0..99 - Value 1 is prefered value but you can use 1..99 - see line 77
  // devRunMode= 100..999 for Test+Debug
  // 🇫🇷 devRunMode: 100 est préférée mais vous pouvez utiliser de 100..999 - voir ligne 77
  // 🇬🇧 devRunMode: 100 is prefered value but you can use 100..999 - see line 77
  devRunMode: 1,

  // imageServer: 1..4
  // 🇫🇷 Valeur 1 à 4 pour choisir le serveur dans la fonction imageServerUrl() - voir ligne 171
  // 🇬🇧 Value 1 to 4 for choosing the server in the imageServerUrl() function - see line 171
  imageServer: 1,

  /*
  withConsole : false
      🇫🇷 console.log est interdit. Pas d'affichage de debug avec VSCode ou autres - voir ligne 123
      🇬🇧 console.log prohibited. No debug traces/log from VSCode or others - see line 123
  withConsole : true
      🇫🇷 console.log est autorisé. Affichage de debug avec VSCode ou autres - voir ligne 123
      🇬🇧 console.log is allowed. Display of debug traces/log from VSCode or others - see line 123
  */
  withConsole: true,
};

/**
 * settings.devRunMode :
  0= Production : 
      🇫🇷 console.log est interdit. Pas d'affichage de debug avec VSCode ou autres
      🇬🇧 console.log prohibited. No debug traces/log from VSCode or others
  0..99= 🇫🇷 Production (réservé pour cas spéciaux futurs) - 🇬🇧 Production (reserved for special future use)

  >=100 VsCode/Debug/Automatic testing
      🇫🇷 Ci-dessous sont les codes de connexion au serveur de debug/tests
      🇬🇧 Below are codes to connect with debug/tests server
  100= 🇫🇷 Tests automatiques 100 - 🇬🇧 Automatic Testing 100
  ...
  200= 🇫🇷 Tests automatiques 200 - 🇬🇧 Automatic Testing 200
 *
 * ---------------
 */

/**
 * global variable hostname
 * 🇫🇷 Pour calculer l'url du Backend3 sur internet ou en local sur le PC du développeur
 * 🇬🇧 To compute the Backend3 url on the internet or locally from the developer's PC
 *
 * 🇫🇷 Voir le fichier "Doc Projet socializus" - "c-Instance et Credentials" page 57
 * 🇬🇧 See file "Doc Projet socializus" - "c-Instance et Credentials" page 57
 *
 */
let hostname = "";
switch (settings.devRunMode) {
  default: // 🇫🇷 Inconnu / 🇬🇧 Unknown
    if (settings.devRunMode < 100) {
      // Production
      // 🇫🇷 La valeur par défaut est toujours le serveur de production
      // 🇬🇧 Default value is always production server
      hostname = "https://backforest.socializus.fr";
    } else {
      // Develop/Debug
      hostname = `${LOCALHOST_IP}:3000`;
    }
    break;
  case 0:
    // 🇫🇷 Serveur de transition ( ne devrait pas exister - valable uniquement en juillet 2023 )
    // 🇬🇧 Transition Server ( should not exist - valid only in July 2023 )
    hostname = "https://backoffice.socializus.com"; // 🇫🇷 Non utilisé pour le moment donc mettre une fausse valeur - // 🇬🇧 Not yet in use so we put a fake value
    break;
  case 1:
    // 🇫🇷 section orange server "gros test" dans le document "Doc Projet socializus"
    // 🇬🇧 orange server section "gros test" section in the document "Doc Projet socializus"
    hostname = "https://backforest.socializus.fr";
    break;
  case 2:
    // 🇫🇷 section verte server test dans le document "Doc Projet socializus"
    // 🇬🇧 green server section "test" section in the document "Doc Projet socializus"
    hostname = "https://forestadmin.socializus.net";
    break;
  case 3:
    // 🇫🇷 section rouge server production dans le document "Doc Projet socializus"
    // 🇬🇧 red server section "test" section in the document "Doc Projet socializus"
    hostname = "https://backoffice.socializus.com";
    break;
  case 100: // 🇫🇷 Mode 10 developpeur/debug - 🇬🇧 Developer/debug mode 100
    hostname = `${LOCALHOST_IP}:3000`;
    break;
  case 110: // 🇫🇷 Mode 11 developpeur/debug - 🇬🇧 Developer/debug mode 110
    hostname = `${LOCALHOST_IP}:3010`;
    break;
  case 120: // 🇫🇷 Tests automatiques mode 120 - 🇬🇧 Automatic Testing mode 120
    hostname = `${LOCALHOST_IP}:3100`;
    break;
  case 130: // 🇫🇷 Tests automatiques mode 130 (Postman) - 🇬🇧 Automatic Testing mode 130 (Postman)
    hostname = `${LOCALHOST_IP}:3310`;
    break;
}

if (settings.withConsole == false) {
  /*
  Production : 
      🇫🇷 console.log est interdit. Pas d'affichage de debug avec VSCode ou autres
      🇬🇧 console.log prohibited. No debug traces/log from VSCode or others
  */
  console.log = new Proxy(console.log, {
    apply: function (target, thisArg, argumentsList) {
      if (JSON.stringify(argumentsList).includes(hostname)) {
        Reflect.apply(target, thisArg, argumentsList);
      }
    },
  });
}

/**
 * function isProduction()
 *
 * @returns boolean
 * true = Production server = 🇫🇷 console.log est interdit. Pas d'affichage de debug avec VSCode ou autres
 * true = Production server = 🇬🇧 console.log prohibited. No debug traces/log from VSCode or others
 *
 * false = Debug/test server = 🇫🇷 console.log est autorisé. Activation de methodes de debug dans certaines parties du code
 * false = Debug/test server = 🇬🇧 console.log is allowed. Activation of debug methods in some parts of the code
 */
function isProduction() {
  if (settings.devRunMode < 100) {
    return true;
  } else {
    return false;
  }
}

/**
 * function imageServerUrl()
 *
 * 🇫🇷 Valeur dans settings.imageServer pour choisir le serveur dans la fonction imageServerUrl()
 * 🇬🇧 Value in settings.imageServer to choose the server in the imageServerUrl() function
 *
 * 🇫🇷 Voir le fichier "Doc Projet socializus" - "c-Instance et Credentials" page 57
 * 🇬🇧 See file "Doc Projet socializus" - "c-Instance et Credentials" page 57
 *
 * @returns
 * 🇫🇷 Url du serveur d'images avec / final
 * 🇬🇧 Image server Url with trailing /
 */
function imageServerUrl() {
  let urlImage = ""; // 🇫🇷 Pour calculer l'url du serveur image - 🇬🇧 To compute the image server url
  switch (settings.imageServer) {
    default: // 🇫🇷 Inconnu / 🇬🇧 Unknown
    case 0:
      // 🇫🇷 Serveur de transition pour usage temporaire
      // 🇬🇧 Transition server for temporary use
      urlImage = "https://images.socializus.com/server-image/";
      break;
    case 1:
      // 🇫🇷 section orange server "gros test" dans le document "Doc Projet socializus"
      // 🇬🇧 orange server section "gros test" in the document "Doc Projet socializus"
      urlImage = "https://images.socializus.eu/server-image/";
      break;
    case 2:
      // 🇫🇷 section verte server test dans le document "Doc Projet socializus"
      // 🇬🇧 green server section "gros test" in the document "Doc Projet socializus"
      urlImage = "https://images.socializ.us/server-image/";
      break;
    case 3:
      // 🇫🇷 section rouge server production dans le document "Doc Projet socializus"
      // 🇬🇧 red server section "gros test" in the document "Doc Projet socializus"
      urlImage = "https://images.socializus.app/server-image/";
      break;
    case -1:
      urlImage = `${LOCALHOST_IP}:3000/`;
      break;
  }
  // console.info("hostname::imageServerUrl()", settings.imageServer, urlImage);
  return urlImage;
}

/**
 * function readSettings()
 *
 * 🇫🇷 retourne l'objet Javascript qui contient la configuration de ce module et aussi la chaine constante LOCALHOST_IP
 * 🇬🇧 return's the Javascript object that contains the configuration of this module and also the constant string LOCALHOST_IP
 *
 * @returns
 * 🇫🇷 l'objet de paramétrage javascript "settings"
 * 🇬🇧 the "settings" javascript object
 */
function readSettings() {
  let settings2 = { ...settings };
  settings2.LOCALHOST_IP = LOCALHOST_IP;
  return settings2;
}

/**
 * function getHostname()
 *
 * 🇫🇷 Pour calculer l'url du Backend3 sur internet ou en local sur le PC du développeur
 * 🇬🇧 To compute the Backend3 url on the internet or locally from the developer's PC
 *
 * @returns
 * 🇫🇷 l'opjet de paramétrage
 * 🇬🇧 the settings object
 */
function getHostname() {
  return hostname;
}

module.exports = {
  devRunMode: settings.devRunMode,
  settings,
  hostname,
  isProduction,
  imageServerUrl,
  readSettings,
  getHostname,
};

// const hostname = "https://backforest.socializus.fr";
// export default hostname; 