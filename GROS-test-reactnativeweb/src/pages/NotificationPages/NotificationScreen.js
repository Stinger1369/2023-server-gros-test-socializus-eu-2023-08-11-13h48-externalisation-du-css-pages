import React, { useState } from "react";
import { Text, View, Alert, TouchableOpacity } from "react-native";
import styles from "../Styles/NotificationScreenCss";
import Info from "./Info";
import Manage from "./Manage";
import Interactions from "./Interactions";
import { useNavigation } from "@react-navigation/native";
const NotifScreen = () => {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonPress = (buttonName) => {
    setActiveButton(buttonName);
    Alert.alert(`${buttonName} button pressed`);
  };

  const navigation = useNavigation();

  return (
    <>
      <View style={styles.Notifcontainer}>
        <TouchableOpacity
          style={[
            styles.button,
            activeButton === "Info" && { backgroundColor: "#59c09b" },
          ]}
          onPress={() => handleButtonPress("Info")}
        >
          <Text style={styles.text}>Info</Text>
        </TouchableOpacity>

        <View style={[styles.separator, { alignSelf: "center" }]} />

        <TouchableOpacity
          style={[
            styles.button,
            activeButton === "Manage" && { backgroundColor: "#59c09b" },
          ]}
          onPress={() => handleButtonPress("Manage")}
        >
          <Text style={styles.text}>Manage</Text>
        </TouchableOpacity>

        <View style={[styles.separator, { alignSelf: "center" }]} />

        <TouchableOpacity
          style={[
            styles.button,
            activeButton === "Interactions" && { backgroundColor: "#59c09b" },
          ]}
          onPress={() => handleButtonPress("Interactions")}
        >
          <Text style={styles.text}>Interactions</Text>
        </TouchableOpacity>
      </View>
      <View>
        {activeButton === "Info" && <Info />}
        {activeButton === "Manage" && <Manage />}
        {activeButton === "Interactions" && <Interactions />}
      </View>
    </>
  );
};

export default NotifScreen;
