import { Text, View, Switch, FlatList, ScrollView, Image } from "react-native";
import styles from "../Styles/Interaction24ECss";
import React, { useState } from "react";
import icon from "../../assets/images/MemberShip_images/Coupes-04.svg";

const data = [
  {
    id: 1,
    avatar: require("../../assets/images/bellefemme.png"),
    icon: icon,
    name: "Elodie Labouret",
    isEnabled: true,
  },
  {
    id: 2,
    avatar: require("../../assets/images/bellefemme.png"),
    icon: icon,
    name: "Elodie Labouret",
    isEnabled: true,
  },
  {
    id: 3,
    avatar: require("../../assets/images/bellefemme.png"),
    icon: icon,
    name: "Elodie Labouret",
    isEnabled: true,
  },
  {
    id: 4,
    avatar: require("../../assets/images/bellefemme.png"),
    icon: icon,
    name: "Elodie Labouret",
    isEnabled: true,
  },
  {
    id: 5,
    avatar: require("../../assets/images/bellefemme.png"),
    icon: icon,
    name: "Elodie Labouret",
    isEnabled: true,
  },
  {
    id: 6,
    avatar: require("../../assets/images/bellefemme.png"),
    icon: icon,
    name: "Elodie Labouret",
    isEnabled: true,
  },
  {
    id: 7,
    avatar: require("../../assets/images/bellefemme.png"),
    icon: icon,
    name: "Elodie Labouret",
    isEnabled: true,
  },
];

const Interaction24E = () => {
  const [isEveryoneEnabled, setEveryoneEnabled] = useState(true);
  const [switchData, setSwitchData] = useState(data);

  const toggleSwitch = (itemId) => {
    if (itemId === null) {
      setEveryoneEnabled((prevValue) => !prevValue);
    } else {
      setSwitchData((prevData) => {
        return prevData.map((item) => {
          if (item.id === itemId) {
            return { ...item, isEnabled: !item.isEnabled };
          }
          return item;
        });
      });
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.avatar} style={styles.avatar} />
      <Image source={item.icon} style={styles.icon} />
      <Text style={styles.name}>{item.name}</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#4FBA6F" }}
        thumbColor={item.isEnabled ? "#f4f3f4" : "#f4f3f4"}
        onValueChange={() => toggleSwitch(item.id)}
        value={item.isEnabled}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        You organized an activity called “Apero maison”, was everyone present?
      </Text>
      <ScrollView style={styles.scrollView}>
        <View style={styles.switchContainer}>
          <Text style={styles.text1}>Everyone was here</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#4FBA6F" }}
            thumbColor={isEveryoneEnabled ? "#f4f3f4" : "#f4f3f4"}
            onValueChange={() => toggleSwitch(null)}
            value={isEveryoneEnabled}
          />
        </View>

        <FlatList
          data={switchData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </ScrollView>
    </View>
  );
};

export default Interaction24E;
