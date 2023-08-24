const {
  activity: Activity,
  user: User,
  userlike: UserLike,
  activitylike: ActivityLike,
} = require("../../models");
const asyncHandler = require("express-async-handler");

/*
 *Liker une activité :
 *Endpoint : POST '/activity/:activityId/like'
 * Request Body : userId (id de l'utilisateur qui like l'activité)
 * Description : Cet endpoint permet à un utilisateur de liker une activité en spécifiant son ID et l'ID de l'activité à aimer.
 */
const likeActivity = async (req, res) => {
  // trouver le document ActivityLike correspondant à l'activité
  ActivityLike.findOneAndUpdate(
    { activityId: req.params.id },
    {
      // incrémenter le nombre de likes pour cette activité
      $inc: {
        likes: 1,
      },
      // ajouter l'identifiant de l'utilisateur qui a liké cette activité
      $push: {
        activityLiked: req.body.userId,
      },
    },
    (err, activityLike) => { // en cas d'erreur, retourner une réponse d'erreur
      if (err) {
        return res.status(500).send(err);
      }

      User.findOneAndUpdate(
        // trouver l'utilisateur
        { _id: req.body.userId },
        {
          // ajouter l'identifiant de l'activité au tableau likes de l'utilisateur
          $push: {
            likes: req.params.id,
          },
        },
        (err, user) => {
          if (err) {
            return res.status(500).send(err);
          }

          return res
            .status(200)
            .send({ message: "Activity liked successfully." });
        }
      );
    }
  );
};

/*
 *Unlike une activité :
 * Endpoint : DELETE '/activity/:activityId/like'
 * Request Body : userId (id de l'utilisateur qui unlike l'activité)
 * Description : Cet endpoint permet à un utilisateur de unlike une activité en spécifiant son ID et l'ID de l'activité à unlike.
 */
const unlikeActivity = async (req, res) => {
  // trouver le document ActivityLike correspondant à l'activité
  ActivityLike.findOneAndUpdate(
    { activityId: req.params.id },
    {
      // décrémenter le nombre de likes pour cette activité
      $inc: {
        likes: -1,
      },
      // retirer l'identifiant de l'utilisateur qui a liké cette activité
      $pull: {
        activityLiked: req.body.userId,
      },
    },
    (err, activityLike) => {
      // en cas d'erreur, retourner une réponse d'erreur
      if (err) {
        return res.status(500).send(err);
      }

      // trouver l'utilisateur
      User.findOneAndUpdate(
        { _id: req.body.userId },
        {
          // retirer l'identifiant de l'activité du tableau likes de l'utilisateur
          $pull: {
            likes: req.params.id,
          },
        },
        (err, user) => {
          // en cas d'erreur, retourner une réponse d'erreur
          if (err) {
            return res.status(500).send(err);
          }

          // retourner une réponse de succès
          return res
            .status(200)
            .send({ message: "Like removed successfully." });
        }
      );
    }
  );
};

/*
 * DislikeActivity
 */
const dislikeActivity = async (req, res) => {
  // trouver le document ActivityLike correspondant à l'activité
  ActivityLike.findOneAndUpdate(
    { activityId: req.params.id },
    {
      // incrémenter le nombre de dislikes pour cette activité
      $inc: {
        dislikes: 1,
      },
      // ajouter l'identifiant de l'utilisateur qui a disliké cette activité
      $push: {
        activityDisliked: req.body.userId,
      },
    },
    (err, activityLike) => {
      // en cas d'erreur, retourner une réponse d'erreur
      if (err) {
        return res.status(500).send(err);
      }

      // trouver l'utilisateur
      User.findOneAndUpdate(
        { _id: req.body.userId },
        {
          // ajouter l'identifiant de l'activité au tableau dislikes de l'utilisateur
          $push: {
            dislikes: req.params.id,
          },
        },
        (err, user) => {
          // en cas d'erreur, retourner une réponse d'erreur
          if (err) {
            return res.status(500).send(err);
          }

          // retourner une réponse de succès
          return res
            .status(200)
            .send({ message: "Activity disliked successfully." });
        }
      );
    }
  );
};

/*
 *Afficher les utilisateurs qui ont aimé une activité :
 * Endpoint : GET '/activity/:activityId/likes'
 * Recuperer l'id de l'activité
 * Description : Cet endpoint permet d'afficher tous les utilisateurs qui ont aimé une activité en spécifiant l'ID de l'activité.
 */

const getUserWhoLikeActivity = async (req, res) => {
  // trouver le document ActivityLike correspondant à l'activité
  await ActivityLike.findOne(
    { activityId: req.params.id },
    (err, activityLike) => {
      // en cas d'erreur, retourner une réponse d'erreur
      if (err) {
        return res.status(500).send(err);
      }

      // trouver les documents User correspondant aux identifiants des utilisateurs qui ont aimé l'activité
      User.find({ _id: { $in: activityLike.activityLiked } }, (err, users) => {
        // en cas d'erreur, retourner une réponse d'erreur
        if (err) {
          return res.status(500).send(err);
        }

        // retourner les utilisateurs qui ont aimé l'activité
        return res.status(200).send(users);
      });
    }
  );
};

