import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    marginLeft: 5,
    paddingTop: 30,
  },
  containerLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  line: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  containerEclipse: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  eclipse1: {
    width: 15,
    height: 15,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#DAE08D",
    backgroundColor: "white",
  },
  eclipse2: {
    width: 15,
    height: 15,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: "#65B3EA",
    backgroundColor: "white",
  },
  text2: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    marginLeft: 5,
  },
  text3: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    marginLeft: 5,
  },

  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 10,
    paddingTop: 20,
  },

  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatarBorder: {
    borderRadius: 23,
    borderWidth: 1,
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },

  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },

  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    marginBottom: 5,
  },
  address: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    color: "gray",
  },

  lineAdresse: {
    flexDirection: "row",
  },

  icon: {
    width: 50,
    height: 50,
    margin: 10,
  },

  iconHeart: {
    width: 37,
    height: 37,
  },

  iconAdd: {
    width: 30,
    height: 30,
  },

  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  heartButton: {
    marginRight: 10,
    marginTop: 20,
    height: 50,
    width: 50,
  },
  userPlusButton: {
    marginLeft: 10,
  },

  iconmap: {
    width: 10,
    height: 15,
    marginRight: 5,
  },

  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "gray",
  },
  button: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  text4: {
    color: "white",
  },
  separator: {
    height: 20,
    width: 1,
    backgroundColor: "white",
    marginTop: 10,
  },
});

export default styles;
