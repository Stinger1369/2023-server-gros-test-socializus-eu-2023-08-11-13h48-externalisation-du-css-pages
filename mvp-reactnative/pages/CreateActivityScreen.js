// 🇫🇷 Pages Création d'activité (Figma Frame 31 à 34) 🇫🇷
// 🇬🇧 Create Activity pages (Figma Frame 31 to 34) 🇬🇧

/* FR - Cette page est au moins 95% faite, vous allez devoir vous occuper du code quand
 l'utilisateur presse le bouton "Google Maps URL" et la répétition de l'évènement
  (pas super urgent parce que je l'ai mis en commentaire, mais si vous pouvez vous en occuper, c'est cool).
   Ceci dit, les meilleurs trucs que vous puissiez faire ici, c'est de séparer les étapes,
  parce que là, code est bien, mais il est beaucoup trop long, et de faire en sorte
  à ce que l'image soit enregistrée sur (donc le backend devra être modifié
aussi - j'ai désactivé l'option image provenant de la bibliothèque pour l'instant).
 Enfin, vous pouvez dupliquer ce code pour créer la page "EditActivityScreen",
  pour que l'utilisateur puisse modifier des détails de son activité
*/
/* ENG - This page is at least 95% documented, you'll have to take care
 of the code when the user presses the "Google Maps URL" button and the event repetition
  (not so urgent because I commented it, but if you can take care of it, go ahead). 
  That said, the most you could do is splitting the code into several steps since there's 
  too much in one place. Also, make sure the image is uploaded to 
   (we'll also have to modify the backend - I disabled the pick image from library for now). 
   Finally, you can duplicate this code to create the "EditActivityScreen" page, so the user can
    edit event details*/

// React
import { hostname } from "../backendconnect/hostname"
import {Text, View, ScrollView, StyleSheet, TouchableOpacity, LogBox } from "react-native";
import styles from "./Styles/CreateActivityScreenCss"
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Icon } from "@rneui/themed";

// Components
import Fields from "../components/Fields";
import InputField from "../components/InputField";
import MultilineFields from "../components/MultilineFields";
import LogButton from "../components/LogButtons";
import { OneValueSlider, TwoValuesSlider, ParitySlider,} from "../components/Sliders";
import { CalendarField, DateField } from "../components/CalendarField";
import SwitchBtn from "../components/SwitchBtn";
import { OptionButton, CheckboxSquare } from "../components/SelectionElements";
import ActivityPhoto from "../components/ActivityPhoto";
import AddressMap from "../components/AddressMap";
import { ActivityTypesGrid_OneTopic } from "../components/ActivityTypesGrids";

// Assets
import DrinkIcon from "../assets/images/drink.svg";
import GiftIcon from "../assets/images/giftbox.svg";
import TicketIcon from "../assets/images/ticket.svg";
import Json from "../assets/json/en.json";

// import moment from "moment";
// import * as ImagePicker from "expo-image-picker";


// import functions from utils
import { 
  manageCoOrganizerRequests,
  manageFrequencyDays,
  manageCoOrganizerOffers

} from '../utils/CreateActivityScreenAllFunctions';

LogBox.ignoreLogs([
    "VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.",
  ]);
// Des variables json de en.json permettant la traduction dans les différentes langues
const { createActivity, editProfile } = Json;

