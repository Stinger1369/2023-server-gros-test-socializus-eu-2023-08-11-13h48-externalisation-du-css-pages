import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    btn: {
      flex: 1,
      height: 45,
      borderRadius: 30,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
    },
    buyOrChatType: {
      fontSize: 20,
      lineHeight: 30,
      fontWeight: "bold",
    },
    type: {
      fontSize: 14,
      fontWeight: "bold",
      textAlign: "center",
    },
    emote: {
      width: 26,
      height: 32,
      backgroundColor: "orange",
      marginLeft: 10,
    },
    secondEmote: {
      width: 38,
      height: 38,
      backgroundColor: "green",
      marginLeft: 20,
    },
  });

export default styles