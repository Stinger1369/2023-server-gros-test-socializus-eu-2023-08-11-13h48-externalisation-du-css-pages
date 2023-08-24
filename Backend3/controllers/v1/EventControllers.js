const { activity, user } = require("../../models");
const moment = require("moment");
const asyncHandler = require("express-async-handler");

// @desc Create a new activity
// @route POST /users
// @access Private

//🇫🇷Une fonction asynchrone qui est utilisée comme gestionnaire de route pour créer une activité
//🇬🇧An asynchronous function which is used as a route handler to create an activity
const createActivity = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      //🇫🇷headers : permet de récupérer les entêtes de la requête
      res.status(402).json({ error: "Authorization header missing" });
      return;
    }

    const authorizationToken = req.headers.authorization.replace("Bearer ", ""); //🇫🇷replace : permet de remplacer une chaine de caractère par une autre
    const User = await user.findOne({ token: authorizationToken }); //🇫🇷findOne : permet de récupérer un document

    if (!User) {
      res.status(403).json({ error: "Incorrect user token" });
      return;
    }

    const activityData = req.body;

    //🇬🇧! there is no activityId in the body  //🇫🇷 ! il n'y a pas d'identifiant d'activité dans le corps
    const activityId = activityData.activityId;
    const date = activityData.date;
    const activityImage = activityData.activityImage;

    const splitDate = date.split("/"); //🇫🇷split : permet de séparer une chaine de caractère en tableau
    const newDate = `${splitDate[1]}/${splitDate[0]}/${splitDate[2]}`;
    const normalizeDate = new Date(newDate).getTime(); //🇫🇷getTime : permet de récupérer le temps en milliseconde

    //🇫🇷 vérifie si la date normalisée de l'activité est antérieure à la date actuelle.
    if (normalizeDate < Date.now()) {
      return res
        .status(400)
        .json({ error: "the activity date cannot be in the past" });
    }

    const data = {
      author: User._id,
      date: date,
      activityImage: activityImage,
      attendees: [User._id],
      ...activityData,
    };

    // ! the logic to update an activity should be in a separate route
    // let Activity;
    // if (activityId && activityId != "null") {
    //   Activity = await activity.findOne({ _id: activityId });
    //   if (!Activity) {
    //     res.status(422).json({ error: "Incorrect activityId" });
    //     return;
    //   }

    //   for (let z in data) {
    //     Activity[z] = data[z];
    //   }
    // } else {
    //   Activity = new activity(data);
    // }

    const Activity = new activity(data);
    await Activity.save();

    return res
      .status(200)
      .json({ message: "Activity created successfully!", data: Activity });
  } catch (err) {
    return res.status(400).json({
      error: "An unexpected error occurred while creating activity",
      cause: err,
    });
  }
};

// @desc get activity by id
// @route GET /activities/:id
// @access Private

