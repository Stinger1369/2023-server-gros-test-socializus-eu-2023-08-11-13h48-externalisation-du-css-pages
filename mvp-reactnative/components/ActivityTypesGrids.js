// ENG - This is the component where the user chooses one or several activities (just choose the component you need). An upgrade I would suggest here is about the shadow of the different activity cards. At least just put a linear gradient - ENG
// FR - Ceci est le composant ou l'utilisateur choisit une ou plusieurs activités (y'a juste à choisir le composant désiré). Une amélioration que je suggérerais serait à propos de l'ombre des cartes d'activité. Il faudrait au moins mettre un dégradé - FR
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import styles from "./Styles/ActivityTypesGridsCss"
import {activities} from "../assets/activityList/activityListWithIcons";

const ActivityTypesGrid_OneTopic = ({ topic, setTopic }) => {
  const [selected, setSelected] = useState(false);
  const [selections, setSelections] = useState([]);

  return (
    <View style={styles.container}>
      {activities.map((activity, index) => {
        return (
          <View style={ styles.activityView } key={index}>
            <TouchableOpacity
            style={[
              styles.activityCard, {backgroundColor: topic === index ? "#59c09b" : "white" }
            ]}
            onPress={() => {
              setTopic(index);
            }}
          >
            <View style={ styles.flexView }>
              {topic === index
                ? activity.activityTypeIcon_On
                : activity.activityTypeIcon_Off}
            </View>
            <Text
              style={[
                styles.activityTitle,
                {
                  fontWeight: topic === index ? "bold" : "400",
                  color: topic === index ? "white" : "black",
                },
              ]}
            >
              {activity.activityTypeTitle}
            </Text>
          </TouchableOpacity>
          {topic === index ? null : <View style={styles.shadow} />}
          </View>         
        );
      })}
    </View>
  );
};

const ActivityTypesGrid_SeveralTopics = ({ topics, setTopics }) => {
  const [selections, setSelections] = useState([]);

  const manageSelections = (index) => {
    if (!selections.includes(index)) {
      setSelections((previousArray) => {
        return [...previousArray, index];
      });
    } else {
      setSelections((previousArray) => {
        return previousArray.filter((item) => {
          return item !== index;
        });
      });
    }
  };

  return (
    <View style={styles.container}>
      {activities.map((activity, index) => {
        return (
          <View style={styles.activityView} key={index}>
            <TouchableOpacity
            style={[
              styles.activityCard, {backgroundColor: selections.includes(index) ? "#59c09b" : "white" }
            ]}
            onPress={() => {
              manageSelections(index);
            }}
          >
            <View style={{ flex: 1, justifyContent: "center" }}>
              {selections.includes(index)
                ? activity.activityTypeIcon_On
                : activity.activityTypeIcon_Off}
            </View>
            <Text
              style={[
                styles.activityTitle,
                {
                  fontWeight: selections.includes(index) ? "bold" : "400",
                  color: selections.includes(index) ? "white" : "black",
                },
              ]}
            >
              {activity.activityTypeTitle}
            </Text>
          </TouchableOpacity>
          {selections.includes(index) ? null : <View style={styles.shadow} />}
          </View>         
        );
      })}
    </View>
  );
};

export {ActivityTypesGrid_OneTopic};
export {ActivityTypesGrid_SeveralTopics};


