import React from "react";
// import du provider et de configureStore
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
//----------------//
import { NavigationContainer, useNavigation } from "@react-navigation/native"; // (fr) page de navigation // (en) navigation page
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState, useEffect } from "react"; // (fr) page d'etat // (en) state page
import { Button } from "react-native"; // (fr) bouton // (en) button
import AsyncStorage from "@react-native-async-storage/async-storage"; // (fr) stockage asynchrone // (en) asynchronous storage
import axios from "axios"; // (fr) axios // (en) axios
import { LogBox } from "react-native"; // (fr) boite de log // (en) log box

const Stack = createNativeStackNavigator(); // (fr) pile de navigation // (en) navigation stack

import HomeScreen from "./pages/HomeScreen"; // (fr) page d'accueil//  (en) home page
import EmailScreen from "./pages/EmailScreen"; // (fr) page de connexion // (en) login page
import RegisterScreen from "./pages/RegisterScreen"; // (fr) page denregistrement // (en) register page
import PasswordScreen from "./pages/PasswordScreen";

import CreateProfileScreen from "./pages/CreateProfileScreen"; // (fr) page de creation de  profil // (en) create profile page
import EditProfileScreen from "./pages/EditProfileScreen"; // (fr) page d'edition de profil // (en) edit profil page
import CreateActivityScreen from "./pages/CreateActivityScreen"; // (fr) page de creation d'activité // (en) create activity page
import ActivityScreen from "./pages/ActivityScreen"; // (fr) pâge de l'activite // (en) activity page
import MemberScreen from "./pages/MemberScreen"; // (fr) page des membres // (en) members page
import MembersScreen from "./pages/MembersScreen"; // (fr) page des membres // (en) members page

import CreateProfileScreenStepTwo from "./pages/CreateProfileScreenStepTwo"; // (fr) page de creation de profil 2eme etape // (en) create profile page step two
import CreateProfileScreenStepThree from "./pages/CreateProfileScreenStepThree"; // 'fr) page de creation de profil 3eme etape // (en) create profile page step three
import CreateProfileScreenStepFour from "./pages/CreateProfileScreenStepFour"; // (fr) page de creation de profil 4eme etape // (en) create profile page step four
import VerificationScreen from "./pages/VerificationScreen"; // (🇫🇷) Page de verification après le login d'enregistrement (🇫🇷)// 🇬🇧 Verification page after the login enregistry🇬🇧
import VerificationMailScreen from "./pages/VerificationMailScreen"; //(fr) page de Verication de mail// (en) verification mail page
import VerificationMailScreen_roleChange from "./pages/VerificationMailScreen_roleChange";
import VerifyIdentity from "./pages/VerifyIdentity";