//🇫🇷 Gestionnaire de route pour récupérer une activité par son identifiant //🇬🇧 Route manager to retrieve an activity by its identifier
const getActivityById = async (req, res) => {
  const activityId = req.params.id;

  activity
    .findById(activityId)
    .populate("attendees", "firstName lastName avatar")
    .populate("waitingList", "firstName lastName avatar")
    .populate("author", "firstName lastName avatar")
    .then((data) => {
      //🇫🇷utilisée pour traiter le résultat de la recherche de l'activity
      if (!data) res.status(404).send({ message: "Activity not found" });
      else res.send(data);
    })
    .catch((err) => {
      //🇫🇷capturer les erreurs qui se produisent lors de la recherche de l'activité
      res.status(500).send({
        error: "An unexpected error occurred while retrieving activity",
        cause: err,
      });
    });
};
const getActivitiesByDate = async (req, res) => {
  const date = req.query.date;

  activity
    .find({ date: date })
    .then((data) => {
      //🇫🇷utilisée pour traiter le résultat de la recherche de l'activity
      if (!data) res.status(404).send({ message: "Activity not found" });
      else res.send(data);
    })
    .catch((err) => {
      //🇫🇷capturer les erreurs qui se produisent lors de la recherche de l'activité
      res.status(500).send({
        error: "An unexpected error occurred while retrieving activity",
        cause: err,
      });
    });
};
// @desc retrieve  all activities
// @route DELETE /users
// @access Private
const getActivitiesList = async (req, res) => {
  //🇫🇷 gérer les erreurs potentielles qui peuvent survenir lors de l'exécution du code.
  try {
    // TODO: return result with pagination or cached result in the frontend or redis
    // const result = await activity.aggregate([{ $sort: { updateAt: -1 } }]); //🇫🇷aggregate : permet de faire des opérations sur les données

    const expiryDate = new Date();
    // expiryDate.setDate(expiryDate.getDate() - 1); // Set expiry date to one day ago
    expiryDate.setHours(expiryDate.getHours() - 4); // Set expiry date to 4 hours ago (src/pages.ActivitiesScreen.js)
    // exemple d'utilisation : /api/v1/activities/list?limit=10&skip=5
    const limit = Number(req.query.limit) || 1000; //prendre au maximum <limit> données
    const offset = Number(req.query.skip) || 0; 
    
    const result = await activity
    .aggregate([
      {
        $match: { //filtre les dates sous la forme dd/mm/yyyy
          date: {
            $type: "string",
            $regex: /^\d{2}\/\d{2}\/\d{4}$/
          }
        }
      },
      {
        $addFields: {
          dateISO: {
            $dateFromString: {
              dateString: { 
                // $concat: [{ $substr: ["$date", 6, 4] }, "-", { $substr: ["$date", 3, 2] }, "-", { $substr: ["$date", 0, 2] }] 
                $concat: [
                  { $substr: ["$date", 6, 4] }, "-", { $substr: ["$date", 3, 2] }, "-", { $substr: ["$date", 0, 2] },
                  "T",
                  "$startTime",
                  ":00" // add seconds to complete the ISO string format
                ]
              },
              // format: "%Y-%m-%d",
              format: "%Y-%m-%dT%H:%M:%S", // the format string must match the format of dateString
            },
          },
        },
      },
      { $match: { dateISO: { $gte: expiryDate } } },
      { $sort: { dateISO: 1, startTime: 1} }, // trier les activités par date et par heure

      //  Décommenté pour voir que le filtre fonctionne correctement sur postman
      // { $project: { description: 0, howToFind: 0, repeatEventDays: 0, coOrganizerRequests: 0, coOrganizerOffers: 0, location: 0, ages: 0, 
      //   parityValues: 0, attendees: 0, waitingList: 0, likes: 0, interested: 0,  author: 0, activityImage: 0,
      //   title: 0, isOnline: 0, address: 0, attendeeLimit: 0, hasPrice: 0, price: 0, ticketLink: 0, helpForOrganizers: 0, hasReminderName: 0, 
      //   reminderName: 0, requestCoOrganizers: 0, coOrganizerGift: 0, topic: 0, whatsappLink: 0, fbPageLink: 0, fbGroupLink: 0,
      //   meetupLink: 0, telegramLink: 0, otherLink: 0, friendsOnly: 0, nbFriends: 0, selectPeople: 0, allowPhoneNumberDisplay: 0, allowCoOrganiser: 0,
      //   infoLine: 0, repeatEvent: 0, repeatEventFrequency: 0, parity: 0, allowGuests: 0, howManyGuests: 0, ageRestriction: 0, createdAt: 0,
      //   __v: 0, isAttendeeLimited: 0, updatedAt: 0, _id: 0
      //   } }

    ])//🇫🇷aggregate : permet de faire des opérations sur les données
    .skip(offset)

    .limit(limit);
    return res.status(200).json({
      message: "Activities list successfully retrieved",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      error:
        "An unexpected error occurred while retrieving the list of activities",
      cause: error,
    });
  }
};

// @desc join activities
// @route get /activitie
// @access Private

