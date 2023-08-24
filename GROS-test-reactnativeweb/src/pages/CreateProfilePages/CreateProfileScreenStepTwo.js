//🇫🇷 Page 2 création de profil (Figma Frame 10)
//🇬🇧 Create Profile Page 2 (Figma Frame 10)
import axios from "axios";
import { useState, useEffect } from "react";
import { ScrollView, View, Text } from "react-native";
import styles from "../Styles/CreateProfileScreenStepTwoCss";
import AsyncStorage from "@react-native-async-storage/async-storage";
//Composants
import Fields from "../../components/Fields";
import LogButton from "../../components/LogButtons";
import { hostname } from "../../../../mvp-reactnative/backendconnect/hostname.js";
import Json from "../../assets/json/en.json";
import EditProfileScreen from "./EditProfileScreen";

const CreateProfileScreenStepTwo = ({
  profileState,
  navigation,
  scr,
  userToken,
  user,
  setUser,
}) => {
  const [pressed, setPressed] = useState(false);
  const [profilData, setProfilData] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setisLoading] = useState(true); //🇫🇷 Permet de verifier si les données sont chargées
  const [texteHorder, setTexteHorder] = useState("");
  const [errorMessageFirstName, setErrorMessageFirstName] = useState("");
  const [errorMessageLastName, setErrorMessageLastName] = useState("");
  //Variable json de en.json permettant la traduction dans des différentes langues
  const { createProfile } = scr;
  const {
    setFirstName,
    setLastName,
    firstName,
    lastName,
    accountType,
    setNickName,
    nickName,
  } = profileState;
  console.log(accountType); //🇫🇷 Affiche le type de compte

  //🇫🇷 Fonction pour définir le texte initial en fonction du type de compte
  //🇬🇧 Function to set the initial text based on the account type
  const WriteText = () => {
    if (accountType === createProfile.perso) {
      setTexteHorder(createProfile.firstName);
    } else {
      setTexteHorder(createProfile.BrandName);
    }
  };
  //(fr) Permet de récuperer l'utilisateur que nous avons crée lors de la première etapes de la création du profil
  //(GB) Allows to retrieve the user that we created during the first steps of the profile creation
  useEffect(() => {
    UpdateData();
  }, []);
  const UpdateData = async () => {
    //🇫🇷 Récupération des données utilisateur dans le storage
    try {
      let res = JSON.parse(await AsyncStorage.getItem("id"));
      setProfilData(res);
      console.log(res);

      //🇫🇷 Récupère les informations de l'utilisateur sur le serveur
      //🇬🇧 Fetch the user info from the server
      const response = await axios.get(
        `${hostname}/api/v1/user/getuserinfo/${res._id}`
      );
      console.log(response.data.user); //🇫🇷 Convertit les informations utilisateur en chaîne et les stocke dans AsyncStorage

      //🇫🇷 Convertit les informations utilisateur en chaîne et les stocke dans AsyncStorage
      //🇬🇧 Convert the user info to a string and store it in AsyncStorage
      const resultat = JSON.stringify(response.data.user);
      console.log(resultat);
      await AsyncStorage.setItem("Profile", resultat); //🇫🇷 Convertit les informations utilisateur en chaîne et les stocke dans AsyncStorage
      await AsyncStorage.setItem("user", resultat);
    } catch (error) {
      console.error(error);
    }
  };
  const [skip, setSkip] = useState(0);
  const limit = 1;
  //🇫🇷 Appelez la fonction WriteText une fois lorsque le composant est monté
  //🇬🇧 Call WriteText function once when the component mounts
  useEffect(() => {
    WriteText();
  }, []);
  //(fr) Fonction permettant de verifier et de creer un nouveau nom d'utilisateur
  //(gb) Function who permit to verify and create a new userName
