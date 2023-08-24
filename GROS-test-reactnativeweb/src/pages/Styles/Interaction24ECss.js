import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    paddingTop: 40,
    fontFamily: "Poppins_700Bold",
    marginBottom: 20,
    textAlign: "center",
  },

  text1: {
    fontSize: 16,
    marginRight: 10,
    fontFamily: "Poppins_600SemiBold",
    textAlign: "center",
  },

  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
  },

  scrollView: {
    width: "100%",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 10,
    justifyContent: "space-between",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    marginRight: 10,
  },
  icon: {
    width: 50,
    height: 50,
  },
});

export default styles;
