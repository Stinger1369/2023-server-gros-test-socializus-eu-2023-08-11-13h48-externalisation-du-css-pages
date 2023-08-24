//FR Page du profil utilisateur (Frame Figma 70)
//GB User profile screen (Figma Frame 70)

import {
  Text,
  ScrollView,
  Image,
  StyleSheet,
  View,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import styles from "./Styles/MyProfileScreenCss"
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Json from "../assets/json/fr.json";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TopNavigation from "../Navigation/TopNavigation";
import { color } from "react-native-reanimated";
import ProfileInfo from "./ProfileInfo";
import ProfileFriends from "./ProfileFriends";
import ProfileActivities from "./ProfileActivities";

//Variable de en.json permettant de rendre dynamique le texte front-end
const { profile } = Json;

const TopTab = createMaterialTopTabNavigator(); //
const Stack = createNativeStackNavigator(); //Stack permettant de switcher entre les pages informations, activités et friends de l'utilisateur

const MyProfile = () => {
  //Page du profil utilisateur (Frame Figma 70)
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <ImageBackground
            source={require("../assets/images/mousses.png")}
            style={styles.profilePhoto}
          ></ImageBackground>
          {/**Image de fond du profil utilisateur **/}
        </View>

        <View style={styles.actionProfile}>
          <View style={styles.infoText}>
            <Text style={styles.userPseudo}>Karen J.</Text>
            {/*🇫🇷 La variable profile.years dans fr.json permet d'afficher "ans"*/}
            {/*🇬🇧 The en.json variable profile.yearsl displays "years"*/}
            <Text style={styles.userAge}>21 {profile.years}</Text>
            {/*🇫🇷 La variable profile.points dans fr.json permet d'afficher "points"*/}
            {/*🇬🇧 The en.json variable profile.points displays "points"*/}
            <Text style={styles.userPoint}>435 {profile.points}</Text>
          </View>

          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.addFriend}>
              {/**Bouton permettant d'ajouter un utilisateur en ami */}
              {/*🇫🇷 La variable profile.addFriend dans fr.json permet d'afficher "Ajouter comme ami"*/}
              {/*🇬🇧 The en.json variable profile.addFriend displays "add friends"*/}
              <Text>{profile.addFriend}</Text>
            </TouchableOpacity>
            {/*🇫🇷 La variable profile.chatdans fr.json permet d'afficher "Chat"*/}
            {/*🇬🇧 The en.json variable profile.chat displays "Chat"*/}
            <TouchableOpacity style={styles.chat}>
              <Text>{profile.chat}</Text>
            </TouchableOpacity>
            {/*🇫🇷 La variable profile.block}dans fr.json permet d'afficher "Bloquer"*/}
            {/*🇬🇧 The en.json variable profile.block} displays "Block"*/}
            <TouchableOpacity style={styles.block}>
              <Text style={{ color: "white" }}>{profile.block}</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/*🇫🇷 menu de navigation crée pour switcher entre les pages information, activités et friends de l'utilisateur*/}
        {/*🇬🇧 navigation menu created to switch between the user's information, activities and friends pages*/}
        <TopNavigation
          arg={[
            {
              link: "informations",
              to: () => <ProfileInfo />,
            },
            {
              link: "Activites",
              to: () => <ProfileActivities />,
            },
            {
              link: "Friends",
              to: () => <ProfileFriends />,
            },
          ]}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyProfile;


