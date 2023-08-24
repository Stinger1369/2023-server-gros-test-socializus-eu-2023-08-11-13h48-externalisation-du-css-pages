import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      backgroundColor: "white",
      flex: 1,
    },
    firstRow: {
      alignItems: "center",
    },
    Valide: {
      marginTop: 40,
      justifyContent: "center",
      backgroundColor: "white",
      // shadowColor: "grey",
      // shadowOffset: { width: 0, height: 3 },
      // shadowOpacity: 1,
      marginVertical: 20,
    },
    title: {
      color: "#3A8569",
      //marginTop: 15,
      fontWeight: "bold",
      textAlign: "center",
    },
    subTitle: {
      color: "#3A8569",
      //marginBottom: 15,
      fontWeight: "bold",
      textAlign: "center",
      textTransform: "uppercase",
    },
    important: {
      color: "red",
      marginBottom: 15,
      fontWeight: "bold",
      textAlign: "center",
    },
    bold: {
      fontWeight: "bold",
      fontSize: 14,
      marginTop: 10,
    },
    temporaryUserIcon: {
      backgroundColor: "lightgrey",
      width: 125,
      height: 125,
      borderRadius: 70,
      marginVertical: 20,
    },
    proOrPerso: {
      justifyContent: "center",
      alignItems: "center",
      marginVertical: 15,
    },
    membership: {
      flexDirection: "row",
    },
    membershipNumber: {
      color: "#3A8569",
      marginLeft: 10,
      marginBottom: 15,
      marginTop: 10,
      fontWeight: "bold",
    },
    fields: {
      alignItems: "center",
      marginVertical: 2,
    },
    titleFields: {
      justifyContent: "flex-start",
      top: 10,
      left: 15,
    },
    titleFields_text: {
      fontSize: 16,
      fontStyle: "italic",
      color: "#C4C4C4",
    },
    friendsNote: {
      marginTop: 30,
      marginBottom: 10,
    },
    friendInfo: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      // shadowColor: "grey",
      // shadowOffset: { width: 0, height: 3 },
      // shadowOpacity: 1,
    },
    wrapped: {
      marginVertical: 20,
    },
    testEcarteur: {
      height: 30,
    },
    savOrConButtons: {
      marginVertical: 30,
      flexDirection: "row",
      //justifyContent: "space-around",
      justifyContent: "space-between",
      // shadowColor: "grey",
      // shadowOffset: { width: 0, height: 3 },
      // shadowOpacity: 1,
    },
    textContainer: {
      backgroundColor: "white",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      position: "absolute",
      left: 95,
    },
    inputText: {
      fontSize: 12,
      lineHeight: 18,
      fontWeight: "300",
    },
    imgContainer: {
      width: 120,
      height: 120,
      marginTop: 180,
      marginBottom: 23,
      // position: "relative",
    },
    logo: {
      position: "absolute",
      left: 90,
      bottom: 183,
    },
    errorCard: {
      width: "80%",
      height: 60,
      //padding: 10,
      backgroundColor: "red",
      margin: 10,
      paddingHorizontal: "auto",
      paddingVertical: "auto",
      marginHorizontal: "auto",
      paddingTop: 5,
      textAlign: "center",
    },
    error: {
      color: "white",
      marginBottom: 20,
      fontWeight: "bold",
      fontSize: 20,
    },
    bigBtn: {
      backgroundColor: "#59c09b",
      height: 50,
      width: "40%",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
      marginHorizontal: 10,
    },
    btnText: {
      color: "white",
      fontSize: 22,
      lineHeight: 33,
      fontWeight: "700",
    },
    img: {
      width: 120,
      height: 120,
      borderRadius: 60,
      marginTop: -178,
      marginLeft: 3,
    },
    checkBoxContainer: {
      flexDirection: "row",
      width: "100%",
      paddingHorizontal: "3%",
      //justifyContent:"center",
      marginTop: 10,
      flexWrap: "wrap",
    },
    checkContainer: {
      width: "25%",
    },
    //on utilisera ce style dans la seconde partie qui concerne le children, tobacco etc...car elle gère la taille de la View du checkbox
    checkContainer_sub: {
      width: "30%",
    },
    checkbox: {
      borderColor: "#59c09b",
      borderWidth: 2,
      borderRadius: 10,
    },
    titleOne: {
      backgroundColor: "white",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
    },
    titleTwo: {
      backgroundColor: "white",
      paddingTop: 15,
      paddingHorizontal: "2%",
      marginBottom: 20,
    },
    selectsContainer: {
      backgroundColor: "white",
      paddingTop: 10,
      paddingHorizontal: "2%",
    },
    selectLanguageContainer: {
      backgroundColor: "white", 
      paddingHorizontal: "2%"
    },
    titleAgeContainer: {
      backgroundColor: "white",
      paddingHorizontal: "2%",
      marginTop: 20,
    },
    childrenContainer: {
      backgroundColor: "white",
      paddingHorizontal: "2%",
      marginTop: 20,
    },
    tobaccoContainer: {
      backgroundColor: "white",
      paddingHorizontal: "2%",
      marginTop: 20,
    },
    alcoholContainer: {
      backgroundColor: "white",
      paddingHorizontal: "2%",
      marginTop: 20,
    },
  });

export default styles