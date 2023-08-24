// 🇫🇷 Page de password (Frame 3 Figma)
// 🇬🇧 Password Page (Frame 3 Figma)
import { hostname } from "../backendconnect/hostname.js";
import axios from "axios"; //🇫🇷 Importation de la librairie axios pour les requêtes API/ (gb) importing axios library for API requests
import {
  //🇫🇷 Importation des composants React Native/ (gb) importing React Native components
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
  useWindowDimensions,
  Dimensions,
} from "react-native";
import styles from "./Styles/PasswordScreenCss.js"
import { useState, useEffect } from "react"; //🇫🇷 Importation des hooks useState et useEffect/ (gb) importing useState and useEffect hooks
import Json from "../assets/json/en.json"; //
import AsyncStorage from "@react-native-async-storage/async-storage";
import Fields from "../components/Fields";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const Password = ({ route, setToken, setUser }) => {
  //(🇫🇷) Déclaration des variables d'état/ (gb) declaration of state variables
  const routeemail = route.params.email;
  const navigation = useNavigation();
  const [email, setEmail] = useState(routeemail);
  const [password, setPassword] = useState("");
  const [msgUser, setMsgUser] = useState("");
  const [errorMsg, setErrormsg] = useState("");
  const [emptyFields, setEmptyFields] = useState(null);
  const [pressed, setPressed] = useState(false);

  const { height, width } = useWindowDimensions();

  //🇫🇷 Extraction de l'objet "emailscreen" dans en.json
  //🇬🇧 Extracting "emailscreen" object from en.json
  const [btnDisable, setBtnDisable] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState("");
  const langue = useSelector((state) => state.langue);
  const { passwordscreen } = langue;
  useEffect(() => {
    //🇫🇷 Gestion de l'état du bouton de connexion/ (gb) managing login button state
    if (!password) {
      setBtnDisable(true);
      setBackgroundColor("gray");
    } else {
      setBtnDisable(false);
      setBackgroundColor("#59c09b");
    }
  });

  //🇫🇷 Gestion de la requête API de connexion
  //🇬🇧 Managing API request for login
  const requestLogin = async () => {
    setPressed(true);
    if (!password) {
      setEmptyFields("This field is required"); //🇫🇷 Message d'erreur si les champs sont vides/🇬🇧 Error message if fields are empty
    } else {
      try {
        setEmptyFields(null);
        //🇫🇷Gestion de la requête API de connexion
        //🇬🇧Managing API request for login
        const response = await axios.post(`${hostname}/api/v1/login`, {
          email: email,
          password: password,
        });
        //console.log(response.data);
        setToken(response.data.user.token);
        setUser(response.data.user);
        await AsyncStorage.setItem("user", JSON.stringify(response.data.user)); //🇫🇷 Stockage des données de l'utilisateur dans le local storage/ (gb) storing user data in local storage
      } catch (error) {
        //🇫🇷 Messages d'erreur en fonction de la réponse du serveur
        //🇬🇧 Error messages based on server response

        axios
          .post(`${hostname}/api/v1/sendcode`, {
            email: email,
            subject: "Code de vérification d'identité",
            message: "Entrer ce code pour confirmer votre identité : ######",
          })
          .then((response) => {
            navigation.navigate("VerificationIdentity", {
              email: email,
              password: password,
            });
          });
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>{langue?.login?.title}</Text> */}
      <View style={styles.password}>
        <Fields
          text={passwordscreen.password}
          icon={"locker"}
          state={password}
          setState={setPassword}
          pressed={pressed}
          setPressed={setPressed}
        />
      </View>
      <View style={styles.centerTerms}>
        <View style={styles.termsContainer}>
          {/**🇫🇷 Affichage des conditions d'utilisation et de la politique de confidentialité/ (gb) displaying terms and conditions and privacy policy */}
          <Text style={styles.terms}>
            {langue?.passwordscreen?.label_2}
            {/**fonction qui permet l'acceptation de linscription de lutilisateur/(gb) function that allows user registration acceptance*/}
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  "https://www.termsandconditionsgenerator.com/live.php?token=lkCADkefwST3eZ61BvL6lZv3ppyMd3An"
                )
              }
            >
              <Text style={styles.underline}>
                {langue?.emailscreen?.label_3}
                {/*terms and conditions"*/}
              </Text>
            </TouchableOpacity>
            {langue?.passwordscreen?.label_4}
            {/*and the*/}
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  "https://www.termsandconditionsgenerator.com/live.php?token=lkCADkefwST3eZ61BvL6lZv3ppyMd3An"
                )
              }
            >
              <Text style={styles.underline}>
                {langue?.emailscreen?.label_5} {/*privacy policy*/}
              </Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
      <View style={[styles.btn, { width: (width <= 450 ? width : 400) * 0.8 }]}>
        <TouchableOpacity 
          style={[ styles.passwordBtn, {backgroundColor: backgroundColor}]}
          disabled={btnDisable} //🇫🇷 Désactivation du bouton si les champs sont vides/ (gb) disabling button if fields are empty
          onPress={() => {
            setPressed(true);
            requestLogin();
            //testEmail();
            // navigation.navigate("Verification");
          }}
        >
          <Text style={styles.btnText}>{langue?.passwordscreen?.button_1}</Text>
          {/*(EN) "button_1": "Login"
          (FR) "button_1": "S'incrire"*/}
        </TouchableOpacity>
      </View>
      <View style={styles.centerBot}>
        <View style={styles.bottomBoxTop}>
          <Text style={styles.bottomText}>
            {langue?.passwordscreen?.label_7}
          </Text>
          {/*(EN) "label_7": "Forgot your password ?"
          (FR) "label_7": "Mot de passe oublié ?"*/}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("LogIn", {
                MsgE: langue?.emailscreen?.update_tittle_reset,
              });
            }} //(FR) Navigation vers la page EmailScreen avec la transmission d'une données / (gb) Navigate to the page EmailScreen with the transmission of an data
            style={[styles.smallBtn]}
          >
            <Text style={styles.smallBtnText}>
              {langue?.passwordscreen?.button_3}
            </Text>
            {/*(EN)"button_3": "Forgotten Password"*/}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};



export default Password;
