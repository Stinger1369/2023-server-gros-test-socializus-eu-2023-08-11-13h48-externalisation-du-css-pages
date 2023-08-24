import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    fontSize: 35,
    fontWeight: "600",
    color: "#59C09B",
    marginHorizontal: "auto",
    marginTop: 30,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginHorizontal: 30,
  },
  titlemail: {
    fontSize: 12,
    marginTop: 30,
    marginHorizontal: 30,
  },
  text: {
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 12,
    marginTop: 30,
    marginLeft: 38,
  },
  email: {
    marginTop: 0,
    marginHorizontal: 30,
  },
  password: {
    marginTop: 24,
  },
  centerTerms: {
    marginTop: 15,
    alignItems: "center",
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
    marginHorizontal: "auto",
  },
  centerBot: {
    alignItems: "center",
    marginBottom: 30,
  },
  bottomText: {
    fontWeight: "700",
    fontSize: 14,
    lineHeight: 18,
    //marginRight: 30
  },
  bottomBoxTop: {
    //flexDirection: "row",
    alignItems: "center",
  },

  //🇫🇷Mettre le message d'erreur dans un cadre rouge centré
  //🇬🇧To center the error message card in a red rectangle
  errorCard: {
    width: "80%",
    height: 40,
    //padding: 10,
    backgroundColor: "red",
    margin: 10,
    paddingHorizontal: "auto",
    paddingVertical: "auto",
    marginHorizontal: "auto",
    paddingTop: 5,
    textAlign: "center",
  },
  error: {
    color: "white",
    marginBottom: 20,
    fontWeight: "bold",
    fontSize: 20,
  },
  bigBtn: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: "60%",
  },
  btnText: {
    color: "white",
    fontSize: 22,
    lineHeight: 33,
    fontWeight: "700",
    padding: 15,
  },
  smallBtn: {
    width: "80%",
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  smallBtnText: {
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 36,
    width: 300,
    color: "#59C09B",
    textAlign: "center",
  },
});

export default styles;