const VerifyUserName = async () => {
  const response = await axios.get(
    `${hostname}/api/v1/user/getuserlist?limit=${limit}&skip=${skip}`
  );
  var c = 0;
  var v = 0;

  // Récupère une liste de tous les noms d'utilisateur pour une comparaison plus rapide
  var existingUserNames = response.data.map(user => user.userName);

  for (var i = 0; i < response.data.length; i++) {
    if (profileState.firstName.length < 15) {
      var userNom =
        profileState.firstName +"."+
        profileState.lastName.charAt(0).toUpperCase() +
        v;

      if (
        profileState.firstName === response.data[i].userName ||
        existingUserNames.includes(userNom)
      ) {
        c++;
        // Essaye chaque nombre de 1 à 99 jusqu'à ce qu'il trouve un pseudonyme disponible
        for (let j = 1; j <= 99; j++) {
          let potentialNickName = profileState.firstName +"."+
            profileState.lastName.charAt(0).toUpperCase() +
            j;
          if (!existingUserNames.includes(potentialNickName)) {
            v = j;
            setNickName(potentialNickName);
            break;
          }
        }
      }

      if (v === 0 && i === response.data.length - 1) {
        setNickName(
          profileState.firstName +"."+
          profileState.lastName.charAt(0).toUpperCase()
        );
      }
    } else {
      var userNomSup15 =
        profileState.firstName.substring(0, 11) +
        "." +
        profileState.lastName.charAt(0).toUpperCase() +
        v;

      var userNomSup15v1 =
        profileState.firstName.substring(0, 12) +
        "." +
        profileState.lastName.charAt(0).toUpperCase();

      if (
        userNomSup15v1 === response.data[i].userName ||
        userNomSup15 === response.data[i].userName
      ) {
        c++;
        // Essaye chaque nombre de 1 à 99 jusqu'à ce qu'il trouve un pseudonyme disponible
        for (let j = 1; j <= 99; j++) {
          let potentialNickName = profileState.firstName.substring(0, 13) +
          "." +
          profileState.lastName.charAt(0).toUpperCase() +
          j;
          if (!existingUserNames.includes(potentialNickName)) {
            v = j;
            setNickName(potentialNickName);
            break;
          }
        }
      }

      if (v === 0 && i === response.data.length - 1) {
        setNickName(userNomSup15v1);
      }
    }
  }
  setSkip(skip + limit);
};


  //(fr) Fonction permettant de mettre a jour les donnée (nom, prenom, nom d'utilisateur) dans la base de données
  //(GB) Function who permit to update the data (last name, first name and nickname) in the database
  const sendInfoEditProfile = async () => {
    console.log(nickName);

    //🇫🇷 Crée le corps de la requête avec les informations de profil mises à jour
    //🇬🇧 Create the request body with updated profile information
    const editProfilBody = {
      firstName: firstName,
      lastName: lastName,
      userName: nickName,
    };

    console.log("ID utilisateur", profilData);
    console.log("TOKEN", userToken);
    //id pour test: 64394c41879131c2c43375e0
    // token pour test: vyGhGEE6JA6ERnhHOid1eaEphgdb3YCN
    try {
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(editProfilBody),
      };

      //🇫🇷 Envoi de la demande de mise à jour du profil utilisateur
      //🇬🇧 Send the request to update the user profile
      const response = await fetch(
        `${hostname}/api/v1/user/info/${profilData._id}`,
        requestOptions
      );
      const data = await response.json();
      console.log("data", data);
      //🇫🇷 reemplacement de données sur user , et apres sur le JSON user et Profile  dans le storage
      //🇬🇧 replacement of data on user , and after on the JSON user and Profile in the storage
      Object.assign(user, editProfilBody);
      UpdateData();
      setUser(user);
    } catch (error) {
      console.log("CATCH :", error);
    }
  };
  const obj = {
    width: 318,
    pressed,
    setPressed,
    setErrorMsg,
    navigate: navigation.navigate,
    path: "Step3",
    firstName,
    lastName,
    currentPage: "Step2",
    setError,
  };

  const [btnDisable, setBtnDisable] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("");

  useEffect(() => {
    if (
      profileState.firstName == null || //🇫🇷 Si le nom ou le prénom est vide ou contient moins de 2 caractères, le bouton est désactivé
      profileState.lastName == null || //🇬🇧 If the first name or last name is empty or contains less than 2 characters, the button is disabled
      profileState.firstName.length < 2 || //🇫🇷 Si le nom ou le prénom est vide ou contient moins de 2 caractères, le bouton est désactivé
      profileState.lastName.length < 2 || //🇬🇧 If the first name or last name is empty or contains less than 2 characters, the button is disabled
      !/^[A-Za-z]+(?:[- ][A-Za-z]+)*$/.test(profileState.firstName) || //🇫🇷 Si le nom ou le prénom contient des caractères spéciaux, le bouton est désactivé
      !/^[A-Za-z]+(?:[- ][A-Za-z]+)*$/.test(profileState.lastName) //🇬🇧 If the first name or last name contains special characters, the button is disabled
    ) {
      setBtnDisable(true);
      setBackgroundColor("grey"); //🇫🇷 Si le nom ou le prénom est vide ou contient moins de 2 caractères, le bouton est désactivé
      setErrorMessageFirstName("a");
      setErrorMessageLastName("a");
    } else {
      setErrorMessageFirstName("");
      setErrorMessageLastName("");
      setBtnDisable(false);
      setBackgroundColor("#59c09b");
    }
    if (
      //🇫🇷 Si le nom ou le prénom contient des caractères spéciaux, le bouton est désactivé
      !/^[A-Za-z]+(?:[- ][A-Za-z]+)*$/.test(profileState.firstName)
    ) {
      setErrorMessageFirstName(scr.editProfile.errMess.t2022_ErrNameAnomaly);
      setBtnDisable(true);
      setBackgroundColor("grey");
    } else {
      //🇫🇧 Si le nom ou le prénom contient des caractères spéciaux, le bouton est désactivé
      setErrorMessageFirstName("");
    }
    if (!/^[A-Za-z]+(?:[- ][A-Za-z]+)*$/.test(profileState.lastName)) {
      setErrorMessageLastName(scr.editProfile.errMess.t2022_ErrLastNameAnomaly);
      setBtnDisable(true);
      setBackgroundColor("grey");
    } else {
      setErrorMessageLastName("");
    }
  });
  useEffect(() => {
    //🇫🇷 Vérifie si le prénom et le nom sont définis, puis appelle la fonction VerifyUserName
    if (firstName && lastName) {
      VerifyUserName();
    }
  }, [firstName, lastName]);
  return (
    <ScrollView
      style={styles.profil}
      contentContainerStyle={{ alignItems: "center" }}>
      <Fields
        icon={"textFrame"}
        text={texteHorder}
        state={firstName}
        setState={setFirstName}
      />
      {errorMessageFirstName && (
        <Text style={{ color: "red", marginBottom: 10 }}>
          {errorMessageFirstName}
        </Text>
      )}
      <View style={{ height: 15 }}></View>
      <Fields
        upperText={createProfile.secretField}
        icon={"textFrame"}
        text={createProfile.lastName}
        state={lastName}
        setState={setLastName}
      />
      {errorMessageLastName && (
        <Text style={{ color: "red", marginBottom: 10 }}>
          {errorMessageLastName}
        </Text>
      )}
      <View>
        <Text style={styles.text}>{createProfile.secretName}</Text>
        {/* "secretName": "Your last name is secret, no worries 😉 it will be usefull for additionnal features" */}
      </View>
      <View style={styles.btn}>
        <LogButton
          text={createProfile.button_1}
          {...obj}
          disabled={btnDisable}
          backgroundColor={backgroundColor}
          VerifyUserName={VerifyUserName}
          dataSave={sendInfoEditProfile}
        />
      </View>
    </ScrollView>
  );
};

export default CreateProfileScreenStepTwo;
