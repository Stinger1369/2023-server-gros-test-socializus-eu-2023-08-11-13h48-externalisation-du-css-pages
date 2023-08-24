import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  text: {
    flexDirection: "row",
    marginTop: 30,
    marginBottom: 15,
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
  },
  map: {
    height: 260,
  },
  activityImage: {
    width: "100%",
    height: "100%",
    //backgroundColor: "#59b09c",
    resizeMode: "contain",
  },
  image: {
    flex: 1,
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
  primaryInfos: {
    alignItems: "center",
  },
  activityTitle: {
    marginVertical: 10,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  boldInfos: {
    marginLeft: 5,
    fontSize: 18,
    fontWeight: "bold",
  },
  center: {
    alignItems: "center",
  },
  header: {
    width: "100%",
    //height: 260,
    aspectRatio: 16 / 9,
  },
  legend: {
    width: "100%",
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  legendTextTitle: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
  },
  legendTextTime: {
    color: "darkred",
    fontWeight: "bold",
    fontSize: 15,
  },
  screenNav: {
    flexDirection: "row",
    borderRadius: 16,
    backgroundColor: "blue",
    justifyContent: "space-around",
    width: 340,
    height: 50,
    borderColor: "black",
    borderWidth: 1,
  },
  buttonNav: {
    borderColor: "black",
    borderWidth: 4,
    width: 100,
    height: 100,
    backgroundColor: "white",
  },
  stats: {
    width: 340,
    height: 50,
    backgroundColor: "pink",
  },
  activityStats: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 15,
    justifyContent: "space-between",
    alignItems: "center",
  },
  participants: {
    width: 340,
    height: 50,
    backgroundColor: "yellow",
  },
  inviteOrParticipate: {
    justifyContent: "center",
    marginHorizontal: 15,
    paddingVertical: 10,
  },
  about: {
    marginRight: 15,
    paddingVertical: 10,
    paddingLeft: 10,
    fontSize: 22,
    fontWeight: "bold",
  },
  longText: {
    marginHorizontal: 15,
    padding: 10,
    backgroundColor: "white",
  },
  userInfos: {
    fontSize: 13,
    fontWeight: "bold",
    // flexShrink: 0,
  },
  readMoreButton: {
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#59c09b",
    color: "white",
    fontSize: 16,
  },
  buyTicketButton: {
    paddingVertical: 10,
    width: "50%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 30,
    backgroundColor: "gold",
  },

  // Participants CSS //

  networkCard: {
    margin: 3,
    padding: 10,
    width: 100,
    // height: 150,
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
    alignSelf: "center",
    marginTop: "10%",
    borderRadius: 25,
    borderColor: "green",
  },
  userName: {
    textAlign: "center",
    marginTop: "7%",
    fontWeight: "600",
    color: "#59C09B",
  },
  userStatus: {
    textAlign: "center",
    marginTop: "7%",
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
  chatSetting: {
    marginVertical: 8,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  organizerOptions: {
    paddingHorizontal: 15,
    paddingTop: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  // bubble: {
  //   width: "100%",
  // },
  bubbleContainer: {
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  messageSenderName: {
    fontSize: 12,
    position: "absolute",
    top: -17,
    left: 5,
  },
  messageSenderImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#ddd",
    alignSelf: "flex-end",
  },
  messageBubble: {
    flex: 1,
    marginHorizontal: 8,
    padding: 8,
    backgroundColor: "#59c09b",
    borderRadius: 10,
    position: "relative",
  },
  bubbleTriangle: {
    width: 20,
    height: 10,
    backgroundColor: "#59c09b",
    position: "absolute",
    bottom: 0,
    left: -10,
  },
  messageTime: {
    alignSelf: "flex-end",
    color: "white",
  },
  deleteMessageIcon: {
    width: 25,
    height: 25,
    borderRadius: 50,
    backgroundColor: "#ff00004a",
    justifyContent: "center",
    alignItems: "center",
  },
  messageContainer: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  messageInput: {
    flex: 1,
    height: 50,
    position: "relative",
  },
  emojiInput: {
    flex: 1,
    position: "relative",
  },
  messageBox: {
    marginRight: 20,
    width: "100%",
    height: 50,
    paddingHorizontal: 15,
    borderRadius: 30,
    backgroundColor: "#EBEBEB",
  },
  sendButton: {
    marginLeft: 20,
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#59c09b",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    position: "absolute",
    left: 90,
    top: 75,
  },

  listModalContainer: {
    flex: 1,
    marginHorizontal: "auto",
    width: "100%",
    height: "100%",
    maxWidth: 450,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  listModalView: {
    width: "95%",
    height: "95%",
    paddingTop: 5,
    paddingBottom: 10,
    paddingHorizontal: 5,
    borderRadius: 15,
  },
  listModalTitle: {
    marginTop: 5,
    marginBottom: 20,
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  listModalScrollView: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 20,
    flexflow: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "stretch",
  },
  image: {
    width: 26,
    height: 26,
  },
  mapViewStyle: {
    width: "100%",
    height: 260,
    // height: display == 1 || display == 2 || display == 3 ? 260 : 190,
  },
  mapSubView: {
    position: "relative"
  },
  dollarImgStyle: {
    position: "absolute",
    top: 10,
    right: 7,
    width: 30,
    height: 30,
  },
  eventAddressStyle: {
    paddingVertical: 5,
    width: "100%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#606062",
  },
  eventAddressTxt: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  swipeDownTxt: {
    textAlign: "center",
    color: "#FFC107",
    fontSize: 13,
    fontWeight: "bold",
  },
  titleTxtStyle: {
    fontWeight: "bold",
    fontSize: 20,
    width: "100%",
    textAlign: "center",
  },
  legendSubViewStyle: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginHorizontal: 6,
  },
  startTimeTxt: {
    fontWeight: "bold", 
    fontSize: 16, 
    color: "#b12020"
  },
  dateTxtStyle: {
    fontWeight: "bold", 
    fontSize: 16, 
    color: "#b12020"
  },
  eventHosterView: {
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 10,
  },
  eventHosterSubView: {
    flexDirection: "row", 
    alignItems: "center"
  },
  eventHosterImg: {
    width: 40, 
    height: 40, 
    borderRadius: 20
  },
  googlePictoView: {
    flexDirection: "row", 
    alignItems: "center"
  },
  googlePictoImg: {
    marginRight: 5, 
    flexShrink: 0, 
    width:41, 
    height: 41
  },
  zipCodeTxt: {
    fontWeight: "bold",
    fontSize: 17,
    color: "#59c09b",
  },
  scrollViewStyle: {
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 15,
    flexDirection: "row",
    width: "350px",
    marginLeft:"20%",
    justifyContent:"center",
  },
  scrollSubViewStyle: {
    flexDirection: "row", 
    marginStart:30
  },
  scrollViewImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  nbrFriendsStyle: {
    flexDirection:"row", 
    marginTop: 20,
    marginBottom: 10, 
    marginHorizontal: 15,
  },
  nbrFriendsView: {
    position: "absolute",
    right: 10,
    color: "white",
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
  },
  nbrFriendsTxt: {
    color: "white",
    textAlign: "center",
    fontSize: 12,
    textAlignVertical: "center",
  },
  attendeeTxt: {
    marginLeft: 3, 
    fontWeight: "bold"
  },
  activityAboutView: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  editActivityView: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  eventDescriptionTxt: {
    marginTop: 10,
    padding: 5,
    color: "gray",
    textAlign: "justify",
  },
  descReamMoreBtnStyle: {
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: 10,
  },
  socialMediaBtns: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  ticketLinkTxt: {
    marginRight: 5,
    fontSize: 14,
    fontWeight: "bold",
  },
  aboutActView: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  findUsTxt: {
    marginTop: 10,
    padding: 5,
    color: "gray",
    textAlign: "justify",
  },
  findUsBtn: {
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: 10,
  },
  commentsView: {
    width: "100%",
    marginTop: 30,
    padding: 10,
    backgroundColor: "white",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  commentsTxt: {
    paddingLeft: 15, 
    fontWeight: "bold", 
    fontSize: 20
  },
  selectOptionBtn: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  chosenEmojiBtn: {
    marginRight: 10,
    position: "absolute",
    top: 10,
    right: 60,
  },
  locationBtn: {
    marginRight: 10,
    position: "absolute",
    top: 10,
    right: 30,
  },
  activityPhotView: {
    marginRight: 10,
    position: "absolute",
    top: 12,
    right: 2,
  },
  chosenEmojiBtnTwo: {
    marginRight: 10,
    position: "absolute",
    top: 10,
    right: 30,
  },
  locationPinBtn: {
    position: "absolute", 
    top: 10, 
    right: 10
  },
  chosenEmojiBtnThree: {
    marginRight: 10,
    position: "absolute",
    top: 10,
    right: 30,
  },
  participantsCommentsTxt: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  activityAttendeesTxt: {
    fontWeight: "bold",
    flexWrap: "wrap",
  },
  activityAttendeesTxtTwo: {
    marginLeft: 15,
    fontWeight: "bold",
    flexWrap: "wrap",
  },
  attendeesView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    alignItems: "stretch",
    marginBottom: 20,
  },

});

export default styles;
