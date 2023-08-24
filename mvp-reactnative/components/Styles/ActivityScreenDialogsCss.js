import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
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
  modalButton: {
    alignSelf: "flex-end",
  },
  dialogView: {
    marginTop: 15, 
    flexDirection: "row", 
    justifyContent: "space-evenly"
  },
  participantsView: {
    marginTop: 15, 
    flexDirection: "row", 
    justifyContent: "center"
  },
});

export default styles