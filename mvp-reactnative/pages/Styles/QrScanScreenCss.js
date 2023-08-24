import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      justifyContent: "center",
      alignItems: "center",
    },
    cameraDeniedText:{
      margin: 10
    },
    cameraPermissionText:{
      justifyContent: "center", 
      alignItems: "center", 
      fontSize: 18
    },
    barCodeBox: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: -80,
      marginHorizontal: 10,
      width: "100%",
      height: 500,
      position: "relative",
    },
    customFrame: {
      position: "absolute",
      width: "100%",
      height: 100,
      backgroundColor: "white",
      zIndex: 1,
      bottom: 0
    },
    mainText: {
      margin: 20,
      marginTop: -50,
      alignSelf: "center",
      fontSize: 16,
      zIndex: 2,
    },
    scanAgainButton: {
      marginTop: 10,
      paddingVertical: 8,
      paddingHorizontal: 30,
      backgroundColor: "#59c09b",
      borderRadius: 10,
      justifyContent: "center",
    },
    scanAgainText: {
      color: "white",
      fontSize: 16,
      fontWeight: "600",
      letterSpacing: 0.5,
    },
  });

export default styles