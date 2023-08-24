//🇫🇷 Page d'inscription (Figma Frame 4)
//🇬🇧 Register Page (Figma Frame 4)

import { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import styles from "./Styles/RegisterScreenCss";
import axios from "axios";
import Json from "../assets/json/en.json";
import Fields from "../components/Fields";
import en from "../assets/json/en.json";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { hostname } from "../../../mvp-reactnative/backendconnect/hostname.js";
import { useRoute } from "@react-navigation/native";

const RegisterScreen = ({
  route,
  navigation,
  setToken,
  setProfile,
  setUserProfile,
  setNumber,
  setRegisterMailCall,
  scr,
  //setRole,
  //rolesList
}) => {
  const routeemail = route.params.email;
  console.log(useRoute().params);
  const [email, setEmail] = useState(routeemail);
  const [password, setPassword] = useState("");
  const [passConfirm, setPassConfirm] = useState("");
  const [pressed, setPressed] = useState(false); //🇫🇷 Variable permettant de vérifier si le bouton a été pressé
  const [errorMsg, setErrorMsg] = useState(null); //🇫🇷 Variable permettant d'afficher les messages d'erreur
  const [emptyFields, setEmptyFields] = useState(null); //🇫🇷 Variable permettant d'afficher les messages d'erreur
  //🇫🇷 Vérifier les erreurs d'email et mot de passe dans le champ
  //🇬🇧 Checking email and password as you type
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorPassword, setErrorPassword] = useState(null);
  const [btnDisable, setBtnDisable] = useState(true); //🇫🇷 Variable permettant de désactiver le bouton
  const [backgroundColor, setBackgroundColor] = useState("");

  const { register } = scr;
  const langue = useSelector((state) => state.langue); //🇫🇷 Passsage de langue depuis reduceur🇫🇷
  //🇬🇧 Language passed from reducer

  //🇫🇷 Tester si le mail est bien là
  //🇬🇧 Checking existing e-mail
  /*const verifiedUser =
  rolesList && rolesList.find((role) => role.name === "user");*/

  /*const nonVerifiedUser =
  rolesList &&
  rolesList.find((role) => role.name === "user without confirmation");*/
  useEffect(() => {
    if (email == null || password == null || password.length < 8) {
      setBtnDisable(true);
      setBackgroundColor("grey");
    } else {
      setBtnDisable(false);
      setBackgroundColor("#59c09b");
    }
  });

  //🇫🇷 Envoi de la requête pour s'inscrire.
  //🇬🇧 Sending async request for signing up.
  const requestRegister = async () => {
    setProfile(null); //🇫🇷 On remet le profil à null pour éviter les bugs
    console.log("i'm here");

    let same = true;
    setErrorMsg(null); //🇫🇷 On remet le message d'erreur à null pour éviter les bugs
    {
      /*🇫🇷 Vérifier que l'email existe*/
    }
    {
      /*🇬🇧 Checking if email exists*/
    }
    if (email) {
      {
        /*🇫🇷 Vérifier le format de l'email*/
      }
      {
        /*🇬🇧 Checking email format*/
      }
      if (
        email.indexOf("@") === -1 || //🇫🇷 Vérifier que l'email contient bien un @
        email.split("@")[1].length < 4 || //🇫🇷 Vérifier que l'email contient bien un domaine
        email.split("@")[1].indexOf(".") === -1 || //🇫🇷 Vérifier que l'email contient bien un point
        email.split("@")[1].split(".")[1].length < 2 || //🇫🇷 Vérifier que l'email contient bien une extension
        email.split("@")[1].split(".")[1].length > 4 //🇫🇷 Vérifier que l'email contient bien une extension
      ) {
        setErrorEmail(langue?.register?.t2022_errMessEmail); //🇫🇷 Si l'email n'est pas valide, on affiche le message d'erreur
      }
    } else {
    }
    if (password) {
      //🇫🇷 Vérifier que le mot de passe existe
      try {
        const response = await axios.post(`${hostname}/api/v1/signup`, {
          email: email,
          password: password,
        });
        if (response) {
          //🇫🇷 Si la réponse est positive, on passe à la page de vérification du mail
          console.log("ffff", response.data, response.data.user.token);
          setNumber(1);
          //setRole(nonVerifiedUser);
          setToken(response.data.user.token);
          console.log(response.data.user);
        }
      } catch (error) {
        //🇫🇷 Si la réponse est négative, on affiche le message d'erreur
        if (error.response.status === 400) {
          console.log(error.response.data.error);
          setErrorMsg(error.response.data.error);
        } else if (error.response.status === 401) {
          setErrorMsg(error.response.data.error);
        }
      }
    }
  };
  return (
    <ScrollView style={styles.Register}>
      <View style={styles.password}>
        {/*🇫🇷 La variable register.password dans fr.json permet d'afficher "Mot de passe"*/}
        {/*🇬🇧 The en.json variable register.password displays "Password""*/}
        <Fields
          text={langue?.register?.password}
          icon={"locker"}
          state={password}
          setState={setPassword}
          pressed={pressed}
          setPressed={setPressed}
          errorPass={errorPassword}
        />
      </View>
      {!password && !errorPassword && (
        <View style={styles.center}>
          <Text style={styles.error}>{emptyFields}</Text>
        </View>
      )}
      <View style={styles.centerTerms}>
        <View style={styles.termsContainer}>
          {/*🇫🇷 register.label_1 : "En te connectant, tu acceptes les"*/}
          {/*🇬🇧 register.label_1 : "By logging in, you agree to the"*/}

          {/*🇫🇷 register.label_2 : "conditions générales d'utilisation"*/}
          {/*🇬🇧 register.label_2 : "terms and conditions"*/}

          {/*🇫🇷 register.label_3 : "et la*/}
          {/*🇬🇧 register.label_3 : "and the"*/}

          {/*🇫🇷 register.label_4 : "politique de confidentialité"*/}
          {/*🇬🇧 register.label_4 : "privacy policy"*/}
          <Text style={styles.terms}>
            {langue?.register?.label_1}
            <Text style={styles.underline}>{langue?.register?.label_2} </Text>
            {langue?.register?.label_3}
            <Text style={styles.underline}>{langue?.register?.label_4}</Text>
          </Text>
        </View>
      </View>
      <View style={styles.btn}>
        {errorMsg && (
          <View style={[styles.center, { marginBottom: 10 }]}>
            <Text style={styles.error}>{errorMsg}</Text>
          </View>
        )}
        <TouchableOpacity
          style={[styles.bigBtn, { backgroundColor: backgroundColor }]}
          disabled={btnDisable}
          onPress={() => {
            setPressed(true);
            requestRegister();
            setBtnDisable(true);
            //🇬🇧 Here we set the number to 1 to access the verificationMail screen by validating
            //🇫🇷 Nous avons mis le setNumber à 1 pour accéder à la vérification du Mail en cliquant sur s'enregistrer
            setNumber(1);
            //🇫🇷 Recupérer les informations du mail en les passant dans les props
            //🇬🇧 To keep the e-mail information by passing it into props
            setRegisterMailCall(email);
          }}
        >
          <Text style={styles.btnText}>
            {/*🇫🇷 La variable register.button_1 dans fr.json permet d'afficher "S'inscrire"*/}
            {/*🇬🇧 The en.json variable register.button_1 displays "Register"*/}
            {langue?.register?.button_1}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.centerBot}>
        <View style={styles.bottomBoxTop}>
          <Text style={styles.bottomText}>
            {/*🇫🇷 La variable register.label_6 dans fr.json permet d'afficher "Tu as oublié ton mot de passe ?"*/}
            {/*🇬🇧 The en.json variable register.label_6 displays "Forgot your password?"*/}
            {langue?.register?.label_6}
          </Text>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("LogIn", {
                MsgE: langue?.emailscreen?.update_tittle_reset,
              });
            }}
            style={styles.smallBtn}
          >
            <Text style={styles.smallBtnText}>
              {/*🇫🇷 La variable register.label_7 dans fr.json permet d'afficher "Mot de passe oublié""*/}
              {/*🇬🇧 The en.json variable register.label_7 displays "Forgotten password"*/}
              {langue?.register?.label_7}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;
