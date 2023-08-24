import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "white",
  },
  slideContainer: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    paddingTop: 10,
  },
  button: {
    backgroundColor: "#59c09b",
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: "30%",

    marginLeft: 55,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  rightCircle: {
    display: "none",
  },
  leftCircle: {
    display: "none",
  },
});

export default styles;
