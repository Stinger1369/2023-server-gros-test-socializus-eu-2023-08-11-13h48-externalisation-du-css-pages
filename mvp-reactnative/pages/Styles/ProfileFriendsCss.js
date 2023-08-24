import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      backgroundColor: "white",
    },
    networkTitle: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    publicBtn: {
      backgroundColor: "#6271FF",
      width: 60,
      height: 20,
      borderRadius: 50,
    },
    seeText: {
      color: "white",
      textAlign: "center",
    },
    networkCard: {
      backgroundColor: "white",
      width: "30%",
      height: 200,
      borderRadius: 20,
      marginTop: "5%",
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
    userStatut: {
      textAlign: "center",
      marginTop: "7%",
    },
    crossBtn: {
      alignItems: "center",
      marginTop: "20%",
    },
    cardContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginHorizontal: "3%",
    },
    title: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: "5%",
      marginTop: "7%",
      alignItems: "center",
    },
    previousRight: {
      width: 40,
      height: 40,
      position: "absolute",
      right: 0,
      bottom: 80,
    },
    previousLeft: {
      width: 40,
      height: 40,
      transform: [{ rotate: "180deg" }],
      position: "absolute",
      bottom: 80,
    },
    userLiked: {
      flexDirection: "row",
      alignItems: "center",
    },
    removeBtn: {
      marginTop: "7%",
    },
    likedContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: "5%",
    },
    likedBigContainer: {
      marginBottom: "10%",
    },
    avatarLiked: {
      width: 40,
      height: 40,
      marginTop: "6%",
      marginHorizontal: "2%",
    },
    previousLiked: {
      marginTop: "11%",
    },
    friendContainer: {
      justifyContent: "space-between",
      flexDirection: "row",
      marginHorizontal: "6%",
      marginVertical: "1%",
    },
    friendUser: {
      flexDirection: "row",
    },
    blocked: {
      marginTop: "5%",
    },
    bottomBtn: {
      marginHorizontal: "5%",
      justifyContent: "space-between",
      flexDirection: "row",
      marginBottom: "5%",
      marginTop: "7%",
    },
    friendList: {
      width: 120,
      backgroundColor: "#62A1FF",
      justifyContent: "center",
      borderRadius: 5,
    },
    shadowBanBtn: {
      width: 120,
      backgroundColor: "black",
      justifyContent: "center",
      borderRadius: 5,
    },
    btnContainer: {
      justifyContent: "space-between",
      flexDirection: "row",
      marginHorizontal: "5%",
      height: 35,
    },
    addFriend: {
      backgroundColor: "#62A1FF",
      width: 100,
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center",
    },
    chat: {
      backgroundColor: "#B85EB7",
      width: 100,
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center",
    },
    block: {
      backgroundColor: "red",
      borderWidth: 1,
      borderColor: "red",
      borderRadius: 5,
      width: 100,
      justifyContent: "center",
      alignItems: "center",
    },
    containerInfo: {
      backgroundColor: "white",
    },
    pourcentageInfo: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: "5%",
      paddingVertical: "5%",
      width: "100%",
      alignItems: "center",
    },
    pourcentageInfo2: {
      alignItems: "center",
    },
    pourcentageBar: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 5,
    },
    positivBar: {
      backgroundColor: "#00BF08",
      height: 10,
      width: 67 * 1.2,
    },
    negativBar: {
      backgroundColor: "#FF0000",
      height: 10,
      width: 33 * 1.2,
    },
    connectionInfo: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: "5%",
      paddingVertical: "5%",
    },
    connectionSubInfo: {
      alignItems: "center",
    },
    title: {
      backgroundColor: "#8BD4BA",
      textAlign: "center",
      fontSize: 18,
      marginHorizontal: "10%",
      marginVertical: "3%",
      fontWeight: "bold",
    },
    aboutDescription: {
      textAlign: "center",
      marginHorizontal: "8%",
      marginTop: "3%",
      fontSize: 14,
    },
    language: {
      flexDirection: "row",
      marginTop: "5%",
      marginHorizontal: "5%",
    },
    situationInfo: {
      marginTop: "5%",
      alignItems: "center",
    },
    situation: {
      fontWeight: "bold",
      fontSize: 16,
      marginVertical: "1%",
    },
    activitiesDone: {
      flexDirection: "row",
      justifyContent: "center",
      marginHorizontal: "4%",
    },
    activitiesContainer: {
      flexDirection: "column",
      marginVertical: "3%",
      marginHorizontal: "1%",
    },
    activityStyle: {
      fontSize: 13,
      fontWeight: "500",
      marginVertical: "3%",
    },
    activitiesInfo: {
      flexDirection: "row",
      justifyContent: "space-between",
      borderBottomWidth: 0.5,
      borderColor: "#9D9D9D",
      marginHorizontal: "2%",
      marginBottom: "5%",
    },
    whatILoveToDo: {
      alignItems: "center",
      fontSize: 20,
      backgroundColor: "#59C19C",
      height: 20,
    },
    userPseudo: {
      color: "black",
      fontWeight: "bold",
      fontSize: 20,
    },
    infoText: {
      justifyContent: "space-between",
      flexDirection: "row",
      marginHorizontal: "4%",
      marginVertical: "5%",
    },
    networkTxt: {
      marginTop: "14%", 
      fontWeight: "700",
    },
    nbrTxt: {
      fontWeight: "700", 
      color: "#59C09B", 
      fontSize: 18
    },
    membersTxt: {
      fontStyle: "italic",
    },
    likedTxt: {
      fontWeight: "700",
    },


  });

export default styles