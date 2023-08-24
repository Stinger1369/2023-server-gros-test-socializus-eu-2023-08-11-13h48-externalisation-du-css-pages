import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  bubble: {
    marginVertical: 5,
    width: "100%",
  },
  bubbleContainer: {
    paddingTop: 20,
    alignItems: "flex-end",
  },
  messageSenderName: {
    fontSize: 12,
    position: "absolute",
    top: -17,
    left: 5,
  },
  messageSenderImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#ddd",
    alignSelf: "flex-end",
  },
  messageBubble: {
    flex: 1,
    marginHorizontal: 8,
    padding: 8,
    maxWidth: 300,
    borderRadius: 10,
    position: "relative",
  },
  bubbleTriangle: {
    position: "absolute",
    bottom: -5,
    left: -10,
  },
  bubbleUserTriangle: {
    position: "absolute",
    bottom: -5,
    right: -10,
  },
  messageTime: {
    alignSelf: "flex-end",
    color: "white",
  },
  deleteMessageIcon: {
    marginVertical: "auto",
    width: 25,
    height: 25,
    borderRadius: 50,
    backgroundColor: "#ff00004a",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  map: {
    height: 260,
  },
  commentImg: {
    width: 283,
    height: 300,
  },
});

export default styles;
