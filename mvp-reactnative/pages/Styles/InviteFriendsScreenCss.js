import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    friendship: {
      alignItems: "center",
      marginBottom: 40,
      marginTop: 30,      
    },    
  
    CtctsNumber: {
      backgroundColor: "#fedc56",
      maxWidth: "15%",
      borderRadius: 5,
      shadowOpacity: 0.5,
      shadowColor: "#fee12b",
      marginTop: 10,
      width: 30,
    },
    email: {
      backgroundColor: "red",
    },
    social: {
      flexDirection: "row",
      marginHorizontal: 20,
      backgroundColor: "#f6f6f6",
      borderRadius: 10,
      marginTop: 20,
      height: 70,
      shadowOpacity: 0.3,
    },
  
    txt: {
      fontSize: 16,
      fontWeight: "600",
      alignSelf: "center",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: 10,
    },
    scrollViewContainer: {
      backgroundColor: "white",
    },
    friendshipContainer: {
      backgroundColor: "white", 
      width: "100%", 
      height: "100%" 
    },
    textContainer: {
      marginTop: 20, 
      marginHorizontal: 20
    },
    inviteTxt: {
      fontSize: 14, 
      fontWeight: "bold", 
      marginTop: 20
    },
    whatsappContainer: {
      width: 30, 
      height: 30, 
      alignSelf: "center", 
      margin: "10%"
    },
    tiktokContainer: {
      alignSelf: "center", 
      marginLeft: "10%" 
    },
  });

export default styles