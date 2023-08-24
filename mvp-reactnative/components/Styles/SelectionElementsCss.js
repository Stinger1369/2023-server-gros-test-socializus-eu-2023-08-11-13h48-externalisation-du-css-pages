import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    row: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    checkBoxInput: {
      margin: 5,
      alignSelf: "flex-start",
      borderWidth: 1,
      borderColor: "#59c09b",
      borderRadius: 10,
    },
    button: {
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderColor: "#59c09b",
      borderWidth: 1,
      borderRadius: 10,
    },
    buttonSelected: {
      paddingVertical: 10,
      paddingHorizontal: 15,
      backgroundColor: "#59c09b",
      borderRadius: 10,
    },
    textButton: {
      textAlign: "center",
      color: "#59c09b",
    },
    textButtonSelected: {
      textAlign: "center",
      color: "white",
    },
  });

export default styles