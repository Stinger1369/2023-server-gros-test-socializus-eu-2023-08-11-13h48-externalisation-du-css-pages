import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  CardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: "3%",
  },

  knowledgeCard: {
    backgroundColor: "white",
    width: "30%",
    height: 200,
    borderRadius: 20,
    marginTop: "5%",
    shadowColor: "#000",
  },
  userAvatar: {
    width: 50,
    height: 50,
    alignSelf: "center",
    marginTop: "10%",
  },
  userName: {
    textAlign: "center",
    marginTop: "7%",
    fontWeight: "600",
    color: "#59C09B",
  },
  userStatut: {
    textAlign: "center",
    marginTop: "7%",
  },

  crossBtn: {
    alignItems: "center",
    marginTop: "20%",
  },
});

export default styles;
