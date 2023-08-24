//🇫🇷 Page pour un seul membre (Figma Frame 70)
//🇬🇧 Page for a member's details (Figma Frame 70)
import {
  Text,
  ScrollView,
  Image,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import styles from "../Styles/MemberScreenCss";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { hostname } from "../mvp-reactnative/backendconnect/hostname.js";

import TopNavigation from "./Navigation/TopNavigation"; //(fr) import de la nav bar (gb) import of the nav bar
import MembersScreen from "./MembersScreen"; //(fr) import de la page des membres (gb) import of the members page
import ActivitiesScreen from "./ActivitiesScreen"; //(fr) import de la page des activités (gb) import of the activities page

import { ager } from "../../utils/functionDate.js"; //(fr) import de la fonction ager (gb) import of the ager function
import Json from "../assets/json/en.json";

import { database } from "../../config/firebase"; //(fr) import de la base de donnée (gb) import of the database
import { collection, addDoc } from "@firebase/firestore"; //(fr) import de la fonction addDoc (gb) import of the addDoc function

import AsyncStorage from "@react-native-async-storage/async-storage"; //(fr) import de la fonction AsyncStorage (gb) import of the AsyncStorage function
import Axios from "axios";

//🇫🇷 Import de l'objet "profile" dans le fichier assets/json/fr.json
//🇬🇧 Extracting "profile" object from folder assets/json/en.json
const { profile } = Json;

const MemberScreen = ({ route }) => {
  //(fr) fonction qui contient les infos du membre (gb) A function containing member information such as name, age, and points could be called a "Member Information"
  const member = route.params.member;
  const [user, setUser] = useState(null); //(fr) fonction qui contient les infos de l'utilisateur connecté (gb) A function that retrieves the information of the connected user
  const navigation = useNavigation();

  useEffect(() => {
    //(fr) fonction qui permet de récupérer les infos de l'utilisateur connecté (gb) A function that retrieves the information of the connected user
    AsyncStorage.getItem("user")
      .then((res) => {
        setUser(JSON.parse(res));
      })
      .catch((err) => console.log("MemberScreenAsyncStorageError :", err));
  }, []);

  const newChat = () => {
    //(fr) fonction qui permet de créer un nouveau chat (gb) A function that creates a new chat
    if (user) {
      addDoc(collection(database, "chats"), {
        user1: {
          _id: user._id,
          userName: user.userName,
          avatar: user.avatar,
        },
        user2: {
          _id: member._id,
          userName: member.userName ? member.userName : member.firstName,
          avatar: member.avatar,
        },
        messages: [], //(fr) tableau qui contient les messages (gb) array containing messages
      }).then((newChatDoc) => {
        Axios.post(
          `${hostname}/api/private_chats`, //(fr) lien vers l'api (gb) link to the api
          { user1: user._id, user2: member._id, chat_id: newChatDoc.id },
          {
            headers: {
              //(fr) headers pour l'authentification (gb) headers for authentication
              authorization: `Bearer ${user.token}`,
            },
          }
        )
          .then(() => {
            //(fr) redirection vers la page du chat (gb) redirection to the chat page
            navigation.navigate("PrivateChat", { chatId: newChatDoc.id }); //(fr) redirection vers la page du chat (gb) redirection to the chat page
          })
          .catch((err) => console.log("MemberScreenError :", err)); //(fr) affichage de l'erreur (gb) display of the error
      });
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image
          style={styles.photo}
          source={{
            uri: member.avatar,
          }}
        />
        <View style={styles.actionProfile}>
          {/**(fr) fonction qui contient les boutons "chat et block/ (gb)A function containing the "Chat" and "Block" buttons  */}
          <View style={styles.infoText}>
            {/**(fr)fonction qui contient les infos du membre (nom, age, points) (gb) A function containing member information such as name, age, and points could be called a "Member Information"  */}
            <Text style={styles.userPseudo}>{member.firstName}</Text>
            <Text style={styles.userAge}>
              {/** La fonction ager() permet de calculer l'age de la personne en fonction de sa date de naissance/ (gb) The "ager()" function would be called an "Age Calculator Function" in English. It calculates a person's age based on their date of birth  */}
              {ager(member.birthday)} {profile.years}
            </Text>
            <Text style={styles.userPoint}>435 {profile.points}</Text>
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.addFriend}>
              {/**(fr) fonction qui permet d'ajouter un ami (gb) A function that adds a friend  */}
              <Text>{profile.addFriend}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.chat} onPress={newChat}>
              <Text>{profile.chat}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.block}>
              <Text style={{ color: "white" }}>{profile.block}</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* mini nav bar qui contient le lien vers les pages profile, Myactivities et friends*/}
        {/* nav that contain link to profiles, activities and friends pages*/}
        <TopNavigation
          arg={[
            //🇫🇷 Les liens de la nav bar (gb) The links of the nav bar
            {
              link: "Profile",
              to: () => <MembersScreen fromStack="male" />,
            },
            {
              link: "My activities",
              to: () => <ActivitiesScreen fromStack="male" />,
              topNavArg: [
                {
                  link: "test",
                  to: () => (
                    <ActivitiesScreen fromStack="upcomming activities" />
                  ),
                },
                {
                  link: "toast",
                  to: () => <ActivitiesScreen fromStack="past activities" />,
                },
                {
                  link: "tist",
                  to: () => (
                    <ActivitiesScreen fromStack="organized activities" />
                  ),
                },
              ],
            },
            {
              link: "Friends",
              to: () => <MembersScreen fromStack="male" />,
            },
          ]}
        />
        <View style={styles.containerInfo}>
          <View style={styles.pourcentageInfo}>
            {/*🇫🇷 La variable profile.attending dans en.json permet d'afficher "Attending"*/}
            {/*🇬🇧 The en.json variable  profile.attending  displays "Attending-"*/}
            <Text style={ styles.attendingTxt }>
              {profile.attending} 67%
            </Text>
            {/*🇫🇷 La variable profile.reliability dans en.json permet d'afficher ".reliability"*/}
            {/*🇬🇧 The en.json variable  profile.reliability  displays ".reliability-"*/}
            <View style={styles.pourcentageInfo2}>
              <Text style={[styles.font, { fontSize: 15 }]}>
                {profile.reliability} 67%
              </Text>
              <View style={styles.pourcentageBar}>
                <View style={styles.positivBar}></View>
                <View style={styles.negativBar}></View>
              </View>
            </View>
            {/*🇫🇷 La variable profile.missing dans en.json permet d'afficher "missing"*/}
            {/*🇬🇧 The en.json variable  profile.missing  displays "missing -"*/}
            <Text style={ styles.missingTxt }>
              {profile.missing} 33%
            </Text>
          </View>
          <View style={styles.connectionInfo}>
            <View style={styles.connectionSubInfo}>
              {/*🇫🇷 La variable profile.lastConnection dans en.json permet d'afficher "Se connecter"*/}
              {/*🇬🇧 The en.json variable  profile.lastConnection  displays "login -"*/}
              <Text style={styles.font}>{profile.lastConnection}</Text>
              <Text style={[styles.font, { color: "#2E00B2" }]}>
                November 4th 2021
              </Text>
            </View>
            {/*🇫🇷 La variable profile.rating dans en.json permet d'afficher "Organiser rating"*/}
            {/*🇬🇧 The en.json variable  profile.rating  displays "Organiser rating-"*/}
            <View style={styles.connectionSubInfo}>
              <Text style={styles.font}>{profile.rating}</Text>
              <Text style={[styles.font, { color: "#2E00B2" }]}>4</Text>
              <View style={styles.starRating}></View>
            </View>
            {/*🇫🇷 La variable profile.registrationDate dans fr.json permet d'afficher "Registration date"*/}
            {/*🇬🇧 The en.json variable  profile.registrationDate  displays "Registration date -"*/}
            <View style={styles.connectionSubInfo}>
              <Text style={styles.font}>{profile.registrationDate}</Text>
              <Text style={[styles.font, { color: "#2E00B2" }]}>
                August 12th 2021
              </Text>
            </View>
          </View>
          <View style={styles.aboutMe}>
            {/*🇫🇷 La variable profile.about dans en.json permet d'afficher "About me "*/}
            {/*🇬🇧 The en.json variable  profile.about  displays "About me  -"*/}
            <Text style={styles.title}>{profile.about}</Text>

            <Text style={styles.aboutDescription}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s. Lorem Ipsum is simply dummy text of the
              printing and typesetting industry
            </Text>

            <View style={styles.language}>
              {/*🇫🇷 La variable profile.nativeLang dans fr.json permet d'afficher "Native languages"*/}
              {/*🇬🇧 The en.json variable  profile.nativeLang displays "Native languages -"*/}
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                {profile.nativeLang}
              </Text>
              <View></View>
            </View>
            <View style={styles.language}>
              {/*🇫🇷 La variable profile.spokenLang dans en.json permet d'afficher "Spoken languages"*/}
              {/*🇬🇧 The en.json variable profile.spokenLang displays "Spoken languages"*/}
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                {profile.spokenLang}
              </Text>
              <View></View>
            </View>
            <View style={styles.situationInfo}>
              <Text style={styles.situation}>
                {/*🇫🇷 La variable profile.city dans en.json permet d'afficher "city"*/}
                {/*🇬🇧 The en.json variable  profile.city  displays "city -"*/}
                {profile.city} <Text> :</Text>
                <Text style={styles.blueText}> Paris</Text>
              </Text>
              <Text style={styles.situation}>
                {/*🇫🇷 La variable login.title dans en.json permet d'afficher "Children"*/}
                {/*🇬🇧 The en.json variable login.title displays "Children"*/}
                {profile.children} <Text>:</Text>
                <Text style={styles.blueText}> Secret</Text>
              </Text>
              <Text style={styles.situation}>
                {/*🇫🇷 La variable profile.tobacco dans en.json permet d'afficher "Tobacco"*/}
                {/*🇬🇧 The en.json variable profile.tobacco displays "Tobacco"*/}
                {profile.tobacco} <Text>:</Text>
                <Text style={styles.blueText}> Never</Text>
              </Text>
              {/*🇫🇷 La variable profile.alcohol dans fr.json permet d'afficher "Alcool"*/}
              {/*🇬🇧 The en.json variable profile.alcohol displays "Alcohol"*/}
              <Text style={styles.situation}>
                {profile.alcohol}
                <Text>:</Text>
                <Text style={styles.blueText}> Sometimes</Text>
              </Text>
            </View>

            <View style={styles.activityInfo}>
              {/*🇫🇷 La variable profile.activitiesDone dans en.json permet d'afficher "Activities done"*/}
              {/*🇬🇧 The en.json variable profile.activitiesDone displays "Activities done"*/}
              <Text style={styles.title}>
                {profile.activitiesDone}
                <Text style={ styles.blueColor }>22</Text>
              </Text>
              {/*🇫🇷 La variable profile.afterwork dans enjson permet d'afficher "Afterwork"*/}
              {/*🇬🇧 The en.json variable profile.afterwork displays "aAfterwork"*/}
              <View style={styles.activitiesDone}>
                <View style={styles.activitiesContainer}>
                  <Text style={styles.activityStyle}>
                    {profile.afterwork}
                    <Text style={ styles.blueColor }> 3</Text>
                  </Text>
                  <Text style={styles.activityStyle}>
                    {profile.culture}
                    <Text style={ styles.blueColor }> 11</Text>
                  </Text>
                  {/*🇫🇷 La variable profile.job dans en.json permet d'afficher "job"*/}
                  {/*🇬🇧 The en.json variable  profile.job  displays "job-"*/}
                  <Text style={styles.activityStyle}>
                    {profile.job}
                    <Text style={ styles.blueColor }> 2</Text>
                  </Text>
                  {/*🇫🇷 La variable profile.mutual dans en.json permet d'afficher "mutual"*/}
                  {/*🇬🇧 The en.json variable  profile.mutual  displays "mutual -"*/}
                  <Text style={styles.activityStyle}>
                    {profile.mutual}
                    <Text style={ styles.blueColor }> 11</Text>
                  </Text>
                  {/*🇫🇷 La variable profile.picnic dans en.json permet d'afficher "picnic"*/}
                  {/*🇬🇧 The en.json variable  profile.picnic  displays "picnic -"*/}
                  <Text style={styles.activityStyle}>
                    {profile.picnic}
                    <Text style={ styles.blueColor }> 2</Text>
                  </Text>
                </View>

                <View style={styles.activitiesContainer}>
                  {/*🇫🇷 La variable profile.aperitif dans en.json permet d'afficher "aperitif"*/}
                  {/*🇬🇧 The en.json variable  profile.aperitif displays "aperitif-"*/}
                  <Text style={styles.activityStyle}>
                    {profile.aperitif}
                    <Text style={ styles.blueColor }> 3</Text>
                  </Text>
                  {/*🇫🇷 La variable profile.game dans en.json permet d'afficher "game"*/}
                  {/*🇬🇧 The en.json variable  profile.game displays "game -"*/}
                  <Text style={styles.activityStyle}>
                    {profile.game}
                    <Text style={ styles.blueColor }> 11</Text>
                  </Text>
                  {/*🇫🇷 La variable profile.linguistic dans en.json permet d'afficher "linguistic"*/}
                  {/*🇬🇧 The en.json variable  profile.linguistic displays "linguistic -"*/}
                  <Text style={styles.activityStyle}>
                    {profile.linguistic}
                    <Text style={ styles.blueColor }> 2</Text>
                  </Text>
                  {/*🇫🇷 La variable profile.game dans en.json permet d'afficher "music"*/}
                  {/*🇬🇧 The en.json variable  profile.game displays "music-"*/}
                  <Text style={styles.activityStyle}>
                    {profile.music}
                    <Text style={ styles.blueColor }> 11</Text>
                  </Text>
                  {/*🇫🇷 La variable profile.game dans fr.json permet d'afficher "sports"*/}
                  {/*🇬🇧 The en.json variable  profile.game displays "sports -"*/}
                  <Text style={styles.activityStyle}>
                    {profile.sports}
                    <Text style={ styles.blueColor }> 2</Text>
                  </Text>
                </View>
                {/*🇫🇷 La variable profile.game dans fr.json permet d'afficher "cinema"*/}
                {/*🇬🇧 The en.json variable  profile.game displays "cinema -"*/}
                <View style={styles.activitiesContainer}>
                  <Text style={styles.activityStyle}>
                    {profile.cinema}
                    <Text style={ styles.blueColor }> 3</Text>
                  </Text>
                  {/*🇫🇷 La variable profile.game dans fr.json permet d'afficher "houseParty}"*/}
                  {/*🇬🇧 The en.json variable  profile.game displays "houseParty}-"*/}
                  <Text style={styles.activityStyle}>
                    {profile.houseParty}
                    <Text style={ styles.blueColor }> 11</Text>
                  </Text>
                  {/*🇫🇷 La variable profile.game dans fr.json permet d'afficher "meal"*/}
                  {/*🇬🇧 The en.json variable  profile.game displays "meal-"*/}
                  <Text style={styles.activityStyle}>
                    {profile.meal} <Text style={ styles.blueColor }> 2</Text>
                  </Text>
                  {/*🇫🇷 La variable profile.game dans fr.json permet d'afficher "party}"*/}
                  {/*🇬🇧 The en.json variable  profile.game displays "party} -"*/}
                  <Text style={styles.activityStyle}>
                    {profile.party}
                    <Text style={ styles.blueColor }> 11</Text>
                  </Text>
                  {/*🇫🇷 La variable profile.game dans fr.json permet d'afficher "travel"*/}
                  {/*🇬🇧 The en.json variable  profile.game displays "travel -"*/}
                  <Text style={styles.activityStyle}>
                    {profile.travel}
                    <Text style={ styles.blueColor }> 2</Text>
                  </Text>
                </View>
              </View>
            </View>

            <View>
              {/*🇫🇷 La variable profile.hobbie dans fr.json permet d'afficher "Se connecter"*/}
              {/*🇬🇧 The en.json variable  profile.hobbie displays "login -"*/}
              <Text style={styles.title}>{profile.hobbies}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MemberScreen;
