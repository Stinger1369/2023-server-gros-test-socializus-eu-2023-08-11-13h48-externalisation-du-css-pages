/* EN - ConceptScreen (Frames 80 - 81) - EN
For more information about the swiper, go to the AboutUsSlides component
*/

/* FR - ConceptScreen (Frames 80 - 81)
Pour plus d'infos à propos du swiper, aller dans le composant ConceptSlide - FR
 */
import React, { useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import CustomDrawerContent from "./CustomDrawerContent";
import BottomNav from "./BottomNav";
import BurgerButton from "../components/BurgerButton";
import HomeScreen from "../pages/HomeScreen";
import ConceptScreen from "../pages/ConceptScreen";

const Drawer = createDrawerNavigator();

const ConceptScreenWrapper = () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      drawerGestureEnabled: false, // Désactive le geste d'ouverture du tiroir
    });
    return () => {
      navigation.setOptions({
        drawerGestureEnabled: true, // Réactive le geste d'ouverture du tiroir
      });
    };
  }, [navigation]);

  return <ConceptScreen />;
};

const DrawerNavigation = ({
  setToken,
  userToken,
  user,
  setUser,
  concept,
  scr,
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
  setNativeLanguage,
  role,
  setRole,
  setUserNativeLanguage,
  shouldShowContactScreen
}) => {
  const navigation = useNavigation();

  const isLoggedIn = userToken !== null;

  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawerContent
          {...props}
          setToken={setToken}
          user={user}
          setUser={setUser}
          scr={scr}
          navigation={navigation}
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
          setNativeLanguage={setNativeLanguage}
          role={role}
          setRole={setRole}
        />
      )}
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#59C09B",
        },
        title: "Socializus",
      }}>
      <Drawer.Screen
        name="Socializus"
        options={{
          tabBarLabel: "Activities",
          headerShown: false,
          headerStyle: { backgroundColor: "#59C09B" },
          headerTitleStyle: {
            color: "white",
            fontWeight: "bold",
            fontSize: 30,
          },
          headerTitleAlign: "center",
          headerLeft: () => <BurgerButton />,
        }}>
        {(props) => (
          <BottomNav
            userToken={userToken}
            user={user}
            cardMode={{}}
            fromStack="calendar"
            concept={concept}
            scr={scr}
            shouldShowContactScreen={shouldShowContactScreen}
          />
        )}
      </Drawer.Screen>

      {isLoggedIn && (
        <Drawer.Screen
          name="Home"
          children={(props) => (
            <HomeScreen
              {...props}
              setUserNativeLanguage={setUserNativeLanguage}
            />
          )}
        />
      )}

      <Drawer.Screen
        name="Concept"
        component={ConceptScreenWrapper}
        options={{
          headerShown: false,
          drawerLabel: () => null,
          swipeEnabled: false,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
