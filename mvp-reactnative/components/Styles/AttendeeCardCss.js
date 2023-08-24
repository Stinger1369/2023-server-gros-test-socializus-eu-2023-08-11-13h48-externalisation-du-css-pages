import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    knowledgeCard: {
      margin: 3,
      padding: 10,
      width: 100,
      height: 150,
      backgroundColor: "white",
      borderRadius: 20,
      position: "relative",
  
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    userAvatar: {
      width: 50,
      height: 50,
      alignSelf: "center",
      marginTop: "10%",
    },
    userName: {
      textAlign: "center",
      marginTop: "7%",
      fontWeight: "600",
      color: "#59C09B",
    },
    userStatus: {
      textAlign: "center",
      marginTop: "7%",
    },
    removeUserButton: {
      marginTop: 5,
      width: 30,
      height: 30,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      backgroundColor: "#FF000026",
      borderRadius: 50,
    },
    likeButton: {
      position: "absolute",
      left: 5,
      margin: 10,
      zIndex: 2,
    },
  });

export default styles