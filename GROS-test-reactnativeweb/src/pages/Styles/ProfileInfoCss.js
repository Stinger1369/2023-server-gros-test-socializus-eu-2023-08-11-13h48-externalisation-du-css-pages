import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  font: {
    fontSize: 15,
  },
  greyText: {
    fontSize: 17,
    color: "#494949",
    fontWeight: "400",
  },
  profilePhoto: {
    width: "100%",
    height: 300,
    maxHeight: 300,
    minHeight: 300,
  },
  actionProfile: {},
  userPseudo: {
    color: "black",
    fontSize: 20,
  },
  userAge: {
    color: "black",
    fontSize: 20,
  },
  userPoint: {
    color: "#59C09B",
    fontSize: 20,
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
  containerInfo: {
    backgroundColor: "white",
  },
  pourcentageInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "5%",
    paddingVertical: "5%",
    width: "100%",
    alignItems: "center",
  },
  pourcentageInfo2: {
    alignItems: "center",
  },
  pourcentageBar: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  positivBar: {
    backgroundColor: "#00BF08",
    height: 10,
    width: 67 * 1.2,
  },
  negativBar: {
    backgroundColor: "#FF0000",
    height: 10,
    width: 33 * 1.2,
  },
  connectionInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "5%",
    paddingVertical: "5%",
  },
  connectionSubInfo: {
    alignItems: "center",
  },
  title: {
    backgroundColor: "#59C09B",
    textAlign: "center",
    fontSize: 18,
    marginHorizontal: 0,
    marginVertical: 0,
    fontWeight: "bold",
  },
  aboutDescription: {
    textAlign: "center",
    marginHorizontal: "8%",
    marginTop: "3%",
    fontSize: 14,
  },
  language: {
    flexDirection: "row",
    marginHorizontal: "5%",
  },
  situationInfo: {
    justifyContent: "space-between",
    marginHorizontal: 28,
    marginTop: "5%",
    marginBottom: 20,
    flexDirection: "row",
    flex: 1,
  },
  situation: {
    fontWeight: "bold",
    fontSize: 16,
    marginVertical: "1%",
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
  activityStyle: {
    fontSize: 13,
    fontWeight: "500",
    marginVertical: "3%",
  },
  activitiesInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    borderColor: "#9D9D9D",
    marginHorizontal: "2%",
    marginBottom: "0%",
  },
  whatILoveToDo: {
    alignItems: "center",
    fontSize: 20,
    backgroundColor: "#59C19C",
    height: 20,
  },
  nativeTxt: {
    fontWeight: "bold", 
    fontSize: 16, 
    margin: 5
  },
  flagImg: {
    margin: 5, 
    width: 20, 
    height: 20
  },
  spokenLangTxt: {
    fontWeight: "bold", 
    fontSize: 16, 
    margin: 5
  },
  countriesListImg: {
    margin: 5, 
    width: 20, 
    height: 20
  },
  hobbiesListView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "5%",
    marginTop: 5,
  },
  activitiesListImg: {
    margin: 5, 
    width: 40, 
    height: 40
  },
});

export default styles;
