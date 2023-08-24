import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    paddingHorizontal: 10,
    justifyContent: "center",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 15,
  },
  btnContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    fontSize: 13,
    textAlign: "center",
    position: "absolute",
    zIndex: 1,
    left: 20,
    top: -10,
  },
  input: {
    width: "90%",
    marginLeft: 10,
    fontSize: 16,
  },
});

export default styles;
