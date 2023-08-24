import React, { useState } from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import styles from "../Styles/ChatListCss";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
import avatar1 from "../../assets/avatarImage/Elodie-Labouret.jpg";
import avatar2 from "../../assets/avatarImage/Melissa-Durand.jpg";
import avatar3 from "../../assets/avatarImage/Astrid-Nelsia.jpg";
import avatar4 from "../../assets/avatarImage/John-Wayne.jpg";
import avatar5 from "../../assets/avatarImage/Simon-Veli.jpg";
import avatar6 from "../../assets/avatarImage/Sofia.jpg";
import avatar7 from "../../assets/avatarImage/Astrid.jpg";
import button from "../../assets/images/ButtonMessage.svg";
import createbutton from "../../assets/images/create-activity.png";
import ChatDetail from "./ChatDetail";
import { useNavigation } from "@react-navigation/native";
const ChatList = () => {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
  });

  //const [unreadCount, setUnreadCount] = useState(3);
  const [data, setData] = useState([
    {
      id: "1",
      avatar: avatar1,
      name: "Elody",
      chatText:
        "Hello there, I am new here and this is my first time in a sports event.",
      time: "10:58 AM",
      isRead: false,
      unreadCount: 2,
    },

    {
      id: "2",
      avatar: avatar2,
      name: "Maria",
      chatText: "Just shared a video",
      time: "24/10",
      isRead: false,
      unreadCount: 2,
    },

    {
      id: "3",
      avatar: avatar3,
      name: "Julia",
      chatText:
        "Hello there i am new here and this is my first time in a sports event.",
      time: "18/10",
      isRead: false,
      unreadCount: 1,
    },

    {
      id: "4",
      avatar: avatar4,
      name: "Alexandre",
      chatText:
        "Hello there, I am new here and this is my first time in a sports event.",
      time: "18/10",
      isRead: false,
      unreadCount: 3,
    },

    {
      id: "5",
      avatar: avatar5,
      name: "Cristopher",
      chatText:
        "Hello there, I am new here and this is my first time in a sports event.",
      time: "12/10",
      isRead: false,
      unreadCount: 0,
    },

    {
      id: "6",
      avatar: avatar6,
      name: "Sofia",
      chatText:
        "Hello there, I am new here and this is my first time in a sports event.",
      time: "10:58",
      isRead: false,
      unreadCount: 0,
    },

    {
      id: "7",
      avatar: avatar7,
      name: "Astrid",
      chatText:
        "Hello there, I am new here and this is my first time in a sports event.",
      time: "12/07",
      isRead: false,
      unreadCount: 1,
    },
  ]);

  if (!fontsLoaded) {
    return null;
  }
  const navigation = useNavigation();

  const handleChatPress = (item) => {
    const updatedData = data.map((chatItem) => {
      if (chatItem.id === item.id) {
        return {
          ...chatItem,
          isRead: true,
          unreadCount: 0,
        };
      }
      return chatItem;
    });
    setData(updatedData);

    navigation.navigate("ChatDetail", { chatItem: item });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleChatPress(item)} activeOpacity={0.6}>
      <View style={styles.chatItem}>
        <View style={styles.avatarContainer}>
          <View
            style={[styles.avatarBorder, { borderColor: item.borderColor }]}
          >
            <Image style={styles.avatar} source={{ uri: item.avatar }} />
          </View>
        </View>

        <View style={styles.chatContent}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.chatText}>{item.chatText}</Text>
        </View>

        <View style={styles.timeContainer}>
          <Text style={styles.time}>{item.time}</Text>
          {item.unreadCount > 0 && (
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationText}>{item.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => console.log("Button clicked!")}>
          <Image style={styles.button} source={button} />
          <View style={styles.createbuttonContainer}>
            <Image
              style={[styles.createbutton, { tintColor: "#FFFFFF" }]}
              source={createbutton}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatList;
