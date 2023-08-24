/* FR - Voilà le petit composant qui affichera les ListOfParticipants. Presser sur la carte mènera au profil du participant. Il faut rendre le button fonctionnel (Frame Figma 44) - FR */
/* ENG - Here is the little attendee card Component. The press on the card will lead to the attendee profile. The button needs to get functional (Frame Figma 44) - ENG  */

import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { hostname } from "../../../mvp-reactnative/backendconnect/hostname.js";

import { Modal, Button } from "react-native";

import { Text, View, TouchableOpacity, Image } from "react-native";
import styles from "./Styles/AttendeeCardCss.js";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import Json from "../assets/json/en.json";
import usergirl from "../assets/images/image_edit_profile/user-girl.svg";
import userguy from "../assets/images/image_edit_profile/user-guy.svg";
const { activity } = Json;

const AttendeeCard = ({
  event,
  user,
  setAttendees,
  setEvent,
  handleUnsubscribeUser,
  connectedUserRole,
  isOrganizer,
  fullAttendeeListModalVisible,
  isFullAttendeeListModalVisible,
  waitingListModalVisible,
  isWaitingListModalVisible,
}) => {
  const navigation = useNavigation();
  const [liked, setLiked] = useState(false);
  const [premiumMember, isPremiumMember] = useState(false);
  const userRole = user?.role.name;
  const [imageGenre, setImageGenre] = useState();

  useEffect(() => {
    if (user.sexe === "male") {
      setImageGenre(userguy);
    } else {
      setImageGenre(usergirl);
    }
  }, [user?.sexe]);

  useEffect(() => {}, [event]);

  const premiumRoles = ["admin", "moderator"];

  const genderColor = user.sexe === "male" ? "#4A85DD" : "#CB55B1";

  const handlePress = () => {
    if (fullAttendeeListModalVisible)
      isFullAttendeeListModalVisible(!fullAttendeeListModalVisible);
    if (waitingListModalVisible)
      isWaitingListModalVisible(!waitingListModalVisible);
    navigation.navigate("Profile", { user: user });
  };

  const unsubscribeUser = async (userId) => {
    console.log("unsubscribeUser");
    console.log({ id: event._id, userId: userId });
    const token = await AsyncStorage.getItem("userToken");
    const response = await axios.post(
      `${hostname}/api/v1/activities/removeUser`,
      { activityId: event._id, userId: userId },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    if (response && response.data && response.data.result === "OK") {
      console.log(response.data);
      handleUnsubscribeUser(userId); // Appeler handleUnsubscribeUser pour supprimer l'utilisateur de la liste des participants
      var tmpEvent = event;
      if (event.attendees && response.data.index !== -1) {
        let userIndex = event.attendees.findIndex(
          (attendee) => attendee === userId
        );
        console.log(userIndex);
        tmpEvent.attendees.splice(userIndex, 1);
        setAttendees((prevAttendees) =>
          prevAttendees.filter((attendee) => attendee !== userId)
        );
        console.log("Attendee list after unsubscribing: " + tmpEvent.attendees);
        setEvent(tmpEvent);
      }
    }
  };

  const [unsubscribeButtonPressed, setUnsubscribeButtonPressed] =
    useState(false);
  const [cancelButtonPressed, setCancelButtonPressed] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => handlePress()}
      style={styles.knowledgeCard}
    >
      {/* <TouchableOpacity
        onPress={() => setLiked(!liked)}
        style={{
          position: "absolute",
          left: 5,
          margin: 10,
          zIndex: 2,
        }}
      >
        {liked ? (
          <Icon name="heart" type="font-awesome" size={15} color="red" />
        ) : (
          <Icon name="heart-o" type="font-awesome" size={15} color="red" />
        )}
      </TouchableOpacity> */}
      <Image
        style={styles.userAvatar}
        source={
          user.avatar ===
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            ? imageGenre
            : user.avatar
        }
      />
      <Text style={[styles.userName, { color: genderColor }]}>
        {user.userName}
      </Text>
      {event.author === user._id ? (
        <Text style={styles.userStatus}>{activity.t2022_eventHost}</Text>
      ) : (
        <View style={{ height: 14 }}></View>
      )}

      {/* {isOrganizer || premiumRoles.includes(connectedUserRole) ? (
        !premiumRoles.includes(userRole) && (
          <TouchableOpacity
            onPress={unsubscribe}
            style={styles.removeUserButton}>
            <Icon name="close" type="font-awesome" size={18} color="red" />
          </TouchableOpacity>
        )
      ) : (
        <></>
      )}
    </TouchableOpacity> */}
      {isOrganizer || premiumRoles.includes(connectedUserRole) ? (
        !premiumRoles.includes(userRole) && (
          <>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={styles.removeUserButton}
            >
              <Icon name="close" type="font-awesome" size={18} color="red" />
            </TouchableOpacity>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>
                    {activity.unsubscribeUser}
                  </Text>
                  <View style={ styles.modalSubView } >
                    <TouchableOpacity
                      style={[
                        styles.button,
                        unsubscribeButtonPressed && {
                          backgroundColor: "#59C09B",
                        },
                      ]}
                      onPressIn={() => setUnsubscribeButtonPressed(true)}
                      onPressOut={() => setUnsubscribeButtonPressed(false)}
                      onPress={async () => {
                        setModalVisible(!modalVisible);
                        await unsubscribeUser(user?._id);
                      }}
                    >
                      <Text style={styles.buttonText}>
                        {activity.unsubscribe}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.button,
                        cancelButtonPressed && { backgroundColor: "#59C09B" },
                      ]}
                      onPressIn={() => setCancelButtonPressed(true)}
                      onPressOut={() => setCancelButtonPressed(false)}
                      onPress={() => {
                        setModalVisible(!modalVisible);
                      }}
                    >
                      <Text style={styles.buttonText}>{activity.cancel}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </>
        )
      ) : (
        <></>
      )}
    </TouchableOpacity>
  );
};

export default AttendeeCard;
