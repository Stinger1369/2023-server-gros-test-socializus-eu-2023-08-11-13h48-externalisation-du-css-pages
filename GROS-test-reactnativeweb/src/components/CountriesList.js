// ENG - Unfinishes business - Check the languages (Figma Frame : 17)- ENG
// FR - Travail inachevé - Vérifier les langues (Frame Figma : 17)- FR

import { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Modal,
  useWindowDimensions,
  TextInput,
} from "react-native";
import styles from "./Styles/CountriesListCss";
import CountriesGrid_OneFlag from "./CountriesGrids";
import { countriesListCircleFlags as countriesList } from "../assets/countriesListCircleFlags";
import Icon from "react-native-vector-icons/FontAwesome";
import { useSelector, useDispatch } from "react-redux"; //🇫🇷Permet de récupérer les données du state.(fr)//🇬🇧 Allows to retrieve data from the state.

// Méthode permettant de selectionner la langue

const CountriesListRectFlags = ({ country, setCountry, scr }) => {
  const { height, width } = useWindowDimensions();
  const [languages, setLanguages] = useState(countriesList);
  const dispatch = useDispatch();
  const [language, setLanguage] = useState(null);
  const [countryModalVisible, isCountryModalVisible] = useState(false);
  const filterLanguages = (text) => {
    //(fr) est une fonction qui prend un argument appelé text et qui retourne une valeur. Le comportement de cette fonction dépend du code qui se trouve à l'intérieur de la fonction(fr)
    // (gb)is a function that takes an argument called text and returns a value. The behavior of this function depends on the code inside the function(gb)
    let tmp = countriesList.filter((c) =>
      c.language.toLowerCase().includes(text.toLowerCase())
    );
    setLanguages(tmp);
  };
  const langue = useSelector((state) => state.langue);

  const { activity, home } = scr;

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={countryModalVisible}
        onRequestClose={() => {
          isCountryModalVisible(!countryModalVisible);
        }}
        style={{ width: 450 }}
      >
        <View style={[ styles.countryModalViewOne, { width: width >= 450 ? 450 : width}]}>
          <View style={styles.countryModalView}>
            <TouchableOpacity
              style={ styles.touchableOpacityStyle } //(fr) alignSelf permet de définir l'alignement de l'élément par rapport à son parent.
              //(gb) alignSelf allows to define the alignment of the element relative to its parent.(gb)
              onPress={() => isCountryModalVisible(!countryModalVisible)} //(fr) onPress permet de définir une action à effectuer lorsqu'on appuie sur l'élément.(fr)
            >
              <Icon name="close" color="white" size={28} />
            </TouchableOpacity>
            <Text style={styles.countryModalTitle}>
              {home.t2022_selectLanguage}
            </Text>{" "}
            {/*"select your language"*/}
            <View style={{ position: "relative" }}>
              {/*(fr)position permet de définir la position de l'élément par rapport à son parent.(fr)*/}
              <TextInput
                style={styles.searchBarInput}
                state={language}
                setState={setLanguage}
                onChangeText={filterLanguages}
              />
              <View style={styles.searchIcon}>
                {/*(fr) permet de définir la position de l'élément par rapport à son parent. */}
                <Icon name="search" color="#ccc" size={16} />
              </View>
            </View>
            <ScrollView>
              <View style={styles.slide}>
                <View style={styles.countryModalScrollView}>
                  {languages.map((country, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={styles.countryModalItem}
                        onPress={() => {
                          setCountry({
                            language: country.language,
                            flag: country.flag,
                          });
                          isCountryModalVisible(!countryModalVisible); // (fr) isCountryModalVisible permet de modifier la valeur de countryModalVisible.(fr)// (gb)isCountryModalVisible allows to modify the value of countryModalVisible.(gb)
                        }}
                      >
                        <View style={ styles.countryFlagView }>
                          {country.flag}
                        </View>
                        <Text style={styles.countryName}>
                          {/** (fr) style permet de définir le style d'un élément.(fr)// (gb) style allows to define the style of an element.(gb) */}
                          {country.language}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            </ScrollView>
            {/* </Swiper> */}
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.9}
        onPress={() => isCountryModalVisible(!countryModalVisible)}
      >
        <View style={styles.innerContent}>
          <Text style={ styles.innerContentSubView }>
            {activity.translate}
          </Text>
          <View style={{ alignSelf: "center" }}>
            <Icon
              name="caret-down"
              type="font-awesome"
              color="black"
              size={14}
            />
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default CountriesListRectFlags;
