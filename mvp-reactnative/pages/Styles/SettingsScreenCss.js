import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      backgroundColor: "#fff",
    },
    SettingGearView1:{
      position: "absolute", 
      top: -23, 
      right: -25
    },
    SettingGearView2:{
      position: "relative", 
      left: -15
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
    },
    settingImage: {
      marginTop: 50,
      marginBottom: 30,
      alignSelf: "center",
    },
    settingsList: {
      paddingHorizontal: 15,
      width: "100%",
      backgroundColor: "#eee",
      borderRadius: 15,
    },
    settingOption: {
      flex: 1,
      paddingVertical: 18,
      paddingHorizontal: 5,
      borderBottomWidth: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    settingText: {
      marginLeft: 15,
      fontSize: 18,
      fontWeight: "bold",
    }
    // savOrConButtons: {
    //   marginVertical: 15,
    //   flexDirection: "row",
    //   justifyContent: "space-between",
    //   shadowColor: "grey",
    //   shadowOffset: { width: 0, height: 3 },
    //   shadowOpacity: 1,
    //   borderRadius: 10,
    // },
  });
  

export default styles