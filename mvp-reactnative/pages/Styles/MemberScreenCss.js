import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center"
    },
    photo: {
      height: 300,
      width: "100%"
    },
    legend: {
      height: 110,
      backgroundColor: "black",
      flexDirection: "row",
      paddingTop: 10,
      paddingLeft: 12
    },
    legendTextName: {
      color: "white",
      fontWeight: "bold",
      fontSize: 25,
      paddingTop: 5
    },
    legendTextAge: {
      color: "white",
      fontSize: 20,
      paddingTop: 10
    },
  
    font: {
      fontSize: 12
    },
  
    blueText: {
      fontSize: 17,
      color: "#2E00B2",
      fontWeight: "400"
    },
  
    profilePhoto: {
      width: "100%",
      height: 300,
      maxHeight: 300,
      minHeight: 300
    },
  
    actionProfile: {
      backgroundColor: "black",
      width: "100%",
      height: 120
    },
  
    userPseudo: {
      color: "white",
      fontSize: 20
    },
  
    userAge: {
      color: "white",
      fontSize: 20
    },
  
    userPoint: {
      color: "#59C09B",
      fontSize: 20
    },
  
    infoText: {
      justifyContent: "space-between",
      flexDirection: "row",
      marginHorizontal: "4%",
      marginVertical: "5%"
    },
  
    btnContainer: {
      justifyContent: "space-between",
      flexDirection: "row",
      marginHorizontal: "5%",
      height: 35
    },
  
    addFriend: {
      backgroundColor: "#62A1FF",
      width: 100,
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center"
    },
  
    chat: {
      backgroundColor: "#B85EB7",
      width: 100,
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center"
    },
  
    block: {
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor: "white",
      borderRadius: 5,
      width: 100,
      justifyContent: "center",
      alignItems: "center"
    },
  
    containerInfo: {
      backgroundColor: "white"
    },
  
    pourcentageInfo: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: "5%",
      paddingVertical: "5%",
      width: "100%",
      alignItems: "center"
    },
  
    pourcentageInfo2: {
      alignItems: "center"
    },
  
    pourcentageBar: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 5
    },
  
    positivBar: {
      backgroundColor: "#00BF08",
      height: 10,
      width: 67 * 1.2
    },
  
    negativBar: {
      backgroundColor: "#FF0000",
      height: 10,
      width: 33 * 1.2
    },
  
    connectionInfo: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: "5%",
      paddingVertical: "5%"
    },
  
    connectionSubInfo: {
      alignItems: "center"
    },
  
    aboutMe: {},
  
    title: {
      backgroundColor: "#8BD4BA",
      textAlign: "center",
      fontSize: 18,
      marginHorizontal: "10%",
      marginVertical: "3%",
      fontWeight: "bold"
    },
  
    aboutDescription: {
      textAlign: "center",
      marginHorizontal: "8%",
      marginTop: "3%",
      fontSize: 14
    },
  
    language: {
      flexDirection: "row",
      marginTop: "5%",
      marginHorizontal: "5%"
    },
  
    situationInfo: {
      marginTop: "5%",
      alignItems: "center"
    },
  
    situation: {
      fontWeight: "bold",
      fontSize: 16,
      marginVertical: "1%"
    },
  
    activitiesDone: {
      flexDirection: "row",
      justifyContent: "center",
      marginHorizontal: "4%"
    },
  
    activitiesContainer: {
      flexDirection: "column",
      marginVertical: "3%",
      marginHorizontal: "1%"
    },
  
    activityStyle: {
      fontSize: 13,
      fontWeight: "500",
      marginVertical: "3%"
    },
    attendingTxt: {
      fontSize: 15, 
      color: "#00BF08", 
      fontWeight: "600"
    },
    missingTxt: {
      fontSize: 15, 
      color: "#FF0000", 
      fontWeight: "600"
    },
    nativeLangTxt: {
      fontWeight: "bold", 
      fontSize: 16
    },
    blueColor: {
      color: "#2E00B2"
    },
  });

export default styles