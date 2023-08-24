import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View, Alert, TouchableOpacity } from "react-native";
import ActivitiesScreen from "../pages/ActivityPages/ActivitiesScreen";
import ContactScreen from "../pages/ContactScreen";
import News from "../pages/News";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ConceptScreen from "../pages/ConceptScreen";
import MembersScreen from "../pages/MembersPages/MembersScreen";
import CalendarOn from "../assets/images/calendar-on.svg";
import CalendarOff from "../assets/images/calendar-off.svg";
import MembersOn from "../assets/images/MembersOn.svg";
import MembersOff from "../assets/images/MembersOff.svg";
import ConceptOn from "../assets/images/concept_lightbulb.svg";
import ConceptOff from "../assets/images/concept.svg";
import NewsOn from "../assets/images/infoOn.svg";
import NewsOff from "../assets/images/infoOff.svg";
import ContactOn from "../assets/images/contact.svg";
import ContactOff from "../assets/images/contact-us.svg";
import MessengerOn from "../assets/images/messenger-on.svg";
import MessengerOff from "../assets/images/messenger-off.svg";
import Members from "../assets/images/members.svg";
import PeopleOff from "../assets/images/people-off.svg";
import MapOn from "../assets/images/map-on.svg";
import MapOff from "../assets/images/map-off.svg";
import NotificationOn from "../assets/images/bell-on.svg";
import NotificationOff from "../assets/images/bell-off.svg";
import ConceptIcon from "../assets/images/concept_lightbulb.svg";
import NewsIcon from "../assets/drawer-icons/informations.svg";
import ContactUsIcon from "../assets/images/contact.svg";
import TopNavigation from "./TopNavigation";
import MyActivitiesScreen from "../pages/ActivityPages/MyActivitiesScreen";
import NotificationScreen from "../pages/NotificationPages/NotificationScreen";
import NotifBelOn from "../assets/images/bell-on.svg";
import NotifBelOff from "../assets/images/bell-off.svg";
import NotifScreen from "../pages/NotificationPages/NotificationScreen";
import BurgerButton from "../components/BurgerButton";

