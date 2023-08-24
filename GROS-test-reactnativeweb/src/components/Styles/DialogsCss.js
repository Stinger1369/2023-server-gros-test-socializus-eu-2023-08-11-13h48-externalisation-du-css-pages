import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  dialog: {
    marginHorizontal: 20,
    maxWidth: 425,
  },
  dialogText: {
    textAlign: "center",
    color: "#59c09b",
    fontSize: 18,
    fontWeight: "bold",
  },
  dialogButton: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 15,
    borderColor: "#59c09b",
    borderWidth: 2,
  },
  dialogButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  deleteContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  activateContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "center", 
  },
  deleteContainerTwo: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  navigationContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default styles;