import BottomNavigation from "./Navigation/BottomNavigation"; //(fr) bouton de la barre de navigation // (en) navigation button
import TopNavigation from "./Navigation/TopNavigation"; // (fr) barre de navigation du bas // (en) button top navigation
import HeaderRight from "./components/headerRight"; // (fr) composant de la barre de navigation du haut // (en) top navigation component
import HeaderRightProfile from "./components/headerRightProfile"; // (fr) composant de lentete de la page profil // (en) profile page header component
import navigationInfo from "./Navigation/navigationInfo"; // (fr) navigation de la page information // (en) information page navigation
import navigationBis from "./Navigation/navInfoBis"; // (fr) navigation de la page information bis // (en) information page navigation bis
import Burger from "./components/Burger"; // (fr) composant du burger // (en) burger component
import DrawerNavigation from "./Navigation/DrawerNavigation"; // (fr) navigation du burger // (en) burger navigation
import ConceptScreen from "./pages/ConceptScreen1"; //  Ce composant utilisé pour afficher du contenu lié a la page concept // (en) This component is used to display content related to the first specific concept in the concept page
import ConceptScreen2 from "./pages/ConceptScreen2"; // Ce composant utilisé pour afficher du contenu lié a la page concept 2 // (en) This component is used to display content related to the second specific concept in the concept page
import ConceptScreen3 from "./pages/ConceptScreen3"; // Ce composant utilisé pour afficher du contenu lié a la page concept 3 // (en) This component is used to display content related to the third specific concept in the concept page
import MyProfileScreen from "./pages/MyProfileScreen"; // (fr) page de mon  // (en) my profile page
import MyActivitiesScreen from "./pages/MyActivitiesScreen"; // (fr) page de mes activités // (en) my activities page
import News from "./pages/News"; // (fr) page de mes nouvelles activités // (en) my news page
import ContactScreen from "./pages/ContactScreen"; // (fr) page de contact // (en) contact page
import FilterScreen from "./pages/FilterScreen"; // (fr) page de filtre // (en) filter page
import QrCodeScreen from "./pages/QrCodeScreen"; // (fr) page de code qr // (en) qr code page
import QrNav from "./Navigation/QrNav"; // (fr) navigation de la page code qr // (en) qr code page navigation
import QrScanScreen from "./pages/QrScanScreen"; // (fr) page de scan du code qr // (en) qr scan page
import MiddleTab from "./Navigation/MiddleTab"; // (fr) navigation du milieu // (en) middle navigation
import ProfileInfo from "./pages/ProfileInfo"; // (fr) page d'information du profil // (en) profile information page
import ProfileActivities from "./pages/ProfileActivities"; //(fr) page d'activité du profil // (en) profile activities page
import ProfileFriends from "./pages/ProfileFriends"; // (fr) page d'amis du profil // (en) profile friends page
import ActivitiesScreen from "./pages/ActivitiesScreen"; // (fr) page d'activités // (en) activities page
import ProfileNav from "./Navigation/ProfileNav"; // (fr) navigation de la page profil // (en) profile page navigation
import CustomProfileScreen from "./pages/CustomProfileScreen"; // (fr) page de profil personnalisé // (en) custom profile page
import InviteFriends from "./pages/InviteFriendsScreen"; // (fr) page d'invitation d'amis // (en) invite friends page
import SettingsScreen from "./pages/SettingsScreen"; // (fr) page de paramètres // (en) settings page
import PrivateChatScreen from "./pages/PrivateChatScreen"; // (fr) page de chat privé // (en) private chat page
import navigation from "./Navigation/navigationInfo"; // (fr) navigation de la page information // (en) information page navigation
import reducers from "./reducers"; // (fr) reducteurs // (en) reducers
import Update from "./pages/Update";
import Json from "./assets/json/fr.json";
import { TouchableOpacity } from "react-native-gesture-handler";
import SkipButton from "./assets/images/next-white.svg";
import { TouchableHighlight } from "react-native";
import { hostname } from "./backendconnect/hostname";
const store = configureStore({
  reducer: reducers,
});

