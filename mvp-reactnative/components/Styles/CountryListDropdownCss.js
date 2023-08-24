import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    input: {
      width: "100%",
      marginTop: 10,
      marginHorizontal: "auto",
      paddingLeft: 5,
      paddingRight: 15,
      borderColor: "black",
      borderWidth: 1,
      borderRadius: 15,
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      position: "relative",
    },
    upperTitle: {
      marginHorizontal: 15,
      paddingHorizontal: 10,
      backgroundColor: "white",
      fontSize: 12,
      position: "absolute",
      top: -10,
      left: 25,
    },
    dropdown: {
      marginTop: 5,
      marginHorizontal: "auto",
      padding: 10,
      width: "100%",
      height: 350,
      backgroundColor: "white",
      borderColor: "black",
      borderWidth: 1,
      borderRadius: 15,
    },
    countryLine: {
      paddingVertical: 8,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottomColor: "#ccc",
      borderBottomWidth: 1,
    },
    languageTitleView: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
    },
    titleView: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  });

export default styles