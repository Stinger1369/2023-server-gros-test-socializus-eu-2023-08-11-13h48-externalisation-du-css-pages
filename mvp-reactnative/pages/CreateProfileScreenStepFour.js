//🇫🇷 Page 4 création de profil (Figma Frame 12)
//🇬🇧 Create Profile Page 4(Figma Frame 12)

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import styles from "./Styles/CreateProfileScreenStepFourCss"

//Assets images
import ProfilePicture from "../components/ProfilePictureComponent/ProfilePicture";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { hostname } from "../backendconnect/hostname.js";
import Json from "../assets/json/en.json";
import SkipButton from "../assets/images/next-white.svg";

//import functions from utils
import {UpdateData} from '../utils/CreateProfileScreenStepFourUpdateData';
import { sendInfoEditProfile } from '../utils/CreateProfileScreenStepFoursendInfoEditProfile';

const CreateProfileScreenStepFour = ({
  profileState,
  navigation,
  setProfile,
  userToken,
  user,
  setUser,
  rolesList,
  scr,
}) => {
  const {
    gender,
    accountType,
    firstName,
    lastName,
    nickName,
    city,
    nativeLanguage,
    role,
  } = profileState;

  const [errorMsg, setErrorMsg] = useState(null);
  const [profilData, setProfilData] = useState();
  const [picture, setPicture] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [skipWarning, setSkipWarning] = useState(null);
  let displaySkipWarning;
  const [avatarImage, setAvatarImage] = useState(null);
  const image =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
  
  const [btnDisable, setBtnDisable] = useState(false);
  const { createProfile } = scr;
console.log(accountType);
  //I send role.name because in the backend, the role is fetched again thanks to the role name...
  useEffect(() => {
    UpdateData(setProfilData, hostname);
  }, []);
  useEffect(()=>{
    if(!avatarImage){
      setErrorMsg(createProfile.fakeUser);
    } 
  })
  const executeMsg = ()=>{
    console.log(displaySkipWarning);
    if (!displaySkipWarning) {
      console.log("ok");
      displaySkipWarning = true;
      setSkipWarning(createProfile.warningMsg);
    }
    else{
      console.log("ok");
      sendInfoEditProfile();
      setProfile("done");
    }
  }
  
  useEffect(()=>{
    navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity
            onPress={() => {
              executeMsg();
            }}
            style={{ marginRight: 10, cursor: "pointer" }}
          >
            <SkipButton />
          </TouchableOpacity>
        );
      },
    })
  },[])

  const obj = {
    width: 160,
    text: "Save",
    fakeUser: createProfile.fakeUser, //We do not want fake user, please add a picture to your profil to use this app 🇬🇧/
    //**Nous ne voulons pas de faux utilisateurs, veuillez ajouter une photo à votre profil pour utiliser cette application 🇫🇷/ */}
    setErrorMsg,
    currentPage: "Step 4",
    navigate: navigation.navigate,
    picture,
    setProfile,
    //func: createUserProfile,
  };

  useEffect(() => {
    avatarImage
      ? setBtnDisable(false)
      : setBtnDisable(true);
  }, [avatarImage]);

  return (
    <View style={styles.profile}>
      <ProfilePicture
        avatarImage={avatarImage}
        setAvatarImage={setAvatarImage}
        profileImage={profileImage}
        setProfileImage={setProfileImage}
        createProfile={createProfile}
      />

      {!avatarImage && errorMsg && !skipWarning && <Text style={styles.error}>{errorMsg}</Text>}
      {skipWarning && (
          <View style={!skipWarning ? styles.container : styles.warningContainer}>
          <Text style={styles.warningText}>
           {createProfile.warningMsg}
          </Text>
          </View>
        )}
      <View style={styles.btn}>
        <TouchableOpacity
          onPress={() => {
            if (!avatarImage) {
              setErrorMsg(createProfile.fakeUser); //We do not want fake users..
              // erreur en cas de creation de faux utilisateurs//
            } else {
              // sendImages();
              sendInfoEditProfile();
              setProfile("done");
            }
          }}
          style={[
            styles.bigBtn,
            { backgroundColor: btnDisable ? "grey" : "#59c09b" },
          ]}
          disabled={btnDisable}
        >
          <Text style={styles.btnText}>{createProfile.button_2}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};



export default CreateProfileScreenStepFour;
