//🇫🇷 Page de profil - onglet Interactions (activités et interventions) (Figma Frame 71)
//🇬🇧 Profile Page - Interactions tab (Figma Frame 71)

import { Text, ScrollView, Image, StyleSheet, View, TouchableOpacity } from "react-native";
import styles from "./Styles/ProfileActivitiesCss"
//Image assets
import Afterwork from "../assets/images/afterwork.svg";
import Apero from "../assets/images/apero.svg";
import Linguistic from "../assets/images/linguistic.svg";
import Movie from "../assets/images/movie.svg";
import Music from "../assets/images/music.svg";
import Discoballs from "../assets/images/discoballs.svg";
import Sports from "../assets/images/sports.svg";
// import Bellefemme from "../assets/images/bellefemme.png";
// import Star from "../assets/images/star.svg";

import JSON from "../assets/json/en.json";

const { profile } = JSON;

const ProfileActivities = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
      <Text style={styles.title}>{profile.b2022_upcoming}: {" "}</Text>
          <View style={styles.tab}>
            <View style={styles.subTitle}>
              <Text style={ styles.subTxt }></Text>
              <Text style={ styles.subTxtTwo }>
              {/*🇫🇷 La variable profile.event dans fr.json permet d'afficher "Evénement"*/}
              {/*🇬🇧 The en.json variable profile.event displays "Event"*/}
                {profile.event}
                </Text>
              <Text style={ styles.profileRegisteredTxt }>
              {/*🇫🇷 La variable profile.registered dans fr.json permet d'afficher "Inscrit"*/}
              {/*🇬🇧 The en.json variable profile.registered displays "Registered"*/}
                {profile.registered}
                </Text>
              <Text style={ styles.organizerTxt }>
              {/*🇫🇷 La variable profile.organizer dans fr.json permet d'afficher "Organiseur"*/}
              {/*🇬🇧 The en.json variable profile.organizer displays "Organize"*/}
                {profile.organizer}
                </Text>
            </View>
            {/*FR Cette liste est en dur. Voir comment récupérer ces données et afficher les 5 dernières.*/}
            {/*GB The list is hardcoded. This data should come from a user and be the 5 latest.*/}
            <View style={styles.activitiesInfo}>
              <Text style={[{ marginLeft: "2%" }, styles.font]}>12.10.21</Text>
              <Text style={[{ color: "#59C19C", fontWeight: "500" }, styles.font]}>Party in my flat with friends...</Text>
              <Text style={[{ marginRight: "6%" }, styles.font]}>12/16</Text>
              <Text style={[{ marginRight: "3%" }, styles.font]}>Karine</Text>
            </View>
            <View style={styles.activitiesInfo}>
              <Text style={[{ marginLeft: "2%" }, styles.font]}>12.10.21</Text>
              <Text style={[{ color: "#59C19C", fontWeight: "500" }, styles.font]}>Party in my flat with friends...</Text>
              <Text style={[{ marginRight: "6%" }, styles.font]}>12/16</Text>
              <Text style={[{ marginRight: "3%" }, styles.font]}>Alexanderio</Text>
            </View>
            <View style={styles.activitiesInfo}>
              <Text style={[{ marginLeft: "2%" }, styles.font]}>12.10.21</Text>
              <Text style={[{ color: "#59C19C", fontWeight: "500" }, styles.font]}>Party in my flat with friends...</Text>
              <Text style={[{ marginRight: "6%" }, styles.font]}>12/16</Text>
              <Text style={[{ marginRight: "3%" }, styles.font]}>steeve</Text>
            </View>
            <View style={styles.activitiesInfo}>
              <Text style={[{ marginLeft: "2%" }, styles.font]}>12.10.21</Text>
              <Text style={[{ color: "#59C19C", fontWeight: "500" }, styles.font]}>Party in my flat with friends...</Text>
              <Text style={[{ marginRight: "6%" }, styles.font]}>12/16</Text>
              <Text style={[{ marginRight: "3%" }, styles.font]}>Astrid</Text>
            </View>
            <View style={styles.activitiesInfo}>
              <Text style={[{ marginLeft: "2%" }, styles.font]}>12.10.21</Text>
              <Text style={[{ color: "#59C19C", fontWeight: "500" }, styles.font]}>Party in my flat with friends...</Text>
              <Text style={[{ marginRight: "6%" }, styles.font]}>12/16</Text>
              <Text style={[{ marginRight: "3%" }, styles.font]}>Paul</Text>
            </View>
          </View>
        <View style={styles.div}>
          <Text style={styles.title}>
            {/*🇫🇷 La variable profile.lastInterv dans fr.json permet d'afficher "Les 5 dernères intervention de "*/}
            {/*🇬🇧 The en.json variable profile.lastInterv displays "Last 5 interventions of"*/}
            {profile.lastInterv} Karen :{" "}
          </Text>
          <View style={styles.tab}>
            <View style={styles.subTitle}>
              <Text style={ styles.dateTxt }>
              {/*🇫🇷 La variable profile.date dans fr.json permet d'afficher "Date"*/}
              {/*🇬🇧 The en.json variable profile.date displays "Date"*/}
                {profile.date}
                </Text>
              <Text style={ styles.eventTxt }>
              {/*🇫🇷 La variable profile.event dans fr.json permet d'afficher "Evénement"*/}
              {/*🇬🇧 The en.json variable profile.event displays "Event"*/}
              {profile.event}
                </Text>
              <Text style={ styles.registeredTxtTwo  }>
              {/*🇫🇷 La variable profile.registered dans fr.json permet d'afficher "Inscrit"*/}
              {/*🇬🇧 The en.json variable profile.registered displays "Registered"*/}
                {profile.registered}
              </Text>
              <Text style={ styles.organizerTxt }>
              {/*🇫🇷 La variable profile.organizer dans fr.json permet d'afficher "Organiseur"*/}
              {/*🇬🇧 The en.json variable profile.organizer displays "Organize"*/}
                {profile.organizer}
              </Text>
            </View>
            <View style={styles.activitiesInfo}>
              <Text style={[{ marginLeft: "2%" }, styles.font]}>12.10.21</Text>
              <Text style={[{ color: "#59C19C", fontWeight: "500" }, styles.font]}>
                Party in my flat with friends...
              </Text>
              <Text style={[{ marginRight: "6%" }, styles.font]}>12/16</Text>
              <Text style={[{ marginRight: "3%" }, styles.font]}>Chat</Text>
            </View>
            <View style={styles.activitiesInfo}>
              <Text style={[{ marginLeft: "2%" }, styles.font]}>12.10.21</Text>
              <Text style={[{ color: "#59C19C", fontWeight: "500" }, styles.font]}>
                Party in my flat with friends...
              </Text>
              <Text style={[{ marginRight: "6%" }, styles.font]}>12/16</Text>
              <Text style={[{ marginRight: "3%" }, styles.font]}>Chat</Text>
            </View>
            <View style={styles.activitiesInfo}>
              <Text style={[{ marginLeft: "2%" }, styles.font]}>12.10.21</Text>
              <Text style={[{ color: "#59C19C", fontWeight: "500" }, styles.font]}>
                Party in my flat with friends...
              </Text>
              <Text style={[{ marginRight: "6%" }, styles.font]}>12/16</Text>
              <Text style={[{ marginRight: "3%" }, styles.font]}>Members</Text>
            </View>
            <View style={styles.activitiesInfo}>
              <Text style={[{ marginLeft: "2%" }, styles.font]}>12.10.21</Text>
              <Text style={[{ color: "#59C19C", fontWeight: "500" }, styles.font]}>
                Party in my flat with friends...
              </Text>
              <Text style={[{ marginRight: "6%" }, styles.font]}>12/16</Text>
              <Text style={[{ marginRight: "3%" }, styles.font]}>Chat</Text>
            </View>
            <View style={styles.activitiesInfo}>
              <Text style={[{ marginLeft: "2%" }, styles.font]}>12.10.21</Text>
              <Text style={[{ color: "#59C19C", fontWeight: "500" }, styles.font]}>
                Party in my flat with friends...
              </Text>
              <Text style={[{ marginRight: "6%" }, styles.font]}>12/16</Text>
              <Text style={[{ marginRight: "3%" }, styles.font]}>Members</Text>
            </View>
          </View>
        </View>
      </View>
      <View containerStyle={styles.container}>
        <View style={styles.whatIHaveDone}>
        {/*🇫🇷 La variable profile.whatIdo dans fr.json permet d'afficher "Ce que j'ai fait :"*/}
        {/*🇬🇧 The en.json variable profile.whatIdo displays "what I have done :"*/}
          <Text style={styles.title}>{profile.activitiesDone}</Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "5%",
        }}
      >
        <Afterwork width={30} height={30} />
        <Apero width={30} height={30} />
        <Linguistic width={30} height={30} />
        <Movie width={30} height={30} />
        <Music width={30} height={30} />
        <Discoballs width={30} height={30} />
        <Sports width={30} height={30} />
      </View>
    </ScrollView>
  );
};

export default ProfileActivities;


