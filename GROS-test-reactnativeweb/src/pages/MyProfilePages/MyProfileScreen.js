//FR Page du profil utilisateur (Frame Figma 70)
//GB User profile screen (Figma Frame 70)

import {
  Text,
  ScrollView,
  Image,
  View,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
} from "react-native";
import styles from "../Styles/MyProfileScreenCss";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { hostname } from "../../../../mvp-reactnative/backendconnect/hostname.js";
import { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import Json from "../../assets/json/fr.json";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TopNavigation from "../../navigation/TopNavigation.js";
import { color } from "react-native-reanimated";
import Edit from "../../assets/images/Iconedit.svg";
import ProfileInfo from "./ProfileInfo.js";
import ProfileFriends from "./ProfileFriends.js";
import ProfileActivities from "./ProfileActivities.js";
import { Slider } from "@rneui/base";
import { ProgressBar } from "react-native-paper";
import { Bar } from "react-native-progress";
import AddFriend from "../../assets/profile/add-friend.svg";
import BlockFriend from "../../assets/profile/block-friend.svg";
import Chat from "../../assets/profile/chat.svg";
import Placeholder2 from "../../assets/images/placeholder2.svg";
import warning from "../../assets/images/warning.svg";
import { useWindowDimensions } from "react-native";
import ComingSoon from "../../assets/images/coming-soon.svg";
import React from "react";
import moment from "moment";
import usergirl from "../../assets/images/image_edit_profile/user-girl.svg";
import userguy from "../../assets/images/image_edit_profile/user-guy.svg";

import email from "../../assets/images/image_edit_profile/envelope.svg";
import phone from "../../assets/images/phone.svg";
import birthday from "../../assets/images/birthday.svg";
import users from "../../assets/images/image_edit_profile/avatar.svg";
import close from "../../assets/images/close.svg";
import ArrayRight from "../../assets/images/right-arrow.svg";
import lastName from "../../assets/images/image_edit_profile/textFrame.svg";
import leftArrow from "../../assets/images/left-arrow.svg";
import IntlPhoneInput from "react-native-intl-phone-input";
import { countriesListCircleFlags } from "../../assets/countriesListCircleFlags";
import { countriesListRectFlags } from "../../assets/countriesListRectFlags";
import DropDownPicker from "react-native-dropdown-picker";
import { Picker } from "@react-native-picker/picker";

const TopTab = createMaterialTopTabNavigator(); //
const Stack = createNativeStackNavigator(); //Stack permettant de switcher entre les pages informations, activités et friends de l'utilisateur

const MyProfileScreen = ({ user, scr }) => {
  const [age, setAge] = useState(""); //🇫🇷 Etat pour gerer l'age de l'utilisateur
  useEffect(() => {
    if (user.birthday) {
      const timestamp = user.birthday;
      const birthday = moment(timestamp);
      setAge(moment().diff(birthday, "years")); // function qui permet le calcule de l'age a partir du timestamp recuperé dans la base de données
    }
  });

  //Page du profil utilisateur (Frame Figma 70)
  const { height, width } = useWindowDimensions(); //🇫🇷 Etat pour gerer la taille de l'image de profil

  // Etat pour gerer le droit de éditer le profil, le token local est comparé avec le token des autres utilsateurs pour afficher le bouton edit profile
  const [userToken, setUserToken] = useState(null);

  //Variable de json permettant de rendre dynamique le texte front-end
  const { profile, editProfile } = scr;

  const navigation = useNavigation();

  const route = useRoute(); //🇫🇷 la recuperation de données utilisateur depuis middleNav pour afficher profil d'utilisateur dans une activité
  user = route.params.user; //🇬🇧 Retrieving user data from middleNav to display user profile in an activity

  const [imageSize, setImageSize] = useState(0);
  const [imageGenre, setImageGenre] = useState();

  useEffect(() => {
    //🇫🇷 useEffect pour obtenir token utilisateur et faire verification pour button edit profile
    //🇬🇧 useEffect to get user token and do verification for button edit profile
    Image.getSize(user.avatar, (width, height) => {
      setImageSize(360);
      if (user.sexe === "male") {
        setImageGenre(userguy); //🇫🇷 Condition pour afficher image homme ou femme
      } else {
        setImageGenre(usergirl);
      }
    });
    const fetchToken = async () => {
      //🇫🇷 Récupération des données utilisateur dans le storage
      const receivedUsertoken = await AsyncStorage.getItem("userToken");
      setUserToken(receivedUsertoken); //🇫🇷 Stockage du token utilisateur dans le state
    };
    fetchToken();
  }, []);

  // console.log("user data", user);
  const [city, setCity] = useState(" "); //🇫🇷 Etat pour gerer la ville de l'utilisateur
  useEffect(() => {
    if (user.city && user.city != "null") {
      let userCity = user.city.split(", ");
      setCity(
        userCity[0].charAt(0).toUpperCase() + userCity[0].slice(1).toLowerCase()
      );
    }
  }, []);
  console.log(user.token);
  console.log(userToken);
  //const canEdit = user.token === userToken;
  var canEdit;
  if (user.token) {
    if (user.token === userToken) {
      //🇫🇷 Condition pour afficher le bouton edit profile
      canEdit = true;
    } else {
      canEdit = false;
    }
  } else {
    canEdit = true;
  }
  console.log("canEdit", canEdit);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmPressed, setConfirmPressed] = useState(false);
  const [cancelPressed, setCancelPressed] = useState(false);
  const [addFriendModalVisible, setAddFriendModalVisible] = useState(false);
  const [emailPressed, setEmailPressed] = useState(false);
  const [lastNamePressed, setLastNamePressed] = useState(false);
  const [phonePressed, setPhonePressed] = useState(false);
  const [birthdayPressed, setBirthdayPressed] = useState(false);
  const [memberNumberPressed, setMemberNumberPressed] = useState(false);
  const [continuePressed, setContinuePressed] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [confirmEmailModalVisible, setConfirmEmailModalVisible] =
    useState(false);
  const [phoneModalVisible, setPhoneModalVisible] = useState(false);
  const [lastNameModalVisible, setLastNameModalVisible] = useState(false);
  const [birthdayModalVisible, setBirthdayModalVisible] = useState(false);
  const [memberNumberModalVisible, setMemberNumberModalVisible] =
    useState(false);
  const [selectedCountry, setSelectedCountry] = useState("FR");
  const [countryCode, setCountryCode] = useState("+33");
  const [phoneNumber, setPhoneNumber] = useState("");

  const onCountryChange = (countryObj) => {
    setSelectedCountry(countryObj.bigram);
    // add the code for country dial code
    setCountryCode(countryObj.dialCode);
  };

  // const CustomIntlPhoneInput = ({
  //   defaultCountry,
  //   onChangeText,
  //   placeholder,
  // }) => {
  //   const selectedCountry = countriesListRectFlags.find(
  //     (country) => country.bigram === defaultCountry
  //   );

  //   return (
  //     <View style={styles.phoneInputContainer}>
  //       <View style={styles.flagContainer}>{selectedCountry.flag}</View>
  //       <TextInput
  //         style={styles.phoneInput}
  //         onChangeText={onChangeText}
  //         placeholder={placeholder}
  //       />
  //     </View>
  //   );
  // };

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <View style={{ height: imageSize, position: "relative" }}>
          <Image
            source={
              user.avatar ===
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                ? imageGenre
                : user.avatar
            }
            style={styles.profilePhoto}
          />
          {canEdit && (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Edit Profile");
              }}
              style={styles.editBtn}
            >
              <Image
                source={Edit}
                style={ styles.editImg }
              />
              <Text style={styles.editBtnText}>{editProfile.title}</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.actionProfile}>
          {/* 🇫🇷  Ci-dessous , element pour voir si l'utilisateur a été organisateur et sa fiabilité (reliability)*/}
          {/* 🇬🇧 Below, element to see if the user was an organizer and its reliability (reliability)*/}
          {/* <View style={styles.headerRow}>
            <View>
              <Text style={styles.text}>Organizer : never</Text>
            </View>
            <View style={styles.hRow2}>
              <Text style={styles.text}>Reliability : </Text>
              <View style={{ height: 10 }}>
                <Bar
                  style={{ marginTop: 6 }}
                  progress={0.8}
                  color="green"
                  height={12}
                  unfilledColor="red"
                  borderWidth={0}
                />
              </View>
            </View>
          </View> */}
          {/*🇫🇷 Points Container , pour mettre en place system de points*/}
          {/*🇬🇧 Points Container , pour put in on system points*/}
          {/* <View style={styles.pointsContainer}>
            <View>
              <View style={styles.medalCtn}>insert image</View>
              <Text style={styles.userPoint}>9000 {profile.points}</Text>
            </View>
          </View> */}

          <View style={styles.infoText}>
            <Text style={styles.userPseudo}>{user.firstName}</Text>
            {/*🇫🇷 La variable profile.years dans fr.json permet d'afficher "ans", il manque envoyer depuis backend l'age de l'utilisateur*/}
            {/*🇬🇧 The en.json variable profile.yearsl displays "years", it misses send from backend the age of the user*/}
            {age && (
              <Text style={styles.userAge}>
                {age} {profile.years}
              </Text>
            )}
            {/* {age === null || isNaN(age) || age === 0 ? null : (
              <Text style={styles.userAge}>
                {age} {profile.years}
              </Text>
            )} */}
            {/*🇫🇷 La variable profile.usercity dans fr.json permet d'afficher la ville de residence utilisateur,elle est modifie avec de methodes pour le mettre en bon format*/}
            {/*🇬🇧 The variable profile.usercity in en.json allows to display the user's city of residence, it is modified with methods to put it in the right format*/}
            <View style={{ flexDirection: "row" }}>
              <Image
                source={Placeholder2}
                style={ styles.placeHolderImg }
              />
              <Text style={styles.userPoint}>{city}</Text>
              {/*🇫🇷 La variable profile.points dans fr.json permet d'afficher "points", pour le sisteme de qualification de l'aplication*/}
              {/*🇬🇧 The en.json variable profile.points displays "points" , for the system qualification app*/}
            </View>
          </View>
          {/*🇫🇷 IMAGE COMMING SOONr*/}
          {/* <View style={{ flex: 1, marginTop: 25, marginHorizontal: 15 }}>
          <img src={ComingSoon} alt="" width="90%" height="auto" />
          </View> */}
          {/*🇫🇷 BARRE D'OUTILS POUR AJOUTER-BLOQUER-CHAT: A voir si on l'utilise pour version webview*/}
          {!canEdit && (
            <View style={styles.btnContainer}>
              {/*---------------------------🇫🇷 Bouton pour ajouter un utilisateur en ami ------------------------------*/}
              {/* <TouchableOpacity
                style={styles.addFriend}
                onPress={() => setAddFriendModalVisible(true)}> */}
              {/**Bouton permettant d'ajouter un utilisateur en ami **/}
              {/*🇫🇷 La variable profile.addFriend dans fr.json permet d'afficher "Ajouter comme ami"*/}
              {/*🇬🇧 The en.json variable profile.addFriend displays "add friends"*/}
              {/* <img src={AddFriend} />
                <Text
                  style={{
                    paddingLeft: 5,
                    display: width > 350 ? "flex" : "none",
                  }}>
                  {profile.addFriend}
                </Text>
              </TouchableOpacity> */}
              <Modal
                animationType="slide"
                transparent={true}
                visible={addFriendModalVisible}
                onRequestClose={() => {
                  setAddFriendModalVisible(!addFriendModalVisible);
                }}
              >
                <View style={styles.modalContainerAddFreind}>
                  <View style={[styles.addFriendModalBox, styles.modalAddUser]}>
                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={() => setAddFriendModalVisible(false)}
                    >
                      <Image source={close} style={styles.closeIcon} />
                    </TouchableOpacity>
                    <Text
                      style={[
                        styles.addFriendModalText,
                        { textAlign: "center" },
                      ]}
                    >
                      Choose What you know about this friend to confirm
                      friendship
                    </Text>
                    <View
                      style={[
                        styles.addFriendButtonContainer,
                        { alignItems: "center" },
                      ]}
                    >
                      <View style={styles.buttonRow}>
                        <TouchableOpacity
                          style={[
                            styles.addFriendButton,
                            emailPressed && styles.buttonPressed,
                          ]}
                          onPress={() => {
                            setEmailPressed(true);
                            setLastNamePressed(false);
                            setPhonePressed(false);
                            setBirthdayPressed(false);
                            setMemberNumberPressed(false);
                            setButtonPressed(true);
                            //setConfirmEmailModalVisible(true);
                          }}
                        >
                          <View style={styles.iconWrapper}>
                            <Image
                              source={email}
                              style={styles.addFriendButtonIcon}
                            />
                          </View>
                          <Text
                            style={[
                              styles.addFriendButtonText,
                              emailPressed && styles.buttonTextPressed,
                            ]}
                          >
                            Email
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            styles.addFriendButton,
                            phonePressed && styles.buttonPressed,
                          ]}
                          onPress={() => {
                            setPhonePressed(true);
                            setEmailPressed(false);
                            setLastNamePressed(false);
                            setBirthdayPressed(false);
                            setMemberNumberPressed(false);
                            setButtonPressed(true);
                          }}
                        >
                          <View style={styles.iconWrapper}>
                            <Image
                              source={phone}
                              style={styles.addFriendButtonIcon}
                            />
                          </View>
                          <Text
                            style={[
                              styles.addFriendButtonText,
                              phonePressed && styles.buttonTextPressed,
                            ]}
                          >
                            Phone
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            styles.addFriendButton,
                            lastNamePressed && styles.buttonPressed,
                          ]}
                          onPress={() => {
                            setLastNamePressed(true);
                            setEmailPressed(false);
                            setPhonePressed(false);
                            setBirthdayPressed(false);
                            setMemberNumberPressed(false);
                            setButtonPressed(true);
                          }}
                        >
                          <View style={styles.iconWrapper}>
                            <Image
                              source={lastName}
                              style={styles.addFriendButtonIcon}
                            />
                          </View>
                          <Text
                            style={[
                              styles.addFriendButtonText,
                              lastNamePressed && styles.buttonTextPressed,
                            ]}
                          >
                            Last Name
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.buttonRow}>
                        <TouchableOpacity
                          style={[
                            styles.addFriendButton,
                            birthdayPressed && styles.buttonPressed,
                          ]}
                          onPress={() => {
                            setBirthdayPressed(true);
                            setEmailPressed(false);
                            setLastNamePressed(false);
                            setPhonePressed(false);
                            setMemberNumberPressed(false);
                            setButtonPressed(true);
                          }}
                        >
                          <View style={styles.iconWrapper}>
                            <Image
                              source={birthday}
                              style={styles.addFriendButtonIcon}
                            />
                          </View>
                          <Text
                            style={[
                              styles.addFriendButtonText,
                              birthdayPressed && styles.buttonTextPressed,
                            ]}
                          >
                            Birthday
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            styles.addFriendButton,
                            memberNumberPressed && styles.buttonPressed,
                          ]}
                          onPress={() => {
                            setMemberNumberPressed(true);
                            setLastNamePressed(false);
                            setEmailPressed(false);
                            setPhonePressed(false);
                            setBirthdayPressed(false);
                            setButtonPressed(true);
                          }}
                        >
                          <View style={styles.iconWrapper}>
                            <Image
                              source={users}
                              style={styles.addFriendMemberButtonIcon}
                            />
                          </View>
                          <Text
                            style={[
                              styles.addFriendMemberText,
                              memberNumberPressed && styles.buttonTextPressed,
                            ]}
                          >
                            Member Number
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={{ margin: 10 }}></View>
                    <View style={ styles.continueBtnView }>
                      {/*--------------------------- Booutton Continuer ------------------------ */}
                      <TouchableOpacity
                        style={[
                          styles.continueButton,
                          continuePressed && styles.buttonPressed,
                          !buttonPressed && styles.buttonDisabled,
                        ]}
                        onPressIn={() => {
                          if (buttonPressed) {
                            setContinuePressed(true);
                          }
                        }}
                        onPressOut={() => {
                          if (buttonPressed) {
                            setContinuePressed(false);
                            setEmailPressed(false);
                            setLastNamePressed(false);
                            setPhonePressed(false);
                            setBirthdayPressed(false);
                            setMemberNumberPressed(false);
                            setButtonPressed(false);
                            if (emailPressed) {
                              setConfirmEmailModalVisible(true); // Ouvrir le deuxième modal
                              setAddFriendModalVisible(false); // Fermer le premier modal
                            } else if (phonePressed) {
                              setPhoneModalVisible(true); // Ouvrir le modal du téléphone
                              setAddFriendModalVisible(false); // Fermer le premier modal
                            } else if (lastNamePressed) {
                              setLastNameModalVisible(true); // Ouvrir le modal du nom de famille
                              setAddFriendModalVisible(false); // Fermer le premier modal
                            } else if (birthdayPressed) {
                              setBirthdayModalVisible(true); // Ouvrir le modal de la date de naissance
                              setAddFriendModalVisible(false); // Fermer le premier modal
                            } else if (memberNumberPressed) {
                              setMemberNumberModalVisible(true); // Ouvrir le modal du numéro de membre
                              setAddFriendModalVisible(false); // Fermer le premier modal
                            } else {
                              setAddFriendModalVisible(false); // Fermer le premier modal
                            }
                          }
                        }}
                      >
                        <View style={ styles.addFriendView }>
                          <Text
                            style={[
                              styles.addFriendButtonText,
                              continuePressed && styles.buttonTextPressed,
                            ]}
                          >
                            Continue
                          </Text>
                          <Image
                            source={ArrayRight}
                            style={styles.addFriendButtonIcon}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
              <Modal
                animationType="slide"
                transparent={true}
                visible={confirmEmailModalVisible}
                onRequestClose={() => {
                  setConfirmEmailModalVisible(false);
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.confirmEmailModalContainer}>
                    <TouchableOpacity
                      style={styles.backButtonWrapper}
                      onPress={() => {
                        setConfirmEmailModalVisible(false);
                        setAddFriendModalVisible(true);
                      }}
                    >
                      <Image source={leftArrow} style={styles.leftArrowIcon} />
                    </TouchableOpacity>
                    <View style={styles.iconWrapper}>
                      <Image
                        source={email}
                        style={styles.addFriendButtonIcon}
                      />
                    </View>
                    <Text style={styles.confirmEmailModalText}>
                      Enter your friend's email address to confirm your
                      friendship
                    </Text>
                    <TextInput
                      style={styles.emailInput}
                      placeholder="Email address"
                      placeholderTextColor="gray"
                      // Ajoutez ici les autres propriétés pour gérer la valeur du champ de saisie
                    />
                    <TouchableOpacity
                      style={styles.confirmEmailButton}
                      onPress={() => {
                        // Ajoutez ici le traitement pour confirmer l'e-mail
                        setConfirmEmailModalVisible(false); // Ferme le modal de l'e-mail
                        setModalVisible(false); // Ferme le premier modal
                      }}
                    >
                      <Text style={styles.confirmEmailButtonText}>Confirm</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
              <TouchableOpacity
                onPress={() => setPhoneModalVisible(true)}
              ></TouchableOpacity>
              <Modal
                animationType="slide"
                transparent={true}
                visible={phoneModalVisible}
                onRequestClose={() => {
                  setPhoneModalVisible(false);
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.confirmEmailModalContainer}>
                    <TouchableOpacity
                      style={styles.backButtonWrapper}
                      onPress={() => {
                        setPhoneModalVisible(false);
                        setAddFriendModalVisible(true);
                      }}
                    >
                      <Image source={leftArrow} style={styles.leftArrowIcon} />
                    </TouchableOpacity>
                    <View style={styles.iconWrapper}>
                      <Image
                        source={phone}
                        style={styles.addFriendButtonIcon}
                      />
                    </View>
                    <Text style={styles.confirmEmailModalText}>
                      Enter your friend's phone number to confirm your
                      friendship
                    </Text>

                    <View style={styles.phoneInputContainer}>
                      <IntlPhoneInput
                        containerStyle={styles.phoneInput}
                        onChangeText={(number) => {
                          setPhoneNumber(number);
                        }}
                        defaultCountry="FR"
                        placeholder="Enter Phone Number"
                        flagStyle={styles.countryFlag}
                        textComponent={({ value }) => (
                          <View style={styles.countryTextContainer}>
                            <Text style={styles.countryText}>{value}</Text>
                          </View>
                        )}
                      />
                    </View>
                  </View>
                </View>
              </Modal>
              {/* <Modal
                animationType="slide"
                transparent={true}
                visible={phoneModalVisible}
                onRequestClose={() => {
                  setPhoneModalVisible(false);
                }}>
                <View style={styles.centeredView}>
                  <View style={styles.confirmEmailModalContainer}>
                    <TouchableOpacity
                      style={styles.backButtonWrapper}
                      onPress={() => {
                        setPhoneModalVisible(false);
                      }}>
                      <Image source={leftArrow} style={styles.leftArrowIcon} />
                    </TouchableOpacity>
                    <View style={styles.iconWrapper}>
                      <Image
                        source={phone}
                        style={styles.addFriendButtonIcon}
                      />
                    </View>
                    <Text style={styles.confirmEmailModalText}>
                      Enter your friend's phone number to confirm your
                      friendship
                    </Text>

                    <View style={styles.phoneInputContainer}>
                      <View style={styles.flagContainer}>
                        <FlatList
                          data={countriesListCircleFlags}
                          renderItem={({ item }) => (
                            <TouchableOpacity
                              onPress={() => onCountryChange(item)}>
                              <View style={styles.listItemContainer}>
                                <Image
                                  source={item.flag}
                                  style={[
                                    styles.flagImage,
                                    { width: 30, height: 30 },
                                  ]}
                                />
                                <Text style={styles.listItemText}>
                                  {item.language}
                                </Text>
                              </View>
                            </TouchableOpacity>
                          )}
                          keyExtractor={(item) => item.bigram}
                        />
                      </View>
                      <TextInput
                        style={styles.phoneInput}
                        onChangeText={(number) => {
                          setPhoneNumber(countryCode + number);
                        }}
                        placeholder="Enter Phone Number"
                      />
                    </View>
                  </View>
                </View>
              </Modal> */}
              <Modal
                animationType="slide"
                transparent={true}
                visible={lastNameModalVisible}
                onRequestClose={() => {
                  setLastNameModalVisible(false);
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.confirmEmailModalContainer}>
                    <TouchableOpacity
                      style={styles.backButtonWrapper}
                      onPress={() => {
                        setLastNameModalVisible(false);
                        setAddFriendModalVisible(true);
                      }}
                    >
                      <Image source={leftArrow} style={styles.leftArrowIcon} />
                    </TouchableOpacity>
                    {/* Contenu du modal du nom de famille */}
                  </View>
                </View>
              </Modal>

              <Modal
                animationType="slide"
                transparent={true}
                visible={birthdayModalVisible}
                onRequestClose={() => {
                  setBirthdayModalVisible(false);
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.confirmEmailModalContainer}>
                    <TouchableOpacity
                      style={styles.backButtonWrapper}
                      onPress={() => {
                        setBirthdayModalVisible(false);
                        setAddFriendModalVisible(true);
                      }}
                    >
                      <Image source={leftArrow} style={styles.leftArrowIcon} />
                    </TouchableOpacity>
                    {/* Contenu du modal de la date de naissance */}
                  </View>
                </View>
              </Modal>

              <Modal
                animationType="slide"
                transparent={true}
                visible={memberNumberModalVisible}
                onRequestClose={() => {
                  setMemberNumberModalVisible(false);
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.confirmEmailModalContainer}>
                    <TouchableOpacity
                      style={styles.backButtonWrapper}
                      onPress={() => {
                        setMemberNumberModalVisible(false);
                        setAddFriendModalVisible(true);
                      }}
                    >
                      <Image source={leftArrow} style={styles.leftArrowIcon} />
                    </TouchableOpacity>
                    {/* Contenu du modal du numéro de membre */}
                  </View>
                </View>
              </Modal>
              {/*---------------------------🇫🇷 Bouton pour tchat------------------------- ------------------------------*/}
              {/*🇫🇷 La variable profile.chatdans fr.json permet d'afficher "Chat"*/}
              {/*🇬🇧 The en.json variable profile.chat displays "Chat"*/}
              {/* <TouchableOpacity style={styles.chat}>
                <img src={Chat} />
                <Text
                  style={{
                    paddingLeft: 5,
                    display: width > 350 ? "flex" : "none",
                  }}>
                  {profile.chat}
                </Text>
              </TouchableOpacity> */}
              {/*🇫🇷 La variable profile.block}dans fr.json permet d'afficher "Bloquer"*/}
              {/*🇬🇧 The en.json variable profile.block} displays "Block"*/}

              {/*---------------------------🇫🇷 Bouton pour Bloquer ------------------------------*/}
              {/* <TouchableOpacity
                style={styles.block}
                onPress={() => setModalVisible(true)}>
                <img src={BlockFriend} />
                <Text
                  style={{
                    paddingLeft: 5,
                    display: width > 350 ? "flex" : "none",
                  }}>
                  {profile.block}
                </Text>
              </TouchableOpacity> */}

              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <View style={styles.modalContainer}>
                  <View style={styles.popupBox}>
                    <Image source={warning} style={styles.modalImage} />
                    <Text style={styles.modalText}>
                      If you continue, this user will not be able to see you as
                      an attendee or to see your activities.
                    </Text>
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity
                        style={[
                          styles.confirmButton,
                          confirmPressed && styles.buttonPressed,
                        ]}
                        onPressIn={() => setConfirmPressed(true)}
                        onPressOut={() => {
                          setConfirmPressed(false);
                          // Ajoutez ici la logique pour bloquer l'utilisateur
                          setModalVisible(false);
                        }}
                      >
                        <Text
                          style={[
                            styles.buttonText,
                            confirmPressed && styles.buttonTextPressed,
                          ]}
                        >
                          Confirm
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          styles.cancelButton,
                          cancelPressed && styles.buttonPressed,
                        ]}
                        onPressIn={() => setCancelPressed(true)}
                        onPressOut={() => {
                          setCancelPressed(false);
                          setModalVisible(false);
                        }}
                      >
                        <Text
                          style={[
                            styles.buttonText,
                            cancelPressed && styles.buttonTextPressed,
                          ]}
                        >
                          Cancel
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          )}
        </View>

        {/*🇫🇷 menu de navigation crée pour switcher entre les pages information, activités et friends de l'utilisateur*/}
        {/*🇬🇧 navigation menu created to switch between the user's information, activities and friends pages*/}
        {/*🇫🇷 les functionalités activites et reseau sont en off pour l'instant*/}
        {/*🇬🇧 the activities and network function are off for now*/}
        <TopNavigation
          arg={[
            //🇫🇷 c'est le menu de navigation qui permet de switcher entre les pages information, activités et friends de l'utilisateur*/}
            {
              link: profile.info,
              to: (props) => (
                <ProfileInfo {...props} user={user} scr={scr} city={city} />
              ),
            },
            //c'est le menu de navigation qui permet de switcher entre les pages information, activités et Network de l'utilisateur*/}
            // {
            //   link: profile.activities,
            //   to: (props) => <ProfileActivities {...props} />,
            // },
            // //c'est le menu de navigation qui permet de switcher entre les pages information, activités et Network de l'utilisateur*/}
            // {
            //   link: profile.network,
            //   to: (props) => <ProfileFriends {...props} />,
            // },
          ]}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

export default MyProfileScreen;
