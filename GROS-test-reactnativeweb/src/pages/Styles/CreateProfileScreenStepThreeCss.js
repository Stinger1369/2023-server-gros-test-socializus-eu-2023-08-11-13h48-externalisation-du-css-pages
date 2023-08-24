import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  profil: {
    backgroundColor: "white",
    flex: 1,
    maxWidth: 450,
    paddingTop: 60,
    paddingHorizontal: 30,
  },
  nickName: {
    marginTop: 20,
  },
  city: {
    marginTop: 15,
  },
  button_1: {
    marginTop: 5,
  },
  emote: {
    width: 30,
    height: 30,
    backgroundColor: "yellow",
    position: "absolute",
    left: 10,
    top: 10,
  },
  flags: {
    width: 31,
    height: 19,
    backgroundColor: "orange",
    position: "absolute",
    left: 220,
    top: 15,
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
    left: 70,
  },
  inputText: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "300",
    position: "absolute",
  },
  bigBtn: {
    marginTop: 30,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10,
    width: 318,
  },
  btnText: {
    color: "white",
    fontSize: 22,
    lineHeight: 33,
    fontWeight: "700",
  },
  text: {
    textAlign: "center",
    margin: 10,
    marginTop: 20,
  },
});

export default styles;
