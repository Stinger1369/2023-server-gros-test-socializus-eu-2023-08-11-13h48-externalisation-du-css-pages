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
    position: "relative",
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
  cameraIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default styles;
