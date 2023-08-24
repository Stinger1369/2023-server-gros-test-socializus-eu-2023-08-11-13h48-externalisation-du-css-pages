const { user, role } = require("../../models");
const uid2 = require("uid2");

//-----------------------------Handle characters-----------------------------------------------------

const specialChars = `²&é~"#'{([-|è_ç^à@)]=}^¨$£ù%*µ,?;.:/!§`;
const numbers = `0123456789`;
//manage invalid characters
const invalidChars = specialChars + numbers;

// declaration de la constante findCharsInText qui gere un texte et ses caracteres
const findCharsInText = (text, chars) => {
  //cherche si une lettre contenu dans "text" est présente dans "chars"
  for (let i = 0; i < text.length; i++) {
    if (chars.indexOf(text[i]) !== -1) {
      return true;
    }
  }
  return false;
};
// declaration de la constante onlychar qui gere un texte et ses caracteres
const onlyChars = (text, chars) => {
  let temp = "" + text;

  while (temp.indexOf(" ") !== -1) {
    temp = temp.replace(" ", "");
  }

  for (let i = 0; i < text.length; i++) {
    if (chars.indexOf(text[i]) === -1) {
      return false;
    }
  }
  return true;
};

// Create user object
const createUserObj = (User) => {
  // recupere les informations issues de la base de données de l'utilisateur
  return {
    userName: User.userName,
    firstName: User.firstName,
    lastName: User.lastName,
    avatar: User.avatar,
    image: User.image,
    sexe: User.sexe,
    city: User.city,
    nativeLanguage: User.nativeLanguage,
    spokenLanguage: User.spokenLanguage,
    phone: User.phone,
    birthday: User.birthday,
    about: User.about,
    hobby: User.hobby,
    children: User.children,
    studies: User.studies,
    university: User.university,
    tobacco: User.tobacco,
    alcohol: User.alcohol,
    age: User.age,
    isPersonalAccount: User.isPersonalAccount,
    memberId: User.memberId,
    token: User.token,
    email: User.email,
    role: User.role,
  };
};

// Create profile :
const createProfile = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      res.status(402).json({ error: "Authorization header missing" });
      return;
    }

    const authorizationToken = req.headers.authorization.replace("Bearer ", ""); // use bearer token to authorize the connection
    const User = await user.findOne({ token: authorizationToken });

    if (!User) {
      res.status(403).json({ error: "Incorrect user token" });
      console.log("user not found");
      return;
    }

    console.log("body", req.body);
    const {
      image,
      sexe,
      isPersonalAccount,
      firstName,
      lastName,
      userName,
      city,
      nativeLanguage,
      roleName,
    } = req.body;
    // Trouver le rôle avec le nom fourni
    const roleObj = await role.findOne({ name: roleName }); // find the role with the name provided
    if (!roleObj) {
      res.status(404).json({ error: "Role not found" });
      return;
    }

    try {
      if (!sexe || (sexe !== "male" && sexe != "female")) {
        res.status(410).json({ error: "sexe invalid" });
        return;
      }
      if (
        "" + isPersonalAccount != "true" &&
        "" + isPersonalAccount != "false"
      ) {
        res.status(411).json({ error: "isPersonalAccount invalid" });
        return;
      }
      if (!firstName || firstName === "") {
        res.status(412).json({ error: "Invalid firstName" });
        return;
      }
      if (!lastName || lastName === "") {
        res.status(413).json({ error: "Invalid lastName" });
        return;
      }
      if (!userName || userName === "") {
        res.status(414).json({ error: "Invalid userName" });
        return;
      }
      if (!city || city === "") {
        res.status(415).json({ error: "Invalid city" });
        return;
      }
      if (!nativeLanguage || nativeLanguage === "") {
        res.status(416).json({ error: "Invalid nativeLanguage" });
        return;
      }

      // if (!image) {
      //   res.status(417).json({ error: "no image found" });
      //   return;
      // }
    } catch (e) {}
    User.sexe = sexe;
    User.isPersonalAccount = isPersonalAccount;
    User.firstName = firstName;
    User.lastName = lastName;
    User.userName = userName;
    User.city = city;
    User.image = image;
    User.nativeLanguage = nativeLanguage;
    User.role = {
      id: roleObj._id,
      name: roleName,
    };

    console.log("url", image);
    User.avatar = image;

    await User.save();

    const userObj = createUserObj(User);
    res.status(200).json({ result: "success", user: userObj });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
