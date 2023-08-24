//🇫🇷 Page de contact (Figma Frame 25 MVP)
//🇬🇧 Contact Page (Figma Frame 25 MVP)

import React, { useEffect, useState } from "react";
/*🇫🇷 Fait fonctionner les liens vers Whatsapp 
🇬🇧 This component manages the external links to Whatsapp groups*/
import {
  Text,
  View,
  Linking,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
// import JSON from "../assets/json/en.json";

//import { useNavigation } from "@react-navigation/native";

import axios from "axios";

//🇫🇷 Import des images SVG
//🇬🇧 SVG picture imports
import Svg, { Use } from "react-native-svg";

import Bug from "../assets/images/ContactBug.svg";
import Orga from "../assets/images/ContactOrga.svg";
import Phone from "../assets/images/ContactPhone.svg";
import Discord from "../assets/images/Discord.svg";
import Telegram from "../assets/images/telegram.svg";
import Facebook from "../assets/images/Facebook.svg";

import styles from "./Styles/ContactScreenCss";

const ContactScreen = (props) => {
  const { contact } = props.scr; //avant c'etait json langue default
  ///const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ backgroundColor: "white" }}>
        <View
          style={{ backgroundColor: "white", width: "100%", height: "100%" }}
        >
          <Text style={styles.txt}>{contact.label_1}</Text>
          {/*🇫🇷 La variable contact.label_1 dans en.json permet d'afficher "En cas de difficulté pour vous connecter*/}
          {/*🇬🇧 The en.json variable contact.label_1 displays "Contact us by phone or WhatsApp if you encounter connection problems." */}
          <Text style={styles.txt}>{contact.label_2}</Text>
          {/*🇫🇷 La variable contact.label_2 dans en.json permet d'afficher "Differents groupes Whatsapp sont disponibles..."*/}
          {/*🇬🇧 The en.json variable contact.label_2 displays "Many WhatsApp groups available:" */}
          {/*🇫🇷 Liens vers les groupes avec icônes*/}
          {/*🇬🇧 Links to Whatsapp groups with icons*/}
          <View style={styles.phoneIcones}>
            <Image
              style={{ height: 51, width: 50 }}
              source={Phone}
              onClick={() =>
                Linking.openURL(
                  "https://chat.whatsapp.com/LCy2cTDrQ1SC9fwtjMm7XZ"
                )
              }
            />
            <Image
              style={{ height: 51, width: 50 }}
              source={Orga}
              onClick={() =>
                Linking.openURL(
                  "https://chat.whatsapp.com/KtR79S8Obfs3WTPTIBsoCm"
                )
              }
            />
            <Image
              style={{ height: 51, width: 50 }}
              source={Bug}
              onClick={() =>
                Linking.openURL(
                  "https://chat.whatsapp.com/ELTWw58icvs6BAujghGg0R"
                )
              }
            />
          </View>

          {/*🇫🇷 Variables associées au fichier en.json en dessous: contact.photo: "Photo", contact.orga: "Orga", contact.bug: "Bug"*/}
          {/*🇬🇧 Variables related to en.json file below: contact.photo: "Photo", contact.orga: "Orga", contact.bug: "Bug"*/}
          <View style={styles.subtitle}>
            <Text style={styles.line}>{contact.picture}</Text>
            <Text style={styles.line1}>{contact.orga}</Text>
            <Text style={styles.line}>{contact.bug}</Text>
          </View>

          {/*🇫🇷 Liens Telegram et Facebook manquants*/}
          {/*🇬🇧 Facebook and Telegram links missing*/}
          <View style={styles.phoneIcones}>
            <Image
              style={{ height: 51, width: 50 }}
              source={Discord}
              onClick={() => Linking.openURL("https://discord.gg/bJsFfG7ntU")}
            />
            <Image
              style={{ height: 75, width: 74 }}
              source={Telegram}
              onClick={() =>
                Linking.openURL(
                  "https://chat.whatsapp.com/KtR79S8Obfs3WTPTIBsoCm"
                )
              }
            />
            <Image
              style={{ height: 78.02, width: 76.5 }}
              source={Facebook}
              onClick={() =>
                Linking.openURL("https://www.facebook.com/groups/socializus")
              }
            />
          </View>

          <View style={styles.subtitle}>
            <Text style={styles.line}>Discord</Text>
            <Text style={styles.line1}>Telegram</Text>
            <Text style={styles.line}>Facebook</Text>
          </View>

          {/*<View style={{alignItems:"center", marginTop:"10%"}}>
          <Discord onPress={() => Linking.openURL("https://discord.gg/bJsFfG7ntU")}/>
          </View>
          <View style={{alignItems:"center"}}>
            <Text style={styles.line}>{contact.discord}</Text>
          </View>
          <View>
          <Telegram onPress={() => Linking.openURL("https://discord.gg/bJsFfG7ntU")}/>
          </View>
          <View>
          <Facebook onPress={() => Linking.openURL("https://discord.gg/bJsFfG7ntU")}/>
          </View>*/}

          <View style={styles.phoneNumber}>
            <Text style={styles.txt}>{contact.label_3}</Text>
            {/*🇫🇷 La variable contact.label3 de en.json contient "Le numero de telephone"*/}
            {/*🇬🇧 The en.json variable contact.label3 displays "The contact phone number is paid" */}
            <Text style={styles.txt}>{contact.phone}</Text>
            <Text style={styles.txt}>{contact.label_4}</Text>
            {/*🇫🇷 La variable contact.label4 de en.json contient "C'est un service..."*/}
            {/*🇬🇧 The en.json variable contact.label4  displays "This service helps us redirect the phone numbers of people helping you between 10 AM and 6 PM. It's also a way to donate as charges may apply." */}
            <Text style={styles.txt}>{contact.label_5}</Text>
            {/*"La variable contact.label5 de en.jsonEn vous remerciant de votre compréhension"*/}
            {/*🇬🇧 The en.json variable contact.label5 displays "Thank you for your understanding" */}
            <Text style={styles.txt}>{contact.label_6}</Text>
            {/*"La variable contact.label6 de en.json L'equipe Socializus"*/}
            {/*🇬🇧 The en.json variable contact.label6 displays "Team Socializus" */}
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            /*navigation.navigate("Contact Us") */
          }}
        ></TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContactScreen;
