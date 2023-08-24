// 🇫🇷Page 3 création de profil (Figma Frame 11)🇫🇷
// 🇬🇧 Create Profile Page 3 (Figma Frame 11) 🇬🇧
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { hostname } from "../../../../mvp-reactnative/backendconnect/hostname.js";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import styles from "../Styles/CreateProfileScreenStepThreeCss";
import Fields, { CityField } from "../../components/Fields.js";
// import SelectLanguage from "../components/SelectLanguage";
import CountryListDropdown from "../../components/CountryListDropdown.js";
import Json from "../../assets/json/en.json";
import { useState, useEffect } from "react";

const CreateProfileScreenStepThree = ({
  profileState,
  navigation,
  scr,
  userToken,
  user,
  setUser,
}) => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [selected, setSelected] = useState(false);
  const [profilData, setProfilData] = useState(null);
  const [pressed, setPressed] = useState(false);
  const [index, setIndex] = useState(null);
  const [flags, setFlags] = useState(null);
  const [enter, setEnter] = useState(false);
  const [enterText, setEnterText] = useState(false);
  const [change, setChange] = useState(false);
  const [errorMessageCity, setErrorMessageCity] = useState("");
  const { createProfile } = scr;
  const { nickName, city, setCity, setNickName, setLanguage, nativeLanguage } =
    profileState;

  const [backgroundColor, setBackgroundColor] = useState("");

  const [btnDisable, setBtnDisable] = useState(false);
  const [messageInfo, setMessageInfo] = useState(
    scr.createProfile.nickNametext
  );
  //🇫🇷 Vérifie si le champ ville est vide ou nul
  //🇬🇧 Check if city field is empty or null
  useEffect(() => {
    if (city == null || city == "") {
      setErrorMessageCity(scr.createProfile.cityMessage); //🇫🇷 Affiche un message d'erreur si le champ est vide
      setBtnDisable(true); //🇬🇧 Display an error message if the field is empty
      setBackgroundColor("grey");
    } else {
      setErrorMessageCity(""); //🇫🇷 Supprime le message d'erreur si le champ est rempli
      setBtnDisable(false);
      setBackgroundColor("#59c09b");
      setMessageInfo(scr.createProfile.nickNametext);
    }
  });
  //(fr) Permet de récuperer l'utilisateur que nous avons crée lors de la première etapes de la création du profil
  //(GB) Allows to retrieve the user that we created during the first steps of the profile creation

  useEffect(() => {
    UpdateData(); //🇫🇷 Met à jour les données
  }, []);
  const UpdateData = async () => {
    try {
      let res = JSON.parse(await AsyncStorage.getItem("id"));
      setProfilData(res); //🇫🇷 Récupération des données utilisateur dans le storage
      console.log(res);
      const response = await axios.get(
        `${hostname}/api/v1/user/getuserinfo/${res._id}`
      );
      console.log(response.data.user);
      const resultat = JSON.stringify(response.data.user);
      console.log(resultat);
      await AsyncStorage.setItem("Profile", resultat);
      await AsyncStorage.setItem("user", resultat);
    } catch (error) {
      console.error(error);
    }
  };
  //(fr) Fonction permettant de mettre a jour les donnée (nom, prenom, nom d'utilisateur) dans la base de données
  //(GB) Function who permit to update the data (last name, first name and nickname) in the database
  const sendInfoEditProfile = async () => {
    const editProfilBody = {
      city: city,
    };

    console.log("ID utilisateur", profilData); //🇫🇷 Affiche l'id de l'utilisateur
    console.log("TOKEN", userToken); //🇫🇷 Affiche le token de l'utilisateur
    //id pour test: 64394c41879131c2c43375e0
    // token pour test: vyGhGEE6JA6ERnhHOid1eaEphgdb3YCN
    try {
      const requestOptions = {
        //🇫🇷 Requête pour mettre a jour les données dans la base de données
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(editProfilBody),
      };
      const response = await fetch(
        `${hostname}/api/v1/user/info/${profilData._id}`, //🇫🇷 Requête pour mettre a jour les données dans la base de données
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
  //(fr) Permet de definir si les changement on bien été éffectué sur la ville
  useEffect(() => {
    if (city) {
      setChange(true); //🇫🇷 Si la ville est rempli alors le changement est éffectué
    } else {
      setChange(false); //🇫🇷 Si la ville n'est pas rempli alors le changement n'est pas éffectué
    }
  });

  //   useEffect(() => {
  //       const fetchFlags = async () => {
  //           const response = await axios.get(`${hostname}/api/assets/langues`)
  //           setFlags(response.data)
  //      }
  //       fetchFlags()
  //       console.log(flags)
  //  }, [])

  const component = (typeOfComponent) => {
    const data = [
      { key: "0", value: "French" },
      { key: "1", value: "English" },
      { key: "2", value: "Spanish" },
      { key: "3", value: "Portugese" },
      { key: "4", value: "German" },
      { key: "5", value: "Italian" },
      { key: "6", value: "Russian" },
      { key: "7", value: "Chinese" },
      { key: "8", value: "Indian" },
      { key: "9", value: "Japanese" },
      { key: "10", value: "Hebrew" },
      { key: "11", value: "Hungarian" },
      { key: "12", value: "Polish" },
      { key: "13", value: "Romanian" },
      { key: "14", value: "Greek" },
      { key: "15", value: "Arabic" },
    ];

    const obj = {
      flags,
      data,
      setErrorMsg,
      navigate: navigation.navigate,
      path: "Step4",
      city,
      setCity,
      nickName,
      setNickName,
      nativeLanguage,
      setLanguage,
      currentPage: "Step3",
      selected,
      setSelected,
      pressed,
      setPressed,
      index,
      setIndex,
      text: createProfile[typeOfComponent],
    };

    if (typeOfComponent === "language") {
      return (
        <>
          <View style={[styles[typeOfComponent]]}>
            <CountryListDropdown {...obj} {...props} />
          </View>
          {!selected && errorMsg && (
            <Text style={{ color: "red" }}>{errorMsg}</Text>
          )}
        </>
      );
    } else if (typeOfComponent === "titleOfSelectComponent") {
      return (
        <View
          style={[
            styles.textContainer,
            {
              width: createProfile.nativeLanguage.length * 9, //🇫🇷 Taille du container en fonction de la taille du texte
              top:
                !nickName && !city && errorMsg
                  ? 403
                  : (!city || !nickName) && errorMsg
                  ? 384
                  : 364,
            },
          ]}
        >
          <Text
            style={[
              styles.inputText,
              { color: pressed && !selected ? "red" : "black" },
            ]}
          >
            {/* {createProfile.nativeLanguage} */}
          </Text>
        </View>
      );
    } else {
      return (
        <>
          <View style={[styles[typeOfComponent], { marginBottom: 10 }]}>
            <Fields {...obj} />
          </View>
          {typeOfComponent === "city" ? !city : !nickName && errorMsg}{" "}
          {/* 🇫🇷 Affiche un message d'erreur si le champ est vide */}
        </>
      );
    }
  };

  return (
    <ScrollView style={styles.profil}>
      <CityField text={createProfile.city} state={city} setState={setCity} />
      {!city && <Text style={{ padding: 10 }}>{errorMessageCity}</Text>}
      {/* {component("language")} */}
      {component("titleOfSelectComponent")}

      <TouchableOpacity
        onPress={() => {
          //Navigue vers l'etape 4
          if (change === true) {
            sendInfoEditProfile();
            navigation.navigate("Step4");
          }
        }}
        style={[styles.bigBtn, { backgroundColor: backgroundColor }]}
        disabled={btnDisable}
      >
        <Text style={styles.btnText}>{createProfile.button_1}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CreateProfileScreenStepThree;
