//🇫🇷 Page de contact (Figma Frame 25 MVP)
//🇬🇧 Contact Page (Figma Frame 25 MVP)

import React, { useEffect, useState } from "react";
/*🇫🇷 Fait fonctionner les liens vers Whatsapp 
🇬🇧 This component manages the external links to Whatsapp groups*/
import { StyleSheet, Text, View, Linking, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import styles from "./Styles/ContactScreenCss"
import JSON from "../assets/json/en.json";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

//🇫🇷 Import des images SVG
//🇬🇧 SVG picture imports
import Svg, { Use } from "react-native-svg";
import Bug from "../assets/images/ContactBug.svg";
import Orga from "../assets/images/ContactOrga.svg";
import Phone from "../assets/images/ContactPhone.svg";
import Discord from "../assets/images/Discord.svg";
import Telegram from "../assets/images/Telegram.svg";
import Facebook from "../assets/images/Facebook.svg";

const { contact } = JSON;

const ContactScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={ styles.scrollviewContainer }>
        <View style={ styles.txtviewContainer }>
          <Text style={styles.txt}>{contact.label_1}</Text>
          {/*🇫🇷 La variable contact.label_1 dans en.json permet d'afficher "En cas de difficulté pour vous connecter*/}
          {/*🇬🇧 The en.json variable contact.label_1 displays "Contact us by phone or WhatsApp if you encounter connection problems." */}
          <Text style={styles.txt}>{contact.label_2}</Text>
          {/*🇫🇷 La variable contact.label_2 dans en.json permet d'afficher "Differents groupes Whatsapp sont disponibles..."*/}
          {/*🇬🇧 The en.json variable contact.label_2 displays "Many WhatsApp groups available:" */}
          {/*🇫🇷 Liens vers les groupes avec icônes*/}
          {/*🇬🇧 Links to Whatsapp groups with icons*/}
          <View style={styles.phoneIcones}>
            <Phone onPress={() => Linking.openURL("https://chat.whatsapp.com/LCy2cTDrQ1SC9fwtjMm7XZ")}/>
            <Orga onPress={() => Linking.openURL("https://chat.whatsapp.com/KtR79S8Obfs3WTPTIBsoCm")}/>
            <Bug onPress={() => Linking.openURL("https://chat.whatsapp.com/ELTWw58icvs6BAujghGg0R")}/>
          </View>
          
          {/*🇫🇷 Variables associées au fichier en.json en dessous: contact.photo: "Photo", contact.orga: "Orga", contact.bug: "Bug"*/}
          {/*🇬🇧 Variables related to en.json file below: contact.photo: "Photo", contact.orga: "Orga", contact.bug: "Bug"*/}
          <View style={styles.subtitle}>
            <Text style={styles.line}>{contact.photo}</Text>
            <Text style={styles.line1}>{contact.orga}</Text>
            <Text style={styles.line}>{contact.bug}</Text>
          </View>

          {/*🇫🇷 Liens Telegram et Facebook manquants*/}
          {/*🇬🇧 Facebook and Telegram links missing*/}
          <View style={styles.phoneIcones}>
            <Discord onPress={() => Linking.openURL("https://discord.gg/bJsFfG7ntU")}/>
            <Telegram onPress={() => Linking.openURL("https://chat.whatsapp.com/KtR79S8Obfs3WTPTIBsoCm")}/>
            <Facebook onPress={() => Linking.openURL("https://chat.whatsapp.com/ELTWw58icvs6BAujghGg0R")}/>
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
            <Text style={styles.txt}>
              {contact.label_3}
            </Text>
              {/*🇫🇷 La variable contact.label3 de en.json contient "Le numero de telephone"*/}
              {/*🇬🇧 The en.json variable contact.label3 displays "The contact phone number is paid" */}
            <Text style={styles.txt}>
              {contact.phone}
            </Text>
            <Text style={styles.txt}>{contact.label_4}</Text>
            {/*🇫🇷 La variable contact.label4 de en.json contient "C'est un service..."*/}
            {/*🇬🇧 The en.json variable contact.label4  displays "This service helps us redirect the phone numbers of people helping you between 10 AM and 6 PM. It's also a way to donate as charges may apply." */}
            {}
            <Text style={styles.txt}>{contact.label_5}</Text>
            {/*"La variable contact.label5 de en.jsonEn vous remerciant de votre compréhension"*/}
            {/*🇬🇧 The en.json variable contact.label5 displays "Thank you for your understanding" */}
            {}
            <Text style={styles.txt}>{contact.label_6}</Text>
            {/*"La variable contact.label6 de en.json L'equipe Socializus"*/}
            {/*🇬🇧 The en.json variable contact.label6 displays "Team Socializus" */}
            {}
          </View>
        </View>

        <TouchableOpacity onPress={() => {navigation.navigate("Contact Us")}}></TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContactScreen;


