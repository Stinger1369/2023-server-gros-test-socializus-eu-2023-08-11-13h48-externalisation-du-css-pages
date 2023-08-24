//🇫🇷 Page d'informations (à propos de nous) (Figma Frame 91)
//🇬🇧 News page (Figma Frame 91)

import {
  Text,
  ScrollView,
  Image,
  View,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useEffect, useState } from "react";
// import JSON from "../assets/json/en.json";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Bug from "../assets/images/ContactBug.svg";
import Facebook from "../assets/images/Facebook.svg";
import NonProfit from "../assets/images/non-profit.svg";
import StarUsers from "../assets/images/starUsers.svg";
import Idea from "../assets/images/idea_1.svg";
import FreeApp from "../assets/images/free_app.svg";

import styles from "./Styles/NewsCss";

//🇫🇷 L'image du haut et les icônes sont manquantes
//🇬🇧 The top picture and the three icons are missing

const News = (props) => {
  const { b2022_news } = props.scr;
  const navigation = useNavigation(); //avant c'etait json langue default

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ backgroundColor: "white" }}>
        <View style={ styles.backgroundImgStyle }>
          <ImageBackground
            source={require("../assets/images/rectangle230.png")}
            resizeMode={"cover"}
            style={{ flex: 1, padding: 10 }}
          ></ImageBackground>
        </View>
        {/* TITRE DE LA PAGE */}
        <Text style={styles.title}>{b2022_news.mainTitle}</Text>
        {/* Remplacer ce titre par "Socializus is ..." " */}
        {/* PARTIE AVEC LES LOGOS ET LES TEXTES */}

        {/* PREMIERE LIGNE */}
        <View style={styles.newslist}>
          <Image
            source={NonProfit}
            style={ styles.nonProfitImg }
            resizeMode="contain"
          />
          {/*Insrer ici la premiere image*/}
          <Text style={styles.txt}>{b2022_news.nonProfit}</Text>
          {/*Remplacer ce texte par la pemiere description */}
        </View>

        {/* DEUXIEME LIGNE */}
        <View style={styles.newslist}>
          <Image
            source={StarUsers}
            style={ styles.activeUsersImg }
            resizeMode="contain"
          />
          {/*Inserer ici la deuxieme image*/}
          <Text style={styles.txt}>{b2022_news.activeUsers}</Text>
          {/*Remplacer ce texte par la deuxieme description */}
        </View>

        {/* TROISIEME LIGNE */}
        <View style={styles.newslist}>
          <Image
            source={FreeApp}
            style={ styles.freeAppImg }
            resizeMode="contain"
          />
          {/*Inserer ici la troisieme image*/}
          <Text style={styles.txt}>{b2022_news.freeApp}</Text>
          {/*En cas de difficulte pour vous connecter ... */}
        </View>

        <View style={styles.helpParagraph}>
          <Image source={Idea} style={{ width: 26, height: 26 }} />
          {/*Inserer ici la troisieme image*/}
          <Text style={styles.txt}>{b2022_news.helpTheApp}</Text>
          {/*En cas de difficulte pour vous connecter ... */}
        </View>

        {/*LIEN VERS FACEBOOK*/}
        <TouchableOpacity
          style={styles.ButtonFB}
          onPress={() =>
            Linking.openURL(
              "https://www.facebook.com/groups/socializus"
              //Inserer le lien facebook a la place
            )
          }
        >
          <Image source={Facebook} style={{ width: 50, height: 51 }} />
          <View style={styles.row}>
            <Text style={styles.buttonTextFB}>{b2022_news.joinFB}</Text>
          </View>
        </TouchableOpacity>

        {/*LIEN VERS MY ACTIVITY*/}
        <TouchableOpacity
          style={styles.eventRedirectButton}
          onPress={() => navigation.goBack()}
        >
          <View>
            <Text style={styles.buttonText}>{b2022_news.findEvent}</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default News;
