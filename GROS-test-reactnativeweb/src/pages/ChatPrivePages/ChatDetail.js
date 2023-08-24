import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import styles from "../Styles/ChatDetailCss";
import io from "socket.io-client";
import joinFileIcon from "../../assets/images/joinFile.png";
import emojiIcon from "../../assets/images/messageEmoji.png";
import plusIcon from "../../assets/images/plus.png";
import sendMessageIcon from "../../assets/images/SendMessage.png";

const socket = io("http://localhost:3310"); // Replace the URL with your server URL

const ChatDetail = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Connect to the socket.io server
    socket.connect();

    // Listen for "receive_message" events to receive new messages
    socket.on("receive_message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Listen for "new_notification" events to receive new notifications
    socket.on("new_notification", (notification) => {
      // Handle the notification as desired (e.g., display an alert)
    });

    // Clean up event listeners on component unmount
    return () => {
      socket.disconnect();
      socket.off("receive_message");
      socket.off("new_notification");
    };
  }, []);

  const sendMessage = () => {
    // Send the message to the server via socket.io
    socket.emit("send_message", {
      author: username,
      message: inputText,
    });

    setInputText("");
  };

  const renderTextInput = () => {
    return (
      <View style={styles.wrapcontainer}>
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.iconContainer}>
            <Image source={emojiIcon} style={styles.icon} />
          </TouchableOpacity>

          <TextInput
            value={inputText}
            onChangeText={(text) => setInputText(text)}
            placeholder="Type a message..."
            placeholderTextColor="#999"
            style={styles.inputText}
          />

          <TouchableOpacity style={styles.iconContainer}>
            <Image source={plusIcon} style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconContainer}>
            <Image source={joinFileIcon} style={styles.icon} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.iconContainer} onPress={sendMessage}>
          <Image source={sendMessageIcon} style={styles.sendIcon} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.messagesContainer}>
        <FlatList
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.messageContainer}>
              <Text style={styles.authorText}>{item.author}</Text>
              <Text style={styles.messageText}>{item.message}</Text>
            </View>
          )}
        />
      </View>

      {renderTextInput()}
    </View>
  );
};

export default ChatDetail;
