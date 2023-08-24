//🇫🇷 Page de verification Mail (Figma Frame 6)🇫🇷
//🇬🇧 Mail verification page (Figma Frame 6) 🇬🇧

import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import styles from "./Styles/VerificationMailScreenCss";
import axios from "axios";
// import JSON from "../assets/json/it.json";
import { useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { hostname } from "../../../mvp-reactnative/backendconnect/hostname.js";
const VerificationMailScreen = ({
  registerMailCall,
  setNumber,
  rolesList,
  skipWarning,
  scr,
}) => {
  const navigation = useNavigation();
  const [langueScreenVerification, setLangueScreenVerification] = useState(scr);
  const { verificationCode } = langueScreenVerification; //passage de la langue choisie au VerificationMailScreen

  const verifiedUser =
    rolesList && rolesList.find((role) => role.name === "user"); //🇫🇷 Variable permettant de vérifier si le rôle de l'utilisateur est "user"

  // Chiffres du code de vérification
  const pin1Ref = useRef(null);
  const pin2Ref = useRef(null);
  const pin3Ref = useRef(null);
  const pin4Ref = useRef(null);
  const pin5Ref = useRef(null);
  const pin6Ref = useRef(null);

  const [pin1, setPin1] = useState("");
  const [pin2, setPin2] = useState("");
  const [pin3, setPin3] = useState("");
  const [pin4, setPin4] = useState("");
  const [pin5, setPin5] = useState("");
  const [pin6, setPin6] = useState("");
  const [error, setError] = useState(null);

  //FR Cette requête API envoie le mail à l'utilisateur avec le code de vérification à 6 chiffres.
  //GB This API request sends a message to the user's email with the 6-digit verification code.
  const requestCode = async () => {
    await axios.post(`${hostname}/api/v1/sendcode`, {
      email: registerMailCall,
      subject: verificationCode.subject,
      message: verificationCode.message,
    });
  };

  //FR Cette requête API traite le code de vérification envoyé par l'utilisateur.
  //GB This API request checks the 6-digit verification code sent by the user.
  const requestPassword = async () => {
    console.log(pin1Ref + pin2Ref + pin3Ref + pin4Ref + pin5Ref + pin6Ref);
    let code = `${pin1}${pin2}${pin3}${pin4}${pin5}${pin6}`;
    try {
      const response = await axios.post(`${hostname}/api/v1/verify-email`, {
        email: registerMailCall,
        code: code,
      });
      if (response.data.result === "OK") {
        //changer la route
        setNumber(2);
        navigation.navigate("Step1", {
          email: registerMailCall,
          code: code,
          role: verifiedUser,
        });
      }
    } catch (error) {
      console.log(error.response);
      if (error.response.status === 400) {
        //🇫🇷 Si le code de vérification est incorrect, un message d'erreur s'affiche.
        setError(verificationCode.incorrectCode);
      } else if (error.response.status === 404) {
        setError(verificationCode.emailError); //🇫🇷 Si l'adresse mail est incorrecte, un message d'erreur s'affiche.
      }
    }
  };

  return (
    <ScrollView style={styles.forgotPage}>
      <Text style={styles.title}>{verificationCode.title}</Text>
      <View style={!skipWarning ? styles.container : styles.warningContainer}>
        {skipWarning ? (
          <Text style={styles.warningText}>
            {verificationCode.EmailConfirmation}
          </Text>
        ) : (
          <Text style={styles.text}>{verificationCode.label_1}</Text>
        )}

        {/* 
            GB "label_1": "Enter the verification code which you have received on your email" 
            FR "label_1":  "Entrez le code de vérification que vous avez reçu sur votre email"
        */}
      </View>
      {/*FR Les champs où le code de vérification envoyé dans le mail de l'utilisateur est à entrer.*/}
      {/*GB Input fields to enter verification code sent to user's mail*/}
      <View style={ styles.textInputView }>
        <TextInput
          ref={pin1Ref}
          style={styles.opt}
          keyboardType={"number-pad"}
          maxLength={1}
          onChangeText={(pin1) => {
            setPin1(pin1);
            if (pin1) {
              pin2Ref.current.focus();
            }
          }}
        />
        <TextInput
          ref={pin2Ref}
          style={styles.opt}
          keyboardType={"number-pad"}
          maxLength={1}
          onChangeText={(pin2) => {
            setPin2(pin2);
            if (pin2) {
              pin3Ref.current.focus();
            } else {
              pin1Ref.current.focus();
            }
          }}
        />
        <TextInput
          ref={pin3Ref}
          style={styles.opt}
          keyboardType={"number-pad"}
          maxLength={1}
          onChangeText={(pin3) => {
            setPin3(pin3);
            if (pin3) {
              pin4Ref.current.focus();
            } else {
              pin2Ref.current.focus();
            }
          }}
        />
        <TextInput
          ref={pin4Ref}
          style={styles.opt}
          keyboardType={"number-pad"}
          maxLength={1}
          onChangeText={(pin4) => {
            setPin4(pin4);
            if (pin4) {
              pin5Ref.current.focus();
            } else {
              pin3Ref.current.focus();
            }
          }}
        />
        <TextInput
          ref={pin5Ref}
          style={styles.opt}
          keyboardType={"number-pad"}
          maxLength={1}
          onChangeText={(pin5) => {
            setPin5(pin5);
            if (pin5) {
              pin6Ref.current.focus();
            } else {
              pin4Ref.current.focus();
            }
          }}
        />
        <TextInput
          ref={pin6Ref}
          style={styles.opt}
          keyboardType={"number-pad"}
          maxLength={1}
          onChangeText={(pin6) => {
            setPin6(pin6);
            if (!pin6) {
              pin5Ref.current.focus();
            }
          }}
        />
      </View>
      <View style={styles.btnContainer}>
                   {error &&
              <Text style={error === verificationCode.incorrectCode ? styles.errorText : null}>
                {error}
              </Text>
            }
        <TouchableOpacity
          onPress={() => {
            setError(null);
            requestPassword();
            setNumber(2); //🇫🇷 Le SetNumber est à 2 pour accéder à la page de profil //🇬🇧 Number set to 2 to access the CreateProfileScreens
          }}
          style={styles.bigBtn}
        >
          <Text style={styles.btnText}>{verificationCode.button_1}</Text>
          {/* 
              GB "button_1": "Verify secret code" 
              FR  "button_1": "vérifier le code secret"
          */}
        </TouchableOpacity>

        <View style={ styles.verificationCodeView }>
          <Text
            style={[
              styles.text,
              { width: 250, textAlign: "center", marginBottom: 0 },
            ]}
          >
            {verificationCode.label_3}
          </Text>
          {/* 
              GB   "label_3": "Didn't receive the verification code ? ( please check your spam folder )" 
              FR   "label_3": "Vous n'avez pas reçu le code de vérification ? (veuillez vérifier votre dossier spam)"
          */}
        </View>
        <TouchableOpacity
          onPress={() => {
            requestCode();
          }}
          style={styles.smallBtn}
        >
          <Text style={styles.smallBtnText}>{verificationCode.button_2}</Text>
          {/*
              GB "button_2": "Resend secret code" 
              FR "button_2" : "Renvoyer le code secret"
          */}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default VerificationMailScreen;
