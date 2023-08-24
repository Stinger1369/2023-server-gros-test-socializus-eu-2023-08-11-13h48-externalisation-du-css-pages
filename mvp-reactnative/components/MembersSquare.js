// Apage qui affiches les memebres sur une carte (Figma Frame 22A)
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import styles from "./Styles/MembersSquareCss"
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

import { LinearGradient } from "expo-linear-gradient";

export default function MembersSquare({
  name,
  //age,
  city,
  avatar,
  member,
}) {
  const navigation = useNavigation();

  const [liked, setLiked] = useState(false);
function calculateAge(birthday) {
  if (!birthday) {
    return null;
  }

  const today = new Date();
  const birthDate = new Date(birthday);
  let age = today.getFullYear() - birthDate.getFullYear();

  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}const age = calculateAge(member.birthday);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate("Profile", {
          user: member,
        });
      }}>
      <ImageBackground source={{ uri: avatar }} style={{ flex: 1 }}>
        <LinearGradient
          colors={[
            "rgba(255, 255, 255,0.05)",
            "rgba(255, 255, 255,0.2)",
            "#0C1D15",
          ]}
          style={styles.gradient}
        />
        <View style={styles.infosContainer}>
          <View style={styles.mainInfos}>
            <Text style={styles.name}>{name}</Text>
            <View style={styles.cityContainer}>
              {age === null || isNaN(age) || age === 0 ? null : (
                <Text style={[styles.secondaryInfos, { marginRight: 15 }]}>
                  {age} years
                </Text>
              )}
              <Text style={styles.secondaryInfos}>
                {city ? city.split(",")[0] : " "}{" "}
                {/* en cas de ville non renseignée, on affiche "City not available"*/}
              </Text>
            </View>
          </View>
          {/* les boutons de like */}
          {/* <TouchableOpacity
            onPress={() => setLiked(!liked)}
            style={styles.heartButton}>
            {liked ? (
              <Image source={LoveActivated} style={styles.image} />
            ) : (
              <Image source={LoveDeactivated} style={styles.image} />
            )}
          </TouchableOpacity> */}
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}


