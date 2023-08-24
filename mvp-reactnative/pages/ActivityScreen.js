/* 🇫🇷 Page de détails d'une activité(Figma Frames 41 à 44 MVP)
A faire: 
- Traduction automatique de la description de l'activité (via countriesListRectFlags et CountriesGrid)
- Mise en place du chat et de la liste des membres
- Remplacement des valeurs dans Interested et Followers par des valeurs dynamiques
- Programmation des boutons
- Amélioration du code indiquant l'adresse, à côté de l'icône de position
- Couleur des noms selon le genre des participants dans le tab "Attendees": "#A5CCF2" et "#FF4181"
🇫🇷 */

/* 🇬🇧 Activity details page (Figma Frames 41 to 44 MVP)
To do: 
- Automatic activity description translation (via countriesListRectFlags and CountriesGrid)
- Add Chat and Members Contents
- Replacement of the Interested and Followers values by dynamic ones
- Program the buttons
- Improvment of the code that displays the address, at the right of the position icon
- Colors to put according to the attendees genre in the "Attendees" tab: "#A5CCF2" and "#FF4181"
🇬🇧 */

import { hostname } from "../backendconnect/hostname"
import { useEffect, useState } from "react";
import { Text, ScrollView, Image, StyleSheet, View, SafeAreaView, TouchableOpacity, TextInput } from "react-native";
import styles from "./Styles/ActivityScreenCss"
import { useNavigation } from "@react-navigation/native";

import axios from "axios";

// Components
import LogButton from "../components/LogButtons";
import EventButton from "../components/EventButton";
import InviteButton from "../components/InviteButton";
import SubButton from "../components/SubUnsubButton";
import MiddleNav from "../components/MiddleNav";
import SwitchBtn from "../components/SwitchBtn";
import ChatItem from "../components/ChatItem";
import CountriesListRectFlags from "../components/CountriesList";
import ListOfParticipants from "../components/ListsOfParticipants";
import DeleteActivityDialog, { CancelParticipationDialog, AddressAlertDialog, DeleteRepeatEventDialog} from "../components/ActivityScreenDialogs";
import Json from "../assets/json/en.json";

// SVG imports
import GooglePicto from "../assets/images/googlemaps.svg";
import ChatGroup from "../assets/images/chatGroup.svg";
import ChatNotif from "../assets/images/chatNotif.svg";
import Interested from "../assets/images/interested.svg";
import Follower from "../assets/images/follower.svg";
import Participant from "../assets/images/participant.svg";
import Info from "../assets/images/info.svg";
import Men from "../assets/images/men.svg";
import Jared from "../assets/images/jared.svg";
import LoveActivated from "../assets/images/heartRed.svg";
import LoveDeactivated from "../assets/images/heartGrey.svg";
import Trash from "../assets/images/trashcan.svg";
import Edit from "../assets/images/Iconedit.svg";
import Share from "../assets/images/share.svg";
import messageEmoji from "../assets/images/messageEmoji.png";
import France from "../assets/flags-svg/france.svg";

import { timer } from "../utils/functionDate.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Icon, Dialog } from "@rneui/themed";

// FR Variable json se trouvant dans en.json permet de faire la traduction des differentes langues
// GB Json variable located in en.json allows the translation of different languages
const { activity } = Json;

