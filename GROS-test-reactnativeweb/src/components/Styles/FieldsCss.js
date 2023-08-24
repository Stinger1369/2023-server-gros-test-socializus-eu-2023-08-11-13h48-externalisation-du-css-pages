import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 8,
    alignItems: "center",
    height: 45,
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 15,
  },
  upperSection: {
    flexDirection: "row",
    paddingLeft: 5,
    left: 18,
    position: "absolute",
    top: -10,
    backgroundColor: "white",
  },
  upperText: {
    paddingHorizontal: 5,
    fontSize: 12,
  },
  input: {
    paddingLeft: 10,
    height: 45,
    fontSize: 16,
    position: "relative",
  },
  icons: {
    width: "100%",
    marginLeft: 8,
    marginRight: 26,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  upperIcon: {
    width: 16,
    height: 16,
  },
  icon: {
    width: 30,
    height: 30,
  },
});

export default styles;
