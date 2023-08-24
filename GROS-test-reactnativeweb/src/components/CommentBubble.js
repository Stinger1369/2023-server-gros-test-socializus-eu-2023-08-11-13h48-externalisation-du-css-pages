/* A few comment about this component:
- The message sender's name, avatar and gender (for changing the bubble background's color)
- If the sender is the organizer, the bubble will be green AND the cross icon will show up
- If the sender is the connected user, the bubble will be on the right and their avatar is not displayed
- Frame Figma : 43
 */

import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import {
  Text,
  ScrollView,
  Image,
  View,
  SafeAreaView,
  TouchableOpacity,
  Linking,
  TextInput,
  Modal,
} from "react-native";
import styles from "./Styles/CommentBubbleCss";
import Swipeable from "react-native-gesture-handler/Swipeable";
// Components
import Marker from "react-native-web-maps/dist/Marker";
import MapView, { PROVIDER_GOOGLE } from "react-native-web-maps";

const CommentBubble = ({
  comment,
  user,
  connectedUserRole,
  isOrganizer,
  handleDeleteComment,
}) => {
  const isMessageSender = user?._id === comment?.user._id;
  const genderColor = comment?.user.sexe === "male" ? "#4A85DD" : "#CB55B1";
  const userColor = "#57B556";
  const userRole = user?.role.name[0];
  const senderRole = comment?.user?.role.name[0];
  const premiumRoles = ["admin", "moderator"];
  const date = new Date(comment?.createdAt);
  const options = {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  };
  const time = new Intl.DateTimeFormat("default", options).format(date);
  //fonctionnalité de swipe option pour la suppression d'un message spécifique avec affichage de la croix
  const leftSwipeActions = () => {
    return (
      <>
        {premiumRoles.includes(connectedUserRole) ||
        isOrganizer ||
        isMessageSender ? (
          <TouchableOpacity
            onPress={() => handleDeleteComment(comment?._id)}
            style={[
              styles.deleteMessageIcon,
              {
                display:
                  !isMessageSender && premiumRoles.includes(senderRole)
                    ? "end"
                    : "flex",
              },
            ]}
          >
            <MaterialCommunityIcons name="close" color="#ff0000" size={18} />
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </>
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.bubble}>
        <View
          style={[
            styles.bubbleContainer,
            {
              flexDirection: isMessageSender ? "row-reverse" : "row",
              justifyContent: !isMessageSender && "flex-start",
            },
          ]}
        >
          {!isMessageSender && (
            <Swipeable
              renderRightActions={leftSwipeActions}
              style={[
                styles.messageBubble,
                {
                  backgroundColor: isMessageSender ? userColor : genderColor,
                },
              ]}
            >
              <View style={{ width: 50 }}>
                <View style={styles.messageSenderImage}>
                  <Image
                    source={comment?.user.avatar}
                    alt="sender avatar"
                    style={styles.messageSenderImage}
                  />
                </View>
              </View>
            </Swipeable>
          )}
          <Swipeable
            renderLeftActions={leftSwipeActions}
            style={[
              styles.messageBubble,
              {
                backgroundColor: isMessageSender ? userColor : genderColor,
              },
            ]}
          >
            <View
              style={[
                styles.messageBubble,
                {
                  backgroundColor: isMessageSender ? userColor : genderColor,
                },
              ]}
            >
              {!isMessageSender && (
                <Text
                  style={[styles.messageSenderName, { color: genderColor }]}
                >
                  {comment?.user.firstName}
                </Text>
              )}
              <View
                style={
                  !isMessageSender
                    ? styles.bubbleTriangle
                    : styles.bubbleUserTriangle
                }
              >
                <Ionicons
                  name="triangle"
                  color={isMessageSender ? userColor : genderColor}
                  size={22}
                  style={{ transform: [{ rotateX: "60deg" }] }}
                />
              </View>
              {comment && comment.location && (
                <>
                  <MapView style={styles.map} region={comment.location}>
                    <Marker coordinate={comment.location} pinColor="#3A8569" />
                  </MapView>
                </>
              )}

              {comment && comment.image && (
                <TouchableOpacity>
                  <Image
                    source={{ uri: comment.image }}
                    style={ styles.commentImg }
                  />
                </TouchableOpacity>
              )}
              {comment && comment.comment && (
                <>
                  <Text style={{ color: "white" }}>{comment.comment}</Text>
                </>
              )}
              <Text style={styles.messageTime}>{time}</Text>
            </View>
          </Swipeable>

          {/** **/}
        </View>
      </View>{" "}
    </SafeAreaView>
  );
};

export default CommentBubble;
