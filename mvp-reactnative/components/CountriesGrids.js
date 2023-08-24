import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import styles from "./Styles/CountriesGridsCss"
import React, {useState} from "react";
import { countriesListRectFlags } from "../assets/countriesListRectFlags";

const CountriesGrid_OneFlag = ({ setCountry, isCountryModalVisible }) => {
  const handlePress = (country) => {
    setCountry({ language: country.language, flag: country.flag });
    isCountryModalVisible(false);
    //future auto-translate function here; don't forget to add the event description as the fuction argument
  };

  return (
    <View style={styles.container}>
      {countriesListRectFlags.map((country, index) => {
        return (
          <View style={{ position: "relative" }} key={index}>
            <TouchableOpacity
              style={styles.countryCard}
              onPress={() => {
                handlePress(country);
              }}
            >
              <View style={ styles.countryFlags }>
               <View>{country.flag}</View>
                <View style={styles.flagShadow} />
              </View>
            </TouchableOpacity>
            <View style={styles.shadow} />
          </View>
        );
      })}
    </View>
  );
};

const CountriesGrid_SeveralFlags = () => {
  const [selections, setSelections] = useState([]);

  const manageSelections = (country) => {
    if (!selections.includes(country)) {
      setSelections((previousArray) => {
        return [...previousArray, country];
      });
    } else {
      setSelections((previousArray) => {
        return previousArray.filter((item) => {
          return item !== country;
        });
      });
    }
  };

  return (
    <View style={styles.container}>
      {countriesListRectFlags.map((country, index) => {
        return (
          <View style={{ position: "relative" }} key={index}>
            <TouchableOpacity
              style={[
              styles.countryCard_severalFlags, {backgroundColor: selections.includes(country) ? "#59c09b" : "white", }
            ]}
              onPress={() => {
                manageSelections(country);
              }}
            >
              <View style={ styles.countryFlags }>
               <View>{country.flag}</View>
                <View style={styles.flagShadow_severalFlags} />
              </View>
            </TouchableOpacity>
            {!selections.includes(country) && <View style={styles.shadow_severalFlags} />}
          </View>
        );
      })}
    </View>
  );
};

export default CountriesGrid_OneFlag;
export { CountriesGrid_SeveralFlags };


