import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import styles from "../Styles/InfoCss";
import axios from "axios";

const Info = ({ activityId }) => {
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    const url = `https://forestadmin.socializus.net/activities/${activityId}`;

    axios
      .get(url)
      .then((response) => {
        setActivity(response.data);
      })
      .catch((error) => {
        console.error("Une erreur s'est produite !", error);
      });
  }, [activityId]);

  // L'activité n'a pas encore été chargée.
  if (!activity) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Chargement...</Text>
      </View>
    );
  }

  const { author, title, date } = activity;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Bonjour {author.firstName}, Socializus souhaite vous informer que votre
        activité "{title}" est prévue le {date}.
      </Text>
    </View>
  );
};

export default Info;
