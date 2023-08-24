import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 10,
      paddingTop: 3,
      justifyContent: "center",
      alignItems: "center",
      fontSize: 16,
    },
    btnContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    title: {
      flex: 1,
      paddingHorizontal: 10,
      backgroundColor: "#fff",
      fontSize: 12,
      alignSelf: "center",
      position: "absolute",
      zIndex: 2,
      top: -13,
    },
    icon: {
      zIndex: 2,
    },
    result: {
      paddingLeft: 5,
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 16,
      letterSpacing: 0.5,
    },
  });

export default styles