/*
 *Liker un utilisateur :
 * Endpoint : POST '/user/:userId/like'
 * Request Body : likerId (id de l'utilisateur qui donne le like)
 * Description : Cet endpoint permet à un utilisateur de donner un like à un autre utilisateur en spécifiant son ID et l'ID de l'utilisateur à aimer.
 */

const likeUser = async (req, res) => {
  // trouver le document UserLike correspondant à l'utilisateur qui donne le like
  UserLike.findOne({ userId: req.user._id }, (err, userLike) => {
    // en cas d'erreur, retourner une réponse d'erreur
    if (err) {
      return res.status(500).send(err);
    }

    // vérifier que l'utilisateur n'a pas déjà aimé cet utilisateur
    if (userLike.usersLiked.indexOf(req.params.id) === -1) {
      // incrémenter le nombre de likes de l'utilisateur
      userLike.likes++;

      // ajouter l'utilisateur à la liste des utilisateurs aimés
      userLike.usersLiked.push(req.params.id);

      // enregistrer les modifications dans la base de données
      userLike.save((err) => {
        // en cas d'erreur, retourner une réponse d'erreur
        if (err) {
          return res.status(500).send(err);
        }

        // retourner une réponse de succès
        return res
          .status(200)
          .send({ message: "Like enregistré avec succès." });
      });
    } else {
      // retourner une réponse d'erreur si l'utilisateur a déjà aimé cet utilisateur
      return res
        .status(400)
        .send({ message: "Vous avez déjà aimé cet utilisateur." });
    }
  });
};

/*
 *Unlike un utilisateur :
 * Endpoint : DELETE '/user/:userId/like'
 * Request Body : unlikerId (id de l'utilisateur qui retire le like)
 * Description : Cet endpoint permet à un utilisateur de retirer un like à un autre utilisateur en spécifiant son ID et l'ID de l'utilisateur à unlike.
 */
const unlikeUser = async (req, res) => { // trouver le document UserLike correspondant à l'utilisateur qui retire le like
  try {
    const { userId, likedUserId } = req.params;

    // Vérifiez si les utilisateurs existent
    const user = await User.findById(userId);
    if (!user)
      return res
        .status(400)
        .send({ error: "L'utilisateur n'a pas été trouvé" });

    const likedUser = await User.findById(likedUserId); // Vérifiez si les utilisateurs existent
    if (!likedUser)
      return res
        .status(400)
        .send({ error: "L'utilisateur aimé n'a pas été trouvé" });

    // Vérifiez si l'utilisateur a déjà donné un like à l'utilisateur aimé
    if (!user.likes.includes(likedUserId))
      return res
        .status(400)
        .send({ error: "Vous n'avez pas aimé cet utilisateur" });

    // Supprimez le like de l'utilisateur à l'utilisateur aimé
    user.likes = user.likes.filter((id) => id !== likedUserId);
    await user.save();

    res.send({ message: "Le like a été supprimé avec succès" });
  } catch (error) {
    res.status(500).send({
      error: "Une erreur s'est produite lors de la suppression du like",
    });
  }
};

/*
 *Afficher les utilisateurs qui ont reçu un like :
 * Endpoint : GET '/user/:userId/likes'
 * Description : Cet endpoint permet d'afficher tous les utilisateurs qui ont reçu un like en spécifiant l'ID de l'utilisateur.
 */
const userWhoReceiveLike = async (req, res) => { //🇫🇷trouver le document UserLike correspondant à l'utilisateur
  try {
    const users = await User.find({});
    const userLikes = await UserLike.find({});

    //🇬🇧 Map through all users and add the likes received to their object
    const usersWithLikes = users.map((user) => {
      const userLike = userLikes.find(
        (like) => like.userId === user._id.toString()
      );
      return { ...user._doc, likes: userLike ? userLike.likes : 0 };
    });

    //🇬🇧 Sort users by the number of likes received
    const sortedUsers = usersWithLikes.sort((a, b) => b.likes - a.likes);

    res.send(sortedUsers);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

/*
 *Afficher les likes reçus par un utilisateur :
 *Endpoint : GET '/user/:userId/likes/received'
 * Description : Cet endpoint permet d'afficher tous les likes reçus par un utilisateur en spécifiant son ID.
 */
const getUserLikeById = async (req, res) => {
  try {
    //🇬🇧 Find the user //🇫🇷 Trouver l'utilisateur
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).send("User not found");

    //🇬🇧 Return the array of liked users //🇫🇷 Renvoie le tableau des utilisateurs aimés
    return res.send(user.likes);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

/*
 *Afficher les likes donnés par un utilisateur :
 * Endpoint : GET '/user/:userId/likes/given'
 * Description : Cet endpoint permet d'afficher tous les likes donnés par un utilisateur en spécifiant son ID.
 */
const getAllLikeByAUser = async (req, res) => {
  const userId = req.params.userId;

  // Find the user in the User model
  User.findById(userId, (err, foundUser) => {
    if (err) return res.status(500).send(err);
    if (!foundUser) return res.status(404).send({ message: "User not found" });

    // Return the likes given by the user
    return res.status(200).send({
      likes: foundUser.likes,
    });
  });
};

module.exports = {
  likeUser,
  userWhoReceiveLike,
  getUserLikeById,
  unlikeUser,
  getAllLikeByAUser,
  likeActivity,
  unlikeActivity,
  getUserWhoLikeActivity,
  dislikeActivity,
};