export default function App() {
  const [userToken, setUserToken] = useState(null);
  const [switch1, setSwitch1] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [user, setUser] = useState({});

  ///////////////////////////////////////////////////////////////////////////////////
  //🇫🇷 Supression de storage,(token ,user etc), si besoin ,pour developpement, activer/desactiver s'il a de bug dans l'app
  //🇬🇧 Storage clear (token ,user , etc), needed for developping, activer/desactiver if the app is freeze

  // const clearAllData = () => {
  //   AsyncStorage.getAllKeys()
  //     .then((keys) => AsyncStorage.multiRemove(keys))
  //     .then(() => alert("storage cleared with success"));
  // };

  // useEffect(() => {
  //   clearAllData();
  // }, []);

  //////////////////////////////////////////////////////////////////////////////////////////
  const [sostLanguage, setSostLanguage] = useState("English");
  useEffect(() => {
    if (user) {
      if (user.nativeLanguage) {
        setSostLanguage(user.nativeLanguage);
      }
    }
  }, [user]);

  //Create Profile State
  const [gender, setGender] = useState(null);
  const [accountType, setAccountType] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [nickName, setNickName] = useState(null);
  const [city, setCity] = useState(null);
  const [nativeLanguage, setLanguage] = useState(null);
  //const [language, setLanguage] = useState(null);
  const [role, setRole] = useState(null);
  const [flags, setFlags] = useState(null);
  const [userNativeLanguage, setUserNativeLanguage] = useState(null);

  //le number on le changera, la variable number va permettre d'appeler le screen verifemail et passer sur create profiles
  const [number, setNumber] = useState(0);
  //le registerMailCall va permettre de recuperer l'email du register et pour l'utiliser dans le verif screen
  const [registerMailCall, setRegisterMailCall] = useState();
  const [cardMode, setCardMode] = useState("small");

  const [rolesList, setRolesList] = useState(null);
  //Pour afficher le message de VerificationScreen
  const [skipWarning, displaySkipWarning] = useState(false);
  //test
  //const navigation =useNavigation()
  //console.log('navigation is :',navigation)
  //end test
  const profileState = {
    // (fr) état du profil // (en) profile state
    gender,
    setGender,
    accountType,
    setAccountType,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    nickName,
    setNickName,
    city,
    setCity,
    nativeLanguage,
    setLanguage,
    role,
    setRole,
  };

  const switchBtn = () => {
    if (switch1 === false) {
      setSwitch1(true);
    } else if (switch1 === true) {
      setSwitch1(false);
    }
  };

  const setToken = async (token) => {
    //console.log("App.setToken = ", token);
    if (token) {
      await AsyncStorage.setItem("userToken", token);
    } else {
      await AsyncStorage.removeItem("userToken");
    }
    setUserToken(token);
  };

  const setProfile = async (profile) => {
    if (profile) {
      await AsyncStorage.setItem("userProfile", profile);
    } else {
      await AsyncStorage.removeItem("userProfile");
    }
    setUserProfile(profile);
  };
  //j'ai aussi envoyer ça sur burger

  useEffect(() => {
    const fetchToken = async () => {
      const receivedUserToken = await AsyncStorage.getItem("userToken");
      setUserToken(receivedUserToken);
    };
    fetchToken();
  }, []);

  useEffect(() => {
    AsyncStorage.getItem("user").then((suser) => {
      if (suser != "undefined") {
        setUser(JSON.parse(suser));
        //console.log("user pt", user, JSON.parse(suser));
        //console.log(suser);
      } else {
        // AsyncStorage.removeItem("suser");
        // setUser("rrrrrrrrrrr");
        // console.log(user);
      }
    });
  }, []);

  useEffect(() => {
    const fetchProfileStep = async () => {
      const getProfileStep = await AsyncStorage.getItem("userProfile");
      setUserProfile(getProfileStep);
    };
    fetchProfileStep();
  }, []);

  useEffect(() => {
    const getRoles = async () => {
      try {
        const response = await axios.get(`${hostname}/api/v1/get-roles/`);
        setRolesList(response.data);
      } catch (error) {
        //console.log(error.message);
      }
    };
    try {
      getRoles();
      //  console.log(rolesList);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const nonVerifiedUser =
    rolesList &&
    rolesList.find((role) => role.name === "user without confirmation");

  //passage de la langue selectionnée dans l'homescreen, aux children
  //////////////////////////////////////////////////////////////////////
  const [concept, setConcept] = useState("Concept"); ///
  const [scr, setScr] = useState(Json); ///
  const [scrEdit, setScrEdit] = useState(Json); ///
  const [title, setTitle] = useState("language not selected, check app.js");
  const [count, setCount] = useState(0);
  const [countEdit, setCountEdit] = useState(0);
  const [x, setX] = useState(Json);
  const [y, setY] = useState(Json);

  const [countPays, setCountPays] = useState(0); ////
  const [payscountry, setPayscountry] = useState("");
  //console.log(user);
  useEffect(() => {
    if (payscountry == "" || payscountry == "undefined") {
      setPayscountry(sostLanguage);
    } //en cas de bug le nome du pays envoye de default est english, "sostLanguage" est une constant state English
  });
  const pays = (pa) => {
    //function messanger envoyée à l'homescreen pour recuperer le nom du pays
    setCountPays(1);
    setPayscountry(pa.language);
  };
  console.log("payscountry", payscountry);

  // let paysC = "English"; //si y a un bug le nom de la langue de deafault et l'English
  const [paysC, setPaysC] = useState("English");
  useEffect(()=>{
    console.log("payscountryinUsEE", payscountry);
    const languagePaysC = async () => {
      try {
        if (countPays >= 1) {
          console.log("payscountryinUsEEinCount", payscountry);
          //garde en AsyncStorage le nome du pays choisi par l'user
          await AsyncStorage.setItem("Pays", JSON.stringify(payscountry));
          console.log("AsyncStorage.Pays", await AsyncStorage.getItem("Pays"))
        }
        if (await AsyncStorage.getItem("Pays") != null) {
          setPaysC(JSON.parse(await AsyncStorage.getItem("Pays"))); //props nom du pays envoyé a EdiProfilScreen
          console.log("paysCDedans", paysC);
        }
      } catch (error) {
        console.error(error);
      }
    };  
    languagePaysC()
  },[countPays,payscountry])
  console.log("paysCDehors", paysC);


  const increment = (gred) => {
    //function messeger entre homescreen et l'app permet de recuperer la langue selectionnée au demarrage de l'APP
    //// reverse data flow
    setCount(count + 1); /// avec l'homescreen
    setConcept(gred.emailscreen.title); //
    setScr(gred);
    console.log(gred);
    return scr, count;
  };

  const inc = (gre) => {
    //function messeger entre App et EditProfileScreen
    setScrEdit(gre);
    useEffect(() => {
      setCountEdit(countEdit + 1);
    }, [gre]);
    //console.log(gre);
     // Permet de recuperer la langue de l'app settée dans l'EditProfileScreen
    console.log("scrEdit", scrEdit);
    console.log("scr", scr);
    //console.log(countEdit);
  };

  //garde la langue selected en session
  useEffect(() => {
    const languageS = async () => {
      try {
        if (count >= 1) {
          console.log(scr);
          await AsyncStorage.setItem("keyy", JSON.stringify(scr));
        }       
        const storedValueX = await AsyncStorage.getItem("keyy");
        if (storedValueX !== null) {
          setX(JSON.parse(storedValueX));
        } else {
          setX(scr);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    languageS();
  }, [count, payscountry]);

  useEffect(() => {
    const languageSEdit = async () => {
      try {
        if (scrEdit && countEdit !== 0) {
          await AsyncStorage.setItem("keyyEdit", JSON.stringify(scrEdit));
          await AsyncStorage.setItem("keyy", JSON.stringify(scrEdit));
        }
        
        const storedValue = await AsyncStorage.getItem("keyyEdit");
        if (storedValue !== null && countEdit !== 0) {
          console.log("AsyncStorage.getItem", storedValue);
          const parsedValue = JSON.parse(storedValue);
          setY(parsedValue);
          setX(parsedValue);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    languageSEdit();
    console.log("yyyyyyyyyyyy", y);
    console.log("xxxxxEfffect", x);
  }, [scrEdit, countEdit]);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          {userToken === null ? (
            // sans token, l'utilisateur est invité a se connecter
            <>
              <Stack.Screen name="Home" options={{ headerShown: false }}>
                {(props) => (
                  <HomeScreen
                    {...props}
                    flags={flags}
                    onClick={increment}
                    pays={pays}
                    count={count}
                    setUserNativeLanguage={setUserNativeLanguage}
                  />
                )}
              </Stack.Screen>

              <Stack.Screen
                name="LogIn"
                options={{
                  title: title,
                  headerStyle: { backgroundColor: "#59C09B" },
                  headerTintColor: "#FFFFFF",
                  headerTitleStyle: { fontWeight: "bold", fontSize: 20 },
                }}
              >
                {(props) => (
                  <EmailScreen
                    {...props}
                    setToken={setToken}
                    setUser={setUser}
                  />
                )}
              </Stack.Screen>
              <Stack.Screen
                name="VerificationIdentity"
                options={{
                  title: "Verification",

                  headerShadowVisible: false,
                  headerStyle: { backgroundColor: "#59C09B" },
                }}
              >
                {() => (
                  <VerifyIdentity
                    setNumber={setNumber}
                    setToken={setToken}
                    setUser={setUser}
                    scr={x}
                  />
                )}
              </Stack.Screen>
              <Stack.Screen
                name="Register"
                options={{
                  title: x.passwordscreen.password,
                  headerShadowVisible: false,
                  headerStyle: { backgroundColor: "#59C09B" },
                  headerTintColor: "#FFFFFF",
                  headerTitleStyle: { fontWeight: "bold", fontSize: 20 },
                }}
              >
                {(props) => (
                  <RegisterScreen
                    {...props}
                    setToken={setToken}
                    setProfile={setProfile}
                    setUserProfile={setUserProfile}
                    setNumber={setNumber}
                    setRegisterMailCall={setRegisterMailCall}
                    scr={x}
                  />
                )}
              </Stack.Screen>
              <Stack.Screen
                name="Password"
                options={{
                  title: "Password",
                  headerShadowVisible: false,
                  headerStyle: { backgroundColor: "#59C09B" },
                  headerTintColor: "#FFFFFF",
                  headerTitleStyle: { fontWeight: "bold", fontSize: 20 },
                }}
              >
                {(props) => (
                  <PasswordScreen
                    {...props}
                    setToken={setToken}
                    navigation={navigator}
                    setUser={setUser}
                  />
                )}
              </Stack.Screen>
              <Stack.Screen
                name="Verification"
                options={{
                  title: "Verification",
                  headerShadowVisible: false,
                  headerStyle: { backgroundColor: "#59C09B" },
                }}
              >
                {() => (
                  <VerificationScreen
                    setNumber={setNumber}
                    scr={x} //scr?
                    rolesList={rolesList}
                  />
                )}
              </Stack.Screen>
            </>
          ) : number === 1 ? ( //  🇬🇧  The number here is set to 1 on the Register Screen and redirects you directly to VerificationMail  🇬🇧 🇫🇷 Le number est égal à 1 sur la page d'enregistrement car il redirige directement  sur la page de vérification 🇫🇷
            <>
              <Stack.Screen
                name="VerificationMail"
                options={{
                  title: x.verificationCode.title,
                  headerShadowVisible: false,
                  headerStyle: {
                    backgroundColor: "#59C09B",
                    color: "white",
                    marginRight: 10,
                  },
                  headerRight: () => {
                    const navigation = useNavigation();
                    return (
                      <TouchableHighlight
                        onPress={() => {
                          console.log("salut!!! ça marche??");
                          if (!skipWarning) {
                            displaySkipWarning(true);
                          } else {
                            setNumber(2);
                            setRole(nonVerifiedUser);
                            setTimeout(() => {
                              navigation.navigate("Step1", {
                                role: nonVerifiedUser,
                                nativeLanguage: userNativeLanguage,
                              });
                            }, 0);
                            displaySkipWarning(false);
                          }
                        }}
                        style={{ marginRight: 10, cursor: "pointer" }}
                      >
                        <SkipButton />
                      </TouchableHighlight>
                    );
                  },
                }}
              >
                {/* Le setTimeout dans le else au dessus est la seule entourloupe trouvée pour s'assurer que le number prenne la valeur de 2, condition nécessaire pour une navigation sans bug vers la page Step 1. Pour ce qui est de l'explication logique à ça...désolée, sur ce coup-là, je vais vous répondre "tais-toi, c'est magique"...si vous trouvez mieux, n'hésitez pas! */}
                {() => (
                  <VerificationMailScreen
                    registerMailCall={registerMailCall}
                    number={number}
                    setNumber={setNumber}
                    scr={x}
                    rolesList={rolesList}
                    setRole={setRole}
                    skipWarning={skipWarning}
                    displaySkipWarning={displaySkipWarning}
                  />
                )}
              </Stack.Screen>
            </>
          ) : userProfile !== "done" && number === 2 ? ( // 🇬🇧 The number here is set to 2 on the VerificationMail Screen and redirects you directly to the Create Profile Screens 🇬🇧  🇫🇷 le number est égal à 2  car sur la page de vérification du mail  il redigire directement sur la page de profil 🇫🇷
            <>
              <Stack.Screen
                name="Step1"
                options={{
                  title: x.createProfile.title,
                  headerStyle: { backgroundColor: "#59C09B" },
                }}
              >
                {(props) => (
                  <CreateProfileScreen
                    scr={x}
                    profileState={profileState}
                    userToken={userToken}
                    user={user}
                    setUser={setUser}
                    role={role}
                    userNativeLanguage={userNativeLanguage}
                    {...props}
                  />
                )}
              </Stack.Screen>
              <Stack.Screen
                name="Step2"
                options={{
                  title: x.createProfile.title,
                  headerStyle: { backgroundColor: "#59C09B" },
                }}
              >
                {(props) => (
                  <CreateProfileScreenStepTwo
                    flags={flags}
                    scr={x}
                    profileState={profileState}
                    userToken={userToken}
                    user={user}
                    setUser={setUser}
                    {...props}
                  />
                )}
              </Stack.Screen>
              <Stack.Screen
                name="Step3"
                options={{
                  title: x.createProfile.title,
                  headerStyle: { backgroundColor: "#59C09B" },
                }}
              >
                {(props) => (
                  <CreateProfileScreenStepThree
                    scr={x}
                    profileState={profileState}
                    userToken={userToken}
                    user={user}
                    setUser={setUser}
                    {...props}
                  />
                )}
              </Stack.Screen>
              <Stack.Screen
                name="Step4"
                options={{
                  title: x.createProfile.title,
                  headerStyle: { backgroundColor: "#59C09B" },
                }}
              >
                {(props) => (
                  <CreateProfileScreenStepFour
                    profileState={profileState}
                    setProfile={setProfile}
                    setUserProfile={setUserProfile}
                    userToken={userToken}
                    user={user}
                    setUser={setUser}
                    scr={x}
                    {...props}
                  />
                )}
              </Stack.Screen>
            </>
          ) : (
            // avec token, l'utilisateur peux acceder a la page des activitées et au reste de la navigation 🎉
            <>
              {/*test drawer */}

              <Stack.Screen name={"Home"} options={{ headerShown: false }}>
                {() => (
                  <DrawerNavigation
                    arg={navigationInfo}
                    setToken={setToken}
                    user={user}
                    setUser={setUser}
                    concept={concept}
                    gender={gender}
                    setGender={setGender}
                    accountType={accountType}
                    setAccountType={setAccountType}
                    firstName={firstName}
                    setFirstName={setFirstName}
                    lastName={lastName}
                    setLastName={setLastName}
                    nickName={nickName}
                    setNickName={setNickName}
                    city={city}
                    setCity={setCity}
                    nativeLanguage={nativeLanguage}
                    setNativeLanguage={setLanguage}
                    role={role}
                    setRole={setRole}
                    scr={x}
                  />
                )}
              </Stack.Screen>

              {/* <Stack.Screen name="Tab" options={{ headerShown: false }}>
                {() => (
                  <BottomNavigation
                    arg={navigationInfo}
                    setToken={setToken}
                    func={switchBtn}
                  />
                )}
              </Stack.Screen> */}

              <Stack.Screen
                name="PrivateChat"
                options={{
                  tabBarLabel: "Private Chat",
                  headerTitleAlign: "center",
                  headerStyle: { backgroundColor: "#59C09B" },
                  headerTitleStyle: {
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 30,
                  },
                }}
              >
                {() => <PrivateChatScreen />}
              </Stack.Screen>

              <Stack.Screen
                name="Concept"
                options={{
                  tabBarLabel: "Concept",
                  headerTitleAlign: "center",
                  headerStyle: { backgroundColor: "#59C09B" },
                  headerTitleStyle: {
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 30,
                  },
                }}
              >
                {() => <ConceptScreen />}
              </Stack.Screen>

              <Stack.Screen
                name="Concept 2"
                options={{
                  title: "Concept",
                  headerTitleAlign: "center",
                  headerStyle: { backgroundColor: "#59C09B" },
                  headerTitleStyle: {
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 30,
                  },
                }}
              >
                {() => <ConceptScreen2 />}
              </Stack.Screen>

              <Stack.Screen
                name="Concept 3"
                options={{
                  title: "Concept",
                  headerTitleAlign: "center",
                  headerStyle: { backgroundColor: "#59C09B" },
                  headerTitleStyle: {
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 30,
                  },
                }}
              >
                {() => <ConceptScreen3 />}
              </Stack.Screen>

              <Stack.Screen
                name="My Profile"
                options={{
                  headerTitleAlign: "center",
                  title: "Profile",
                  headerStyle: { backgroundColor: "#59C09B" },
                  headerTitleStyle: {
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 30,
                  },
                  headerRight: () => <HeaderRightProfile />,
                }}
              >
                {() => <TopNavigation arg={ProfileNav} />}
              </Stack.Screen>

              <Stack.Screen
                name="Edit Profile"
                options={{
                  tabBarLabel: "Edit profile",
                  headerStyle: { backgroundColor: "#59C09B" },
                  headerTitleStyle: {
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 30,
                  },
                }}
              >
                {() => (
                  <EditProfileScreen
                    user={user}
                    scr={x}
                    token={userToken}
                    setUser={setUser}
                    onClick={inc}
                    payscountry={paysC}
                  />
                )}
              </Stack.Screen>

              <Stack.Screen
                name="My Activities"
                options={{
                  tabBarLabel: "My Activities",
                  headerStyle: { backgroundColor: "#59C09B" },
                  headerTitleStyle: {
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 30,
                  },
                  headerRight: () => <HeaderRight />,
                }}
              >
                {() => <TopNavigation arg={navigationBis} />}
              </Stack.Screen>

              <Stack.Screen
                name="Create Activity"
                options={{
                  tabBarLabel: "Create Activity",
                  headerStyle: { backgroundColor: "#59C09B" },
                  headerTitleStyle: {
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 30,
                  },
                }}
              >
                {() => <CreateActivityScreen userToken={userToken} />}
              </Stack.Screen>

              <Stack.Screen
                name="Activities list"
                options={{
                  tabBarLabel: "Activities",
                  headerStyle: { backgroundColor: "#59C09B" },
                  headerTitleStyle: {
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 30,
                  },
                }}
              >
                {() => (
                  <ActivitiesScreen userToken={userToken} cardMode={cardMode} />
                )}
              </Stack.Screen>
              <Stack.Screen
                name="User Activities"
                options={{
                  tabBarLabel: "My Activities",
                  headerStyle: { backgroundColor: "#59C09B" },
                  headerTitleStyle: {
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 30,
                  },
                }}
              >
                {() => <MyActivitiesScreen userToken={userToken} />}
              </Stack.Screen>
              <Stack.Screen
                name="VerificationMailRole"
                options={{
                  title: x.verificationCode.title,
                  headerShadowVisible: false,
                  headerStyle: { backgroundColor: "#59C09B" },
                  headerTitleStyle: {
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 30,
                  },
                }}
              >
                {() => (
                  <VerificationMailScreen_roleChange
                    scr={x}
                    user={user}
                    rolesList={rolesList}
                  />
                )}
              </Stack.Screen>

              <Stack.Screen
                name="Activity"
                options={{
                  tabBarLabel: "Activity",
                  headerStyle: { backgroundColor: "#59C09B" },
                  headerTitleStyle: {
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 30,
                  },
                  // headerLeft: () => (
                  //   <Button
                  //     onPress={() => navigation.replace("Activities list")}
                  //     title="Back"
                  //   />
                  // ),
                }}
              >
                {/* {() => <MiddleNav arg={MiddleNav} />} */}
                {(props) => <ActivityScreen {...props} />}
              </Stack.Screen>

              <Stack.Screen
                name="Profile Info"
                options={{
                  tabBarLabel: "Profile Info",
                  headerStyle: { backgroundColor: "#59C09B" },
                  headerTitleStyle: {
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 30,
                  },
                }}
              >
                {() => <ProfileInfo userToken={userToken} />}
              </Stack.Screen>

              {/* <Stack.Screen
                name="QR Code"
                options={{
                  tabBarLabel: "QR Code",
                  headerStyle: { backgroundColor: "#59C09B" },
                  headerTitleStyle: {
                    color: "white",
                    fontWeight: "bold",
                    fontsize: 30,
                  },
                }}
              >
                {() => <TopNavigation arg={QrNav} />}
                {/* {(props) => <QrCodeScreen  {...props} />} */}
              {/* </Stack.Screen> */}

              {/* <Stack.Screen
                name="QR Scan"
                options={{
                  tabBarLabel: "QR Scan",
                  headerStyle: { backgroundColor: "#59C09B" },
                  headerTitleStyle: {
                    color: "white",
                    fontWeight: "bold",
                    fontsize: 30,
                  },
                }}
              >
                {() => <TopNavigation arg={QrNav} />}
                {/* {(props) => <QrScanScreen  {...props} />}  */}
              {/* </Stack.Screen> */}

              <Stack.Screen
                name="Contact Us"
                options={{
                  tabBarLabel: "Contact Us",
                  headerStyle: { backgroundColor: "#59C09B" },
                  headerTitleStyle: {
                    color: "white",
                    fontWeight: "bold",
                    fontsize: 30,
                  },
                }}
              >
                {(props) => <ContactScreen {...props} />}
              </Stack.Screen>

              <Stack.Screen
                name="Update"
                options={{
                  tabBarLabel: "Update",
                  headerStyle: { backgroundColor: "#59C09B" },
                  headerTitleStyle: {
                    color: "white",
                    fontWeight: "bold",
                    fontsize: 30,
                  },
                }}
              >
                {(props) => <Update {...props} />}
              </Stack.Screen>

              {/* <Stack.Screen
                name="Settings"
                options={{
                  tabBarLabel: "Settings",
                  headerStyle: { backgroundColor: "#59C09B" },
                  headerTitleStyle: {
                    color: "white",
                    fontWeight: "bold",
                    fontsize: 30,
                  },
                }}
              >
                {(props) => <SettingsScreen {...props} />}
              </Stack.Screen> */}

              {/* <Stack.Screen
                name="Invite Friends"
                options={{
                  tabBarLabel: "Invite Friends",
                  headerStyle: { backgroundColor: "#59C09B" },
                  headerTitleStyle: {
                    color: "white",
                    fontWeight: "bold",
                    fontsize: 30,
                  },
                }}
              >
                {(props) => <InviteFriends {...props} />}
              </Stack.Screen> */}

              {/* <Stack.Screen
                name="FilterScreen"
                options={{
                  tabBarLabel: "Filter",
                  headerStyle: { backgroundColor: "#59C09B" },
                  headerTitle: "Filter",
                  headerTitleAlign: "center",
                  headerTitleStyle: {
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 30,
                  },
                }}
              >
                {(props) => <FilterScreen {...props} />}
              </Stack.Screen> */}

              <Stack.Screen
                name="Member"
                options={{
                  tabBarLabel: "Profile",
                  headerStyle: { backgroundColor: "#59C09B" },
                  headerTitleStyle: {
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 30,
                  },
                }}
              >
                {(props) => <MemberScreen {...props} />}
              </Stack.Screen>
              <Stack.Screen
                        name="Members"
                        options={{
                          title: "Members",
                          headerTitleAlign: "center",
                          headerStyle: { backgroundColor: "#59C09B" },
                          headerTitleStyle: {
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 30,
                          },
                        }}>
                        {() => <MembersScreen scr={x} />}
                      </Stack.Screen>
              <Stack.Screen
                name="News"
                options={{
                  tabBarLabel: "News",
                  headerStyle: { backgroundColor: "#59C09B" },
                  headerTitleStyle: {
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 30,
                  },
                }}
              >
                {(props) => <News {...props} />}
              </Stack.Screen>
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>

      {switch1 === true ? (
        <Burger
          func={() => {
            setSwitch1(false);
          }}
          setToken={setUserToken}
          setProfile={setUserProfile}
          user={user}
        />
      ) : (
        ""
      )}
    </Provider>
  );
}
