import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    addImageButton: {
      width: "100%",
      backgroundColor: "#dcf1ea",
      borderRadius: 10,
      marginTop: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    photoIconProps: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: "#59bf9b",
      justifyContent: "center",
      alignItems: "center",
    },
    chosenImageProps: {
      width: "100%",
      height: "100%",
      borderRadius: 10,
      zindex: 2,
    },
    flatlistImages: {
      width: 100, 
      height: 100
    },
    cropModalButton: {
      margin: 5, 
      alignSelf: "flex-end"
    },
    scrollViewStyle: {
      width: "100%", 
      height: 300, 
      overflow: "hidden"
    },
    cropImageButton: {
      margin: 5, 
      marginBottom: 10, 
      alignSelf: "center"
    },
    modalVisibleButton: {
      margin: 5, 
      alignSelf: "flex-end"
    },
    unsplashView: {
      marginTop: 20,
      flexDirection: "row",
      justifyContent: "space-around",
    },
    unsplashViewTwo: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    imageTitleText: {
      textAlign: "center", 
      fontWeight: "bold"
    },
    imageView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
    },
    searchText: {
      textAlign: "center",
      fontWeight: "bold"
    },
    //Ask photo source Modal style
    askModalView: {
      width: "90%",
      maxWidth: 450,
      marginBottom: 10,
      alignContent: "flex-end",
      paddingTop: 5,
      paddingBottom: 20,
      paddingHorizontal: 5,
      borderRadius: 15,
      backgroundColor: "white",
    },
    photoSourceIcon: {
      marginBottom: 5,
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: "#dcf1ea",
      justifyContent: "center",
      alignItems: "center",
    },
    //Unsplash Modal style
    modalContainer: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      alignItems: "center",
    },
    unsplashModalView: {
      width: "90%",
      maxWidth: 450,
      height: "90%",
      marginVertical: 20,
      paddingTop: 5,
      paddingBottom: 10,
      paddingHorizontal: 5,
      borderRadius: 15,
      backgroundColor: "white",
    },
    unsplashModalTitle: {
      marginTop: 10,
      fontWeight: "bold",
      fontSize: 20,
      textAlign: "center",
    },
    unsplashModalText: {
      marginVertical: 10,
      textAlign: "center",
      fontSize: 16,
    },
    photoAuthor: {
      marginBottom: 25,
      alignSelf: "center",
      fontSize: 11,
      fontStyle: "italic",
      color: "gray",
    },
    img: {
      width: 120,
      height: 120,
      borderRadius: 60,
      objectFit: "cover",
    },
    //
    cropModalView: {
      marginTop: 120,
      marginTop: 20,
      paddingTop: 5,
      paddingHorizontal: 5,
      width: "90%",
      maxWidth: 450,
      height: "90%",
      justifyContent: "space-between",
      alignItems: "center",
      borderRadius: 15,
      backgroundColor: "white",
      overflow: "hidden",
    },
    searchContainer: {
      flexDirection: "row",
      marginBottom: 10,
    },
    searchInput: {
      flex: 1,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 5,
      paddingHorizontal: 10,
      marginRight: 10,
      color: "#333",
      fontSize: 14,
      paddingVertical: 8,
    },
    searchButton: {
      backgroundColor: "#59bf9b",
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 5,
    },
    searchButtonText: {
      color: "#fff",
      fontSize: 14,
      fontWeight: "bold",
    },
  });

export default styles