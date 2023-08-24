import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    photo: {
      alignSelf: "center",
      marginBottom: 10,
      borderRadius: 50,
      width: 90,
      height: 90,
      marginTop: 20,
    },
    trophee: {
      backgroundColor: "white",
      width: 28,
      height: 28,
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      position: "absolute",
      bottom: 8,
      right: 36,
    },
  
    qrView: {
      alignItems: "center",
      marginTop: 10,
    },
    qr: {
      flex: 1,
      marginVertical: 20,
      alignItems: "center",
    },
    qrContent: {
      padding: 40,
      borderRadius: 20,
      backgroundColor: "#EDEDED",
      alignSelf: "center",
    },
    button: {
      paddingVertical: 10,
      paddingHorizontal: 30,
      color: "#fff",
      backgroundColor: "#59c09b",
      borderRadius: 10,
      marginTop: 40,
      alignSelf: "center",
    },
    scrollviewContainer: {
      backgroundColor: "white"
    },
    portraitStyle: {
      position: "relative", 
    },
    usernameTxt: {
      color: "#59c09b", 
      fontWeight: "600"
    },
    qrViewTxt: {
      fontSize: 17, 
    },
    downloadTxt: {
      color: "#fff",
      fontSize: 20,
      textAlign: "center",
      fontWeight: "600",
    },
  });
  

export default styles