//🇫🇷 Paramétres de chat (Frame 43 sur Figma)
//🇬🇧 Chat settings (Frame 43 of Figma)

import { Text, View, Image, TouchableOpacity } from "react-native";
import styles from "./Styles/ChatItemCss";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { database } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";

const ChatItem = ({ getId }) => {
  const [state, setState] = useState({});
  const [friend, setFriend] = useState({});
  const [lastMessage, setLastMessage] = useState(null);
  const [user, setUser] = useState({});

  const navigation = useNavigation();

  useEffect(() => {
    AsyncStorage.getItem("user")
      .then((res) => {
        const user = JSON.parse(res);
        setUser(user);
        const chatRef = doc(database, "chats", getId());
        getDoc(chatRef)
          .then((chatDoc) => {
            setState({ _id: chatDoc.id, ...chatDoc.data() });
            setFriend(
              user._id === chatDoc.data().user1._id
                ? chatDoc.data().user2
                : chatDoc.data().user2
            );
            const messageRef = doc(
              database,
              "messages",
              chatDoc.data().messages[chatDoc.data().messages.length - 1]
            );
            getDoc(messageRef)
              .then((messageDoc) => {
                setLastMessage({ ...messageDoc.data() });
              })
              .catch((err) => console.log("ChatItemError :", err));
          })
          .catch((err) => console.log("ChatItemError :", err));
      })
      .catch((err) => console.log("ChatItemAsyncStorageError :", err));
  }, [getId]);

  const displayTime = (date) => {
    const today = new Date();
    if (
      date.toLocaleDateString().split("/")[0] ===
      today.toLocaleDateString().split("/")[0]
    ) {
      // Same day, just show hour and minute
      const [h, m, s] = date.toLocaleTimeString().split(":");
      return `${h}:${m}`;
    } else {
      // Different day
      const [d, m, y] = date.toLocaleDateString().split("/");
      return `${d}/${m}`;
    }
  };

  return (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => {
        navigation.navigate("PrivateChat", { chatId: state._id });
      }}
    >
      <View style={styles.chatItemLeft}>
        <Image style={styles.chatItemImage} source={{ uri: friend.avatar }} />
      </View>

      <View style={styles.chatItemInfo}>
        <View style={styles.chatItemCenter}>
          <View>
            <Text style={styles.chatFriend}>{friend.userName}</Text>
            <Text style={styles.chatItemMessagePreview}>
              {lastMessage
                ? lastMessage.text
                : `${friend.userName} attend que tu l'écrives 😁`}
            </Text>
          </View>
        </View>
        <View style={styles.chatItemRight}>
          <Text style={styles.chatItemTime}>
            {lastMessage?.createdAt
              ? displayTime(new Date(lastMessage?.createdAt))
              : "Nouveau"}
          </Text>
          {/* {<View style={styles.chatItemBadge}>
                    <Text 
                        style={{
                            color: '#fff'
                        }}
                    >Fill in the number of unread messages</Text>
                </View>} */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;
