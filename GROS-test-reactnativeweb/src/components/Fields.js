/* FR - Voilà le nouveau composant Fields. J'ai tenté d'écrire le code le plus générique possible pour pouvoir l'utiliser dans toute l'application. 
Pour l'utiliser, il suffit de renseigner les props nécessaires pour générer le type d'input désiré. A noter que j'ai mis les données du json pour faire fonctionner le tout. Il faudra donc changer ça aussi pour une meilleure gestion des traductions de texte 
(Frame 15-16 sur Figma)- FR */

/* ENG - Here is the new Fields Component. I tried to write the most generic code so it can be used for all the types of inputs we have in the app. 
To use it, you just need to add the necessary props. Please note that I used the json data to make all this work, so you'll have to change that as well for a better translation handling
(Frame 15-16 of Figma) - ENG */

import { TouchableOpacity, Text, View, TextInput, Image } from "react-native";
import styles from "./Styles/FieldsCss";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";

//import Json from "../assets/json/en.json";

import { Dimensions, useWindowDimensions } from "react-native";
import { usePlacesWidget } from "react-google-autocomplete";

const Fields = ({
  text,
  icon,
  upperText,
  upperIcon,
  state,
  setState,
  pressed,
  setPressed,
  disable,
}) => {
  /*   Text => placehoder ou texte à enreistrer
  icon => icône à afficher, si y'en a une
  upperText => petit texte à afficher au dessus de l'input
  state et setState => le state à modifier */

  const langue = useSelector((state) => state.langue);

  const { register, createProfile, createActivity } = langue;

  const [isSecure, setIsSecure] = useState(
    text === register.password || text === register.passConfirm ? true : false
  );
  const [passwordInput, isPasswordInput] = useState(
    text === register.password || text === register.passConfirm ? true : false
  );

  const [fieldIcon, setFieldIcon] = useState("");

  const iconList = [
    { id: "arobase", url: require("../assets/images/arobase.png") },
    { id: "textFrame", url: require("../assets/images/text-frame.png") },
    { id: "city", url: require("../assets/images/city.png") },
    { id: "birthday", url: require("../assets/images/birthday.png") },
    { id: "locker", url: require("../assets/images/locker.png") },
    { id: "whatsapp", url: require("../assets/images/whatsapp.png") },
    { id: "fbPage", url: require("../assets/images/fbPage.png") },
    { id: "fbGroup", url: require("../assets/images/fbGroup.png") },
    { id: "meetup", url: require("../assets/images/Meetup.png") },
    { id: "telegram", url: require("../assets/images/Telegram.png") },
    { id: "telephone", url: require("../assets/images/phone.svg") },
  ];

  useEffect(() => {
    const findIcon = (icon) => {
      const iconToUse = iconList.find((i) => i.id === icon);
      setFieldIcon(iconToUse.url);
    };
    const findUpperIcon = (upperIcon) => {
      const upperIconToUse = iconList.find((i) => i.id === upperIcon);
      setFieldIcon(upperIconToUse.url);
    };
    if (icon) findIcon(icon);
    if (upperIcon) findUpperIcon(upperIcon);
  }, []);

  return (
    <View
      style={[
        styles.container,
        {
          width: text === createActivity.step1.price ? 70 : "100%",
          backgroundColor:
            upperIcon ||
            upperText === createActivity.step4.link ||
            (state && state.length !== 0)
              ? "white"
              : "#EEECE7",
          borderColor: !state && pressed ? "red" : "black",
        },
      ]}
    >
      {upperText && (
        <View style={styles.upperSection}>
          {upperIcon && <Image source={fieldIcon} style={styles.upperIcon} />}
          <Text style={styles.upperText}>{upperText}</Text>
        </View>
      )}

      {icon && <Image source={fieldIcon} style={styles.icon} />}
      <TextInput
        style={[
          styles.input,
          {
            width: text === createActivity.step1.price ? 70 : "100%",
            flex: text === createActivity.step1.price ? null : 1,
          },
        ]}
        placeholder={text}
        placeholderTextColor="#8C8F8E"
        value={state}
        onChangeText={(text) => {
          setState(text);
        }}
        secureTextEntry={isSecure}
        disabled={disable ? disable : false}
      />

      {passwordInput && (
        <TouchableOpacity
          onPress={() => {
            setIsSecure(!isSecure);
          }}
        >
          <Image
            source={require("../assets/images/eye.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const CityField = ({ text, state, setState }) => {
  const { ref } = usePlacesWidget({
    apiKey: "AIzaSyC_IMygJzn2msqFyZHfZDuTAFypEUEu-YE",
    onPlaceSelected: (place) => {
      setState(place.formatted_address);
      //console.log(place)
      console.log(place.formatted_address);
    },
  });

  return (
    <View
      style={[
        styles.container,
        {
          width: "100%",
          backgroundColor:
            (state && state.length !== 0) || text.includes(",")
              ? "white"
              : "#EEECE7",
        },
      ]}
    >
      <Image
        source={require("../assets/images/city.png")}
        style={styles.icon}
      />
      <TextInput
        style={[
          styles.input,
          {
            width: "100%",
            flex: 1,
          },
        ]}
        placeholder={text}
        ref={ref}
        placeholderTextColor={text.includes(",") ? "#000000" : "#8C8F8E"}
        //value={state}
        //Remise de la valeur state à vide en cas de text différent du state
        onChangeText={(text) => {
          if (text !== state && state !== null) {
            setState("");
          }
          console.log(state);
        }}
      />
    </View>
  );
};

export default Fields;
export { CityField };
