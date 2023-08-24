import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
//import { createStackNavigator } from "@react-navigation/stack";
import {
  gestureHandlerRootHOC,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { DrawerActions } from "@react-navigation/native";

// import du provider et de configureStore
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import reducers from "./src/reducers";
import { NavigationContainer, useNavigation } from "@react-navigation/native"; // (fr) page de navigation // (en) navigation page
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import axios from "axios";
import { hostname } from "../mvp-reactnative/backendconnect/hostname.js";
import PasswordScreen from "./src/pages/PasswordScreen";
import SkipButton from "./src/assets/images/next-white.svg";
//To uncomment
// import ActivitiesScreen from "./src/pages/ActivitiesScreen";
import MyActivitiesScreen from "./src/pages/ActivityPages/MyActivitiesScreen";
import CopyActivityScreen from "./src/pages/ActivityPages/CopyActivityScreen";
import CreateProfileScreen from "./src/pages/CreateProfilePages/CreateProfileScreen";
import CreateProfileScreenStepTwo from "./src/pages/CreateProfilePages/CreateProfileScreenStepTwo";
import CreateProfileScreenStepThree from "./src/pages/CreateProfilePages/CreateProfileScreenStepThree";
import CreateProfileScreenStepFour from "./src/pages/CreateProfilePages/CreateProfileScreenStepFour";
import HomeScreen from "./src/pages/HomeScreen";
import EmailScreen from "./src/pages/EmailScreen";
import ContactScreen from "./src/pages/ContactScreen";
import VerificationScreen from "./src/pages/VerificationScreen";
import VerificationMailScreen from "./src/pages/VerificationMailScreen";
import VerificationMailScreen_roleChange from "./src/pages/VerificationMailScreen_roleChange";
import DrawerNavigation from "./src/navigation/DrawerNavigation";
import ActivityScreen from "./src/pages/ActivityPages/ActivityScreen";
import Update from "./src/pages/Update";
import MembersScreen from "./src/pages/MembersPages/MembersScreen";
import MemberShipScreen from "./src/pages/MembersPages/MemberShipScreen";
import screensName from "./src/assets/json/screensName.json";
import CreateActivityScreen from "./src/pages/ActivityPages/CreateActivityScreen";
import InviteFriendsScreen from "./src/pages/InviteFriendsScreen";
import MyProfileScreen from "./src/pages/MyProfilePages/MyProfileScreen";
import EditProfileScreenSettings from "./src/pages/CreateProfilePages/EditProfileScreen";
import { Dimensions, useWindowDimensions } from "react-native";
import { enGB, registerTranslation } from "react-native-paper-dates";
import RegisterScreen from "./src/pages/RegisterScreen";
import VerifyIdentity from "./src/pages/VerifyIdentity";
import ModifyActivityScreen from "./src/pages/ActivityPages/ModifyActivityScreen";
import Json from "./src/assets/json/en.json";
import { TouchableOpacity } from "react-native-gesture-handler";
import Parrainage from "./src/pages/Parrainage";
import SettingsScreen from "./src/pages/SettingsScreen";
import SplashScreen from "./src/pages/SplashScreen";
import Interactions from "./src/pages/NotificationPages/Interactions";
import NotifScreen from "./src/pages/NotificationPages/NotificationScreen";
// import Network from "./src/pages/MembersPages/Network";
// import FriendList from "./src/pages/MembersPages/FriendList";
// import ChatList from "./src/pages/ChatPrivePages/ChatList";
// import BurgerButton from "./src/components/BurgerButton";
// import ChatDetail from "./src/pages/ChatPrivePages/ChatDetail";

//Import des pages de la partie Settings

//import BlockedUserScreen from "./src/pages/SettingsPages/blockedUserScreen";
import LikedUsersScreen from "./src/pages/SettingsPages/likedUsersScreen";
import EditProfileScreen from "./src/pages/CreateProfilePages/EditProfileScreen";
import { ErrorBoundary } from "react-error-boundary";
import BurgerButton from "./src/components/BurgerButton";
import BottomNav from "./src/navigation/BottomNav";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Button } from "@rneui/base";
import ErrorFallback from "./src/pages/Error/ErrorFallback";
// import MedalScreen from "./src/pages/SettingsPages/medalScreen";
// import ClosedGiftScreen from "./src/pages/SettingsPages/closedGiftScreen";
// import ContactUsScreen from "./src/pages/SettingsPages/contactUsScreen";
// import NewsScreen from "./src/pages/SettingsPages/newsScreen";
// import DeleteAccountScreen from "./src/pages/SettingsPages/deleteAccountScreen";
// import PrivacyPolicyScreen from "./src/pages/SettingsPages/privacyPolicyScreen";
// import TermsOfSalesScreen from "./src/pages/SettingsPages/termsOfSalesScreen";
// import LegalNoticeScreen from "./src/pages/SettingsPages/legalNoticeScreen";
// import NotificationScreen from "./src/pages/SettingsPages/notifiScreen";

