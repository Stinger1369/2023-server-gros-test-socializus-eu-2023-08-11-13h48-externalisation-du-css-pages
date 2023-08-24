//🇫🇷 Page d'édition du profil (Figma Frame 15,16,17)
//🇬🇧 Edit Profile Page (Figma Frame 15,16,17)

import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import styles from "./Styles/EditProfileScreenCss"
import { useEffect, useState, useLayoutEffect, Children } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

// Composants
import Fields, { CityField } from "../components/Fields";
import TwinSelectButton from "../components/TwinSelectButton";
import LogButton from "../components/LogButtons";
import EditBigSquare from "../components/EditBigSquare";
import MultilineFields from "../components/MultilineFields";
import SelectLanguage from "../components/SelectLanguage";
import { countriesListRectFlags as countriesList } from "../assets/countriesListRectFlags";
import CountryListDropdown from "../components/CountryListDropdown";
import { ActivityTypesGrid_SeveralTopics } from "../components/ActivityTypesGrids";
import ProfilePictureEdit from "../components/ProfilePictureComponent/ProfilePictureEdit";
import moment from "moment"; // biblioteque javasCript pour travailler avec la date

// Assets
import CameraSvg from "../assets/images/camera.svg";
import Json from "../assets/json/en.json";
import eventList from "../assets/json/activityList.json";
import LastNameIcon from "../assets/images/image_edit_profile/textFrame.svg";
import MemberNumberIcon from "../assets/images/image_edit_profile/avatar.svg";
import EmailIcon from "../assets/images/image_edit_profile/envelope.svg";
import PhoneIcon from "../assets/images/phone.svg";
import BirthdayIcon from "../assets/images/birthday.svg";
//connections
import { hostname } from "../backendconnect/hostname.js";

import { SvgUri } from "react-native-svg";
import { CheckBox } from "@rneui/base";

//import des flags Image qui se trouve dans les utils
//import { flagsImage } from "../utils/flagImage";
import { activitiesList } from "../assets/activityList/activityListWithIcons";
import { CountriesGrid_SeveralFlags } from "../components/CountriesGrids";
import {
  CheckboxSquare,
  OptionButtonProfile,
} from "../components/SelectionElements";
import { useSelector, useDispatch } from "react-redux";
//UPDATE: Import the {CountriesGrid_SeveralFlags} from the CountriesGrids.js component
// FR Variable json se trouvant dans en.json permet de faire la traduction des differentes langues
// GB Json variable located in en.json allows the translation of different languages

