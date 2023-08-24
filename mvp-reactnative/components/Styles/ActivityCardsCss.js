import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    basicStyle: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    // style du premier text
    basicStyleText: {
      width: 185,
      height: 45,
      fontWeight: "bold",
      fontSize: 16,
    },
    // style du deuxieme text
    basicStyleTexttwo: {
      paddingVertical: 5,
      fontWeight: "bold",
      color: "#F48A0D",
    },
    activityImage: {
      width: 45, 
      height: 45, 
      borderRadius: 50 
    },
    flexCss: {
      flex: 1, 
      flexDirection: "row"
    },
    textTwo: {
      color: "#4D96E9",
      fontWeight: "bold",
      textAlign: "center",
    },
    basicStyleView: {
      paddingBottom: 5,
      justifyContent: "center",
      alignItems: "center",
    },
    rowCenter: {
      flexDirection: "row",
      alignItems: "center",
    },
  
    // Small container style
    container_small: {
      marginVertical: 7,
      marginHorizontal: 10,
      height: 110,
      borderRadius: 20,
      flexDirection: "row",
      alignItems: "center",
    },
    leftSide: {
      width: "27%",
      justifyContent: "space-between",
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20,
    },
    // Style de la view leftSideView
    leftSideView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
    },
    dollarSign: {
      position: "absolute", 
      top: 7, 
      right: 7
    },
    activityImg_small: {
      width: "100%",
      height: "100%",
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20,
      resizeMode: "cover",
    },
    rightSide: {
      width: "72%",
      padding: 7,
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
    },
    textWithIcon: {
      marginLeft: 5,
      fontWeight: "bold",
    },
    userStatusText: {
      width: "100%",
      padding: 5,
      borderBottomLeftRadius: 20,
      backgroundColor: "#59c09b",
      textAlign: "center",
      color: "white",
      fontWeight: "bold",
      letterSpacing: 0.3,
      position: "absolute",
      bottom: 0,
    },
  
  });

export default styles