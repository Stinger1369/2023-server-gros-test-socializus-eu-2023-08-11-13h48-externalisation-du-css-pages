//🇫🇷 Affichage de la liste des pays au niveau de la page de paramétres (Frame 17 sur Figma)
//🇬🇧 Display of the countries in the settings page (Frame 17 of Figma)

import { Text, View, TouchableOpacity } from "react-native";
import styles from "./Styles/CountriesGridsCss";
import React, { useState } from "react";
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
        //if (index > 0) {
        return (
          <View style={{ position: "relative" }} key={index}>
            <TouchableOpacity
              style={styles.countryCard}
              onPress={() => {
                handlePress(country);
              }}
            >
              <View style={ styles.flagsStyle}>
                <View>{country.flag}</View>
                <View style={styles.flagShadow} />
              </View>
            </TouchableOpacity>
          </View>
        );
        //}
      })}
    </View>
  );
};

/*🇫🇷 Ci-dessous, le composant enregistre les index de chaque composant pour le stocker dans un tableau, pour enregistrer le nom de langue , il faut suprimer la method index */
/*🇬🇧 Below, the component saves the indexes of each component to store it in an array, to save the language name, you have to remove the method index*/

const CountriesGrid_SeveralFlags = ({ selections, setSelections }) => {
  //const [selections, setSelections] = useState([]);

  const manageSelections = (country) => {
    const NumberCountry = countriesListRectFlags.indexOf(country);
    if (!selections.includes(NumberCountry)) {
      setSelections((previousArray) => {
        return [...previousArray, NumberCountry];
      });
    } else {
      setSelections((previousArray) => {
        return previousArray.filter((item) => {
          return item !== NumberCountry;
        });
      });
    }
  };

  return (
    <View style={styles.container}>
      {countriesListRectFlags.map((country, index) => {
        // if (index > 0) {
        {
          /*🇫🇷 si index > 0 , pour ne pas montrer le premier element du tableau countriesList, qui correspond à une question sur langue native, activer si necessaire*/
        }
        {
          /*🇬🇧 if index > 0 , to not show the first element of the countriesList array, which corresponds to a question on native language, activate if you need*/
        }
        return (
          <View style={{ position: "relative" }} key={index}>
            <TouchableOpacity
              style={[
                selections.includes(countriesListRectFlags.indexOf(country))
                  ? [
                      styles.countryCard_severalFlags,
                      {
                        backgroundColor: selections.includes(
                          countriesListRectFlags.indexOf(country)
                        )
                          ? "#59c09b"
                          : "white",
                      },
                    ]
                  : [
                      styles.countryCard_severalFlags,
                      styles.countryCard_Shadow,
                      {
                        backgroundColor: selections.includes(
                          countriesListRectFlags.indexOf(country)
                        )
                          ? "#59c09b"
                          : "white",
                      },
                    ],
              ]}
              onPress={() => {
                manageSelections(country);
              }}
            >
              <View style={ styles.flagsStyle }>
                <View>{country.flag}</View>
                <View style={styles.flagShadow_severalFlags} />
              </View>
            </TouchableOpacity>
            {!selections.includes(country) && (
              <View style={styles.shadow_severalFlags} />
            )}
          </View>
        );
        //}
      })}
    </View>
  );
};

export default CountriesGrid_OneFlag;
export { CountriesGrid_SeveralFlags };
