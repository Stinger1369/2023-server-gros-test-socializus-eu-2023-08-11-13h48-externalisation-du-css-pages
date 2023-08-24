import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      marginTop: "5%",
      flexDirection: "row",
      width: "95%",
      height: 70,
      overflow: "hidden",
      borderRadius: 50,
      backgroundColor: "#FFA113",
      justifyContent: "space-evenly",
    },
  
    nav: {
      flex: 1,
      paddingVertical: 10,
      paddingHorizontal: 5,
      justifyContent: "space-between",
      alignItems: "center",
      borderColor: "white",
    },
  
    navText: {
      fontWeight: "bold",
      fontSize: 11,
      color: "white",
    },
  });
  

export default styles