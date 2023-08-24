import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    Register: {
      backgroundColor: "white",
      width: "100%",
      marginHorizontal: "auto",
    },
    title: {
      fontSize: 35,
      fontWeight: "600",
      color: "#59C09B",
      marginHorizontal: "auto",
    },
    email: {
      marginTop: 25,
      marginBottom: 15,
      alignItems: "center",
    },
    password: {
      marginTop: 35,
      marginHorizontal: 30,
    },
    confirmPassword: {
      marginTop: 15,
      marginBottom: 10,
      alignItems: "center",
    },
    centerTerms: {
      alignItems: "center",
      marginBottom: 25,
    },
    center: {
      alignItems: "center",
      marginBottom: 10
    },
    termsContainer: {
      alignItems: "center",
      width: "60%",
    },
    terms: {
      fontSize: 12,
      lineHeight: 18,
      textAlign: "center",
    },
    underline: {
      textDecorationLine: "underline",
    },
    btn: {
      alignItems: "center",
      marginBottom: 30,
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
      height: 60,
      alignItems: "center",
      justifyContent: "center",
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
      height: 37,
      width: "80%",
      borderWidth: 1,
      borderRadius: 20,
      justifyContent: "center",
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
  });

export default styles