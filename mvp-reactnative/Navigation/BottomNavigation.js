// This is also the top tab for "Activities"!

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Button, TouchableOpacity, View, Text } from "react-native";
import Filter from "../assets/images/filter.svg";
import {Icon} from "@rneui/themed";


const BottomTab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

import TopNavigation from "./TopNavigation";

import BurgerButton from "../components/BurgerButton";
import Json from "../assets/json/en.json";
import { useState } from "react";

const { bottomNav, menu } = Json;

const BottomNavigation = ({ arg, setToken, func, navigate, nav, user, scr }) => {
  //console.log('navigation is nav : ',nav)
 
  const navigation = useNavigation();
  const [cardType, setCardType] = useState(false);
  
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarIcon: { focused: true, color: "ff0000", size: 1 },
        tabBarLabelStyle: {
          fontWeight: "bold",
        },
        tabBarActiveBackgroundColor: "#F48225",
        tabBarInactiveBackgroundColor: "#59C09B",
      }}
    >
      {arg.map((elem, index) => {
        return (
          <BottomTab.Screen
            key={index}
            name={`BottomNav${elem.link}`}
            options={{
              headerShown: false,
              tabBarLabel: elem.link,
              // tabBarIcon: ({ focused,color, size }) => {
              //   return <elem.icon/>
              // }
              tabBarIcon: ({ focused }) => {
                const Icon = focused ? elem.icon : elem.iconOff;
                return <Icon />;
              }
            }}
          >
            {() => (
              <Stack.Navigator>
                <Stack.Screen
                  name={elem.link}
                  options={{
                    title: elem.link,
                    headerStyle: { backgroundColor: "#59C09B" },
                    headerTitleStyle: {
                      color: "white",
                      fontWeight: "bold",
                      fontSize: 30,
                      justifyContent: "center"
                    },
                    headerTitleAlign:"center",
                    headerLeft: () => (
                        <BurgerButton onPress={nav}/>
                    ),
                    headerRight:
                      elem.link === bottomNav.activities.title
                         ? () => (
                          <>
                            <TouchableOpacity
                              onPress={() => {
                                setCardType(!cardType)
                              }}
                            >
                                {cardType ? 
                                <Icon name="search-minus" type="font-awesome" size={26} color="white" />
                                :
                                <Icon name="search-plus" type="font-awesome" size={26} color="white" />}
                            </TouchableOpacity>
                            
                            { /* Element cliquable pour changer le type d'affichage. S'il faut remettre comme avant, aller chercher le code précédent dans une branche github inférieure au 7/12. Rendez ça fonctionnel! */ }
                          </>
                         )
                         : () => false,
                  }}
                >
                  {() => <TopNavigation arg={elem.topNavArg} user={user} scr={scr} />}
                </Stack.Screen>
              </Stack.Navigator>
            )}
          </BottomTab.Screen>
        );
      })}
    </BottomTab.Navigator>
  );
};

export default BottomNavigation;
