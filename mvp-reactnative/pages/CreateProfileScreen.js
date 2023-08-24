// 🇫🇷Page 1 création de profil (Figma Frame 9)🇫🇷
// 🇬🇧 Create Profile Page 1 (Figma Frame 9) 🇬🇧

import { useState, useEffect } from "react";
import { Text, SafeAreaView, StyleSheet, View } from "react-native";
import styles from "./Styles/CreateProfileScreenCss"
import Json from "../assets/json/en.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import LogButton from "../components/LogButtons";
import TwinSelectButton from "../components/TwinSelectButton";
import axios from "axios";
import { hostname } from "../backendconnect/hostname";

//import functions from utils
import { UpdateData} from '../utils/CreateProfileScreenUpdateData';
import {CreateUserProfile} from '../utils/CreateProfileScreenCreateUserProfile';


const CreateProfileScreen = ({ profileState, navigation, scr, userToken, user, setUser, role, userNativeLanguage }) => {
  //Récupération du rôle en fonction bu bouton appuyé
  
  //Trouver une solution pour pouvoir recuperer le role ainsi que son native language

  const { setRole, setLanguage } = profileState;
  console.log(role)
  setRole(role);
  console.log(userNativeLanguage)
  setLanguage(userNativeLanguage);
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
    if (isSelectOne === false || isSelectTwo === false) {
      setBtnDisable(true);
      setBackgroundColor("grey");
    } else {
      setBtnDisable(false);
      setBackgroundColor("#59c09b");
    }
    if(profile === false){
      console.log("false");
      CreateUserProfile(image, userNativeLanguage, role, userToken, setUser, setProfile);
    }
  });
  
  useEffect(() => {
    UpdateData(userToken, setProfilData, profile);
  }, []);
  
  const sendInfoEditProfile = async () => {
    const editProfilBody = {
      sexe : profileState.gender,
      isPersonalAccount : profileState.accountType === createProfile.perso ? true : false
    };

    console.log("ID utilisateur", profilData._id);
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
          dataSave={()=>sendInfoEditProfile()}
          token={userToken}
        />
      </View>
    </SafeAreaView>
  );
};

export default CreateProfileScreen;


