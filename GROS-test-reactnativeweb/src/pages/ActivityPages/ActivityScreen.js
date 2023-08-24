/* 🇫🇷 Page de détails d'une activité(Figma Frames 41 à 44 MVP)
A faire: 
- Traduction automatique de la description de l'activité (via countriesListRectFlags et CountriesGrid)
- Remplacement des valeurs dans Interested et Followers par des valeurs dynamiques
- Programmation des boutons (il manque la programmation du boutton de suppression d'un participant, en tant qu'admin ou organisateur)
- Amélioration du code indiquant l'adresse, à côté de l'icône de position
🇫🇷 */

/* 🇬🇧 Activity details page (Figma Frames 41 to 44 MVP)
To do: 
- Automatic activity description translation (via countriesListRectFlags and CountriesGrid)
- Replacement of the Interested and Followers values by dynamic ones
- Program the buttons (we need to prorm the button that deletes an attendee, as an admin or the organizer)
- Improvment of the code that displays the address, at the right of the position icon
🇬🇧 */
//🇫🇷 Detail d'un évenement (Frame 41 sur Figma)
//🇬🇧 Details of one event (Frame 41 of Figma)
import locationPin from "../../assets/images/location-pin.svg";
import Picker from "emoji-picker-react";
import Geolocation from "@react-native-community/geolocation";
import locationIconDark from "../../assets/images/icons8-location-64.png";
import React, { useState, useRef, useEffect } from "react";
import { hostname } from "../../../../mvp-reactnative/backendconnect/hostname.js";
import {
  Text,
  ScrollView,
  Image,
  View,
  SafeAreaView,
  TouchableOpacity,
  Linking,
  TextInput,
  Modal,
} from "react-native";
import styles from "../Styles/ActivityScreenCss";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

// Components
import Marker from "react-native-web-maps/dist/Marker";
import MapView, { PROVIDER_GOOGLE } from "react-native-web-maps";
import EventButton from "../../components/EventButton";
import SubButton from "../../components/SubUnsubButton";
import MiddleNav from "../../navigation/MiddleNav";
// import SwitchBtn from "../components/SwitchBtn";
import CountriesListRectFlags from "../../components/CountriesList";
import DeleteActivityDialog, {
  CancelParticipationDialog,
  AddressAlertDialog,
  DeleteRepeatEventDialog,
  FriendsInfos,
} from "../../components/Dialogs";
import { PermissionsAndroid, Platform, Button } from "react-native";

//import all the components we are going to use.
// SVG imports
import GooglePicto from "../../assets/images/googlemaps.svg";
import locationOff from "../../assets/images/placeholder-off.svg";
import locationOn from "../../assets/images/placeholder-on.svg";
// import ChatGroup from "../assets/images/chatGroup.svg";
// import ChatNotif from "../assets/images/chatNotif.svg";
// import Interested from "../assets/images/interested.svg";
// import Follower from "../assets/images/follower.svg";
// import Participant from "../assets/images/participant.svg";
import Info from "../../assets/images/info.svg";
import Men from "../../assets/images/men.svg";

// import Jared from "../assets/images/jared.svg";
// import LoveActivated from "../assets/images/heartRed.svg";
// import LoveDeactivated from "../assets/images/heartGrey.svg";
import location from "../../assets/images/ic_location_on_128_28437.png";
import Dollar from "../../assets/images/dollar.svg";
import Trash from "../../assets/images/trashcan.svg";
import Edit from "../../assets/images/Iconedit.svg";
import Share from "../../assets/images/share.svg";
import messageEmoji from "../../assets/images/messageEmoji.png";
import France from "../../assets/flags-svg/france.svg";
import CameraSvg from "../../assets/images/camera.svg";
import fbPage from "../../assets/images/fbPage.svg";
import fbGroup from "../../assets/images/fbGroup.svg";
import HappyOFF from "../../assets/images/happyOff.svg";
import HappyON from "../../assets/images/happyOn.svg";