const CreateActivityScreen = ({ userToken }) => {
  console.log(userToken)
  const navigation = useNavigation();
  const [buttonSelected, setButtonSelected] = useState();
  // const [buttonSelected, setButtonSelected] = useState(onlinecreateActivity.step1.address);

  const [step, setStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  //FR ETAPE 1-variables relatives
  //GB STEP 1-related variables
  const [author, setAuthor] = useState();
  //FR Récupérer l'ID et le nom de l'utilisateur, il serait mieux de le faire avec useContext
  //GB Get the id and the name of the user; could be nice to do it with useContext, I think
  const [title, setTitle] = useState(""); //ENLEVER PLUS TARD
  const [address, setAddress] = useState("");
  const [online, setOnline] = useState(false);
  const [location, setLocation] = useState({
    latitude: 48.85714319815175,
    longitude: 2.347655098840397,
    latitudeDelta: 0.012,
    longitudeDelta: 0.012,
  });

  const [dateTime, setDateTime] = useState(0);
  const [date, setDate] = useState(0);
  const [startTime, setStartTime] = useState(0);
  //FR Nombre de participants
  //GB How many attendants
  // const [unlimited, setUnlimited] = useState(false);
  const [isUnlimitedAttendees, setIsUnlimitedAttendees] = useState(false);
  const [attendeeLimit, setAttendeeLimit] = useState(2);

  const [hasPrice, setHasPrice] = useState(false);
  const [priceValue, setPriceValue] = useState(null);
  const [ticketLink, setTicketLink] = useState(null);

  const [nbFriend, setNbFriend] = useState(0);

  const [helpForOrganizers, setHelpForOrganizers] = useState(false);

  const [hasReminderName, setHasReminderName] = useState(false);
  const [reminderName, setReminderName] = useState(null);

  const [requestCoOrganizers, setRequestCoOrganizers] = useState(false);
  const [coOrganizerRequests, setCoOrganizerRequests] = useState([]);
  const [coOrganizerOffers, setCoOrganizerOffers] = useState([]);
  const [coOrganizerGift, setCoOrganizerGift] = useState(null);
  const [optionInArray, setOptionInArray] = useState(false);

  //FR Lorsque l'utilisateur active les premières options sont ajoutées ou supprimées du tableau
  //GB If the user switches Request Co-organizers on, the first options are added or removed from the array
  useEffect(() => {
    if (requestCoOrganizers) {
      setCoOrganizerRequests(["Receive private message"]);
      setCoOrganizerOffers(["A free drink"]);
    } else {
      setCoOrganizerRequests([]);
      setCoOrganizerOffers([]);
    }
  }, [requestCoOrganizers]);

  // const [forbiddenPeople, setForbiddenPeople] = useState([]);
  // const [invitations, setInvitations] = useState([]);
  // const [type, setType] = useState("");
  // const [fake, setFake] = useState(true);
  // const [restriction, setRestriction] = useState(false);

  //STEP 2-related variables
  const [activityList, setActivityList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [topic, setTopic] = useState(null);

  //STEP 3-related variables
  const [activityImage, setActivityImage] = useState(null);
  const [description, setDescription] = useState("val"); //ENLEVER PLUS TARD
  const [howToFind, setHowToFind] = useState("val"); //ENLEVER PLUS TARD

  //STEP 4-related variables
  const [friendsOnly, setFriendsOnly] = useState(false);
  const [selectPeople, setSelectPeople] = useState(false);
  const [allowPhoneNumberDisplay, setAllowPhoneNumberDisplay] = useState(false);
  const [allowCoOrg, setAllowCoOrg] = useState(false);
  //Go fetch the list of the user's friends if true

  const [repeatEvent, setRepeatEvent] = useState(false);
  const [repeatEventFrequency, setRepeatEventFrequency] = useState("");
  const [repeatEventDays, setRepeatEventDays] = useState([]);
  //STEP 4 event repeat manager code
  const [dayInArray, setDayInArray] = useState(false);
  const [repeatEventEndDate, setRepeatEventEndDate] = useState(null);

  const [parity, setParity] = useState(false);
  const [parityValues, setParityValues] = useState({ male: 50, female: 50 });

  const [allowGuests, setAllowGuests] = useState(false);
  const [howManyGuests, setHowManyGuests] = useState(1);

  const [ageRestriction, setAgeRestriction] = useState(false);
  const [ages, setAges] = useState([20, 40]);

  const showError = (text) => {
    setErrorMessage(text);
    setStep(step - 1);
  };

  //FR Gestion de la validation des éléments entre les étapes de création d'activité
  //GB The useEffect manages validation between the event creation steps
  useEffect(() => {
    if (step === 2) {
      //FR quand on passe de l'étape 1 à l'étape 2
      //GB from step 1 to step 2
      if (title === "") return showError("You must enter a title");
      else if (address === "")
        return showError(
          "You must enter an address or select a point on the map"
        );
      else if (dateTime === null)
        return showError("You must select a date and time");
      else if (hasPrice && isNaN(priceValue))
        return showError("The price value is invalid");
      else if (hasPrice && ticketLink === "")
        return showError(
          "An event with a price requires a link to buy a ticket"
        );
    }

    if (step === 3) {
      //FR quand on passe de l'étape 2 à l'étape 3
      //GB From step 2 to step 3
      if (topic === null) return showError(scr.createActivity.step3.topicError);
    }

    if (step === 4) {
      //FR quand on passe de l'étape 3 à l'étape 4
      //GB From step 3 to step 4
      if (activityImage === null) return showError("You must select an image");
      if (description === "") return showError("You must write a description");
      if (howToFind === "")
        return showError("You must explain how to find the event");
    }

    if (activityList === null) {
      const fetchActivityList = async () => {
        const { data } = await axios.get(
          `${hostname}/api/v1/assets/activities`
        );
        setActivityList(data);
        setLoading(false);
      };

      fetchActivityList();
    }

    if (step === 1 && address != "" && address.substr(0, 3) !== "GPS") {
      const fetchAddressCoord = async () => {
        let paris = "";
        if (address.indexOf("paris") === -1 && address.indexOf("Paris") === -1)
          paris = "+Paris";
        const addressParam = address.split(" ").join("+");
        const { data } = await axios.get(
          "https://api-adresse.data.gouv.fr/search/?q=" + addressParam + paris
        );
        const coords = data.features[0].geometry.coordinates;
      };
      fetchAddressCoord();
    }
  }, [step, address]);

  if (loading) return;

  if (step === 1) {
    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled" listViewDisplayed={false}>
        {/* ----------------Titles---------------- */}
        <Text
          style={styles.boldTitle}>
            { /*🇫🇷 La variable createActivity.step1.information définit l'affichage en "Les informations principales".
              🇬🇧 The variable createActivity.step1.information displays "Main information"*/}
            {createActivity.step1.information}
        </Text>

        <View style={styles.fields}>
              { /*🇫🇷 La variable createActivity.step1.activity définit l'affichage en "Les informations principales".
              🇬🇧 The variable createActivity.step1.activity displays "Activity title"*/}
          <InputField title={createActivity.step1.activity} state={title} setState={setTitle} specialHeight={60}/>
        </View>

        <View style={styles.localizationRow}>
              { /*🇫🇷 La variable createActivity.step1.address définit l'affichage en "Adresse.
              🇬🇧 The variable createActivity.step1.address displays "Address"*/}
          <OptionButton title={createActivity.step1.address} buttonSelected={buttonSelected} setButtonSelected={setButtonSelected}/>
              { /*🇫🇷 La variable createActivity.step1.online définit l'affichage en "En ligne.
              🇬🇧 The variable createActivity.step1.online displays "Online"*/}
          <OptionButton title={createActivity.step1.online} buttonSelected={buttonSelected} setButtonSelected={setButtonSelected}/>
            { /*🇫🇷 La variable createActivity.step1.mapUrl définit l'affichage en "Url Google Map".
              🇬🇧 The variable createActivity.step1.mapUrl displays "Google Maps URL"*/}
          <OptionButton title={createActivity.step1.mapUrl} buttonSelected={buttonSelected} setButtonSelected={setButtonSelected}/>
        </View>

        <AddressMap upperTitle={buttonSelected} address={address} setAddress={setAddress} location={location} setLocation={setLocation}/>

        <CalendarField
                  /*🇫🇷 La variable createActivity.step1.date définit l'affichage en "Date".
                  🇬🇧 The variable createActivity.step1.date displays "Date"*/
          title={createActivity.step1.date}
          state={dateTime}
          setState={setDateTime}
          date={date}
          setDate={setDate}
          time={startTime}
          setTime={setStartTime}
        />

        <View style={styles.switchRow}>
          <Text style={styles.boldTitle}>
                  { /*🇫🇷 La variable createActivity.step1.unlimited définit l'affichage en "Participants illimités".
                  🇬🇧 The variable createActivity.step1.unlimited displays "Unlimited attendees"*/}
            {createActivity.step1.unlimited}
            </Text>
          <SwitchBtn state={isUnlimitedAttendees} setState={setIsUnlimitedAttendees}/>
        </View>
        <Text style={styles.createActivityStep1Text}>
                { /*🇫🇷 La variable createActivity.step1.theOnly définit l'affichage en "(la seule application sans restrictions pour les organisateurs)".
                🇬🇧 The variable createActivity.step1.theOnly displays "(The only map without restrictions for organizers)"*/}
          {createActivity.step1.theOnly}
        </Text>
        {/* "theOnly": "(The only map without restrictions for organizers)" */}
        {!isUnlimitedAttendees && (
          <View style={styles.fields}>
            <Text style={styles.boldTitle}>
              {createActivity.step1.attendee}
            </Text>
            {/* "attendee": "Attendee limitation" */}
            <OneValueSlider minVal={2} maxVal={20} state={attendeeLimit} setState={setAttendeeLimit}/>
          </View>
        )}

        {/*FR Bouton du prix */}{/*GB Price button */}
        <View style={styles.switchRow}>
          <Text style={styles.boldTitle}>
                { /*🇫🇷 La variable createActivity.step1.price définit l'affichage en "Prix".
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
              { /*🇫🇷 La variable createActivity.step1.price définit l'affichage en "Prix".
                  🇬🇧 The variable createActivity.step1.price displays "Price"*/}
                <Fields text={createActivity.step1.price} state={priceValue} setState={setPriceValue}/>
              </View>
              <View style={styles.fields}>
              { /*🇫🇷 La variable createActivity.step1.buyTicket définit l'affichage en "Url de la billeterie".
                  🇬🇧 The variable createActivity.step1.buyTicket displays "Buy ticket link"*/}
                <Fields text={createActivity.step1.buyTicket} state={ticketLink}setState={setTicketLink}/>
              </View>
            </>
          )}
        </View>

        <View style={styles.fields}>
          <Text style={styles.boldTitle}>
                { /*🇫🇷 La variable createActivity.step1.howMany définit l'affichage en "How many friends with me".
                  🇬🇧 The variable createActivity.step1.howMany displays "Combien d'amis avec moi"*/}
            {createActivity.step1.howMany}
            </Text>
          <OneValueSlider minVal={0} maxVal={10} state={nbFriend} setState={setNbFriend}/>
        </View>

        <View style={styles.switchRow}>
          <Text style={styles.boldTitle}>
                { /*🇫🇷 La variable createActivity.step1.b2022_helpOrganizers définit l'affichage en "Help for organizers".
                  🇬🇧 The variable createActivity.step1.b2022_helpOrganizers displays "Help for organizers"*/}
            {createActivity.step1.b2022_helpOrganizers}
            </Text>
          <SwitchBtn state={helpForOrganizers} setState={setHelpForOrganizers}/>
        </View>

        <View style={styles.fields}>
          {helpForOrganizers && (
            <>
              <View style={styles.switchRow}>
                <Text style={styles.boldTitle}>
                  { /*🇫🇷 La variable createActivity.step1.b2022_helpOrganizers définit l'affichage en "".
                  🇬🇧 The variable createActivity.step1.b2022_helpOrganizers displays "Change my reminder name"*/}
                  {createActivity.step1.b2022_reminderName}
                  </Text>
                {/*"b2022_reminderName": "Change my reminder name"*/}
                <TouchableOpacity style={styles.IconTouchableOpacity}>
                  <Icon name="help" type="material-icons" color={"black"} size={22} />
                </TouchableOpacity>
                <SwitchBtn state={hasReminderName} setState={setHasReminderName}/>
              </View>

              {hasReminderName && (
                <View>
                  <InputField title={"Reminder Name"} state={reminderName} setState={setReminderName}/>
                </View>
              )}

              <View style={styles.switchRow}>
                <Text style={styles.boldTitle}>
                { /*🇫🇷 La variable createActivity.step1.b2022_coOrganizerRequest définit l'affichage en "".
                  🇬🇧 The variable createActivity.step1.b2022_coOrganizerRequest displays "Request Co-organizers"*/}
                  {createActivity.step1.b2022_coOrganizerRequest}
                  </Text>
                <SwitchBtn state={requestCoOrganizers} setState={setRequestCoOrganizers}/>
              </View>

              {requestCoOrganizers && (
                <>
                  <View style={styles.fields}>
                    <Text style={styles.b2022_coOrganizerRequestChoiceText}>
                    { /*🇫🇷 La variable createActivity.step1.b2022_coOrganizerRequest définit l'affichage en "".
                    🇬🇧 The variable createActivity.step1.b2022_coOrganizerRequestChoice displays "Choose Co-organizers request:"*/}
                    {createActivity.step1.b2022_coOrganizerRequestChoice}
                    </Text>
                  </View>

                  <View style={styles.coOrganizersOptions}>
                    <TouchableOpacity style={[styles.coOrganizerCard, { backgroundColor: "#59c09b" }]} disabled={true}>
                      <View style={styles.coOrganizerIcon}>
                        <Icon name="mail" type="ionicons" color="#59c09b" size={28}/>
                      </View>
                      <Text style={styles.b2022_coOrganizerMessageText}>
                      { /*🇫🇷 La variable createActivity.step1.b2022_coOrganizerMessage définit l'affichage en "".
                     🇬🇧 The variable createActivity.step1.b2022_coOrganizerMessage displays "Receive private message"*/}
                      {createActivity.step1.b2022_coOrganizerMessage}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => manageCoOrganizerRequests("Come 5 min earlier to the activity", coOrganizerRequests, setCoOrganizerRequests, setOptionInArray)}
                      style={[
                        styles.coOrganizerCard,
                        {backgroundColor: coOrganizerRequests.includes("Come 5 min earlier to the activity") ? "#59c09b" : "#E6E6E6"}
                      ]}>

                      <View style={styles.coOrganizerIcon} >
                        <Icon name="alarm" type="ionicons" color="#59c09b" size={28}/>
                      </View>
                      <Text
                        style={[styles.b2022_coOrganizerRequestEarlyText,
                          {color: coOrganizerRequests.includes("Come 5 min earlier to the activity") ? "white" : "black"}
                        ]}>
                     { /*🇫🇷 La variable createActivity.step1.b2022_coOrganizerRequestEarly définit l'affichage en "".
                     🇬🇧 The variable createActivity.step1.b2022_coOrganizerRequestEarly displays "Come 5 minutes earlier to the activity"*/}
                        {createActivity.step1.b2022_coOrganizerRequestEarly}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.fields}>
                    <Text style={styles.b2022_coOrganizerMyOfferText}>
                    { /*🇫🇷 La variable createActivity.step1.b2022_coOrganizerMyOffer définit l'affichage en "".
                    🇬🇧 The variable createActivity.step1.b2022_coOrganizerMyOffer displays "I want to offer:"*/}
                    {createActivity.step1.b2022_coOrganizerMyOffer}
                    </Text>
                  </View>

                  <View style={styles.coOrganizersOptions}>
                    <TouchableOpacity
                      disabled={true}
                      onPress={() => manageCoOrganizerOffers("A free drink", setOptionInArray, setCoOrganizerOffers, coOrganizerOffers)}
                      style={[styles.coOrganizerCard, { backgroundColor: "#59c09b"}]}>
                      <View style={styles.coOrganizerIcon}>
                        <DrinkIcon width={30} height={30} />
                      </View>
                      <Text style={styles.b2022_coOrganizerOfferDrinkText}>
                      { /*🇫🇷 La variable createActivity.step1.b2022_coOrganizerOfferDrink définit l'affichage en "".
                      🇬🇧 The variable createActivity.step1.b2022_coOrganizerOfferDrink displays "I want to offer:"*/}
                      {createActivity.step1.b2022_coOrganizerOfferDrink}
                      </Text>
                      {/*A free drink*/}
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => manageCoOrganizerOffers("A free pass", setOptionInArray, setCoOrganizerOffers, coOrganizerOffers)}
                      style={[
                        styles.coOrganizerCard,
                        {
                          backgroundColor: coOrganizerOffers.includes("A free pass") ? "#59c09b" : "#E6E6E6"
                        }
                      ]}>
                      <View style={styles.coOrganizerIcon}>
                        <TicketIcon width={34} height={34} />
                      </View>
                      <Text style={{textAlign: "center", fontWeight: "bold", color: coOrganizerOffers.includes("A free pass") ? "white" : "black"}}>
                        {createActivity.step1.b2022_coOrganizerOfferPass}
                      </Text>
                      {/*A free pass*/}
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => manageCoOrganizerOffers("Other gift", setOptionInArray, setCoOrganizerOffers, coOrganizerOffers)}
                      style={[
                        styles.coOrganizerCard,
                        {
                          backgroundColor: coOrganizerOffers.includes("Other gift") ? "#59c09b" : "#E6E6E6"
                        }
                      ]}>
                      <View style={styles.coOrganizerIcon}>
                        <GiftIcon width={30} height={30} />
                      </View>
                      <Text
                        style={{
                          textAlign: "center",
                          fontWeight: "bold",
                          color: coOrganizerOffers.includes("Other gift") ? "white" : "black"}}>
                        {createActivity.step1.b2022_coOrganizerOfferGift}
                      </Text>
                      {/*Other gift*/}
                    </TouchableOpacity>
                  </View>

                  {coOrganizerOffers.includes("Other gift") && (
                    <View style={styles.fields}>
                      <InputField title={createActivity.step1.b2022_coOrganizerGiftName} state={coOrganizerGift} setState={setCoOrganizerGift}/>
                      {/*What will you offer?*/}
                    </View>
                  )}
                </>
              )}
            </>
          )}
        </View>

        {/* ------------Save or Continue------------ */}
        <Text style={styles.errorMessageText}>{errorMessage}</Text>
        {/*FR Bouton pour passer à l'étape suivante*/}
        {/*GB Button to enter next step*/}
        <View style={styles.LogButtonStepView}>
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
        <Text style={styles.createActivityStep2Inorder}>
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
        <Text style={styles.errorMessageTextStyle}>
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
            backgroundColor={topic !== null ? "#59c09b" : "grey"}
            func={(n) => {
              if (topic !== null) {
                setErrorMessage("");
                setStep(n);
              }
            }}
            arg={step + 1}
            disabled={topic === null}
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
        <Text style={[styles.boldTitle]}>
          {createActivity.step3.please}
        </Text>
        {/* "please": "Tell us more about your activity:" */}

        <ActivityPhoto
          topic={topic}
          activityImage={activityImage}
          setActivityImage={setActivityImage}
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

        <Text style={sstyles.errorMessage3}>
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
        <Text style={[styles.boldTitle,
            { alignSelf: "center", marginVertical: 10 }
          ]}>
         {/* FR Afficher ce texte dans une nouvelle variable dans en.json si nécessaire*/}
         {/* GB The text should be stored in a new variable inside en.json */}
          {createActivity.step4.b2022_optionalFeatures}
        </Text>
        <View style={styles.row}>
          {/* <CheckboxSquare title={"50% Guys 50% Girls"} state={state} setState={setState}/>
          <CheckboxSquare title={"Girls only"} state={state} setState={setState}/>
          <CheckboxSquare title={"Guys only"} state={state} setState={setState}/> */}
          <CheckboxSquare title={"Events visible for friends only"} state={friendsOnly} setState={setFriendsOnly}/>
          <CheckboxSquare title={"Select people"} state={selectPeople} setState={setSelectPeople}/>
          <CheckboxSquare title={"Phone number visible to attendees"}
           state={allowPhoneNumberDisplay}
           setState={setAllowPhoneNumberDisplay}/>
          {/* <CheckboxSquare title={createActivity.step4.allow} state={allowCoOrg} setState={setAllowCoOrg}/> */}
        </View>

        {/* <View style={styles.switchRow}>
          <Text style={[styles.boldTitle, { color: "#1E7354" }]}>
            Repeat event:
          </Text>
          <SwitchBtn state={repeatEvent} setState={setRepeatEvent} />
        </View>

        {repeatEvent && (
          <>
            <View style={styles.timeDataContainer}>
              <TouchableOpacity
                onPress={() => setRepeatEventFrequency("weekly")}
                style={
                  repeatEventFrequency === "weekly"
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
                    repeatEventFrequency === "weekly"
                      ? [styles.boldTitleSecondary, { color: "white" }]
                      : [styles.boldTitleSecondary, { color: "black" }]
                  }
                >
                  Weekly
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setRepeatEventFrequency("monthly")}
                style={
                  repeatEventFrequency === "monthly"
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
                    repeatEventFrequency === "monthly"
                      ? [styles.boldTitleSecondary, { color: "white" }]
                      : [styles.boldTitleSecondary, { color: "black" }]
                  }
                >
                  Monthly
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setRepeatEventFrequency("yearly")}
                style={
                  repeatEventFrequency === "yearly"
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
                    repeatEventFrequency === "yearly"
                      ? [styles.boldTitleSecondary, { color: "white" }]
                      : [styles.boldTitleSecondary, { color: "black" }]
                  }
                >
                  Yearly
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.boldTitle}>Select which days:</Text>
            <View
              style={[
                styles.row,
                { marginVertical: 10, justifyContent: "center" },
              ]}
            >
              <TouchableOpacity
                style={
                  repeatEventDays.includes("monday")
                    ? [styles.styledInputDay, { backgroundColor: "#59c09d" }]
                    : styles.styledInputDay
                }
                onPress={() => manageFrequencyDays("monday", repeatEventDays, setRepeatEventDays, setDayInArray)}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: repeatEventDays.includes("monday")
                      ? "white"
                      : "black",
                  }}
                >
                  Monday
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  repeatEventDays.includes("tuesday")
                    ? [styles.styledInputDay, { backgroundColor: "#59c09d" }]
                    : styles.styledInputDay
                }
                onPress={() => manageFrequencyDays("tuesday", repeatEventDays, setRepeatEventDays, setDayInArray)}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: repeatEventDays.includes("tuesday")
                      ? "white"
                      : "black",
                  }}
                >
                  Tuesday
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  repeatEventDays.includes("wednesday")
                    ? [styles.styledInputDay, { backgroundColor: "#59c09d" }]
                    : styles.styledInputDay
                }
                onPress={() => manageFrequencyDays("wednesday", repeatEventDays, setRepeatEventDays, setDayInArray)}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: repeatEventDays.includes("wednesday")
                      ? "white"
                      : "black",
                  }}
                >
                  Wednesday
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  repeatEventDays.includes("thursday")
                    ? [styles.styledInputDay, { backgroundColor: "#59c09d" }]
                    : styles.styledInputDay
                }
                onPress={() => manageFrequencyDays("thursday", repeatEventDays, setRepeatEventDays, setDayInArray)}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: repeatEventDays.includes("thursday")
                      ? "white"
                      : "black",
                  }}
                >
                  Thursday
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  repeatEventDays.includes("friday")
                    ? [styles.styledInputDay, { backgroundColor: "#59c09d" }]
                    : styles.styledInputDay
                }
                onPress={() => manageFrequencyDays("friday", repeatEventDays, setRepeatEventDays, setDayInArray)}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: repeatEventDays.includes("friday")
                      ? "white"
                      : "black",
                  }}
                >
                  Friday
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  repeatEventDays.includes("saturday")
                    ? [styles.styledInputDay, { backgroundColor: "#59c09d" }]
                    : styles.styledInputDay
                }
                onPress={() => manageFrequencyDays("saturday", repeatEventDays, setRepeatEventDays, setDayInArray)}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: repeatEventDays.includes("saturday")
                      ? "white"
                      : "black",
                  }}
                >
                  Saturday
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  repeatEventDays.includes("sunday")
                    ? [styles.styledInputDay, { backgroundColor: "#59c09d" }]
                    : styles.styledInputDay
                }
                onPress={() => manageFrequencyDays("sunday", repeatEventDays, setRepeatEventDays, setDayInArray)}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: repeatEventDays.includes("sunday")
                      ? "white"
                      : "black",
                  }}
                >
                  Sunday
                </Text>
              </TouchableOpacity>
            </View>

            <DateField
              title={"Repeat until: "}
              state={repeatEventEndDate}
              setState={setRepeatEventEndDate}
            />
          </>
        )} */}

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
            <OneValueSlider minVal={1} maxVal={5} state={howManyGuests} setState={setHowManyGuests}/>
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
            <TwoValuesSlider minVal={18} maxVal={99} state={ages} setState={setAges}/>
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
            func={() => {
              try {
                const sendRequest = async () => {
                  const token = await AsyncStorage.getItem("userToken");
                  const formData = new FormData();
                  formData.append("title", title);
                  formData.append("isOnline", online);
                  formData.append("address", address);
                  formData.append("location", !online ? JSON.stringify(location) : null);
                  formData.append("date", date);
                  formData.append("startTime", startTime);
                  formData.append("isUnlimitedAttendees", isUnlimitedAttendees);
                  formData.append("attendeeLimit", isUnlimitedAttendees ? null : attendeeLimit);
                  formData.append("hasPrice", hasPrice);
                  formData.append("price", hasPrice ? priceValue : 0);
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
                  formData.append("friendsOnly", friendsOnly);
                  formData.append("nbFriends", nbFriend);
                  formData.append("selectPeople", selectPeople);
                  formData.append("allowPhoneNumberDisplay", allowPhoneNumberDisplay);
                  formData.append("allowCoOrganiser", allowCoOrg);
                  formData.append("repeatEvent", repeatEvent);
                  formData.append("repeatEventFrequency", repeatEvent ? repeatEventFrequency : null);
                  formData.append("repeatEventDays", repeatEvent ? repeatEventDays : null);
                  formData.append("repeatEventEnd date", repeatEvent ? repeatEventEndDate : null);
                  formData.append("parity", parity);
                  formData.append("parityValues", JSON.stringify(parityValues));
                  formData.append("allowGuests", allowGuests);
                  formData.append("howManyGuests", allowGuests ? howManyGuests : 0);
                  formData.append("ageRestriction", ageRestriction);
                  formData.append("ages",ageRestriction ? JSON.stringify(ages) : JSON.stringify([0, 0]));
                  const { data } = await axios.post(
                    `${hostname}/api/v1/activities/createactivity`,
                    formData,
                    {
                      headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "multipart/form-data"
                      }
                    }
                  );
                  console.log("Activity data = ", data);
                  console.warn(activityImage)
                  setStep(1);
                  setTitle("");
                  navigation.replace("Activity", {event: data.data});
                };
                sendRequest();
              } catch (error) {
                console.log("Activity save failed: " + error);
              }
            }}
            // arg={null}
          />
        </View>
      </ScrollView>
    );
  }
};

export default CreateActivityScreen;

