import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList } from "react-native";
import io from "socket.io-client";

const socket = io("http://localhost:3310"); // Remplacez l'URL par celle du serveur

const ChatPrivetScreen = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Connexion au serveur socket.io
    socket.connect();

    // Écoute des événements "receive_message" pour recevoir de nouveaux messages
    socket.on("receive_message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Écoute des événements "new_notification" pour recevoir de nouvelles notifications
    socket.on("new_notification", (notification) => {
      // Traitez la notification comme vous le souhaitez (ex: affichage d'une alerte)
    });

    // Nettoyage des écouteurs d'événements lors du démontage du composant
    return () => {
      socket.disconnect();
      socket.off("receive_message");
      socket.off("new_notification");
    };
  }, []);

  const sendMessage = () => {
    // Envoyer le message au serveur via socket.io
    socket.emit("send_message", {
      author: username,
      message: inputText,
    });

    setInputText("");
  };

  return (
    <View>
      <Text>Chat Privé</Text>

      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.author}</Text>
            <Text>{item.message}</Text>
          </View>
        )}
      />

      <TextInput
        value={inputText}
        onChangeText={(text) => setInputText(text)}
        placeholder="Message"
      />

      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

export default ChatPrivetScreen;
