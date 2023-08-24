/*🇫🇷 Page du QR code(Frame 102 Figma) 
Il faudra générer un PDF contenant le QR code.
Le QR code peut se générer à partir d'une string...mettre le nom de l'utilisateur comme base de génération du code?
*/
/*🇬🇧 QR Code Page (Frame 102 Figma)
Need to generate a PDF with the QR code as content.
The QR code can be generated from a string...put user name as the code generation starting point?
*/
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, ScrollView} from "react-native";
import styles from "./Styles/QrCodeScreenCss"
import JSON from "../assets/json/en.json"; 
import Portrait from "../assets/images/portrait.svg";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import QrCode from "react-native-qrcode-svg";
//FR Variable issue du fichier en.json, permettant de faire la traduction des différentes langues
//GB Variable from the en.json file, allowing the translation of the different languages
const { b2022_scanQR } = JSON;

const QrCodeScreen = () => {
  const [input, setInput] = useState("");
  const [qrValue, setQrValue] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={ styles.scrollviewContainer }>
        <View>
          <View style={styles.photo}>
            {/*FR portrait de l'utilisateur  */}
            {/*GB user profile  */}
            <Portrait style={ styles.portraitStyle } />
            <View style={styles.trophee}>
              <Text>b</Text>
            </View>
            {/*FR le nom de l'utilisateur */}
            {/*GB user name  */}
            <Text style={ styles.usernameTxt }>Karen Jones</Text>
          </View>
          {/*FR texte montrant le Qr code à l'organisateur */}
          {/*GB text showing the Qr code to the organizer */}
          <View style={styles.qrView}>
            <Text style={ styles.qrViewTxt }>{b2022_scanQR.b2022_showQR}</Text>
          </View>
        </View>
        <View style={styles.qr}>
          <View style={styles.qrContent}>
            {/*FR erreur de Qr code */}
            {/*GB Qr code error  */}
            <QrCode value={qrValue ? qrValue : b2022_scanQR.b2022_scanError} size={220} color="white" backgroundColor="#000"/>
          </View>
          <TouchableOpacity onPress={() => console.log("PDF creation ongoing")} style={styles.button}>
            <Text style={ styles.downloadTxt }>
              Download as PDF
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default QrCodeScreen;

