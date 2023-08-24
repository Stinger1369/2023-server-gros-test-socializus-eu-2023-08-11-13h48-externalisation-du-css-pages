import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: 140,
    height: 30,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 25,
  },
  innerContent: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
  },
  countryModalView: {
    width: "100%",
    height: "100%",
    paddingTop: 5,
    paddingBottom: 10,
    paddingHorizontal: 5,
    backgroundColor: "#2C2C46",
  },
  countryModalTitle: {
    marginTop: 5,
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
  searchBarInput: {
    marginTop: 20,
    marginBottom: 15,
    paddingVertical: 10,
    paddingRight: 8,
    paddingLeft: 40,
    width: "95%",
    height: 45,
    alignSelf: "center",
    borderRadius: 25,
    backgroundColor: "white",
    fontSize: 14,
    zIndex: 1,
    borderWidth: 1,
    borderColor: "#59b09c",
  },
  searchIcon: {
    top: 33,
    left: 23,
    position: "absolute",
    zIndex: 2,
  },
  countryModalScrollView: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  countryModalItem: {
    marginVertical: 15,
    marginHorizontal: 5,
    padding: 5,
    width: 90,
    alignItems: "center",
  },
  countryName: {
    marginTop: 5,
    color: "white",
    fontWeight: "bold",
  },
  flagShadow: {
    position: "absolute",
    width: 44,
    height: 30,
    backgroundColor: "#59c09b",
    zIndex: -1,
    top: 5,
    left: -2,
  },
  countryModalViewOne: {
    flex: 1,
    marginHorizontal: "auto",
  },
  touchableOpacityStyle: {
    margin: 5, 
    alignSelf: "flex-end"
  },
  countryFlagView: {
    width: 50, 
    height: 50
  },
  innerContentSubView: {
    flex: 1, 
    textAlign: "center", 
    fontWeight: "bold"
  },
});

export default styles;
