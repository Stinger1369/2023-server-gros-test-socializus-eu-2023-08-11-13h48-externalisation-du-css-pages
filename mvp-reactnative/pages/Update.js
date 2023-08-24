import { useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking } from "react-native";
import styles from "./Styles/UpdateCss"
// import axios from "axios";
// import Json from "../assets/json/en.json";
// // import Fields from "../components/Fields";
// import en from "../assets/json/en.json";
import LogoSocializus from "../assets/images/logo-Socializus.svg";
import GooglePlay from "../assets/images/google-play.svg";
import AppStore from "../assets/images/app-store.svg";
const Update = () => {
  return (
    <View style={styles.container}>
      <View>
        <LogoSocializus style={styles.img}/>
      </View>
      <View>
       <Text style={styles.txt}>Don't forget to Update</Text>
      </View>
      <View>
        <TouchableOpacity style={styles.ButtonFB} 
                onPress={() =>
                    Linking.openURL(
                    "https://apps.apple.com/fr/app/socializus/id1492352535"
                    //Inserer le lien de Socializus dans AppStore
                    )
        }>
         <AppStore style={styles.logo} />
          {/*Inserer ici une image*/}
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={styles.ButtonFB} 
                onPress={() =>
                    Linking.openURL(
                    "https://play.google.com/store/apps/details?id=com.social.firebase.example.socializus&gl=FR"
                    //Inserer le lien Socializus dans PlayStore
                    )
        }>
          <GooglePlay style={styles.logo} />
           {/*Inserer ici une image*/}
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Update

