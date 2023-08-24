import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: 10,
      paddingHorizontal: 10,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderRadius: 25,
    },
    upperText: {
      paddingHorizontal: 5,
      backgroundColor: "#fff",
      fontSize: 12,
      position: "absolute",
      top: -10,
      left: 20,
    },
    innerContent: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    modalContainer: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      alignItems: "center",
    },
    countryModalView: {
      width: "90%",
      height: "95%",
      marginVertical: 10,
      paddingTop: 5,
      paddingBottom: 10,
      paddingHorizontal: 5,
      borderRadius: 15,
      backgroundColor: "white",
    },
    countryModalTitle: {
      marginTop: 5,
      fontWeight: "bold",
      fontSize: 20,
      textAlign: "center",
    },
    flagShadow: {
      position: "absolute",
      width: 34,
      height: 24,
      backgroundColor: "#59c09b",
      zIndex: -1,
      top: 5,
    },
  });

export default styles