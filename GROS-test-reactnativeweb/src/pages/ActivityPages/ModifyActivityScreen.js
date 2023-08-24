// 🇫🇷 Pages Création d'activité (Figma Frame 31 à 34) 🇫🇷
// 🇬🇧 Create Activity pages (Figma Frame 31 to 34) 🇬🇧

// React
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  LogBox,
  Image,
} from "react-native";
import styles from "../Styles/ModifyActivityScreenCss";
import { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Icon from "react-native-vector-icons/Ionicons";
// Components
import Fields from "../../components/Fields";
import InputField from "../../components/InputField";
import MultilineFields from "../../components/MultilineFields";
import LogButton from "../../components/LogButtons";
import {
  OneValueSlider,
  TwoValuesSlider,
  ParitySlider,
} from "../../components/Sliders";
import DateTimePicker from "../../components/DateTimePicker";
import SwitchBtn from "../../components/SwitchBtn";
import {
  OptionButton,
  CheckboxSquare,
} from "../../components/SelectionElements";
import ActivityPhoto from "../../components/ActivityPhoto";
import AddressMap from "../../components/AddressMap";
import { ActivityTypesGrid_OneTopic } from "../../components/ActivityTypesGrids";
import { activitiesList } from "../../assets/activityList/activityListWithIcons.js";
// Assets
import DrinkIcon from "../../assets/images/drink.svg";
import GiftIcon from "../../assets/images/giftbox.svg";
import TicketIcon from "../../assets/images/ticket.svg";
import Json from "../../assets/json/en.json";
//connections
import { hostname } from "../../../../mvp-reactnative/backendconnect/hostname.js";
import { TextInput } from "react-native-paper";
// import moment from "moment";
// import * as ImagePicker from "expo-image-picker";

LogBox.ignoreLogs([
  "VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.",
]);
// Des variables json de en.json permettant la traduction dans les différentes langues

const ModifyActivityScreen = ({ scr, user }) => {
  //console.log('ModifyActivityScreen scr:', scr);

  const { createActivity, editProfile } = scr; //🇫🇷  Changement de la langue depuis activityScreen.js //🇬🇧 language changed from activityScreen.js

  const premiumRoles = ["admin", "moderator", "Diamond star"];

  console.log("USER modify", user);

  const { name } = user?.role;

  const navigation = useNavigation();
  const route = useRoute();
  const event = route.params.event; //🇫🇷 Récupération de l'événement à modifier //🇬🇧 Get the event to modify
  console.log("EVENT INFO", event); //🇫🇷 Affichage des informations de l'événement //🇬🇧 Display event informations
  const typeAction = route.params.type;
  const [buttonSelected, setButtonSelected] = useState(
    createActivity.step1.address //🇫🇷 Valeur par défaut pour le bouton "En ligne" //🇬🇧 Default value for the "Online" button
  );
  // const [buttonSelected, setButtonSelected] = useState(onlinecreateActivity.step1.address);

  const [step, setStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  //FR ETAPE 1-variables relatives
  //GB STEP 1-related variables
  const [author, setAuthor] = useState(event.author);
  console.log(event.author);
  //FR Récupérer l'ID et le nom de l'utilisateur, il serait mieux de le faire avec useContext
  //GB Get the id and the name of the user; could be nice to do it with useContext, I think
  const [title, setTitle] = useState(event.title); //ENLEVER PLUS TARD
  const [address, setAddress] = useState(event.address);
  const [online, setOnline] = useState(event.online);
  const [location, setLocation] = useState(JSON.parse(event.location));
  const [locationEdit, setLocationEdit] = useState(
    !online ? JSON.stringify(location) : null
  );

  const [date, setDate] = useState(event.date);
  const [startTime, setStartTime] = useState(event.startTime);
  //FR Nombre de participants
  //GB How many attendants
  // const [unlimited, setUnlimited] = useState(false);
  const [isAttendeeLimited, setIsAttendeeLimited] = useState(
    event.isAttendeeLimited ?? null
  );
  const [attendeeLimit, setAttendeeLimit] = useState(event.attendeeLimit);

  const [hasPrice, setHasPrice] = useState(event.hasPrice ?? false);
  //const [priceValue, setPriceValue] = useState(event.priceValue); // non utilisé
  const [ticketLink, setTicketLink] = useState(event.ticketLink);

  const [nbFriends, setNbFriends] = useState(event.nbFriends);

  const [helpForOrganizers, setHelpForOrganizers] = useState(
    event.helpForOrganizers
  );

  const [hasReminderName, setHasReminderName] = useState(
    event.hasReminderName ?? false
  );
  const [reminderName, setReminderName] = useState(event.reminderName);

  const [requestCoOrganizers, setRequestCoOrganizers] = useState(
    event.requestCoOrganizers ?? false
  );
  const [coOrganizerRequests, setCoOrganizerRequests] = useState(
    event.coOrganizerRequests ?? []
  );
  const [coOrganizerOffers, setCoOrganizerOffers] = useState(
    event.coOrganizerOffers ?? []
  );
  const [coOrganizerGift, setCoOrganizerGift] = useState(event.coOrganizerGift);

  const [optionInArray, setOptionInArray] = useState(
    event.optionInArray ?? false
  );

  //🇫🇷 Fonction de gestion des demandes des co-organisateurs
  //🇬🇧 Function to manage co-organizer requests
  const manageCoOrganizerRequests = (request) => {
    if (!coOrganizerRequests.includes(request)) {
      setOptionInArray(true); //🇫🇷 Si l'utilisateur active les options, les premières options sont ajoutées au tableau
      setCoOrganizerRequests((previousArray) => {
        return [...previousArray, request];
      });
    } else {
      setOptionInArray(false); //🇫🇷 Si l'utilisateur désactive les options, les premières options sont supprimées du tableau
      setCoOrganizerRequests((previousArray) => {
        return previousArray.filter((item, index) => {
          return item !== request;
        });
      });
    }
  };

  //🇫🇷 Fonction de gestion des offres des co-organisateurs
  //🇬🇧 Function to manage co-organizer offers
  const manageCoOrganizerOffers = (offer) => {
    if (!coOrganizerOffers.includes(offer)) {
      setOptionInArray(true); //🇫🇷 Si l'utilisateur active les options, les premières options sont ajoutées au tableau
      setCoOrganizerOffers((previousArray) => {
        return [...previousArray, offer];
      });
    } else {
      setOptionInArray(false); //🇫🇷 Si l'utilisateur désactive les options, les premières options sont supprimées du tableau
      setCoOrganizerOffers((previousArray) => {
        return previousArray.filter((item, index) => {
          //🇫🇷 Suppression des premières options du tableau
          return item !== offer;
        });
      });
    }
  };
  //FR Lorsque l'utilisateur active les premières options sont ajoutées ou supprimées du tableau
  //GB If the user switches Request Co-organizers on, the first options are added or removed from the array
  useEffect(() => {
    if (requestCoOrganizers) {
      setCoOrganizerRequests([createActivity.step1.b2022_coOrganizerMessage]); //🇫🇷 Ajout des premières options au tableau
      setCoOrganizerOffers([createActivity.step1.coOrganizerOfferDrink]); //🇬🇧 Add the first options to the array
    } else {
      setCoOrganizerRequests([]); //🇫🇷 Suppression des premières options du tableau
      setCoOrganizerOffers([]); //🇬🇧 Remove the first options from the array
    }
  }, [requestCoOrganizers]);

  // const [forbiddenPeople, setForbiddenPeople] = useState([]);
  // const [invitations, setInvitations] = useState([]);
  //const [type, setType] = useState([]);
  // const [fake, setFake] = useState(true);
  // const [restriction, setRestriction] = useState(false);

  //STEP 2-related variables
  console.log("topic", event.topic);
  const [topic, setTopic] = useState(event.topic);

  //STEP 3-related variables
  const [disableButton, setDisbaleButton] = useState(true);
  const [activityImage, setActivityImage] = useState(event.activityImage);

  const [description, setDescription] = useState(event.description);
  const [howToFind, setHowToFind] = useState(event.howToFind);

  //STEP 4-related variables
  const [whatsappLink, setWhatsappLink] = useState(event.whatsappLink);
  const [fbPageLink, setFbPageLink] = useState(event.fbPageLink);
  const [fbGroupLink, setFbGroupLink] = useState(event.fbGroupLink);
  const [meetupLink, setMeetupLink] = useState(event.meetupLink);
  const [telegramLink, setTelegramLink] = useState(event.telegramLink);
  const [otherLink, setOtherLink] = useState(event.otherLink);

  const [friendsOnly, setFriendsOnly] = useState(event.friendInfo ?? false);
  const [selectPeople, setSelectPeople] = useState(event.selectPeople ?? false);
  const [allowPhoneNumberDisplay, setAllowPhoneNumberDisplay] = useState(
    event.allowPhoneNumberDisplay ?? false
  );
  const [allowCoOrg, setAllowCoOrg] = useState(event.allowCoOrg ?? false);
  //Go fetch the list of the user's friends if true
  const [infoLine, setInfoLine] = useState(event.infoLine);

  const [repeatEvent, setRepeatEvent] = useState(event.repeatEvent ?? false);
  const [repeatEventFrequency, setRepeatEventFrequency] = useState(
    event.repeatEventFrequency
  );
  const [repeatEventDays, setRepeatEventDays] = useState(
    event.repeatEventDays ?? []
  );
  //STEP 4 event repeat manager code
  const [dayInArray, setDayInArray] = useState(event.dayInArray ?? false);
  const [repeatEventEndDate, setRepeatEventEndDate] = useState(
    event.repeatEventEndDate
  );

  const manageFrequencyDays = (day) => {
    //(fr)Gère les jours de répétition de l'événement(fr)/ (gb)
    if (!repeatEventDays.includes(day)) {
      setDayInArray(true); //🇫🇷 Si l'utilisateur active les options, les premières options sont ajoutées au tableau
      setRepeatEventDays((previousArray) => {
        return [...previousArray, day];
      });
    } else {
      setDayInArray(false); //🇫🇷 Si l'utilisateur désactive les options, les premières options sont supprimées du tableau
      setRepeatEventDays((previousArray) => {
        return previousArray.filter((item, index) => {
          return item !== day;
        });
      });
    }
  };
  // console.log(repeatEventDays);
  const [parity, setParity] = useState(event.parity ?? false);
  // const [parityValues, setParityValues] = useState(
  //   JSON.parse(event.parityValues)
  // );
  const [parityValues, setParityValues] = useState({
    //🇫🇷 Valeurs par défaut pour le slider de parité //🇬🇧 Default values for the parity slider
    male: event.parityValues?.male || 0,
    female: event.parityValues?.female || 0,
  });

  const [allowGuests, setAllowGuests] = useState(event.allowGuests ?? false);
  const [howManyGuests, setHowManyGuests] = useState(event.howManyGuests);

  const [ageRestriction, setAgeRestriction] = useState(
    event.ageRestriction ?? false
  );
  // const [ages, setAges] = useState(event.ages ?? [20, 40]);
  const [ages, setAges] = useState(
    event.ages ?? [event.ages[0], event.ages[1]]
  );

  const showError = (text) => {
    //🇫🇷 Affiche un message d'erreur et retourne à l'étape précédente //🇬🇧 Display an error message and go back to the previous step
    setErrorMessage(text);
    setStep(step - 1);
  };

  //🇫🇷 Gestion de la validation des éléments entre les étapes de création d'activité
  //🇬🇧  The useEffect manages validation between the event creation steps
  useEffect(() => {
    if (step === 2) {
      //FR quand on passe de l'étape 1 à l'étape 2
      //GB from step 1 to step 2
      if (title === "") return showError(scr.createActivity.step2.titleError);
      //🇫🇷 Si le titre est vide, on affiche un message d'erreur //🇬🇧 If the title is empty, we display an error message
      else if (address === "")
        return showError(scr.createActivity.step2.addressError);
      //🇫🇷 Si l'adresse est vide, on affiche un message d'erreur //🇬🇧 If the address is empty, we display an error message
      else if (date === null || startTime === null || date === "Invalid date")
        return showError(scr.createActivity.step2.datetimeError);
      //🇫🇷 Si la date ou l'heure sont vides, on affiche un message d'erreur //🇬🇧 If the date or the time are empty, we display an error message
      else if (ticketLink.length > 4) {
        if (
          !(
            ticketLink.startsWith("https://") ||
            ticketLink.startsWith("http://")
          )
        ) {
          return showError(scr.createActivity.step2.pricelinkError); //🇫🇷 Si le lien de billetterie n'est pas valide, on affiche un message d'erreur //🇬🇧 If the ticket link is not valid, we display an error message
        }
      }
    }

    if (step === 3) {
      //🇫🇷 quand on passe de l'étape 2 à l'étape 3
      //🇬🇧 From step 2 to step 3
      if (topic === -1) return showError(scr.createActivity.step3.topicError); //🇫🇷 Si le thème n'est pas sélectionné, on affiche un message d'erreur //🇬🇧 If the topic is not selected, we display an error message
    }

    if (step === 4) {
      //🇫🇷  quand on passe de l'étape 3 à l'étape 4
      //🇬🇧 From step 3 to step 4
      if (activityImage === null)
        return showError(scr.createActivity.step4.imageError);
      if (description === "")
        return showError(scr.createActivity.step4.imageError);
      if (howToFind === "")
        return showError(scr.createActivity.step4.imageError); //🇫🇷 Si la description ou les indications pour trouver l'activité sont vides, on affiche un message d'erreur //🇬🇧 If the description or the indications to find the activity are empty, we display an error message
    }

    //🇫🇷 Ci-dessous , code pour faire la geolocalisation dans la creation d'activité, à tester
    //🇬🇧  Below, code for make acitivity with gps , for testing

    // if (step === 1 && address != "" && address.substr(0, 3) !== "GPS") {
    //   const fetchAddressCoord = async () => {
    //     let paris = "";
    //     if (address.indexOf("paris") === -1 && address.indexOf("Paris") === -1)
    //       paris = "+Paris";
    //     const addressParam = address.split(" ").join("+");
    //     const { data } = await axios.get(
    //       "https://api-adresse.data.gouv.fr/search/?q=" + addressParam + paris
    //     );
    //     const coords = data.features[0].geometry.coordinates;
    //   };
    //   fetchAddressCoord();
    // }
  }, [step, address]);

  //🇫🇷 requete backend correctement indiqué , mais procesus ne marche pas, possible erreur dans route backend ---> MANQUE une ligne dans backend pour accepter le formData
  //🇬🇧 query backend is correct but proces not working , possible route error in   ---> It miss  a line for work with PUT and formData
  //const sendModify = async () => {
  //const token = await AsyncStorage.getItem("userToken");
  // const formData = new FormData();
  // formData.append(
  //   "activityId",
  //   typeAction === "edit" ? event._id : null
  // );
  // formData.append("title", title);
  // formData.append("isOnline", online);
  // formData.append("address", address);
  // formData.append(
  //   "location",
  //   !online ? JSON.stringify(location) : null
  // );
  // formData.append("date", date);
  // formData.append("startTime", startTime);
  //formData.append("isAttendeeLimited", isAttendeeLimited);
  // formData.append(
  //   "attendeeLimit",
  //   isAttendeeLimited ? attendeeLimit : 1000000
  // );
  // formData.append("hasPrice", hasPrice);
  // formData.append("price", hasPrice ? priceValue : 0);
  // formData.append("ticketLink", hasPrice ? ticketLink : null);

  // formData.append("helpForOrganizers", helpForOrganizers);
  // formData.append("hasReminderName", hasReminderName);
  // formData.append("reminderName", reminderName);
  // formData.append("requestCoOrganizers", requestCoOrganizers);
  // formData.append("coOrganizerRequests", coOrganizerRequests);
  // formData.append("coOrganizerOffers", coOrganizerOffers);
  // formData.append("coOrganizerGift", coOrganizerGift);

  // formData.append("topic", topic);
  // formData.append("activityImage", activityImage);
  // formData.append("description", description);
  // formData.append("howToFind", howToFind);

  // formData.append("whatsappLink", whatsappLink);
  // formData.append("fbPageLink", fbPageLink);
  // formData.append("fbGroupLink", fbGroupLink);
  // formData.append("meetupLink", meetupLink);
  // formData.append("telegramLink", telegramLink);
  // formData.append("otherLink", otherLink);
  // formData.append("friendsOnly", friendsOnly);
  // formData.append("nbFriends", nbFriend);
  // formData.append("selectPeople", selectPeople);
  // formData.append(
  //   "allowPhoneNumberDisplay",
  //   allowPhoneNumberDisplay
  // );
  // formData.append("allowCoOrganiser", allowCoOrg);
  // formData.append("infoLine", infoLine);
  // formData.append("repeatEvent", repeatEvent);
  // formData.append(
  //   "repeatEventFrequency",
  //   repeatEvent ? repeatEventFrequency : null
  // );
  // formData.append(
  //   "repeatEventDays",
  //   repeatEvent ? repeatEventDays : null
  // );
  // formData.append(
  //   "repeatEventEnd date",
  //   repeatEvent ? repeatEventEndDate : null
  // );
  // formData.append("parity", parity);
  // formData.append("parityValues", JSON.stringify(parityValues));
  // formData.append("allowGuests", allowGuests);
  // formData.append(
  //   "howManyGuests",
  //   allowGuests ? howManyGuests : 0
  // );
  // formData.append("ageRestriction", ageRestriction);
  // formData.append(
  //   "ages",
  //   ageRestriction
  //     ? JSON.stringify(ages)
  //     : JSON.stringify([0, 0])
  // );
  //🇫🇷 route backend correctement indiqué , mais procesus ne marche pas, meme si on reçoit réponse 200 depuis back-end
  //🇬🇧 route backend is correct but proces not working , even if we have response 200 in backend.
  // const { data } = await axios.put(
  //   `${hostname}/api/v1/activities/update/${event._id}`,
  //   ActivityBody,
  //   {
  //     headers: {
  //       Authorization: "Bearer " + token,
  //       "Content-Type": "multipart/form-data",
  //     },
  //   }
  // );
  //console.log("Activity data = ", data);
  // event = JSON.stringify(response.data.activity);
  //setStep(1);
  //navigation.navigate("Activity", { event: data.activity });
  // } catch (error) {
  // console.log("Activity save failed: " + error);
  // }
  //};

  //🇫🇷 requete pour envoyer le données avec method PUT , chaque state et envoyé dans
  //chaque clé valeur ,token utilisateur envoyé pour authentifier la modification
  //🇬🇧 request to send the data with method PUT , each state
  //and sent in each key value , user token sent to authenticate the modification
  const sendModify = async () => {
    const token = await AsyncStorage.getItem("userToken");
    let ValAttendeeLimit = isAttendeeLimited ? attendeeLimit : 1000000;
    const ActivityBody = {
      title: title,
      author: author,
      isOnline: online,
      address: address,
      location: locationEdit, //object json
      date: date,
      startTime: startTime,
      isAttendeeLimited: isAttendeeLimited,
      attendeeLimit: ValAttendeeLimit,
      hasPrice: hasPrice,
      ticketLink: ticketLink,
      helpForOrganizers: helpForOrganizers,
      hasReminderName: hasReminderName,
      reminderName: reminderName,
      requestCoOrganizers: requestCoOrganizers,
      allowCoOrg: allowCoOrg,
      coOrganizerGift: coOrganizerGift,
      nbFriends: nbFriends,
      ///// step 2
      topic: topic,
      ///////step 3
      activityImage: activityImage,
      description: description,
      howToFind: howToFind,
      //// step 4 //// premium roles
      whatsappLink: whatsappLink,
      fbPageLink: fbPageLink,
      fbGroupLink: fbGroupLink,
      meetupLink: meetupLink,
      telegramLink: telegramLink,
      otherLink: otherLink,
      friendsOnly: friendsOnly,
      selectPeople: selectPeople,
      allowGuests: allowGuests,
      allowPhoneNumberDisplay: allowPhoneNumberDisplay,
      infoLine: infoLine,
      parity: parity,
      parityValues: parityValues, //object json
      repeatEvent: repeatEvent,
      repeatEventDays: repeatEventDays,
      repeatEventFrequency: repeatEventFrequency,
      repeatEventEndDate: repeatEventEndDate,
      howManyGuests: howManyGuests,
      ageRestriction: ageRestriction,
      ages: ages, //object json
    };

    console.log(event._id); //Affichage de l'id de l'evenement
    try {
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(ActivityBody),
      };
      const response = await fetch(
        `${hostname}/api/v1/activities/update/${event._id}`,
        requestOptions
      );
      const data = await response.json();
      console.log("Activity data = ", data);
      //🇫🇷 reemplacement de données dans event avec les données modifies depuis ActivityBody
      //🇬🇧 replacing data in event with data changed from ActivityBody
      Object.assign(event, ActivityBody);
      setStep(1);
      navigation.navigate("Activity", {
        event: data.activity,
        pageTitle: activitiesList[event.topic].activityTypeTitle,
      }); /*🇫🇷 navigation to Activity*/ /*🇬🇧 navegation vers Activity */
    } catch (error) {
      console.log("Activity save failed: " + error);
    }
  };

  if (step === 1) {
    return (
      <ScrollView
        style={styles.container}
        keyboardShouldPersistTaps="handled"
        listViewDisplayed={false}
      >
        {/* ----------------Titles---------------- */}
        <View>
          <Text
            style={[
              styles.boldTitle,
              { width: "100%", textAlign: "center", marginVertical: 10 },
            ]}
          >
            {/*🇫🇷 La variable createActivity.step1.information définit l'affichage en "Les informations principales".
                🇬🇧 The variable createActivity.step1.information displays "Main information"*/}
            {createActivity.step1.information}
          </Text>
        </View>
        <View style={styles.fields}>
          {/*🇫🇷 La variable createActivity.step1.activity définit l'affichage en "Les informations principales".
                🇬🇧 The variable createActivity.step1.activity displays "Activity title"*/}
          <InputField
            title={createActivity.step1.activity}
            state={title}
            setState={setTitle}
            specialHeight={60}
          />
        </View>
        <View style={styles.localizationRow}>
          {/*🇫🇷 La variable createActivity.step1.address définit l'affichage en "Adresse.
                🇬🇧 The variable createActivity.step1.address displays "Address"*/}
          <OptionButton
            title={createActivity.step1.address}
            buttonSelected={buttonSelected}
            setButtonSelected={setButtonSelected}
            buttonselect={false}
            scr={scr}
          />

          {/*🇫🇷 La variable createActivity.step1.online définit l'affichage en "En ligne.
                🇬🇧 The variable createActivity.step1.online displays "Online"*/}
          {/*FR le button optionButton est pour le moment désactivé car il provoque un bug (ce bouton ne doit pas être decommenté pour le moment)
            GB The button optionButton is disable for the moment because he provoke an bug (this button is disable for the moment, do not comment)*/}
          {/*<OptionButton
            title={createActivity.step1.online}
            buttonSelected={buttonSelected}
            setButtonSelected={setButtonSelected}
            buttonselect={false}
              />*/}
          {/*🇫🇷 La variable createActivity.step1.mapUrl définit l'affichage en "Url Google Map".
                🇬🇧 The variable createActivity.step1.mapUrl displays "Google Maps URL"*/}
          {/*FR le button optionButton est pour le moment désactivé car il provoque un bug (ce bouton ne doit pas être decommenté pour le moment)
            GB The button optionButton is disable for the moment because he provoke an bug (this button is disable for the moment, , do not comment)*/}
          {/*<OptionButton
            title={createActivity.step1.mapUrl}
            buttonSelected={buttonSelected}
            setButtonSelected={setButtonSelected}
            buttonselect={false}
              />*/}
        </View>

        <View style={{ height: 360, position: "relative" }}>
          <AddressMap
            upperTitle={buttonSelected}
            address={address}
            setAddress={setAddress}
            location={location}
            setLocation={setLocation}
            scr={createActivity}
          />
          {/* {" "} */}
          <Text> :</Text>
        </View>

        {/* 🇫🇷 La variable createActivity.step1.date définit l'affichage en
          "Date". 🇬🇧 The variable createActivity.step1.date displays "Date" */}

        <View style={{ marginTop: 100 }}>
          <DateTimePicker
            title={createActivity.step1.dateTime}
            date={date}
            setDate={setDate}
            time={startTime}
            event={event}
            setTime={setStartTime}
            scr={scr}
          />
        </View>
        {/*🇫🇷 Les utilisateurs avec premium roles ont la possibilité de faire assitants ilimités
                        🇬🇧 Users with premium roles have the ability to make unlimited assistantss*/}
        {premiumRoles.includes(name[0]) && (
          <View style={styles.switchRow}>
            <Text style={styles.boldTitle}>
              {/*🇫🇷 La variable createActivity.step1.unlimited définit l'affichage en "Participants illimités".
                    🇬🇧 The variable createActivity.step1.unlimited displays "Unlimited attendees"*/}
              {createActivity.step1.unlimited}
            </Text>
            <SwitchBtn
              state={isAttendeeLimited}
              setState={setIsAttendeeLimited}
            />
          </View>
        )}

        <Text style={ styles.stepOneTxt }>
          {/*🇫🇷 La variable createActivity.step1.theOnly définit l'affichage en "(la seule application sans restrictions pour les organisateurs)".
                  🇬🇧 The variable createActivity.step1.theOnly displays "(The only map without restrictions for organizers)"*/}
          {createActivity.step1.theOnly}
        </Text>
        {/* "theOnly": "(The only map without restrictions for organizers)" */}
        {!isAttendeeLimited && (
          <View style={styles.fields}>
            <Text style={styles.boldTitle}>
              {createActivity.step1.attendee}
            </Text>
            {/* "attendee": "Attendee limitation" */}
            <OneValueSlider
              minVal={2}
              maxVal={premiumRoles.includes(name[0]) ? 100 : 20}
              state={attendeeLimit === 1000000 ? 2 : attendeeLimit}
              setState={setAttendeeLimit}
            />
          </View>
        )}
        {/*FR Bouton du prix */}
        {/*GB Price button */}
        <View style={styles.switchRow}>
          <Text style={styles.boldTitle}>
            {/*🇫🇷 La variable createActivity.step1.price définit l'affichage en "Prix".
                    🇬🇧 The variable createActivity.step1.price displays "Price"*/}
            {createActivity.step1.price}
          </Text>
          <SwitchBtn state={hasPrice} setState={setHasPrice} />
        </View>
        {/*FR Les champs ci-dessous s'affichent si le bouton est activé(si le state hasPrice a une valeur*/}
        {/*GB The fields below only display when the button is on (if the state hasPrice contains a value*/}
        <View style={styles.fields}>
          {hasPrice && (
            <>
              <View style={styles.fields}>
                {/*🇫🇷 La variable createActivity.step1.price définit l'affichage en "Prix".
                    🇬🇧 The variable createActivity.step1.price displays "Price"*/}
                {/* <Fields
                  text={createActivity.step1.price}
                  state={priceValue}
                  setState={setPriceValue}
                /> */}
              </View>
              <View style={styles.fields}>
                {/*🇫🇷 La variable createActivity.step1.buyTicket définit l'affichage en "Url de la billeterie".
                    🇬🇧 The variable createActivity.step1.buyTicket displays "Buy ticket link"*/}
                <Fields
                  text={createActivity.step1.buyTicket}
                  state={ticketLink === "null" ? "" : ticketLink}
                  setState={setTicketLink}
                />
              </View>
            </>
          )}
        </View>
        <View style={styles.fields}>
          <Text style={styles.boldTitle}>
            {/*🇫🇷 La variable createActivity.step1.howMany définit l'affichage en "How many friends with me".
                    🇬🇧 The variable createActivity.step1.howMany displays "Combien d'amis avec moi"*/}
            {createActivity.step1.howMuch}
          </Text>
          <OneValueSlider
            minVal={0}
            maxVal={10}
            state={nbFriends}
            setState={setNbFriends}
          />
        </View>
        <View style={styles.switchRow}>
          <Text style={styles.boldTitle}>
            {/*🇫🇷 La variable createActivity.step1.b2022_helpOrganizers définit l'affichage en "Help for organizers".
                    🇬🇧 The variable createActivity.step1.b2022_helpOrganizers displays "Help for organizers"*/}
            {createActivity.step1.b2022_helpOrganizers}
          </Text>
          <SwitchBtn
            state={helpForOrganizers}
            setState={setHelpForOrganizers}
          />
        </View>
        <View style={styles.fields}>
          {helpForOrganizers && (
            <>
              <View style={styles.switchRow}>
                <Text style={styles.boldTitle}>
                  {/*🇫🇷 La variable createActivity.step1.b2022_helpOrganizers définit l'affichage en "".
                    🇬🇧 The variable createActivity.step1.b2022_helpOrganizers displays "Change my reminder name"*/}
                  {createActivity.step1.b2022_reminderName}
                </Text>
                {/*"b2022_reminderName": "Change my reminder name"*/}
                <TouchableOpacity style={{ marginLeft: 5 }}>
                  <Icon
                    name="help-circle"
                    type="ionicons"
                    color={"black"}
                    size={22}
                  />
                </TouchableOpacity>
                <SwitchBtn
                  state={hasReminderName}
                  setState={setHasReminderName}
                />
              </View>

              {hasReminderName && (
                <View>
                  <InputField
                    title={"Reminder Name"}
                    state={reminderName}
                    setState={setReminderName}
                  />
                </View>
              )}

              <View style={styles.switchRow}>
                <Text style={styles.boldTitle}>
                  {/*🇫🇷 La variable createActivity.step1.b2022_coOrganizerRequest définit l'affichage en "".
                    🇬🇧 The variable createActivity.step1.b2022_coOrganizerRequest displays "Request Co-organizers"*/}
                  {createActivity.step1.b2022_coOrganizerRequest}
                </Text>
                <SwitchBtn
                  state={requestCoOrganizers}
                  setState={setRequestCoOrganizers}
                />
              </View>

              {requestCoOrganizers && (
                <>
                  <View style={styles.fields}>
                    <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                      {/*🇫🇷 La variable createActivity.step1.b2022_coOrganizerRequest définit l'affichage en "".
                      🇬🇧 The variable createActivity.step1.b2022_coOrganizerRequestChoice displays "Choose Co-organizers request:"*/}
                      {createActivity.step1.b2022_coOrganizerRequestChoice}
                    </Text>
                  </View>

                  <View style={styles.coOrganizersOptions}>
                    <TouchableOpacity
                      style={[
                        styles.coOrganizerCard,
                        { backgroundColor: "#59c09b" },
                      ]}
                      disabled={true}
                    >
                      <View style={styles.coOrganizerIcon}>
                        <Icon
                          name="mail"
                          type="ionicons"
                          color="#59c09b"
                          size={28}
                        />
                      </View>
                      <Text
                        style={{
                          textAlign: "center",
                          fontWeight: "bold",
                          color: "white",
                        }}
                      >
                        {/*🇫🇷 La variable createActivity.step1.b2022_coOrganizerMessage définit l'affichage en "".
                       🇬🇧 The variable createActivity.step1.b2022_coOrganizerMessage displays "Receive private message"*/}
                        {createActivity.step1.b2022_coOrganizerMessage}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() =>
                        manageCoOrganizerRequests(
                          "Come 5 min earlier to the activity"
                        )
                      }
                      style={[
                        styles.coOrganizerCard,
                        {
                          backgroundColor: coOrganizerRequests.includes(
                            "Come 5 min earlier to the activity"
                          )
                            ? "#59c09b"
                            : "#E6E6E6",
                        },
                      ]}
                    >
                      <View style={styles.coOrganizerIcon}>
                        <Icon
                          name="alarm"
                          type="ionicons"
                          color="#59c09b"
                          size={28}
                        />
                      </View>
                      <Text
                        style={{
                          textAlign: "center",
                          fontWeight: "bold",
                          color: coOrganizerRequests.includes(
                            "Come 5 min earlier to the activity"
                          )
                            ? "white"
                            : "black",
                        }}
                      >
                        {/*🇫🇷 La variable createActivity.step1.b2022_coOrganizerRequestEarly définit l'affichage en "".
                       🇬🇧 The variable createActivity.step1.b2022_coOrganizerRequestEarly displays "Come 5 minutes earlier to the activity"*/}
                        {createActivity.step1.b2022_coOrganizerRequestEarly}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.fields}>
                    <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                      {/*🇫🇷 La variable createActivity.step1.b2022_coOrganizerMyOffer définit l'affichage en "".
                      🇬🇧 The variable createActivity.step1.b2022_coOrganizerMyOffer displays "I want to offer:"*/}
                      {createActivity.step1.b2022_coOrganizerMyOffer}
                    </Text>
                  </View>

                  <View style={styles.coOrganizersOptions}>
                    <TouchableOpacity
                      disabled={true}
                      onPress={() => manageCoOrganizerOffers("A free drink")}
                      style={[
                        styles.coOrganizerCard,
                        { backgroundColor: "#59c09b" },
                      ]}
                    >
                      <View style={styles.coOrganizerIcon}>
                        <Image
                          source={DrinkIcon}
                          style={{ width: 30, height: 30 }}
                        />
                      </View>
                      <Text style={ styles.coOrganizerOfferDrinkTxt }>
                        {/*🇫🇷 La variable createActivity.step1.b2022_coOrganizerOfferDrink définit l'affichage en "".
                        🇬🇧 The variable createActivity.step1.b2022_coOrganizerOfferDrink displays "I want to offer:"*/}
                        {createActivity.step1.b2022_coOrganizerOfferDrink}
                      </Text>
                      {/*A free drink*/}
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => manageCoOrganizerOffers("A free pass")}
                      style={[
                        styles.coOrganizerCard,
                        {
                          backgroundColor: coOrganizerOffers.includes(
                            "A free pass"
                          )
                            ? "#59c09b"
                            : "#E6E6E6",
                        },
                      ]}
                    >
                      <View style={styles.coOrganizerIcon}>
                        <Image
                          source={TicketIcon}
                          style={{ width: 34, height: 34 }}
                        />
                      </View>
                      <Text
                        style={{
                          textAlign: "center",
                          fontWeight: "bold",
                          color: coOrganizerOffers.includes("A free pass")
                            ? "white"
                            : "black",
                        }}
                      >
                        {createActivity.step1.b2022_coOrganizerOfferPass}
                      </Text>
                      {/*A free pass*/}
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => manageCoOrganizerOffers("Other gift")}
                      style={[
                        styles.coOrganizerCard,
                        {
                          backgroundColor: coOrganizerOffers.includes(
                            "Other gift"
                          )
                            ? "#59c09b"
                            : "#E6E6E6",
                        },
                      ]}
                    >
                      <View style={styles.coOrganizerIcon}>
                        <Image
                          source={GiftIcon}
                          style={{ width: 30, height: 30 }}
                        />
                      </View>
                      <Text
                        style={{
                          textAlign: "center",
                          fontWeight: "bold",
                          color: coOrganizerOffers.includes("Other gift")
                            ? "white"
                            : "black",
                        }}
                      >
                        {createActivity.step1.b2022_coOrganizerOfferGift}
                      </Text>
                      {/*Other gift*/}
                    </TouchableOpacity>
                  </View>

                  {coOrganizerOffers.includes("Other gift") && (
                    <View style={styles.fields}>
                      <InputField
                        title={createActivity.step1.b2022_coOrganizerGiftName}
                        state={coOrganizerGift}
                        setState={setCoOrganizerGift}
                      />
                      {/*What will you offer?*/}
                    </View>
                  )}
                </>
              )}
            </>
          )}
        </View>
        {/* ------------Save or Continue------------ */}
        <Text style={ styles.errorMsgTxt }>
          {errorMessage}
        </Text>
        {/*FR Bouton pour passer à l'étape suivante*/}
        {/*GB Button to enter next step*/}
        <View style={{ margin: 15, alignSelf: "center" }}>
          <LogButton
            text={editProfile.step2.continue}
            width={150}
            backgroundColor={"#59c09b"}
            func={(n) => {
              setErrorMessage("");
              setStep(n);
            }}
            arg={step + 1}
          />
        </View>
      </ScrollView>
    );
  }

  //FR Création d'activité - Choix du thème (Frame 33 MVP du Figma )
  //GB Event creation - Theme choice (Frame 33 MVP Figma)
  if (step === 2) {
    return (
      <ScrollView>
        {/* ----------------Titles---------------- */}
        <Text style={[styles.boldTitle, { paddingHorizontal: 20 }]}>
          {createActivity.step2.choose}
        </Text>
        {/* "choose": "Choose a Topic :" */}
        <Text style={{ marginVertical: 10, paddingHorizontal: 20 }}>
          {createActivity.step2.inOrder}
        </Text>
        {/* "inOrder": "Your event will look more exciting with a nice picture!" */}
        {/*FR Grille de la liste des thèmes d'activités. Le props selectionMode limite
          le choix à un seul.*/}
        {/*GB Activity topic grid. The props selectionMode limits our choice to one.*/}
        <ActivityTypesGrid_OneTopic
          topic={topic}
          setTopic={setTopic}
          selectionMode={"one"}
        />

        {/* ------------Save or Continue------------ */}
        <Text style={ styles.errorMsgTxt }>
          {errorMessage}
        </Text>

        <View style={[styles.savOrConButtons, { paddingHorizontal: 15 }]}>
          <LogButton
            text={createActivity.step3.goBack} // Previous
            width={150}
            backgroundColor={"#59c09b"}
            func={(n) => {
              setErrorMessage("");
              setStep(n);
            }}
            arg={step - 1}
          />
          {/*🇫🇷 Ci-dessous le code fait une diference de bouton pour les utilisateurs avec premium roles, les utilisateurs avec roles passent pour étape suivante avec liens sur reseaux sociaux
                        🇬🇧 Below the code makes a button difference for users with premium roles, users with roles go to next step with links on social networks*/}
          {premiumRoles.includes(name[0]) ? (
            <LogButton
              text={createActivity.step3.continue}
              width={150}
              backgroundColor={"#59c09b"}
              func={(n) => {
                setErrorMessage("");
                setStep(n);
              }}
              arg={step + 1}
            />
          ) : (
            <LogButton
              text={createActivity.step4.publish}
              width={150}
              backgroundColor={"#59c09b"}
              func={() => sendModify()}
              // arg={null}
            />
          )}
        </View>
      </ScrollView>
    );
  }

  //FR Création d'activité - Photo et description (Frame 34 MVP du Figma )
  //GB Event creation - Photo and description (Frame 34 MVP Figma)
  if (step === 3) {
    return (
      <ScrollView style={styles.container}>
        {/* ----------------Titles---------------- */}
        <Text style={[styles.boldTitle, { marginVertical: 10 }]}>
          {createActivity.step3.please}
        </Text>
        {/* "please": "Tell us more about your activity:" */}

        <ActivityPhoto
          topic={topic}
          activityImage={activityImage}
          setActivityImage={setActivityImage}
          disabled={disableButton}
          setDisabled={setDisbaleButton}
          scr={scr}
        />

        <View style={[styles.fields, { marginVertical: 30 }]}>
          <MultilineFields
            title={createActivity.step3.description} // "description": "Description"
            state={description}
            setState={setDescription}
            lines={15}
          />
        </View>
        <View style={styles.fields}>
          <MultilineFields
            title={createActivity.step3.how} // "how": "How to find me"
            state={howToFind}
            setState={setHowToFind}
            lines={10}
          />
        </View>

        {/* ------------Save or Continue------------ */}

        <Text style={ styles.errorMsgTxt }>
          {errorMessage}
        </Text>

        <View style={styles.savOrConButtons}>
          <LogButton
            text={createActivity.step3.goBack}
            width={150}
            backgroundColor={"#59c09b"}
            func={(n) => {
              setErrorMessage("");
              setStep(n);
            }}
            arg={step - 1}
          />
          <LogButton
            text={createActivity.step3.continue}
            width={150}
            backgroundColor={"#59c09b"}
            func={(n) => {
              setErrorMessage("");
              setStep(n);
            }}
            arg={step + 1}
          />
        </View>
      </ScrollView>
    );
  }

  //FR Création d'activité - Infos complémentaires (Frame 35 MVP du Figma )
  //GB Event creation - Additional info (Frame 35 MVP Figma)
  if (step === 4) {
    return (
      <ScrollView style={styles.container}>
        {/* ----------------Titles---------------- */}
        <Text
          style={[
            styles.boldTitle,
            { alignSelf: "center", marginVertical: 10 },
          ]}
        >
          {/* FR Afficher ce texte dans une nouvelle variable dans en.json si nécessaire*/}
          {/* GB The text should be stored in a new variable inside en.json */}
          {createActivity.step4.b2022_optionalFeatures}
        </Text>

        <Fields
          text="WhatsApp group link"
          state={whatsappLink}
          setState={setWhatsappLink}
        />
        <Fields text="Page" state={fbPageLink} setState={setFbPageLink} />
        <Fields text="Group" state={fbGroupLink} setState={setFbGroupLink} />
        <Fields text="Meetup" state={meetupLink} setState={setMeetupLink} />
        <Fields
          text="Telegram"
          state={telegramLink}
          setState={setTelegramLink}
        />
        <Fields text="Autre Link" state={otherLink} setState={setOtherLink} />

        <View style={[styles.row, { marginBottom: 15 }]}>
          {/* <CheckboxSquare title={"50% Guys 50% Girls"} state={state} setState={setState}/>
            <CheckboxSquare title={"Girls only"} state={state} setState={setState}/>
            <CheckboxSquare title={"Guys only"} state={state} setState={setState}/> */}
          <CheckboxSquare
            title={createActivity.step4.b2022_friendsOnly}
            state={friendsOnly}
            setState={setFriendsOnly}
          />
          <CheckboxSquare
            title={createActivity.step4.select}
            state={selectPeople}
            setState={setSelectPeople}
          />
          <CheckboxSquare
            title={createActivity.step4.b2022_phoneNumberVisible}
            state={allowPhoneNumberDisplay}
            setState={setAllowPhoneNumberDisplay}
          />
          {/* <CheckboxSquare title={createActivity.step4.allow} state={allowCoOrg} setState={setAllowCoOrg}/> */}
        </View>

        <InputField
          title={createActivity.step4.b2022_infoLine}
          state={infoLine}
          setState={setInfoLine}
        />

        {/* <View style={styles.switchRow}>
            <Text style={[styles.boldTitle, { color: "#1E7354" }]}>
              {createActivity.step4.b2022_repeatEvent}
            </Text>
            <SwitchBtn state={repeatEvent} setState={setRepeatEvent} />
          </View>

           {repeatEvent && (
            <>
              <View style={styles.timeDataContainer}>
                <TouchableOpacity
                  onPress={() => setRepeatEventFrequency(createActivity.step4.b2022_weekly)}
                  style={
                    repeatEventFrequency === createActivity.step4.b2022_weekly
                      ? [
                          styles.timePickView,
                          {
                            backgroundColor: "#59c09b",
                            borderBottomLeftRadius: 15,
                            borderTopLeftRadius: 15,
                          },
                        ]
                      : styles.timePickView
                  }
                >
                  <Text
                    style={
                      repeatEventFrequency === createActivity.step4.b2022_weekly
                        ? [styles.boldTitleSecondary, { color: "white" }]
                        : [styles.boldTitleSecondary, { color: "black" }]
                    }
                  >
                    {createActivity.step4.b2022_weekly}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setRepeatEventFrequency(createActivity.step4.b2022_monthly)}
                  style={
                    repeatEventFrequency === createActivity.step4.b2022_monthly
                      ? [
                          styles.timePickView,
                          styles.middle,
                          { backgroundColor: "#59c09b" },
                        ]
                      : [styles.timePickView, styles.middle, { height: 40 }]
                  }
                >
                  <Text
                    style={
                      repeatEventFrequency === createActivity.step4.b2022_monthly
                        ? [styles.boldTitleSecondary, { color: "white" }]
                        : [styles.boldTitleSecondary, { color: "black" }]
                    }
                  >
                    {createActivity.step4.b2022_monthly}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setRepeatEventFrequency(createActivity.step4.b2022_yearly)}
                  style={
                    repeatEventFrequency === createActivity.step4.b2022_yearly
                      ? [
                          styles.timePickView,
                          {
                            backgroundColor: "#59c09b",
                            borderBottomRightRadius: 15,
                            borderTopRightRadius: 15,
                          },
                        ]
                      : styles.timePickView
                  }
                >
                  <Text
                    style={
                      repeatEventFrequency === createActivity.step4.b2022_yearly
                        ? [styles.boldTitleSecondary, { color: "white" }]
                        : [styles.boldTitleSecondary, { color: "black" }]
                    }
                  >
                    {createActivity.step4.b2022_yearly}
                  </Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.boldTitle}>{createActivity.step4.b2022_selectDays}</Text>
              <View
                style={[
                  styles.row,
                  { marginVertical: 10, justifyContent: "center" },
                ]}
              >
                <TouchableOpacity
                  style={
                    repeatEventDays.includes(createActivity.step4.b2022_monday)
                      ? [styles.styledInputDay, { backgroundColor: "#59c09d" }]
                      : styles.styledInputDay
                  }
                  onPress={() => manageFrequencyDays(createActivity.step4.b2022_monday)}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: repeatEventDays.includes(createActivity.step4.b2022_monday)
                        ? "white"
                        : "black",
                    }}
                  >
                    {createActivity.step4.b2022_monday}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    repeatEventDays.includes(createActivity.step4.b2022_tuesday)
                      ? [styles.styledInputDay, { backgroundColor: "#59c09d" }]
                      : styles.styledInputDay
                  }
                  onPress={() => manageFrequencyDays(createActivity.step4.b2022_tuesday)}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: repeatEventDays.includes(createActivity.step4.b2022_tuesday)
                        ? "white"
                        : "black",
                    }}
                  >
                    {createActivity.step4.b2022_tuesday}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    repeatEventDays.includes(createActivity.step4.b2022_wednesday)
                      ? [styles.styledInputDay, { backgroundColor: "#59c09d" }]
                      : styles.styledInputDay
                  }
                  onPress={() => manageFrequencyDays(createActivity.step4.b2022_wednesday)}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: repeatEventDays.includes(createActivity.step4.b2022_wednesday)
                        ? "white"
                        : "black",
                    }}
                  >
                    {createActivity.step4.b2022_wednesday}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    repeatEventDays.includes(createActivity.step4.b2022_thursday)
                      ? [styles.styledInputDay, { backgroundColor: "#59c09d" }]
                      : styles.styledInputDay
                  }
                  onPress={() => manageFrequencyDays(createActivity.step4.b2022_thursday)}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: repeatEventDays.includes(createActivity.step4.b2022_thursday)
                        ? "white"
                        : "black",
                    }}
                  >
                    {createActivity.step4.b2022_thursday}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    repeatEventDays.includes(createActivity.step4.b2022_friday)
                      ? [styles.styledInputDay, { backgroundColor: "#59c09d" }]
                      : styles.styledInputDay
                  }
                  onPress={() => manageFrequencyDays(createActivity.step4.b2022_friday)}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: repeatEventDays.includes(createActivity.step4.b2022_friday)
                        ? "white"
                        : "black",
                    }}
                  >
                    {createActivity.step4.b2022_friday}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    repeatEventDays.includes(createActivity.step4.b2022_saturday)
                      ? [styles.styledInputDay, { backgroundColor: "#59c09d" }]
                      : styles.styledInputDay
                  }
                  onPress={() => manageFrequencyDays(createActivity.step4.b2022_saturday)}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: repeatEventDays.includes(createActivity.step4.b2022_saturday)
                        ? "white"
                        : "black",
                    }}
                  >
                    {createActivity.step4.b2022_saturday}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    repeatEventDays.includes(createActivity.step4.b2022_sunday)
                      ? [styles.styledInputDay, { backgroundColor: "#59c09d" }]
                      : styles.styledInputDay
                  }
                  onPress={() => manageFrequencyDays(createActivity.step4.b2022_sunday)}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: repeatEventDays.includes(createActivity.step4.b2022_sunday)
                        ? "white"
                        : "black",
                    }}
                  >
                    {createActivity.step4.b2022_sunday}
                  </Text>
                </TouchableOpacity>
              </View>

              <DateField
                title={"Repeat until: "}
                state={repeatEventEndDate}
                setState={setRepeatEventEndDate}
              />
            </>
          )}  */}

        <View style={styles.switchRow}>
          <Text style={[styles.boldTitle, { color: "#1E7354" }]}>
            {createActivity.step4.b2022_parity}
          </Text>
          <SwitchBtn state={parity} setState={setParity} />
        </View>

        {parity && (
          <View style={styles.fields}>
            <ParitySlider state={parityValues} setState={setParityValues} />
          </View>
        )}

        <View style={styles.switchRow}>
          <Text style={[styles.boldTitle, { color: "#1E7354" }]}>
            {createActivity.step4.b2022_allowGuests}
          </Text>
          <SwitchBtn state={allowGuests} setState={setAllowGuests} />
        </View>

        {allowGuests && (
          <View>
            <OneValueSlider
              minVal={1}
              maxVal={5}
              state={howManyGuests}
              setState={setHowManyGuests}
            />
          </View>
        )}

        <View style={styles.switchRow}>
          <Text style={[styles.boldTitle, { color: "#1E7354" }]}>
            {createActivity.step4.b2022_ageRestrict}
          </Text>
          <SwitchBtn state={ageRestriction} setState={setAgeRestriction} />
        </View>

        {ageRestriction && (
          <View>
            <TwoValuesSlider
              minVal={18}
              maxVal={99}
              state={ages}
              setState={setAges}
            />
          </View>
        )}

        {/* ------------Save or Continue------------ */}
        <View style={[styles.savOrConButtons, { marginTop: 40 }]}>
          <LogButton
            text={createActivity.step3.goBack}
            width={150}
            backgroundColor={"#59c09b"}
            func={setStep}
            arg={step - 1}
          />
          {/*FR Envoi des données du formulaire au back-end*/}
          {/*GB Sending form data to the back-end*/}
          <LogButton
            text={createActivity.step4.publish}
            width={150}
            backgroundColor={"#59c09b"}
            func={() => sendModify()}
            // arg={null}
          />
        </View>
      </ScrollView>
    );
  }
};

export default ModifyActivityScreen;
