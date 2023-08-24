import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  basicStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
  },

  // Small container style
  container_small: {
    marginVertical: 7,
    marginHorizontal: 10,
    height: "110",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  leftSide: {
    width: "27%",
    justifyContent: "space-between",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  activityImg_small: {
    width: "100%",
    height: 110,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    //resizeMode: "cover",
  },
  rightSide: {
    width: "72%",
    padding: 7,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  textWithIcon: {
    marginLeft: 5,
    fontWeight: "bold",
  },
  userStatusText: {
    width: "100%",
    padding: 5,
    borderBottomLeftRadius: 20,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    letterSpacing: 0.3,
    position: "absolute",
    bottom: 0,
  },

  // Large container style
  container_large: {
    height: 270,
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 20,
  },
  upperSide: {
    height: "60%",
    justifyContent: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  activityImg_large: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    resizeMode: "cover",
  },
  userStatusText_large: {
    width: "100%",
    padding: 5,
    backgroundColor: "#59c09b",
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    letterSpacing: 0.3,
    position: "absolute",
    bottom: 0,
  },
  lowerSide: {
    width: "100%",
    height: "40%",
    padding: 7,
    // alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  imgContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    height: "100%",
  },
  dollarImgStyle: {
    position: "absolute",
    top: 7,
    right: 7,
    width: 20,
    height: 20,
  },
  titleTxt: {
    flexWrap: "wrap",
    height: 45,
    fontWeight: "bold",
    fontSize: 14,
  },
  startTimeTxt: {
    paddingVertical: 5,
    fontWeight: "bold",
    color: "#F48A0D",
  },
  activityTypeContainer: {
    paddingBottom: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  activityTypeImg: {
    width: 45,
    height: 45,
    borderRadius: 50,
    resizeMode: "contain",
  },
  activityTypeImgTwo: {
    width: 45, 
    height: 45, 
    borderRadius: 50
  },
  flexContainer: {
    flex: 1, 
    flexDirection: "row"
  },
  participantsImg: {
    width: 20, 
    height: 20 
  },
  placeHolderImg: {
    width: 18, 
    height: 18 
  },
  eventTopicTxt: {
    color: "#4D96E9",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default styles;
