import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  memberCard: {
    position: "relative",
    width: "50%", // Ajustez la largeur pour afficher deux cartes par ligne
    height: 222,
    //marginBottom: 10,
  },
  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "gray",
  },
  button: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  text: {
    color: "white",
  },
  separator: {
    height: 20,
    width: 1,
    backgroundColor: "white",
    marginTop: 10,
  },
  secondaryMenuContainer: {
    width: "75%",
    marginTop: 20,
    marginLeft: "auto",
    marginRight: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "gray",
    borderRadius: 10,
  },
  smallButton: {
    flex: 1,
    padding: 5, // Make this smaller for a thinner button
    alignItems: "center",
  },
  smallText: {
    fontSize: 12, // Make this smaller for a thinner button
    color: "white",
  },
  smallSeparator: {
    height: 20,
    width: 1,
    backgroundColor: "white",
    marginTop: 5,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    marginTop: 20,
    width: "85%",
    height: 40,
    marginBottom: 20,
    justifyContent: "center",
    marginLeft: "8%",
    borderColor: "#59c09b", // couleur de la bordure
    borderWidth: 1, // largeur de la bordure
    shadowColor: "#000", // couleur de l'ombre
    shadowOffset: {
      // décalage de l'ombre
      width: 0,
      height: 2, // une ombre en bas
    },
    shadowOpacity: 0.25, // opacité de l'ombre
    shadowRadius: 3.84, // rayon de l'ombre
    elevation: 5, // nécessaire pour Android
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
  },
});

export default styles;
