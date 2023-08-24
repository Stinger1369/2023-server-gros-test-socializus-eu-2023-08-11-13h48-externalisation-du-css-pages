import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  checkBoxInput: {
    margin: 5,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "#59c09b",
    borderRadius: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 2,
    borderColor: "#59c09b",
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.42,
    shadowRadius: 2.22,
  },
  buttonSelected: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#59c09b",
    borderRadius: 10,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.42,
    // shadowRadius: 2.22,
  },
  textButton: {
    textAlign: "center",
    color: "#59c09b",
    fontWeight: "bold",
  },
  textButtonSelected: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
});

export default styles;
