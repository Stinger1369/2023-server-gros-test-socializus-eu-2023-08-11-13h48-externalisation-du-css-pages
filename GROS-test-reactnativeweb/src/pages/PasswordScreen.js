// 🇫🇷 Page de login (Frame 3 Figma)
// 🇬🇧 Login Page (Frame 3 Figma)
import { hostname } from "../../../mvp-reactnative/backendconnect/hostname.js";
import axios from "axios"; //🇫🇷 Importation de la librairie axios pour les requêtes API/ (gb) importing axios library for API requests
import {
  //🇫🇷 Importation des composants React Native/ (gb) importing React Native components
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import styles from "./Styles/PasswordScreenCss";
import { useState, useEffect } from "react"; //🇫🇷 Importation des hooks useState et useEffect/ (gb) importing useState and useEffect hooks
import Json from "../assets/json/en.json"; //
import AsyncStorage from "@react-native-async-storage/async-storage";
import Fields from "../components/Fields";
import { useSelector } from "react-redux";
import { Linking } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { Dimensions, useWindowDimensions } from "react-native";
const Password = ({ route, setToken, setUser }) => {
  //(🇫🇷) Déclaration des variables d'état/ (gb) declaration of state variables
  const routeemail = route.params.email;
  const navigation = useNavigation();
  const [email, setEmail] = useState(routeemail); //🇫🇷 Récupération de l'email de la page précédente/ (gb) Retrieving the email from the previous page
  const [password, setPassword] = useState(""); //🇫🇷 Récupération du mot de passe/ (gb) Retrieving the password
  const [msgUser, setMsgUser] = useState(""); //🇫🇷 Message d'erreur si l'utilisateur n'existe pas/ (gb) Error message if user doesn't exist
  const [errorMsg, setErrormsg] = useState(""); //🇫🇷 Message d'erreur si le format de l'email ou du mot de passe est incorrect/ (gb) Error message if email or password format is incorrect
  const [emptyFields, setEmptyFields] = useState(null); //🇫🇷 Message d'erreur si les champs sont vides/ (gb) Error message if fields are empty
  const [pressed, setPressed] = useState(false); //🇫🇷 Gestion de l'état du bouton de connexion/ (gb) managing login button state

  const { height, width } = useWindowDimensions();

  //🇫🇷 Extraction de l'objet "emailscreen" dans en.json
  //🇬🇧 Extracting "emailscreen" object from en.json
  const [btnDisable, setBtnDisable] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState("");
  const langue = useSelector((state) => state.langue);
  const { passwordscreen } = langue;
  useEffect(() => {
    //🇫🇷 Gestion de l'état du bouton de connexion/ (gb) managing login button state
    if (password == null) {
      setBtnDisable(true);
      setBackgroundColor("#59c09b");
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
            //🇫🇷 Envoi du code de vérification d'identité/ (gb) sending identity verification code
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

        // if (error.response && error.response.status === 400) {
        //   setErrormsg("Wrong format on Email and/or Password");//🇫🇷 Message d'erreur si le format de l'email ou du mot de passe est incorrect/ (gb) error message if email or password format is incorrect
        // } else if (error.response && error.response.status === 401) {
        //   setErrormsg("Wrong Email and/or Password");
        // }
      }
    }
  };

  //test email
  const testEmail = async () => {
    try {
      const response = await axios.get(`${hostname}/api/v1/test-email`, {
        //🇫🇷 Test de l'existence de l'email dans la base de données/ (gb) testing email existence in database
        email: email,
      });

      if (response.result) {
        navigation.navigate("Password", { email: email });
      } else {
        //création de compte
      }
    } catch (e) {}
  };

  return (
    <ScrollView style={styles.LogIn}>
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

      {/* {!password && emptyFields && (
        <View style={styles.center}>
          <Text style={styles.error}>{emptyFields}</Text>
        </View>
      )} */}
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
          style={[ styles.verificationBtn, { backgroundColor: backgroundColor}]}
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
        {/* <View style={[styles.bottomBoxTop, { marginBottom: 20 }]}>
                <Text style={styles.bottomText}>{langue?.login?.label_6}</Text> */}
        {/*(EN) "label_6": "You don't have an account ?" 
                (FR) "label_6": "Vous n'avez pas de compte ?"*/}
        {/* <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Password");//🇫🇷 Redirection vers la page d'inscription/ (gb) redirection to registration page
                  }}
                  style={styles.smallBtn}//(fr)bouton d'inscrption/ (gb) registration button 
                > */}
        {/* <Text style={styles.smallBtnText}>{langue?.login?.button_2}</Text> */}
        {/*(EN)"button_2": "Register"
                  (FR) "button_2": "s'incrire" */}
        {/* </TouchableOpacity>
              </View> */}
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
    </ScrollView>
  );
};

export default Password;
