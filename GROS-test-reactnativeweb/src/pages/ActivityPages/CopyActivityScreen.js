// 🇫🇷 Pages  - Copy d'activité (Figma Frame 31 à 34) 🇫🇷
// 🇬🇧 Copy Activity pages (Figma Frame 31 to 34) 🇬🇧

// React
import { Text, View, ScrollView, TouchableOpacity, LogBox } from "react-native";
import styles from "../Styles/CopyActivityScreenCss";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";

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
import { hostname } from "../../../../mvp-reactnative/backendconnect/hostname.js";

import { TextInput } from "react-native-paper";
// import moment from "moment";
// import * as ImagePicker from "expo-image-picker";

LogBox.ignoreLogs([
  "VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.",
]);
// Des variables json de en.json permettant la traduction dans les différentes langues

const CopyActivityScreen = ({ userToken, user, scr }) => {
  //🇫🇷  Changement de la langue depuis app.js //🇬🇧 language changed from app.js

  const route = useRoute();
  const navigation = useNavigation();

  const event = route.params.event;

  console.log("user", user);
  console.log("info event", route.params.event);

  // const { name } = { id: ["63dbb015fa57f16516f8d6a1"], name: ["user"] }; //🇫🇷  faux role enregistre juste pour travailler sur la page
  //                                                                 //🇬🇧  fake role just for working in page

  const { name } = user?.role;
  //role est un array, d'où le [0]

  console.log("user.role", user?.role);

  // const { createActivity, editProfile } = Json;

  const { createActivity, editProfile } = scr; //🇫🇷  Changement de la langue depuis app.js //🇬🇧 language changed from app.js
  //

  const premiumRoles = ["admin", "moderator", "Diamond star"];

  // console.log(userToken);
  const [buttonSelected, setButtonSelected] = useState(
    createActivity.step1.address
  );

  const [step, setStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  //FR ETAPE 1-variables relatives
  //GB STEP 1-related variables
  const [author, setAuthor] = useState();
  //FR Récupérer l'ID et le nom de l'utilisateur, il serait mieux de le faire avec useContext
  //GB Get the id and the name of the user; could be nice to do it with useContext, I think
  const [title, setTitle] = useState(event.title); //ENLEVER PLUS TARD
  const [address, setAddress] = useState(event.address);
  const [online, setOnline] = useState(event.online);
  const [location, setLocation] = useState(JSON.parse(event.location));
  const [locationEdit, setLocationEdit] = useState(
    !online ? JSON.stringify(location) : null
  );
  const [date, setDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  //FR Nombre de participants
  //GB How many attendants
  const [isAttendeeLimited, setIsAttendeeLimited] = useState(
    event.isAttendeeLimited ?? false
  );
  const [attendeeLimit, setAttendeeLimit] = useState(event.attendeeLimit);

  const [disableButton, setDisbaleButton] = useState(false);
  const [hasPrice, setHasPrice] = useState(event.hasPrice ?? false);
  //const [priceValue, setPriceValue] = useState(0);
  const [ticketLink, setTicketLink] = useState(event.ticketLink);

  const [nbFriend, setNbFriend] = useState(event.nbFriends);

  const [helpForOrganizers, setHelpForOrganizers] = useState(
    //🇫🇷 Vérifie si l'offre n'est pas déjà incluse dans le tableau coOrganizerOffers
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

  //🇫🇷 Vérifie si la requête n'est pas déjà incluse dans le tableau coOrganizerRequests
  //🇬🇧 Check if the request is not already included in the coOrganizerRequests array
  const manageCoOrganizerRequests = (request) => {
    if (!coOrganizerRequests.includes(request)) {
      //🇫🇷 Définissez optionInArray sur true pour indiquer qu'une option est sélectionnée
      //🇬🇧 Set optionInArray to true to indicate that an option is selected
      setOptionInArray(true);

      //🇫🇷 Ajoute la requête au tableau coOrganizerRequests
      //🇬🇧 Add the request to the coOrganizerRequests array
      setCoOrganizerRequests((previousArray) => {
        return [...previousArray, request];
      });
    } else {
      setOptionInArray(false);
      //🇫🇷 Supprime la requête du tableau coOrganizerRequests
      //🇬🇧 Remove the request from the coOrganizerRequests array
      setCoOrganizerRequests((previousArray) => {
        return previousArray.filter((item, index) => {
          return item !== request;
        });
      });
    }
  };

  const manageCoOrganizerOffers = (offer) => {
    //🇫🇷 Vérifie si l'offre n'est pas déjà incluse dans le tableau coOrganizerOffers
    if (!coOrganizerOffers.includes(offer)) {
      setOptionInArray(true); //🇫🇷 Définissez optionInArray sur true pour indiquer qu'une option est sélectionnée
      setCoOrganizerOffers((previousArray) => {
        return [...previousArray, offer];
      });
    } else {
      setOptionInArray(false); //🇫🇷 Supprime l'offre du tableau coOrganizerOffers
      setCoOrganizerOffers((previousArray) => {
        return previousArray.filter((item, index) => {
          return item !== offer;
        });
      });
    }
  };
  //FR Lorsque l'utilisateur active les premières options sont ajoutées ou supprimées du tableau
  //GB If the user switches Request Co-organizers on, the first options are added or removed from the array
  useEffect(() => {
    if (requestCoOrganizers) {
      //🇫🇷 Si l'utilisateur active la demande de co-organisateurs, les premières options sont ajoutées au tableau
      setCoOrganizerRequests([createActivity.step1.b2022_coOrganizerMessage]); //🇫🇷 Ajoute la requête au tableau coOrganizerRequests
      setCoOrganizerOffers([createActivity.step1.coOrganizerOfferDrink]); //🇫🇷 Ajoute l'offre au tableau coOrganizerOffers
    } else {
      //🇫🇷 Si l'utilisateur désactive la demande de co-organisateurs, les premières options sont supprimées du tableau
      setCoOrganizerRequests([]); //🇫🇷 Supprime la requête du tableau coOrganizerRequests
      setCoOrganizerOffers([]); //🇫🇷 Supprime l'offre du tableau coOrganizerOffers
    }
  }, [requestCoOrganizers]);

  // const [forbiddenPeople, setForbiddenPeople] = useState([]);
  // const [invitations, setInvitations] = useState([]);
  // const [type, setType] = useState("");
  // const [fake, setFake] = useState(true);
  // const [restriction, setRestriction] = useState(false);

  //STEP 2-related variables
  console.log("topic", event.topic); //🇫🇷 Valeur pour default pour topic //🇬🇧 default value for topic
  const [topic, setTopic] = useState(event.topic);

  //STEP 3-related variables
  const [activityImage, setActivityImage] = useState(event.activityImage);

  const [description, setDescription] = useState(event.description); //🇫🇷 Valeur pour default pour description //🇬🇧 default value for description
  const [howToFind, setHowToFind] = useState(event.howToFind); //🇫🇷 Valeur pour default pour how to find ux //🇬🇧 default value for how to find us

  //STEP 4-related variables
  const [whatsappLink, setWhatsappLink] = useState(event.whatsappLink); //🇫🇷 Valeur pour default pour whatsappLink //🇬🇧 default value for whatsappLink
  const [fbPageLink, setFbPageLink] = useState(event.fbPageLink); //🇫🇷 Valeur pour default pour fbPageLink //🇬🇧 default value for fbPageLink
  const [fbGroupLink, setFbGroupLink] = useState(event.fbGroupLink); //🇫🇷 Valeur pour default pour fbGroupLink //🇬🇧 default value for fbGroupLink
  const [meetupLink, setMeetupLink] = useState(event.meetupLink); //🇫🇷 Valeur pour default pour meetupLink //🇬🇧 default value for meetupLink
  const [telegramLink, setTelegramLink] = useState(event.telegramLink); //🇫🇷 Valeur pour default pour telegramLink //🇬🇧 default value for telegramLink
  const [otherLink, setOtherLink] = useState(event.otherLink); //🇫🇷 Valeur pour default pour otherLink //🇬🇧 default value for otherLink

  const [friendsOnly, setFriendsOnly] = useState(false); //🇫🇷 Valeur pour default pour friendsOnly //🇬🇧 default value for friendsOnly
  const [selectPeople, setSelectPeople] = useState(false); //🇫🇷 Valeur pour default pour selectPeople //🇬🇧 default value for selectPeople
  const [allowPhoneNumberDisplay, setAllowPhoneNumberDisplay] = useState(false); //🇫🇷 Valeur pour default pour allowPhoneNumberDisplay //🇬🇧 default value for allowPhoneNumberDisplay
  const [allowCoOrg, setAllowCoOrg] = useState(false);
  //Go fetch the list of the user's friends if true
  const [infoLine, setInfoLine] = useState("");

  const [repeatEvent, setRepeatEvent] = useState(false); //🇫🇷 Valeur pour default pour repeatEvent //🇬🇧 default value for repeatEvent
  const [repeatEventFrequency, setRepeatEventFrequency] = useState(""); //🇫🇷 Valeur pour default pour repeatEventFrequency //🇬🇧 default value for repeatEventFrequency
  const [repeatEventDays, setRepeatEventDays] = useState([]); //🇫🇷 Valeur pour default pour repeatEventDays //🇬🇧 default value for repeatEventDays
  //🇬🇧STEP 4 event repeat manager code
  const [dayInArray, setDayInArray] = useState(false);
  const [repeatEventEndDate, setRepeatEventEndDate] = useState(null); //🇫🇷 Valeur pour default pour repeatEventEndDate //🇬🇧 default value for repeatEventEndDate

  const manageFrequencyDays = (day) => {
    //🇬🇧Manage the event rehearsal days(fr)/ (gb)
    //🇫🇷Gère les jours de répétition de l'événement(fr)/ (gb)
    if (!repeatEventDays.includes(day)) {
      setDayInArray(true); //🇫🇷 Définissez optionInArray sur true pour indiquer qu'une option est sélectionnée
      setRepeatEventDays((previousArray) => {
        return [...previousArray, day]; //🇫🇷 Ajoute la requête au tableau coOrganizerRequests
      });
    } else {
      setDayInArray(false); //🇫🇷 Supprime la requête du tableau coOrganizerRequests
      setRepeatEventDays((previousArray) => {
        return previousArray.filter((item, index) => {
          return item !== day; //🇫🇷 Supprime la requête du tableau coOrganizerRequests
        });
      });
    }
  };
  // console.log(repeatEventDays);
  const [parity, setParity] = useState(false); //🇫🇷 Valeur pour default pour parity //🇬🇧 default value for parity
  const [parityValues, setParityValues] = useState({ male: 50, female: 50 }); //🇫🇷 Valeur pour default pour parityValues //🇬🇧 default value for parityValues

  const [allowGuests, setAllowGuests] = useState(false); //🇫🇷 Valeur pour default pour allowGuests //🇬🇧 default value for allowGuests
  const [howManyGuests, setHowManyGuests] = useState(1); //🇫🇷 Valeur pour default pour howManyGuests //🇬🇧 default value for howManyGuests

  const [ageRestriction, setAgeRestriction] = useState(false); //🇫🇷 Valeur pour default pour ageRestriction //🇬🇧 default value for ageRestriction
  const [ages, setAges] = useState([20, 40]);

  const showError = (text) => {
    //🇫🇷 Affiche l'erreur et retourne à l'étape précédente
    setErrorMessage(text);
    setStep(step - 1);
  };

  //🇫🇷 Gestion de la validation des éléments entre les étapes de création d'activité
  //🇬🇧GB The useEffect manages validation between the event creation steps
  useEffect(() => {
    if (step === 2) {
      //FR quand on passe de l'étape 1 à l'étape 2
      //🇬🇧GB from step 1 to step 2
      if (title === "") return showError(scr.createActivity.step2.titleError);
      //🇫🇷 Affiche error si le titre est vide 🇫🇷
      else if (address === undefined || address === "")
        return showError(scr.createActivity.step2.addressError);
      //🇫🇷 Affiche error si l'adresse est vide 🇫🇷
      else if (date === null || startTime === null || date === "Invalid date")
        return showError(scr.createActivity.step2.datetimeError);
      //🇫🇷 Affiche error si la date ou l'heure est vide 🇫🇷
      /* 🇫🇷 Affiche error si le lien pour ticket n'est pas valid avec debut http.. 🇫🇷 */
      /* 🇬🇧Show error if ticket link is not valid with start http..  🇬🇧 */ else if (
        hasPrice
      ) {
        if (
          !(
            ticketLink.startsWith("https://") || //🇫🇷 Affiche error si le lien pour ticket n'est pas valid avec debut https.. 🇫🇷
            ticketLink.startsWith("http://")
          )
        ) {
          return showError(scr.createActivity.step2.pricelinkError); //🇫🇷 Affiche error si le lien pour ticket n'est pas valid avec debut http.. 🇫🇷
        }
      }
      // else if (hasPrice && isNaN(priceValue))
      //   return showError(scr.createActivity.step2.priceError);
      // 🇬🇧else if(attendee + nbFriend > attendeeLimit)
      // 🇬🇧return showError("There is more participants than the limit you set");
    }

    if (step === 3) {
      //🇫🇷 quand on passe de l'étape 2 à l'étape 3
      //🇬🇧 From step 2 to step 3
      if (topic === -1) return showError(scr.createActivity.step3.topicError); //🇫🇷 Affiche error si le topic n'est pas selectionné 🇫🇷
    }

    if (step === 4) {
      //🇫🇷  quand on passe de l'étape 3 à l'étape 4
      //🇬🇧 From step 3 to step 4
      if (activityImage === null)
        return showError(scr.createActivity.step4.imageError); //🇫🇷 Affiche error si l'image n'est pas selectionné 🇫🇷
      if (description === "")
        return showError(scr.createActivity.step4.descriptionError); //🇫🇷 Affiche error si la description n'est pas selectionné 🇫🇷
      if (howToFind === "")
        return showError(scr.createActivity.step4.howToFindError); //🇫🇷 Affiche error si how to find n'est pas selectionné 🇫🇷
    }
  }, [step, address]);
  //🇬🇧 function called to create the activity in the database Used at the end of Step3 or 4 depending on the role of the user (lines 59 and 60)
  //🇫🇷 fonction appelée pour créer l'activité dans la base de donnée Utilisée à la fin du Step3 ou 4 en fonction du rôle de l'utilisateur (lignes 59 et 60)
  const createAnActivity = async () => {
    if (description !== "" && howToFind !== "" && activityImage !== null) {
      const token = await AsyncStorage.getItem("userToken");
      const formData = new FormData();
      formData.append("title", title); //🇫🇷 Ajoute le titre à formData
      formData.append("isOnline", online); //🇫🇷 Ajoute le online à formData
      formData.append("address", address);
      formData.append("location", !online ? JSON.stringify(location) : null); //🇫🇷 Ajoute le location à formData
      formData.append("date", date);
      formData.append("startTime", startTime);
      formData.append("isAttendeeLimited", isAttendeeLimited);
      formData.append(
        //🇫🇷 Ajoute le isAttendeeLimited à formData
        "attendeeLimit",
        isAttendeeLimited ? 1000000 : attendeeLimit
      );
      formData.append("hasPrice", hasPrice);
      formData.append("price", 0);
      formData.append("ticketLink", hasPrice ? ticketLink : null);

      formData.append("helpForOrganizers", helpForOrganizers);
      formData.append("hasReminderName", hasReminderName);
      formData.append("reminderName", reminderName);
      formData.append("requestCoOrganizers", requestCoOrganizers);
      formData.append("coOrganizerRequests", coOrganizerRequests);
      formData.append("coOrganizerOffers", coOrganizerOffers);
      formData.append("coOrganizerGift", coOrganizerGift);

      formData.append("topic", topic);
      formData.append("activityImage", activityImage);
      formData.append("description", description);
      formData.append("howToFind", howToFind);

      formData.append("whatsappLink", whatsappLink);
      formData.append("fbPageLink", fbPageLink);
      formData.append("fbGroupLink", fbGroupLink);
      formData.append("meetupLink", meetupLink);
      formData.append("telegramLink", telegramLink);
      formData.append("otherLink", otherLink);
      formData.append("friendsOnly", friendsOnly);
      formData.append("nbFriends", nbFriend);
      formData.append("selectPeople", selectPeople);
      formData.append("allowPhoneNumberDisplay", allowPhoneNumberDisplay);
      formData.append("allowCoOrganiser", allowCoOrg);
      formData.append("infoLine", infoLine);
      formData.append("repeatEvent", repeatEvent);
      formData.append(
        "repeatEventFrequency",
        repeatEvent ? repeatEventFrequency : null
      );
      formData.append("repeatEventDays", repeatEvent ? repeatEventDays : null);
      formData.append(
        "repeatEventEnd date",
        repeatEvent ? repeatEventEndDate : null
      );
      formData.append("parity", parity);
      formData.append("parityValues", JSON.stringify(parityValues));
      formData.append("allowGuests", allowGuests);
      formData.append("howManyGuests", allowGuests ? howManyGuests : 0);
      formData.append("ageRestriction", ageRestriction);
      formData.append(
        "ages",
        ageRestriction ? JSON.stringify(ages) : JSON.stringify([0, 0])
      );

      try {
        const { data } = await axios.post(
          //🇫🇷 Envoie les données à la base de donnée
          `${hostname}/api/v1/activities/createactivity`,
          formData,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Activity data = ", data);
        setStep(1);
        setTitle("");
        navigation.replace("Activity", {
          event: data.data,
          pageTitle: activitiesList[data.data.topic].activityTypeTitle, //🇫🇷 Affiche le titre de l'activité dans la barre de navigation
        });
      } catch (error) {
        console.log("Activity save failed: " + error);
      }
    } else {
      if (activityImage === null) {
        setErrorMessage(scr.createActivity.step4.imageError);
      }
      if (description === "") {
        setErrorMessage(scr.createActivity.step4.descriptionError);
      }
      if (howToFind === "") {
        setErrorMessage(scr.createActivity.step4.howToFindError);
      }
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
        <View style={styles.fields}>
          {/*🇫🇷 La variable createActivity.step1.activity définit l'affichage en "Les informations principales".
                🇬🇧 The variable createActivity.step1.activity displays "Activity title"*/}
          <Fields
            title={createActivity.step1.activity}
            text={createActivity.step1.activity}
            state={title}
            setState={setTitle}
          />
        </View>
        <View style={styles.localizationRow}>
          {/*🇫🇷 La variable createActivity.step1.address définit l'affichage en "Adresse.
                🇬🇧 The variable createActivity.step1.address displays "Address"*/}
          <OptionButton
            title={createActivity.step1.address}
            buttonSelected={buttonSelected}
            setButtonSelected={setButtonSelected}
            setOption={setOnline}
            buttonselect={true}
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
              setOption={setOnline}
              buttonselect={true}
              />*/}
          {/*🇫🇷 La variable createActivity.step1.mapUrl définit l'affichage en "Url Google Map".
                🇬🇧 The variable createActivity.step1.mapUrl displays "Google Maps URL"*/}
          {/* <OptionButton
              title={createActivity.step1.mapUrl}
              buttonSelected={buttonSelected}
              setButtonSelected={setButtonSelected}
            /> */}
        </View>

        <View style={{ height: 360, position: "relative" }}>
          <AddressMap
            scr={createActivity}
            upperTitle={buttonSelected}
            address={address}
            setAddress={setAddress}
            location={location}
            setLocation={setLocation}
          />
        </View>

        {/* 🇫🇷 La variable createActivity.step1.date définit l'affichage en
          "Date". 🇬🇧 The variable createActivity.step1.date displays "Date" */}

        <View style={{ marginTop: 100 }}>
          <DateTimePicker
            title={createActivity.step1.dateTime}
            date={date}
            setDate={setDate}
            time={startTime}
            setTime={setStartTime}
          />
        </View>

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

        <Text style={{ marginTop: -15, marginBottom: 20, color: "#a6a6a6" }}>
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
              maxVal={premiumRoles.includes(name[0]) ? 100 : 100}
              state={attendeeLimit}
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
              {/* <View style={styles.fields}> */}
              {/*🇫🇷 La variable createActivity.step1.price définit l'affichage en "Prix".
                    🇬🇧 The variable createActivity.step1.price displays "Price"*/}
              {/* <Fields
                    text={createActivity.step1.price}
                    upperText={createActivity.step1.price}
                    state={priceValue}
                    setState={setPriceValue}
                  />
                </View> */}
              <View style={styles.fields}>
                {/*🇫🇷 La variable createActivity.step1.buyTicket définit l'affichage en "Url de la billeterie".
                    🇬🇧 The variable createActivity.step1.buyTicket displays "Buy ticket link"*/}
                <Fields
                  text={createActivity.step1.buyTicket}
                  state={ticketLink}
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
            maxVal={9}
            state={nbFriend}
            setState={setNbFriend}
          />
        </View>
        {/* The code about "Help for organizers" has been saved in the "help_codes" folder. It was too annoying to comment all the code because of the comments... */}
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
            title={createActivity.step3.description} // 🇫🇷"description": "Description"
            state={description}
            setState={setDescription}
            lines={15}
          />
        </View>
        <View style={styles.fields}>
          <MultilineFields
            title={createActivity.step3.how} // 🇬🇧 "how": "How to find me"
            //  🇫🇷comment : "Comment me trouver"
            state={howToFind}
            setState={setHowToFind}
            lines={10}
          />
        </View>

        {/* 🇫🇷 ------------Enregistrer ou Continuer------------ */}
        {/* 🇬🇧 ------------Save or Continue------------ */}

        <Text style={ styles.errorMsgTxt } >
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
          {premiumRoles.includes(name[0]) ? (
            <LogButton
              text={createActivity.step3.continue}
              width={150}
              backgroundColor={"#59c09b"}
              func={(n) => {
                if (
                  description !== "" &&
                  howToFind !== "" &&
                  activityImage !== null
                ) {
                  setErrorMessage("");
                  setStep(n);
                }
                if (activityImage === null) {
                  setErrorMessage(scr.createActivity.step4.imageError);
                }
                if (description === "") {
                  setErrorMessage(scr.createActivity.step4.descriptionError);
                }
                if (howToFind === "") {
                  setErrorMessage(scr.createActivity.step4.howToFindError);
                }
              }}
              arg={step + 1}
            />
          ) : (
            <LogButton
              text={createActivity.step4.publish}
              width={150}
              backgroundColor={"#59c09b"}
              func={() => createAnActivity()}
              // arg={null}
            />
          )}
        </View>
      </ScrollView>
    );
  }

  //🇫🇷 Création d'activité - Infos complémentaires (Frame 35 MVP du Figma )
  //🇬🇧 Event creation - Additional info (Frame 35 MVP Figma)
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
          {/*🇫🇷 Afficher ce texte dans une nouvelle variable dans en.json si nécessaire*/}
          {/*🇬🇧 The text should be stored in a new variable inside en.json */}
          {createActivity.step4.b2022_optionalFeatures}
        </Text>
        <View style={[styles.fields, { marginHorizontal: 10 }]}>
          <Fields
            text={""}
            upperText={createActivity.step4.whatsapp}
            upperIcon={"whatsapp"}
            state={whatsappLink}
            setState={setWhatsappLink}
          />
        </View>

        <View style={[styles.fields, { marginHorizontal: 10 }]}>
          <Fields
            text={""}
            upperText={createActivity.step4.fbPage}
            upperIcon={"fbPage"}
            state={fbPageLink}
            setState={setFbPageLink}
          />
        </View>

        <View style={[styles.fields, { marginHorizontal: 10 }]}>
          <Fields
            text={""}
            upperText={createActivity.step4.fbGroup}
            upperIcon={"fbGroup"}
            state={fbGroupLink}
            setState={setFbGroupLink}
          />
        </View>

        <View style={[styles.fields, { marginHorizontal: 10 }]}>
          <Fields
            text={""}
            upperText={createActivity.step4.meetup}
            upperIcon={"meetup"}
            state={meetupLink}
            setState={setMeetupLink}
          />
        </View>

        <View style={[styles.fields, { marginHorizontal: 10 }]}>
          <Fields
            text={""}
            upperText={createActivity.step4.telegram}
            upperIcon={"telegram"}
            state={telegramLink}
            setState={setTelegramLink}
          />
        </View>

        <View style={[styles.fields, { marginHorizontal: 10 }]}>
          <Fields
            text={""}
            upperText={createActivity.step4.link}
            state={otherLink}
            setState={setOtherLink}
          />
        </View>

        {/*🇬🇧 The rest of the code has been saved in the "help_codes" folder */}

        {/* 🇬🇧------------Save or Continue------------ */}
        {/*🇫🇷 Le reste du code a été enregistré dans le dossier "help_codes" */}

        {/*🇫🇷------------Enregistrer ou Continuer------------ */}
        <View style={[styles.savOrConButtons, { marginTop: 40 }]}>
          <LogButton
            text={createActivity.step3.goBack}
            width={150}
            backgroundColor={"#59c09b"}
            func={setStep}
            arg={step - 1}
          />
          {/*🇫🇷Envoi des données du formulaire au back-end*/}
          {/*🇬🇧 Sending form data to the back-end*/}

          <LogButton
            text={createActivity.step4.publish}
            width={150}
            backgroundColor={"#59c09b"}
            func={() => createAnActivity()}
            // arg={null}
          />
        </View>
      </ScrollView>
    );
  }
};

export default CopyActivityScreen;
