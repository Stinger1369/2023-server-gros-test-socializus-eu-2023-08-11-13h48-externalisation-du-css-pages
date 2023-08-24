import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  navigationContainer: {
    flexDirection: "row",
    //backgroundColor: 'red',
  },
  iconButton: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    //maxWidth:'60%',
    overflow: "hidden",
    //flex: 0.2,
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    letterSpacing: 1,
    //backgroundColor: 'yellow'
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: 'blue',
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 5,
    //backgroundColor: 'blue',
    //marginTop: screenHeight <= 700 ? 0 : 5, // Réduit la marge pour les petits écrans
    marginBottom: 20,
    flex: 1,
  },
  button: {
    flex: 0.4,
    backgroundColor: "#59c09b",
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    width: "20%",
    marginBottom: 40,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },

  logo: {
    position: "absolute",
    top: 15,
    width: 100,
    height: 65,
    alignSelf: "center",
    zIndex: 2,
  },
  conceptImage: {
    width: "100%",
    height: "300px",
    resizeMode: "center",
  },
  checkbox: {
    borderColor: "#59c09b",
    borderWidth: 2,
    borderRadius: 10,
  },

  txt: {
    marginBottom: "1%", // Réduisez la marge en bas
    marginHorizontal: 20,
    textAlign: "center",
    //flex: 2,
    //backgroundColor: 'red'
  },
  justify: {
    textAlign: "justify",
  },
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "5%",
  },
  dot: {
    backgroundColor: "black",
    width: 15,
    height: 15,
    borderRadius: 99999,
    marginHorizontal: "3%",
  },
});

export default styles;
