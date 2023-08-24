import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  knowledgeCard: {
    margin: 3,
    padding: 10,
    width: 110,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    position: "relative",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    alignSelf: "center",
    marginTop: "10%",
  },
  userName: {
    textAlign: "center",
    fontWeight: "600",
    color: "#59C09B",
  },
  userStatus: {
    textAlign: "center",
    marginTop: -5,
    fontSize: 10,
  },
  removeUserButton: {
    marginTop: 5,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#FF000026",
    borderRadius: 50,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    //shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  button: {
    padding: 10,
    backgroundColor: "#59C09B", // default color
    borderRadius: 5,
    margin: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  modalSubView: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default styles;
