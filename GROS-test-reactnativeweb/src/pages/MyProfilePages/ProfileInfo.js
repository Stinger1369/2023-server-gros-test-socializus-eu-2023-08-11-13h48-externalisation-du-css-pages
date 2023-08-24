//🇫🇷 Page de profil - onglet informations (Figma Frame 70)
//🇬🇧 Profile Page - info tab (Figma Frame 70)

import React from "react";
import { Text, ScrollView, Image, View, TouchableOpacity } from "react-native";
import styles from "../Styles/ProfileInfoCss";
//Assets
import Flagfrance from "../../assets/flags-svg/flagfrance.svg";
import Flaguk from "../../assets/flags-svg/flaguk.svg";
import Flagspain from "../../assets/flags-svg/flagspain.svg";
import Portugal from "../../assets/flags-svg/portugal.svg";
import Italy from "../../assets/flags-svg/italy.svg";
import Flaggerman from "../../assets/flags-svg/flaggerman.svg";
import Afterwork from "../../assets/images/afterwork.svg";
import Apero from "../../assets/images/apero.svg";
import Linguistic from "../../assets/images/linguistic.svg";
import Movie from "../../assets/images/movie.svg";
import Music from "../../assets/images/music.svg";
import Discoballs from "../../assets/images/discoballs.svg";
import Sports from "../../assets/images/sports.svg";
import Bellefemme from "../../assets/images/bellefemme.png";
import Star from "../../assets/images/star.svg";
import { useState, useEffect } from "react";
import { countriesListRectFlags } from "../../assets/countriesListRectFlags";
import { activitiesList } from "../../assets/activityList/activityListWithIcons";

import JSON from "../../assets/json/fr.json";
// Variables declarée dans le fichier en.json permettant la traduction des différentes langues

