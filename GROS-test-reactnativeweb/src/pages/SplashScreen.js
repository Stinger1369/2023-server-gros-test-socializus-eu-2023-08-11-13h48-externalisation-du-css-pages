import React, { useEffect, useState } from "react";
import {
  Image,
  View,
  ActivityIndicator,
  StatusBar,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./Styles/SplashScreenCss";

export default function SplashScreen() {
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      navigation.navigate("Drawer");
    }, 1000); // Adjust the duration as needed

    return () => clearTimeout(timer);
  }, [navigation]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Image
          source={require("../assets/splash.svg")}
          style={styles.splashImage}
        />
        <ActivityIndicator
          size="large"
          color="#7CC6BD"
          style={styles.loadingIndicator}
        />
        <StatusBar style="auto" />
      </View>
    );
  }

  return null;
}
