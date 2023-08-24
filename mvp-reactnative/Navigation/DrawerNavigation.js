import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomNavigation from "./BottomNavigation";
import CustomDrawerContent from "../directoryAddingFiles/CustomDrawerContent";
// import { NavigationContainer } from "@react-navigation/native";
// import navigationInfo from "./navigationInfo";
// import AsyncStorage from "@react-native-async-storage/async-storage";

//test
import { useNavigation } from "@react-navigation/native";
import { DrawerActions } from "@react-navigation/native";

//import TopNavigation from "./TopNavigation";

// import styles from './styles';

//creation de la Drawer Navigation
const Drawer = createDrawerNavigator();
const DrawerNavigation = ({ arg, setToken, userToken, user, setUser, concept, scr, gender, setGender, accountType, setAccountType, firstName, setFirstName, lastName, setLastName, nickName, setNickName, city, setCity, nativeLanguage, setNativeLanguage, role, setRole}) => {
  const navigation = useNavigation();
//   console.log("my navigation is ", navigation);
  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawerContent
        {...props}
        setToken={setToken}
        user={user}
        setUser={setUser}
        scr={scr}   //passage de la langue selectionnée à la bottomNav
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
          backgroundColor: "#59C09B"
        },
        title: "Socializus"
      }}
    >
      {/*<Drawer.Screen name="Home"> component={BottomNavigation}/>*/}
      <Drawer.Screen name="Socializus" options={{headerShown: false}}>
        {(props) => (
          <BottomNavigation
            {...props}
            user={user}
            scr={scr}
            arg={arg}
            setToken={setToken}
            nav={() => navigation.dispatch(DrawerActions.openDrawer())}
          />
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
