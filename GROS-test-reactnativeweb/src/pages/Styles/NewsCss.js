import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  photo: {
    //width:'100%',
    resizeMode: "contain",
    alignSelf: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginTop: "5%",
    marginBottom: 25,
  },
  txt: {
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: "7%",
    width: 400,
    margin: "5%",
    justifyContent: "center",
  },
  ButtonFB: {
    backgroundColor: "#3e61bc",
    alignSelf: "center",
    borderRadius: 10,
    flexDirection: "row",
    height: 50,
    width: 350,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
    padding: "2%",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    textAlign: "center",
    paddingTop: 10,
  },
  buttonTextFB: {
    color: "white",
    fontWeight: "700",
    textAlign: "center",
    justifyContent: "center",
  },
  eventRedirectButton: {
    backgroundColor: "#59c09b",
    alignSelf: "center",
    marginTop: "5%",
    padding: "2%",
    borderRadius: 10,
    marginBottom: 50,
    height: 50,
    width: 250,
  },
  newslist: {
    flexDirection: "row",
    paddingLeft: 25,
    paddingBottom: 15,
    paddingRight: 70,
  },
  helpParagraph: {
    alignItems: "center",
  },
  backgroundImgStyle: {
    backgroundColor: "white", 
    width: "100%", 
    height: 150
  },
  nonProfitImg: {
    width: 49, 
    height: "100%", 
    justifyContent: "center" 
  },
  activeUsersImg: {
    width: 49, 
    height: "100%", 
    justifyContent: "center"
  },
  freeAppImg: {
    width: 37, 
    height: "100%", 
    justifyContent: "center"
  },

});

export default styles;