import InviteFriends from "./src/pages/InviteFriendsScreen";

registerTranslation("en-GB", enGB);

const Stack = createNativeStackNavigator(); // (fr) pile de navigation // (en) navigation stack

const store = configureStore({
  reducer: reducers,
});

export default function App() {
  const { height, width } = useWindowDimensions();

  const [userToken, setUserToken] = useState(null);
  const [switch1, setSwitch1] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [user, setUser] = useState({});
  const [shouldShowContactScreen, setShouldShowContactScreen] = useState(false);

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
  const [flags, setFlags] = useState(null);
  const [role, setRole] = useState({});
  const [userNativeLanguage, setUserNativeLanguage] = useState(null);

  //le number on le changera, la variable number va permettre d'appeler le screen verifemail et passer sur create profiles
  const [number, setNumber] = useState(0);
  //le registerMailCall va permettre de recuperer l'email du register et pour l'utiliser dans le verif screen
  const [registerMailCall, setRegisterMailCall] = useState();
  //Card mode représente le design de l'ActivityCard (voir ActivityCards, dans le dossier components). D'après le figma, ce n'est utilisé que dans le dossier reactnative...mais au cas où, le composant est déjà prêt à l'emploi
  const [cardMode, setCardMode] = useState("small");

  const [rolesList, setRolesList] = useState(null);
  //Pour afficher le message de VerificationScreen
  const [skipWarning, displaySkipWarning] = useState(false);
  //test
  //const navigation =useNavigation()
  //console.log('navigation is :',navigation)
  //end test
  const profileState = {
    // (fr) état du profil // (en) profile state // profilState c'est utilisé pour stoker les donnés d'enregistrement pour nouveau utilisateur
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

  nativeLanguage && console.log("native language in app.js", nativeLanguage);
  console.log("etat de profilState", profileState);

  const switchBtn = () => {
    if (switch1 === false) {
      setSwitch1(true);
    } else if (switch1 === true) {
      setSwitch1(false);
    }
  };

  const setToken = async (token) => {
    console.log("App.setToken = ", token);
    if (token) {
      await AsyncStorage.setItem("userToken", token);
      setUserToken(token);
    } else {
      await AsyncStorage.removeItem("userToken");
    }
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
        console.log("user pt", user, JSON.parse(suser));
        console.log(suser);
      } else {
        // AsyncStorage.removeItem("suser");
        // setUser("rrrrrrrrrrr");
        // console.log(user);
      }
    });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem("user").then((suser) => {
      if (suser != "undefined") {
        setUser(JSON.parse(suser));
        console.log("user pt", user, JSON.parse(suser));
        console.log(suser);
      } else {
        // AsyncStorage.removeItem("suser");
        // setUser("rrrrrrrrrrr");
        // console.log(user);
      }
    });
  }, [
    profileState.city,
    profileState.firstName,
    profileState.lastName,
    profileState.gender,
  ]);

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
  const [title, setTitle] = useState(""); //language not selected, check app.js
  const [count, setCount] = useState(0); //// data flow et
  const [countEdit, setCountEdit] = useState(0); //// data flow et

  const [countPays, setCountPays] = useState(0); ////
  const [payscountry, setPayscountry] = useState("");
  console.log(user);
  useEffect(() => {
    if (payscountry == "" || payscountry == "undefined") {
      setPayscountry(sostLanguage);
    } //en cas de bug le nome du pays envoye de default est english
  });
  const pays = (pa) => {
    //function messanger envoyée à l'homescreen pour recuperer
    setCountPays(1); //le nom du pays
    setPayscountry(pa.language);
  };
  let paysC = "English"; //si y a un bug le nom de la langue de deafault et l'English
  if (countPays >= 1) {
    //garde en sessionstorage le nome du pays choisi par l'user
    sessionStorage.removeItem("Pays"); // au demarrage de l'app
    sessionStorage.setItem("Pays", JSON.stringify(payscountry));
  }
  if (sessionStorage.Pays != null) {
    paysC = JSON.parse(sessionStorage.getItem("Pays")); //props nom du pays envoyé a EdiProfilScreen
  }

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
    useEffect(() => {
      setCountEdit(countEdit + 1);
    }, [gre]);
    console.log(gre);
    setScrEdit(gre); // Permet de recuperer la langue de l'app settée dans l'EditProfileScreen
    console.log(scrEdit);
    console.log(scr);
    console.log(countEdit);
  };

  //garde la langue selected en session
  let x = scr;
  if (count >= 1) {
    sessionStorage.setItem("keyy", JSON.stringify(scr));
  }
  if (sessionStorage.keyy != null) {
    x = JSON.parse(sessionStorage.getItem("keyy"));
  } else {
    x = scr;
  }

  let y = scr;
  if (scrEdit && countEdit != 0) {
    console.log(scrEdit);
    sessionStorage.setItem("keyyEdit", JSON.stringify(scrEdit));
    sessionStorage.setItem("keyy", JSON.stringify(scrEdit));
  }
  if (sessionStorage.keyyEdit != null && countEdit != 0) {
    console.log(sessionStorage.keyyEdit);
    console.log(sessionStorage.keyy);
    y = JSON.parse(sessionStorage.getItem("keyyEdit")); //scrEdit=>langue selectionnée en EditProfile; y variable de la langue selectionnée
    console.log(y);
    x = y; //passage de la langue selectionnée en EditProfile aux components
  } else {
    y = scrEdit;
  }
  // console.log(sessionStorage)
  // console.log(count);
  // console.log(x);

  console.log(nativeLanguage);

  //
  /////////////////////////////////////////////////////////////////////////

  console.log("user", user);
  // console.log("profile", profile);
  console.log("UserProfile", userProfile);
  console.log(registerMailCall);

  const handleReset = () => {
    setShouldShowContactScreen(true);
    localStorage.setItem("shouldShowContactScreen", JSON.stringify(true));
    window.location.reload();
  };

  useEffect(() => {
    // Retrieve the value from local storage to check if the ContactScreen should be shown
    const shouldShowContactScreen = localStorage.getItem(
      "shouldShowContactScreen"
    );

    if (shouldShowContactScreen) {
      // Parse the stored value
      const parsedShouldShowContactScreen = JSON.parse(shouldShowContactScreen);

      // Set the state variable based on the retrieved value
      setShouldShowContactScreen(parsedShouldShowContactScreen);

      // Clear the value from local storage since it has been used
      localStorage.removeItem("shouldShowContactScreen");
    }
  }, []);


  const [isReady, setIsReady] = useState(false);
  const [initialState, setInitialState] = useState();
  // apres l'actualisationle user reste sur la meme page
  useEffect(() => {
    // Récupérer l'état sauvegardé lors du démarrage de l'application
    const restoreState = async () => {
      try {
        const savedStateString = await AsyncStorage.getItem("NAVIGATION_STATE");
        const state = JSON.parse(savedStateString);
        setInitialState(state);
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  if (!isReady) {
    return null; // Ou un écran de chargement
  }

  // const Stack = createStackNavigator();
  // const [initialRoute, setInitialRoute] = useState("Home"); // Par défaut, on commence par l'écran d'accueil
  // useEffect(() => {
  //   const fetchRegistrationStep = async () => {
  //     const step = await AsyncStorage.getItem("registrationStep");
  //     if (step) {
  //       setInitialRoute(step);
  //     }
  //   };

  //   fetchRegistrationStep();
  // }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <GestureHandlerRootView
          style={{
            width: width >= 450 ? 450 : width,
            flex: 1,
            marginHorizontal: "auto",
          }}>
          <SafeAreaView
            style={{
              width: width >= 450 ? 450 : width,
              flex: 1,
              marginHorizontal: "auto",
            }}>
            {/** style={styles.container} data-media={ids.container} */}
            {/*  */}
            <NavigationContainer
              initialState={initialState}
              onStateChange={(state) =>
                AsyncStorage.setItem("NAVIGATION_STATE", JSON.stringify(state)) // Sauvegarder l'état de la navigation NAVIGATION_STATE dans le local storage
              }>
              <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onReset={handleReset}>
                <Stack.Navigator>
                  {/* initialRouteName={initialRoute} */}
                  {userToken === null ? ( //Par défaut, on commence par l'écran d'accueil
                    // sans token, l'utilisateur est invité a se connecter
                    <>
                      {/* Home */}
                      <Stack.Screen
                        name="Home"
                        options={{ headerShown: false }}>
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
                      {/* Login */}
                      <Stack.Screen
                        name="LogIn"
                        options={{
                          title: title,
                          // headerShadowVisible: true,
                          headerStyle: { backgroundColor: "#59C09B" },
                          headerTintColor: "#FFFFFF",
                          headerTitleStyle: {
                            fontWeight: "bold",
                            fontSize: 20,
                          },
                        }}>
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
                        }}>
                        {() => (
                          <VerifyIdentity
                            setNumber={setNumber}
                            setToken={setToken}
                            setRole={setRole}
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
                          headerTitleStyle: {
                            fontWeight: "bold",
                            fontSize: 20,
                          },
                        }}>
                        {(props) => (
                          <RegisterScreen
                            {...props}
                            setToken={setToken}
                            setProfile={setProfile}
                            setRole={setRole}
                            rolesList={rolesList}
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
                          headerTitleStyle: {
                            fontWeight: "bold",
                            fontSize: 20,
                          },
                        }}>
                        {(props) => (
                          <PasswordScreen
                            {...props}
                            setToken={setToken}
                            navigation={navigator}
                            setUser={setUser}
                          />
                        )}
                      </Stack.Screen>
                      {/** password test*/}
                      <Stack.Screen
                        name="Verification"
                        options={{
                          title: "Verification",
                          headerShadowVisible: false,
                          headerStyle: { backgroundColor: "#59C09B" },
                        }}>
                        {() => (
                          <VerificationScreen
                            setNumber={setNumber}
                            scr={x} //scr?
                            rolesList={rolesList}
                          />
                        )}
                      </Stack.Screen>

                      {/* trouvé ça*/}
                      {/* <Stack.Screen
                        name="Verification"
                        options={{
                          title: "Verification",
                          headerShadowVisible: false,
                          headerStyle: { backgroundColor: "#59C09B" },
                        }}
                      >
                        {({ route }) => (
                          <VerificationScreen
                            setNumber={setNumber}
                            scr={route.params.scr} 
                            rolesList={rolesList}
                          />
                        )}
                      </Stack.Screen> */}
                      


                    </>
                  ) : number === 1 ? (
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
                              <TouchableOpacity
                                onPress={() => {
                                  if (!skipWarning) {
                                    displaySkipWarning(true);
                                  } else {
                                    setNumber(2);
                                    setTimeout(() => {
                                      navigation.navigate("Step1", {
                                        role: nonVerifiedUser,
                                        nativeLanguage: userNativeLanguage,
                                      });
                                    }, 0);
                                    displaySkipWarning(false);
                                  }
                                }}
                                style={{ marginRight: 10, cursor: "pointer" }}>
                                <img src={SkipButton} />
                              </TouchableOpacity>
                            );
                          },
                        }}>
                        {/* Le setTimeout dans le else au dessus est la seule entourloupe trouvée pour s'assurer que le number prenne la valeur de 2, condition nécessaire pour une navigation sans bug vers la page Step1. Pour ce qui est de l'explication logique à ça...désolée, sur ce coup-là, je vais vous répondre "tais-toi, c'est magique"...si vous trouvez mieux, n'hésitez pas! */}
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
                  ) : userProfile !== "done" && number === 2 ? (
                    <>
                      <Stack.Screen
                        name="Step1"
                        options={{
                          title: x.createProfile.title,
                          headerStyle: { backgroundColor: "#59C09B" },
                        }}>
                        {(props) => (
                          <CreateProfileScreen
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
                        name="VerificationMail"
                        options={{
                          title: "Verification",
                          headerShadowVisible: false,
                          headerStyle: { backgroundColor: "#59C09B" },
                        }}>
                        {() => (
                          <VerificationMailScreen
                            registerMailCall={registerMailCall}
                            setNumber={setNumber}
                          />
                        )}
                      </Stack.Screen>

                      <Stack.Screen
                        name="Step2"
                        options={{
                          title: x.createProfile.title,
                          headerStyle: { backgroundColor: "#59C09B" },
                        }}>
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
                        }}>
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
                        }}>
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
                    <>
                      {/* <Stack.Screen
                    name="Activities List"
                    options={{
                      tabBarLabel: "Activities",
                      headerStyle: { backgroundColor: "#59C09B" },
                      headerTitleStyle: {
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 30,
                      },
                      headerTitleAlign: "center",
                    }}
                  >
                    {() => (
                      <>
                      <ActivitiesScreen userToken={userToken} cardMode={cardMode} fromStack="calendar" />
                      <BottomNav
                        userToken={userToken}
                        cardMode={cardMode}
                        fromStack="calendar"
                      />
                      </>
                    )}
                  </Stack.Screen> */}

                      {/* <Stack.Screen
                      name="Splash"
                      component={SplashScreen}
                      options={{ headerShown: false }}
                    /> */}

                      <Stack.Screen
                        name={"Drawer"}
                        options={{ headerShown: false }}>
                        {() => (
                          <DrawerNavigation
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
                            shouldShowContactScreen={shouldShowContactScreen}
                          />
                        )}
                      </Stack.Screen>
                      {/**<Stack.Screen
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
                  </Stack.Screen>*/}
                      <Stack.Screen
                        name="Activity"
                        options={{
                          //🇫🇷 le titre du header transmis depuis le composant ActivityCard par react router, ensuite on utilise useLayoutEffect sur ActivityScreen pour la modification de title dans le header🇫🇷
                          //🇬🇧 the title of the header transmitted from the ActivityCard component by react router, then we useLayoutEffect on ActivityScreen for the modification of title in the header🇬🇧
                          //title: x.activity.title,
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
                        }}>
                        {/* {() => <MiddleNav arg={MiddleNav} />} */}

                        {/* user={user} permet de transférer les infos de l'utilisateur connecté. Utiliser les props ne le fait pas, étrangement (ex: dans une activité que l'on a pas créé, on est considéré comme un user, mais c'est parce que route.params récupère les infos du créateur...c'est à se demander si les props servent à quelque chose, pour cette page...) */}
                        {(props) => (
                          <ActivityScreen {...props} user={user} scr={x} />
                        )}
                      </Stack.Screen>

                      <Stack.Screen
                        name="Create Activity"
                        options={{
                          title: x.createActivity.title,
                          tabBarLabel: "Create Activity",
                          headerStyle: { backgroundColor: "#59C09B" },
                          headerTitleStyle: {
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 30,
                          },
                          headerTitleAlign: "center",
                        }}>
                        {(props) => <CreateActivityScreen {...props} scr={x} />}
                      </Stack.Screen>
                      <Stack.Screen name="Copy Activity">
                        {(props) => (
                          <CopyActivityScreen
                            {...props}
                            userToken={userToken}
                            user={user}
                            scr={scr}
                          />
                        )}
                      </Stack.Screen>
                      <Stack.Screen
                        name="Modify Activity"
                        options={{
                          title: x.createActivity.title_mod,
                          tabBarLabel: "Modify Activity",
                          headerStyle: { backgroundColor: "#59C09B" },
                          headerTitleStyle: {
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 30,
                          },
                          headerTitleAlign: "center",
                        }}>
                        {(props) => (
                          <ModifyActivityScreen user={user} scr={x} />
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
                        }}>
                        {() => <MyActivitiesScreen userToken={userToken} />}
                      </Stack.Screen>

                      <Stack.Screen
                        name="Profile"
                        options={{
                          title: x.profile.title,
                          tabBarLabel: "Profile",
                          headerStyle: { backgroundColor: "#59C09B" },
                          headerTitleStyle: {
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 30,
                          },
                          headerTitleAlign: "center",
                        }}>
                        {(props) => <MyProfileScreen user={user} scr={x} />}
                      </Stack.Screen>
                      <Stack.Screen
                        name="Edit Profile"
                        options={{
                          title: x.editProfile.title,
                          tabBarLabel: "Edit Profile",
                          headerStyle: { backgroundColor: "#59C09B" },
                          headerTitleStyle: {
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 30,
                          },
                          headerTitleAlign: "center",
                        }}>
                        {(props) => (
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
                        }}>
                        {() => (
                          <VerificationMailScreen_roleChange
                            scr={x}
                            user={user}
                            rolesList={rolesList}
                          />
                        )}
                      </Stack.Screen>

                      <Stack.Screen
                        name="Update"
                        options={{
                          title: "Update",
                          headerTitleAlign: "center",
                          headerStyle: { backgroundColor: "#59C09B" },
                          headerTitleStyle: {
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 30,
                          },
                        }}>
                        {() => <Update />}
                      </Stack.Screen>

                      <Stack.Screen
                        name="Settings"
                        options={{
                          title: title,
                          // headerShadowVisible: true,
                          headerStyle: { backgroundColor: "#59C09B" },
                          headerTintColor: "#FFFFFF",
                          headerTitleStyle: {
                            fontWeight: "bold",
                            fontSize: 20,
                          },
                        }}>
                        {(props) => <SettingsScreen scr={x} {...props} />}
                      </Stack.Screen>
                      <Stack.Screen
                        name="MemberShipScreen"
                        options={{
                          title: title,
                          // headerShadowVisible: true,
                          headerStyle: { backgroundColor: "#59C09B" },
                          headerTintColor: "#FFFFFF",
                          headerTitleStyle: {
                            fontWeight: "bold",
                            fontSize: 20,
                          },
                        }}>
                        {(props) => <MemberShipScreen />}
                      </Stack.Screen>
                      <Stack.Screen
                        name="MyProfileScreen"
                        options={{
                          title: title,
                          // headerShadowVisible: true,
                          headerStyle: { backgroundColor: "#59C09B" },
                          headerTintColor: "#FFFFFF",
                          headerTitleStyle: {
                            fontWeight: "bold",
                            fontSize: 20,
                          },
                        }}>
                        {() => <MyProfileScreen />}
                      </Stack.Screen>
                      <Stack.Screen
                        name="HomeScreen"
                        component={HomeScreen}
                        options={{ path: "/" }} // path défini à '/'
                      />
                      {/* <Stack.Screen
  name="BlockedUserScreen"
  component={BlockedUserScreen}
  options={{
    title: "Utilisateurs bloqués",
    //...autres options de l'en-tête si nécessaire...
  }}
/> */}
                      {/* {
<Stack.Screen
  name="LikedUsersScreen"
  component={LikedUsersScreen}
  options={{
    title: "Utilisateurs aimés",
    //...autres options de l'en-tête si nécessaire...
  }}
/>

<Stack.Screen
  name="EditProfile"
  component={EditProfileScreenSettings}
  options={{
    title: "Modifier le profil",
    //...autres options de l'en-tête si nécessaire...
  }}
/>

<Stack.Screen
  name="Medal"
  component={MedalScreen}
  options={{
    title: "Médailles",
    //...autres options de l'en-tête si nécessaire...
  }}
/>

<Stack.Screen
  name="ClosedGiftScreen"
  component={ClosedGiftScreen}
  options={{
    title: "Cadeaux fermés",
    //...autres options de l'en-tête si nécessaire...
  }}
/>

<Stack.Screen
  name="ContactUs"
  component={ContactUsScreen}
  options={{
    title: "Nous contacter",
    //...autres options de l'en-tête si nécessaire...
  }}
/>

<Stack.Screen
  name="News"
  component={NewsScreen}
  options={{
    title: "Actualités",
    //...autres options de l'en-tête si nécessaire...
  }}
/>

<Stack.Screen
  name="DeleteAccount"
  component={DeleteAccountScreen}
  options={{
    title: "Supprimer le compte",
    //...autres options de l'en-tête si nécessaire...
  }}
/>

<Stack.Screen
  name="PrivacyPolicy"
  component={PrivacyPolicyScreen}
  options={{
    title: "Politique de confidentialité",
    //...autres options de l'en-tête si nécessaire...
  }}
/>

<Stack.Screen
  name="TermsOfSales"
  component={TermsOfSalesScreen}
  options={{
    title: "Conditions de vente",
    //...autres options de l'en-tête si nécessaire...
  }}
/>

<Stack.Screen
  name="LegalNotice"
  component={LegalNoticeScreen}
  options={{
    title: "Mentions légales",
    //...autres options de l'en-tête si nécessaire...
  }}
/> */}

                      <Stack.Screen
                        name="Invite Friends"
                        options={{
                          title: "Invite Friends",
                          headerStyle: { backgroundColor: "#59C09B" },
                          headerTitleStyle: {
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 30,
                          },
                          headerTitleAlign: "center",
                        }}>
                        {(props) => <InviteFriendsScreen {...props} scr={x} />}
                      </Stack.Screen>
                      <Stack.Screen
                        name="NotifScreen"
                        options={{
                          title: "Notifications",
                          tabBarLabel: "Notifications",
                          headerStyle: { backgroundColor: "#59C09B" },
                          headerTitleStyle: {
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 30,
                          },
                          headerTitleAlign: "center",
                          //...other header options if needed...
                        }}>
                        {() => <NotifScreen />}
                      </Stack.Screen>

                      <Stack.Screen
                        name="Network"
                        options={{
                          title: "Members",
                          tabBarLabel: "Members",
                          headerStyle: { backgroundColor: "#59C09B" },
                          headerTitleStyle: {
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 30,
                          },
                          headerTitleAlign: "center",
                          //...other header options if needed...
                        }}>
                        {() => <Network />}
                      </Stack.Screen>

                      <Stack.Screen
                        name="FriendList"
                        options={{
                          title: "Members",
                          tabBarLabel: "Members",
                          headerStyle: { backgroundColor: "#59C09B" },
                          headerTitleStyle: {
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 30,
                          },
                          headerTitleAlign: "center",
                          //...other header options if needed...
                        }}>
                        {() => <FriendList />}
                      </Stack.Screen>

                      <Stack.Screen
                        name="ChatList"
                        options={({ navigation }) => ({
                          title: "Personal Inbox",
                          tabBarLabel: "Personal Inbox",
                          headerStyle: { backgroundColor: "#59C09B" },
                          headerTitleStyle: {
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 30,
                          },
                          headerTitleAlign: "center",

                          headerLeft: () => <BurgerButton />,

                          headerRight: () => (
                            <TouchableOpacity
                              onPress={() => {
                                // Handle the button press here
                                // For example, you can navigate to a settings screen
                                navigation.navigate("Socializus");
                              }}
                              style={{ marginRight: 10 }}>
                              <Icon
                                name="ellipsis-vertical"
                                size={24}
                                color="white"
                              />
                            </TouchableOpacity>
                          ),
                          //...other header options if needed...
                        })}>
                        {() => <ChatList />}
                      </Stack.Screen>

                      <Stack.Screen
                        name="ChatDetail"
                        options={({ navigation }) => ({
                          title: "ChatDetail",
                          tabBarLabel: "ChatDetail",
                          headerStyle: { backgroundColor: "#59C09B" },
                          headerTitleStyle: {
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 30,
                          },
                          headerTitleAlign: "center",

                          headerLeft: () => <BurgerButton />,

                          headerRight: () => (
                            <TouchableOpacity
                              onPress={() => {
                                // Handle the button press here
                                // For example, you can navigate to a settings screen
                                navigation.navigate("Socializus");
                              }}
                              style={{ marginRight: 10 }}>
                              <Icon
                                name="ellipsis-vertical"
                                size={24}
                                color="white"
                              />
                            </TouchableOpacity>
                          ),
                          //...other header options if needed...
                        })}>
                        {() => <ChatDetail />}
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
                      {/* <Stack.Screen name="Invite Friends">
                      {() => <InviteFriendsScreen />}
                    </Stack.Screen> */}
                      <Stack.Screen name="Filters">
                        {() => <FilterScreen />}
                      </Stack.Screen>
                      <Stack.Screen name="Interaction">
                        {() => <Interactions />}
                      </Stack.Screen>
                    </>
                  )}
                </Stack.Navigator>
              </ErrorBoundary>
            </NavigationContainer>
          </SafeAreaView>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </Provider>
  );
}

// export const appLanguage= x;

const { ids, styles } = StyleSheet.create({
  container: {
    width: 450,
    "@media (max-width: 450px)": {
      width: "100%",
    },
    flex: 1,
    marginHorizontal: "auto",
  },
});
