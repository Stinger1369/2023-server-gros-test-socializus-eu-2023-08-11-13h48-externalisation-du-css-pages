const { asset } = require("../../models");  //🇫🇷asset : permet de récupérer les assets  //🇬🇧asset: allows you to retrieve assets

//🇬🇧Get all activities lists //🇫🇷Obtenir toutes les listes d'activités
const getAllActivities = async (req, res) => { //🇫🇷async : permet de gérer les fonctions asynchrones //🇬🇧async: allows to manage asynchronous functions
  try {
    const assets = await asset.find({ type: "activities" });  //🇫🇷find : permet de chercher dans la base de données //🇬🇧find: allows to search in the database
    res.status(200).json(assets); //🇫🇷status : permet de gérer les status des requêtes //🇬🇧status: allows you to manage the status of requests
  } catch (e) {
    res.status(404).json({ error: e.message }); //🇫🇷json : permet de gérer les données au format json //🇬🇧json: manages data in json format
  }
};

//🇬🇧get all languages //🇬🇧obtenir toutes les langues
const getAllLanguages = async (req, res) => { //🇫🇷async : permet de gérer les fonctions asynchrones //🇬🇧async: allows to manage asynchronous functions
  try {
    const assets = await asset.find({ type: "language" });
    res.status(200).json(assets);
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
};
module.exports = { getAllActivities, getAllLanguages };
