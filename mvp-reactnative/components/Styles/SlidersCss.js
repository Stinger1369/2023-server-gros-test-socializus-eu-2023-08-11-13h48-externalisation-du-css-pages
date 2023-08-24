import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    sliderArea: {
      flex: 1,
      marginVertical: 10,
      alignItems: "center",
      width: "100%",
    },
    slider: {
      marginHorizontal: 10,
      justifyContent: "center",
      position: "relative",
      width: "100%",
    },
    currentValue: {
      width: 20,
      fontSize: 12,
      textAlign: "center",
      position: "absolute",
      top: 20,
    }, 
    parityInfos: {
      width: "100%",
      marginHorizontal: 10,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    row: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-between"
    },
  });

export default styles