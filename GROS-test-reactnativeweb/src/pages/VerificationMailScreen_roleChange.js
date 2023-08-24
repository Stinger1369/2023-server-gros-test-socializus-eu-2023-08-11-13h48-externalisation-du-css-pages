//🇫🇷 Page de verification Mail (Figma Frame 6) - Pour vérifier son mail et avoir le rôle "User" 🇫🇷
//🇬🇧 Mail verification page (Figma Frame 6) - For check the mail and get the "user" role 🇬🇧

import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import styles from "./Styles/VerificationMailScreen_roleChangeCss";
import axios from "axios";
// import JSON from "../assets/json/it.json";
import { useRef, useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { hostname } from "../../../mvp-reactnative/backendconnect/hostname.js";
import { ReLoginDialog } from "../components/Dialogs.js";

const VerificationMailScreen_roleChange = ({ scr, user, rolesList }) => {
  //🇫🇷 Page de vérification du mail pour changer de rôle
  const navigation = useNavigation();
  const [langueScreenVerification, setLangueScreenVerification] = useState(scr); //🇫🇷 Variable permettant de changer la langue de la page
  const [reLoginDialogVisible, setReLoginDialogVisible] = useState(false);
  const { verificationCode } = langueScreenVerification; //passage de la langue choisie au VerificationMailScreen

  const verifiedUser =
    rolesList && rolesList.find((role) => role.name === "user");

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

  //🇫🇷 Fonction pour basculer la visibilité du modal de re-connexion
  //🇬🇧 Function to toggle the visibility of the re-login modal
  const displayReLoginModal = () => {
    setReLoginDialogVisible(!reLoginDialogVisible);
  };

  //🇫🇷 Fonction pour revenir à l'écran des activités
  //🇬🇧 Function to navigate back to the activities screen
  const backToActivitiesScreen = () => {
    navigation.pop();
  };

  //FR Cette requête API envoie le mail à l'utilisateur avec le code de vérification à 6 chiffres.
  //GB This API request sends a message to the user's email with the 6-digit verification code.
  const requestCode = async () => {
    await axios.post(`${hostname}/api/v1/sendcode`, {
      email: user.email,
      subject: verificationCode.subject,
      message: verificationCode.messageRoleChange,
    });
  };

  //🇫🇷 Envoie un code de vérification à l'email de l'utilisateur si le rôle de l'utilisateur est "utilisateur sans confirmation"
  //🇬🇧 Send a verification code to the user's email if the user role is "user without confirmation"
  useEffect(() => {
    user?.role.name[0] === "user without confirmation" && requestCode();
  }, []);

  //FR Cette requête API traite le code de vérification envoyé par l'utilisateur.
  //GB This API request checks the 6-digit verification code sent by the user.
  const checkMailForRole = async () => {
    let code = `${pin1}${pin2}${pin3}${pin4}${pin5}${pin6}`;
    try {
      const checkCodeResponse = await axios.post(
        `${hostname}/api/v1/checkcode`,
        {
          email: user.email,
          code: code,
        }
      );

      if (checkCodeResponse.data.result === "OK") {
        //🇫🇷 Si le code est correct, le rôle de l'utilisateur est changé en "utilisateur"
        console.log("Check ok, now changing the role");
        await axios.patch(`${hostname}/api/v1/user/role`, {
          emails: user.email,
          roleId: verifiedUser._id,
        });
      }
      displayReLoginModal();
    } catch (error) {
      //🇫🇷 Si le code est incorrect, un message d'erreur est affiché
      if (error.response.status === 402) {
        setError("Code incorrect or expired");
      } else if (error.response.status === 404) {
        setError("Email doesn't exist");
      } else {
        console.error(error);
      }
    }
  };

  return (
    <ScrollView style={styles.forgotPage}>
      <ReLoginDialog
        dialogVisible={reLoginDialogVisible}
        displayModal={displayReLoginModal}
        backToActivitiesScreen={backToActivitiesScreen}
        scr={scr}
      />
      <Text style={styles.title}>{verificationCode.title}</Text>
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
        {error && <Text style={{ color: "red", marginTop: 10 }}>{error}</Text>}
        <TouchableOpacity
          onPress={() => {
            setError(null);
            checkMailForRole();
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

export default VerificationMailScreen_roleChange;