const ActivityScreen = ({ route }) => {
  const event = route.params.event;
  // console.log(event);
  const navigation = useNavigation();
  const { latitude, longitude, latitudeDelta, longitudeDelta } = JSON.parse(event.location);
  const [display, setDisplay] = useState(1);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [avatarList, setAvatarList] = useState([]);
  const [nbPeople, setNbPeople] = useState();
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState({
    language: "French",
    flag: <France style={styles.flag} width={30} height={30} />
  });

  const [readMoreButtonPressed, isReadMoreButtonPressed] = useState(false);

  //🇫🇷 Réglages du chat
  //🇬🇧 Chat settings
  const [allowNotifications, setAllowNotifications] = useState(false);
  const [joinInNotification, setJoinInNotification] = useState(false);
  const [notificationSound, setNotificationSound] = useState(false);

  //🇫🇷 Options des particiapants
  //🇬🇧 Attendees options
  const [attendeeMode, setAttendeeMode] = useState(false);
  /*🇫🇷 false = participant / true = organisateur
   Trouver un moyen de l'activer automatiquement*/
  /*🇬🇧 false = attendee / true = organizer
   Find a way to set it automatically*/

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

  const [deleteActivityDialogVisible, setDeleteActivityDialogVisible] = useState(false);
  const [cancelParticipationDialogVisible, setCancelParticipationDialogVisible] = useState(false);
  const [addressAlertDialogVisible, setAddressAlertDialogVisible] = useState(false);
  const [deleteRepeatEventDialogVisible, setDeleteRepeatEventDialogVisible] = useState(false);

  const [isParticipating, setIsParticipating] = useState(false);
  const [attendees, setAttendees] = useState([]);
  const [eventHoster, setEventHoster] = useState(null);

  useEffect(() => {
    const fetchAvatar = async () => {
      const token = await AsyncStorage.getItem("userToken");
      const { data } = await axios.post(
        `${hostname}/api/v1/user/getavatarlistfromids`,
        {
          indexs: event.attendees
        },
        {
          headers: {
            authorization: "Bearer " + token
          }
        }
      );
      // setNbPeople(data.result.length);

      let list = data.result;
      if (list.length > 3) list = list.slice(0, 4);
      //🇫🇷 4 avatars sont affichés
      //🇬🇧 4 avatars are displayed
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
  }, []);

  // const attendees = [];

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

  if (display === 2 && !isParticipating) {
    () => displayAddressAlertDialog()
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.center}>
        {/*Fenêtre popup pour la suppression de l'activité */}
        {/*Confirmation pop-up before deleting the event*/}

        <DeleteActivityDialog dialogVisible={deleteActivityDialogVisible} displayModal={displayDeleteActivityDialog}/>

        <CancelParticipationDialog
          dialogVisible={cancelParticipationDialogVisible}
          displayModal={displayCancelParticipationDialog}
          isParticipating={isParticipating}
          setIsParticipating={setIsParticipating}
        />

        <AddressAlertDialog
          dialogVisible={addressAlertDialogVisible}
          displayModal={displayAddressAlertDialog}
          isParticipating={isParticipating}
          setIsParticipating={setIsParticipating}
        />

        <DeleteRepeatEventDialog
          dialogVisible={deleteRepeatEventDialogVisible}
          displayModal={displayDeleteRepeatEventDialog}
          state={dialogResult}
          setState={setDialogResult}
        />

        <View
          style={{
            width: "100%",
            height: display == 1 || display == 2 ? 260 : 190
          }}
        >
          {display === 1 && (
            <Image style={styles.header} source={{ uri: event.activityImage }}/>
          )}

          {display === 2 && isParticipating ? (
            <MapView
              region={{ latitude, longitude, latitudeDelta, longitudeDelta }}
              provider={PROVIDER_GOOGLE}
              style={styles.header}
            >
              <Marker coordinate={{ latitude: latitude, longitude: longitude }} pinColor="#3A8569"/>
            </MapView>
          ) : null}

          {display === 3 && (
            <View style={styles.t2022_ChatSettingsView}>
              <Text style={ styles.textOne }>
                  {/*🇫🇷 La variable activity.t2022_ChatSettings dans fr.json permet d'afficher "Paramètre du chat"*/}
                  {/*🇬🇧 The en.json variable activity.t2022_ChatSettings displays "Chat Settings""*/}
                {activity.t2022_ChatSettings}
              </Text>
              <View style={styles.chatSetting}>
                <Text style={styles.t2022_NotificationGroupChat}>
                  {/*🇫🇷 La variable activity.t2022_NotificationGroupChat dans fr.json permet d'afficher "Activer les notifications dans le chat de groupe"*/}
                  {/*🇬🇧 The en.json variable activity.t2022_NotificationGroupChat displays "Allow notifications in this chat group""*/}
                  {activity.t2022_NotificationGroupChat}
                </Text>
                <SwitchBtn state={allowNotifications} setState={setAllowNotifications}/>
              </View>
              <View style={styles.chatSetting}>
                <Text style={{ fontSize: 15 }}>
                  {/*🇫🇷 La variable activity.t2022_NotificationJoin dans fr.json permet d'afficher "Notification si quelqu'un rejoins le chat"*/}
                  {/*🇬🇧 The en.json variable activity.t2022_NotificationJoin displays "Notification when someone joins in""*/}
                  {activity.t2022_NotificationJoin}
                </Text>
                <SwitchBtn state={joinInNotification} setState={setJoinInNotification}/>
              </View>
              <View style={styles.chatSetting}>
                <Text style={{ fontSize: 15 }}>
                   {/*🇫🇷 La variable activity.t2022_NotificationWithSound dans fr.json permet d'afficher "Notification avec du son"*/}
                  {/*🇬🇧 The en.json variable activity.t2022_NotificationWithSound displays "Notification with sound""*/}
                  {activity.t2022_NotificationWithSound}
                  </Text>
                <SwitchBtn state={notificationSound} setState={setNotificationSound}/>
              </View>
            </View>
          )}

          {display === 4 &&
            (attendeeMode ? (
              <View>
                <View style={styles.organizerOptions}>
                  <Text style={ styles.organizerText }>
                  {/*🇫🇷 La variable activity.t2022_UnapproveLis dans fr.json permet d'afficher "Liste non approuvé -"*/}
                  {/*🇬🇧 The en.json variable activity.t2022_UnapproveLis displays "Unapproved List -"*/}
                    {activity.t2022_UnapprovedList} (10)
                  </Text>
                  <Text style={ styles.textTwo }>
                    (Secret List)
                  </Text>
                  <TouchableOpacity style={ styles.touchableOpacityOne }>
                    <Text style={ styles.textThree }>
                      {/*🇫🇷 La variable activity.t20228SeeAll dans fr.json permet d'afficher "Tout voir"*/}
                      {/*🇬🇧 The en.json variable activity.t20228SeeAll displays "See all"*/}
                      {activity.t2022_SeeAll}
                    </Text>
                    <Icon name="chevron-right" type="font-awesome" size={16} color="black"/>
                  </TouchableOpacity>
                </View>
                <View style={styles.organizerOptions}>
                  <Text style={ styles.textFour }>
                    {/*🇫🇷 La variable activity.t2022Co_OrganiserWL dans fr.json permet d'afficher "Liste d'attente des co-organisers"*/}
                    {/*🇬🇧 The en.json variable activity.t2022Co_OrganiserWL displays "Co-organisers waiting list -"*/}
                    {activity.t2022Co_OrganiserWL} (10)
                  </Text>
                  <Text style={ styles.textFive }>
                    (Secret List)
                  </Text>
                  <TouchableOpacity style={ styles.touchableOpacityTwo }>
                    <Text style={ styles.textSix  }>
                      {/*🇫🇷 La variable activity.t2022_SeeAll dans fr.json permet d'afficher "Tout voir"*/}
                      {/*🇬🇧 The en.json variable activity.t2022_SeeAll displays "See all"*/}
                      {activity.t2022_SeeAll}
                    </Text>
                    <Icon name="chevron-right" type="font-awesome" size={16} color="black"/>
                  </TouchableOpacity>
                </View>
                <View style={styles.organizerOptions}>
                  <Text style={ styles.textSeven }>
                    {/*🇫🇷 La variable activity.t2022_WaitingList dans fr.json permet d'afficher "Liste d'attente-"*/}
                      {/*🇬🇧 The en.json variable activity.t2022_WaitingList displays "Waiting List -*/}
                    {activity.t2022_WaitingList} (10)
                  </Text>
                  <TouchableOpacity style={ styles.touchableOpacityThree  }>
                    <Text style={ styles.textEight }>
                      {/*🇫🇷 La variable activity.t20228SeeAll dans fr.json permet d'afficher "Tout voir"*/}
                      {/*🇬🇧 The en.json variable activity.t20228SeeAll displays "See all"*/}
                      {activity.t2022_SeeAll}
                    </Text>
                    <Icon name="chevron-right" type="font-awesome" size={16} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={ styles.viewOne }>
                <Text style={ styles.textNine }>
                    {/*🇫🇷 La variable activity.t20228SeeAll dans fr.json permet d'afficher "Cette application aidera les organisateurs, vous êtes le bienvenue pour aider cet organisateur ou pour créer votre propre activité pour socialiser"*/}
                      {/*🇬🇧 The en.json variable activity.t20228SeeAll displays "This app will help organizers so be welcome to help this organizer or be welcome create your own activity for socializing"*/}
                  {activity.t2022_Information}
                </Text>
                <View style={styles.inviteOrParticipate}>
                  <EventButton type="Help & Organize" bgColor={"orange"} colorText={"white"}/>
                </View>
              </View>
            ))}
        </View>

        <View style={styles.legend}>
          <Text style={ styles.eventTitle }>
            {event.title}
          </Text>

          <View style={ styles.viewTwo }>
            <Text style={ styles.textTen }>{event.startTime}</Text>
            <Text style={ styles.textTen }>{event.date}</Text>
          </View>

          <View style={ styles.viewThree }>
            <View style={ styles.viewFour  }>
              <Jared />
              <View style={{ width: 7 }} />
              <View>
                <Text style={[styles.userInfos, { color: "blue", fontSize: 15 }]}>Jared</Text>
                <Text style={styles.userInfos}>4.5/5</Text>
                <Text style={styles.userInfos}>39 pts - 29 y-o</Text>
              </View>
            </View>

            <View style={ styles.viewFour }>
              <GooglePicto style={styles.textElevenGooglePicto}/>
              <Text style={ styles.textEleven }>
                {zipCode}
                {/* ENG - I split the address to extract the zip code - ENG */}
                {/* FR - J'ai découpé l'adresse pour n'extraire que le code postal -FR */}
              </Text>
            </View>
            {/* <LoveActivated /> */}
          </View>
        </View>

        {/*🇫🇷 Composant de navigation MiddleNav propre à l'activité. Il contient 4 onglets
        et le props display sert à changer l'affichage sous l'onglet séléctionné. */}
        {/*🇬🇧 MiddleNav is a navigation component specific to the current event. It has 4
        tabs and the props called "display" changes the display below the selected tab */}
        <MiddleNav display={display} setDisplay={setDisplay} isParticipating={isParticipating} addressAlertDialogVisible={addressAlertDialogVisible} setAddressAlertDialogVisible={setAddressAlertDialogVisible} />

        {/*🇫🇷 Onglet 1: Description (Figma Frame 41 MVP)*/}
        {/*🇬🇧 Tab 1: Description (Figma Frame 41 MVP)*/}
        {display === 1 && (
          <>
            <View style={ styles.viewFive }>
              <View style={styles.activityStats}>
                <Text style={ styles.interestedText }>Interested</Text>
                <View style={ styles.viewSix }>
                  <Icon name="circle" type="font-awesome" size={32} color="#59C09B"/>
                  <Text style={ styles.textTwelve }>
                    99+
                  </Text>
                  {/*FR Ce texte affichera le nombre de participants à l'activité (à récupérer dans le back-end)
                   Penser à afficher 99+ lorsqu'il y en a plus de 100. */}
                  {/*GB This text will display the dynamic data about how many people currently follow the event.
                   Putting an if(data > 100) and displaying 99+ would be nice, here */}
                </View>
              </View>
              <View style={styles.activityStatsView}/>
              <View style={styles.activityStats}>
                <Text style={ styles.followersText }>Followers</Text>
                <View style={ styles.viewSeven }>
                  <Icon name="heart-alt" type="fontisto" size={28} color="#DA0E45"/>
                  <Text style={ styles.twentyfiveText }>
                    25
                  </Text>
                  {/*FR Ce texte affichera le nombre de participants à l'activité (à récupérer dans le back-end)
                   Penser à afficher 99+ lorsqu'il y en a plus de 100. */}
                  {/*GB This text will display the dynamic data about how many people currently follow the event.
                   Putting an if(data > 100) and displaying 99+ would be nice, here */}
                </View>
              </View>
            </View>

            <View style={ styles.viewEight }>
              <View style={{flexDirection: "row"}}>
                {avatarList.map((o, index) => {
                  return (
                    <Image
                      key={index}
                      source={{ uri: o.avatar }}
                      style={ styles.avatarImage }
                    />
                  );
                })}
              </View>
              {event.attendees > 5 && <Info style={{ marginRight: 15 }} />}
              <View>
                <Men />
                <Text>{event.attendees.length} / {event.attendeeLimit}</Text>
              </View>
            </View>

            <View style={styles.inviteOrParticipate}>
              {/*🇫🇷 Définir la logique pour l'invitation en cliquant sur Invite*/}
              {/*🇬🇧 The code managing invitations is missing*/}
              <InviteButton type="Invite" bgColor={"darkgray"} colorText={"white"}/>
              <View style={styles.isParticipatingisParticipatingView}/>
              <SubButton
                isParticipating={isParticipating}
                setIsParticipating={setIsParticipating}
                cancelParticipationDialogVisible={cancelParticipationDialogVisible}
                setCancelParticipationDialogVisible={setCancelParticipationDialogVisible}
              />
            </View>

            <View style={styles.countriesFlagsView}>
              <View style={ styles.countriesFlags }>
                <Text style={styles.about}>{activity.about}</Text>
                {/*🇫🇷 La variable activity.about dans en.json permet d'afficher "A propos de l'activité"*/}
                {/*🇬🇧 The en.json variable activity.about displays "About the event"*/}
                <CountriesListRectFlags country={country} setCountry={setCountry}/>
                {/*🇫🇷 Bouton pour choisir la langue (liste de drapeaux carrés par langue).*/}
                {/*🇬🇧 Language selection button (list of rectangular flags)*/}
              </View>
                {/*🇫🇷 Impossible de modifier la description de l'activité pour l'instant*/}
                {/*🇬🇧 Can't edit event description so far*/}
              <View style={[styles.longText]}>
                <View style={ styles.viewNine }>
                  <View>
                    <Edit />
                  </View>
                  {/*🇫🇷 Impossible de supprimer la description de l'activité pour l'instant*/}
                  {/*🇬🇧 Can't delete event description so far*/}
                  <TouchableOpacity onPress={() => displayDeleteActivityDialog()}>
                    <Trash marginLeft={20} />
                  </TouchableOpacity>
                </View>
                <Text 
                style={{
                    marginTop: 10,
                    padding: 5,
                    color: "gray",
                    textAlign: "justify",
                    height: readMoreButtonPressed ? null : 75,
                    overflow: readMoreButtonPressed ? null : "hidden"
                  }}
                >
                  {event.description}
                </Text>
                <TouchableOpacity
                  onPress={() => isReadMoreButtonPressed(!readMoreButtonPressed)}
                  style={ styles.touchableOpacityFour }>
                  <Text style={styles.readMoreButton}>
                    {readMoreButtonPressed ? "Read Less" : "Read More"}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.inviteOrParticipate}>
                <EventButton type="Help & Organize" bgColor={"orange"} colorText={"white"}/>
                <View style={styles.EventButtonView}/>
                <EventButton type="Copy/Paste to create your own activity" bgColor={"lightgray"}/>
              </View>
              {event.price !== 0 && (
                <View style={styles.onPressBtnView}>
                  {/*🇫🇷 La logique permettant d'accéder à la billeterie en ligne est manquante*/}
                  {/*🇬🇧 The link to buy tickets online is missing*/}
                  <TouchableOpacity
                    onPress={() =>
                      console.log("Set a link that opens the navigator to the ticket link address")
                    }
                    style={styles.buyTicketButton}
                  >
                    <Text style={ styles.buyTicketText }>
                      {/*🇫🇷 La variable activity.t2022_BuyTicket dans fr.json permet d'afficher "Acheter un ticket"*/}
                      {/*🇬🇧 The en.json variable activity.t2022_BuyTicket displays "Buy ticket"*/}
                      {activity.t2022_BuyTicket}
                    </Text>
                    <Icon name="ticket" type="font-awesome" size={20} color="dodgerblue"/>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </>
        )}

        {/*🇫🇷 Onglet 2: Adresse "Où nous trouver" (Figma Frame 42 MVP)*/}
        {/*🇬🇧 Tab 2: Description "How to find us" (Figma Frame 42 MVP)*/}
        {display === 2 && (
          <View style={ styles.findUs }>
            <View style={ styles.viewTen }>
              <Text style={styles.about}>{activity.how}?</Text>
              {/*🇫🇷 La variable activity.how dans en.json contient "how": "How to find us"*/}
              {/*🇬🇧 The en.json variable activity.how contains "how": "How to find us"*/}
              <CountriesListRectFlags country={country} setCountry={setCountry}/>
            </View>
            <View style={[styles.longText]}>
              <Text
                style={[styles.howToFindText,
                  {height: readMoreButtonPressed ? null : 75,
                  overflow: readMoreButtonPressed ? null : "hidden"}
                ]}
              >
                {event.howToFind}
              </Text>{/* Text: "How to find us?" */}
            </View>

            <View style={styles.inviteOrParticipate}>
              <EventButton type="Help & Organize" bgColor={"orange"} colorText={"white"}/>
              <View style={styles.EvenButtonContainer}/>
              <EventButton type="Copy/Paste to create your own activity" bgColor={"lightgray"}/>
            </View>
          </View>
        )}

        {/*🇫🇷 Onglet 3: Commentaires participants/organisateurs (Figma Frame 43 MVP)*/}
        {/*🇬🇧 Tab 3: Hosts and attendees comments (Figma Frame 43 MVP)*/}
        {display === 3 && (
          <View 
            style={ styles.comingSoonText }>
              <Text>COMING SOON</Text>
        </View>              
      )}
        {/* ---------------- 🇫🇷 Style CSS brut des participants via le display(4) (MiddleNav) 🇫🇷-------------------*/}
        {/* ---------------- 🇬🇧 Raw CSS style of participants through the display(4) (MiddleNav)🇬🇧 -------------------*/}
        
        {/*🇫🇷 Onglet 4: Participants (Figma Frame 44 MVP)*/}
        {/*🇬🇧 Tab 4: Attendees (Figma Frame 44 MVP)*/}
        {display === 4 && (
          /*---------------------------------------------------CONTAINER 1-------------------------------*/
          <View style={styles.attendeeTextContainer}>
            <View style={styles.text}>
              <Text style={ styles.attendeeText }>
                Attendees 8/20
                {/* ************** VOIR AVEC BACK END POUR AFFICHAGE LIEN AU PROFIL************** */}
                <Text style={ styles.ageText }> Age </Text>
                <Text style={styles.ageText2131}>21-38</Text>
              </Text>

              <TouchableOpacity style={ styles.touchableOpacityFive }>
                <Text style={ styles.seeAllText }>See All</Text>
                <Icon name="chevron-right" type="font-awesome" size={16} color="black"/>
              </TouchableOpacity>
            </View>
            <View style={ styles.viewEleven }>
              <TouchableOpacity onPress={() => console.log("Go to attendee profile")} style={styles.networkCard}>
                <TouchableOpacity onPress={() => setLiked(!liked)}
                  style={ styles.touchableOpacitySix }>
                  {liked ? (
                    <Icon name="heart" type="font-awesome" size={15} color="red"/>
                  ) : (
                    <Icon name="heart-o" type="font-awesome" size={15} color="red"/>
                  )}
                </TouchableOpacity>
                <Image style={styles.userAvatar} source={require("../assets/images/randomUser.png")}/>
                <Text style={styles.userName}> Alexanderio </Text>
                <Text style={styles.userStatus}>Event host</Text>
                {/* //Is this "Event host" really necessary as we are in the attendee list...? I mean, being in the attendee list kinds of make you an attendee...right? */}
                {attendeeMode && (
                  <TouchableOpacity onPress={() => console.log("Attendee removed from list")} style={styles.removeUserButton}>
                    <Icon name="close" type="ionicons" size={18} color="red" />
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => console.log("Go to attendee profile")}
                style={styles.networkCard}>
                <TouchableOpacity
                  onPress={() => setLiked(!liked)}
                  style={ styles.touchableOpacitySeven }>
                  {liked ? (
                    <Icon name="heart" type="font-awesome" size={15} color="red"/>
                  ) : (
                    <Icon name="heart-o" type="font-awesome" size={15} color="red"/>
                  )}
                </TouchableOpacity>
                <Image style={styles.userAvatar} source={require("../assets/images/randomUser.png")}/>
                <Text style={styles.userName}> Alexanderio </Text>
                <Text style={styles.userStatus}>Event host</Text>
                {/*GB Is this "Event host" really necessary as we are in the attendee list...?" */}
                {attendeeMode && (
                  <TouchableOpacity
                    onPress={() => console.log("Attendee removed from list")}
                    style={styles.removeUserButton}
                  >
                    <Icon name="close" type="ionicons" size={18} color="red" />
                  </TouchableOpacity>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => console.log("Go to attendee profile")}
                style={styles.networkCard}>
                <TouchableOpacity
                  onPress={() => setLiked(!liked)}
                  style={ styles.touchableOpacityEight }>
                  {liked ? (
                    <Icon name="heart" type="font-awesome" size={15} color="red"/>
                  ) : (
                    <Icon name="heart-o" type="font-awesome" size={15} color="red"/>
                  )}
                </TouchableOpacity>
                <Image
                  style={styles.userAvatar}
                  source={require("../assets/images/randomUser.png")}
                />
                <Text style={styles.userName}> Alexanderio </Text>
                <Text style={styles.userStatus}>Event host</Text>
                {/* //Is this "Event host" really necessary as we are in the attendee list...?" */}
                {attendeeMode && (
                  <TouchableOpacity
                    onPress={() => console.log("Attendee removed from list")}
                    style={styles.removeUserButton}
                  >
                    <Icon name="close" type="ionicons" size={18} color="red" />
                  </TouchableOpacity>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => console.log("Go to attendee profile")}
                style={styles.networkCard}>
                <TouchableOpacity
                  onPress={() => setLiked(!liked)}
                  style={ styles.touchableOpacityNine }>
                  {liked ? (
                    <Icon name="heart" type="font-awesome" size={15} color="red"/>
                  ) : (
                    <Icon name="heart-o" type="font-awesome" size={15} color="red"/>
                  )}
                </TouchableOpacity>
                <Image
                  style={styles.userAvatar}
                  source={require("../assets/images/randomUser.png")}/>
                <Text style={styles.userName}> Alexanderio </Text>
                <Text style={styles.userStatus}>Event host</Text>
                {/* //Is this "Event host" really necessary as we are in the attendee list...? I mean, being in the attendee list kinds of make you an attendee...right? */}
                {attendeeMode && (
                  <TouchableOpacity
                    onPress={() => console.log("Attendee removed from list")}
                    style={styles.removeUserButton}>
                    <Icon name="close" type="ionicons" size={18} color="red" />
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => console.log("Go to attendee profile")}
                style={styles.networkCard}>
                <TouchableOpacity
                  onPress={() => setLiked(!liked)}
                  style={ styles.touchableOpacityTen }>
                  {liked ? (
                    <Icon name="heart" type="font-awesome" size={15} color="red"/>
                  ) : (
                    <Icon name="heart-o" type="font-awesome" size={15} color="red"/>
                  )}
                </TouchableOpacity>
                <Image
                  style={styles.userAvatar}
                  source={require("../assets/images/randomUser.png")}/>
                <Text style={styles.userName}> Alexanderio </Text>
                <Text style={styles.userStatus}> Event host </Text>
                {/* //Is this "Event host" really necessary as we are in the attendee list...? I mean, being in the attendee list kinds of make you an attendee...right? */}
                {attendeeMode && (
                  <TouchableOpacity
                    onPress={() => console.log("Attendee removed from list")}
                    style={styles.removeUserButton}>
                    <Icon name="close" type="ionicons" size={18} color="red" />
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
              {/*comment creer un pop up*/}
              <TouchableOpacity
                onPress={() => console.log("Go to attendee profile")}
                style={styles.networkCard}>
                <TouchableOpacity
                  onPress={() => setLiked(!liked)}
                  style={ styles.touchableOpacityEleven }>
                  {liked ? (
                    <Icon name="heart" type="font-awesome" size={15} color="red"/>
                  ) : (
                    <Icon name="heart-o" type="font-awesome" size={15} color="red"/>
                  )}
                </TouchableOpacity>
                <Image
                  style={styles.userAvatar}
                  source={require("../assets/images/randomUser.png")}/>
                <Text style={styles.userName}> Alexanderio </Text>
                <Text style={styles.userStatus}>Event host</Text>
                {/* //Is this "Event host" really necessary as we are in the attendee list...? I mean, being in the attendee list kinds of make you an attendee...right? */}
                {attendeeMode && (
                  <TouchableOpacity
                    onPress={() => console.log("Attendee removed from list")}
                    style={styles.removeUserButton}>
                    <Icon name="close" type="ionicons" size={18} color="red" />
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
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

            {!attendeeMode && (
              <View style={styles.organizerOptions}>
                <Text style={styles.waitingListText}>
                  Waiting List - (10)
                </Text>
                <TouchableOpacity
                  style={ styles.touchableOpacityTwelve }>
                  <Text style={ styles.textThirteen }>See All</Text>
                  <Icon name="chevron-right" type="font-awesome" size={16} color="black"/>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
export default ActivityScreen;


