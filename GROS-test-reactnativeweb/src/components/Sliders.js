//🇫🇷 Component Sliders dans la page créer une activité (Frame 31 sur Figma)
//🇬🇧 Sliders component in the Create Activity Page (Frame 31 of Figma)

import { useState, useEffect } from "react";
import { Text, View, Dimensions } from "react-native";
import styles from "./Styles/SlidersCss";
import { Slider } from "@rneui/themed";
import { Icon } from "@rneui/themed";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import TwoValuesSliderLabel from "./TwoValuesSliderLabel";

const OneValueSlider = ({ minVal, maxVal, state, setState }) => {
  const [display, isDisplayed] = useState(false);

  useEffect(() => {
    state === minVal || state === maxVal
      ? isDisplayed(false)
      : isDisplayed(true);
  }, [state]);

  return (
    <View style={styles.sliderRow}>
      <View style={styles.sliderArea}>
        <Slider
          style={styles.slider}
          value={state}
          onValueChange={setState}
          minimumValue={minVal}
          maximumValue={maxVal}
          step={1}
          allowTouchTrack={true}
          trackStyle={{ height: 3, backgroundColor: "#a6a6a6" }}
          thumbStyle={{ height: 20, width: 20, backgroundColor: "#59c09b" }}
          minimumTrackTintColor="#59c09b"
          maximumTrackTintColor="#a6a6a6"
          thumbProps={{
            children: (
              <View>
                <Text
                  style={[styles.currentValue, { opacity: display ? 1 : 0 }]}
                >
                  {state}
                </Text>
              </View>
            ),
          }}
        />
      </View>

      <View style={[styles.row, { marginTop: -10 }]}>
        <View>
          <Text style={{ fontSize: 16 }}>{minVal}</Text>
        </View>
        <View>
          <Text style={{ fontSize: 16 }}>{maxVal}</Text>
        </View>
      </View>
    </View>
  );
};

const TwoValuesSlider = ({ minVal, maxVal, state, setState }) => {
  const [display, isDisplayed] = useState(false);

  useEffect(() => {
    state === minVal || state === maxVal
      ? isDisplayed(false)
      : isDisplayed(true);
  }, [state]);

  return (
    <View>
      <View style={styles.sliderArea}>
        <MultiSlider
          // style={styles.slider}
          values={state}
          onValuesChange={(state) => setState(state)}
          min={minVal}
          max={maxVal}
          enabledOne={true}
          enabledTwo={true}
          enableLabel={true}
          step={1}
          showStepLabels={true}
          allowTouchTrack={true}
          markerOffsetY={1}
          containerStyle={{ marginHorizontal: 10 }}
          trackStyle={{ height: 3, backgroundColor: "#a6a6a6", width: 20 }}
          markerStyle={{ height: 20, width: 20, backgroundColor: "#59c09b" }}
          customLabel={TwoValuesSliderLabel}
        />
      </View>
      <View style={[styles.row, { marginTop: -47, zIndex: -1 }]}>
        <View>
          <Text style={{ fontSize: 16 }}>{minVal}</Text>
        </View>

        <View>
          <Text style={{ fontSize: 16 }}>{maxVal}</Text>
        </View>
      </View>
    </View>
  );
};

const ParitySlider = ({ state, setState }) => {
  const { male, female } = state;

  return (
    <View style={styles.sliderArea}>
      <View style={styles.parityInfos}>
        <Icon name="mars" type="font-awesome" color="#A5CCF2" />
        <Icon name="venus" type="font-awesome" color="#FF4181" />
      </View>

      <Slider
        style={[styles.slider, { height: 25 }]}
        value={male}
        onValueChange={(male) => setState({ male: male, female: 100 - male })}
        minimumValue={0}
        maximumValue={100}
        step={5}
        allowTouchTrack={true}
        trackStyle={{ height: 3 }}
        thumbStyle={{ height: 20, width: 20, backgroundColor: "#A5CCF2" }}
        minimumTrackTintColor="#A5CCF2"
        maximumTrackTintColor="#FF4181"
      />

      <View style={styles.parityInfos}>
        <Text>{male}%</Text>
        <Text>{female}%</Text>
      </View>
    </View>
  );
};

export { OneValueSlider };
export { TwoValuesSlider };
export { ParitySlider };
