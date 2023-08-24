const { user, verifyEmail, otp, role } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SHA256 = require("crypto-js/sha256");
const { generateCode, sendMail } = require("../../utils");
const fs = require("fs/promises");
const uid2 = require("uid2");
const path = require("path");
const encBase64 = require("crypto-js/enc-base64");
const generateToken = require("../../middleware/token/GenerateToken");

//🇬🇧 User Signin (sign in) //🇫🇷 Connexion utilisateur (se connecter)
const signin = async (req, res) => {
  try {
    //🇬🇧 TODO: use bcrypt instead of SHA256 (it's okay for now 😁)
    const passwordToHash = (password, salt) => {
      return SHA256(password + salt).toString(encBase64);
    };
    const { email, password } = req.body;

    const User = await user.findOne({ email: email }); //🇬🇧 find user by email //🇫🇷 trouver un utilisateur par e-mail

    if (!User) {
      return res.status(400).json({ error: "Password or email incorrect" });
    }

    if (passwordToHash(password, User.salt) !== User.hash) {
      //🇬🇧 compare password //🇫🇷 comparer le mot de passe
      res.status(401).json({ error: "Password or email incorrect" });
      return;
    }
    User.lastActionTime = new Date().getTime();
    await User.save();

    //const userObj = createUserObj(User);
    const { salt, hash, ...userObj } = User._doc;

    res.status(200).json({
      result: "OK",
      user: userObj,
    });
  } catch (e) {
    res.status(402).json({ error: e.message });
  }
};

//🇬🇧 create User Object //🇫🇷 créer un objet utilisateur
// TODO: extract user object to utils file
const createUserObj = (User) => {
  return {
    userName: User.userName,
    firstName: User.firstName,
    lastName: User.lastName,
    avatar: User.avatar,
    sexe: User.sexe,
    city: User.city,
    nativeLanguage: User.nativeLanguage,
    spokenLanguage: User.spokenLanguage,
    phone: User.phone,
    birthday: User.birthday,
    about: User.about,
    hobby: User.hobby,
    children: User.children,
    tobacco: User.tobacco,
    alcohol: User.alcohol,
    age: User.age,
    isPersonalAccount: User.isPersonalAccount,
    memberId: User.memberId,
    token: User.token,
    email: User.email,
    role: User.role, // nouveau
  };
};

const generateMemberId = async () => {
  //🇬🇧 generate a member id //🇫🇷 générer un identifiant de membre
  const count = await user.countDocuments({}); //🇬🇧 count the number of users //🇫🇷 compter le nombre d'utilisateurs
  const memberId = count + 100;
  const possibleLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomLetters = //🇬🇧 generate random letters //🇫🇷 générer des lettres aléatoires
    possibleLetters[Math.floor(Math.random() * possibleLetters.length)] +
    possibleLetters[Math.floor(Math.random() * possibleLetters.length)];

  return `${memberId} ${randomLetters}`;
};

