import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    profile: {
      backgroundColor: "white",
      flex: 1,
      paddingTop: 35,
      alignItems: "center",
    },
    bar: {
      width: 195,
      height: 4,
      marginBottom: 25,
      backgroundColor: "black",
    },
    done: {
      backgroundColor: "#59c09b",
      height: 4,
    },
    btn: {
      marginTop: 30,
    },
    warningContainer: {
      marginBottom: 30,
      paddingHorizontal: 20,
      paddingVertical: 10,
      height: 70,
      backgroundColor: "#FF0000CC",
    },
    warningText: {
      fontSize: 16,
      fontWeight : 500,
      lineHeight: 24,
      textAlign: "center",
      color: "white",
    }, 
    container: {
      width: 260,
      height: 40,
      alignSelf: "center",
    },
    error: {
      marginHorizontal: 20,
      color: "#FF0000",
      fontWeight: "700",
      fontSize: 14,
      lineHeight: 21,
      textAlign: "center",
      letter: "10%",
    },
    bigBtn: {
      backgroundColor: "#59c09b",
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
      borderRadius: 10,
      width: 160,
    },
    btnText: {
      color: "white",
      fontSize: 22,
      lineHeight: 33,
      fontWeight: "700",
      textAlign: "center",
    },
  });

export default styles