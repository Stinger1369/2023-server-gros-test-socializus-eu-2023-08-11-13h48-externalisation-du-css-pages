//🇫🇷  Page de connexion utilisateur (Figma Frame 2)
//🇬🇧 user Login page (Figma Frame 2)

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  Modal,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import styles from "./Styles/HomeScreenCss"
import Swiper from "react-native-swiper";
import { useSelector, useDispatch } from "react-redux"; //🇫🇷Permet de récupérer les données du state.(fr)//🇬🇧 Allows to retrieve data from the state.
//import { Dimensions } from "react-native"; //🇫🇷 Permet de récupérer les dimensions de l'écran. (pas utilisé)//🇬🇧 Get screen width and height(unused).

//Assets
import Logo from "../assets/images/logo-Socializus.svg";
import JSON from "../assets/json/en.json"; //🇫🇷 Fichier JSON pour la traduction. //🇬🇧 Get text variables from JSON file for translation
import France from "../assets/flags-svg-round/france.svg";

import { countriesListCircleFlags } from "../assets/countriesListCircleFlags";

//🇫🇷 Langue par défaut
//🇬🇧 Default language
import { langueFr } from "../constantes";
import Icon from "react-native-vector-icons/FontAwesome";
//import { Icon } from "@rneui/themed";
import { Dimensions, useWindowDimensions } from "react-native";

// const width = Dimensions.get("window").width;
// const height = Dimensions.get("window").height;

