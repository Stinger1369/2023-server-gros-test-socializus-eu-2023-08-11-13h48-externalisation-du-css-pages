import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    txt: {
      textAlign: "center",
      fontSize: 17,
      fontWeight: "400",
      marginBottom: "8%",
      marginTop: "3%",
      marginHorizontal: 10,
    },
    icones: {
      height: 60,
      width: 60,
      justifyContent: "space between",
    },
    phoneIcones: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      justifyContent: "space-evenly",
    },
    flags: {
      flexDirection: "row",
      justifyContent: "center",
      justifyContent: "space-evenly",
      marginTop: 7,
    },
    phoneNumber: {
      marginTop: 16,
    },
    subtitle: {
      flexDirection: "row",
      justifyContent: "center",
      justifyContent: "space-evenly",
    },
    line: {
      justifyContent: "center",
      fontSize: 20,
      fontWeight: "bold",
    },
    line1: {
      justifyContent: "center",
      fontSize: 20,
      fontWeight: "bold",
      marginRight: 8,
    },
    scrollviewContainer: {
      backgroundColor: "white"
    },
    txtviewContainer: {
      backgroundColor: "white", 
      width: "100%", 
      height: "100%" 
    },
  });

export default styles