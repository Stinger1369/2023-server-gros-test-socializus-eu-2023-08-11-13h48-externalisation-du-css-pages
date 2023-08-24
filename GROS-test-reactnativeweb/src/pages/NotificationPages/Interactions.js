//Frame 24D (Organizer note)

import React, { useState } from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import styles from "../Styles/InteractionsCss";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Interaction24E from "./Interaction24E";

const Interaction = () => {
  const navigation = useNavigation();
  const [showNewChildPage, setShowNewChildPage] = useState(false);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleExit = () => {
    setShowNewChildPage(true);
  };
  if (showNewChildPage) {
    return <Interaction24E />;
  }

  const starImages = [
    require("../../assets/images/star.svg"), // Replace with the path to your star image
    require("../../assets/images/star.svg"),
    require("../../assets/images/star.svg"),
    require("../../assets/images/star.svg"),
    require("../../assets/images/star.svg"),
  ];

  return (
    <View style={styles.container}>
      <View style={styles.exitContainer}>
        <TouchableOpacity onPress={handleExit}>
          <FontAwesome name="times" size={24} color="#59C09B" />
        </TouchableOpacity>
      </View>

      <Text style={styles.text}>Your opinion matters</Text>
      <View style={styles.contentContainer}>
        <View style={styles.avatarContainer}>
          <Image
            source={require("../../assets/images/image_edit_profile/Luc.png")}
            style={styles.avatar}
          />
          <Text style={styles.name}>Luc</Text>
        </View>
        <Text style={styles.text1}>
          What did you think about Luc, the organizer of the activity "Apero
          maison"?
        </Text>
        <FlatList
          data={starImages}
          renderItem={({ item }) => (
            <Image source={item} style={styles.starImage} />
          )}
          keyExtractor={(item, index) => index.toString()}
          horizontal
        />

        <TextInput
          style={styles.commentInput}
          placeholder="Let a comment for the organizer..."
          multiline
        />

        <TouchableOpacity style={styles.confirmButton}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Interaction;
