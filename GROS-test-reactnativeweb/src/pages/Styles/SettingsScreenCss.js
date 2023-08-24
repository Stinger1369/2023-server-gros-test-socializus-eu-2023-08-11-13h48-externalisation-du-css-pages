import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    padding: 20,
  },
  socialContainer: {
    backgroundColor: "#EEEEEE",
    borderRadius: 15,
  },

  logoContainer: {
    width: 150,
    height: 150,
    alignSelf: "center",
    paddingBottom: 15,
  },
  logo: {
    width: 135,
    height: 135,
  },
  social: {
    flexDirection: "row", // Modification ici pour aligner les items
    alignItems: "center", // Modification ici pour aligner les items
    paddingHorizontal: 15, // Modification ici pour réduire l'espacement horizontal entre les blocs
    paddingVertical: 0, // Modification ici pour rendre le bloc plus petit en hauteur
    borderBottomWidth: 1, // Ajout de la bordure du bas
    borderBottomColor: "#E6E6E6", // Couleur de la bordure du bas

    marginBottom: 0, // Modification ici pour réduire l'espacement entre les blocs
  },
  socialImage: {
    alignSelf: "center",
    margin: "3%", // Modification ici pour réduire la taille de l'image
    width: 30, // Modification ici pour réduire la taille de l'image
    height: 30, // Modification ici pour réduire la taille de l'image
  },
  txt: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
    marginLeft: 10,
    flex: 1,
  },
  arrowContainer: {
    width: 30,
    height: 30,
    alignSelf: "center",
    marginLeft: "22%",
    paddingTop: "3%",
  },
  arrowImage: {
    width: "90%",
    height: "90%",
  },
});

export default styles;
