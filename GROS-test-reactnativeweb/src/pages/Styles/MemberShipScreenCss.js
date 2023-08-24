import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  //View titre texte
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    margin: 10,
  },
  text: {
    fontWeight: "bold",
    alignItems: "center",
    padding: 10,
  },
  card: {
    flex: 1,
    alignItems: "center",
    padding: 15,
    // Add this line
  },
  img: {
    width: 96,
    height: 96,
    marginTop: -35,
    marginBottom: -20,
    alignItems: "center",
  },
  cardContent: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    padding: 10,
  },
  button: {
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 15,
    marginTop: 10,
    padding: 15, // Augmenter la valeur du padding
    backgroundColor: "black",
    width: "70%",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  textCard: {
    justifyContent: "center",
    alignItems: "center",
    color: "black",
    fontWeight: "bold",
    fontSize: 12,
  },
  cardButton: {
    width: "100%",
    alignItems: "center", // Aligner le contenu au centre
  },
  separator: {
    width: 2,
    height: "100%",
    backgroundColor: "white",
    transform: [{ rotate: "180deg" }],
    marginLeft: 27,
  },
  CarTabCentre: {
    backgroundColor: "white",
    alignItems: "center",
    width: "100%", // Ajuster la largeur à 100%
  },
  cardTab: {
    flexDirection: "row", // Add this line
    backgroundColor: "#888",
    borderRadius: 15,
    alignItems: "center",
    margin: 5,
  },
  cardTextTab: {
    flex: 1,
    alignItems: "center",
    padding: 25,
    marginLeft: 29,
  },
  cardTabStyle: {
    backgroundColor: "white",
    alignItems: "center",
    marginBottom: 0,
    flexDirection: "row",
  },
  separatorPlat: {
    width: "100%",
    height: 2,
    backgroundColor: "#888",
    marginTop: 0, // Modifié pour que le texte soit au-dessus du séparateur
  },
  table: {
    borderColor: "#000",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    flex: 1,
    padding: 10,
    width: "50%",
  },
  cellText: {
    textAlign: "center",
    color: "white",
  },
  cellTextCentre: {
    textAlign: "center",
    color: "black",
    fontSize: 11,
  },
  rowTab: {
    flexDirection: "row",
    backgroundColor: "#888",
    borderRadius: 10,
    paddingLeft: 27,
  },
  SeparatorNoir: {
    width: 2,
    height: "100%",
    backgroundColor: "#888",
    transform: [{ rotate: "180deg" }],
    marginLeft: 51,
  },
  rowText: {
    alignItems: "center",
    fontSize: 10,
    padding: 10,
  },
});

export default styles;