const EditProfileScreen = ({
  token,
  flags,
  scr,
  user,
  setUser,
  onClick,
  payscountry,
}) => {
  const dispatch = useDispatch(); // passage de la langue selectionnée in countryListDropdown,
  useEffect(() => {
    // à l'APP, onClick(langue) est le messanger dell"APP
    dispatch({ type: language });
  }, []);
  const langue = useSelector((state) => state.langue);
  console.log(langue);
  onClick(langue);

  const { editProfile } = scr; //🇫🇷 editProfile est une variable qui contient les traductions en français

  const navigation = useNavigation();

  //Demande users-list pour check nickname
  const [users, setUsers] = useState([]);
  const [nickNameIsValid, setNickNameIsValid] = useState(false);

  // logique de page/buttons
  const [step, setStep] = useState(1);
  const [leftActive, setLeftActive] = useState(false); //🇫🇷 valeur para accountType dans BD //🇬🇧 accounType value in BD
  const [rightActive, setRightActive] = useState(false);
  const [pressed, setPressed] = useState(false); //🇫🇷 condition pour rendre rouge bord fields //🇬🇧 condition for put borderline red in fields
  const [selected, setSelected] = useState(false);
  const [selectAccount, setSelectedAccount] = useState(true);
  const [isLoading, setisLoading] = useState(true);
  const [isFormValid, setIsFormValid] = useState(true);

  //messages d'erreur // error messages
  const [errorMsgFirstName, setErrorMsgFirstName] = useState(null);
  const [errorMsgNickName, setErrorMsgNickName] = useState(null);
  const [errorMsgCity, setErrorMsgCity] = useState(null);
  const [errorMsgLastName, setErrorMsgLastName] = useState(null);
  const [errorMsgPhone, setErrorMsgPhone] = useState(null);
  const [errorMsgBirthday, setErrorMsgBirthday] = useState(null);
  const [emailError, setEmailError] = useState(null);

  //states pour enregitrement de données

  // step 1
  const [profilData, setProfilData] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [nickName, setNickName] = useState(null);
  const [language, setLanguage] = useState(payscountry);
  //const [nativeLanguage, setNativeLanguage] = useState(null);
  const [appLanguage, setAppLanguage] = useState(language); // useState pour passer langue à l'aplication
  // step 2
  const [lastName, setLastName] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [birthdayDate, setBirthdayDate] = useState(null); //🇫🇷 state pour convertir avec biblioteque moment de string à nombre //🇬🇧 state to convert with library moment from string to number
  const [birthdayNumber, setBirthdayNumber] = useState(0); //🇫🇷 state pour convertir avec biblioteque moment de nombre à string //🇬🇧 state to convert with library moment from number to string
  const [email, setEmail] = useState(null);
  const [city, setCity] = useState(null);
  const [about, setAbout] = useState(null);
  const [topics, setTopics] = useState([]); // hobbies utilisateur in NUMBER
  //const [topic, setTopic] = useState(-1); //voir le code de createActivity car c'est la meme logique qui est appliquée
  //const [activityList, setActivityList] = useState(null);
  const [languagesSpoken, setLanguagesSpoken] = useState([]); // les langues parlées pour l'utilisateur NUMBER
  //States pour selection de children, tobacco, age et alcool
  const [children, setChildren] = useState(null); // ATTENTION dans le model du backend , il figure comme NUMBER
  const [titleChildren, setTitleChildren] = useState(""); // ATTENTION en string
  const [tobacco, setTobacco] = useState(null); // ATTENTION dans le model du backend , il figure comme NUMBER
  const [titleTobacco, setTitleTobacco] = useState(""); // ATTENTION en string
  const [alcohol, setAlcohol] = useState(null); // ATTENTION dans le model du backend , il figure comme NUMBER
  const [titleAlcohol, setTitleAlcohol] = useState(""); // ATTENTION en string
  const [age, setAge] = useState(null);
  const [titleAge, setTitleAge] = useState("");

  // pour enregistrer avatar
  const [profileImage, setProfileImage] = useState(null);
  const [avatarImage, setAvatarImage] = useState(null);
  //states pour studies/university (à voir si c'est implementé dans editprofile)
  const [studies, setStudies] = useState("secret");
  const [university, setUniversity] = useState("secret");
  const [test, setTest] = useState(false);
  // données utilisateur non changeables
  const [accountType, setAccountType] = useState(null); // personal account or pro (not boolean ==> see leftActive)
  const [memberId, setMemberId] = useState("");
  const [role, setRole] = useState(user.role);
  const [msgErrorProfile, setMsgErrorProfile] = useState("");

  console.log(profilData);

  const profileState = {
    //🇫🇷 variable qui contient les states pour les passer dans les composants
    accountType,
    setAccountType,
    memberId,
    setMemberId,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    nickName,
    setNickName,
    city,
    setCity,
    language,
    setLanguage,
    role,
    setRole,
  };

  const initScreen = () => {
    //🇫🇷 fonction pour initialiser les states avec les données de l'utilisateur
    if (profilData.birthday > 0) {
      setBirthdayDate(moment(profilData.birthday).format("DD/MM/YYYY")); //🇫🇷moment passe la date en format DD/MM/YYYY depuis BD //🇬🇧 moment put the date in format DD/MM/YYYY depuis DB
    }
    if (profilData.isPersonalAccount) {
      setLeftActive(true);
      setRightActive(false);
    } else {
      setLeftActive(false);
      setRightActive(true);
    }
    setAvatarImage(null);
    setMemberId(profilData.memberId);
    setFirstName(profilData.firstName === "null" ? null : profilData.firstName);
    setNickName(profilData.userName === "null" ? null : profilData.userName);
    setCity(profilData.city === "null" ? null : profilData.city);
    console.log(profilData.nativeLanguage);
    setLanguage(
      profilData.nativeLanguage === "undefined" ||
        profilData.nativeLanguage === "null" ||
        !profilData.nativeLanguage
        ? payscountry
        : profilData.nativeLanguage
    ); //pour probleme d'enregistrement de langue aprés verification user, enlever condition si c'est ok
    setLastName(profilData.lastName === "null" ? null : profilData.lastName);
    setPhoneNumber(profilData.phone);
    setEmail(profilData.email);
    setAccountType(
      profilData.isPersonalAccount === null
        ? null
        : profilData.isPersonalAccount
    );
    setAbout(profilData.about);
    setTopics(profilData.hobbies ?? []); /// tableau vide pour bug dutilisateur non verifies
    setLanguagesSpoken(profilData.spokenLanguage ?? []); // tableau vide pour bug
    setChildren(profilData.children ?? null);
    setTobacco(profilData.tobacco ?? null);
    setAlcohol(profilData.alcohol ?? null);
    setAge(profilData.age ?? null);
    if (
      profilData.firstName === "null" ||
      profilData.userName === "null" ||
      profilData.city === "null" ||
      profilData.lastName === "null" ||
      profilData.isPersonalAccount === null
    ) {
      setTest(true);
    }
  };

  //Import d'information utilisateur

  /*🇫🇷 Les informations proviens du user.storage(avant les info etaient cherchais sur "Profile" en storage) qui est enregistré dans le store dans user , cet store est enregistré quand on fait log-in dans la aplication  , à voir plus dans le fichier passwordscreen.js*/
  /*🇬🇧 The information comes from user.storage ( before , the infos was getted from "Profile" en storage), which is registered in the user store, the store is registered when you log-in in the application, see more in the passwordscreen.js file"*/

  useEffect(() => {
    const getProfileData = async () => {
      console.log("getProfilData");
      setProfilData(JSON.parse(await AsyncStorage.getItem("user")));
      setisLoading(false);
    };

    if (!profilData)
      getProfileData(); //🇫🇷 Si les données de profil ne sont pas disponibles, récupérez-les depuis AsyncStorage
    //🇫🇷 Si les données de profil ne sont pas disponibles, récupérez-les depuis AsyncStorage
    //🇬🇧 If profile data is not available, fetch it from AsyncStorage
    else {
      console.log("profile data chargé", profilData);
      initScreen();
      setisLoading(false);
    }
  }, [profilData]);

  /////////////////🇫🇷  Validations de données avant etre envoyés/*🇬🇧 data validations before send///////////////////////////////////
const [skip, setSkip] = useState(0);
const limit = 1;
  //🇫🇷 User effect pour demande de liste users/*🇬🇧 UseEffect for check nickname
  useEffect(() => {
    axios
      .get(`${hostname}/api/v1/user/getuserlist?limit=${limit}&skip=${skip}`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    //🇫🇷 Si le nickname existe dans la BD, le formulaire n'est pas valide
    if (users.length > 0 && nickName) {
      const userNameExists = users.some((user) => user.userName === nickName);
      setNickNameIsValid(userNameExists);
    }
  }, [nickName]);

  // function isDatePassed(date) {
  //   // Convertir la date en millisecondes
  //   var givenDate = new Date(date).getTime();

  //   // Obtenir la date actuelle en millisecondes
  //   var currentDate = new Date().getTime();

  //   // Calculer la différence en millisecondes
  //   var difference = currentDate - givenDate;

  //   // Calculer le nombre de jours écoulés
  //   var daysPassed = Math.floor(difference / (1000 * 60 * 60 * 24));

  //   return daysPassed >= 0;
  // }

  const HandleValidate = () => {
    //🇫🇷 Fonction pour valider les données avant de les envoyer au serveur
    setPressed(true);
    setIsFormValid(true);

    /*🇫🇷 Validation pour firstName,avec regex, pour accepter des lettres et des espaces
        /*🇬🇧 Validation for firstName,with regex for acceptings just letters and spaces*/
    const NameRegex = /^[A-Za-z]+(?:[- ][A-Za-z]+)*$/;
    if (!firstName) {
      /*🇫🇷 La variable editProfile.errMess.t2022_ErrFirstName dans fr.json permet d'afficher "Prénom manquant"*/
      /*🇬🇧 The en.json variable editProfile.errMess.t2022_ErrFirstName displays "Missing first name"*/
      setErrorMsgFirstName(editProfile.errMess.t2022_ErrFirstName);
      setIsFormValid(false);
    } else if (!NameRegex.test(firstName)) {
      /*🇫🇷 La variable editProfile.errMess.t2022_ErrFirstName dans fr.json permet d'afficher "Prénom ne peut pas contenir de caratère spéciaux ou des chiffres"*/
      /*🇬🇧 The en.json variable editProfile.errMess.t2022_ErrFirstName displays "First name can't contain numbers or special characters"*/
      setErrorMsgFirstName(editProfile.errMess.t2022_ErrNameAnomaly);
      setIsFormValid(false);
    } else {
      setErrorMsgFirstName("");
    }

    /*🇫🇷 Validation pour nickName, s'il existe dans la BD , le formulaire n'est pas valide
     /*🇬🇧 Validation for nickName, if it exists in the DB, the form is invalid */

    const NickNameRegex = /^[^(){}\[\]=]+$/;
    if (!nickName) {
      /*🇫🇷 La variable editProfile.errMess.t2022_ErrNickname dans fr.json permet d'afficher "Surnom manquant"*/
      /*🇬🇧 The en.json variable editProfile.errMess.t2022_ErrNickname displays "Missing nickname"*/
      setErrorMsgNickName(editProfile.errMess.t2022_ErrNickname);
      setIsFormValid(false);
    } else if (nickName.length > 15) {
      /*🇫🇷 La variable editProfile.errMess.t2022_ErrNickAnomaly dans fr.json permet d'afficher "Surnom max 15 lettres"*/
      /*🇬🇧 The en.json variable editProfile.errMess.t2022_ErrNickAnomaly displays "Nickname max 15 lettres"*/
      setErrorMsgNickName(editProfile.errMess.t2022_ErrNickAnomaly);
      setIsFormValid(false);
    } else if (nickNameIsValid) {
      /*🇫🇷 La variable editProfile.errMess.t2022_ErrNickAnomaly2 dans fr.json permet d'afficher "Surnom existe déjà"*/
      /*🇬🇧 The en.json variable editProfile.errMess.t2022_ErrNickAnomaly2 displays "Nickname already exist"*/
      setErrorMsgNickName(editProfile.errMess.t2022_ErrNickAnomaly2);
      setIsFormValid(false);
    } else if (!NickNameRegex.test(nickName)) {
      setIsFormValid(false);
      setErrorMsgNickName(editProfile.errMess.t2022_ErrNickAnomaly3);
    } else {
      setErrorMsgNickName("");
    }

    if (!city) {
      setErrorMsgCity(
        /*🇫🇷 La variable editProfile.errMess.t2022_ErrCity dans fr.json permet d'afficher "Ville manquante"*/
        /*🇬🇧 The en.json variable editProfile.errMess.t2022_ErrCity displays "Missing City"*/
        editProfile.errMess.t2022_ErrCity
      );
    }

    /*🇫🇷 Validation pour Nom,avec regex, pour accepter des lettres et des espaces
       /*🇬🇧 Validation for lastName,with regex for acceptings just letters and spaces*/
    const LastNameRegex = /^[A-Za-z]+(?:[- ][A-Za-z]+)*$/;
    if (!lastName) {
      setErrorMsgLastName(editProfile.errMess.t2022_ErrLastName);
      setIsFormValid(false);
    } else if (!LastNameRegex.test(lastName)) {
      setErrorMsgLastName(editProfile.errMess.t2022_ErrLastNameAnomaly);
      setIsFormValid(false);
    } else {
      setErrorMsgLastName("");
    }
    // // if(isDatePassed(user.createdAt) === true && user.avatar === "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" && avatarImage === null){
    // //   setTest(true);
    // //   setMsgErrorProfile(editProfile.errMess.t2022_ErrPhotoProfile);
    // //   setIsFormValid(false);
    // // }
    // else{
    //   console.log("nok");
    //   setMsgErrorProfile("");
    //   setIsFormValid(true);
    // }
    /*🇫🇷 Validation pour numero de telephone,avec regex, pour accepter juste de nombres
        /*🇬🇧 Validation for phoneNumber,with regex for acceptings just numbers*/
    if (phoneNumber && !/^\d+$/.test(phoneNumber)) {
      setErrorMsgPhone(editProfile.errMess.t2022_ErrPhone);
      setIsFormValid(false);
    } else {
      setErrorMsgPhone("");
    }
    /*🇫🇷 Validation pour date d'anniversaire,avec biblioteque moment , pour accepter un format de date valid DD/MM/YYYY
     /*🇬🇧 Validation for birthday date, with moment library, to accept a valid date format DD/MM/YYYY*/
    if (birthdayDate) {
      const isValidDate = moment(birthdayDate, "DD/MM/YYYY", true).isValid();
      if (!isValidDate) {
        setIsFormValid(false);
        setErrorMsgBirthday(editProfile.errMess.t2022_ErrBirth);
      } else {
        const numberValue = moment(birthdayDate, "DD/MM/YYYY").valueOf();
        const timestamp = moment(numberValue);
        const age = moment().diff(timestamp, "years");
        console.log(age);
        setAge(age); // Ajoutez cette ligne pour définir l'âge dans l'état

        if (age < 18) {
          setIsFormValid(false);
          setErrorMsgBirthday(editProfile.errMess.t2022_ErrBirth2);
        } else {
          setIsFormValid(true);
          setErrorMsgBirthday("");
        }
        setBirthdayNumber(numberValue);
      }
    }

    /*🇫🇷 Validation pour email,avec regex, pour accepter un format d'adresse mail
       /*🇬🇧 Validation for email,with regex for acceptings email format valid*/
    if (!email) {
      setEmailError(editProfile.t2022_ErrMail);
      setIsFormValid(false);
    } else if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError(editProfile.errMess.t2022_ErrMail2);
      setIsFormValid(false);
    }
  };

  //////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    HandleValidate();
  }, [
    firstName,
    nickName,
    lastName,
    birthdayDate,
    phoneNumber,
    email,
    avatarImage,
  ]);

  //🇫🇷 requete backend correctement indiqué , mais procesus ne marche pas, possible erreur dans route backend ---> MANQUE une function dans backend pour accepter le formData
  //🇬🇧 query backend is correct but proces not working , possible route error in backend
  //const sendInfoEditProfile = async () => {
  // const formData = new FormData();
  // formData.append("image", avatarImage);
  // formData.append("isPersonalAccount",accountType );
  // formData.append("firstName", firstName);
  // formData.append("lastName", lastName);
  // formData.append("userName", nickName);
  // formData.append("city", city);
  // formData.append("nativeLanguage", language);
  {
    /*🇫🇷 Requête d'edition  profil*/
  }
  {
    /*🇬🇧 Sending profile edition request*/
  }
  // const response = await axios.put(
  //   `${hostname}/api/v1/user/info/${profilData._id}`,
  //   ProfileBody,
  //   {
  //     headers: {
  //       "Authorization": "Bearer"+ token,
  //       "Content-Type": "multipart/form-data",
  //     },
  //   }
  // );
  // console.log("data", data);
  //
  // manque une function pour mettre à jour les donnéss dans le storage
  //
  // await AsyncStorage.setItem("Profile", userData);
  // await AsyncStorage.setItem("user", userData);
  //setProfile("done");
  // } catch (error) {
  //  console.log("CATCH: ",error);
  // }
  // };
  const UpdateData = async () => {
    try {
      let res = JSON.parse(await AsyncStorage.getItem("user"));
      setProfilData(res);
      console.log(res);
      const response = await axios.get(
        `${hostname}/api/v1/user/getuserinfo/${res._id}`
      );
      console.log(response.data.user);
      const resultat = JSON.stringify(response.data.user);
      console.log(resultat);
      await AsyncStorage.setItem("Profile", resultat);
      await AsyncStorage.setItem("user", resultat);

      // 🇫🇷 Mettre à jour l'état avec les informations les plus récentes
      // 🇬🇧 Update the state with the latest information
      setProfilData(response.data.user);
    } catch (error) {
      console.error(error);
    }
  };

  /*🇫🇷 Ci-dessous, function pour mettre à jours les données dans la BD*/
  /*🇬🇧 Function for update BD */
  const sendInfoEditProfile = async () => {
    console.log("is FORM VALID", isFormValid);
    let res = JSON.parse(await AsyncStorage.getItem("user"));
    let image;
    if (avatarImage === null) {
      //🇫🇷 Si l'utilisateur n'a pas choisi une image, on envoie l'image qui est dans la BD
      console.log(res.avatar);
      image = res.avatar;
    }
    if (isFormValid) {
      //🇫🇷 Si le formulaire est valide, on envoie les données à la BD
      const editProfilBody = {
        avatar: avatarImage === null ? image : avatarImage,
        image: [avatarImage],
        isPersonalAccount: leftActive === false ? false : true,
        firstName: firstName,
        userName: nickName,
        city: city,
        nativeLanguage: language, // bug envoi de json à la basse de données , il faut envoyer string de nom language
        lastName: lastName,
        phone: phoneNumber,
        birthday: birthdayNumber,
        about: about,
        hobbies: topics,
        spokenLanguage: languagesSpoken,
        children: children,
        age: age,
        tobacco: tobacco,
        alcohol: alcohol,
      };

      console.log("ID utilisateur", profilData._id);

      console.log("TOKEN", token);
      //id pour test: 64394c41879131c2c43375e0
      // token pour test: vyGhGEE6JA6ERnhHOid1eaEphgdb3YCN
      console.log(editProfilBody);
      try {
        const requestOptions = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editProfilBody),
        };
        const response = await fetch(
          `${hostname}/api/v1/user/info/${profilData._id}`,
          requestOptions
        );
        const data = await response.json();
        console.log("data", data);
        //🇫🇷 reemplacement de données sur user , et apres sur le JSON user et Profile  dans le storage
        //🇬🇧 replacement of data on user , and after on the JSON user and Profile in the storage
        Object.assign(user, editProfilBody);
        setUser(user);
        //await AsyncStorage.setItem("Profile", JSON.stringify(user));
        //await AsyncStorage.setItem("user", JSON.stringify(user));
        UpdateData();
        if (test === true) {
          navigation.replace("Profile", {
            user: user,
          }); /*🇫🇷 navegation vers Profile */ /*🇬🇧 navigation to Profile*/
        } else {
          navigation.navigate("Profile", { user: user });
        }
      } catch (error) {
        console.log("CATCH :", error);
      }
    }
  };

  //🇫🇷 style de button pour enregistrer données dans la BD, si données ne sont pas bonnes, le button est desactivé
  //🇬🇧 style for button register in BD , if data is not good, button is off
  const bigBtn1 = StyleSheet.create({
    button: {
      backgroundColor: isFormValid ? "#59c09b" : "grey",
      height: 50,
      width: "40%",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
      marginHorizontal: 10,
    },
  });

  if (isLoading) return;

  if (step === 1) {
    return (
      <ScrollView style={styles.container}>
        {/* ----------------Titles---------------- */}
        <View style={styles.center}>
          <View style={styles.firstRow}>
            {/*🇫🇷 Les informations proviens de  profilData.avatar, qui est enregistré dans le store dans user , cet store est enregistré quand on fait log-in dans la aplication  , a voir plus dans le fichier passwordscreen.js*/}
            {/*🇬🇧 The information comes from profilData.avatar, which is registered in the user store, the store is registered when you log-in in the application, see more in the passwordscreen.js file"*/}
            <ProfilePictureEdit
              avatarImage={avatarImage}
              setAvatarImage={setAvatarImage}
              profileImage={profileImage}
              setProfileImage={setProfileImage}
              scr={scr}
            />
          </View>
          {console.log(avatarImage)}
          {msgErrorProfile !== "" ? (
            <View style={styles.errorCard}>
              <Text style={styles.error}>{msgErrorProfile}</Text>
            </View>
          ) : (
            <Text></Text>
          )}

          <View style={styles.proOrPerso}>
            {/*🇫🇷 La variable editProfile.step1.personal dans fr.json permet d'afficher "Compte personnel"*/}
            {/*🇬🇧 The en.json variable editProfile.step1.personal displays "Personal account"*/}

            {/*🇫🇷 La variable editProfile.step1.pro dans fr.json permet d'afficher "Compte Pro"*/}
            {/*🇬🇧 The en.json variable editProfile.step1.pro displays "Pro account"*/}
            <TwinSelectButton
              firstTitle={editProfile.step1.personal} // Personal Account
              secondTitle={editProfile.step1.pro} // Pro Account
              profileState={profileState}
              setIsSelect={setSelected}
              active={leftActive}
              setActive={setLeftActive}
              secondActive={rightActive}
              setSecondActive={setRightActive}
              scr={scr}
            />
          </View>
          {/* ----------------Fields---------------- */}
          <View style={styles.titleFields}>
            <Text style={styles.titleFields_text}>
              {editProfile.step1.firstName}
            </Text>
          </View>
          <View style={styles.fields}>
            <Fields
              icon={"textFrame"}
              pressed={pressed}
              state={firstName}
              text={editProfile.step1.firstName}
              setState={setFirstName}
            />
            {/*🇫🇷 La variable editProfile.step1.firstName dans fr.json permet d'afficher "Prénom""*/}
            {/*🇬🇧 The en.json variable editProfile.step1.firstName displays "First name""*/}
          </View>
          {errorMsgFirstName && !firstName ? (
            <Text style={{ color: "red", marginBottom: 10 }}>
              {errorMsgFirstName}
            </Text>
          ) : (
            errorMsgFirstName && (
              <Text style={{ color: "red" }}>{errorMsgFirstName}</Text>
            )
          )}
          <View style={styles.titleFields}>
            <Text style={styles.titleFields_text}>
              {editProfile.step1.nickname}
            </Text>
          </View>
          <View style={styles.fields}>
            {/*🇫🇷 La variable editProfile.step1.nickname dans fr.json permet d'afficher "Pseudo ou nom d'utilisateur"*/}
            {/*🇬🇧 The en.json variable editProfile.step1.nickname displays "Nickname, brand or user name""*/}
            <Fields
              icon={"textFrame"}
              pressed={pressed}
              state={nickName}
              text={editProfile.step1.nickname}
              setState={setNickName}
            />
          </View>
          {errorMsgNickName && !nickName ? (
            <Text style={{ color: "red", marginBottom: 10 }}>
              {errorMsgNickName}
            </Text>
          ) : (
            errorMsgNickName && (
              <Text style={{ color: "red" }}>{errorMsgNickName}</Text>
            )
          )}
          <View style={styles.titleFields}>
            <Text style={styles.titleFields_text}>
              {editProfile.step1.title_city}
            </Text>
          </View>
          <View style={styles.fields}>
            {/*🇫🇷 La variable editProfile.step1.city dans fr.json permet d'afficher "Ville"*/}
            {/*🇬🇧 The en.json variable editProfile.step1.city displays "City"*/}
            <CityField
              icon={"textFrame"}
              text={city ?? editProfile.step1.city}
              state={city}
              setState={setCity}
            />
          </View>
          {errorMsgCity && !city ? (
            <Text style={{ color: "red" }}>{errorMsgCity}</Text>
          ) : null}
          <View style={styles.titleFields}>
            {/*🇫🇷 La variable editProfile.step1.title_language dans fr.json permet d'afficher "visible sur ton profil"*/}
            {/*🇬🇧 The en.json variable editProfile.step1.title_language displays "visibile in your profile*/}
            <Text style={styles.titleFields_text}>
              {editProfile.step1.title_language}
            </Text>
          </View>
          <View style={styles.fields}>
            {/*🇫🇷 Composant CountryListDropdown , qui reçoit/enregistre la langue native enregistré pour l'utilisateur dans la BD*/}
            {/*🇬🇧 CountryListDropdown component, which receives/saves the native language registered for the user in the DB*/}
            {
              <CountryListDropdown
                placeholder={editProfile.step1.nativeLanguage}
                setSelected={setSelected}
                data={countriesList}
                language={language}
                setLanguage={setLanguage}
              />
            }
          </View>
          {/*🇫🇷 La variable editProfile.step1.app_Language dans fr.json permet d'afficher "langue d'affichage de l'aplication"*/}
          {/*🇬🇧 The en.json variable editProfile.step1.app_nativeLanguage displays "App language"*/}
          <View style={styles.titleFields}>
            <Text style={styles.titleFields_text}>
              {editProfile.step1.app_language}
            </Text>
          </View>
          <View style={styles.fields}>
            {/*🇫🇷 Composant CountryListDropdown (avant SelectLanguage) , qui reçoit/enregistre la langue d'affichage de l'aplication dans le storage*/}
            {/*🇬🇧 CountryListDropdown (before SelectLanguage) component, which receives/stores the display language of the application in storage*/}
            {
              <CountryListDropdown
                placeholder={editProfile.step1.app_display}
                pressed={pressed}
                setSelected={setSelected}
                data={countriesList}
                language={appLanguage}
                setLanguage={setAppLanguage} // function pour gerer le changement de la langue
                flags={flags}
              />
            }
          </View>
        </View>

        {/* ----------------ValidationButtons---------------- */}
        <View style={styles.testEcarteur}></View>
        <View style={styles.savOrConButtons}>
          <TouchableOpacity
            style={bigBtn1.button}
            onPress={() => sendInfoEditProfile()}>
            <Text style={styles.btnText}>
              {/*🇫🇷 La variable editProfile.step2.save dans fr.json permet d'afficher "Enregistrer"*/}
              {/*🇬🇧 The en.json variable editProfile.step2.save displays "Save"*/}
              {editProfile.step2.save}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bigBtn}
            onPress={() => setStep(step + 1)}>
            <Text style={styles.btnText}>
              {/*🇫🇷 La variable editProfile.step2.continue dans fr.json permet d'afficher "Continuer"*/}
              {/*🇬🇧 The en.json variable editProfile.step2.continue displays "Continue"*/}
              {editProfile.step2.continue}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
  if (step === 2) {
    return (
      <ScrollView style={styles.container}>
        {/* ----------------Titles---------------- */}
        <View style={styles.center}>
          <Text style={styles.title}>
            {/*🇫🇷 La variable editProfile.step2.secret dans fr.json permet d'afficher "Informations SECRÈTES"*/}
            {/*🇬🇧 The en.json variable editProfile.step2.secret displays "SECRET"*/}
            {editProfile.step2.secret}
          </Text>
          <Text style={styles.subTitle}>
            {/*🇫🇷 La variable editProfile.step2.info dans fr.json permet d'afficher "Information"*/}
            {/*🇬🇧 The en.json variable editProfile.step2.info displays "Information"*/}
            {editProfile.step2.info}
          </Text>
          <Text style={styles.important}>
            {/*🇫🇷 La variable editProfile.step2.warning dans fr.json permet d'afficher "Pour pouvoir ajouter des amis, créer des évènements et envoyer des messages privés, tu dois fournir les informations ci-dessous"*/}
            {/*🇬🇧 The en.json variable editProfile.step2.warning displays "To add friends, create events and send private messages we need some information"*/}
            {editProfile.step2.warning}
          </Text>
          {/* "warning": "In order to add friends, create events and send private message you need to let informations here" */}
        </View>
        <View style={styles.membership}>
          <Text style={styles.bold}>
            {/*🇫🇷 La variable editProfile.step2.membership dans fr.json permet d'afficher "Ton numéro d'utilisateur est :"*/}
            {/*🇬🇧 The en.json variable editProfile.step2.membership displays "Membership number:"*/}
            {editProfile.step2.membership}
          </Text>
          {/* "membership": "Your membership number is:" */}
          <Text style={styles.membershipNumber}>{memberId}</Text>
        </View>
        {/* ----------------Fields---------------- */}

        <View style={styles.center}>
          <View style={styles.titleFields}>
            <Text style={styles.titleFields_text}>
              {editProfile.step2.title_lastname}
            </Text>
          </View>
          <View style={styles.fields}>
            {/*Voir si on peut pas enlever cette partie #noworries*/}
            {/*🇫🇷 Aucun de ces champs n'est fonctionnel pour l'instant (tél, date de naissance, email)*/}
            {/*🇬🇧 None of these fields work right now. (phone, birthday, email) */}
            {/*🇫🇷 La variable editProfile.step2.lastName dans fr.json permet d'afficher "Nom de famille"*/}
            {/*🇬🇧 The en.json variable editProfile.step2.lastName displays "Last name"*/}
            <Fields
              icon={"textFrame"}
              pressed={pressed}
              text={`${editProfile.step2.lastName}`}
              state={lastName}
              setState={setLastName}
            />
          </View>
          {errorMsgLastName && !lastName ? (
            <Text style={{ color: "red" }}>{errorMsgLastName}</Text>
          ) : (
            <Text style={{ color: "red" }}>{errorMsgLastName}</Text>
          )}
          <View style={styles.titleFields}>
            <Text style={styles.titleFields_text}>
              {editProfile.step2.title_phone}
            </Text>
          </View>
          <View style={styles.fields}>
            {/*🇫🇷 La variable editProfile.step2.phone dans fr.json permet d'afficher "Numéro de téléphone"*/}
            {/*🇬🇧 The en.json variable editProfile.step2.phone displays "Phone number"*/}

            <Fields
              icon={"telephone"}
              text={editProfile.step2.phone}
              state={phoneNumber}
              setState={setPhoneNumber}
            />
            {/* "phone": "Phone Number" */}
          </View>
          {errorMsgPhone && phoneNumber ? (
            <Text style={{ color: "red" }}>{errorMsgPhone}</Text>
          ) : null}
          <View style={styles.titleFields}>
            <Text style={styles.titleFields_text}>
              {editProfile.step2.title_birthday}
            </Text>
          </View>
          <View style={styles.fields}>
            {/*🇫🇷 La variable editProfile.step2.birthday dans fr.json permet d'afficher "Anniversaire"*/}
            {/*🇬🇧 The en.json variable editProfile.step2.birthday displays "Birthday"*/}

            <Fields
              icon={"birthday"}
              text={editProfile.step2.birthday}
              state={birthdayDate}
              setState={setBirthdayDate}
            />
          </View>
          {errorMsgBirthday ? (
            <Text style={{ color: "red" }}>{errorMsgBirthday}</Text>
          ) : null}
          <View style={styles.titleFields}>
            <Text style={styles.titleFields_text}>
              {editProfile.step2.title_mail}
            </Text>
          </View>
          <View style={styles.fields}>
            {/*🇫🇷 La variable editProfile.step2.email dans fr.json permet d'afficher "Email"*/}
            {/*🇬🇧 The en.json variable editProfile.step2.email displays "Email"*/}

            <Fields
              icon={"arobase"}
              pressed={pressed}
              text={editProfile.step2.email}
              state={email}
              setState={setEmail}
              disable={true}
            />
          </View>
        </View>
        {emailError && !email ? (
          <Text style={{ color: "red" }}>{emailError}</Text>
        ) : (
          <Text style={{ color: "red" }}>{emailError}</Text>
        )}
        <View style={styles.titleFields}></View>
        {/* ----------------FriendsInfo---------------- */}
        {/*Ajout des icons svg que l'on va prendre integer entant que chlidren dans le components EditSquare*/}
        <View style={styles.friendsNote}>
          {/*🇫🇷 La variable editProfile.step2.message_chat dans fr.json permet d'afficher "L'application n'est pas encore terminée mais vous pourrez bientôt avoir un chat privé avec vos vrais amis..."*/}
          {/*🇬🇧 The en.json variable editProfile.step2.message_chat displays "The app is not finished yet but soon you will be able to get private chat with your true friends ..."*/}
          <Text style={styles.bold}>{editProfile.step2.message_chat}</Text>
          <Text style={styles.bold}>
            {/*🇫🇷 La variable editProfile.step2.label dans fr.json permet d'afficher "On pourra te rajouter en tant qu'ami pour t'envoyer des messages privés si l'on connaît ton :"*/}
            {/*🇬🇧 The en.json variable editProfile.step2.label displays "People will be able to add you as a friend and send you private messages if they know your :"*/}

            {editProfile.step2.label}
          </Text>
          {/* "label": "People are able to add you as friend in order to send you private message if they know your :" */}
        </View>
        <View style={styles.friendInfo}>
          <View style={styles.wrapped}>
            <EditBigSquare text={editProfile.step2.private} title={"Email"}>
              <Image style={{ width: 24, height: 24 }} source={EmailIcon} />
            </EditBigSquare>
          </View>
          <View style={styles.wrapped}>
            {/*🇫🇷 Icon et titre iconde grand button carré pour habiliter affichage d'information*/}
            {/*🇬🇧 Icon and title of big square button for make public information*/}
            <EditBigSquare
              style={styles.wrapped}
              title={editProfile.step2.phone}
              text={editProfile.step2.private}>
              <Image style={{ width: 24, height: 25 }} source={PhoneIcon} />
            </EditBigSquare>
          </View>
          <View style={styles.wrapped}>
            <EditBigSquare
              style={styles.wrapped}
              title={editProfile.step2.lastName}
              text={editProfile.step2.private}>
              <Image style={{ width: 28, height: 28 }} source={LastNameIcon} />
            </EditBigSquare>
          </View>
          <View style={styles.wrapped}>
            <EditBigSquare
              style={styles.wrapped}
              title={editProfile.step2.birthday}
              text={editProfile.step2.private}>
              <Image style={{ width: 28, height: 28 }} source={BirthdayIcon} />
            </EditBigSquare>
          </View>
          <View style={styles.wrapped}>
            <EditBigSquare
              style={styles.wrapped}
              title={editProfile.step2.number}
              text={editProfile.step2.private}>
              <Image
                style={{ width: 48, height: 49 }}
                source={MemberNumberIcon}
              />
            </EditBigSquare>
          </View>
        </View>
        {/* ----------------ValidationButtons---------------- */}
        {/*modif pour le saveButton*/}
        <View style={styles.savOrConButtons}>
          <TouchableOpacity
            style={bigBtn1.button}
            onPress={() => sendInfoEditProfile()}>
            <Text style={styles.btnText}>
              {/*🇫🇷 La variable editProfile.step2.save dans fr.json permet d'afficher "Enregistrer"*/}
              {/*🇬🇧 The en.json variable editProfile.step2.save displays "Save"*/}
              {editProfile.step2.save}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bigBtn}
            onPress={() => setStep(step + 1)}>
            <Text style={styles.btnText}>
              {/*🇫🇷 La variable editProfile.step2.continue dans fr.json permet d'afficher "Continuer"*/}
              {/*🇬🇧 The en.json variable editProfile.step2.continue displays "Continue"*/}
              {editProfile.step2.continue}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
  if (step === 3) {
    ///////////////////////////public informations /////////////////////////////
    return (
      <ScrollView>
        <View id="container 3 " style={{ flex: 1, backgroundColor: "white" }}>
          {/* ----------------Titles---------------- */}
          <View
            id="title-1"
            style={ styles.titleOne }>
            <Text style={styles.title}>
              {/*🇫🇷 La variable editProfile.step3.public dans fr.json permet d'afficher "Informations Publiques"*/}
              {/*🇬🇧 The en.json variable editProfile.step3.public displays "Public informations"*/}
              {editProfile.step3.public_informations}
            </Text>
            {/* <Text style={styles.subTitle}>*/}
            {/*🇫🇷 La variable editProfile.step3.info dans fr.json permet d'afficher "Information"*/}
            {/*🇬🇧 The en.json variable editProfile.step3.info displays "INFORMATION"*/}
            {/* {editProfile.step3.info} */}
            {/* </View> */}
          </View>
          <View
            id="title-2 about you"
            style={ styles.titleTwo }>
            <Text style={[styles.bold, { fontSize: 16 }]}>
              {/*🇫🇷 La variable editProfile.step3.more dans fr.json permet d'afficher "Un petit message pour te présenter :*/}
              {/*🇬🇧 The en.json variable editProfile.step3.more displays "More about you"*/}
              {editProfile.step3.more}
            </Text>
            {/* "more": "More about you" */}
          </View>
          {/* ----------------Fields---------------- */}
          <View id="view white square" style={{ backgroundColor: "white" }}>
            <View style={{ marginHorizontal: "2%" }}>
              {/*🇫🇷 La variable editProfile.step3.about dans fr.json permet d'afficher "Ma présentation"*/}
              {/*🇬🇧 The en.json variable editProfile.step3.about displays "About you"*/}
              {/*🇫🇷 Le setter pour ce champ n'est pas défini.*/}
              {/*🇬🇧 The setter for this field is undefined*/}
              <MultilineFields
                lines={10}
                title={editProfile.step3.about}
                state={about}
                setState={setAbout}
              />
            </View>
          </View>
          {/* ----------------Selects---------------- */}
          <View
            style={ styles.selectsContainer }>
            <Text style={[styles.bold, { fontSize: 16 }]}>
              {/*🇫🇷 La variable editProfile.step3.what dans fr.json permet d'afficher "Mes activités préférées :"*/}
              {/*🇬🇧 The en.json variable editProfile.step3.what displays "What I love to do:"*/}
              {editProfile.step3.what}
            </Text>
            {/*🇫🇷 Composant pour choisir ses activités preferées.*/}
            {/*🇬🇧 Component for select favorite activities*/}
            <ActivityTypesGrid_SeveralTopics
              selections={topics}
              setSelections={setTopics}
            />
          </View>
          <View id="selection language" style={{ backgroundColor: "white" }}>
            <View style={ styles.selectLanguageContainer }>
              <Text style={[styles.bold, { fontSize: 16 }]}>
                {/*🇫🇷 La variable editProfile.step3.spoken dans fr.json permet d'afficher "Langues parlées:"*/}
                {/*🇬🇧 The en.json variable editProfile.step3.spoken displays "Spoken languages:"*/}
                {editProfile.step3.spoken}
              </Text>
              {/*🇫🇷 Composant pour choisir les langues parlés*/}
              {/*🇬🇧 Component for select spoken languages*/}
              <CountriesGrid_SeveralFlags
                selections={languagesSpoken}
                setSelections={setLanguagesSpoken}
              />
            </View>
          </View>

          <View id="Container Age">
            <View
              id="View title age"
              style={ styles.titleAgeContainer}>
              <Text style={[styles.bold, { fontSize: 16 }]}>
                {/* <Text id="title Age" style={styles.bold}> */}
                {/*🇫🇷 La variable editProfile.step3.age dans fr.json permet d'afficher "Age"*/}
                {/*🇬🇧 The en.json variable editProfile.step3.age displays "Age"*/}
                {editProfile.step3.age}
              </Text>
            </View>
            <View style={[styles.checkBoxContainer, { flexDirection: "row" }]}>
              {/*🇫🇷 On peut selectioner juste un button, information dans useState age*/}
              {/*🇬🇧 we can choose just one button, information in useState age*/}
              <View style={[styles.checkContainer_sub, { marginRight: 10 }]}>
                <OptionButtonProfile
                  title={editProfile.step3.secret}
                  buttonSelected={titleAge}
                  setButtonSelected={setTitleAge}
                  index={age}
                  setIndex={setAge}
                  scr={scr}
                />
              </View>
              <View style={[styles.checkContainer_sub, { marginLeft: 10 }]}>
                <OptionButtonProfile
                  title={editProfile.step3.show}
                  buttonSelected={titleAge}
                  setButtonSelected={setTitleAge}
                  index={age}
                  setIndex={setAge}
                  scr={scr}
                />
              </View>
            </View>
          </View>

          <View id="Container Chilren" style={{ backgroundColor: "white" }}>
            <View
              id="View title children"
              style={ styles.childrenContainer }>
              <Text style={[styles.bold, { fontSize: 16 }]}>
                {/*🇫🇷 La variable editProfile.step3.children dans fr.json permet d'afficher "Enfants"*/}
                {/*🇬🇧 The en.json variable editProfile.step3.children displays "Children"*/}
                {editProfile.step3.children}
              </Text>
            </View>
            <View
              style={[
                styles.checkBoxContainer,
                { justifyContent: "space-between" },
              ]}>
              {/*🇫🇷 On peut selectioner just un button, information dans useState children*/}
              {/*🇬🇧 we can choose just one button, information in useState children*/}
              <View style={styles.checkContainer_sub}>
                <OptionButtonProfile
                  title={editProfile.step3.secret}
                  buttonSelected={titleChildren}
                  setButtonSelected={setTitleChildren}
                  index={children}
                  setIndex={setChildren}
                  scr={scr}
                />
              </View>
              <View style={styles.checkContainer_sub}>
                <OptionButtonProfile
                  title={editProfile.step3.yes}
                  buttonSelected={titleChildren}
                  setButtonSelected={setTitleChildren}
                  index={children}
                  setIndex={setChildren}
                  scr={scr}
                />
              </View>
              <View style={styles.checkContainer_sub}>
                <OptionButtonProfile
                  title={editProfile.step3.no}
                  buttonSelected={titleChildren}
                  setButtonSelected={setTitleChildren}
                  index={children}
                  setIndex={setChildren}
                  scr={scr}
                />
              </View>
            </View>
          </View>
          <View id="Container Tobacco ">
            <View
              id="View title Tobacco"
              style={ styles.tobaccoContainer }>
              <Text id="title Tobacco" style={styles.bold}>
                {/*🇫🇷 La variable editProfile.step3.tobacco dans fr.json permet d'afficher "Tabac"*/}
                {/*🇬🇧 The en.json variable editProfile.step3.tobacco displays "Tobacco"*/}
                {editProfile.step3.tobacco}
              </Text>
            </View>
            <View
              style={[
                styles.checkBoxContainer,
                { justifyContent: "space-between" },
              ]}>
              {/*🇫🇷 On peut selectioner just un button, information dans useState tobacco*/}
              {/*🇬🇧 we can choose just one button, information in useState tobacco*/}
              <View style={styles.checkContainer_sub}>
                <OptionButtonProfile
                  title={editProfile.step3.secret}
                  buttonSelected={titleTobacco}
                  setButtonSelected={setTitleTobacco}
                  index={tobacco}
                  setIndex={setTobacco}
                  scr={scr}
                />
              </View>
              <View style={styles.checkContainer_sub}>
                <OptionButtonProfile
                  title={editProfile.step3.sometimes}
                  buttonSelected={titleTobacco}
                  setButtonSelected={setTitleTobacco}
                  index={tobacco}
                  setIndex={setTobacco}
                  scr={scr}
                />
              </View>
              <View style={styles.checkContainer_sub}>
                <OptionButtonProfile
                  title={editProfile.step3.no}
                  buttonSelected={titleTobacco}
                  setButtonSelected={setTitleTobacco}
                  index={tobacco}
                  setIndex={setTobacco}
                  scr={scr}
                />
              </View>
            </View>
          </View>
          <View id="Container Alcohol">
            <View
              style={ styles.alcoholContainer }>
              <Text style={styles.bold}>
                {/*🇫🇷 La variable editProfile.step3.alcohol dans fr.json permet d'afficher "Alcool"*/}
                {/*🇬🇧 The en.json variable editProfile.step3.alcohol displays "Alcohol"*/}
                {editProfile.step3.alcohol}
              </Text>
            </View>
            <View
              style={[
                styles.checkBoxContainer,
                { justifyContent: "space-between" },
              ]}>
              {/*🇫🇷 On peut selectioner just un button, information dans useState Alcool*/}
              {/*🇬🇧 we can choose just one button, information in useState Alcohol*/}
              <View style={styles.checkContainer_sub}>
                <OptionButtonProfile
                  title={editProfile.step3.secret}
                  buttonSelected={titleAlcohol}
                  setButtonSelected={setTitleAlcohol}
                  index={alcohol}
                  setIndex={setAlcohol}
                  scr={scr}
                />
              </View>
              <View style={styles.checkContainer_sub}>
                <OptionButtonProfile
                  title={editProfile.step3.sometimes}
                  buttonSelected={titleAlcohol}
                  setButtonSelected={setTitleAlcohol}
                  index={alcohol}
                  setIndex={setAlcohol}
                  scr={scr}
                />
              </View>
              <View style={styles.checkContainer_sub}>
                <OptionButtonProfile
                  title={editProfile.step3.no}
                  buttonSelected={titleAlcohol}
                  setButtonSelected={setTitleAlcohol}
                  index={alcohol}
                  setIndex={setAlcohol}
                  scr={scr}
                />
              </View>
            </View>
          </View>
          {/* ----------------ValidationButtons---------------- */}
          <View id="View submit button" style={styles.Valide}>
            <TouchableOpacity
              style={bigBtn1.button}
              onPress={() => sendInfoEditProfile()}>
              <Text style={styles.btnText}>
                {/*🇫🇷 La variable editProfile.step3.submit dans fr.json permet d'afficher "Sauvegarder"*/}
                {/*🇬🇧 The en.json variable editProfile.step3.submit displays "Submit"*/}
                {editProfile.step3.submit}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
};

export default EditProfileScreen;


