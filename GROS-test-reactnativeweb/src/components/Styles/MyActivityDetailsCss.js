import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  activityOne: {
    marginTop: 5,
    backgroundColor: "#D8EDE6",
    flexDirection: "row",
    fontWeight: "bold",
    height: 100,
    marginVertical: 5,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 20,
  },
  viewOne: {
    width: "28%",
    backgroundColor: "#59C09B",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    justifyContent: "space-between",
  },
  viewTwo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  eventTopicTxt: {
    padding: 5,
    borderBottomLeftRadius: 20,
    backgroundColor: "blue",
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  viewThree: {
    width: "72%",
    paddingVertical: 7,
    paddingHorizontal: 10,
  },
  viewFour: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  viewFive: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", 
  },
  startTimeTxt: {
    fontWeight: "bold", 
    color: "#F48A0D"
  },
  viewSix: {
    flexDirection: "row", 
    alignItems: "center"
  },
  participantsImg: {
    width: 20, 
    height: 20
  },
  participantsTxt: {
    marginLeft: 3, 
    fontWeight: "bold"
  },
});

export default styles;
