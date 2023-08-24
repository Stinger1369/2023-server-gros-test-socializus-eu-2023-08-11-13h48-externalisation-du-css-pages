//🇫🇷  Page de connexion utilisateur (Figma Frame 2)
//🇬🇧 user Login page (Figma Frame 2)
import { hostname } from "../../../mvp-reactnative/backendconnect/hostname.js";
import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  Modal,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import styles from "./Styles/HomeScreenCss.js";
//import Swiper from "react-native-swiper";
import { useSelector, useDispatch } from "react-redux"; //🇫🇷Permet de récupérer les données du state.(fr)//🇬🇧 Allows to retrieve data from the state.
//import { Dimensions } from "react-native"; //🇫🇷 Permet de récupérer les dimensions de l'écran. (pas utilisé)//🇬🇧 Get screen width and height(unused).

//Assets
import Logo from "../assets/images/logo-Socializus.svg";
import JSON from "../assets/json/en.json"; //🇫🇷 Fichier JSON pour la traduction. //🇬🇧 Get text variables from JSON file for translation
import UKFlag from "../assets/flags-svg-round/united-kingdom.svg";
import Nextwhite from "../assets/images/next-white.svg";

import { countriesListCircleFlags } from "../assets/countriesListCircleFlags";

//🇫🇷 Langue par défaut
//🇬🇧 Default language
import { langueFr } from "../constantes";
import Icon from "react-native-vector-icons/FontAwesome";
import { Dimensions, useWindowDimensions } from "react-native";
// const width = Dimensions.get("window").width;
// const height = Dimensions.get("window").height;

