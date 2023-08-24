import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    /*container: { marginTop: 10, flexDirection: "column", alignItems: "center" },*/
    timeDataContainer: {
      flexDirection: "row",
      marginTop: 15,
      marginBottom: 25,
      height: 40,
      justifyContent: "space-around",
      alignItems: "center",
      fontSize: 16,
      borderWidth: 1,
      borderColor: "black",
      borderRadius: 15
    },
    buttonsContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      height: 40,
      marginVertical: 15,
      marginHorizontal: 20,
      borderWidth: 1,
      borderColor: "#59C09B",
      borderRadius: 15
    },
    activityType: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    middle: {
      borderLeftWidth: 1,
      borderLeftColor: "#59c09b",
      borderRightWidth: 1,
      borderRightColor: "#59c09b"
    },
    right: {
      borderRightWidth: 1,
      borderRightColor: "#59c09b",
      bordercenterWith: 1,
      bordercenterColor: "#59c09b"
    },
    ButtonsStyle: {
      fontWeight: "500",
      color: "#59c09b"
    },
    activityOne: {
      marginTop: 5,
      backgroundColor: "#D8EDE6",
      flexDirection: "row",
      fontWeight: "bold",
      height: 100,
      marginVertical: 5,
      marginHorizontal: 10,
      borderWidth: 1,
      borderColor: "#DDDDDD",
      borderRadius: 20
    },
    activityTwo: {
      margintop: 5,
      backgroundColor: "#FFEDB7",
      flexDirection: "row",
      fontWeight: "bold",
      height: 100,
      marginVertical: 5,
      marginHorizontal: 10,
      borderWidth: 1,
      borderColor: "#DDDDDD",
      borderRadius: 20
    },
  
    activityThree: {
      margintop: 5,
      backgroundColor: "#D8EDE6",
      flexDirection: "row",
      fontWeight: "bold",
      height: 100,
      marginVertical: 5,
      marginHorizontal: 10,
      borderWidth: 1,
      borderColor: "#DDDDDD",
      borderRadius: 20
    },
    activityFour: {
      margintop: 5,
      backgroundColor: "#DDDDDD",
      flexDirection: "row",
      fontWeight: "bold",
      height: 100,
      marginVertical: 5,
      marginHorizontal: 10,
      borderWidth: 1,
      borderColor: "#DDDDDD",
      borderRadius: 20
    },
    safeViewContainer: {
      marginTop: 0, 
      marginHorizontal: 5 
    },
    comingSoonTxt: {
      textAlign: "center", 
      color: "bold"
    },
    calendarContainer: {
      marginTop: 15,
      marginHorizontal: 15,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    },
    sliderBtn: {
      paddingHorizontal: 5,
      backgroundColor: "#59c09b",
      width: 75,
      height: 30,
      borderRadius: 5,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    },
    filterTxt: {
      color: "white"
    },
  });

export default styles