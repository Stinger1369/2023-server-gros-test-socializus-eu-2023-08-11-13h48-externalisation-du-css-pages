//*************** 🇫🇷 Composant MiddleNav Utiliser sur la page ActivityScreen 🇫🇷**********************//
//******************/ 🇬🇧 MiddleNav Composant  Used On the ActivityScreen page 🇬🇧 -------------------//

import { createBottomNavNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import styles from "./Styles/MiddleNavCss"

/****************************************IMPORT IMAGE EN SVG**************************************/

import ChatGroup from "../assets/images/chatGroup.svg";
import ChatNotif from "../assets/images/chatNotif.svg";
import Edit from "../assets/images/edit-info.svg";
import Position from "../assets/images/placeholder.svg";
import BubbleChat from "../assets/images/bubbleChat.svg";
import Users from "../assets/images/users.svg";
import Share from "../assets/images/share.svg";
import Json from "../assets/json/en.json";
import setAddressAlertDialogVisible from "react-native";


const Stack = createNativeStackNavigator();

const { middleNav, menu } = Json;

const MiddleNav = ({
  display,
  setDisplay,
  isParticipating,
  addressAlertDialogVisible,
  setAddressAlertDialogVisible
}) => {

  const handleMapReveal = () => {
    if(isParticipating) {
      setDisplay(2)
    } else {
    setAddressAlertDialogVisible(!addressAlertDialogVisible);
    setDisplay(1);
    }
  }

  return (
    <View style={styles.container}>
      {/********************************CHANGEMENT DE COULEUR POUR LA MIDDLE NAV AU TOUCH***************************************************/}
      <TouchableOpacity onPress={() => setDisplay(1)} style={[styles.nav, {backgroundColor: display === 1 ? "#FFA113" : "#59C09B" }]}>
        <Edit />
           
        <Text style={styles.navText}>Description</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleMapReveal()}
        style={[styles.nav, { borderLeftWidth: 1, borderLeftColor: "white", backgroundColor: display === 2 ? "#FFA113" : "#59C09B" }]}
      >
        <Position height={28} width={28} fill="white" />
        <Text style={styles.navText}>Address</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setDisplay(3)}
        display={display}
        backgroundColor="black"
        style={[styles.nav, { borderLeftWidth: 1, borderLeftColor: "white", backgroundColor: display === 3 ? "#FFA113" : "#59C09B" }]}
      >
        <BubbleChat height={28} width={28} fill="white" />
        <Text style={styles.navText}>Chat</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setDisplay(4)}
        style={[styles.nav, { borderLeftWidth: 1, borderLeftColor: "white", backgroundColor: display === 4 ? "#FFA113" : "#59C09B" }]}
      >
        <Users />
        <Text style={styles.navText}>Participants</Text>
      </TouchableOpacity>
    </View>

  );
};


export default MiddleNav;