const HomeScreen = ({
  navigation,
  onClick,
  count,
  setUserNativeLanguage,
  pays,
}) => {
  //Dimenions
  const { height, width } = useWindowDimensions();
  const { home } = JSON;
  //(fr)Permet de passer des actions, ici le changement des langues// (gb)Allows to pass actions (managing language switch)
  const dispatch = useDispatch();
  // Voir le dossier reducers en directory src ou il sont
  //emportées les langues pour le rendre disponible globalment
  const [language, setLanguage] = useState(home.t2022_nativeLanguage);

  const [countryModalVisible, isCountryModalVisible] = useState(false); //(fr) countryModalVisible est une variable d'état qui est égale à false. isCountryModalVisible est une fonction qui permet de modifier la valeur de countryModalVisible.(fr)
  const [errorMessage, setErrorMessage] = useState(""); //(fr) errorMessage est une variable d'état qui est égale à "". setErrorMessage est une fonction qui permet de modifier la valeur de errorMessage.(fr)
  const [imageBGHome, setImageBGHome] = useState("HomepageBR"); //(fr) imageBGHome est une variable d'état qui est égale à "HomepageBR". setImageBGHome est une fonction qui permet de modifier la valeur de imageBGHome.(fr)
  const [marginField, setMarginField] = useState(-30); //(fr) marginField est une variable d'état qui est égale à -30. setMarginField est une fonction qui permet de modifier la valeur de marginField.(fr)
  const [languages, setLanguages] = useState(countriesListCircleFlags); //(fr) languages est une variable d'état qui est égale à countriesListCircleFlags. setLanguages est une fonction qui permet de modifier la valeur de languages.(fr)
  const [country, setCountry] = useState({
    language: "",
    flag: null,
    bigram: "",
  });
  // const [country, setCountry] = useState({
  //   language: "English",
  //   flag: <img src={UKFlag} style={styles.flag} width={30} height={30} />,
  // });
  const [countrySelected, setCountrySelected] = useState(""); //(fr) la variable d'état sappelle countrySelected et la fonction setCountrySelected permet de modifier la valeur de countrySelected.(fr)
  //(gb) the state variable si called countrySelected and the function setCountrySelected allows to modify the value of countrySelected.(gb)

  const filterLanguages = (text) => {
    //(fr) est une fonction qui prend un argument appelé text et qui retourne une valeur. Le comportement de cette fonction dépend du code qui se trouve à l'intérieur de la fonction(fr)
    // (gb)is a function that takes an argument called text and returns a value. The behavior of this function depends on the code inside the function(gb)
    let tmp = countriesListCircleFlags.filter((c) =>
      c.language.toLowerCase().includes(text.toLowerCase())
    );
    setLanguages(tmp);
  };
  const langue = useSelector((state) => state.langue); //(fr)la variable langue est égale à la valeur de la variable langue du state.(fr)
  // (gb)the variable language is equal to the value of the language variable of the state.(gb)

  useEffect(() => {
    //(fr) useEffect est un hook qui permet d'effectuer des actions à chaque fois que la valeur d'une variable change.(fr)//(gb) useEffect is a hook that allows to perform actions every time the value of a variable changes.(gb)
    dispatch({ type: country?.language });
  }, [country]);
  // NOT WORKING YET: Bulgarian(empty), Romanian, Serbian(empty), Slovakian(empty), Ukrainian
  const handlePress = (e) => {
    if (language === langue?.home?.t2022_nativeLanguage) {
      isCountryModalVisible(!countryModalVisible);
    } else {
      setErrorMessage("");
      navigation.navigate("LogIn", { MsgE: langue.emailscreen.title });

      if (onClick) {
        onClick(langue);
      }
      if (pays) {
        pays(country);
      }
    }
  };
  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={countryModalVisible}
        onRequestClose={() => {
          isCountryModalVisible(!countryModalVisible);
        }}
        style={{ width: 450 }}
      >
        <View
          style={{
            flex: 1,
            width: width >= 450 ? 450 : width,
            marginHorizontal: "auto",
          }}
        >
          <View style={styles.countryModalView}>
            <TouchableOpacity
              style={{ margin: 5, alignSelf: "flex-end" }} //(fr) alignSelf permet de définir l'alignement de l'élément par rapport à son parent.
              //(gb) alignSelf allows to define the alignment of the element relative to its parent.(gb)
              onPress={() => isCountryModalVisible(!countryModalVisible)}
              //(fr) onPress permet de définir une action à effectuer lorsqu'on appuie sur l'élément.(fr)
            >
              <Icon name="close" color="white" size={0} />
            </TouchableOpacity>
            <Text style={styles.countryModalTitle}>
              {langue?.home?.t2022_selectLanguage}:
            </Text>
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
                            bigram: country.bigram,
                            flag: country.flag,
                          });
                          setLanguage(country.language); //(fr) setLanguage permet de modifier la valeur de language.(fr)//(gb) setLanguage allows to modify the value of language.(gb)
                          setImageBGHome("home_page_illustrationBR");
                          setMarginField(15);
                          setUserNativeLanguage(country.language);
                          isCountryModalVisible(!countryModalVisible); // Commenttt (fr) isCountryModalVisible permet de modifier la valeur de countryModalVisible.(fr)// (gb)isCountryModalVisible allows to modify the value of countryModalVisible.(gb)
                        }}
                      >
                        <View style={{ width: 50, height: 50 }}>
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
      {/* ******************* Backrground image Homepage***********************************/}

      <ImageBackground
        source={require("../assets/images/" + imageBGHome + ".png")}
        resizeMode="stretch"
        style={{ flex: 1, width: width >= 450 ? 450 : width }}
      >
        {/* ********************* *********************************************************/}
        {/* Here to Change the language */}
        <TouchableOpacity
          style={[ styles.countryModalBtn, {marginTop: marginField }]}
          onPress={() => {
            isCountryModalVisible(!countryModalVisible);
          }}
        >
          <Text style={{ paddingLeft: "10%", fontWeight: "bold" }}>
            {language}
          </Text>
          <Icon name="caret-down" color={"black"} size={14} />
        </TouchableOpacity>
        <View
          style={{ marginBottom: height <= 520 ? "15%" : 90, height: 266.64 }}
        >
          <Image source={Logo} style={styles.logo} resizeMode="contain" />
        </View>

        <View style={styles.signInUpContainer}>
          <Text style={[ styles.signInUpTxt, { fontSize: (width >= 450 ? 450 : width) * 0.065}]}>
            {langue?.home?.findShareActivities}
          </Text>
          <TouchableOpacity
            onPress={() => {
              handlePress(); //Vers la page de connexion
            }}
            style={styles.signInUpButton}
          >
            <Text style={[ styles.startBtnTxt, {fontSize: (width >= 450 ? 450 : width) * 0.06}]} >
              {langue?.home?.start}
            </Text>
          </TouchableOpacity>
        </View>

        {errorMessage !== "" && (
          <View style={ styles.errorMsgView }>
            <Text style={ styles.errorMsgTxt }>
              {errorMessage}
            </Text>
          </View>
        )}
      </ImageBackground>
    </View>
  );
};
/*🇫🇷 Les styles ont été changés pour pouvoir afficher le contenu des boutons car le
texte fait une taille différente selon la langue.
🇬🇧 Changed button styles so they fit the text inside depending on the language*/

export default HomeScreen;
