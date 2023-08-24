import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  LogIn: {
    backgroundColor: "white",
    width: "100%",
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 35,
    fontWeight: "600",
    color: "#59C09B",
    marginHorizontal: "auto",
    marginTop: 30,
  },
  text: {
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 12,
    marginTop: 46,
    marginLeft: 38,
  },
  email: {
    marginTop: 35,
  },
  password: {
    marginTop: 24,
  },
  centerTerms: {
    marginTop: 15,
    alignItems: "center",
  },
  center: {
    alignItems: "center",
    width: "100%",
  },
  termsContainer: {
    alignItems: "center",
    width: "55%",
    marginBottom: 20,
  },
  terms: {
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
  },
  underline: {
    textDecorationLine: "underline",
  },
  btn: {
    alignItems: "center",
    marginBottom: 90,
  },
  centerBot: {
    alignItems: "center",
    marginBottom: 30,
  },
  bottomText: {
    fontWeight: "700",
    fontSize: 14,
    lineHeight: 18,
    marginRight: 30,
  },
  bottomBoxTop: {
    flexDirection: "row",
    alignItems: "center",
  },
  error: {
    color: "red",
    marginBottom: 20,
  },
  bigBtn: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: 280,
  },
  btnText: {
    color: "white",
    fontSize: 22,
    lineHeight: 33,
    fontWeight: "700",
  },
  smallBtn: {
    height: 37,
    width: 88,
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  smallBtnText: {
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 18,
    color: "#59C09B",
  },
  testEmailBtn: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: 280,
  },

});

export default styles;
