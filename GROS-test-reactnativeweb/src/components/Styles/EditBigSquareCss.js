import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    height: 120,
    width: 150,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "white",
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 18.75,
    marginBottom: 10,
  },
  text: {
    fontSize: 10,
    lineHeight: 15,
    fontWeight: "400",
  },
});

export default styles;