//🇬🇧 user create account (sign up) //🇫🇷 l'utilisateur crée un compte (s'inscrire)
const signup = async (req, res) => {
  try {
    let { email, password } = req.body;

    const foundUser = await user.findOne({ email: email });

    //🇬🇧 if the user already exist, a 404 bad request will be returned //🇫🇷 si l'utilisateur existe déjà, une mauvaise requête 404 sera renvoyée
    if (foundUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    let memberId = await generateMemberId();

    //🇬🇧 TODO: use bcrypt to generate salt //🇫🇷 TODO : utiliser bcrypt pour générer du sel
    const token = uid2(32);
    const salt = uid2(16);

    //🇬🇧 TODO: change SHA256 to bcrypt //🇫🇷 TODO : changer SHA256 en bcrypt
    //🇬🇧Hash the password //🇫🇷Hachez le mot de passe
    const passwordToHash = (password, salt) => {
      return SHA256(password + salt).toString(encBase64);
    };

    const User = new user({
      email: email,
      salt: salt,
      token: token,
      hash: passwordToHash(password, salt),
      memberId: memberId,
      createdAt: new Date().getTime(),
      lastActionTime: new Date().getTime(),
    });
    await User.save();

    //🇬🇧 geneate code after successful registration //🇫🇷 générer du code après une inscription réussie
    const code = generateCode();
    await new verifyEmail({
      email: email,
      //🇬🇧 TODO: move token encryption to utils file  //🇫🇷 TODO : déplacer le chiffrement du jeton vers le fichier utils
      token: jwt.sign({ email: email, code: code }, process.env.SECRET_JWT, {
        expiresIn: "5d",
      }),
    }).save();

    const template = await fs.readFile(
      path.join(
        __dirname,
        "/../../templates/VerificationCodeEmailTemplate.html"
      ),
      { encoding: "utf-8" }
    );

    const html = template.replace("{{CODE}}", code);
    //🇬🇧TODO: uncomment this line to send email  //🇫🇷TODO : décommentez cette ligne pour envoyer un e-mail
    await sendMail({
      from: `Socializus <${process.env.MAIL_FROM_ADDRESS}>`,
      to: email,
      subject: "Email verification",
      text: `Here is your email verification code: ${code}`,
      html: html,
    });

    const userObj = createUserObj(User);

    // {
    //   data: '',
    //   error: null
    // }

    return res.status(200).json({
      statut: " Success",
      result: "Account successfuly created !",
      user: userObj,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      error: "An unknown error occured!",
    });
  }
};
//🇬🇧 send a verification code by email to change your password (sendcode) //🇫🇷 envoyer un code de vérification par email pour changer votre mot de passe (sendcode)
const changePassword = async (req, res) => {
  const passwordToHash = (password, salt) => {
    return SHA256(password + salt).toString(encBase64);
  };
  try {
    const { email, password, code } = req.body;

    const User = await user.findOne({ email: email });
    if (User === null) {
      res.status(401).json("No account uses this email"); //🇬🇧  email is not associated with a user /🇫🇷 l'email n'est pas associé à un utilisateur
      return;
    }

    // const Otp = await otp.findOne({ email: email })
    const Otp = await otp.find({ email }).sort({ expireIn: -1 }).limit(1);
    console.log("otp", Otp);
    if (Otp === null || code !== Otp[0].code) {
      res.status(401).json("Incorrect verification code"); //🇬🇧 if the code is incorrect  //🇫🇷 si le code est incorrect
      return;
    }

    const verifTime = User.expireIn;
    const difTime = new Date().getTime() - verifTime;
    const difInSeconds = Math.round(difTime / 1000);
    const difInMinutes = Math.round(difInSeconds / 60);

    if (difInMinutes > 30) {
      res.status(402).json({
        error: "The verification code expired. You must generate a new one.",
      }); // Generate a new code
      return;
    }

    User.hash = passwordToHash(password, User.salt);
    User.lastActionTime = new Date().getTime();
    await User.save();
    console.log("user", User);
    res.status(200).json({ result: "OK", user: User });
  } catch (e) {
    res.status(402).json({ error: e.message });
  }
};

//🇫🇷vérification de l'email d'un nouveau compte (verify email) //🇬🇧verify email for a new account (verify email)
const checkMail = async (req, res) => {
  try {
    //🇫🇷 Recherche de l'objet VerifyEmail dans la base de données en utilisant l'e-mail fourni //🇬🇧 Search for VerifyEmail object in database using provided email
    const VerifyEmail = await verifyEmail.findOne({ email: req.body.email });

    //🇫🇷 Vérification si l'objet VerifyEmail existe //🇬🇧 Checking if the VerifyEmail object exists
    if (VerifyEmail) {
      try {
        //🇫🇷 Vérification du code de vérification en décodant le jeton (token) à l'aide du SECRET_JWT //🇬🇧 Verification of the verification code by decoding the token using the SECRET_JWT
        var { code } = jwt.verify(VerifyEmail.token, process.env.SECRET_JWT);
        console.log("The code is:", code);

        //🇫🇷 Comparaison du code de vérification fourni dans la requête avec le code décodé //🇬🇧 Comparison of the verification code provided in the request with the decoded code
        if (req.body.code === code) {
          //🇫🇷 Mise à jour du document utilisateur pour marquer l'e-mail comme vérifié et enregistrer la date de vérification
          //🇬🇧 Update user document to mark email as verified and record verification date
          await user.findOneAndUpdate(
            { email: req.body.email },
            {
              $set: {
                isVerified: true,
                verifiedAt: new Date().toLocaleString(),
              },
            }
          );

          //🇫🇷 Suppression de l'objet VerifyEmail de la base de données //🇬🇧 Removing VerifyEmail object from database
          await verifyEmail.findByIdAndDelete(VerifyEmail._id);

          //🇫🇷 Réponse indiquant que l'e-mail a été vérifié avec succès //🇬🇧 Response indicating that the email was successfully verified
          res
            .status(200)
            .json({ message: "Your email has been verified", result: "OK" });
        } else {
          //🇫🇷 Réponse indiquant que le code de vérification fourni est incorrect //🇬🇧 Response indicating that the provided verification code is incorrect
          return res
            .status(400)
            .json({ message: "Incorrect verification code" });
        }
      } catch (err) {
        //🇫🇷 Réponse indiquant que le code de vérification a expiré  //🇬🇧 Response indicating that the verification code has expired
        return res.status(400).json({ message: "Expired verification code" });
      }
    } else {
      //🇫🇷 Réponse indiquant que l'e-mail indiqué n'existe pas dans la base de données  //🇬🇧 Response indicating that the specified email does not exist in the database
      return res.status(404).json({
        message: "The indicated email does not exist in the database",
      });
    }
  } catch (err) {
    //🇫🇷 Réponse indiquant une erreur serveur lors de la vérification de l'e-mail //🇬🇧 Response showing server error while verifying email
    res.status(500).json({ err: err.message });
  }
};

//🇫🇷send a verification code by email to change your password (sendcode) //🇬🇧send a verification code by email to change your password (sendcode)
const sendCode = async (req, res) => {
  // let data = await user.findOne({ email: req.body.email });
  const VerifyEmail = await verifyEmail.findOne({ email: req.body.email });
  try {
    //🇬🇧 TODO: add validation for inputs //🇫🇷 TODO : ajouter une validation pour les entrées
    let { email, subject, message } = req.body;

    const User = await user.findOne({ email: email });

    //🇬🇧 if user hasn't a account yet //🇫🇷 si l'utilisateur n'a pas encore de compte
    if (!User) {
      return res.status(400).json({ error: "User not found" });
    }
    let otpcode = generateCode();
    if (VerifyEmail) {
      await verifyEmail.findByIdAndDelete(VerifyEmail._id);
    }
    await new verifyEmail({
      email: email,
      //🇬🇧 TODO: move token encryption to utils file //🇫🇷 TODO : déplacer le chiffrement du jeton vers le fichier utils
      token: jwt.sign({ email: email, code: otpcode }, process.env.SECRET_JWT, {
        expiresIn: "30d",
      }),
    }).save();
    let otpData = new otp({
      email: req.body.email,
      code: otpcode,
      expireIn: new Date().getTime() + 300 * 1000,
    });
    await otpData.save(); //🇬🇧save the code in the database //🇫🇷sauvegarder le code dans la base de données

    message = message.split("######").join(otpcode); //🇬🇧replace the code in the message //🇫🇷remplace le code dans le message

    console.log("code envoyé", otpcode);
    //🇬🇧TODO: uncomment this line to send email //🇫🇷TODO : décommentez cette ligne pour envoyer un e-mail
    await sendMail({
      from: process.env.MAIL_FROM_ADDRESS,
      to: email,
      subject: subject,
      text: message,
    });

    return res.status(200).json({ message: "Email sent to " + email });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

//🇫🇷 Pour verifier le temps de validite du code
const checkCode = async (req, res) => {
  //🇫🇷 Récupération des entrées (email, code) depuis la requête
  try {
    // TODO: add validation for inputs
    const { email, code } = req.body;
    console.log({ email, code });
    //🇫🇷 Recherche du document OTP correspondant à l'email et au code fournis
    const result = await otp.findOne({ email: email, code: code });
    console.log({ result });
    //🇫🇷 Vérification si le document OTP existe
    if (!result) {
      return res.status(404).json({ error: "User not found" });
    }
    //🇫🇷 Calcul de la durée écoulée depuis l'expiration du code
    const verifyTime = result.expireIn;
    const diffTime = new Date().getTime() - verifyTime;
    const diffInSeconds = Math.round(diffTime / 1000);
    const diffInMinutes = Math.round(diffInSeconds / 60);

    //🇫🇷 Vérification si le code a expiré (plus de 30 minutes écoulées)
    if (diffInMinutes > 30) {
      return res.status(410).json({
        error: "The verification code expired. You must generate a new one.",
      });
    }
    // 🇫🇷Vérification si le code fourni correspond au code dans le document OTP
    if (result.code !== "" + code) {
      res
        .status(402)
        .json({ error: "The verification code provided is invalid!" });
      return;
    }
    // if (result.code !== code.toString()) {
    //   return res
    //     .status(400)
    //     .json({ error: "The verification code provided is invalid" });
    // }
    //🇫🇷 Réponse indiquant que le code de vérification est valide et le temps écoulé depuis son expiration
    return res.status(200).json({ result: "OK", time: diffInMinutes });
  } catch (e) {
    //🇫🇷 Réponse indiquant une erreur lors de la vérification du code de vérification
    return res.status(400).json({ error: e.message });
  }
};

const testUser = async (req, res) => {
  try {
    console.log(req.body);
    //🇫🇷 Recherche d'un utilisateur existant avec l'adresse e-mail fournie //🇬🇧 Searching for an existing user with the provided email address
    const userExist = await user.findOne({ email: req.body.email });

    //🇫🇷 Vérification si un utilisateur existe avec l'adresse e-mail donnée //🇬🇧 Checking if a user exists with the given email address
    if (userExist) {
      res.status(200).json({ result: true });
    } else {
      res.status(200).json({ result: false });
    }
  } catch (error) {
    res.json({ error: error });
  }
};

module.exports = {
  signin,
  signup,
  testUser,
  // sendEmailVerification,
  changePassword,
  checkMail,
  sendCode,
  checkCode,
};
