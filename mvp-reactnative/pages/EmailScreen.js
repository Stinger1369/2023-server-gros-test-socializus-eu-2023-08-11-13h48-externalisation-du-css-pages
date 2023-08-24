// 🇫🇷 Page de login (Frame 3 Figma)
// 🇬🇧 Login Page (Frame 3 Figma)
import { hostname } from "../backendconnect/hostname";
import axios from "axios"; //🇫🇷 Importation de la librairie axios pour les requêtes API/ (gb) importing axios library for API requests
import {
  //🇫🇷 Importation des composants React Native/ (gb) importing React Native components
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  Linking,
} from "react-native";
import styles from "./Styles/EmailScreenCss"
import { useState, useEffect } from "react"; //🇫🇷 Importation des hooks useState et useEffect/ (gb) importing useState and useEffect hooks
import Json from "../assets/json/en.json"; //
import AsyncStorage from "@react-native-async-storage/async-storage";
import Fields from "../components/Fields";
import { useSelector } from "react-redux";
import { useRoute } from "@react-navigation/native";

const EmailScreen = ({ navigation, setToken, setUser }) => {
  //(🇫🇷) Déclaration des variables d'état/ (gb) declaration of state variables
  const [email, setEmail] = useState(null);
  const [msgUser, setMsgUser] = useState("");
  const [errorMsg, setErrormsg] = useState(null);
  const [emptyFields, setEmptyFields] = useState(null);
  const [visible, setVisible] = useState(true);
  const [pressed, setPressed] = useState(false);
  const { emailscreen } = Json;
  const { height, width } = useWindowDimensions();
  //🇫🇷 Extraction de l'objet "login" dans en.json
  //🇬🇧 Extracting "login" object from en.json
  const [btnDisable, setBtnDisable] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState("");
  const [btnTouch, setBtnTouch] = useState(false);
  const langue = useSelector((state) => state.langue);
  //(fr) Déclaration de la variable permettant la lecture des données envoyé par la navigation/ (gb) declaration of the variable who permit to read the data send by navigation
  const route = useRoute();

  useEffect(() => {
    //🇫🇷 Gestion de l'état du bouton de connexion/ (gb) managing login button state
    if (
      email == null ||
      email === "" ||
      !email.includes("@") ||
      !email.includes(".")
    ) {
      setBtnDisable(true);
      setBackgroundColor("gray");
    } else {
      setBtnDisable(false);
      setBackgroundColor("#59c09b");
    }
    if (route.params.MsgE === langue?.emailscreen?.update_tittle_reset) {
      //Fr Mettre à jour le titre du header
      //GB Update the title of the header
      navigation.setOptions({
        title: route.params.MsgE,
      });
      //Fr Personnalisation du message à l'utilisateur ainsi que du message d'erreur. Gérer l'affichage du lien Forget your password
      //GB Customization of the message of the user and the error message.  Manage the display of the link forget your password
      setMsgUser(langue?.emailscreen?.jpi_subtittle_reset);
      setErrormsg(langue?.emailscreen?.click_button_reset);
      setVisible(false);
    }
  });

  useEffect(() => {
    //FR Initialisation du titre du header ainsi que le message à affiché à l'utilisateur
    //GB Inititialization of the title of the header
    const initializeValues = () => {
      setMsgUser(langue?.emailscreen?.jpi_subtittle_1);
      navigation.setOptions({
        title: route.params.MsgE,
      });
    };
    initializeValues();
  }, []);

  {
    /**🇫🇷 Test mail pour savoir si mail est enregistré dans la basse de donnés"/ 🇬🇧 Test mail for check if mail is in data base */
  }

  const testEmail = async () => {
    try {
      console.log("before", email);
      const response = await axios.post(`${hostname}/api/v1/test-email`, {
        email: email,
      });

      console.log("response", response.data.result, email);

      if (response.data.result) {
        {
          /**🇫🇷 utilisateur existant"/ 🇬🇧 user exist */
        }
        navigation.navigate("Password", { email: email });
      } else {
        {
          /**🇫🇷 utilisateur inexistant, dont creation su compte"/ 🇬🇧 user exist so go to create count */
        }
        navigation.navigate("Register", { email: email });
      }
    } catch (e) {
      setErrormsg("Enter a valid email");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>
        {/**🇫🇷 Affichage ddu message utilisateur/ 🇬🇧 displaying the user message**/}
        {msgUser}
      </Text>
      <Text style={styles.titlemail}>{langue?.emailscreen?.label_1}</Text>
      {/**🇫🇷 Affichage de "identifie toi pour continuer"/ 🇬🇧 displaying "log in you for continue" */}
      <View style={styles.email}>
        {/**🇫🇷 Champ de reemplisage du mail"/ 🇬🇧 Field for input email */}
        <Fields
          text={emailscreen.email}
          icon={"arobase"}
          state={email}
          setState={setEmail} //🇫🇷 Fonction qui permet de modifier la valeur de l'état email/ (gb) function that allows to modify email state value
        />
        {!email &&
          emptyFields && ( //🇫🇷 Affichage du message d'erreur si les champs sont vides/ (gb) displaying error message if fields are empty
            <View>
              <Text style={styles.error}>{emptyFields}</Text>
            </View>
          )}
      </View>
      {/**🇫🇷 Affichage des conditions d'utilisation et de la politique de confidentialité/ (gb) displaying terms and conditions and privacy policy */}
      <View style={styles.centerTerms}>
        <View style={styles.termsContainer}>
          <Text style={styles.terms}>
            {langue?.emailscreen?.label_2}
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  "https://www.termsandconditionsgenerator.com/live.php?token=lkCADkefwST3eZ61BvL6lZv3ppyMd3An"
                )
              }
            >
              <Text style={styles.underline}>
                {langue?.emailscreen?.label_3}
              </Text>
            </TouchableOpacity>
            {langue?.emailscreen?.label_4}
            {/*and the*/}
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  "https://www.termsandconditionsgenerator.com/live.php?token=lkCADkefwST3eZ61BvL6lZv3ppyMd3An"
                )
              }
            >
              <Text style={styles.underline}>
                {langue?.emailscreen?.label_5}
              </Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
      {errorMsg && (
        <View style={styles.errorCard}>
          <Text style={styles.error}>{errorMsg}</Text>
        </View>
      )}
      <View style={[styles.btn, { width: (width <= 450 ? width : 400) * 0.8 }]}>
        <TouchableOpacity
          style={[ styles.touchableOpacityBtn, {backgroundColor: backgroundColor}]}
          disabled={btnDisable} //🇫🇷 Désactivation du bouton si les champs sont vides/ (gb) disabling button if fields are empty
          onPress={() => {
            // setPressed(true);
            console.log("Presssssssssssss");
            setBtnTouch(true);
            // requestLogin();
            testEmail();
          }}
        >
          <Text style={styles.btnText}>{langue?.emailscreen?.button_1}</Text>
          {/*(EN) "button_1": "Next"  
          (FR) "button_1": "Suivant"*/}
        </TouchableOpacity>
      </View>
      {/*(FR) Affichage ou non du conteneur en fonction de la valeur booléene de visble
      (EN) Display the container depend of the boolean value of the visible variable*/}
      {visible ? (
        <View style={styles.centerBot}>
          <View style={styles.bottomBoxTop}>
            <Text style={styles.bottomText}>
              {langue?.emailscreen?.label_7}
            </Text>
            {/*(EN) "label_7": "Forgot your password ?"
          (FR) "label_7": "Mot de passe oublié ?"*/}
            <TouchableOpacity
              onPress={() => {
                setMsgUser(langue?.emailscreen?.jpi_subtittle_reset); //(FR)initialisé un message à l'utilisateur / (GB) initialize the user message
                setErrormsg(langue?.emailscreen?.click_button_reset); //(FR)initialisé un message d'erreur / (GB) initialize un message d'erreur
                setVisible(false); //(FR) Permet de rendre invisble ce container / (GB) Permit to make an invisible container
                navigation.setOptions({
                  title: langue?.emailscreen?.update_tittle_reset,
                });
              }}
              style={[styles.smallBtn]}
            >
              <Text style={styles.smallBtnText}>
                {langue?.emailscreen?.button_3}
              </Text>
              {/*(EN)"button_3": "Forgotten Password"*/}
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
};



export default EmailScreen;
