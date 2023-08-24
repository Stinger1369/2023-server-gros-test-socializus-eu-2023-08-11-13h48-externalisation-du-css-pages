//*************** 🇫🇷 Composant MiddleNav Utiliser sur la page ActivityScreen 🇫🇷**********************//
//******************/ 🇬🇧 MiddleNav Composant  Used On the ActivityScreen page 🇬🇧 -------------------//

import { createBottomNavNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";

/****************************************IMPORT IMAGE EN SVG**************************************/

import ChatGroup from "../assets/images/chatGroup.svg";
import ChatNotif from "../assets/images/chatNotif.svg";
import Edit from "../assets/images/edit-info.svg";
import Position from "../assets/images/placeholder.svg";
import BubbleChat from "../assets/images/bubbleChat.svg";
import Users from "../assets/images/users.svg";
import Share from "../assets/images/share.svg";
import Json from "../assets/json/en.json"; // 🇫🇷 non utilisé 🇬🇧 not used
import setAddressAlertDialogVisible from "react-native";

const Stack = createNativeStackNavigator();

const MiddleNav = ({
  comments,
  display,
  setDisplay,
  isParticipating,
  connectedUserRole,
  addressAlertDialogVisible,
  setAddressAlertDialogVisible,
  scr,
}) => {
  const { activity, menu } = scr; //🇫🇷 Passsage de langue depuis ActivityScreen.js🇫🇷
  //🇬🇧 Language passed from ActivityScreen.js 🇬🇧

  const premiumRoles = ["admin", "moderator"];

  const handleMapReveal = () => {
    if (
      isParticipating ||
      (!isParticipating && premiumRoles.includes(connectedUserRole))
    ) {
      setDisplay(2);
    } else {
      setAddressAlertDialogVisible(!addressAlertDialogVisible);
      setDisplay(1);
    }
  };
const buttons = [ //🇫🇷 Tableau de boutons pour la navigation 🇫🇷
  {
    onPress: () => setDisplay(1),
    displayCondition: display === 1,
    source: Edit,
    text: activity.description,
    key: 'button1',
  },
  {
    onPress: () => handleMapReveal(),
    displayCondition: display === 2,
    source: Position,
    text: activity.address,
    key: 'button2',
  },
  {
    onPress: () => setDisplay(3),
    displayCondition: display === 3,
    source: BubbleChat,
    text: activity.chat,
    extraComponent: (
      <View style={styles.notificationBadge}>
        <Text style={styles.notificationBadgeText}>
          {comments.length}
        </Text>
      </View>
    ),
    key: 'button3',
  },
  {
    onPress: () => setDisplay(4),
    displayCondition: display === 4,
    source: Users,
    text: activity.participants,
    key: 'button4',
  },
];

  return (

    // <View style={styles.container}>
    //   {/********************************CHANGEMENT DE COULEUR POUR LA MIDDLE NAV AU TOUCH***************************************************/}
    //   <TouchableOpacity
    //     onPress={() => setDisplay(1)}
    //     style={[
    //       styles.nav,
    //       { backgroundColor: display === 1 ? "#FFA113" : "#59C09B" },
    //     ]}>
    //     <img src={Edit} />

    //     <Text style={styles.navText}>{activity.description}</Text>
    //   </TouchableOpacity>

    //   <TouchableOpacity
    //     onPress={() => handleMapReveal()}
    //     style={[
    //       styles.nav,
    //       {
    //         borderLeftWidth: 1,
    //         borderLeftColor: "white",
    //         backgroundColor: display === 2 ? "#FFA113" : "#59C09B",
    //       },
    //     ]}>
    //     <img src={Position} height={28} width={28} fill="white" />
    //     <Text style={styles.navText}>{activity.address}</Text>
    //   </TouchableOpacity>

    //   <TouchableOpacity
    //     onPress={() => setDisplay(3)}
    //     display={display}
    //     backgroundColor="black"
    //     style={[
    //       styles.nav,
    //       {
    //         borderLeftWidth: 1,
    //         borderLeftColor: "white",
    //         backgroundColor: display === 3 ? "#FFA113" : "#59C09B",
    //       },
    //     ]}>
    //     {" "}
    //     <View style={styles.notificationBadge}>
    //       <Text style={styles.notificationBadgeText}>
    //         {comments.length}
    //         {/*  met ta logique pour le nombre de commentaire*/}
    //       </Text>
    //     </View>
    //     <img src={BubbleChat} height={28} width={28} fill="white" />
    //     <Text style={styles.navText}>{activity.chat}</Text>
    //   </TouchableOpacity>

    //   <TouchableOpacity
    //     onPress={() => setDisplay(4)}
    //     style={[
    //       styles.nav,
    //       {
    //         borderLeftWidth: 1,
    //         borderLeftColor: "white",
    //         backgroundColor: display === 4 ? "#FFA113" : "#59C09B",
    //       },
    //     ]}>
    //     <img src={Users} />
    //     <Text style={styles.navText}>{activity.participants}</Text>
    //   </TouchableOpacity>
    // </View>

<View style={styles.container}>
    {buttons.map(button => ( //🇫🇷 Boucle sur le tableau de boutons 🇫🇷
      <TouchableOpacity
        key={button.key}
        onPress={button.onPress}
        style={[
          styles.nav,
          { backgroundColor: button.displayCondition ? "#FFA113" : "#59C09B" },
          button.additionalStyle
        ]}
      >
        {button.extraComponent}
        <img src={button.source} height={28} width={28} fill="white" />
        <Text style={styles.navText}>{button.text}</Text>
      </TouchableOpacity>
    ))}
  </View>

  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: "5%",
    flexDirection: "row",
    width: "95%",
    height: 70,
    overflow: "hidden",
    borderRadius: 50,
    backgroundColor: "#FFA113",
    justifyContent: "space-evenly",
  },

  nav: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "white",
  },

  navText: {
    fontWeight: "bold",
    fontSize: 11,
    color: "white",
  },
  notificationBadge: {
    position: "absolute",
    marginLeft: 25,
    marginBottom: 10,
    backgroundColor: "red",
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationBadgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default MiddleNav;
