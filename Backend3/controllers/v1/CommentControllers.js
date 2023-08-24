const { comment } = require("../../models");

//🇬🇧Get all comments //🇫🇷Obtenir tous les commentaires
const getAllComments = async (req, res) => {
  try {
    const comments = await comment.find().populate("user"); //🇫🇷populate : permet de remplacer les id par les données correspondantes
    return res.status(200).json(comments); //🇫🇷status : permet de définir le code de statut HTTP
  } catch (e) {
    return res.status(404).json({ error: e.message }); //🇫🇷json : permet de convertir un objet en JSON
  }
};

//🇬🇧Get a comment //🇫🇷Obtenir un commentaire
const getCommentsByActivity = async (req, res) => { //🇫🇷req : permet de récupérer les données envoyées par le client
  try {
    const activityId = req.params.id; //🇫🇷params : permet de récupérer les paramètres de la requête
    const foundComments = await comment  //🇫🇷await : permet d'attendre la fin de l'exécution d'une fonction asynchrone
      .find({ activity_id: activityId })  //🇫🇷find : permet de récupérer les données correspondantes
      .populate("user"); //🇫🇷populate : permet de remplacer les id par les données correspondantes

    return res.status(200).json(foundComments); //🇫🇷status : permet de définir le code de statut HTTP
  } catch (e) {  //🇫🇷catch : permet de gérer les erreurs
    return res.status(404).json({ error: e.message });
  }
};

// 🇬🇧Create a comment // 🇫🇷Créer un commentaire
const createComment = async (req, res) => {
  try {
    const createdComment = await comment.create(req.body);  //🇬🇧create : permet de créer un document
    return res.status(201).json({
      result: "Successfully created a comment",
      createdComment,
    });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

//🇬🇧Update a comment //🇫🇷Mettre à jour un commentaire
const updateComment = async (req, res) => { //🇫🇷req : permet de récupérer les données envoyées par le client
  const { id } = req.params;
  try {
    const foundComment = await comment.findById(id); //🇫🇷findById : permet de récupérer un document par son id
    if (!foundComment) {
      return res.status(404).json({ error: `Comment with id ${id} not found` });
    }

    const { comment: bodyComment, user_id, activity_id } = req.body; //🇫🇷body : permet de récupérer les données envoyées par le client
    const updatedComment = await comment.findByIdAndUpdate( //🇫🇷findByIdAndUpdate : permet de mettre à jour un document
      id,
      { comment: bodyComment, user_id, activity_id },
      { new: true }
    );
    return res.status(200).json(updatedComment);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

//🇬🇧Delete a comment //🇫🇷Supprimer un commentaire
const deleteComment = async (req, res) => {
  try {
    const deletedComment = await comment.findByIdAndDelete(req.params.id);// findByIdAndDelete : permet de supprimer un document par son id

    if (!deletedComment) {
      return res
        .status(404)
        .json({ error: `Comment not found, please try again.` });
    }
    return res.status(200).json(deletedComment);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

module.exports = {
  getAllComments,
  getCommentsByActivity,
  createComment,
  // updateComment,
  deleteComment,
};