const joinActivity = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      res.status(402).json({ error: "Authorization header missing" });
      return;
    }

    const authorizationToken = req.headers.authorization.replace("Bearer ", ""); // token for authorization
    console.log({ authorizationToken });
    const User = await user.findOne({ token: authorizationToken });

    //🇬🇧Verify if user is always logged //🇫🇷Vérifier si l'utilisateur est toujours connecté

    if (!User) {
      res.status(403).json({ error: "Incorrect user token" });
      return;
    }

    const activityId = req.body.id;
    console.log({ activityId });

    const Activity = await activity.findOne({ _id: activityId });

    if (!Activity) {
      res.status(400).json({ error: "Activity not found" });
      return;
    }

    console.log({ attendeesLength: Activity.attendees.length });
    //🇫🇷Vérifier si le nombre maximum de participants à l'activité a été atteint
    if (Activity.attendees.length >= Activity.attendeeLimit) {
      //🇫🇷attendeeLimit : nombre maximum de participants à l'activité
      if (Activity.waitingList.indexOf(User._id) === -1) {
        Activity.waitingList.push(User._id);
        await Activity.save();
        res.status(200).json({ result: "OK", addedToWaitingList: true }); //🇫🇷addedToWaitingList : ajouté à la liste d'attente
        return;
      } else {
        res.status(200).json({ result: "OK", alreadyInWaitingList: true }); //🇫🇷alreadyInWaitingList : déjà dans la liste d'attente
        return;
      }
    }

    if (Activity.attendees.indexOf(User._id) === -1) {
      //🇫🇷indexOf : permet de récupérer l'index d'un élément dans un tableau
      Activity.attendees.push(User._id); //🇫🇷push : permet d'ajouter un élément à la fin d'un tableau
      await Activity.save();
    }

    if (User.activities.indexOf(activityId) === -1) {
      User.activities.push(activityId);
      await User.save();
    }

    //Resend user id to add on frontend
    // ! let's be consistent with the response format and use message and data
    res.status(200).json({ result: "OK", userId: User._id });
  } catch (e) {
    // ! let's be consistent with the response format and use error and cause
    res.status(400).json({ error: e.message });
  }
};

// @desc Leave Activity
// @route PATCH /users
// @access Private

const leaveActivity = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      res.status(402).json({ error: "Authorization header missing" });
      return;
    }

    const authorizationToken = req.headers.authorization.replace("Bearer ", "");
    const User = await user.findOne({ token: authorizationToken });

    if (!User) {
      res.status(403).json({ error: "Incorrect user token" });
      return;
    }

    const activityId = req.body.id;

    //🇬🇧find activity by search //🇫🇷trouver une activité par recherche
    const Activity = await activity.findOne({ _id: activityId });

    if (!Activity) {
      res.status(400).json({ error: "Activity not found" });
      return;
    }

    if (Activity.attendees) {
      let id = Activity.attendees.indexOf(User._id);
      if (id !== -1) {
        Activity.attendees.splice(id, 1);
        await Activity.save();
      }
    }

    if (User.activities) {
      id = User.activities.indexOf(activityId);
      if (id !== -1) {
        User.activities.splice(id, 1);
        await User.save();
      }
    }

    //Resend found index to remove on frontend
    // ! let's be consistent with the response format and use message and data
    res.status(200).json({ result: "OK", index: id });
  } catch (e) {
    // ! let's be consistent with the response format and use error and cause
    res.status(400).json({ error: e.message });
  }
};

// @desc  remove all activity
// @route Delete /activity
// @access Private
const removeAllActivity = async (req, res) => {
  try {
    const result = await activity.find(); //🇫🇷find : permet de récupérer tous les documents
    const nb = result.length;
    for (let i = 2; i < nb; i++) {
      // TODO: add validation to check if the user is an admin or owner of the activities
      await activity.findByIdAndDelete(result[i]._id);
    }

    // ! let's be consistent with the response format and use message and data
    res.status(200).json({ status: "You have removed all activities" });
  } catch (error) {
    // ! let's be consistent with the response format and use error and cause
    res.status(400).json({ error: error.message });
  }
};

// @desc  forbid people all activity
// @route Post /activity
// @access Private

const forbidAccessPeopleInActivity = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      res.status(402).json({ error: "Authorization header missing" });
      return;
    }

    const authorizationToken = req.headers.authorization.replace("Bearer ", "");
    const User = await user.findOne({ token: authorizationToken });

    if (!User) {
      res.status(403).json({ error: "Incorrect user token" });
      return;
    }

    const { activityId, forbiddenList } = req.body;

    const Activity = await activity.findOne({ _id: activityId });
    if (!Activity) {
      res.status(400).json({ error: "Activity not found" });
      return;
    }

    if (!forbiddenList) {
      res.status(401).json({ error: "invalid forbiddenList" });
      return;
    }

    // add the activity in the list forbidden
    for (let i = 0; i < forbiddenList.length; i++) {
      if (activity.forbiddenPeople.indexOf(forbiddenList[i]) === -1) {
        activity.forbiddenPeople.push(forbiddenList[i]);
      }
    }

    await Activity.save();

    // ! let's be consistent with the response format and use message and data
    res.status(200).json({ result: "OK", Activity: Activity });
  } catch (e) {
    // ! let's be consistent with the response format and use error and cause
    res.status(400).json({ error: e.message });
  }
};

