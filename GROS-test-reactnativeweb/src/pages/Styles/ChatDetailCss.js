import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 20,
  },
  wrapcontainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingTop: 10, // Add padding at the top to separate from other content
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.18)",
    borderRadius: 40,
    backgroundColor: "rgba(28, 35, 43, 0.08)",
    flex: 1,
    marginRight: 10,
    height: 50,
  },
  iconContainer: {
    padding: 8,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: "#1D1144",
  },
  inputText: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    color: "#333",
    fontSize: 16,
  },
  sendIcon: {
    width: 60,
    height: 60,
    flexShrink: 0,
    borderRadius: 30,
  },
});

export default styles;
