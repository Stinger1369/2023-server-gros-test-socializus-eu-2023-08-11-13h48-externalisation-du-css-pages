import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    paddingHorizontal: 30,
    height: 45,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  buyOrChatType: {
    fontSize: 20,
    lineHeight: 30,
    fontWeight: "700",
  },
  type: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "500",
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

export default styles;