// @desc  invite people in  activity
// @route Post /activity
// @access Private

const invitePeople = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      res.status(402).json({ error: "Authorization header missing" });
      return;
    }

    const authorizationToken = req.headers.authorization.replace("Bearer ", "");
    const User = await user.findOne({ token: authorizationToken });

    if (!User) {
      res.status(403).json({ error: "Incorrect user token" });
      return;
    }

    // handle invitation
    const { activityId, invitationList } = req.body;

    const Activity = await activity.findOne({ _id: activityId });
    if (!Activity) {
      res.status(400).json({ error: "Activity not found" });
      return;
    }

    if (!invitationList) {
      res.status(401).json({ error: "invalid invitationList" });
      return;
    }

    //🇬🇧 manage the invitation list //🇫🇷 gérer la liste des invitations

    let invitations = [];
    for (let i = 0; i < invitationList.length; i++) {
      if (Activity.invitations.indexOf(invitationList[i]) === -1) {
        Activity.invitations.push(invitationList[i]); //🇫🇷push : permet d'ajouter un élément à la fin d'un tableau
        invitations.push(invitationList[i]);
      }
    }

    for (let i = 0; i < invitations; i++) {
      const people = await user.findOne({ _id: invitations[i] });
      if (!people) {
        res.status(401).json({ error: "Invalid invation userId" });
        return;
      }
      if (people.activityInvitations.indexOf(activityId) === -1) {
        people.activityInvitations.push(activityId);
        await people.save();
      }
    }

    await Activity.save();

    res.status(200).json({ result: "OK", Activity: Activity });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

