import ActivitiesScreen from "../pages/ActivitiesScreen";
import MembersScreen from "../pages/MembersScreen";
import MapsScreen from "../pages/MapsScreen";

import NotificationsScreen from "../pages/NotificationsScreen";
import NotificationsInteractScreen from "../pages/NotificationsInteractScreen";
// import MessagesScreen from "../pages/MessagesScreen";
// import ContactScreen from "../pages/ContactScreen";
// import FilterScreen from '../pages/FilterScreen';

// import NotReady from "../pages/NotReady";

import Json from "../assets/json/en.json";
import MyActivities from "../pages/MyActivitiesScreen";
//import icon
import CalendarOn from '../assets/images/calendar-on.svg'                                   
import CalendarOff from '../assets/images/calendar-off.svg'
import MessengerOn from '../assets/images/messenger-on.svg'
import Messengeroff from '../assets/images/messenger-off.svg'
import PeopleOn from '../assets/images/people-on.svg';
import PeopleOff from '../assets/images/people-off.svg';
import MapOn from '../assets/images/map-on.svg';
import MapOff from '../assets/images/map-off.svg';
import NotificationOn from '../assets/images/bell-on.svg'
import NotificationOff from '../assets/images/bell-off.svg'
import ChatListScreen from "../pages/ChatListScreen";

// Menu that shows Member pages 

const { bottomNav } = Json;

const navigation = [
  {
    link: bottomNav.activities.title,
    icon: CalendarOn,
    iconOff:CalendarOff,
    topNavArg: [
      {
        link: bottomNav.activities.topNav.calendar.title,
        to: () => <ActivitiesScreen fromStack="calendar" />,
      },
      { link: "My activities", to: () => <MyActivities /> }
    ],
  },
  {
    link: bottomNav.members.title,
    icon: PeopleOn,
    iconOff:PeopleOff,
    topNavArg: [
      { link: "male", to: () => <MembersScreen fromStack="male" /> },
      {
        link: bottomNav.members.topNav.pro,
        to: () => <MembersScreen fromStack="pro" />,
      },
      { link: "female", to: () => <MembersScreen fromStack="female" /> },
    ],
  },
  {
    link: bottomNav.maps.title,
    icon: MapOn,
    iconOff:MapOff,
    topNavArg: [
      // {
      //   link: bottomNav.maps.topNav.users,
      //   to: () => <MapsScreen fromStack="users" />,
      // },
      {
        link: bottomNav.maps.topNav.activities,
        to: () => <MapsScreen fromStack="activities" />,
      },
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
    iconOff:Messengeroff,
    topNavArg: [
      { link: "first", to: () => <ChatListScreen /> },
      // { link: "second", to: () => <MessagesScreen /> },
      // { link: "third", to: () => <MessagesScreen /> },
      // { link: "fourth", to: () => <MessagesScreen /> },
      // { link: "fifth", to: () => <MessagesScreen /> },
    ],
  },
];

export default navigation;
