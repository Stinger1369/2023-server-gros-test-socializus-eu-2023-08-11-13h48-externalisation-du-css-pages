import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 22,
    color: "green",
    paddingTop: 20,
    color: "#59C09B",
    fontFamily: "Poppins_700Bold",
    marginBottom: 20,
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  text1: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "Poppins_500Medium",
  },
  starImage: {
    width: 13.36,
    height: 13.36,
    marginRight: 5,
    padding: 10,
  },
  avatarContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 5,
  },
  name: {
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
    color: "blue",
  },

  commentInput: {
    width: 280,
    height: 200,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
  },

  confirmButton: {
    backgroundColor: "#59C09B",
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
    height: 50,
    width: 280,
    justifyContent: "center",
    textAlign: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
  },

  exitContainer: {
    position: "absolute",
    top: 5,
    right: 20,
    zIndex: 10,
  },
});

export default styles;
