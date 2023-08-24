import { StyleSheet } from "react-native";

export const createActivityStyle = StyleSheet.create({
  // General style
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

  subTitle: {
    color: "red",
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
  important: {
    width: "100%",
    color: "red",
    marginBottom: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  proOrPerso: {
    marginVertical: 15,
  },
  switchRow: {
    marginVertical: 10,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  savOrConButtons: {
    marginVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    borderRadius: 10,
  },

  // Step 0
  mainTitle: {
    width: "100%",
    textAlign: "center",
    fontSize: 18,
  },
  imagesContainer: {
    flex: 1,
  },
  activityTypeImage: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  imageText: {
    width: "100%",
    position: "absolute",
    top: "50%",
    textAlign: "center",
    fontSize: 16,
  },

  // Step1 style
  localizationRow: {
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  // Step2 style
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

  // Step3 style

  // Step4 style
  //No style

  // Step5 style
  //No style

  // Step6 style
  boldTitleSecondary: {
    fontWeight: "bold",
    fontSize: 16,
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
});
