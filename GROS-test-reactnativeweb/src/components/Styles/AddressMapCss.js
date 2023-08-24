import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  map: {
    height: 300,
  },
  inputEmptyButton: {
    margin: 5,
    position: "absolute",
    top: 17,
    right: 5,
    zIndex: 3,
  },
  title: {
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    fontSize: 13,
    textAlign: "center",
    position: "absolute",
    zIndex: 1,
    left: 20,
    top: -5,
  },

  textInputContainer: {
    marginVertical: 5,
    paddingHorizontal: 10,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 15,
  },
  textInput: {
    paddingTop: 5,
    height: 40,
    fontSize: 16,
    borderColor: "transparent",
    //borderRadius:20,
    textAlignVertical: "center",
  },
  addressView: {
    marginTop: 15, 
    marginBottom: 5
  },
  addressSubView: {
    position: "relative"
  },
  mapViewStyle: {
    marginTop: 15, 
    height: 200
  },
  inputFieldView: {
    marginTop: 15, 
    marginBottom: 5, 
    position: "relative"
  },
  closeIconBtn: {
    position: "absolute", 
    top: 22, 
    right: 10
  },
});

export default styles;
