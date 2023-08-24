// 🇫🇷Page 1 création de profil (Figma Frame 9)🇫🇷
// 🇬🇧 Create Profile Page 1 (Figma Frame 9) 🇬🇧

import { useState, useEffect } from "react";
import { Text, SafeAreaView, View } from "react-native";
import styles from "../Styles/CreateProfileScreenCss";
import Json from "../../assets/json/en.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import LogButton from "../../components/LogButtons";
import TwinSelectButton from "../../components/TwinSelectButton";
import axios from "axios";
import { hostname } from "../../../../mvp-reactnative/backendconnect/hostname";

const CreateProfileScreen = ({
  profileState,
  navigation,
  scr,
  userToken,
  user,
  setUser,
}) => {
  //Récupération du rôle en fonction bu bouton appuyé
  const { role, nativeLanguage } = useRoute().params; //🇫🇷 Récupération des données utilisateur dans le storage

  const { setRole, setLanguage } = profileState;
  setRole(role);

  setLanguage(nativeLanguage);
  const image =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
  const [pressed, setPressed] = useState(false);
  const [isSelectOne, setIsSelectOne] = useState(false);
  const [isSelectTwo, setIsSelectTwo] = useState(false);
  const [firstLeftActive, setFirstLeftActive] = useState(false);
  const [firstRightActive, setFirstRightActive] = useState(false);
  const [secondLeftActive, setSecondLeftActive] = useState(false);
  const [secondRightActive, setSecondRightActive] = useState(false);
  const [btnDisable, setBtnDisable] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState("");
  const [profile, setProfile] = useState(false);
  const [profilData, setProfilData] = useState();
  useEffect(() => {
    //🇫🇷 Vérification de l'état des boutons pour activer le bouton de validation
    if (isSelectOne === false || isSelectTwo === false) {
      setBtnDisable(true); //🇫🇷 Désactivation du bouton de validation
      setBackgroundColor("grey");
    } else {
      setBtnDisable(false);
      setBackgroundColor("#59c09b");
    }
    if (profile === false) {
      //🇫🇷 Vérification de l'état du profil utilisateur
      console.log("false");
      createUserProfile();
    }
  });

  const UpdateData = async () => {
    //🇫🇷 Récupération des données utilisateur dans le storage
    if (profile === true) {
      try {
        //🇫🇷 Récupérer les données utilisateur du serveur à l'aide du jeton utilisateur
        //🇬🇧 Retrieve user data from the server using the user token
        var token = userToken;
        const response = await axios.post(
          `${hostname}/api/v1/user/get-user-by-token`,
          { token }
        );
        console.log(response.data);
        const userData = JSON.stringify(response.data.user); //🇫🇷 Enregistrement des données utilisateur dans le storage
        setProfilData(JSON.parse(userData));
        await AsyncStorage.setItem("Profile", userData);
        await AsyncStorage.setItem("user", userData);
        await AsyncStorage.setItem("id", userData);
        console.log(JSON.parse(userData));
      } catch (error) {
        console.error(error);
      }
    }
  };
  useEffect(() => {
    //🇫🇷 Mise à jour des données utilisateur
    UpdateData();
  }, [profile]);
  //(FR) Fonction permettant de mettre à jour les données enrégistrer par l'utilisateur
  //(En) Function who permit to update the data register by the user
  const createUserProfile = async () => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("sexe", "male");
    formData.append("isPersonalAccount", true);
    formData.append("firstName", null);
    formData.append("lastName", null);
    formData.append("userName", null);
    formData.append("city", null);
    formData.append(
      "nativeLanguage",
      !nativeLanguage ? "English" : nativeLanguage
    );
    console.log(role);
    formData.append("roleName", role.name ? role.name : role);
    try {
      //🇫🇷 Enregistrement des données utilisateur sur le serveur
      const response = await axios.post(
        `${hostname}/api/v1/profile/createprofile`,
        formData,
        {
          headers: {
            authorization: "Bearer " + userToken,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("ok");
      const userData = JSON.stringify(response.data.user);
      setUser(response.data.user);
      console.log("UserData: ", userData);
      console.log("Profile enregistré");
      setProfile(true);
      console.log(profileState);
      //setProfile("done");
    } catch (error) {
      console.log(error);
    }
  };
  const sendInfoEditProfile = async () => {
    //🇫🇷 Envoi des données utilisateur au serveur
    const editProfilBody = {
      sexe: profileState.gender,
      isPersonalAccount:
        profileState.accountType === createProfile.perso ? true : false,
    };

    console.log("ID utilisateur", profilData._id);
    console.log("TOKEN", userToken);
    //id pour test: 64394c41879131c2c43375e0
    // token pour test: vyGhGEE6JA6ERnhHOid1eaEphgdb3YCN
    try {
      const requestOptions = {
        //🇫🇷 Envoi des données utilisateur au serveur
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(editProfilBody),
      };
      const response = await fetch(
        //🇫🇷 Envoi des données utilisateur au serveur
        `${hostname}/api/v1/user/info/${profilData._id}`,
        requestOptions
      );
      const data = await response.json();
      console.log("data", data);
      //🇫🇷 reemplacement de données sur user , et apres sur le JSON user et Profile  dans le storage
      //🇬🇧 replacement of data on user , and after on the JSON user and Profile in the storage
      Object.assign(user, editProfilBody);
      setUser(user);
    } catch (error) {
      console.log("CATCH :", error);
    }
  };
  const { createProfile } = scr;
  const obj = {
    width: 318,
    profileState,
    isSelectOne,
    isSelectTwo,
    setPressed,
    currentPage: "Profile",
    navigate: navigation.navigate,
    path: "Step2",
  };
  return (
    <SafeAreaView style={styles.profil}>
      <View style={styles.gender}>
        <TwinSelectButton
          firstTitle={createProfile.male}
          secondTitle={createProfile.female}
          profileState={profileState}
          setIsSelect={setIsSelectOne}
          active={firstLeftActive}
          setActive={setFirstLeftActive}
          secondActive={firstRightActive}
          setSecondActive={setFirstRightActive}
          currentPAge={"Profile"}
          scr={scr}
        />
      </View>

      <View style={styles.account}>
        <TwinSelectButton
          style={styles.account}
          firstTitle={createProfile.perso} //Personal account
          secondTitle={createProfile.pro} //Pro account
          profileState={profileState}
          setIsSelect={setIsSelectTwo}
          active={secondLeftActive}
          setActive={setSecondLeftActive}
          secondActive={secondRightActive}
          setSecondActive={setSecondRightActive}
          currentPAge={"Profile"}
          scr={scr}
        />
      </View>

      <View style={styles.btn}>
        <LogButton
          text={createProfile.button_1} //Continue
          width={318}
          profileState={profileState}
          isSelectOne={isSelectOne}
          isSelectTwo={isSelectTwo}
          setPressed={setPressed}
          currentPage={"Profile"}
          navigate={navigation.navigate}
          path={"Step2"}
          disabled={btnDisable}
          backgroundColor={backgroundColor}
          dataSave={() => sendInfoEditProfile()}
          token={userToken}
        />
      </View>
    </SafeAreaView>
  );
};

export default CreateProfileScreen;
