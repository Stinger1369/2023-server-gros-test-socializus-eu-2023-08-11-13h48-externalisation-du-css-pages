/* 🇫🇷 Composant d'affichage lié aux détails des participants en cliquant sur Participants (Frame 44) 🇫🇷 
/* 🇬🇧 Display component related to details of particiapants cliking on Participants (Frame 44) 🇬🇧 */

import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import styles from "./Styles/ListsOfParticipantsCss"
import { useNavigation } from "@react-navigation/native";

const ListOfParticipants = ({ }) => {

  const navigation = useNavigation();

  return (
    <View style={styles.CardContainer}>
      <View style={styles.knowledgeCard}>
        <Image
          style={styles.userAvatar}
          source={require("../assets/images/randomUser.png")}
        />
        <Text style={styles.userName}> Alexanderio </Text>
        <Text style={styles.userStatut}></Text>
        <TouchableOpacity style={styles.crossBtn}></TouchableOpacity>
      </View>
    </View>
  );
}

export default ListOfParticipants;

