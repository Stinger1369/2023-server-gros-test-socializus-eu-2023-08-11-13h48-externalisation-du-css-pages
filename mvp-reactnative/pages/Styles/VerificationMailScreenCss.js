import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  forgotPage: {
    backgroundColor: "white",
    flex: 1,
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
  verificationCodeView: {
    alignItems: "center",
    marginTop: 63,
    marginBottom: 10,
  },
  TextInputView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
    lineHeight: 45,
    color: "#59C09B",
    marginLeft: "5%",
    marginBottom: 50,
  },
  container: {
    width: 260,
    height: 110,
    alignSelf: "center",
  },
  warningContainer: {
    marginBottom: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,
    height: 100,
    backgroundColor: "#FF0000CC",
  },
  text: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 18.46,
    marginBottom: 64,
    textAlign: "center",
    width: 250,
    textAlign: "center",
    marginBottom: 0,
  },
  warningText: {
    fontSize: 18,
    lineHeight: 18.46,
    textAlign: "center",
    color: "white",
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
    marginHorizontal: 4,
    width: 38.02,
    height: 35.24,
    backgroundColor: "white",
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 10,
    textAlign: "center",
  },
  smallBtn: {
    height: 37,
    width: 180,
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
  errorText: {
    color: "red",
    fontSize: 14,
    textAlign: "center",
  },
});

export default styles