const ProfileInfo = ({ user, scr, city }) => {
  const { profile } = scr;
  const [flag, setFlag] = useState(null);
  useEffect(() => {
    // pour afficher le language native dans le profil
    console.log(user.nativeLanguage);
    if (user.nativeLanguage && user.nativeLanguage !== "null") {
      // si l'utilisateur a renseigné sa langue native
      if (user.nativeLanguage !== "undefined") {
        // si l'utilisateur a renseigné sa langue native
        const userNativeLanguage = countriesListRectFlags.find(
          (country) => country.language === user.nativeLanguage // on cherche le pays correspondant à la langue native de l'utilisateur
        );
        console.log(user.nativeLanguage);
        setFlag(userNativeLanguage.flag.props.src); // "userNativeLanguage.flag.props.src" est un format image du drapeau
      }
    } else {
      setFlag("");
    }
  }, []);
  let spokenlanguageList = user.spokenLanguage; // on récupère la liste des langues parlées par l'utilisateur
  let hobbiesList = user.hobbies;
  const [child, setChild] = useState(scr.editProfile.step3.secret); // State d'affichager si l'user a des enfants
  const [tobacco, setTobacco] = useState(scr.editProfile.step3.secret); // State d'affichager si l'user fume
  const [alcohol, setAlcohol] = useState(scr.editProfile.step3.secret); // State d'affichager si l'user boit de l'alcool
  const [age, setAge] = useState(scr.editProfile.step3.secret); // State d'affichage pour l'âge de l'utilisateur

  useEffect(() => {
    if (user.children) {
      console.log(user.children);
      if (user.children === 0) {
        // si l'utilisateur a renseigné le nombre d'enfants
        console.log(user.children);
        setChild(scr.editProfile.step3.secret); // on affiche le nombre d'enfants
      }
      if (user.children === 1) {
        setChild(scr.editProfile.step3.yes);
      }
      if (user.children === 2) {
        setChild(scr.editProfile.step3.no);
      }
    }
  });
  useEffect(() => {
    if (user.alcohol) {
      if (user.alcohol === 0) {
        // si l'utilisateur a renseigné s'il boit de l'alcool
        setAlcohol(scr.editProfile.step3.secret);
      }
      if (user.alcohol === 1) {
        setAlcohol(scr.editProfile.step3.sometimes);
      }
      if (user.alcohol === 2) {
        setAlcohol(scr.editProfile.step3.no);
      }
    }
  });
  useEffect(() => {
    console.log(user.tobacco); // si l'utilisateur a renseigné s'il fume
    if (user.tobacco) {
      if (user.tobacco === 0) {
        setTobacco(scr.editProfile.step3.secret);
      }
      if (user.tobacco === 1) {
        setTobacco(scr.editProfile.step3.sometimes);
      }
      if (user.tobacco === 2) {
        setTobacco(scr.editProfile.step3.no);
      }
    }
  });
  useEffect(() => {
    if (user.age) {
      if (user.age === 0) {
        // si l'utilisateur a renseigné son âge
        setAge(scr.editProfile.step3.secret);
      }
      if (user.age === 1) {
        setAge(scr.editProfile.step3.no);
      }
      if (user.age === 2) {
        setAge(scr.editProfile.step3.yes);
      }
    }
  });

  console.log("user profile objet", user.studies);
  console.log("user2", user.university);
  console.log(countriesListRectFlags[0].flag.props.src);
  console.log(countriesListRectFlags[6].language);
  console.log(countriesListRectFlags[10].language);

  return (
    <ScrollView style={styles.container}>
      {/*<View style={styles.content}>
        <View style={styles.div}>
          <Image style={{ width: "100%", height: 300 }} source={require("../assets/images/bellefemme.png")}/>
          <View style={styles.containerInfo}>
            <View style={styles.pourcentageInfo}>
              <Text style={{ fontSize: 15, color: "black", fontWeight: "600" }}>Organizer:</Text>

                  <View style={{flexDirection: "row"}}>
                    <Star width={20} height={20} />
                    <Star width={20} height={20} />
                    <Star width={20} height={20} />
                    <Star width={20} height={20} />
                    </View>

              <View style={styles.pourcentageInfo2}>
                <Text style={[styles.font, { fontSize: 15 }]}>{profile.reliability}</Text>
              </View>
              <View style={styles.pourcentageBar}>
                <View style={styles.positivBar}></View>
                <View style={styles.negativBar}></View>
              </View>           
            </View>
            <View style={styles.actionProfile}>
              <View style={styles.infoText}>
                <Text style={styles.userPseudo}>Astrid L.</Text>
                <Text style={styles.userAge}>28 {profile.years}</Text>
                <Text style={styles.userPoint}>Paris</Text>
              </View>
              </View>

            <View style={styles.btnContainer}>
              <TouchableOpacity style={styles.addFriend}>
                <Text>{profile.addFriend}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.chat}>
                <Text>{profile.chat}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.block}>
                <Text style={{ color: "white" }}>{profile.block}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>*/}

      <View style={styles.connectionInfo}></View>
      <Text style={styles.aboutDescription}>{user.about}</Text>

      {/*************************************IDENTIFICATION USER****************************/}
      <View style={styles.situationInfo}>
        <View style={styles.situationRigth}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.situation}>
              {profile.city + ": "}
              <Text style={styles.greyText}>{city}</Text>
            </Text>
          </View>
          {user.children !== 0 && user.children && (
            <Text style={styles.situation}>
              {/* 🇫🇷 profile.children de fr.json permet de donner le nombre d'enfant */}
              {/* 🇬🇧 profile.children from en.json allows you to give the number of children*/}
              {profile.children + ": "}
              <Text style={styles.greyText}>{child}</Text>
            </Text>
          )}
          <Text style={styles.situation}>
            {/* // 🇫🇷 profile.children de fr.json permet de donner le niveau d'etudes
            // 🇬🇧 profile.children from en.json allows you to give education degree */}
            {/* {profile.studies + ": "} */}
            <Text style={styles.greyText}>
              {/* {user.studies ? scr.editProfile.step3.secret : "-no data-"} */}
            </Text>
          </Text>
        </View>

        <View>
          <Text style={styles.situation}>
            {/* // 🇫🇷 profile.children de fr.json permet de donner l'etablissement d'etudes
            // 🇬🇧 profile.children from en.json allows you to give education college */}
            {/* {profile.university + ": "} */}
            <Text style={styles.greyText}>
              {/* {user.university ? scr.editProfile.step3.secret : "-no data-"} */}
            </Text>
          </Text>
          {user.alcohol !== 0 && user.alcohol && (
            <Text style={styles.situation}>
              {/* 🇫🇷 profile.alcool de fr.json permet d'informer si l'on boit de l'alcool ou pas */}
              {/* 🇬🇧 profile.alcohol from en.json allows you to know if you drink or not*/}
              {profile.alcohol + ": "}
              <Text style={styles.greyText}>{alcohol}</Text>
            </Text>
          )}
          {console.log(tobacco)}
          {user.tobacco !== 0 && user.tobacco && (
            <Text style={styles.situation}>
              {/* 🇫🇷 profile.tobacco de fr.json permet d'informer si l'on fume ou pas */}
              {/* 🇬🇧 profile.tobacco from en.json allows you to know if you smoke or not*/}
              {profile.tobacco + ": "}
              <Text style={styles.greyText}>{tobacco}</Text>
            </Text>
          )}
          {user.age !== 0 && user.age && (
            <Text style={styles.situation}>
              {/* 🇫🇷 profile.age de fr.json permet d'informer de l'âge */}
              {/* 🇬🇧 profile.age from en.json allows you to display the age */}
              {profile.age + " "}
              <Text style={styles.greyText}>{user.age}</Text>
              {/* Utilisez `age` ici pour afficher l'âge */}
            </Text>
          )}
        </View>
      </View>

      <View style={{ ...styles.language, marginTop: 20, marginBottom: 10 }}>
        <View style={{ flexDirection: "row" }}>
          <Text style={ styles.nativeTxt }>
            {profile.native}
          </Text>
          <Image source={flag} style={ styles.flagImg } />
        </View>
      </View>
      {spokenlanguageList && (
        <View style={{ ...styles.language, marginBottom: 15 }}>
          <Text style={ styles.spokenLangTxt }>
            {/* profile.spokenLang de en.json permet d'afficher les drapeaux des pays */}
            {profile.spoken}
          </Text>
          {spokenlanguageList.map((item, index) => (
            <Image
              source={countriesListRectFlags[item].flag.props.src}
              style={ styles.countriesListImg }
            />
          ))}
        </View>
      )}

      {/*************************************HOBBIES USER ****************************/}

      <View style={styles.activitiesInfo}>
        <View style={styles.container}>
          {/* <View style={styles.whatILoveToDo}> */}
          {/* profile.hobbies permet de lister les hobbies de l'utilisateur */}
          <Text style={styles.title}>{profile.what}</Text>
          {/* </View> */}
        </View>
      </View>
      {hobbiesList && (
        <View style={ styles.hobbiesListView }>
          {hobbiesList.map((item, index) => (
            <Image
              source={activitiesList[item].activityTypeIcon_On.props.src}
              style={ styles.activitiesListImg }
            />
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default ProfileInfo;
