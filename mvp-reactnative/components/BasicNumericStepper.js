import { useState } from "react";
import { StyleSheet, View, Text, PanResponder, Dimensions } from "react-native";

const BasicNumericStepper = ({
  minVal,
  maxVal,
  state,
  setState,
}) => {
  const screenWidth = Dimensions.get("window").width;
  const width = screenWidth;
  const margeX = (screenWidth - width) * 2;
  const barWidth = width - 50;
  console.log(screenWidth);

  const [circlePosition, setCirclePosition] = useState(
    ((state + minVal))
  );

  const $ = {
    //necessiterait trop de travail de déplacer ce bloc en dehors du composant
    //(idéalement il faudrait le faire mais pas le temps)
    sliderRow: {
      height: 60,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    slider: {
      flex: 1,
      marginHorizontal: 10,
      alignSelf: "center",
      backgroundColor: "skyblue",
    },
    bgOn: {
      height: 4,
      marginVertical: 10,
      backgroundColor: "#59c09b",
      position: "absolute",
      zIndex: 2,
    },
    bgOff: {
      height: 4,
      marginVertical: 10,
      backgroundColor: "#a6a6a6",
    },
    circle: {
      width: 20,
      height: 20,
      borderRadius: 100,
      position: "absolute",
      top: 2,
      backgroundColor: "#59c09b",
      zIndex: 3,
    },
    currentState: {
      fontSize: 16,
      position: "absolute",
      top: 18,
      left: 6,
    },
  };

  //panResponder basically allows you to determine how the user is moving their fingers on the screen which will eventually allows you
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponderCapture: () => true,

    onPanResponderMove: (event) => {
      let px = event.nativeEvent.pageX - margeX;
      // const py = event.nativeEvent.pageY;
      if (px < 10) px = 0;
      else if (px > 10 + barWidth - 20) px = 10 + barWidth;
      setCirclePosition(px);
      setState(
        Math.floor(
          minVal + ((px) / (barWidth)) * (maxVal - minVal)
        )
      )
    }
  });

  return (
    <View style={$.sliderRow}>
      <View>
        {/*FR La variable minVal afficher la valeur minimal*/}
        {/*GB variable minVal displays the maximum value  */}
        <Text pointerEvents="none" style={{fontSize: 16}}>
          {minVal}
        </Text>
      </View>

      <View style={$.slider} {...panResponder.panHandlers}>
        <View style={$.bgOff} pointerEvents="none" />
        <View style={[$.circle, { left: circlePosition }]} pointerEvents="none">
          <Text pointerEvents="none" style={$.currentState}>
            {state}
          </Text>
        </View>
        <View style={[$.bgOn, { width: circlePosition }]} pointerEvents="none" />
      </View>
        
      <View>
        {/*FR variable maxVal affiche la valeur maximale */}
        {/*GB variable maxVal displays the maximum value  */}
        <Text pointerEvents="none" style={{fontSize: 16}}>
          {maxVal}
        </Text>
      </View>
    </View>
  );
};

export default BasicNumericStepper;
