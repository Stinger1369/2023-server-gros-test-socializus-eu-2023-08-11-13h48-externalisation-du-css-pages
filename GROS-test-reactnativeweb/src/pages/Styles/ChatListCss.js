import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingTop: 30,
    flexWrap: "wrap", // Allow items to wrap onto the next line
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 0, // Prevent avatars from shrinking
    marginRight: 10, // Add spacing between avatars and chat content
    position: "relative", // Position the badge
  },

  buttonContainer: {
    position: "absolute",
    bottom: "33%",
    right: 20,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  createbuttonContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -10 }, { translateY: -10 }],
    justifyContent: "center",
    alignItems: "center",
    width: 20,
    height: 20,
  },
  createbutton: {
    width: 26,
    height: 26,
  },

  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },
  chatContent: {
    flex: 1,
    flexShrink: 1, // Allow chat content to shrink
    marginLeft: 10,
    minWidth: 0, // Ensure chat content doesn't exceed container width
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5, // Add spacing between name and chat text
  },
  chatText: {
    fontSize: 14,
  },
  timeContainer: {
    marginLeft: 10, // Add spacing between chat text and time
  },
  time: {
    fontSize: 10,
    fontFamily: "Poppins_400Regular",
    marginBottom: 30,
  },
  notificationBadge: {
    position: "absolute",
    bottom: 10,
    right: 0,
    backgroundColor: "red",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  notificationText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default styles;
