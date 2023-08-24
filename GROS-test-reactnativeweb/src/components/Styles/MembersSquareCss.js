import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    width: "100%",
    height: "100%",
  },
  name: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 24,
    color: "#FFFFFF",
  },

  infosContainer: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end", // Changement ici pour aligner le coeur à la fin
  },
  heartButton: {
    alignSelf: "flex-end",
  },
  cityContainer: {
    flexDirection: "row", // Changement ici pour faire apparaître l'âge et la ville en dessous du nom
  },
  mainInfos: {
    paddingLeft: 10,
  },
  secondaryInfos: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 13,
    lineHeight: 20,
    color: "#FFFFFF",
  },

  image: {
    width: 40,
    height: 40,
  },
});

export default styles;
