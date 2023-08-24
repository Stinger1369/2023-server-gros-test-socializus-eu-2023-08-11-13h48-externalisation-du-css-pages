// ENG - This is the component where the user chooses one or several activitiesList (just choose the component you need). An upgrade I would suggest here is about the shadow of the different activity cards. At least just put a linear gradient - ENG
// FR - Ceci est le composant ou l'utilisateur choisit une ou plusieurs activités (y'a juste à choisir le composant désiré). Une amélioration que je suggérerais serait à propos de l'ombre des cartes d'activité. Il faudrait au moins mettre un dégradé - FR
//🇫🇷 Recherche de l'image de l'activité (Frame 33 sur Figma)
//🇬🇧 Search and display of Activity image (Frame 33 of Figma)
import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styles from "./Styles/ActivityTypesGridsCss";
import { activitiesList } from "../assets/activityList/activityListWithIcons";

const ActivityTypesGrid_OneTopic = ({ topic, setTopic }) => {
  const [selected, setSelected] = useState(false);
  const [selections, setSelections] = useState([]);

  return (
    <View style={styles.container}>
      {activitiesList.map((activity, index) => {
        return (
          <View style={{ position: "relative" }} key={index}>
            <TouchableOpacity
              style={
                topic !== index
                  ? [
                      styles.activityCard,
                      styles.shadow,
                      {
                        backgroundColor: topic === index ? "#59c09b" : "white",
                      },
                      { backgroundColor: "white" },
                    ]
                  : [
                      styles.activityCard,
                      {
                        backgroundColor: topic === index ? "#59c09b" : "white",
                      },
                    ]
              }
              onPress={() => {
                setTopic(index);
              }}
            >
              <View style={ styles.activityTypeView }>
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
          </View>
        );
      })}
    </View>
  );
};

const ActivityTypesGrid_SeveralTopics = ({ selections, setSelections }) => {
  //const [selections, setSelections] = useState([]);

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
      {activitiesList.map((activity, index) => {
        return (
          <View style={{ position: "relative" }} key={index}>
            <TouchableOpacity
              style={
                selections.includes(index)
                  ? [
                      styles.activityCard,
                      styles.shadow,
                      {
                        backgroundColor: selections.includes(index)
                          ? "#59c09b"
                          : "white",
                      },
                    ]
                  : [
                      styles.activityCard,
                      {
                        backgroundColor: selections.includes(index)
                          ? "#59c09b"
                          : "white",
                      },
                    ]
              }
              onPress={() => {
                manageSelections(index);
              }}
            >
              <View style={ styles.activityTypeView }>
                {selections.includes(index)
                  ? activity.activityTypeIcon_On
                  : activity.activityTypeIcon_Off}
              </View>
              <Text
                style={[
                  styles.activityTitle,
                  {
                    fontWeight: selections.includes(index) ? "600" : "400",
                    color: selections.includes(index) ? "white" : "black",
                  },
                ]}
              >
                {activity.activityTypeTitle}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

export { ActivityTypesGrid_OneTopic };
export { ActivityTypesGrid_SeveralTopics };
