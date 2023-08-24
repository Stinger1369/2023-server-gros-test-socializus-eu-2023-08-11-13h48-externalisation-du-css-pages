/* FR - Voilà le petit composant qui affichera les ListOfParticipants. Presser sur la carte mènera au profil du participant. Il faut rendre le button fonctionnel - FR
/* ENG - Here is the little attendee card Component. The press on the card will lead to the attendee profile. The button needs to get functional - ENG  */

import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import styles from "./Styles/AttendeeCardCss"
import { Icon } from "@rneui/themed";
import { FlatList } from "react-native";


const AttendeeCard = ({ attendee, attendeeMode }) => {
  const [liked, setLiked] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => console.log("Go to attendee profile (MembersScreen's logic could be a nice help, here")}
      style={styles.knowledgeCard}
    >
      <TouchableOpacity
        onPress={() => setLiked(!liked)}
        style={ styles.likeButton }>
        {liked ? (
          <Icon name="heart" type="font-awesome" size={15} color="red" />
        ) : (
          <Icon name="heart-o" type="font-awesome" size={15} color="red" />
        )}
      </TouchableOpacity>
      <Image
        style={styles.userAvatar}
        source={require("../assets/images/randomUser.png")}
      />
      <Text style={styles.userName}> Alexanderio </Text>
      <Text style={styles.userStatus}>Event host</Text>
      {/* //Is this "Event host" really necessary as we are in the attendee list...?" */}
      {attendeeMode && (
        <TouchableOpacity
          onPress={() => console.log("Attendee removed from list")}
          style={styles.removeUserButton}
        >
          <Icon name="close" type="ionicons" size={18} color="red" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
  
};

export default AttendeeCard;


