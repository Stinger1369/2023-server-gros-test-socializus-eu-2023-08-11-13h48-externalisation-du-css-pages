import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      backgroundColor: "white"
    },
    fields: {
      marginVertical: 10
    },
    boldTitle: {
      fontWeight: "bold",
      fontSize: 18
    },
    margin: {
      marginVertical: 10
    },
    row: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: 5
    },
    button: {
      backgroundColor: "grey",
      padding: 15,
      width: "90%",
      marginLeft: "5%",
      marginRight: "5%",
      marginTop: 30,
      marginBottom: 20,
      borderRadius: 10
    },
    buttonActive: {
      backgroundColor: "#59C09B",
      padding: 15,
      width: "90%",
      marginLeft: "5%",
      marginRight: "5%",
      marginTop: 30,
      marginBottom: 20,
      borderRadius: 10
    },
    buttonText: {
      fontWeight: "bold",
      fontSize: 20,
      color: "#fff",
      textAlign: "center"
    },
    pressbutton: {
      backgroundColor: "red"
    },
    leftButton: {
      padding: 10,
      borderColor: "#000",
      borderWidth: 1,
      borderRightWidth: 0.5,
      borderBottomLeftRadius: 20,
      borderTopLeftRadius: 20,
      width: "50%"
    },
    leftButtonSelected: {
      padding: 10,
      borderColor: "#59C09B",
      borderWidth: 1,
      borderRightWidth: 0.5,
      borderBottomLeftRadius: 20,
      borderTopLeftRadius: 20,
      width: "50%",
      backgroundColor: "#59C09B"
    },
    rightButton: {
      padding: 10,
      borderColor: "#000",
      borderWidth: 1,
      borderLeftWidth: 0.5,
      borderBottomRightRadius: 20,
      borderTopRightRadius: 20,
      width: "50%"
    },
    rightButtonSelected: {
      padding: 10,
      borderColor: "#59C09B",
      borderWidth: 1,
      borderLeftWidth: 0.5,
      borderBottomRightRadius: 20,
      borderTopRightRadius: 20,
      width: "50%",
      backgroundColor: "#59C09B"
    },
    boldText: {
      fontWeight: "bold",
      fontSize: 20,
      textAlign: "center"
    },
    boldTextSelected: {
      fontWeight: "bold",
      fontSize: 20,
      textAlign: "center",
      color: "white"
    },
    dButton: {
      flexDirection: "row",
      justifyContent: "center",
      marginVertical: 10,
      alignItems: "center"
    }
  });

export default styles