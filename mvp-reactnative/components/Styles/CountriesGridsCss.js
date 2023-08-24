import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginVertical: 10,
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    countryCard: {
      margin: 8,
      width: 55,
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      borderColor: "#59c09b",
      borderWidth: 1,
      borderRadius: 15,
      backgroundColor: "white",
    },
    shadow: {
      margin: 8,
      width: 55,
      height: 40,
      borderRadius: 15,
      backgroundColor: "#CCCCCC",
      zIndex: -1,
      position: "absolute",
      bottom: -3,
    },
    flagShadow: {
      position: "absolute",
      width: 30,
      height: 20,
      backgroundColor: "#BBBBBB",
      zIndex: -1,
      top: 16,
      left: 2,
    },
    countryCard_severalFlags: {
      marginHorizontal: 4,
      marginVertical: 6,
      width: 77,
      height: 45,
      justifyContent: "center",
      alignItems: "center",
      borderColor: "#59c09b",
      borderRadius: 10,
      backgroundColor: "white",
    },
    shadow_severalFlags: {
      margin: 4,
      width: 77,
      height: 45,
      borderRadius: 10,
      backgroundColor: "#CCCCCC",
      zIndex: -1,
      position: "absolute",
      bottom: -3,
    },
    flagShadow_severalFlags: {
      position: "absolute",
      width: 30,
      height: 20,
      backgroundColor: "#BBBBBB",
      zIndex: -1,
      top: 15,
      left: 2,
    },
    countryFlags: {
      flex: 1, 
      justifyContent: "center", 
      position: "relative"
    },
  });

export default styles