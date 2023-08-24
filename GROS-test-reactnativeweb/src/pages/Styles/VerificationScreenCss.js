import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  forgotPage: {
    backgroundColor: "white",
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
    lineHeight: 45,
    color: "#59C09B",
    marginLeft: "5%",
    marginBottom: 66,
  },
  container: {
    width: 260,
    alignSelf: "center",
  },
  text: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 18.46,
    marginBottom: 64,
  },
  email: {
    alignItems: "center",
  },
  bigBtn: {
    backgroundColor: "#59c09b",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: 280,
    marginTop: 55,
  },
  btnText: {
    color: "white",
    fontSize: 22,
    lineHeight: 33,
    fontWeight: "700",
  },
  btnContainer: {
    alignItems: "center",
  },
  opt: {
    width: 38.02,
    height: 35.24,
    backgroundColor: "white",
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 10,
    textAlign: "center",
    marginRight: 12,
  },
  smallBtn: {
    height: 37,
    width: 88,
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  smallBtnText: {
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 18,
    color: "#59C09B",
  },
});

export default styles;
