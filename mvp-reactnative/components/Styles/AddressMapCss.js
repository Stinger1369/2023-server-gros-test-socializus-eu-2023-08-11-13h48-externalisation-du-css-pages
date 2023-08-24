import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    map: {
      height: 200,
      marginVertical: 10,
    },
    inputEmptyButton: {
      margin: 5,
      position: "absolute",
      top: 17,
      right: 5,
      zIndex: 3,
    },
    title: {
      paddingHorizontal: 15,
      backgroundColor: "#fff",
      fontSize: 13,
      textAlign: "center",
      position: "absolute",
      zIndex: 1,
      left: 20,
      top: -5,
    },
    titleView: {
      marginTop: 15, 
      marginBottom: 5
    },
    inputFieldStyle: {
      marginTop: 15, 
      marginBottom: 5, 
      position: "relative" 
    },
    InputFieldButton: {
      position: "absolute", 
      top: 22, 
      right: 10,
    },
  });

export default styles