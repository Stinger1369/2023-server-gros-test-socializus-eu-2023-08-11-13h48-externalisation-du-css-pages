import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    height: 260,
    position: "relative",
  },

  profilePhoto: {
    flex: 1,
    resizeMode: "cover",
  },

  editBtn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 85,
    height: 28,
    borderWidth: 0,
    borderRadius: 4,
    position: "absolute",
    right: 0,
    margin: 20,
    backgroundColor: "white",
  },
  editBtnText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#59C09B",
  },

  font: {
    fontSize: 12,
  },

  blueText: {
    fontSize: 17,
    color: "#2E00B2",
    fontWeight: "400",
  },

  actionProfile: {
    backgroundColor: "white",
    width: "100%",
    marginVertical: 13,
  },

  userPseudo: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },

  userAge: {
    color: "black",
    fontSize: 20,
  },

  userPoint: {
    color: "black",
    fontSize: 20,
  },

  infoText: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    marginHorizontal: "10%",
    marginVertical: 5,
    marginHorizontal: 40,
  },
  pointsContainer: {
    width: "100%",
    justifyContent: "flex-end",
  },
  medalCtn: {
    height: 52,
    width: 52,
    borderRadius: 50,
  },
  btnContainer: {
    marginTop: 10,
    justifyContent: "center",
    flexDirection: "row",
    marginHorizontal: "5%",
    height: 35,
    // width:"100%"
  },

  // addFriend: {
  //   backgroundColor: "#62A1FF",
  //   width: "25%",
  //   borderRadius: 5,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   flexDirection: "row",
  //   marginHorizontal: 5,
  // },

  // chat: {
  //   backgroundColor: "#B85EB7",
  //   width: "25%",
  //   borderRadius: 5,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   flexDirection: "row",
  //   marginHorizontal: 5,
  // },

  // block: {
  //   backgroundColor: "#FF0000",
  //   width: "25%",
  //   borderRadius: 5,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   flexDirection: "row",
  //   marginHorizontal: 5,
  // },

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

  aboutMe: {},

  title: {
    backgroundColor: "#8BD4BA",
    textAlign: "center",
    fontSize: 18,
    marginHorizontal: "10%",
    marginVertical: "3%",
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
    marginTop: "5%",
    marginHorizontal: "5%",
  },

  situationInfo: {
    marginTop: "5%",
    alignItems: "center",
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
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginVertical: 15,
  },
  hRow2: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },

  text: {
    fontSize: 18,
    marginRight: 10,
    fontWeight: "bold",
  },

  // MODAL Bloquer un utilisateur
  popupContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "rgba(0, 0, 0, 0.5)", // Fond semi-transparent pour l'arrière-plan
  },
  popupBox: {
    width: 340,
    height: 270,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
  },
  modalImage: {
    width: 50,
    height: 50,
    marginBottom: 15,
  },
  modalText: {
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row", // pour mettre les boutons en ligne
    justifyContent: "space-between", // pour espacer les boutons
    width: "100%", // pour utiliser toute la largeur disponible
  },
  confirmButton: {
    width: 120,
    height: 40,
    borderWidth: 2,
    borderColor: "#59C09B",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {
    width: 120,
    height: 40,
    borderWidth: 2,
    borderColor: "#59C09B",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#59C09B",
    marginLeft: 10,
    fontWeight: "bold",
  },
  buttonPressed: {
    backgroundColor: "#59C09B",
    borderWidth: 2,
    borderColor: "#59C09B",
  },
  buttonTextPressed: {
    color: "#fff",
    fontWeight: "bold",
  },

  // Modal ajout ami
  modalContainerAddFreind: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  addFriendModalBox: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: 314,
    height: 370,
  },

  addFriendModalText: {
    paddingTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  addFriendButtonContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
    marginBottom: 20,
  },
  addFriendButton: {
    backgroundColor: "#F7F7F7",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: 94,
    height: 94,
    marginLeft: 5,
    marginRight: 5,
  },
  addFriendButtonIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  continueButton: {
    backgroundColor: "#59C09B",
    padding: 10,
    borderRadius: 9,
    alignItems: "center",
    width: 151,
    height: 42,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    //marginBottom: 20,
  },
  addFriendButtonText: {
    fontSize: 14,
  },
  addFriendMemberText: {
    paddingTop: 10,
    fontSize: 8,
  },
  buttonTextPressed: {
    color: "white",
  },
  buttonDisabled: {
    backgroundColor: "grey",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },

  closeIcon: {
    width: 20,
    height: 20,
  },
  iconWrapper: {
    backgroundColor: "white", // Cela mettra le fond de la vue en blanc
    borderRadius: 50, // Pour avoir une bordure arrondie, ajustez cette valeur selon vos besoins
    width: 48,
    height: 48,
    justifyContent: "center", // Centre l'icône verticalement
    alignItems: "center", // Centre l'icône horizontalement
  },
  addFriendButtonIcon: {
    width: 20,
    height: 20,
  },

  // Modal confirmer email
  confirmEmailModalContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    width: 314,
    height: 235,
    alignItems: "center",
    width: 314,
    height: 235,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  confirmEmailModalText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "black",
  },
  emailInput: {
    width: 200,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "white",
  },
  confirmEmailButton: {
    backgroundColor: "#59C09B",
    padding: 10,
    borderRadius: 9,
    alignItems: "center",
    width: 100,
  },
  confirmEmailButtonText: {
    fontSize: 14,
    color: "white",
  },
  leftArrowIcon: {
    width: 30,
    height: 30,
  },
  backButtonWrapper: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  addFriendMemberButtonIcon: {
    width: 40,
    height: 40,
  },
  phoneInputContainer: {
    borderWidth: 2,
    borderColor: "green",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  flagContainer: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  listItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  listItemText: {
    marginLeft: 10,
  },
  countryFlag: {
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,
    backgroundColor: "#59C09B",
    fontSize: 28,
    color: "white",
    borderRadius: 50,
  },
  countryTextContainer: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: "#59C09B",
    justifyContent: "center",
    alignItems: "center",
  },
  countryText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  editImg: {
    height: 15, 
    width: 15, 
    marginLeft: 5
  },
  placeHolderImg: {
    width: 20, 
    height: 20, 
    marginTop: 4
  },
  continueBtnView: {
    alignItems: "center",
    justifyContent: "center",
  },
  addFriendView: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default styles;
