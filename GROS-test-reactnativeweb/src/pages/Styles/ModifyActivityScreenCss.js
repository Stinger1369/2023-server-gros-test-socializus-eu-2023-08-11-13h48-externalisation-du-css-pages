import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  center: {
    alignItems: "center",
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  title: {
    color: "#3A8569",
    marginTop: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  subTitle: {
    color: "#3A8569",
    marginBottom: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  fields: {
    marginVertical: 10,
  },
  boldTitle: {
    fontWeight: "bold",
    fontSize: 18,
  },
  boldTitleSecondary: {
    fontWeight: "bold",
    fontSize: 16,
  },
  important: {
    color: "red",
    marginBottom: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  temporaryUserIcon: {
    backgroundColor: "lightgrey",
    width: 125,
    height: 125,
    borderRadius: 70,
    marginVertical: 20,
  },
  proOrPerso: {
    marginVertical: 15,
  },
  membership: {
    flexDirection: "row",
  },
  membershipNumber: {
    color: "#3A8569",
    marginLeft: 10,
    marginBottom: 15,
    fontWeight: "bold",
  },
  localizationRow: {
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timeDataContainer: {
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 25,
    height: 40,
    justifyContent: "space-around",
    alignItems: "center",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 15,
  },
  timePickView: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  middle: {
    borderRightColor: "black",
    borderRightWidth: 1,
    borderLeftColor: "black",
    borderLeftWidth: 1,
  },
  switchRow: {
    marginVertical: 10,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  friendsNote: {
    marginTop: 30,
    marginBottom: 10,
  },
  friendInfo: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
  },
  testEcarteur: {
    height: 30,
  },
  savOrConButtons: {
    marginVertical: 15,
    marginHorizontal: "2%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  styledInputDay: {
    margin: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  styledInputDayChosen: {
    margin: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#59c09b",
  },
  specialText: {
    paddingLeft: 5,
    color: "#59c09b",
    fontWeight: "bold",
  },
  sliderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  slider: {
    marginVertical: 20,
    alignSelf: "center",
    width: "100%",
    height: 15,
  },
  coOrganizersOptions: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  coOrganizerCard: {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    alignItems: "center",
    backgroundColor: 15,
    borderRadius: 15,
    backgroundColor: "#E6E6E6",
  },
  coOrganizerIcon: {
    margin: 5,
    width: 55,
    height: 55,
    backgroundColor: "white",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  stepOneTxt: {
    marginTop: -15, 
    marginBottom: 20, 
    color: "#a6a6a6"
  },
  coOrganizerOfferDrinkTxt: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
  },
  errorMsgTxt: {
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
    color: "#ff0000",
  },
});

export default styles;
