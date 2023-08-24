import React from 'react';
import PropTypes from 'prop-types';

import { View, Text, StyleSheet } from 'react-native';
import styles from "./Styles/TwoValuesSliderLabelCss"

//This component styles the two values slider component in Sliders.js. If anything, just change the stylesheet.  

const TwoValuesSliderLabel = ({
      oneMarkerValue,
      twoMarkerValue,
      oneMarkerLeftPosition,
      twoMarkerLeftPosition,
      oneMarkerPressed,
      twoMarkerPressed,
    }) => {

    return (
      <View style = {{ position: 'relative' }}>
        {Number.isFinite(oneMarkerLeftPosition) &&
          Number.isFinite(oneMarkerValue) && (
            <View
              style={[
                styles.sliderLabel,
                { left: oneMarkerLeftPosition },
                oneMarkerPressed && styles.markerPressed,
              ]}
            >
              <Text style={styles.sliderLabelText}>{oneMarkerValue}</Text>
            </View>
          )}

        {Number.isFinite(twoMarkerLeftPosition) &&
          Number.isFinite(twoMarkerValue) && (
            <View
              style={[
                styles.sliderLabel,
                { left: twoMarkerLeftPosition },
                twoMarkerPressed && styles.markerPressed,
              ]}
            >
              <Text style={styles.sliderLabelText}>{twoMarkerValue}</Text>
            </View>
          )}
      </View>
    );
}

export default TwoValuesSliderLabel;

