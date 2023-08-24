const { id } = require("date-fns/locale");
const { user, role } = require("../../models");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

// @desc Get all users
// @route GET /users
// @access Private
//🇬🇧 Get list of users
//🇫🇷  Obtenir la liste des utilisateurs
const getUserList = asyncHandler(async (req, res) => {
  try {
    /*req.query contiens les arguments passer dans l'url :  ?<name>=<value>
          Par exemple : /api/user/getuserlist?limit=10&skip=5 donne
          req.query => {limit : 10,skip :5}
    */
    const skip = Number(req.query.skip); // sauter les <skip> premières données
    const limit = Number(req.query.limit); //prendre au maximum <limit> données

    const ignoredAvatarUrls = [
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png", 
      "/static/media/user-guy.010d58ae612873b54a34.svg",
      "/static/media/user-girl.8a9058341ad2c241f41d.svg"
    ];

    const result = await user    
    .aggregate([
      {
        $match: { //filtre les users sans images
          avatar: {
            $nin: ignoredAvatarUrls,       
            $not: {
              $regex: /^data:image\/jpeg|^https:\/\/res.cloudinary.com/
            },
            $exists: true  
          },
        }
      },
      { $sample: { size: 10000 } }, // choisis aléatoirement des membres
      // Décommentez pour tester le filtre sur postman
      // { $project: { role: 0, _id: 0, university: 0, studies: 0, friends: 0, friendRequests:0, blockList:0,
      //   activities: 0, activityInvitations:0, isVerified: 0, spokenLanguage: 0, hobbies: 0, evaluations: 0,
      //   chats: 0, likes: 0, email: 0, salt: 0, token: 0, hash: 0, memberId: 0, createdAt: 0, lastActionTime: 0, 
      //   updatedAt: 0, __v: 0, city: 0, firstName: 0, isPersonalAccount: 0, nativeLanguage: 0, sexe: 0, userName: 0, 
      //   alcohol: 0, birthday: 0, children: 0, tobacco: 0, lastName: 0, age: 0, about: 0, phone: 0
      //   } }
    ])
    
    // .find()
    .skip(skip)
    .limit(limit);
    // important de mettre le .skip avant le .limit
    // .find({}, {email: 0, hash: 0, salt: 0}) // ne pas afficher ces éléments dans l'api

    console.log({ result });
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});
//🇬🇧 get user avatar by Id
// 🇫🇷  Obtenir l'avatar d'un utilisateur à l'aide de l'Id
const getavatarlistfromids = asyncHandler(async (req, res) => {
  // get avatar list from ids
  try {
    const indexs = req.body.indexs; // get indexs from body
    const result = await user.find({ _id: { $in: indexs } }); // find users by ids
    console.log(indexs, result); // log indexs and result
    res.status(200).json({ result: result }); // send result
  } catch (err) {
    res.status(500).json({ err });
  }
});

//🇬🇧 get user informations
// 🇫🇷  Obtenir les informations d'un utilisateur
const getUserInfo = asyncHandler(async (req, res) => {
  try {
    console.log(req.params.id);
    const User = await user
    // .find({}, {email: 0, token: 0, hash: 0, salt: 0}) // ne pas afficher ces éléments dans l'api
    .findOne({
      _id: new mongoose.Types.ObjectId(req.params.id),
    });
    console.log(User);
    if (!User || User.length <= 0) {
      res.status(400).json({ error: "User node found" });
    } else {
      const {
        token,
        hash,
        salt,
        verificationCode,
        verificationCodeTime,
        ...info
      } = User._doc;
      res.status(200).json({ user: info });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
//🇬🇧 check admin role
// 🇫🇷  Vérifie le role admin
const tryAdmin = asyncHandler(async (req, res) => {
  const { role: userRole, user: currentUser } = req;

  if (!userRole || userRole != "admin") {
    return res.json({
      massage: `Access non autorisé, vous avez un role ${userRole}`,
    });
  }
  return res.json({ message: "Welcome Admin" });
});

//get user informations
const getUserInfoByToken = asyncHandler(async (req, res) => {
  try {
    console.log("token", req.body.token);
    const User = await user.findOne({ token: req.body.token });

    if (!User) {
      res.status(400).json({ error: "User not found" });
    }
    const {
      token,
      hash,
      salt,
      verificationCode,
      verificationCodeTime,
      ...info
    } = User._doc;
    info._id = User._id;
    res.status(200).json({ user: info });
  } catch (err) {
    res.status(500).json(err);
  }
});

//  EndPoint that retrieve a user avatar, his id given

const getUserAvatarById = asyncHandler(async (req, res) => {
  try {
    if (req.params.id) {
      // si l'id est envoyé
      const avatar = await user.findById(req.params.id).select(["avatar"]);

      res.status(200).json(avatar);
    } else {
      // if the id is not send
      res
        .status(400)
        .json("A user id is required in the request's query string");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// @desc modify users information
// @route PUT/users
// @access Private

//modifier les informations d'un utilisateur
const modifyUserInfo = asyncHandler(async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Date to update can not be empty",
    });
  }

  const id = req.params.id;
  user
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update information with id =${id} may be User was not found`,
        });
      } else res.send({ message: "User was updated successfully " });
    })
    .catch((err) => {
      message: err.message || "Some error occurred while updating the user.";
    });
});

// @desc supprimer users information
// @route delete/users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
  const { role: userRole } = req;

  if (!userRole || userRole != "admin") {
    // si l'utilisateur n'est pas admin
    return res.json({
      message: `Access non autorisé, vous avez un role ${userRole}`, // message d'erreur
    });
  }
  user
    .findByIdAndDelete(req.params.id)
    .then((User) => {
      if (!User) return res.status(404).send({ message: "User not found" });
      res.send({ message: "User was deleted successfully" });
    })
    .catch((err) => res.status(400).send({ message: err.message }));
});

/*
  @desc emails
 */
// recuperer liste des emails des utilisateurs existantes
const getEmail = asyncHandler(async (req, res) => {
  try {
    const users = await user.find({});
    let emails = [];
    users.forEach((element) => {
      emails.push(element.email);
    });
    res
      .status(200)
      .send({ message: "successfull retrieve emails list", emails });
  } catch (error) {}
});

// endpoint qui permet d'update le role des utilisateurs qui n'existait pas
const setRole = asyncHandler(async (req, res) => {
  try {
    let { emails, roleId } = req.body;

    // Validate input data
    if (!emails || !roleId) {
      res.status(400).json({ error: "Emails and role ID are required." });
      return;
    }

    // Validate the role exists
    const foundRole = await role.findById(roleId);
    if (!foundRole) {
      res.status(400).json({ error: "Invalid role ID." });
      return;
    }

    // Update the role of the users
    const updatedUsers = await user.updateMany(
      { email: { $in: emails } },
      {
        $set: {
          role: {
            id: roleId,
            name: foundRole.name,
          },
        },
      }
    );

    // Check if any users were updated
    if (updatedUsers.nModified === 0) {
      res.status(400).json({ error: "No users were updated." });
      return;
    }

    res.status(200).json({ message: "Roles updated successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//afficher uniquement  les membres  de sexe M

const getUserMale = asyncHandler(async (req, res) => {
  try {
    const users = await user.find({ sexe: "male" }); // Pour recuperer les utilisateurs de sexe male

    if (!users) {
      // verifie que des utilisateurs de sexe male exite sinon il affiche le message
      res.status(200).json({ message: "No male users found " });
      return;
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// afficher uniquement les membres de sexe F
const getUserFemale = asyncHandler(async (req, res) => {
  try {
    // condition  pour verifier s'il y a des utilisateur de sexe female
    const femaleUserCount = await user.countDocuments({ sexe: "female" });
    if (femaleUserCount === 0) {
      return res.status(404).send({ message: "No female users found" });
    }

    const sexeFemaleExit = await user.find({ sexe: "female" });
    // c'est bon alors oui tu peux juste rajouter une condition qui verifie que ça exite bien dans la base de données je vais essayer
    res.send(sexeFemaleExit);
  } catch (error) {
    res.status(500).send({
      message: "An error occured while retrieving female users",
      error,
    });
  }
});

// Affiche la liste des amis des utilisateurs

const getFriendUserList = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.userId;
    const users = await user.findById(userId).populate("friends");

    if (!users) {
      return res.status(404).send({ message: "User Not found" });
    }

    const friends = users.friends;

    res
      .status(200)
      .json({ message: "Successfully retrieved user's friends", friends });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "can not retrieve friends list" });
  }
});

// add friends
const addFriends = asyncHandler(async (req, res) => {
  try {
    const users = await user.findById(req.params.id);
    if (!users) {
      return res.status(404).json({ message: "user not found" });
    }

    const friend = await user.findById(req.body.friendId);
    if (!friend) {
      return res.status(404).json({ message: " friends doesn't exit" });
    }

    if (users.friends.includes(friend._id)) {
      return res
        .status(409)
        .json({ message: "Already in the list of friends" });
    }

    users.friends.push(friend._id);
    await users.save();

    res.status(200).json({
      message: "The friend has been successfully added to the list of friends",
      friend,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while adding the friend" });
  }
});

//generer un nouveau memberId
const generateMemberId = async () => {
  const count = await user.countDocuments({});
  const memberId = count + 100;
  const possibleLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomLetters =
    possibleLetters[Math.floor(Math.random() * possibleLetters.length)] +
    possibleLetters[Math.floor(Math.random() * possibleLetters.length)];

  return `${memberId} ${randomLetters}`;
};

//update memberid  optionnal

const updateMember = async (req, res) => {
  try {
    // recuperer la liste des utilisateurs existants triés par date de creation
    const users = await user.find().sort("createdAt");

    // parcourir chaque utilisateur et utiliser la fonction generatedMemberid pour generer un nouveau memberId
    for (let a of users) {
      const newMemberId = await generateMemberId();

      //mettre à jour le memberid de chaque utilisateur dans la base de donnée
      await user.updateOne({ _id: a.id }, { memberId: newMemberId });
    }
    res.status(200).send({
      message: "Les membres existants ont ete mis à jour avec succes",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "une erreur est survenue" });
  }
};

module.exports = {
  getUserList,
  getUserInfo,
  getUserAvatarById,
  getavatarlistfromids,
  modifyUserInfo,
  getUserInfoByToken,
  tryAdmin,
  getEmail,
  setRole,
  getUserMale,
  getUserFemale,
  getFriendUserList,
  addFriends,
  updateMember,
};