// Create Profile Step1
const createProfileStepOne = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      // if the authorization header is missing
      res.status(402).json({ error: "Authorization header missing" });
      return;
    }

    const authorizationToken = req.headers.authorization.replace("Bearer ", "");
    const User = await user.findOne({ token: authorizationToken });

    if (!User) {
      // if the user is not found
      res.status(403).json({ error: "Incorrect user token" });
      return;
    }

    const o = req.body;
    const isPersonalAccount = o.isPersonalAccount;
    const firstName = o.firstName;
    const userName = o.userName;
    const city = o.city;
    const nativeLanguage = o.nativeLanguage;
    const image = o.image;

    // Conditions for the user profile

    if ("" + isPersonalAccount != "true" && "" + isPersonalAccount != "false") {
      res.status(401).json({ error: "Invalid isPersonalAccount" });
      return;
    }
    if (
      !firstName ||
      firstName === "" ||
      findCharsInText(firstName, invalidChars)
    ) {
      res.status(401).json({ error: "Invalid firstName" });
      return;
    }
    if (
      !userName ||
      userName === "" ||
      findCharsInText(userName, specialChars)
    ) {
      res.status(401).json({ error: "Invalid userName" });
      return;
    }
    if (!city || city === "" || findCharsInText(city, invalidChars)) {
      res.status(401).json({ error: "Invalid city" });
      return;
    }
    if (
      !nativeLanguage ||
      nativeLanguage === "" ||
      findCharsInText(city, invalidChars)
    ) {
      res.status(401).json({ error: "Invalid nativeLanguage" });
      return;
    }
    // if (!req.files.image) {
    //   res.status(401).json({ error: "image not found" });
    //   return;
    // }

    User.isPersonalAccount = isPersonalAccount;
    User.firstName = firstName;
    User.userName = userName;
    User.city = city;
    User.nativeLanguage = nativeLanguage;

    // Déjà fait côté frontend

    console.log(image);
    User.avatar = image.url;

    await User.save();

    const userObj = createUserObj(User);
    res
      .status(200)
      .json({ result: "Create Profile step One Done", User: userObj });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// Create Profile Step1
const createProfileStepTwo = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      res.status(402).json({ error: "Authorization header missing" });
      return;
    }

    const authorizationToken = req.headers.authorization.replace("Bearer ", "");
    const User = await user.findOne({ token: authorizationToken });

    if (!user) {
      res.status(403).json({ error: "Incorrect user token" });
      return;
    }

    const { firstName, lastName, phone, birthday, email, security } = req.body;

    console.log(
      "BIRTHDAY = ",
      birthday,
      Number(birthday),
      isNaN(Number(birthday))
    );

    if (
      !firstName ||
      firstName === "" /*|| findCharsInText(firstName, invalidChars)*/
    ) {
      res.status(401).json({ error: "Invalid firstName" });
      return;
    }
    if (
      !lastName ||
      lastName === "" /*|| findCharsInText(lastName, invalidChars)*/
    ) {
      res.status(401).json({ error: "Invalid lastName" });
      return;
    }
    if (!phone || phone === "" || !onlyChars(phone, "+0123456789")) {
      res.status(401).json({ error: "Invalid phone" });
      return;
    }
    if (!birthday || isNaN(Number(birthday))) {
      res.status(401).json({ error: "Invalid birthday" });
      return;
    }
    if (
      !email ||
      email === "" ||
      !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
    ) {
      res.status(401).json({ error: "Invalid email" });
      return;
    }
    if (!security || security.length != 5 || !onlyChars(security, "01")) {
      res.status(401).json({ error: "Invalid security" });
    }

    User.firstName = firstName;
    User.lastName = lastName;
    User.phone = phone;
    User.birthday = birthday;
    User.email = email;
    User.askFriendSecurity = security;
    await User.save();

    res.status(200).json({ result: "Create Profile step Two Done" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// create profile step 3
const createProfileStepThree = async (req, res) => {
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

    const {
      about,
      spokenLanguage,
      hobbies,
      children,
      tobacco,
      alcohol,
      studies,
      university,
      age,
    } = req.body;

    if (!about) {
      res.status(401).json({ error: "Invalid about" });
      return;
    }
    if (!age || age instanceof Array === false) {
      res.status(401).json({ error: "Invalid hobbies" });
      return;
    }
    if (!hobbies || hobbies instanceof Array === false) {
      res.status(401).json({ error: "Invalid hobbies" });
      return;
    }
    if (!spokenLanguage || spokenLanguage instanceof Array === false) {
      res.status(401).json({ error: "Invalid spokenLanguage" });
      return;
    }
    if (isNaN(children) || children < 0 || children >= 3) {
      res.status(401).json({ error: "Invalid children" });
      return;
    }
    if (isNaN(tobacco) || tobacco < 0 || tobacco >= 3) {
      res.status(401).json({ error: "Invalid tobacco" });
      return;
    }
    if (isNaN(alcohol) || alcohol < 0 || alcohol >= 3) {
      res.status(401).json({ error: "Invalid alcohol" });
      return;
    }

    User.about = about;
    User.hobbies = hobbies;
    User.spokenLanguage = spokenLanguage;
    User.children = children;
    User.tobacco = tobacco;
    User.alcohol = alcohol;
    User.studies = studies;
    User.university = university;
    User.age = age;
    await User.save();

    res.status(200).json({ result: "Create Profile step three Done" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

module.exports = {
  createProfile,
  createProfileStepOne,
  createProfileStepTwo,
  createProfileStepThree,
};
