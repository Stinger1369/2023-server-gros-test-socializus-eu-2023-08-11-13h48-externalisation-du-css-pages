import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingTop: 30,
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },

  icon: {
    width: 50,
    height: 50,
    marginLeft: 10,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  lineAdresse: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  iconmap: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  address: {
    fontSize: 14,
  },
  iconArrow: {
    width: 15,
    height: 25,
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