import otherLink from "../../assets/images/otherLink.svg";
import whatsappLink from "../../assets/inviteFriends-icons/whatsappIcon.svg";
import meetupLink from "../../assets/images/meetup.svg";
import telegramLink from "../../assets/images/telegram.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Icon } from "@rneui/themed";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import io from "socket.io-client";
const socket = io(`${hostname}`); // Remplacez l'URL par celle du serveur
import { useRoute } from "@react-navigation/native";
import CommentBubble from "../../components/CommentBubble.js";
import AttendeeCard from "../../components/AttendeeCard.js";
// FR Variable json se trouvant dans en.json permet de faire la traduction des differentes langues
// GB Json variable located in en.json allows the translation of different languages
import ActivityPhotoForChat from "../../components/ActivityPhotoForChat";
const ActivityScreen = ({ user, scr }) => {
  const [currentLongitude, setCurrentLongitude] = useState(null);
  const [currentLatitude, setCurrentLatitude] = useState(null);
  const [sendLocation, setSendLocation] = useState(null);
  const getRegionForCoordinates = (points) => {
    // points should be an array of { latitude: X, longitude: Y }
    let minX, maxX, minY, maxY;

    // init first point
    ((point) => {
      minX = point.latitude;
      maxX = point.latitude;
      minY = point.longitude;
      maxY = point.longitude;
    })(points[0]);

    // calculate rect
    points.map((point) => {
      minX = Math.min(minX, point.latitude);
      maxX = Math.max(maxX, point.latitude);
      minY = Math.min(minY, point.longitude);
      maxY = Math.max(maxY, point.longitude);
    });

    const midX = (minX + maxX) / 2;
    const midY = (minY + maxY) / 2;
    const deltaX = maxX - minX;
    const deltaY = maxY - minY;

    return {
      latitude: midX,
      longitude: midY,
      latitudeDelta: deltaX,
      longitudeDelta: deltaY,
    };
  };
  useEffect(() => {
    if (currentLatitude !== null && currentLongitude !== null) {
      const points = [
        { latitude: currentLatitude, longitude: currentLongitude },
      ];

      const sendLocation = getRegionForCoordinates(points);
      setSendLocation(sendLocation);
    }
  }, [currentLatitude, currentLongitude]);
  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === "ios") {
        getOneTimeLocation();
        subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: "Location Access Required",
              message: "This App needs to Access your location",
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            getOneTimeLocation();
            subscribeLocationLocation();
          } else {
            return;
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    return () => {
      Geolocation.clearWatch();
    };
  }, []);

  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);

        //Setting Longitude state
        setCurrentLatitude(currentLatitude);
      },
      (error) => {
        console.log(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      }
    );
  };

  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      (position) => {
        //Will give you the location on location change

        setLocationStatus("You are Here");
        console.log(position);

        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);

        //Setting Latitude state
        setCurrentLatitude(currentLatitude);
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000,
      }
    );
  };

  const [chosenEmoji, setChosenEmoji] = useState(false);
  const [selectOption, setSelectOption] = useState(false);

  const ref = useRef(null);
  const onEmojiClick = (emojiObject) => {
    console.log(emojiObject);
    const cursor = ref.current.selectionStart;
    const text =
      cmtText.slice(0, cursor) + emojiObject.emoji + cmtText.slice(cursor);
    setCmtText(text);
    const newCursor = cursor + emojiObject.emoji.length;
    setTimeout(() => {
      ref.current.setSelectionRange(newCursor, newCursor), 10;
    });
  };

  //🇫🇷 Déstructurer les accessoires nécessaires de l'objet scr
  //🇬🇧 Destructure the necessary props from the scr object
  const { activity, createActivity } = scr; //🇫🇷 Passsage de langue depuis app.js🇫🇷//🇬🇧 Language passed from app.js 🇬🇧
  const previewCanvasRef = useRef(null);
  const [disableButton, setDisbaleButton] = useState(true);
  const [activityImage, setActivityImage] = useState(null);
  const [topic, setTopic] = useState(2);

  const route = useRoute();
  const [event, setEvent] = useState(route.params.event); //🇫🇷 Passsage d'info activité🇫🇷//🇬🇧 info activity passed 🇬🇧

  //🇫🇷 Récupérer le rôle de l'utilisateur connecté
  //🇬🇧 Retrieve the connected user's role
  const connectedUserRole = user?.role.name[0];

  const [address, setAddress] = useState(event.address); //🇫🇷 Passsage d'adresse🇫🇷//🇬🇧 addresse passed 🇬🇧

  const [location, setLocation] = useState(JSON.parse(event.location)); //🇫🇷 Passsage de location🇫🇷//🇬🇧 location passed

  //🇫🇷 Code pour passer le nom d'activité sur le title du header de page, les valeurs sont transmis depuis le composant ActivityCard par react router, ensuite on utilise useLayoutEffect pour la modification de title dans le header🇫🇷
  //🇬🇧 Code to pass the activity name on the title of the page header, the values ​​are transmitted from the ActivityCard component by react router, then we use useLayoutEffect for the modification of title in the header🇬🇧
  const { pageTitle } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: pageTitle,
    });
  }, [navigation, pageTitle]);

  //console.log("Connected user role ActivityScreen: " + connectedUserRole);
  const premiumRoles = ["admin", "moderator"];

  const navigation = useNavigation();
  /*const { latitude, longitude, latitudeDelta, longitudeDelta } = JSON.parse(
    event.location
  );*/
  const [display, setDisplay] = useState(1);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [avatarList, setAvatarList] = useState([]);
  const [fullAttendeeListModalVisible, isFullAttendeeListModalVisible] =
    useState(false);
  const [nbPeople, setNbPeople] = useState();
  const [loading, setLoading] = useState(true);
  const [seeAll, setSeeAll] = useState(false);
  const [country, setCountry] = useState({
    language: "French",
    flag: <Image source={France} style={{ width: 36, height: 36 }} />,
  });

  const [descReadMoreBtn, setDescReadMoreBtn] = useState(false);
  const [findUsReadMoreBtn, setFindUsReadMoreBtn] = useState(false);

  //🇫🇷 Réglages du chat
  //🇬🇧 Chat settings
  const [allowNotifications, setAllowNotifications] = useState(false);
  const [joinInNotification, setJoinInNotification] = useState(false);
  const [notificationSound, setNotificationSound] = useState(false);

  //🇫🇷 Options des particiapants
  //🇬🇧 Attendees options
  const [isOrganizer, setIsOrganizer] = useState(false);

  /*🇫🇷 false = participant / true = organisateur*/
  /*🇬🇧 false = attendee / true = organizer*/

  const [liked, setLiked] = useState(false);
  const [message, setMessage] = useState("");
  if (!event.isOnline && event.address.includes(",")) {
    var splitAddress = event.address.split(", ");
    var zipCode = splitAddress[splitAddress.length - 2].slice(0, 5);
  }
  //const splitAddress = event.address;
  //event.address ? splitAddress = event.address.split(", ") : splitAddress = "No address";
  //const zipCode = splitAddress[splitAddress.length - 2].slice(0, 5);

  const [dialogResult, setDialogResult] = useState(false);

  const [deleteActivityDialogVisible, setDeleteActivityDialogVisible] =
    useState(false);
  const [
    cancelParticipationDialogVisible,
    setCancelParticipationDialogVisible,
  ] = useState(false);
  const [addressAlertDialogVisible, setAddressAlertDialogVisible] =
    useState(false);
  const [deleteRepeatEventDialogVisible, setDeleteRepeatEventDialogVisible] =
    useState(false);
  const [friendsInfosShow, setFriendsInfosShow] = useState(false);

  const [isParticipating, setIsParticipating] = useState(null);
  const [attendees, setAttendees] = useState([]);

  // const [waitingList, setWaitingList] = useState(event.waitingList);
  // if (waitingList === undefined) setWaitingList([]);
  const [waitingListModalVisible, isWaitingListModalVisible] = useState(false);

  const [eventHoster, setEventHoster] = useState(null);

  const [connectedUser, setConnectedUser] = useState();

  const [comments, setComments] = useState([]);
  const [cmtText, setCmtText] = useState("");
  const [reload, setReload] = useState(false);

  //🇫🇷 Récupérer les commentaires de l'activité
  //🇬🇧 Fetch comments for the activity
  useEffect(() => {
    axios.get(`${hostname}/api/v1/comments/${event._id}`).then((res) => {
      setComments(res.data);
    });
  }, [reload]);

  //🇫🇷 Gérer le changement de texte dans la saisie de commentaire
  //🇬🇧 Handle text change in comment input
  const handleTextChange = (text) => {
    setCmtText(text);
  };
  useEffect(() => {
    // Connexion au serveur socket.io
    socket.connect();
    // Écoute des événements "receive_message" pour recevoir de nouveaux messages
    socket.on("receive_message", async (message) => {
      console.log("receive");
      await axios
        .get(`${hostname}/api/v1/comments/${event._id}`)
        .then((res) => {
          setComments(res.data);
        });
    });

    // Écoute des événements "new_notification" pour recevoir de nouvelles notifications
    socket.on("new_notification", (notification) => {
      // Traitez la notification comme vous le souhaitez (ex: affichage d'une alerte)
    });

    // Nettoyage des écouteurs d'événements lors du démontage du composant
    return () => {
      socket.disconnect();
      socket.off("new_notification");
    };
  }, []);

  //🇬🇧 Send a comment for the activity

  const sendComment = async () => {
    if (activityImage !== null && connectedUser) {
      const resp = await axios.post(`${hostname}/api/v1/comments/create`, {
        image: activityImage,
        comment: cmtText,
        user: connectedUser._id,
        activity_id: event._id,
      });
      setCmtText("");
      setSendLocation(null);
      setActivityImage(null);
      setCurrentLatitude(null);
      setCurrentLongitude(null);
      setSelectOption(false);
      // switch reload to trigger comments reload
      setReload(!reload);
      // alert socket for
      socket.emit("send_message", {
        author: cmtText,
        message: cmtText,
      });
    }
    if (
      sendLocation !== null &&
      currentLatitude !== null &&
      currentLatitude !== null &&
      connectedUser
    ) {
      await axios
        .post(`${hostname}/api/v1/comments/create`, {
          location: sendLocation,
          comment: cmtText,
          user: connectedUser._id,
          activity_id: event._id,
        })
        .then(() => {
          setCmtText("");
          setSendLocation(null);
          setActivityImage(null);
          setCurrentLatitude(null);
          setCurrentLongitude(null);
          setSelectOption(false);
          // switch reload to trigger comments reload
          setReload(!reload);
          // alert socket for
          socket.emit("send_message", {
            author: cmtText,
            message: cmtText,
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    if (
      cmtText &&
      cmtText.length > 0 &&
      sendLocation === null &&
      currentLatitude === null &&
      currentLongitude === null &&
      activityImage === null &&
      connectedUser
    ) {
      await axios
        .post(`${hostname}/api/v1/comments/create`, {
          comment: cmtText,
          user: connectedUser._id,
          activity_id: event._id,
        })
        .then(() => {
          // alert socket for
          setReload(!reload);
          setCmtText("");
          setSendLocation(null);
          setCurrentLatitude(null);
          setCurrentLongitude(null);
          setSelectOption(false);
          setActivityImage(null);
          socket.emit("send_message", {
            author: cmtText,
            message: cmtText,
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const deleteComment = async (commentId) => {
    await axios.delete(`${hostname}/api/v1/comments/${commentId}`);
    // switch reload to trigger comments reload
    setReload(!reload);
  };

  //🇫🇷 Vérifiez si le lien commence par "https://" ou "http://"
  //🇬🇧 Check if the link starts with "https://" or "http://"
  const openLink = (linkToOpen) => {
    if (linkToOpen.startsWith("https://") || linkToOpen.startsWith("http://")) {
      Linking.openURL(linkToOpen);
    } else {
      alert("Url not valid");
    }
  };

  //🇫🇷 Hook useEffect pour récupérer les données lorsque le composant est monté
  //🇬🇧 useEffect hook to fetch data when the component mounts
  useEffect(() => {
    const getIfUserParticipate = async () => {
      const token = await AsyncStorage.getItem("userToken");
      console.log("token", token);
      const response1 = await axios.post(
        `${hostname}/api/v1/user/get-user-by-token`,
        { token }
      );

      const { user } = response1.data;
      setConnectedUser(user); //🇫🇷 Mettre à jour l'état de l'utilisateur connecté avec l'utilisateur récupéré //🇬🇧 Update the connectedUser state with the retrieved user

      if (event.attendees && event.attendees.includes(user._id)) {
        //🇫🇷 Définit l'état isParticipating sur true si l'utilisateur est inclus dans la liste des participants
        //🇬🇧 Set the isParticipating state to true if the user is included in the attendees list
        setIsParticipating(true);
      } else {
        //🇫🇷 Définissez l'état isParticipating sur false si l'utilisateur n'est pas inclus dans la liste des participants
        //🇬🇧 Set the isParticipating state to false if the user is not included in the attendees list
        setIsParticipating(false);
      }
    };

    getIfUserParticipate();
  }, []);

  //🇫🇷 Fonction pour souscrire à l'activité
  //🇬🇧 Function to subscribe to the activity
  const subscribe = async () => {
    console.log("Subscribe");
    const token = await AsyncStorage.getItem("userToken");
    const response = await axios.post(
      `${hostname}/api/v1/activities/join`,
      { id: event._id },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    console.log(response.data);

    if (response && response.data && response.data.result === "OK") {
      var tmpEvent = event;
      if (response.data.addedToWaitingList) {
        console.log("Added to waiting list");
      } else if (event.attendees) {
        console.log("response Data userid: " + response.data.userId);
        tmpEvent.attendees.splice(1, 0, response.data.userId);
      } else {
        tmpEvent.attendees = [response.data.userId];
      }

      console.log("Attendee list after participating: " + tmpEvent.attendees);
      //🇫🇷 Mettre à jour l'état de l'événement avec la liste des participants mise à jour
      //🇬🇧 Update the event state with the updated attendee list
      setEvent(tmpEvent);
    }
    setIsParticipating(true);
    setDisplay(2);
  };

  //🇫🇷 Fonction pour se désinscrire de l'activité
  //🇬🇧 Function to unsubscribe from the activity
  const unsubscribe = async () => {
    console.log("unsubscribe");
    const token = await AsyncStorage.getItem("userToken");
    const response = await axios.post(
      `${hostname}/api/v1/activities/leave`,
      { id: event._id },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    if (response && response.data && response.data.result === "OK") {
      console.log(response.data);
      var tmpEvent = event;
      if (event.attendees && response.data.index !== -1) {
        let userIndex = event.attendees.findIndex(
          (attendee) => attendee === connectedUser._id
        );
        console.log(userIndex);
        //🇫🇷  J'ai créé la variable userIndex (ligne 106) et l'ai mise à la place de response.data.index parce-que le response.data renvoyait toujours 2 pour je ne sais quelle raison, du coup, ça n'enlevait pas le bon avatar
        // I created the userIndex variable (line 106) and put it instead of response.data.index because the response.data always returned 2 for some reason, so it doesn't was not removing the correct avatar
        tmpEvent.attendees.splice(userIndex, 1);
      }
      console.log("Attendee list after unsubscribing: " + tmpEvent.attendees);
      setEvent(tmpEvent);
    }
    setIsParticipating(false);
  };
  //🇫🇷 suprimer une activiter après avoir fini de se conecter a notre firebase de hostname.js
  /// 🇫🇷  api/v1/activities/removeone/${event._id} "
  /// il se trouve dans le backendconnect/hostname.js
  //🇬🇧 remove an activity from this page /api/v1/activities/removeone/${event._id}
  const deleteActivity = async () => {
    console.log("deleteActivity called");
    const token = await AsyncStorage.getItem("userToken");
    const response = await axios.delete(
      `${hostname}/api/v1/activities/removeone/${event._id}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    console.log(response.data);
    //🇫🇷 si ma reponnse qui me redirige sur la page /api/v1/activities/removeone/${event._id}`  et que ce meme reponse.data  etla
    //meme reponse.data.result n'est pas ok dit qur ce fichier est supprimer et nnavigue sur activities
    //🇬🇧 if my response which redirects me to the page /api/v1/activities/removeone/${event._id}` and this same response.data is the
    //same answer.data.result is not ok says that this file is deleted and nnavigates to activities
    if (response && response.data && response.data.result === "OK") {
      console.log("activity deleted");

      //🇫🇷 Accédez à la page "Activités" si l'activité est supprimée avec succès
      //🇬🇧 Navigate to the "Activities" page if the activity is deleted successfully
      navigation.navigate("Activities");
    } else {
      console.log("error", response.data);
    }
  };
  //Montage
  //🇫🇷 Hook useEffect pour récupérer les données d'avatar et de participant lorsque le composant est monté ou lorsque l'état isParticipating change
  //🇬🇧 useEffect hook to fetch avatar and attendee data when the component mounts or when the isParticipating state changes
  useEffect(() => {
    const fetchAvatar = async () => {
      const token = await AsyncStorage.getItem("userToken");
      // console.log(event.attendees, "attttttttttttttt");
      const { data } = await axios.post(
        `${hostname}/api/v1/user/getavatarlistfromids`,
        {
          indexs: event.attendees,
        },
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );
      setNbPeople(data.result.length);
      let list = data.result;
      // if (list.length > 3) list = list.slice(0, 4);
      // 🇫🇷 4 avatars sont affichés
      // 🇬🇧 4 avatars are displayed
      setAvatarList(list);
      setAttendees(list);
      console.log("AvatarList: " + avatarList);
      console.log("Attendees", list);

      const evthoster = list.filter((e) => e._id === event.author);
      console.log("hoster", evthoster, event.author);
      if (evthoster && evthoster.length > 0) {
        setEventHoster(evthoster[0]);
      }
      setLoading(false);
    };
    try {
      fetchAvatar();
    } catch (error) {
      console.log("Error: " + error);
    }
  }, [event, isParticipating]);

  useEffect(() => {
    event.author === user._id ? setIsOrganizer(true) : setIsOrganizer(false);
  }, []);
  console.log("Is organizer: " + isOrganizer);

  if (loading) return;

  //Méthode permettant de supprimer une activité
  const displayDeleteActivityDialog = () => {
    setDeleteActivityDialogVisible(!deleteActivityDialogVisible);
  };
  //Méthode permettant d'annuler la participation d'une activité
  const displayCancelParticipationDialog = () => {
    setCancelParticipationDialogVisible(!cancelParticipationDialogVisible);
  };
  //Méthode permettant de donner une alerte à une adresse
  const displayAddressAlertDialog = () => {
    setAddressAlertDialogVisible(!addressAlertDialogVisible);
  };

  const displayDeleteRepeatEventDialog = () => {
    setDeleteRepeatEventDialogVisible(!deleteRepeatEventDialogVisible);
  };

  if (
    (display === 2 && !isParticipating) ||
    (display === 2 && !premiumRoles.includes(connectedUserRole))
  ) {
    () => displayAddressAlertDialog();
  }
  const handleUnsubscribeUser = (userId) => {
    setAttendees((prevAttendees) =>
      prevAttendees.filter((attendee) => attendee._id !== userId)
    );
  };
  // console.log(event.activityImage)

  return (
    <SafeAreaView
      style={styles.container}
      key={Math.floor(Math.random() * 1000)}
    >
      <ScrollView contentContainerStyle={styles.center}>
        {/*Fenêtre popup pour la suppression de l'activité */}
        {/*Confirmation pop-up before deleting the event*/}
        {/* 🇫🇷 langue passé pour tous les elements avec la propieté scr 🇫🇷 */}
        {/* 🇬🇧 language passed for all components with scr propiety 🇬🇧 */}

        <DeleteActivityDialog
          dialogVisible={deleteActivityDialogVisible}
          displayModal={displayDeleteActivityDialog}
          deleteActivity={deleteActivity}
          scr={scr}
        />

        <CancelParticipationDialog
          dialogVisible={cancelParticipationDialogVisible}
          displayModal={displayCancelParticipationDialog}
          unsubscribe={unsubscribe}
          scr={scr}
        />

        <AddressAlertDialog
          dialogVisible={addressAlertDialogVisible}
          displayModal={displayAddressAlertDialog}
          subscribe={subscribe}
          scr={scr}
        />

        <DeleteRepeatEventDialog
          dialogVisible={deleteRepeatEventDialogVisible}
          displayModal={displayDeleteRepeatEventDialog}
          state={dialogResult}
          setState={setDialogResult}
          scr={scr}
        />

        <FriendsInfos
          isVisible={friendsInfosShow}
          setIsVisible={setFriendsInfosShow}
          scr={scr}
        />

        {/* 🇫🇷 Enlever le || display === 3 quand il faudra rajouter les options de chat 🇫🇷 */}
        {/* 🇬🇧 Remove the -- display === 3 when you will need to ad the chat options 🇬🇧 */}

        <View style={ styles.mapViewStyle } >
          <View style={ styles.mapSubView }>
            {/* 🇫🇷 Code pour faire aficher la location quand on appui sur adresse sur midNav, il reste à faire le cas si l'evenement est online 🇫🇷 */}
            {/* 🇬🇧 Code to display the location when you press on address on midNav, it remains to do the case if the event is online 🇬🇧 */}
            {display === 2 ? (
              <MapView style={styles.map} region={location}>
                <Marker
                  coordinate={location}
                  pinColor="#3A8569"
                  title={address}
                />
              </MapView>
            ) : (
              <Image
                style={styles.header}
                source={{ uri: event.activityImage }}
                resizeMode="contain"
              />
            )}
            {/* 🇫🇷 Pour afficher dollar sur image de l'activité avec prix 🇫🇷 */}
            {/* 🇬🇧for show dollar over image activity with price  🇬🇧 */}
            {event.hasPrice && !(display === 2) ? (
              <Image source={Dollar} style={ styles.dollarImgStyle} />
            ) : null}
            {isParticipating || premiumRoles.includes(connectedUserRole) ? (
              <View style={ styles.eventAddressStyle } >
                <Text style={ styles.eventAddressTxt }>
                  {event.address}
                </Text>
                <Text style={ styles.swipeDownTxt }>
                  {activity._2022e_swipeDownForMoreInfos}
                </Text>
              </View>
            ) : null}
          </View>
        </View>

        <View style={styles.legend}>
          <Text
            style={ styles.titleTxtStyle } >
            {event.title}
          </Text>

          <View style={ styles.legendSubViewStyle } >
            <Text style={ styles.startTimeTxt }>
              {event.startTime}
            </Text>
            <Text style={ styles.dateTxtStyle } >
              {event.date}
            </Text>
          </View>

          <View style={ styles.eventHosterView } >
            {eventHoster && (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Profile", { user: eventHoster })
                }
              >
                <View style={ styles.eventHosterSubView }>
                  <Image
                    source={eventHoster.avatar}
                    style={ styles.eventHosterImg }
                  />
                  {/* <Image source={{ uri: eventHoster.avatar }} />  */}
                  <View style={{ width: 7 }} />
                  <View>
                    <Text
                      style={[
                        styles.userInfos,
                        { color: "blue", fontSize: 15 },
                      ]}
                    >
                      {eventHoster.firstName}
                    </Text>
                    {/* <Text style={styles.userInfos}>4.5/5</Text>
                <Text style={styles.userInfos}>39 pts - 29 y-o</Text> */}
                  </View>
                </View>
              </TouchableOpacity>
            )}

            <View style={ styles.googlePictoView }>
              <Image
                source={GooglePicto}
                style={ styles.googlePictoImg }
              />
              {!event.isOnline && event.address.includes(",") ? (
                <Text style={ styles.zipCodeTxt }>
                  {zipCode}
                  {/* ENG - I split the address to extract the zip code - ENG */}
                  {/* FR - J'ai découpé l'adresse pour extraire le code postal -FR */}
                </Text>
              ) : (
                <Text></Text>
              )}
            </View>
            {/* <Image source={LoveActivated} /> */}
          </View>
        </View>

        {/*🇫🇷 Composant de navigation MiddleNav propre à l'activité. Il contient 4 onglets
        et le props display sert à changer l'affichage sous l'onglet séléctionné. */}
        {/*🇬🇧 MiddleNav is a navigation component specific to the current event. It has 4
        tabs and the props called "display" changes the display below the selected tab */}
        <MiddleNav
          comments={comments}
          display={display}
          setDisplay={setDisplay}
          isParticipating={isParticipating}
          connectedUserRole={connectedUserRole}
          addressAlertDialogVisible={addressAlertDialogVisible}
          setAddressAlertDialogVisible={setAddressAlertDialogVisible}
          scr={scr}
        />
        {/* 🇫🇷 scr pour Passsage de langue à middleNAv depuis ActivityScreen.js🇫🇷
                                    🇬🇧 scr for Language passed from ActivityScreen.js 🇬🇧 */}
        {/*🇫🇷 Onglet 1: Description (Figma Frame 41 MVP)*/}
        {/*🇬🇧 Tab 1: Description (Figma Frame 41 MVP)*/}
        {display === 1 && (
          <>
            {/* <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center"
              }}
            >
              <View style={styles.activityStats}>
                <Text style={{ fontSize: 15, marginRight: 5 }}>Interested</Text>
                <View style={{ marginLeft: 5, position: "relative" }}>
                  <Icon name="circle" type="font-awesome" size={32} color="#59C09B" />
                  <Text
                    style={{
                      width: "100%",
                      textAlign: "center",
                      color: "#E1F4ED",
                      fontSize: 12,
                      fontWeight: "bold",
                      position: "absolute",
                      top: 7
                    }}
                  >
                    99+
                  </Text> */}
            {/*FR Ce texte affichera le nombre de participants à l'activité (à récupérer dans le back-end)
                   Penser à afficher 99+ lorsqu'il y en a plus de 100. */}
            {/*GB This text will display the dynamic data about how many people currently follow the event.
                   Putting an if(data > 100) and displaying 99+ would be nice, here */}
            {/* </View>
              </View>
              <View style={{ width: 50 }} />
              <View style={styles.activityStats}>
                <Text style={{ fontSize: 15, marginRight: 5 }}>Followers</Text>
                <View style={{ marginLeft: 5, position: "relative" }}>
                  <MaterialCommunityIcons name="heart-outline" size={38} color="#DA0E45" />
                  <Text
                    style={{
                      width: "100%",
                      textAlign: "center",
                      color: "#4D0418",
                      fontSize: 12,
                      fontWeight: "bold",
                      position: "absolute",
                      top: 10
                    }}
                  >
                    25
                  </Text> */}
            {/*FR Ce texte affichera le nombre de participants à l'activité (à récupérer dans le back-end)
                   Penser à afficher 99+ lorsqu'il y en a plus de 100. */}
            {/*GB This text will display the dynamic data about how many people currently follow the event.
                   Putting an if(data > 100) and displaying 99+ would be nice, here */}
            {/* </View>
              </View>
            </View> */}
  
  <View style={{flexDirection:"row"}}>
     
    <ScrollView
      horizontal={true} // Set horizontal to true to make it scrollable horizontally
      showsHorizontalScrollIndicator={false} // Optional: Hide the horizontal scroll bar.
      //contentContainerStyle={{flexDirection:'row-reverse'}}
    >
       <View style={ styles.scrollViewStyle } >
        <View style={ styles.scrollSubViewStyle }>
                {avatarList.map((o, index) => {
                  return (
                    <TouchableOpacity
                      key={`touchable_${index}`}
                      onPress={() =>
                        navigation.navigate("Profile", { user: o })
                      }
                    >
                      {/* Commentaire */}
                      <Image
                        source={{ uri: o.avatar }}
                        style={ styles.scrollViewImg }
                      />
                    </TouchableOpacity>
                  );
                })}
        </View>
              
    </View>

    </ScrollView>

      <View style={ styles.nbrFriendsStyle }>

      {event.nbFriends > 0 && (
                <TouchableOpacity onPress={() => setFriendsInfosShow(true)}>
                  <View style={{ marginRight:15}}>
                    <Image
                      source={Info}
                      style={{ width: 42, height: 42 }}
                      resizeMode="contain"
                    />

                    <View style={ styles.nbrFriendsView }>
                      <Text style={ styles.nbrFriendsTxt }>
                        +{event.nbFriends}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              

              {!event.isAttendeeLimited && (
                
                <View>
                  <Image
                    source={Men}
                    style={{ width: 42, height: 42}}
                    resizeMode="contain"
                  />
                  {event.attendees && (
                    <Text style={{ textAlign: "center" }}>
                      {event.nbFriends
                        ? event.attendees.length + event.nbFriends
                        : event.attendees.length}
                      / {event.attendeeLimit}
                    </Text>
                  )}

                  {!event.attendees && (
                    <Text style={ styles.attendeeTxt }>
                      {event.nbFriends ? event.nbFriends : 0}/
                      {event.attendeeLimit}
                    </Text>
                  )}
                </View>
              )}

              {event.isAttendeeLimited && (
                <View style={{ marginRight:30}}>
                  <Image source={Men} style={{width:42, height:42}} resizeMode="contain"/>
                  {event.attendees && (
                    <Text style={{ textAlign: "center" }}>
                      {event.nbFriends
                        ? event.attendees.length + event.nbFriends
                        : event.attendees.length}
                    </Text>
                  )}

                  {!event.attendees && (
                    <Text style={ styles.attendeeTxt }>
                      {event.nbFriends ? event.nbFriends : 0}
                    </Text>
                  )}
                </View>
                
              )}
    </View>
  </View>
    

            <View style={styles.inviteOrParticipate}>
              {/*🇫🇷 Définir la logique pour l'invitation en cliquant sur Invite*/}
              {/*🇬🇧 The code managing invitations is missing*/}
              <SubButton
                isParticipating={isParticipating}
                subscribe={subscribe}
                setIsParticipating={setIsParticipating}
                cancelParticipationDialogVisible={
                  cancelParticipationDialogVisible
                }
                setCancelParticipationDialogVisible={
                  setCancelParticipationDialogVisible
                }
                scr={scr}
              />
            </View>

            <View style={{ width: "100%" }}>
              <View style={ styles.activityAboutView }>
                <Text style={styles.about}>{activity.about}</Text>
                {/*🇫🇷 La variable activity.about dans en.json permet d'afficher "A propos de l'activité"*/}
                {/*🇬🇧 The en.json variable activity.about displays "About the event"*/}
                {/*Mise en commentaire de la traduction des langue au niveau de la description de l'activité (a decommenter par la suite)*/}
                {/*
                <CountriesListRectFlags
                  country={country}
                  setCountry={setCountry}
                  scr={scr}
              />*/}
                {/*🇫🇷 Bouton pour choisir la langue (liste de drapeaux carrés par langue).*/}
                {/*🇬🇧 Language selection button (list of rectangular flags)*/}
              </View>
              {/*🇫🇷 Impossible de modifier la description de l'activité pour l'instant*/}
              {/*🇬🇧 Can't edit event description so far*/}
              <View style={[styles.longText]}>
                {/*
                    🇫🇷Pour modifier ou supprimer, in faut etre soit le propritaire de l'event ou avoir l'addresse email admin
                    🇬🇧To edit or delete you have to be the owner or an adamin
                  */}
                {connectedUser &&
                  (connectedUser._id === event.author ||
                    connectedUser.email === "jpi@socializus.org") && (
                    <View style={ styles.editActivityView} >
                      {/*🇫🇷 button pour edition d'activité, les info sont passés par route.params.event à ModifyActivityScreen, le type c'est pour le backend*/}
                      {/*🇬🇧 Button for edit activity, the infos is passed by route.params.event ModifyActivityScreen, le type c'est pour le backend*/}
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("Modify Activity", {
                            event,
                            type: "edit",
                          })
                        }
                      >
                        <Image
                          source={Edit}
                          style={{ width: 21, height: 21 }}
                        />
                      </TouchableOpacity>
                      {/*🇫🇷 Impossible de supprimer la description de l'activité pour l'instant, ce boutton marche pour suprimer l'activité complete*/}
                      {/*🇬🇧 Can't delete event description so far, this button delete all the activity*/}
                      <TouchableOpacity
                        onPress={() => displayDeleteActivityDialog()}
                      >
                        <Image
                          source={Trash}
                          style={{ marginLeft: 20, width: 20, height: 20 }}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                <Text style={[ styles.eventDescriptionTxt, { height: descReadMoreBtn ? null : 200, overflow: descReadMoreBtn ? null : "hidden" }]}>
                  {event.description}
                </Text>
                {/*🇫🇷 Ci-dessous button read more/ read less si la description a plus de 100 caracteres / 🇬🇧 below, button read more/read less if the description has more than 150 characters  */}
                {event.description.length > 100 && (
                  <TouchableOpacity
                    onPress={() => setDescReadMoreBtn(!descReadMoreBtn)}
                    style={ styles.descReamMoreBtnStyle } >
                    <Text style={styles.readMoreButton}>
                      {descReadMoreBtn ? activity.readLess : activity.readMore}
                      {/*"Read Less" : "Read More"*/}
                    </Text>
                  </TouchableOpacity>
                )}

                <View style={ styles.socialMediaBtns } >
                  {event.fbPageLink !== "" && (
                    <TouchableOpacity
                      onPress={() => {
                        openLink(event.fbPageLink);
                      }}
                    >
                      <Image
                        style={{ width: 35, height: 35 }}
                        source={fbPage}
                      />
                    </TouchableOpacity>
                  )}

                  {event.fbGroupLink !== "" && (
                    <TouchableOpacity
                      onPress={() => {
                        openLink(event.fbGroupLink);
                      }}
                    >
                      <Image
                        style={{ width: 35, height: 35 }}
                        source={fbGroup}
                      />
                    </TouchableOpacity>
                  )}

                  {event.otherLink !== "" && (
                    <TouchableOpacity
                      onPress={() => {
                        openLink(event.otherLink);
                      }}
                    >
                      <Image
                        style={{ width: 35, height: 35 }}
                        source={otherLink}
                      />
                    </TouchableOpacity>
                  )}

                  {event.whatsappLink !== "" && (
                    <TouchableOpacity
                      onPress={() => {
                        openLink(event.whatsappLink);
                      }}
                    >
                      <Image
                        style={{ width: 35, height: 35 }}
                        source={whatsappLink}
                      />
                    </TouchableOpacity>
                  )}

                  {event.telegramLink !== "" && (
                    <TouchableOpacity
                      onPress={() => {
                        openLink(event.telegramLink);
                      }}
                    >
                      <Image
                        style={{ width: 35, height: 35 }}
                        source={telegramLink}
                      />
                    </TouchableOpacity>
                  )}

                  {event.meetupLink !== "" && (
                    <TouchableOpacity
                      onPress={() => {
                        openLink(event.meetupLink);
                      }}
                    >
                      <Image
                        style={{ width: 35, height: 35 }}
                        source={meetupLink}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              <View style={styles.inviteOrParticipate}>
                {/* <EventButton
                  type="Help & Organize"
                  bgColor={"orange"}
                  colorText={"white"}
                />
                <View style={{ width: "5%" }} /> */}
                {connectedUserRole !== "user without confirmation" && (
                  <EventButton
                    title={activity.CopyPaste}
                    type="Copy & Paste event"
                    bgColor={"lightgray"}
                    onPress={() =>
                      navigation.navigate("Copy Activity", {
                        event,
                      })
                    }
                  />
                )}
                {/*🇫🇷 avant s'affichait le type de buton, maintent c'est le title, pour permetre la traduction et pas deranger le composant EventButton */}
                {/*🇬🇧 before the button type was displayed, now it's the title, to allow translation and not disturb the EventButton component*/}
              </View>
              {event.hasPrice && (
                <View style={{ margin: 5 }}>
                  {/*🇫🇷 La logique permettant d'accéder à la billeterie en ligne est manquante*/}
                  {/*🇬🇧 The link to buy tickets online is missing*/}
                  <TouchableOpacity
                    onPress={() => openLink(event.ticketLink)}
                    style={styles.buyTicketButton}
                  >
                    <Text style={ styles.ticketLinkTxt } >
                      {/*🇫🇷 La variable activity.t2022_BuyTicket dans fr.json permet d'afficher "Acheter un ticket"*/}
                      {/*🇬🇧 The en.json variable activity.t2022_BuyTicket displays "Buy ticket"*/}
                      {activity.t2022_BuyTicket}
                    </Text>
                    <Icon
                      name="ticket"
                      type="font-awesome"
                      size={20}
                      color="dodgerblue"
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </>
        )}

        {/*🇫🇷 Onglet 2: Adresse "Où nous trouver" (Figma Frame 42 MVP)*/}
        {/*🇬🇧 Tab 2: Description "How to find us" (Figma Frame 42 MVP)*/}
        {display === 2 && (
          <View style={{ marginTop: 20, width: "100%" }}>
            <View style={ styles.aboutActView } >
              <Text style={styles.about}>{activity.how}?</Text>
              {/*🇫🇷 La variable activity.how dans en.json contient "how": "How to find us"*/}
              {/*🇬🇧 The en.json variable activity.how contains "how": "How to find us"*/}
              <CountriesListRectFlags
                country={country}
                setCountry={setCountry}
                scr={scr}
              />
            </View>
            <View style={[styles.longText]}>
              <Text style={[ styles.findUsTxt , { height: findUsReadMoreBtn ? null : 100, overflow: findUsReadMoreBtn ? null : "hidden" }]}>
                {event.howToFind}
              </Text>
              {/* Text: "How to find us?" */}
              {event.description.length > 100 && (
                <TouchableOpacity
                  onPress={() => setFindUsReadMoreBtn(!findUsReadMoreBtn)}
                  style={ styles.findUsBtn }>
                  <Text style={styles.readMoreButton}>
                    {findUsReadMoreBtn ? activity.readLess : activity.readMore}
                    {/*"Read Less" : "Read More"*/}
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.inviteOrParticipate}>
              {/* <EventButton
                type="Help & Organize"
                bgColor={"orange"}
                colorText={"white"}
              />
              <View style={{ width: "5%" }} /> */}

              <EventButton
                title={activity.CopyPaste}
                type="Copy & Paste event"
                bgColor={"lightgray"}
                onPress={() =>
                  navigation.navigate("Copy Activity", {
                    event,
                    type: "copy",
                  })
                }
              />
            </View>
          </View>
        )}

        {/*🇫🇷 Onglet 3: Commentaires participants/organisateurs (Figma Frame 43 MVP)*/}
        {/*🇬🇧 Tab 3: Hosts and attendees comments (Figma Frame 43 MVP)*/}
        {display === 3 && (
          <View style={ styles.commentsView }>
            <Text style={ styles.commentsTxt }>
              {activity.t2022_comments}
            </Text>

            {isParticipating || premiumRoles.includes(connectedUserRole) ? (
              <>
                <View>
                  {/* <Text
                      style={{
                        marginTop: 15,
                        color: "#5C5C5C",
                        fontSize: 12,
                        textAlign: "center",
                      }}
                    >
                      october 11th 2022
                    </Text> */}

                  {/* 🇫🇷Aller chercher le user à partir de son message (ou à l'aide de la liste des participants?) et envoyer les différentes données pour bien afficher la bulle de message via le composant.
              Le isOrganizer est true si l'utilisateur est le créateur de l'activité.
              */}
                  {/* 🇬🇧Get the user from his message (or using the list of participants?) and send the different data to properly display the message bubble via the component.
              The isOrganizer is true if the user is the creator of the activity.
              */}

                  {comments.map((comment, index) => (
                    <CommentBubble
                      //key={index}
                      key={`comment_${index}`} // clee unique pour eviter Each child in a list should have a unique 'key' prop".
                      comment={comment}
                      location={location}
                      address={address}
                      user={connectedUser}
                      connectedUserRole={connectedUserRole}
                      isOrganizer={isOrganizer}
                      handleDeleteComment={deleteComment}
                    />
                  ))}
                </View>
                {/** 🇫🇷notre view de  messageContainer*/}
                {/*** 🇬🇧our messageContainer view */}{" "}
                <View style={styles.messageContainer}>
                  <View style={styles.messageInput}>
                    {/** 🇫🇷saisi de textInput*/}
                    {/** 🇬🇧entered from textInput*/}{" "}
                    <TextInput
                      ref={ref}
                      style={styles.messageBox}
                      onChangeText={(text) => {
                        setChosenEmoji(false);
                        setCmtText(text);
                      }}
                      value={cmtText}
                      placeholder={activity.Vtype_message}
                      autoFocus={true}
                    />
                    {/** 🇫🇷ToucheOpacity est mis ici pourque l'utilisateur puisse cliquer sur notre MaterialCommunityIcons  */}
                    {/** 🇬🇧ToucheOpacity is put here so the user can click on our MaterialCommunityIcons */}
                    {selectOption === false && (
                      <>
                        <TouchableOpacity
                          onPress={() => {
                            setSelectOption(!selectOption);
                          }}
                          style={ styles.selectOptionBtn }
                          //🇫🇷clique de l'icone plus
                          //🇬🇧click the icons
                        >
                          {/** 🇫🇷le nom de notre image est plus dans materialcommunityIcons  */}
                          {/** 🇬🇧 our image name is no longer in materialcommunityIcons */}
                          <MaterialCommunityIcons
                            name="plus"
                            color="#fffff"
                            size={28}
                          />
                        </TouchableOpacity>
                      </>
                    )}
                    {selectOption === true &&
                      currentLatitude === null &&
                      currentLongitude === null &&
                      activityImage === null && (
                        <>
                          <TouchableOpacity
                            onPress={() => {
                              setChosenEmoji(!chosenEmoji);
                            }}
                            style={ styles.chosenEmojiBtn }
                            //🇫🇷clique de l'icone plus
                            //🇬🇧click the icons
                          >
                            {/** 🇫🇷le nom de notre image est plus dans materialcommunityIcons  */}
                            {/** 🇬🇧 our image name is no longer in materialcommunityIcons */}
                            <Image
                              source={chosenEmoji ? HappyON : HappyOFF}
                              style={styles.image}
                            />{" "}
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              getOneTimeLocation();
                            }}
                            style={ styles.locationBtn}
                            //🇫🇷clique de l'icone plus
                            //🇬🇧click the icons
                          >
                            {/** 🇫🇷le nom de notre image est plus dans materialcommunityIcons  */}
                            {/** 🇬🇧 our image name is no longer in materialcommunityIcons */}
                            <Image source={locationOff} style={styles.image} />
                          </TouchableOpacity>
                          <View style={ styles.activityPhotView }>
                            <ActivityPhotoForChat
                              activityImage={activityImage}
                              setActivityImage={setActivityImage}
                              disabled={disableButton}
                              setDisabled={setDisbaleButton}
                              scr={scr}
                              topic={topic}
                            />
                          </View>
                        </>
                      )}
                    {/** 🇫🇷ToucheOpacity est mis ici pourque l'utilisateur puisse cliquer sur notre MaterialCommunityIcons  */}
                    {/** 🇬🇧ToucheOpacity is put here so the user can click on our MaterialCommunityIcons */}
                    {activityImage !== null && (
                      <>
                        <TouchableOpacity
                          onPress={() => {
                            setChosenEmoji(!chosenEmoji);
                          }}
                          style={ styles.chosenEmojiBtnTwo }
                          //🇫🇷clique de l'icone plus
                          //🇬🇧click the icons
                        >
                          {/** 🇫🇷le nom de notre image est plus dans materialcommunityIcons  */}
                          {/** 🇬🇧 our image name is no longer in materialcommunityIcons */}
                          <Image
                            source={chosenEmoji ? HappyON : HappyOFF}
                            style={styles.image}
                          />{" "}
                        </TouchableOpacity>
                        <TouchableOpacity style={ styles.locationPinBtn }>
                          {/** 🇫🇷le nom de notre image est plus dans materialcommunityIcons  */}
                          {/** 🇬🇧 our image name is no longer in materialcommunityIcons */}
                          <Image source={locationPin} style={styles.image} />
                        </TouchableOpacity>
                      </>
                    )}
                    {currentLatitude !== null &&
                      currentLongitude !== null &&
                      sendLocation !== null && (
                        <>
                          <TouchableOpacity
                            onPress={() => {
                              setChosenEmoji(!chosenEmoji);
                            }}
                            style={ styles.chosenEmojiBtnThree }
                            //🇫🇷clique de l'icone plus
                            //🇬🇧click the icons
                          >
                            {/** 🇫🇷le nom de notre image est plus dans materialcommunityIcons  */}
                            {/** 🇬🇧 our image name is no longer in materialcommunityIcons */}
                            <Image
                              source={chosenEmoji ? HappyON : HappyOFF}
                              style={styles.image}
                            />{" "}
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={{
                              position: "absolute",
                              top: 10,
                              right: 10,
                            }}
                          >
                            {/** 🇫🇷le nom de notre image est plus dans materialcommunityIcons  */}
                            {/** 🇬🇧 our image name is no longer in materialcommunityIcons */}
                            <Image source={locationOn} style={styles.image} />{" "}
                          </TouchableOpacity>
                        </>
                      )}
                  </View>
                  {/* 🇬🇧If the message sent is the first of the list of messages of the day, there will be the need to create a new sectionHeader */}
                  {/* 🇫🇷 Si le message envoyé est le premier de la liste des messages du jour, il sera nécessaire de créer une nouvelle sectionHeader */}
                  <TouchableOpacity
                    //🇫🇷 clique du boutton dans sendCommennt
                    onPress={sendComment}
                    style={styles.sendButton}
                  >
                    <Feather
                      name="send"
                      type="font-awesome"
                      color="white"
                      size={24}
                    />
                  </TouchableOpacity>
                </View>
                {chosenEmoji === true && (
                  <>
                    <View style={styles.messageContainer}>
                      <View style={styles.emojiInput}>
                        <Picker
                          style={styles.emojiInput}
                          onEmojiClick={(emojiObject) => {
                            onEmojiClick(emojiObject);
                          }}
                        />
                      </View>
                    </View>
                  </>
                )}
                {/** 🇫🇷fin view de  messageContainer*/}
              </>
            ) : (
              <Text style={ styles.participantsCommentsTxt }>
                {activity.t2022_commentsVisibleOnlyForParticipants}
              </Text>
            )}
          </View>
        )}
        {/* ---------------- 🇫🇷 Style CSS brut des participants via le display(4) (MiddleNav) 🇫🇷-------------------*/}
        {/* ---------------- 🇬🇧 Raw CSS style of participants through the display(4) (MiddleNav)🇬🇧 -------------------*/}

        {/*🇫🇷 Onglet 4: Participants (Figma Frame 44 MVP)*/}
        {/*🇬🇧 Tab 4: Attendees (Figma Frame 44 MVP)*/}
        {display === 4 && (
          <>
            {/* Modal for seeing the full attendee list */}
            <Modal
              animationType="fade"
              transparent={true}
              visible={fullAttendeeListModalVisible}
              onRequestClose={() => {
                isFullAttendeeListModalVisible(!fullAttendeeListModalVisible);
              }}
            >
              <View style={styles.listModalContainer}>
                <View
                  style={[styles.listModalView, { backgroundColor: "#D8EDE6" }]}
                >
                  <TouchableOpacity
                    style={{ margin: 5, alignSelf: "flex-end" }}
                    onPress={() =>
                      isFullAttendeeListModalVisible(
                        !fullAttendeeListModalVisible
                      )
                    } //(fr) onPress permet de définir une action à effectuer lorsqu'on appuie sur l'élément.(fr)
                  >
                    <MaterialCommunityIcons
                      name="close"
                      color="#787878"
                      size={28}
                    />
                  </TouchableOpacity>
                  <Text style={[styles.listModalTitle, { color: "#59c09b" }]}>
                    {activity.t2022_AttendeeList}
                  </Text>
                  <ScrollView>
                    <View style={styles.listModalScrollView}>
                      {/* J'ai mis la liste des participants pour tester, mettez la waiting list quand vous arriverez à la récupérer et dé-commentez le code en dessous */}
                      {attendees.map(
                        (
                          user,
                          index //// clee unique pour eviter :avertissement "Each child in a list should have a unique 'key' prop".
                        ) => (
                          <Text key={`attendee_${index}`}>
                            <AttendeeCard
                              // key={index}
                              event={event}
                              user={user}
                              setAttendees={setAttendees}
                              handleUnsubscribeUser={handleUnsubscribeUser}
                              setEvent={setEvent}
                              connectedUserRole={connectedUserRole}
                              isOrganizer={isOrganizer}
                              fullAttendeeListModalVisible={
                                fullAttendeeListModalVisible
                              }
                              isFullAttendeeListModalVisible={
                                isFullAttendeeListModalVisible
                              }
                            />
                          </Text>
                        )
                      )}
                    </View>
                  </ScrollView>
                </View>
              </View>
            </Modal>
            {/* Modal for seeing the waiting List */}
            <Modal
              animationType="fade"
              transparent={true}
              visible={waitingListModalVisible}
              onRequestClose={() => {
                isWaitingListModalVisible(!waitingListModalVisible);
              }}
            >
              <View style={styles.listModalContainer}>
                <View
                  style={[styles.listModalView, { backgroundColor: "#FFFCF3" }]}
                >
                  <TouchableOpacity
                    style={{ margin: 5, alignSelf: "flex-end" }}
                    onPress={() =>
                      isWaitingListModalVisible(!waitingListModalVisible)
                    }
                  >
                    <MaterialCommunityIcons
                      name="close"
                      color="#787878"
                      size={28}
                    />
                  </TouchableOpacity>
                  <Text style={[styles.listModalTitle, { color: "#FFC107" }]}>
                    {activity.t2022_WaitingList}
                  </Text>
                  <ScrollView>
                    <View style={styles.listModalScrollView}>
                      {/* J'ai mis la liste des participants pour tester, mettez la waiting list quand vous arriverez à la récupérer et dé-commentez le code en dessous */}
                      {event.waitingList &&
                        event.waitingList.map((user, index) => {
                          return (
                            <View key={k}>
                              <AttendeeCard
                                //key={index}
                                key={`comment_${index}`} // clee unique pour eviter :avertissement "Each child in a list should have a unique 'key' prop".
                                event={event}
                                user={user}
                                setAttendees={setAttendees}
                                handleUnsubscribeUser={handleUnsubscribeUser}
                                setEvent={setEvent}
                                connectedUserRole={connectedUserRole}
                                isOrganizer={isOrganizer}
                                waitingListModalVisible={
                                  waitingListModalVisible
                                }
                                isWaitingListModalVisible={
                                  isWaitingListModalVisible
                                }
                              />
                            </View>
                          );
                        })}
                    </View>
                  </ScrollView>
                </View>
              </View>
            </Modal>

            <View style={{ width: "90%" }}>
              <View style={styles.text}>
                {event.attendees && (
                  <>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                      <Text style={ styles.activityAttendeesTxt } >
                        {activity.t2022_Attendees}:
                      </Text>

                      <Text style={ styles.activityAttendeesTxtTwo }>
                        {event.nbFriends
                          ? event.attendees.length + event.nbFriends
                          : event.attendees.length}
                        {event.attendeeLimit === 1000000
                          ? null
                          : "/" + event.attendeeLimit}
                      </Text>
                    </View>
                  </>
                )}

                {/* {!event.attendees && (
                <Text
                  style={{
                    marginRight: 50,
                    fontWeight: "bold",
                    flexWrap: "wrap",
                    flex: 1,
                  }}
                >
                  Attendees
                  {event.nbFriends ? event.nbFriends : 0}/{event.attendeeLimit}
                </Text>
              )} */}
                {/* ************** VOIR AVEC BACK END POUR AFFICHAGE LIEN AU PROFIL************** */}
                {/* <Text style={{ marginRight: 5, justifyContent: "space-between" }}>Age</Text>
                <Text style={{ marginRight: 10 }}>21-38</Text> */}
                {attendees.length > 12 && (
                  <TouchableOpacity
                    style={{ flexDirection: "row", alignItems: "center" }}
                    onPress={() =>
                      isFullAttendeeListModalVisible(
                        !fullAttendeeListModalVisible
                      )
                    }
                  >
                    <Text style={{ fontWeight: "bold", marginRight: 5 }}>
                      {activity.t2022_SeeAll}
                    </Text>
                    <Icon
                      name="chevron-right"
                      type="font-awesome"
                      size={16}
                      color="black"
                    />
                  </TouchableOpacity>
                )}
              </View>

              <View style={ styles.attendeesView }>
                {attendees.map(
                  (
                    user,
                    index // clee unique pour eviter :avertissement "Each child in a list should have a unique 'key' prop".
                  ) => (
                    <Text key={`attendee_${index}`}>
                      <AttendeeCard
                        // key={index}
                        event={event}
                        user={user}
                        setAttendees={setAttendees}
                        handleUnsubscribeUser={handleUnsubscribeUser}
                        setEvent={setEvent}
                        connectedUserRole={connectedUserRole}
                        isOrganizer={isOrganizer}
                        fullAttendeeListModalVisible={
                          fullAttendeeListModalVisible
                        }
                        isFullAttendeeListModalVisible={
                          isFullAttendeeListModalVisible
                        }
                      />
                    </Text>
                  )
                )}
              </View>
              {/*FR La balise View qui englobe les trois premières Cards des participants a la propriété "flexWrap",
            donc il n'y a pas besoin de rajouter d'autres Views en dessous. On peut simplement ajouter des
            balises TouchableOpacity dans la View.
            Un composant AttendeeCard pour afficher un participant a été ajouté. Essayez d'en afficher
            plusieurs dans une liste pour réduire la taille de ce code. */}
              {/*GB As the view surrounding the three first attendee cards has "flexWrap" in its properties,
             there's no need to create more views under it. Just adding more TouchableOpacities in the View
            will do the job just as fine. I created an "AttendeeCard" component as well. Try to generate a list
            of attendees with it so we can have a bit less code in this long-a*s page." */}

              <View
                style={[
                  styles.organizerOptions,
                  {
                    borderBottomWidth: 0,
                    borderRadius: 15,
                    backgroundColor: "white",
                  },
                ]}
              >
                <Text style={{ marginVertical: 20, fontSize: 15 }}>
                  {activity.t2022_WaitingList} - (
                  {event.waitingList ? event.waitingList.length : 0})
                </Text>
                {event.waitingList && event.waitingList.length !== 0 && (
                  <TouchableOpacity
                    style={{ flexDirection: "row", alignItems: "center" }}
                    onPress={() =>
                      isWaitingListModalVisible(!waitingListModalVisible)
                    }
                  >
                    <Text style={{ fontWeight: "bold", marginRight: 5 }}>
                      {activity.t2022_SeeAll}
                    </Text>
                    <Icon
                      name="chevron-right"
                      type="font-awesome"
                      size={16}
                      color="black"
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
export default ActivityScreen;
