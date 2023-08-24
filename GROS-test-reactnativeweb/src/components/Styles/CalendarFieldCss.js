import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    flexDirection: "row",
    justifyContent: "center",
  },
  row: {
    width: "100%",
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    fontSize: 13,
    textAlign: "center",
    position: "absolute",
    zIndex: 1,
    left: 45,
    top: -10,
  },
  boldTitle: {
    fontWeight: "bold",
    fontSize: 18,
  },
  icon: {
    marginHorizontal: 10,
  },
  result: {
    paddingRight: 5,
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 0.5,
  },
  textInput: {
    width: "100%",
    fontSize: 16,
    color: "black",
    letterSpacing: 0.3,
  },
  scheduleIconStyle: {
    marginHorizontal: 10, 
    width: 24, 
    height: 24
  },
  datePickerBtn: {
    marginVertical: 15,
    flexDirection: "row",
  },
  datePickerView: {
    flexDirection: "row", 
    alignItems: "center"
  },
  scheduleIconImg: {
    marginLeft: 0, 
    marginRight: 10, 
    width: 24, 
    height: 24
  },
  textInputStyle: {
    fontSize: 16, 
    color: "#F48A0D", 
    letterSpacing: 0.3
  },
});

export default styles;
