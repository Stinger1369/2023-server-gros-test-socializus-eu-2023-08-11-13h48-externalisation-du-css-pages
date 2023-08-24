//🇫🇷 Frame Figma manquante pour cette page
//🇬🇧 Missing Figma frame for this page
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import styles from "./Styles/QrScanScreenCss"
import JSON from "../assets/json/en.json";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { BarCodeScanner } from "expo-barcode-scanner";
//FR variable json de en.json permettant de faire la traduction des différentes langues
//GB json variable of en.json allowing to translate the different languages
const { b2022_scanQR } = JSON;

const QrScanScreen = () => {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("Not scanned yet");

  //GB Request camera permission
  //FR Demander l'autorisation de caméra
  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status == "granted");
    })();
  };

  useEffect(() => {
    askForCameraPermission()
  }, []);

  //FR Ce qui se passe quand vous scanner le code Qr
  //GB What happens when we scan the code Qr
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data);
    console.log("Type: " + "\nData:" + data);
  };

  //FR Vérifier les permissions et retourner les écrans correspondants
  //GB Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.cameraPermissionText}>
          {b2022_scanQR.cameraPermission}
        </Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        {/*FR Réfus du scan Qr code */}
        {/*GB Qr code scan denied */}
        <Text style={styles.cameraDeniedText}>{b2022_scanQR.cameraDenied}</Text>
        <TouchableOpacity title={"Allow camera"} onPress={() => askForCameraPermission}/>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.barCodeBox}>
        <View style={[styles.customFrame, { top: 0 }]}></View>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          width={"90%"}
          height= {500}
        />
        <View style={styles.customFrame}></View>
      </View>
      <Text style={styles.mainText}>{text}</Text>
      {scanned && (
        <TouchableOpacity onPress={() => setScanned(false)} style={styles.scanAgainButton}>
          {/*FR Message de redemander le scan Qr code */}
          {/*GB Message to ask for Qr code scan again */}
          <Text style={styles.scanAgainText}>{b2022_scanQR.scanAgain}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default QrScanScreen;


