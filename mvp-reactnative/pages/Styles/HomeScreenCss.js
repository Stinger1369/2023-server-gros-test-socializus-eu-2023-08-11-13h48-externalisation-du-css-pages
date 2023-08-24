import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
    },
    logo: {
      marginTop: 30,
      width: "90%",
      alignSelf: "center",
    },
    btnContainer: {
      width: "90%",
      height: 40,
      borderRadius: 15,
      flexDirection: "row",
      backgroundColor: "white",
      alignSelf: "center",
      marginBottom: "10%",
      borderRadius: 15,
    },
    signInUpContainer: {
      width: "100%",
      backgroundColor: "rgba(0,0,0, 0.65)",
      alignItems: "center",
    },
    signInUpButton: {
      marginHorizontal: "auto",
      marginVertical: 10,
      paddingVertical: 7,
      width: "70%",
      maxWidth: 270,
      backgroundColor: "white",
      color: "black",
      borderRadius: 15,
    },
    infoLine: {
      fontWeight: "bold",
      fontSize: 14,
      lineHeight: 18.46,
      textAlign: "center",
      paddingRight: 15,
      paddingLeft: 15,
      paddingVertical: 2,
    },
    textContainer: {
      backgroundColor: "white",
    },
    bottomBox: {
      alignSelf: "center",
      marginTop: "25%",
    },
    languageButton: {
      margin: 15,
      paddingVertical: 5,
      paddingHorizontal: 8,
      width: "60%",
      maxWidth: 200,
      alignSelf: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "white",
      borderRadius: 10
    },
  
    countryModalView: {
      width: "100%",
      height: "100%",
      paddingTop: 5,
      paddingBottom: 10,
      paddingHorizontal: 5,
      backgroundColor: "#2C2C46",
    },
    countryModalTitle: {
      marginTop: 5,
      fontWeight: "bold",
      fontSize: 20,
      color: "white",
      textAlign: "center",
    },
    searchBarInput: {
      marginTop: 20,
      marginBottom: 15,
      paddingVertical: 10,
      paddingRight: 8,
      paddingLeft: 40,
      width: "95%",
      height: 45,
      alignSelf: "center",
      borderRadius: 25,
      backgroundColor: "white",
      fontSize: 14,
      zIndex: 1,
      borderWidth: 1,
      borderColor: "#59b09c",
    },
    searchIcon: {
      top: 33,
      left: 23,
      position: "absolute",
      zIndex: 2,
    },
    countryModalScrollView: {
      flex: 1,
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    countryModalItem: {
      marginVertical: 15,
      marginHorizontal: 5,
      padding: 5,
      width: 90,
      alignItems: "center",
    },
    countryName: {
      marginTop: 5,
      color: "white",
      fontWeight: "bold",
    },
    slide: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      color: "#fff",
      fontSize: 30,
      fontWeight: "bold",
    },
    btnNext: {
      position: "absolute",
      marginLeft: 390,
      marginTop: 18,
    },
    flagContainer: {
      width: 50, 
      height: 50 
    },
    languageBtn: {
      margin: 15,
      paddingVertical: 5,
      paddingHorizontal: 8,
      width: "60%",
      maxWidth: 200,
      alignSelf: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "white",
      borderRadius: 10
    },
    languageTxt: {
      paddingLeft: "10%", 
      fontWeight: "bold"
    },
    signUpTxt: {
      marginTop: 5,
      textAlign: "center",
      color: "white",
      fontWeight: "bold",
    },
    signUpTxtTwo: {
      textAlign: "center",
      color: "black",
      fontWeight: "bold",
    },
    errorMessageContainer: {
      height: 50,
      justifyContent: "center",
      backgroundColor: "red",
    },
    errorMessageTxt: {
      fontSize: 22,
      textAlign: "center",
      fontWeight: "bold",
      color: "white",
    },
  });

  export default styles