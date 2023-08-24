import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: "wrap",
    marginTop: 15,
    marginHorizontal: 5,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#F3F3F3",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.42,
    shadowRadius: 2.22,
  },
  activityCard: {
    marginHorizontal: 5,
    marginVertical: 8,
    borderRadius: 10,
    width: 80,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.42,
    shadowRadius: 2.22,

    elevation: 3,
  },
  activityTitle: {
    marginBottom: 5,
    fontSize: 12,
  },
  activityTypeView: {
    flex: 1, 
    justifyContent: "center" 
  },
});

export default styles;
