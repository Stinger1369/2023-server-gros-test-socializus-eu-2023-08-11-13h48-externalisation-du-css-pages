import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
  },
  cropModalView: {
    marginTop: 120,
    marginTop: 20,
    paddingTop: 5,
    paddingHorizontal: 5,
    width: "95%",
    maxWidth: 450,
    height: "90%",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: "white",
    overflow: "hidden",
  },
  imgContainer: {
    width: 120,
    height: 120,
    marginTop: 35,
    marginBottom: 25,
  },
  img: {
    width: 120,
    height: 120,
    borderRadius: 60,
    objectFit: "cover",
  },
  logo: {
    position: "absolute",
    left: 90,
    top: 75,
  },
  errorCard: {
    width: "100%",
    height: 150,
    //padding: 10,
    backgroundColor: "red",
    margin: 10,
    marginHorizontal: "auto",
    padding: 5,
    textAlign: "center",
  },
  error: {
    color: "white",
    marginBottom: 20,
    fontWeight: "bold",
    fontSize: 18,
  },
  imageEditorBtn: {
    margin: 5, 
    alignSelf: "flex-end"
  },
  scrollViewStyle: {
    width: "100%", 
    height: "auto", 
    overflow: "hidden"
  },
  croppedImgBtn: {
    margin: 5, 
    marginBottom: 10, 
    alignSelf: "center"
  },
  cameraSvgStyle: {
    width: 30, 
    height: 30
  },
  uploadIconStyle: {
    marginVertical: 10, 
    alignSelf: "center"
  },
  uploadErrorMsgTxt: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 16,
    color: "#DA5A58",
  },
  canvasStyle: {
    borderWidth: 1,
    objectFit: "contain",

    display: "none",
  },
});

export default styles;
