//🇫🇷 Page 4 création de profil (Figma Frame 12)
//🇬🇧 Create Profile Page 4(Figma Frame 12)

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styles from "../Styles/CreateProfileScreenStepFourCss";
//Assets images
import ProfilePicture from "../../components/ProfilePicture";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { hostname } from "../../../../mvp-reactnative/backendconnect/hostname.js";
import Json from "../../assets/json/en.json";
import SkipButton from "../../assets/images/next-white.svg";

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
  const [avatarImage, setAvatarImage] = useState(null);
  const [skipWarning, setSkipWarning] = useState(null);
  let displaySkipWarning;
  const image =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
  const [btnDisable, setBtnDisable] = useState(false);
  const { createProfile } = scr;
  console.log(accountType);

  //I send role.name because in the backend, the role is fetched again thanks to the role name...
  useEffect(() => {
    UpdateData();
  }, []);
  useEffect(() => {
    if (!avatarImage) {
      setErrorMsg(createProfile.fakeUser);
    }
  });
  const UpdateData = async () => {
    //🇫🇷 Récupération des données utilisateur dans le storage
    try {
      let res = JSON.parse(await AsyncStorage.getItem("id"));
      setProfilData(res);
      console.log(profilData);
      const response = await axios.get(
        `${hostname}/api/v1/user/getuserinfo/${res._id}`
      );
      console.log(response.data.user);
      const resultat = JSON.stringify(response.data.user);
      console.log(resultat);
      await AsyncStorage.setItem("Profile", resultat); //🇫🇷 Enregistrement des données utilisateur dans le storage
      await AsyncStorage.setItem("user", resultat); //🇫🇷 Enregistrement des données utilisateur dans le storage
    } catch (error) {
      console.error(error);
    }
  };
  const sendInfoEditProfile = async () => {
    //🇫🇷 Envoi des données utilisateur au serveur
    console.log(avatarImage);
    const editProfilBody = {
      image: avatarImage === null ? image : avatarImage, //🇫🇷 Envoi des données utilisateur au serveur
      avatar: avatarImage === null ? image : avatarImage,
    };
    let res = JSON.parse(await AsyncStorage.getItem("id"));
    console.log(res);
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
      const response = await fetch(
        `${hostname}/api/v1/user/info/${res._id}`,
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

  // useEffect(() => {
  //   navigation.setOptions({
  //     // headerRight: () => {
  //     //   return (
  //     //     <TouchableOpacity
  //     //       onPress={() => {
  //     //         executeMsg();
  //     //       }}
  //     //       style={{ marginRight: 10, cursor: "pointer" }}>
  //     //       <img src={SkipButton} />
  //     //     </TouchableOpacity>
  //     //   );
  //     // },
  //   });
  // }, []);
  /*sendInfoEditProfile();
              setProfile("done");*/

  const executeMsg = () => {
    console.log(displaySkipWarning);
    if (!displaySkipWarning) {
      console.log("ok");
      displaySkipWarning = true;
      setSkipWarning(createProfile.warningMsg);
    } else {
      console.log("ok");
      sendInfoEditProfile();
      setProfile("done");
    }
  };
  /*useEffect(()=>{
    if(!displaySkipWarning && skipWarning === ""){
      console.log("ok");
      sendInfoEditProfile();
      setProfile("done");
    }
  })*/
  const obj = {
    width: 160,
    text: "Save",
    fakeUser: createProfile.fakeUser, //We do not want fake user, please add a picture to your profil to use this app 🇬🇧/
    //**Nous ne voulons pas de faux utilisateurs, veuillez ajouter une photo à votre profil pour utiliser cette application 🇫🇷/ */}
    setErrorMsg,
    currentPage: "Step4",
    navigate: navigation.navigate,
    picture,
    setProfile,
    //func: createUserProfile,
  };

  useEffect(() => {
    avatarImage ? setBtnDisable(false) : setBtnDisable(true);
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

      <View style={styles.bar}>
        <View
          style={[styles.done, { width: avatarImage ? "100%" : "10%" }]}
        ></View>
      </View>
      {!avatarImage && errorMsg && !skipWarning && (
        <Text style={styles.error}>{errorMsg}</Text>
      )}
      {skipWarning && (
        <View style={!skipWarning ? styles.container : styles.warningContainer}>
          <Text style={styles.warningText}>{createProfile.warningMsg}</Text>
        </View>
      )}
      <View style={styles.btn}>
        <TouchableOpacity
          onPress={() => {
            if (!avatarImage) {
              console.log("ok");
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
