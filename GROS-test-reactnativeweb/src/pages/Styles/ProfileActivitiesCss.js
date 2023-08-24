import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: "5%",
    marginBottom: "1%",
  },
  tab: {
    backgroundColor: "#F9F9F9",
    marginHorizontal: "3%",
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: "#DDDDDD",
  },
  subTitle: {
    flexDirection: "row",
    marginVertical: "2%",
  },
  activityPhoto: {
    width: "100%",
    height: 300,
    maxHeight: 300,
    minHeight: 300,
  },
  activitiesInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    borderColor: "#9D9D9D",
    marginHorizontal: "2%",
    marginBottom: "5%",
  },
  whatIHaveDone: {
    alignItems: "center",
    fontSize: 20,
    backgroundColor: "#59C19C",
    height: 25,
  },
  infoText: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: "4%",
    marginVertical: "5%",
  },
  btnContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: "5%",
    height: 35,
  },
  btnContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: "5%",
    height: 35,
  },
  addFriend: {
    backgroundColor: "#62A1FF",
    width: 100,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  chat: {
    backgroundColor: "#B85EB7",
    width: 100,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  block: {
    backgroundColor: "red",
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 5,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  userPseudo: {
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
  },
  activitiesDone: {
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: "4%",
  },
  activitiesContainer: {
    flexDirection: "column",
    marginVertical: "3%",
    marginHorizontal: "1%",
  },
  pourcentageInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "5%",
    paddingVertical: "5%",
    width: "100%",
    alignItems: "center",
  },
  subTitleTxt: {
    marginLeft: "6%",
    fontWeight: "500",
    fontSize: 12.5,
  },
  eventTxt: {
    marginLeft: "23%", 
    fontWeight: "500", 
    fontSize: 12.5
  },
  registeredTxt: {
    marginLeft: "17%", 
    fontWeight: "500", 
    fontSize: 12.5
  },
  organizerTxt: {
    marginLeft: "1%", 
    fontWeight: "500", 
    fontSize: 12.5 
  },
  dateTxt: {
    marginLeft: "6%", 
    fontWeight: "500", 
    fontSize: 12.5 
  },

});

export default styles;
