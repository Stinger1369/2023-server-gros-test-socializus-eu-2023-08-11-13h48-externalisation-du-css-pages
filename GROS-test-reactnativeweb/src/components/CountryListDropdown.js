//🇫🇷 Affichage de liste des pays (Frame 15 sur Figma)
//🇬🇧 Display of the list of the countries in the settings (Frame 15 of Figma)
import { Text, View, TouchableOpacity, ScrollView, Image } from "react-native";
import styles from "./Styles/CountryListDropdownCss";
import React, { useState, useEffect } from "react";
import { countriesListRectFlags } from "../assets/countriesListRectFlags";
import Language from "../assets/images/language.svg";
import Icon from "react-native-vector-icons/FontAwesome";
import Json from "../assets/json/en.json";
import { useSelector, useDispatch } from "react-redux";

const CountryListDropdown = (obj) => {
  const dispatch = useDispatch();
  const [country, setCountry] = useState({
    language: "",
    flag: null,
    bigram: "",
  });
  const [dropdownVisible, isDropdownVisible] = useState(false);
  const { setSelected, language, setLanguage, placeholder } = obj;
  //const { home, createProfile } = scr; // a voir pour traduire les noms de pays
  console.log(language);
  //   const [height, setHeight] = useState(45);

  console.log("country:", country);
  console.log("placeholder", placeholder);

  const expandDropdown = () => {
    isDropdownVisible(!dropdownVisible);
    setSelected(false);
  };

  const reduceDropdown = (chosenCountry) => {
    setCountry({
      language: chosenCountry.language,
      flag: chosenCountry.flag,
      bigram: chosenCountry.bigram,
    });
    setSelected(true);
    setLanguage(chosenCountry.language);
    console.log(language);
    isDropdownVisible(false);
  };

  useEffect(() => {
    const userNativeLanguage = countriesListRectFlags.find(
      (country) => country.language === language
    );
    setCountry(userNativeLanguage);
  }, []);

  const langue = useSelector((state) => state.langue);
  useEffect(() => {
    //appelle du dispatch et settage du language du input field langue de l'APP in editProfile
    dispatch({ type: country?.language });
    console.log(dispatch({ type: country?.language }));
  }, [country]);
  setLanguage(country.language); // nom language pour envoyer à EditProfile
  console.log("obj", obj);
  console.log(language);
  console.log(langue);
  console.log("language_pas_setté", obj.language);

  return (
    <>
      <TouchableOpacity
        style={[
          styles.input,
          {
            backgroundColor: language ? "#EEECE7" : "white",
            height: 45,
          },
        ]}
        onPress={() => expandDropdown()}
      >
        {/* <Text style={styles.upperTitle}>{placeholder}</Text> */}
        <View style={ styles.languageImgContainer }>
          <Image
            source={Language}
            style={ styles.languageImgStyle }
          />
        </View>
        <View style={ styles.countryView}>
          {language === null ? (
            <Text style={{ fontSize: 14 }}>{placeholder}</Text>
          ) : (
            <>
              <Text style={{ fontSize: 16 }}>
                {country && country.language}
              </Text>
              <View style={{ marginRight: 45 }}>{country && country.flag}</View>
            </>
          )}
        </View>

        <View>
          <Icon
            name="caret-down"
            type="font-awesome"
            color={"black"}
            size={14}
          />
        </View>
      </TouchableOpacity>
      {dropdownVisible && (
        <ScrollView style={styles.dropdown}>
          {countriesListRectFlags.map((country) => {
            return (
              <TouchableOpacity
                style={styles.countryLine}
                key={country.bigram}
                onPress={() => reduceDropdown(country)}
              >
                <Text>{country.language}</Text>
                {country.flag}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
    </>
  );
};

export default CountryListDropdown;
