//🇫🇷 Page de profil - onglet informations (Figma Frame 70)
//🇬🇧 Profile Page - info tab (Figma Frame 70)

import React from "react";
import { Text, ScrollView, Image, StyleSheet, View, TouchableOpacity} from "react-native";
import styles from "./Styles/ProfileInfoCss"
//Assets
import Flagfrance from "../assets/flags-svg/flagfrance.svg"; 
import Flaguk from "../assets/flags-svg/flaguk.svg"; 
import Flagspain from "../assets/flags-svg/flagspain.svg"; 
import Portugal from "../assets/flags-svg/portugal.svg"; 
import Italy from "../assets/flags-svg/italy.svg"; 
import Flaggerman from "../assets/flags-svg/flaggerman.svg"; 
import Afterwork from "../assets/images/afterwork.svg";
import Apero from "../assets/images/apero.svg";
import Linguistic from "../assets/images/linguistic.svg";
import Movie from "../assets/images/movie.svg";
import Music from "../assets/images/music.svg";
import Discoballs from "../assets/images/discoballs.svg";
import Sports from "../assets/images/sports.svg";
import Bellefemme from "../assets/images/bellefemme.png";
import Star from "../assets/images/star.svg";

import JSON from "../assets/json/en.json";
// Variables declarée dans le fichier en.json permettant la traduction des différentes langues
const { profile } = JSON;

const ProfileInfo = () => {
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
      <Text style={styles.aboutDescription}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s. Lorem Ipsum is simply dummy text of the prsinting and
        typesetting industry. lorem Ipsum has been the industry's standard dummy
        text ever since the 1500s.
      </Text>

      <View style={styles.language}>
        <View style={ styles.flexStyle }>
          <Text style={ styles.languageTxt  }>
            {profile.nativeLang}
          </Text>
          <Flagfrance width={20} height={20} />
        </View>
      </View>
      <View style={styles.language}>
        <Text style={ styles.languageTxt }>
          {/* profile.spokenLang de en.json permet d'afficher les drapeaux des pays */}
          {profile.spokenLang}
        </Text>
        <Flaguk width={20} height={20} />
        <Flagspain width={20} height={20} />
        <Flaggerman width={20} height={20} />
      </View>
      {/*************************************IDENTIFICATION USER****************************/}
      <View style={styles.situationInfo}>
        <View style={ styles.flexStyle }>
          <Text style={styles.situation}>
            {profile.city} <Text> :</Text> <Text style={styles.blueText}> Paris</Text>
          </Text>
        </View>
        <Text style={styles.situation}>
          {/* profile.children de en.json permet de donner le nombre d'enfant */}
          {profile.children} <Text>:</Text>
          <Text style={styles.blueText}> Secret</Text>
        </Text>
        <Text style={styles.situation}>
          {/* profile.tobacco de en.json permet d'informer si l'on fume ou pas */}
          {profile.tobacco} <Text>:</Text> <Text style={styles.blueText}> Never</Text>
        </Text>

        <Text style={styles.situation}>
          {/* profile.alcohol de en.json permet d'informer si l'on boit de l'alcool ou pas */}
          {profile.alcohol}<Text>:</Text>
          <Text style={styles.blueText}> Sometimes</Text>
        </Text>
         {/* profile.tobacco de en.json permet d'informer si l'on fume ou pas */}
        <Text style={styles.situation}>
          {/* profile.university de en.json permet d'informer le niveau d'etude universitaire */}
          {profile.university}<Text>:</Text>
          <Text style={styles.blueText}> Secret</Text>
        </Text>
        <Text style={styles.situation}>
          {/* profile.studies de en.json permet d'informer le niveau scolaire */}
          {profile.studies}<Text>:</Text>
          <Text style={styles.blueText}> Secret</Text>
        </Text>
      </View>

      {/*************************************HOBBIES USER ****************************/}

      <View style={styles.activityInfo}>
        <View containerStyle={styles.container}>
          <View style={styles.whatILoveToDo}>
            {/* profile.hobbies permet de lister les hobbies de l'utilisateur */}
            <Text style={styles.title}>{profile.hobbies}</Text>
          </View>
        </View>
      </View>
      <View style={ styles.hobbiesContainer }>
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

export default ProfileInfo;