//🇫🇷 Supprimer une activité spécifique en fonction de son identifiant
const removeOneActivity = async (req, res) => {
  const activityId = req.params.id;
  console.log(activityId);

  activity
    .findByIdAndRemove(activityId) //🇫🇷findByIdAndRemove : permet de supprimer un document
    .then((data) => {
      if (!data) {
        res.status(404).json({
          error: `Cannot delete activity with id=${id}. Maybe activity was not found!`,
        });
      } else {
        res.json({
          result: "OK",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        result: "OK",
      });
    });
};
//🇫🇷 Editer une activité spécifique en fonction de son identifiant
const editActivity = asyncHandler(async (req, res) => {
  const id = req.params.id;
  // TODO: validate req body before updating an activity
  activity
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update activity information with id =${id} may be User was not found`,
        });
      } else res.send({ message: "Activity was updated successfully" });
    })
    .catch((error) => {
      res.status(500).json({
        message: error.message || "Some error occured while updating the user.",
      });
    });
});

/*
 *les activités auxquelles un utilisateur a participé et dont la date est dépassée
 */
const activityExpired = asyncHandler(async (req, res) => {
  // asyncHandler : permet de gérer les erreurs
  try {
    //🇬🇧 Find the user using the provided id in the URL  //🇫🇷 Trouvez l'utilisateur en utilisant l'identifiant fourni dans l'URL
    const user = await User.findById(req.params.id);

    //🇬🇧 Find the activities associated with the user using the "activities" field of the user
    //🇬🇧 and filter the activities whose date is before the current date
    //🇫🇷 Retrouver les activités associées à l'utilisateur grâce au champ "activités" de l'utilisateur
    //🇫🇷 et filtrez les activités dont la date est antérieure à la date du jour
    const activities = await Activity.find({
      _id: { $in: user.activities },
      date: { $lt: new Date() },
    });

    //🇬🇧 Send the found activities in the response //🇫🇷 Envoie les activités trouvées dans la réponse
    res.send(activities);
  } catch (error) {
    //🇬🇧 If an error occurs, send a 500 status code with the error message //🇫🇷 Si une erreur survient, envoyez un code d'état 500 avec le message d'erreur
    res.status(500).send(error.message);
  }
});

//🇫🇷 Récupère les activités à venir associées à un utilisateur spécifique
const upcomingActivity = asyncHandler(async (req, res) => {
  try {
    //🇬🇧 Find the user using the provided id in the URL
    const user = await User.findById(req.params.id);

    //🇬🇧 Find the activities associated with the user using the "activities" field of the user
    //🇬🇧 and filter the activities whose date is after the current date
    const activities = await Activity.find({
      _id: { $in: user.activities },
      date: { $gt: new Date() },
    });

    //🇬🇧 Send the found activities in the response
    res.send(activities);
  } catch (error) {
    //🇬🇧  If an error occurs, send a 500 status code with the error message
    res.status(500).send(error.message);
  }
});

/*
 * Recuperer la liste des utilisateurs qui ont participé à une activité et qui ont like
 */
const likeActivityParticipated = asyncHandler(async (req, res) => {
  try {
    //🇫🇷 Récupérer l'identifiant d'utilisateur à partir des paramètres de requête
    const userId = req.params.userId;

    //🇫🇷 Trouver l'utilisateur avec l'identifiant spécifié
    const user = await User.findById(userId);

    //🇫🇷 Si l'utilisateur n'existe pas, renvoyer une erreur 404
    if (!user) {
      return res.status(404).send("Utilisateur non trouvé");
    }

    //🇫🇷 Récupérer la liste des identificateurs d'activités auxquels l'utilisateur a participé
    const activityIds = user.activities;

    //🇫🇷 Trouver les activités avec les identificateurs dans la liste d'activités de l'utilisateur
    const activities = await Activity.find({ _id: { $in: activityIds } });

    //🇫🇷 Filtrer les activités pour ne conserver que celles qui ont été aimées par l'utilisateur
    const likedActivities = activities.filter((activity) => {
      return activity.likes.includes(userId);
    });

    //🇫🇷 Renvoyer la liste des activités aimées par l'utilisateur
    res.send(likedActivities);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

/*
 *Recuperer la liste des activités organisée par un utilisateur
 */
const organizedActivity = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).send({ error: "User not found" });

    // Find the activities organized or created by the user
    const activities = await Activity.find({
      $or: [{ author: user._id }, { attendees: user._id }],
    });
    if (!activities)
      return res.status(404).send({ error: "No activities found" });

    res.send({ activities });
  } catch (error) {
    res.status(500).send({ error: "Error retrieving activities" });
  }
});

//🇫🇷 recuperer la liste des utilisateurs que l'on rencontre dans une activite et qui ne sont pas ami
const noFriends = asyncHandler(async (req, res) => {
  try {
    const activityId = req.params.activityId;
    const userId = req.user._id; // ID de l'utilisateur courant

    const Activity = await activity.findById(activityId);

    if (!Activity) {
      return res.status(404).json({ error: "L'activité n'existe pas." });
    }

    const attendees = Activity.attendees;

    // Récupérer la liste des amis de l'utilisateur
    const User = await user.findById(userId);
    const userFriends = User.friends;

    // Récupérer la liste des utilisateurs qui participent à l'activité mais qui ne sont pas amis avec l'utilisateur
    const nonFriends = await user.find({
      _id: { $in: attendees },
      friends: { $nin: userFriends },
    });

    res.status(200).json(nonFriends);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error:
        "Une erreur est survenue lors de la récupération des utilisateurs.",
    });
  }
});

//🇫🇷permet d'afficher les 5 prochaines activités que participent un utilisateur trier par date afficher le nombre de participant et l'organisateur
const nextFiveActivity = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  try {
    const User = await user.findById(userId);
    if (!User) {
      return res.status(404).json({ message: "User not found" });
    }

    const now = new Date();
    const activities = await activity
      .find({
        //🇫🇷 rechercher les activités à venir auxquelles l'utilisateur participe
        attendees: userId,
        date: { $gte: now },
      })
      .populate("author")
      .sort("date")
      .limit(5);

    const nextActivities = []; //🇫🇷 pour stocker les détails des activités à venir.
    for (const activity of activities) {
      const attendeesCount = activity.attendees.length;
      const organizer = activity.author;
      nextActivities.push({
        title: activity.title,
        date: activity.date,
        attendeesCount: attendeesCount,
        organizer: organizer.userName,
      });
    }

    res.status(200).json(nextActivities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
//🇫🇷afficher les 5  dernieres interventions qu'un utilisateur
const lastFiveIntervention = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.userId;
    // 🇫🇷recuperer les 5 dernieres activites auxquelles l'utilisateur a participe
    const activities = await activity
      .find({ attendees: userId })
      .sort({ date: -1 })
      .limit(5);
    //🇫🇷Recuperer les 5 dernieres commentaires postes par l'utilisateur
    const comments = await comment
      .find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(5);
    //🇫🇷 creer une liste d'intervention qui contient les activites et les commentaires triés par datr decroissante
    const interventions = [...activities, ...comments]
      .sort((a, b) => b.createdAt - a - createdAt)
      .slice(0, 5);
    res
      .status(200)
      .json({ message: "Recuperation de la liste", interventions });
  } catch (error) {
    res.status(500).send("Erreur serveur");
  }
});
// Supprimer un participant d'une activité
const removeUserFromActivity = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      res.status(401).json({ error: "Authorization header missing" });
      return;
    }
    const authorizationToken = req.headers.authorization.replace("Bearer ", "");
    console.log({ authorizationToken: authorizationToken });
    const admin = await user.findOne({ token: authorizationToken });
    console.log({ admin: admin });

    if (!admin || !admin?.role?.name === "admin") {
      res
        .status(403)
        .json({ error: "You must be an admin to perform this action" });
      return;
    }

    const { activityId, userId } = req.body;

    //console.log({ activityId: activityId, userId: userId });
    // find activity by search .
    const Activity = await activity.findOne({ _id: activityId });
    if (!Activity) {
      res.status(404).json({ error: "Incorrect activityId" });
      return;
    }
    //console.log({ admin: admin, activity: activity });

    // find user to be removed
    const User = await user.findOne({ _id: userId });
    if (!User) {
      res.status(404).json({ error: "Incorrect userId" });
      return;
    }

    //console.log({ admin: admin, user: User, activity: Activity });
    let id = Activity.attendees.indexOf(User._id);
    //console.log({ id: id });
    if (id !== -1) {
      Activity.attendees.splice(id, 1);
      await Activity.save();
    }

    id = User.activities.indexOf(activityId);
    if (id !== -1) {
      User.activities.splice(id, 1);
      await User.save();
    }

    res.status(200).json({ result: "OK" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
// const removeUserFromActivity = async (req, res) => {
//   try {
//     // check if authorization header exists
//     if (!req.headers.authorization) {
//       res.status(401).json({ error: "Authorization header missing" });
//       return;
//     }

//     const authorizationToken = req.headers.authorization.replace("Bearer ", "");
//     const admin = await user.findOne({ token: authorizationToken });

//     // array of roles who can perform this action
//     const premiumRoles = ["admin", "moderator"];

//     // check if the user exists and if they have a role that allows this action
//     if (!admin || !premiumRoles.includes(admin?.role?.name)) {
//       res
//         .status(403)
//         .json({
//           error: "You must be an admin or a moderator to perform this action",
//         });
//       return;
//     }

//     const { activityId, userId } = req.body;
//     const Activity = await activity.findOne({ _id: activityId });

//     // check if the activity exists
//     if (!Activity) {
//       res.status(404).json({ error: "Incorrect activityId" });
//       return;
//     }

//     const User = await user.findOne({ _id: userId });

//     // check if the user exists
//     if (!User) {
//       res.status(404).json({ error: "Incorrect userId" });
//       return;
//     }

//     let id = Activity.attendees.indexOf(User._id);

//     if (id !== -1) {
//       Activity.attendees.splice(id, 1);
//       await Activity.save();
//     }

//     id = User.activities.indexOf(activityId);
//     if (id !== -1) {
//       User.activities.splice(id, 1);
//       await User.save();
//     }

//     res.status(200).json({ result: "OK" });
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// };


module.exports = {
  createActivity,
  getActivitiesList,
  joinActivity,
  getActivitiesByDate,
  leaveActivity,
  removeAllActivity,
  removeOneActivity,
  forbidAccessPeopleInActivity,
  invitePeople,
  getActivityById,
  editActivity,
  activityExpired,
  upcomingActivity,
  likeActivityParticipated,
  organizedActivity,
  noFriends,
  nextFiveActivity,
  lastFiveIntervention,
  removeUserFromActivity,
};