const HomeScreen = ({ navigation,onClick, count, setUserNativeLanguage,pays }) => {

  const { height, width } = useWindowDimensions();
  const { home } = JSON;



  //(fr)Permet de passer des actions, ici le changement des langues// (gb)Allows to pass actions (managing language switch)
  const dispatch = useDispatch();
  const [language, setLanguage] = useState(home.t2022_nativeLanguage);
  const [countryModalVisible, isCountryModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [imageBGHome, setImageBGHome] = useState("homepage.png");
  const [marginField, setMarginField] = useState(-30);
  const [languages, setLanguages] = useState(countriesListCircleFlags);
  const [country, setCountry] = useState({
    language: "",
    flag: null,
    bigram:""
  });
  const [countrySelected, setCountrySelected] = useState(""); //(fr) la variable d'état sappelle countrySelected et la fonction setCountrySelected permet de modifier la valeur de countrySelected.(fr)
  //(gb) the state variable si called countrySelected and the function setCountrySelected allows to modify the value of countrySelected.(gb)


  /**🇫🇷 function pour changer l'image de homescreen"/ 🇬🇧 function for change homescreen image*/
  const changeImage = () => {
    setImageBGHome("home_page_illustration.png");
  };

  const getImageSource = () => {
    let imageSource = require("../assets/images/homepage.png"); // Image par défaut

    if(imageBGHome === "home_page_illustration.png"){
      imageSource = require("../assets/images/home_page_illustration.png")
    }
    return Image.resolveAssetSource(imageSource).uri;
  };

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
      // setErrorMessage(langue?.home?.t2022_languageWarning); //comment
      isCountryModalVisible(!countryModalVisible); //ajoutt
    } else {
      setErrorMessage("");
      navigation.navigate("LogIn", {MsgE : langue.emailscreen.title});
      {
        onClick(langue);
        pays(country)
      } /// Appelle de la function pour passer la langue selectionnée all'app.js (reverse data flow)
    }
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={countryModalVisible}
        onRequestClose={() => {
          isCountryModalVisible(!countryModalVisible);
        }}
      >
        {/* <View style={styles.modalContainer}> */}
        <View style={styles.countryModalView}>
          <TouchableOpacity
            style={{ margin: 5, alignSelf: "flex-end" }} //(fr) alignSelf permet de définir l'alignement de l'élément par rapport à son parent.
            //(gb) alignSelf allows to define the alignment of the element relative to its parent.(gb)
            onPress={() => isCountryModalVisible(!countryModalVisible)} //(fr) onPress permet de définir une action à effectuer lorsqu'on appuie sur l'élément.(fr)
          >
            <Icon name="close" type="font-awesome" color="white" size={28} />
          </TouchableOpacity>
          <Text style={styles.countryModalTitle}>Please select your native language:</Text>
          <View style={{ position: "relative" }}>
            {/*(fr)position permet de définir la position de l'élément par rapport à son parent.(fr)*/}
            <TextInput
              style={styles.searchBarInput}
              state={language}
              setState={setLanguage}
              onChangeText={() => {
                filterLanguages;
              }}
            />
            <View style={styles.searchIcon}>
              {/*(fr) permet de définir la position de l'élément par rapport à son parent. */}
              <Icon name="search" type="font-awesome" color="#ccc" size={16} />
            </View>
          </View>
          {/* *******************Affichage des drapeaux sur la page***********************************/}

          {/* <ScrollView style={{ flex: 1 }}>
              <View style={styles.countryModalScrollView}>
                {countriesListCircleFlags.map((country, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={styles.countryModalItem}
                      onPress={() => {
                        setCountry({
                          language: country.language,
                          flag: country.flag,
                        });
                        isCountryModalVisible(!countryModalVisible);
                      }}
                    >
                      <View style={{ width: 50, height: 50 }}>
                        {country.flag}
                      </View>
                      <Text style={styles.countryName}>{country.language}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView> */}

          {/* *******************Affichages des drapeaux et codes des slides***********************************/}

          <ScrollView persistentScrollbar={true} showsVerticalScrollIndicator={true}>
            {/**(fr) Swiper permet de faire défiler les éléments.(fr)*/}
            <View style={styles.slide}>
              <View style={styles.countryModalScrollView}>
                {countriesListCircleFlags
                  .map((country, index) => {
                    //(fr) map permet de parcourir un tableau.(fr)// (gb) map allows to browse a table.(gb)
                    return (
                      //(fr)
                      <TouchableOpacity
                        key={index}
                        style={styles.countryModalItem}
                        onPress={() => {
                          setCountry({
                            language: country.language,
                            flag: country.flag,
                          });
                          setLanguage(country.language);
                          changeImage();
                          setMarginField(15)
                          setUserNativeLanguage(country.language);
                          isCountryModalVisible(!countryModalVisible); // (fr) isCountryModalVisible permet de modifier la valeur de countryModalVisible.(fr)
                          // (gb)isCountryModalVisible allows to modify the value of countryModalVisible.(gb)
                        }}
                      >
                        <View style={ styles.flagContainer }>
                          {country.flag}
                        </View>
                        <Text style={styles.countryName}>
                          {country.language}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
              </View>
            </View>   
          </ScrollView>
        </View>
        {/* </View> */}
      </Modal>
      {/* ******************* Backrground image Homepage***********************************/}

      <ImageBackground
        source={{ uri: getImageSource() }}
        resizeMode="stretch"
        style={{ flex: 1, width: width >= 450 ? 450 : width }}
      >
        {/* ********************* *********************************************************/}
        {/* Here to Change the language */}
        <TouchableOpacity
          style={[ styles.languageBtn, {marginTop:marginField}]}
          onPress={() => {
            isCountryModalVisible(!countryModalVisible);
          }}
        >
          <Text style={ styles.languageTxt }>
            {language}
          </Text>
          <Icon name="caret-down" color={"black"} size={14} />
        </TouchableOpacity>

        <View style={{ marginBottom: height <= 520 ? "15%" : 90 }}>
          <Logo style={styles.logo} />
        </View>
        <View style={styles.signInUpContainer}>
          <Text style={[ styles.signUpTxt, {fontSize: (width >= 450 ? 450 : width) * 0.065}]}>
            {langue?.home?.findShareActivities}
          </Text>
          <TouchableOpacity
            onPress={() => {
              handlePress(); //Vers la page de connexion
            }}
            style={styles.signInUpButton}
          >
            <Text style={[ styles.signUpTxtTwo, {fontSize: (width >= 450 ? 450 : width) * 0.06}]}>
              {langue?.home?.start}
            </Text>
          </TouchableOpacity>
        </View>

        {errorMessage !== "" && (
          <View style={ styles.errorMessageContainer }>
            <Text style={ styles.errorMessageTxt }>
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
