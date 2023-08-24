import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    // container: { marginTop: 10, flexDirection: "column", alignItems: "center" },
  
    // Il semblerait que le souci du FAB est réglé grâce au 'flex:1'. A voir si c'est toujours vrai quand la liste sera à nouveau remplie
    container: {
      flex: 1,
      marginTop: 0,
      marginHorizontal: "auto",
      maxWidth: 450
    },
    onPressFab:{
      margin: 30
    },
    timeDataContainer: {
      flexDirection: "row",
      marginTop: 15,
      marginBottom: 25,
      height: 40,
      justifyContent: "space-around",
      alignItems: "center",
      fontSize: 16,
      borderWidth: 1,
      borderColor: "black",
      borderRadius: 15,
    },
    buttonsContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      height: 40,
      marginVertical: 15,
      marginHorizontal: 20,
      borderWidth: 1,
      borderColor: "#59C09B",
      borderRadius: 15,
    },
    activityType: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    middle: {
      borderLeftWidth: 1,
      borderLeftColor: "#59c09b",
      borderRightWidth: 1,
      borderRightColor: "#59c09b",
    },
    right: {
      borderRightWidth: 1,
      borderRightColor: "#59c09b",
      bordercenterWith: 1,
      bordercenterColor: "#59c09b",
    },
    ButtonsStyle: {
      fontWeight: "500",
      color: "#59c09b",
    },
    activityOne: {
      marginTop: 5,
      backgroundColor: "#D8EDE6",
      flexDirection: "row",
      fontWeight: "bold",
      height: 100,
      marginVertical: 5,
      marginHorizontal: 10,
      borderWidth: 1,
      borderColor: "#DDDDDD",
      borderRadius: 20,
    },
    //*ajouter la date des activités*//
  
    activityTwo: {
      margintop: 5,
      backgroundColor: "#FFEDB7",
      flexDirection: "row",
      fontWeight: "bold",
      height: 100,
      marginVertical: 5,
      marginHorizontal: 10,
      borderWidth: 1,
      borderColor: "#DDDDDD",
      borderRadius: 20,
    },
    activityThree: {
      margintop: 5,
      backgroundColor: "#D8EDE6",
      flexDirection: "row",
      fontWeight: "bold",
      height: 100,
      marginVertical: 5,
      marginHorizontal: 10,
      borderWidth: 1,
      borderColor: "#DDDDDD",
      borderRadius: 20,
    },
    activityFour: {
      margintop: 5,
      backgroundColor: "#DDDDDD",
      flexDirection: "row",
      fontWeight: "bold",
      height: 100,
      marginVertical: 5,
      marginHorizontal: 10,
      borderWidth: 1,
      borderColor: "#DDDDDD",
      borderRadius: 20,
    },
  
    header: {
      fontSize: 16,
      paddingHorizontal: 15,
      paddingVertical: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "white",
    },
    dialog: {
      marginHorizontal: 10,
      maxWidth: 430,
      backgroundColor: "#59c09b",
    },
    dialogText: {
      textAlign: "center",
      color: "white",
      fontSize: 18,
      fontWeight: "bold",
    },
    dialogButton: {
      paddingHorizontal: 25,
      paddingVertical: 10,
      borderRadius: 15,
      backgroundColor: "white",
    },
    dialogButtonText: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#59c09b",
    },
    splashContainer: {
      position: 'absolute',
      bottom: "15%",
      height:"100%",
      width: "100%",
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1,
    },
    imgSplash:{
      width: '50%', 
      height: '40%', 
      resizeMode: 'contain',
      marginBottom: '10%',
    },
    scheduleIconStyle: {
      marginLeft: 0, 
      marginRight: 10 
    },
    viewOne: {
      marginTop: 0, 
      marginHorizontal: 5 
    },
    viewTwo: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: "5%",
    },
  
  });

export default styles