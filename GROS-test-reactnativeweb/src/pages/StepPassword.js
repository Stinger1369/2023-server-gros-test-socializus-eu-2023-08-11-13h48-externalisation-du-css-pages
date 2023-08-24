// 🇫🇷 Page de login (Frame 3 Figma)
// 🇬🇧 Login Page (Frame 3 Figma)
import { hostname } from "../mvp-reactnative/backendconnect/hostname.js";
import axios from "axios"; //🇫🇷 Importation de la librairie axios pour les requêtes API/ (gb) importing axios library for API requests
import {
  //🇫🇷 Importation des composants React Native/ (gb) importing React Native components
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import styles from "./Styles/StepPasswordCss";
import { useState, useEffect } from "react"; //🇫🇷 Importation des hooks useState et useEffect/ (gb) importing useState and useEffect hooks
import Json from "../assets/json/en.json"; //
import AsyncStorage from "@react-native-async-storage/async-storage";
import Fields from "../components/Fields";
import { useSelector } from "react-redux";

const StepPage = ({ navigation, setToken, setUser }) => {
  //(🇫🇷) Déclaration des variables d'état/ (gb) declaration of state variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrormsg] = useState("");
  const [emptyFields, setEmptyFields] = useState(null);
  const [pressed, setPressed] = useState(false);
  const { passwordscreen } = Json;
  //🇫🇷 Extraction de l'objet "passwordscreen" dans en.json
  //🇬🇧 Extracting "passwordscreen" object from en.json
  const [btnDisable, setBtnDisable] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState("");
  const langue = useSelector((state) => state.langue);

  useEffect(() => {
    //🇫🇷 Gestion de l'état du bouton de connexion/ (gb) managing login button state
    if (email == null || password == null) {
      setBtnDisable(true); //🇫🇷 Désactivation du bouton si les champs sont vides/ (gb) disabling button if fields are empty
      setBackgroundColor("#59c09b");
    } else {
      setBtnDisable(false); //🇫🇷 Activation du bouton si les champs sont remplis/ (gb) enabling button if fields are filled
      setBackgroundColor("#59c09b");
    }
  });

  //🇫🇷 Gestion de la requête API de connexion
  //🇬🇧 Managing API request for login
  const requestLogin = async () => {
    setPressed(true); //🇫🇷 Activation du bouton/ (gb) enabling button
    if (!email || !password) {
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
        if (error.response && error.response.status === 400) {
          setErrormsg("Wrong format on Email and/or Password"); //🇫🇷 Message d'erreur si le format de l'email ou du mot de passe est incorrect/ (gb) error message if email or password format is incorrect
        } else if (error.response && error.response.status === 401) {
          setErrormsg("Wrong Email and/or Password");
        }
      }
    }
  };

  //test email
  const testEmail = async () => {
    //🇫🇷 Gestion de la requête API de connexion/ (gb) managing login API request
    try {
      const response = await axios.get(`${hostname}/api/v1/test-email`, {
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
      <Text style={styles.title}>{langue?.passwordscreen?.title}</Text>
      <View style={styles.center}>
        {/* <View style={styles.email}>
          <Fields
            text={login.email}
            state={email}
            setState={setEmail}//🇫🇷 Fonction qui permet de modifier la valeur de l'état email/ (gb) function that allows to modify email state value
            pressed={pressed}
            setPressed={setPressed}
          />
        </View> */}
        {!email &&
          emptyFields && ( //🇫🇷 Affichage du message d'erreur si les champs sont vides/ (gb) displaying error message if fields are empty
            <View style={styles.center}>
              <Text style={styles.error}>{emptyFields}</Text>
            </View>
          )}
        <View style={styles.password}>
          <Fields
            text={passwordscreen.password}
            state={password}
            setState={setPassword}
            pressed={pressed}
            setPressed={setPressed}
          />
        </View>
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
            {langue?.passwordscreen?.label_2}{" "}
            {/**fonction qui permet l'acceptation de linscription de lutilisateur/(gb) function that allows user registration acceptance*/}
            <Text style={styles.underline}>
              {langue?.passwordscreen?.label_3}
              {/**terms and conditions */}
            </Text>
            {langue?.passwordscreen?.label_4}
            {/*and the*/}
            <Text style={styles.underline}>
              {langue?.passwordscreen?.label_5}
              {/*privacy policy*/}
            </Text>
          </Text>
        </View>
      </View>
      {errorMsg && (
        <View style={styles.center}>
          <Text style={styles.error}>{errorMsg}</Text>
        </View>
      )}
      <View style={styles.btn}>
        <TouchableOpacity
          style={[ styles.testEmailBtn, {backgroundColor: backgroundColor}]}
          disabled={btnDisable} //🇫🇷 Désactivation du bouton si les champs sont vides/ (gb) disabling button if fields are empty
          onPress={() => {
            // setPressed(true);
            // requestLogin();
            testEmail();
          }}
        >
          <Text style={styles.btnText}>{langue?.passwordscreen?.button_1}</Text>
          {/*(EN) "button_1": "Login"  
          (FR) "button_1": "S'incrire"*/}
        </TouchableOpacity>
      </View>
      <View style={styles.centerBot}>
        <View style={[styles.bottomBoxTop, { marginBottom: 20 }]}>
          <Text style={styles.bottomText}>
            {langue?.passwordscreen?.label_6}
          </Text>
          {/*(EN) "label_6": "You don't have an account ?" 
          (FR) "label_6": "Vous n'avez pas de compte ?"*/}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Password"); //🇫🇷 Redirection vers la page d'inscription/ (gb) redirection to registration page
            }}
            style={styles.smallBtn} //(fr)bouton d'inscrption/ (gb) registration button
          >
            <Text style={styles.smallBtnText}>{langue?.login?.button_2}</Text>
            {/*(EN)"button_2": "Register"
            (FR) "button_2": "s'incrire" */}
          </TouchableOpacity>
        </View>
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
              }); //🇫🇷 Redirection vers la page de mot de passe oublié/ (gb) redirection to forgot password page
            }}
            style={[styles.smallBtn, { width: 150 }]}
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
export default LogInScreen;
