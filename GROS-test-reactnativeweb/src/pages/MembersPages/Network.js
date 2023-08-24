import { Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import styles from "../Styles/NetworkCss";
import React, { useState, useEffect } from "react";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
import avatar1 from "../../assets/avatarImage/Elodie-Labouret.jpg";
import avatar2 from "../../assets/avatarImage/Melissa-Durand.jpg";
import avatar3 from "../../assets/avatarImage/Astrid-Nelsia.jpg";
import avatar4 from "../../assets/avatarImage/John-Wayne.jpg";
import avatar5 from "../../assets/avatarImage/Simon-Veli.jpg";
import avatar6 from "../../assets/avatarImage/Jules-Capet.jpg";
import avatar7 from "../../assets/avatarImage/Simon-Veli.jpg";
import icon1 from "../../assets/user-grades-and-sponsorship/GoldCup_Gold_GoldStar.svg";
import icon2 from "../../assets/user-grades-and-sponsorship/EmeraldCup_Emerald_noStar.svg";
import icon3 from "../../assets/user-grades-and-sponsorship/RubyCup_Ruby_RubyStar.svg";
import icon4 from "../../assets/user-grades-and-sponsorship/DiamondCup_Diamond_noStar.svg";
import icon5 from "../../assets/user-grades-and-sponsorship/GoldCup_Gold_noStar.svg";
import icon6 from "../../assets/user-grades-and-sponsorship/EmeraldCup_Emerald_EmeraldStar.svg";
import icon7 from "../../assets/user-grades-and-sponsorship/RubyCup_Ruby_RubyStar.svg";
import addFriend from "../../assets/profile/add-friend.svg";
import Placeholder2 from "../../assets/images/placeholder2.svg";
import { useNavigation } from "@react-navigation/native";
import heartEmpty from "../../assets/images/heartEmpty.svg";
import heartFilled from "../../assets/images/heartFilled.svg";

export const HeartIcon = ({ filled, onPress }) => {
  const icon = filled ? heartFilled : heartEmpty;

  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={icon} style={{ width: 37, height: 37 }} />
    </TouchableOpacity>
  );
};

const Network = () => {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
  });
  const [activeButton, setActiveButton] = useState("Network");
  const navigation = useNavigation();
  const [heartColors, setHeartColors] = useState({
    1: "#FF0000",
    2: "#FF0000",
    3: "#FF0000",
    4: "#FF0000",
    5: "#FF0000",
    6: "#FF0000",
    7: "#FF0000",
  });

  useEffect(() => {
    // Update active button immediately when navigating back
    const unsubscribe = navigation.addListener("focus", () => {
      setActiveButton("Network");
    });

    return unsubscribe;
  }, [navigation]);

  const handleHeartPress = (itemId) => {
    setHeartColors((prevColors) => {
      const newColors = { ...prevColors };
      newColors[itemId] = newColors[itemId] === "" ? "#FF0000" : ""; // Toggle between red and empty color
      return newColors;
    });
  };

  if (!fontsLoaded) {
    return null;
  }

  const data = [
    {
      id: "1",
      avatar: avatar1,
      icon: icon1,
      name: "Elodie Labouret",
      address: "Paris, 75020",
      borderColor: "#DAE08D",
    },
    {
      id: "2",
      avatar: avatar2,
      icon: icon2,
      name: "Melissa Durand",
      address: "Paris, 75011",
      borderColor: "#DAE08D",
    },

    {
      id: "3",
      avatar: avatar3,
      icon: icon3,
      name: "Astrid Nelsia",
      address: "Paris, 93004",
      borderColor: "#65B3EA",
    },

    {
      id: "4",
      avatar: avatar4,
      icon: icon4,
      name: "John Wayne",
      address: "Paris, 75016",
      borderColor: "#65B3EA",
    },

    {
      id: "5",
      avatar: avatar5,
      icon: icon5,
      name: "Simon Veli",
      address: "Paris, 91014",
      borderColor: "#DAE08D",
    },

    {
      id: "6",
      icon: icon6,
      avatar: avatar6,
      name: "Jules Capet",
      address: "Paris, 92068",
      borderColor: "#65B3EA",
    },

    {
      id: "7",
      icon: icon7,
      avatar: avatar7,
      name: "Arnaud Louet",
      address: "Paris, 75001",
      borderColor: "#65B3EA",
    },
    // Add more data objects as needed
  ];

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.avatarContainer}>
        <View style={[styles.avatarBorder, { borderColor: item.borderColor }]}>
          <Image style={styles.avatar} source={{ uri: item.avatar }} />
        </View>
        <Image source={item.icon} style={styles.icon} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.lineAdresse}>
          <Image source={Placeholder2} style={styles.iconmap} />
          <Text style={styles.address}>{item.address}</Text>
        </View>
      </View>
      <View style={styles.iconContainer}>
        <HeartIcon
          filled={heartColors[item.id] === "#FF0000"}
          onPress={() => handleHeartPress(item.id)}
        />
        <TouchableOpacity style={styles.userPlusButton}>
          <Image
            source={addFriend}
            style={[styles.iconAdd, { tintColor: "#65B3EA" }]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            activeButton === "Members" && { backgroundColor: "#59c09b" },
          ]}
          onPress={() => {
            setActiveButton("Members");
            navigation.navigate("Members");
          }}
        >
          <Text style={styles.text4}>Members</Text>
        </TouchableOpacity>

        <View style={styles.separator} />

        <TouchableOpacity
          style={[
            styles.button,
            activeButton === "Network" && { backgroundColor: "#59c09b" },
          ]}
          onPress={() => {
            setActiveButton("Network");
            navigation.navigate("Network");
          }}
        >
          <Text style={styles.text4}>Network</Text>
        </TouchableOpacity>

        <View style={styles.separator} />

        <TouchableOpacity
          style={[
            styles.button,
            activeButton === "FriendList" && { backgroundColor: "#59c09b" },
          ]}
          onPress={() => {
            setActiveButton("FriendList");
            navigation.navigate("FriendList");
          }}
        >
          <Text style={styles.text4}>FriendList</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.line}>
        <Text style={styles.text}>
          You can only start a chat with your friends
        </Text>
      </View>
      <View style={styles.containerLine}>
        <View style={styles.containerEclipse}>
          <View style={styles.eclipse1} />
          <Text style={styles.text2}>= people I met.</Text>
        </View>
        <View style={styles.containerEclipse}>
          <View style={styles.eclipse2} />
          <Text style={styles.text3}>= friends.</Text>
        </View>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Network;
