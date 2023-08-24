import ActivitiesScreen from "../pages/ActivitiesScreen";
import MembersScreen from "../pages/MembersScreen";
import MapsScreen from "../pages/MapsScreen";

import NotificationsScreen from "../pages/NotificationsScreen";
import NotificationsInteractScreen from "../pages/NotificationsInteractScreen";
import MessagesScreen from "../pages/MessagesScreen";
import ContactScreen from "../pages/ContactScreen";
import FilterScreen from '../pages/FilterScreen';

import NotReady from "../pages/NotReady";

import Json from "../assets/json/en.json";
import MyActivities from "../pages/MyActivitiesScreen";
//import icon
import CalendarOn from '../assets/images/calendar-on.svg'                                   
import CalendarOff from '../assets/images/calendar-off.svg'
import MembersOn from "../assets/images/MembersOn.svg";
import MembersOff from "../assets/images/MembersOff.svg";
import ConceptOn from "../assets/images/concept_lightbulb.svg";
import ConceptOff from "../assets/images/concept.svg";
import NewsOn from "../assets/images/infoOn.svg";
import NewsOff from "../assets/images/infoOff.svg";
import ContactOn from "../assets/images/contact.svg";
import ContactOff from "../assets/images/contact-us.svg";

import MessengerOn from '../assets/images/messenger-on.svg'
import Messengeroff from '../assets/images/messenger-off.svg'
import PeopleOn from '../assets/images/people-on.svg';
import PeopleOff from '../assets/images/people-off.svg';
import MapOn from '../assets/images/map-on.svg';
import MapOff from '../assets/images/map-off.svg';
import NotificationOn from '../assets/images/bell-on.svg'
import NotificationOff from '../assets/images/bell-off.svg'
// import ChatListScreen from "../pages/ChatListScreen";
import ConceptScreen from "../pages/ConceptScreen1"; //  Ce composant utilisé pour afficher du contenu lié a la page concept // (en) This component is used to display content related to the first specific concept in the concept page

// Menu that shows Member pages 

const { bottomNav } = Json;

const navigation = [
  {
    link: bottomNav.activities.title,
    icon: CalendarOn,
    iconOff:CalendarOn, // ne fonctionne pas
    topNavArg: [
      {
        link: bottomNav.activities.title,
        to: (user, scr) => <ActivitiesScreen fromStack="calendar" user={user} scr={scr}/>,
      },
      // { link: "My activities", to: () => <MyActivities /> }
    ],
  },
  {
    link: bottomNav.members.title,
    icon: MembersOn,
    iconOff:MembersOn,
    topNavArg: [
      // { link: "male", to: () => <MembersScreen fromStack="male" /> },
      // {
      //   link: bottomNav.members.topNav.pro,
      //   to: () => <MembersScreen fromStack="pro" />,
      // },
      // { link: "female", to: () => <MembersScreen fromStack="female" /> },
      {
        link: "members", to: () => <MembersScreen />,
      },
    ],
  },
  //   {
  //   link: Json.menu.concept, //page concept a modifier 
  //   icon: ConceptOn,
  //   iconOff:ConceptOn,
  //   topNavArg: [
  //     {
  //       link: Json.menu.concept, to: () => <ConceptScreen /> },
  //   ],
  // },
  // {
  //   link: Json.menu.news, // page News
  //   icon: NewsOn,
  //   iconOff:NewsOn, // ne fonctionne pas
  //   topNavArg: [
  //     {
  //       link: Json.menu.news, to: () => <MessagesScreen /> },
  //   ],
  // },
  // {
  //   link: Json.menu.contact, // page Contact us
  //   icon: ContactOn,
  //   iconOff:ContactOn,
  //   topNavArg: [
  //     {
  //       link: Json.menu.contact, to: () => <MessagesScreen /> },
  //   ],
  // },
  {
    link: bottomNav.maps.title, //page concept a modifier 
    icon: MapOn,
    iconOff:MapOn,
    topNavArg: [
      // {
      //   link: bottomNav.maps.topNav.users,
      //   to: () => <MapsScreen fromStack="users" />,
      // },
      { link: "maps", to: () => <MessagesScreen /> },

    ],
  },
  {
    link: bottomNav.notifications.title,
    icon: NotificationOn,
    iconOff:NotificationOff,
    topNavArg: [
      {
        link: bottomNav.notifications.topNav.info.title,
        to: () => <NotificationsScreen />,
      },
      {
        link: bottomNav.notifications.topNav.manage.title,
        to: () => <NotificationsScreen />,
      },
      {
        link: bottomNav.notifications.topNav.interaction.title,
        to: () => <NotificationsInteractScreen />,
      },
    ],
  },
  {
    link: bottomNav.messages.title,
    icon: MessengerOn,
    iconOff:MessengerOn,
    topNavArg: [

      { link: "message", to: () => <MessagesScreen /> },
      // { link: "first", to: () => <ChatListScreen /> },
      // { link: "second", to: () => <MessagesScreen /> },
      // { link: "third", to: () => <MessagesScreen /> },
      // { link: "fourth", to: () => <MessagesScreen /> },
      // { link: "fifth", to: () => <MessagesScreen /> },
    ],
  },
];

export default navigation;
