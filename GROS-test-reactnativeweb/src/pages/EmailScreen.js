// 🇫🇷 Page de Email (Frame 3 Figma)
// 🇬🇧 Email Page (Frame 3 Figma)
import { hostname } from "../../../mvp-reactnative/backendconnect/hostname.js";
import axios from "axios"; //🇫🇷 Importation de la librairie axios pour les requêtes API/ (gb) importing axios library for API requests
import {
  //🇫🇷 Importation des composants React Native/ (gb) importing React Native components
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Dimensions, useWindowDimensions } from "react-native";
import { useState, useEffect } from "react"; //🇫🇷 Importation des hooks useState et useEffect/ (gb) importing useState and useEffect hooks
import Json from "../assets/json/en.json"; //
import AsyncStorage from "@react-native-async-storage/async-storage";
import Fields from "../components/Fields";
import { useSelector } from "react-redux";
import { Linking } from "react-native";
import { useRoute } from "@react-navigation/native";

import styles from "./Styles/EmailScreenCss.js";

const EmailScreen = ({ navigation, setToken, setUser, setLang }) => {
  //(🇫🇷) Déclaration des variables d'état/ (gb) declaration of state variables
  const [email, setEmail] = useState("");
  const [msgUser, setMsgUser] = useState("");
  const [errorMsg, setErrormsg] = useState("");
  const [emptyFields, setEmptyFields] = useState(null); //🇫🇷 Message d'erreur si les champs sont vides/ (gb) error message if fields are empty
  const [visible, setVisible] = useState(true); //🇫🇷 Permet de rendre visible ou non le conteneur en fonction de la valeur booléene de visble/ (gb) Permit to make visible or not the container depend of the boolean value of the visible variable
  const { emailscreen } = Json;
  const { height, width } = useWindowDimensions();
  //🇫🇷 Extraction de l'objet "emailscreen" dans en.json
  //🇬🇧 Extracting "emailscreen" object from en.json
  const [btnDisable, setBtnDisable] = useState(true); //🇫🇷 Désactivation du bouton si les champs sont vides/ (gb) disabling button if fields are empty
  const [backgroundColor, setBackgroundColor] = useState(""); //🇫🇷 Couleur du bouton de connexion/ (gb) color of login button
  const [btnTouch, setBtnTouch] = useState(false);
  const langue = useSelector((state) => state.langue);
  //(fr) Déclaration de la variable permettant la lecture des données envoyé par la navigation/ (gb) declaration of the variable who permit to read the data send by navigation
  const route = useRoute();

  // console.log('langue',langue);

  useEffect(() => {
    //🇫🇷 Gestion de l'état du bouton de connexion/ (gb) managing login button state

    //🇫🇷Pour une validation basique du mail côté front
    //🇬🇧 In order to get basic validation for a email
    if (
      email == null ||
      email === "" ||
      !email.includes("@") || //🇫🇷 Vérification de la présence du caractère "@" dans le mail/ (gb) checking if "@" is in email
      !email.includes(".")
    ) {
      setBtnDisable(true);
      setBackgroundColor("gray");
    } else {
      setBtnDisable(false);
      setBackgroundColor("#59c09b");
    }
    //Fr Vérification de la données reçu par la navigation des pages via route
    //GB Verification of the date receive by the navigation of pages via route
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
  /*const initialProject = ()=>{
   if(btnTouch){
     navigation.setOptions({
       title : route.params.MsgE,
     })
     console.log(route.params.MsgE);
     console.log("ok");
   }
  }*/

  const testEmail = async () => {
    //🇫🇷 Fonction qui permet de tester si le mail est enregistré dans la base de données/ (gb) function that allows to check if email is in data base
    try {
      const emailLowercase = email.toLowerCase(); //🇫🇷 Mettre le mail en minuscule/ (gb) put email in lowercase
      console.log("before", email);
      const response = await axios.post(`${hostname}/api/v1/test-email`, {
        //🇫🇷 Requête API pour tester si le mail est enregistré dans la base de données/ (gb) API request for check if email is in data base
        email: emailLowercase,
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
      setErrormsg("Enter a valid email"); //🇫🇷 Message d'erreur si le mail n'est pas valide/ (gb) error message if email is not valid
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>{msgUser}</Text>
      {/* {" "} */}
      {/**🇫🇷 Affichage ddu message utilisateur/ 🇬🇧 displaying the user message**/}
      <Text style={styles.titlemail}>{langue?.emailscreen?.label_1}</Text>
      {/* {" "} */}
      {/**🇫🇷 Affichage de "identifie toi pour continuer"/ 🇬🇧 displaying "log in you for continue" */}
      <View style={styles.email}>
        {/**🇫🇷 Champ de reemplisage du mail"/ 🇬🇧 Field for input email */}
        <Fields
          text={emailscreen.email}
          icon={"arobase"}
          state={email}
          //setState={setEmail} //🇫🇷 Fonction qui permet de modifier la valeur de l'état email/ (gb)
          setState={(text) => setEmail(text.toLowerCase())} //🇫🇷 Fonction qui permet de modifier la valeur de l'état email/ (gb) function that allows to modify email state value
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
          style={{
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            width: "100%",
            backgroundColor: backgroundColor,
          }}
          disabled={btnDisable} //🇫🇷 Désactivation du bouton si les champs sont vides/ (gb) disabling button if fields are empty
          onPress={() => {
            // setPressed(true);
            //console.log("Presssssssssssss");
            setBtnTouch(true);
            // requestLogin();
            testEmail();
          }}
        >
          <Text style={styles.btnText}>{langue?.emailscreen?.button_1}</Text>

          {/*(EN) "button_1": "Login"
          (FR) "button_1": "S'incrire"*/}
        </TouchableOpacity>
      </View>
      {/*(FR) Affichage ou non du conteneur en fonction de la valeur booléene de visble
      (EN) Display the container depend of the boolean value of the visible variable*/}
      {visible ? (
        <View style={styles.centerBot}>
          <View style={styles.bottomBoxTop}>
            <View>
              <Text style={styles.bottomText}>
                {langue?.emailscreen?.label_7}
              </Text>
            </View>
            {/*(EN) "label_7": "Forgot your password ?"
          (FR) "label_7": "Mot de passe oublié ?"*/}
            <TouchableOpacity
              onPress={() => {
                //🇫🇷 Initialisé un message à l'utilisateur / (gb) initialize the user message
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
      ) : null}
    </View>
  );
};

export default EmailScreen;
