import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  Image,
} from "react-native";
import styles from "./Styles/UpdateCss";
import Logo from "../assets/images/logo-Socializus.svg";
import GooglePlay from "../assets/images/google-play.svg";
import AppStore from "../assets/images/app-store.svg";
import Json from "../assets/json/en.json";
import { useSelector } from "react-redux";

const Update = () => {
  //🇫🇷 Page de mise à jour de l'application
  const { updatescreen } = Json;
  const langue = useSelector((state) => state.langue);

  return (
    <ScrollView style={styles.container}>
      <Image source={Logo} style={styles.img} resizeMode="contain" />

      <Text style={styles.txt}>{langue?.updatescreen?.text}</Text>

      <TouchableOpacity //style={styles.ButtonFB}
        onPress={() =>
          Linking.openURL(
            "https://apps.apple.com/fr/app/socializus/id1492352535"
            //Inserer le lien de Socializus dans AppStore
          )
        }
      >
        <Image source={AppStore} style={styles.logo} resizeMode="contain" />
        {/*Inserer ici une image*/}
      </TouchableOpacity>

      <TouchableOpacity //style={styles.ButtonFB}
        onPress={() =>
          Linking.openURL(
            "https://play.google.com/store/apps/details?id=com.social.firebase.example.socializus&gl=FR"
            //Inserer le lien Socializus dans PlayStore
          )
        }
      >
        <Image source={GooglePlay} style={styles.logo} resizeMode="contain" />
        {/*Inserer ici une image*/}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Update;
