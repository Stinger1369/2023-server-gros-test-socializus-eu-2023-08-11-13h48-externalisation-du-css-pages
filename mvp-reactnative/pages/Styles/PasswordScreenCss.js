import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      //alignContent: "center",
      alignItems: "center",
    },
    title: {
      fontSize: 35,
      fontWeight: "600",
      color: "#59C09B",
      marginHorizontal: "auto",
      marginTop: 30,
    },
    subtitle: {
      fontSize: 16,
      fontWeight: "bold",
      marginTop: 20,
      marginHorizontal: 30,
    },
    titlemail: {
      fontSize: 12,
      marginTop: 30,
      marginHorizontal: 30,
    },
    text: {
      fontWeight: "400",
      fontSize: 12,
      lineHeight: 12,
      marginTop: 30,
      marginLeft: 38,
    },
    email: {
      marginTop: 0,
      marginHorizontal: 30,
    },
    password: {
      marginTop: 24,
      marginHorizontal: 30,
    },
    centerTerms: {
      marginTop: 15,
      alignItems: "center",
    },
    termsContainer: {
      alignItems: "center",
      width: "55%",
      marginBottom: 20,
    },
    terms: {
      fontSize: 12,
      //lineHeight: 18,
      textAlign: "center",
    },
    underline: {
      fontSize: 12,
      //lineHeight: 18,
      textDecorationLine: "underline",
    },
    btn: {
      alignItems: "center",
      justifyContent: "center",
      alignContent: "center",
      marginBottom: 90,
      //marginHorizontal: "auto",
    },
    centerBot: {
      alignItems: "center",
      marginBottom: 30,
    },
    bottomText: {
      fontWeight: "700",
      fontSize: 14,
      lineHeight: 18,
      //marginRight: 30
    },
    bottomBoxTop: {
      //flexDirection: "row",
      alignItems: "center",
    },
    error: {
      color: "red",
      marginBottom: 20,
    },
    bigBtn: {
      height: 50,
      alignItems: "center",
      alignContent: "center",
      borderRadius: 10,
      width: "60%",
    },
    btnText: {
      color: "white",
      fontSize: 22,
      lineHeight: 33,
      fontWeight: "700",
      padding: 15,
    },
    smallBtn: {
      width: "80%",
      borderWidth: 1,
      borderRadius: 20,
      alignContent: "center",
      alignItems: "center",
      marginTop: 15,
    },
    smallBtnText: {
      fontSize: 14,
      fontWeight: "700",
      lineHeight: 36,
      width: 300,
      color: "#59C09B",
      textAlign: "center",
    },
    passwordBtn: {
      height: 60,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
      width: "100%",
    },
  });

export default styles