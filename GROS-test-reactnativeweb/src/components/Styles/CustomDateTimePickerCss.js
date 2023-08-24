import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 15,
    //paddingVertical : 15,
    justifyContent: "center",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    marginTop: 5,
  },
  row2: {
    flexDirection: "row",
  },
  boldTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 10,
  },
  icon: {
    marginHorizontal: 15,
    width: 24,
    height: 24,
  },
});

export default styles;
