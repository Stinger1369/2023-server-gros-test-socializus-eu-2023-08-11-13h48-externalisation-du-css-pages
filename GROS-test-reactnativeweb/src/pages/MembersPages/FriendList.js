import { Text, View, FlatList, TouchableOpacity, Image } from "react-native";
import styles from "../Styles/FriendListCss";
import React, { useState, useEffect } from "react";
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
import more from "../../assets/images/next2.svg";
import Placeholder2 from "../../assets/images/placeholder2.svg";
import { useNavigation } from "@react-navigation/native";

const FriendList = () => {
  const [activeButton, setActiveButton] = useState("FriendList");
  const navigation = useNavigation();
  useEffect(() => {
    // Update active button immediately when navigating back
    const unsubscribe = navigation.addListener("focus", () => {
      setActiveButton("FriendList");
    });

    return unsubscribe;
  }, [navigation]);

  const data = [
    {
      id: "1",
      avatar: avatar1,
      icon: icon1,
      name: "Elodie Labouret",
      address: "Paris, 75020",
      arrow: more,
    },
    {
      id: "2",
      avatar: avatar2,
      icon: icon2,
      name: "Melissa Durand",
      address: "Paris, 75011",
      arrow: more,
    },
    {
      id: "3",
      avatar: avatar3,
      icon: icon3,
      name: "Astrid Nelsia",
      address: "Paris, 93004",
      arrow: more,
    },
    {
      id: "4",
      avatar: avatar4,
      icon: icon4,
      name: "John Wayne",
      address: "Paris, 75016",
      arrow: more,
    },
    {
      id: "5",
      avatar: avatar5,
      icon: icon5,
      name: "Simon Veli",
      address: "Paris, 91014",
      arrow: more,
    },
    {
      id: "6",
      icon: icon6,
      avatar: avatar6,
      name: "Jules Capet",
      address: "Paris, 92068",
      arrow: more,
    },
    {
      id: "7",
      icon: icon7,
      avatar: avatar7,
      name: "Arnaud Louet",
      address: "Paris, 75001",
      arrow: more,
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
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate("ChatList")}
        >
          <Image
            source={item.arrow}
            style={[styles.iconArrow, { tintColor: "##BCBCBC" }]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View>
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
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

export default FriendList;
