import { StyleSheet } from "react-native";

const styles = StyleSheet.create({


  
    burger: {
      position: "absolute",
      top: 0,
      bottom: 0,
      backgroundColor: "#ffffff",
      color: "#000000",
    },  
   
    avatar: {
      width: 65,
      height: 65,
      borderRadius: 65/2,
      objectFit: "cover"
    },
    headBurger: {
      backgroundColor:  "#59C09B",
      paddingTop: 40.5,
      paddingBottom: 8,
      paddingLeft: 23,
      fontSize: 15,
      flexDirection: "row",
      position: "relative",
    },
    cross: {
      position: "absolute",
      bottom: 20,
      right: 20,
      backgroundColor: "#001AFF",
      padding: 5,
    },
    profile: {
      width: 65,
    },
    nameProfile: {
      fontSize: 15,
      fontWeight: "bold",
      color: "#001AFF",
      textAlign: "center",
    },
    flex: {
      paddingLeft: 23,
      paddingRight: 10,
      marginTop: 19,
      flexDirection: "row",
    },
    itemText: {
      fontSize: 16,
      fontWeight: "500",
      marginBottom: 15,
      marginLeft: 15,
    },
  
    shadow: {
    backgroundColor:"red",
    position:"absolute",
    top:0,
    bottom:0,
    },
  });

export default styles