import { StyleSheet } from "react-native";

const constStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 30,
  },
  friendship: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: 30,
  },
  social: {
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "#f6f6f6",
    marginTop: 5,
    height: 70,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  txt: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginLeft: 10,
  },
  imageArrow: {
    width: 30,
    height: 30,
    marginLeft: "auto",
  },
  imageStyle: {
    width: 45,
    height: 45,
    marginLeft: 10,
  },
  rowContainer: {
    flexDirection: "row",

    //justifyContent: "center",
    //alignItems: "center",
    //marginLeft: 40,
    //marginRight: 20,
  },
  countContainer: {
    justifyContent: "center",
    marginRight: 5,
  },
  countText: {
    backgroundColor: "orange",
    color: "white",
    marginLeft: 20,
    marginTop: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    fontSize: 20,
    textAlign: "center",
  },
  messageContainer: {
    flex: 1,
  },
  messageText: {
    color: "black",
    textAlign: "center",
    marginTop: 20,
    marginLeft: 10,
    marginRight: 20,
    fontSize: 16,
    fontWeight: "bold",
    //textAlign: "left",
  },
  inviteStyle: {
    backgroundColor: "white", 
    width: "100%", 
    height: "100%"
  },
  inviteFriendsStyle: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
  },
  friendshipImg: {
    width: 100, 
    height: 100
  },
  inviteFriendsView: {
    marginTop: 20, 
    marginHorizontal: 20
  },

});

export default constStyle;