// import ProfileInfo from "../pages/ProfileInfo";
// import ProfileFriends from "../pages/ProfileFriends";
// import ProfileActivities from "../pages/ProfileActivities";
// scr reception de la langue selectionnée par DrawerNavigation
const BottomNav = ({
  userToken,
  user,
  fromStack,
  cardMode,
  concept,
  scr,
  shouldShowContactScreen,
}) => {
  const BottomTabNavigator = createBottomTabNavigator();
  // console.log('scr arrivée à bottom??',scr)
  /** A revoir */
  return (
    <BottomTabNavigator.Navigator
      initialRouteName={shouldShowContactScreen ? "Contact" : "Concept"}
      screenOptions={{
        headerShown: false,
        tabBarStyle: { height: 70 },
        tabBarItemStyle: { flexDirection: "column" },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarActiveBackgroundColor: "#F48225",
        tabBarInactiveBackgroundColor: "#59C09B",
      }}
    >
      <BottomTabNavigator.Screen
        name="Activities"
        options={{
          headerShown: true,
          title: scr.bottomNav.activities.title, //title des ativity bottoMNav langue selectionné
          tabBarIcon: ({ focused }) => (
            <img src={focused ? CalendarOn : CalendarOff} />
          ), // Icône affichée dans la barre de navigation, différente selon si l'onglet est sélectionné ou non
          tabBarIconStyle: { height: 30 },
          tabBarLabelStyle: { fontSize: 16, marginLeft: 0, marginBottom: 3 },
          headerStyle: { backgroundColor: "#59C09B" },
          headerTitleStyle: {
            color: "white",
            fontWeight: "bold",
            fontSize: 30,
          },
          headerTitleAlign: "center",
          headerLeft: () => <BurgerButton />,
        }}
      >
        {(props) => (
          <TopNavigation
            arg={[
              {
                link: scr.bottomNav.activities.title, ///title des ativity TomNav langue selectionné
                to: (props) => (
                  <ActivitiesScreen
                    userToken={userToken}
                    user={user}
                    cardMode={{}}
                    fromStack="calendar"
                    scr={scr}
                    {...props}
                  />
                ),
              },
            ]}
          />
        )}
      </BottomTabNavigator.Screen>

      <BottomTabNavigator.Screen
        name="Members"
        //component={MembersScreen}
        children={(props) => <MembersScreen scr={scr} />}
        options={{
          title: scr.bottomNav.members.title, ///title des members BottomNav langue selectionné
          headerShown: true,
          tabBarIcon: ({ focused }) => (
            <img src={focused ? MembersOn : MembersOff} />
          ),
          tabBarIconStyle: { height: 30 },
          tabBarLabelStyle: { fontSize: 16, marginLeft: 0, marginBottom: 3 },
          headerStyle: { backgroundColor: "#59C09B" },
          headerTitleStyle: {
            color: "white",
            fontWeight: "bold",
            fontSize: 30,
          },
          headerTitleAlign: "center",
          headerLeft: () => <BurgerButton />,
        }}
      />

      <BottomTabNavigator.Screen
        name="Concept"
        children={(props) => <ConceptScreen scr={scr} />} //ajout langue choisi au ConceptScreen
        options={{
          title: scr.menu.concept, ///title de concept BottomNav langue selectionné
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <img src={focused ? ConceptOn : ConceptOff} />
          ), // Icône affichée dans la barre de navigation, différente selon si l'onglet est sélectionné ou non
          tabBarIconStyle: { height: 30 },
          tabBarLabelStyle: { fontSize: 16, marginLeft: 0, marginBottom: 3 },
        }}
      />

      <BottomTabNavigator.Screen
        name="News"
        children={(props) => <News scr={scr} />} //ajout langue choisi aux newsScreen
        options={{
          title: scr.menu.news, ///title des news BottomNav langue selectionné
          headerShown: true,
          tabBarIcon: ({ focused }) => <img src={focused ? NewsOn : NewsOff} />,
          tabBarIconStyle: { height: 30 },
          tabBarLabelStyle: { fontSize: 16, marginLeft: 0, marginBottom: 3 },
          headerStyle: { backgroundColor: "#59C09B" },
          headerTitleStyle: {
            color: "white",
            fontWeight: "bold",
            fontSize: 30,
          },
          headerTitleAlign: "center",
          headerLeft: () => <BurgerButton />,
        }}
      />

      {/* <BottomTabNavigator.Screen
        name="Notification"
        component={NotifScreen}
        options={{
          title: scr.bottomNav.NotifScreen, ///title notification BottomNav langue selectionné
          headerShown: false,
          tabBarIcon: ({focused}) => <img src={focused ? NotifBelOn : NotifBelOff} />,
          tabBarIconStyle: { height: 30 },
          tabBarLabelStyle: { fontSize: 16, marginLeft: 0, marginBottom: 3 },
        }}
      /> */}

      <BottomTabNavigator.Screen
        //🇫🇷 nom de notre navigaigation Contact
        //🇬🇧 name of our navigation Contact
        name="Contact"
        //🇫🇷Ajoute une langue a  cette écran ContactScreen qui se trouve dans pages /ContactScreen
        //🇬🇧Add a language to this ContactScreen screen found in pages /ContactScreen
        children={(props) => <ContactScreen scr={scr} />}
        options={{
          //  🇫🇷 title de contact BottomNav langue selectionné
          //🇬🇧 contact title BottomNav selected language
          title: scr.menu.contact,
          headerShown: true,
          //  🇫🇷 ajouter l'icone ContactUsIcon
          //🇬🇧 Add icon ContactUsIcon
          tabBarIcon: ({ focused }) => (
            <img src={focused ? ContactOn : ContactOff} />
          ),
          tabBarIconStyle: { height: 30 },
          tabBarLabelStyle: { fontSize: 16, marginLeft: 0, marginBottom: 3 },
          headerStyle: { backgroundColor: "#59C09B" },
          headerTitleStyle: {
            color: "white",
            fontWeight: "bold",
            fontSize: 30,
          },
          headerTitleAlign: "center",
          headerLeft: () => <BurgerButton />,
        }}
      />
    </BottomTabNavigator.Navigator>
  );
};
export default BottomNav;
