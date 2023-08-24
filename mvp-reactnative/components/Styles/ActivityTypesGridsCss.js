import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexWrap: "wrap",
      marginTop: 15,
      marginHorizontal: 10,
      flexDirection: "row",
      justifyContent: "center",
    },
    activityCard: {
      marginHorizontal: 2.5,
      marginVertical: 5,
      borderRadius: 10,
      width: 80,
      height: 100,
      justifyContent: "center",
      alignItems: "center",
    },
    shadow: {
      marginHorizontal: 2.5,
      marginVertical: 5,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      width: 80,
      height: 90,
      backgroundColor: "#DDDDDD",
      opacity: 0.5,
      zIndex: -1,
      position: "absolute",
      top: 14,
    },
    activityTitle: {
      marginBottom: 5,
      fontSize: 12.5,
    },
    activityView: {
      position: "relative",
    },
    flexView: {
      flex: 1, 
      justifyContent: "center", 
    },
  });

export default styles