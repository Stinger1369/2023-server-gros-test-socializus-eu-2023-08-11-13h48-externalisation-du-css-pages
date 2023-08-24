//🇫🇷 Le fichier JSON permet d'afficher les différentes variables avec différentes langues, voir le dossier assets/json/en.json
//🇬🇧 The JSON file allowing you to display the different variables with different languages ​​is in the assets/json/en.json folder
//🇫🇷 Liste des activités (Frame 21A-small sur Figma)
//🇬🇧 Event list (Frame 21A-small of Figma)
import { hostname } from "../../../../mvp-reactnative/backendconnect/hostname.js";
import Spinner from "react-native-loading-spinner-overlay";
import React, { useCallback, useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  SectionList,
  Dimensions,
  Image,
} from "react-native";
import styles from "../Styles/ActivitiesScreenCss";
import DatePicker from "../../components/DatePicker.js";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { FAB, Icon, Dialog } from "@rneui/themed";
import dateFormat from "dateformat"; //
// Composants
import AsyncStorage from "@react-native-async-storage/async-storage";
import ActivityCard_small from "../../components/ActivityCards.js";
import { EmailCheckDialog } from "../../components/Dialogs.js";
import { CalendarDateField } from "../../components/CalendarField.js";
import ScheduleIcon from "../../assets/images/schedule.svg";
import SplashS from "../../assets/splash.svg";
import moment from "moment";

// import MyActivityDetails from "../components/MyActivityDetails.js";

const ActivitiesScreen = ({ fromStack, user, scr }) => {
  //🇫🇷 Pour stocker le contenu de la requête qui récupère les activités en base de données
  //🇬🇧 This variable stores the response data from the request to fetch all the events
  const [events, setEvents] = useState([]);

  const [page, setPage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [splashLoad, setSplashLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const [chargement, setChargement] = useState(true); // pour arreter le chargement lorsqu'il n'y a pas plus de données
  const limit = 6;
  //const [check, setCheck] = useState(false);
  const [groupedEvents, setGroupedEvents] = useState([]);
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  const formattedToday = dd + "/" + mm + "/" + yyyy;
  const [date, setDate] = useState(formattedToday);
  const [refreshPage, setRefreshPage] = useState(false);
  const [emailCheckDialogVisible, setEmailCheckDialogVisible] = useState(false);
  const screenWidth = Dimensions.get("screen").width;
  //🇫🇷 S'il n'y a pas d'activités pour le jour actuel, afficher la date de la prochaine activité.
  //🇬🇧 When no events are scheduled for current day, show the nearest event date.
  const navigation = useNavigation();
  // const { activity, register, createActivity } = scr;

  //🇫🇷 Fonction pour afficher ou masquer le dialogue de vérification de l'e-mail
  //🇬🇧 Function to show or hide the email verification dialog
  const displayEmailCheckDialog = () => {
    setEmailCheckDialogVisible(!emailCheckDialogVisible);
  };

  //🇫🇷 Fonction pour aller à l'écran de vérification de l'e-mail
  //🇬🇧 Function to navigate to the email verification screen
  const goToMailCheckScreen = () => {
    navigation.navigate("VerificationMailRole");
    displayEmailCheckDialog(!emailCheckDialogVisible);
  };

  //🇫🇷 Fonction pour gérer la navigation depuis le rôle de l'utilisateur
  //🇬🇧 Function to handle navigation based on user role
  const handleNavigationFromRole = () => {
    const authorized = ["admin", "moderator", "user"];
    if (user?.role.name[0] === "user without confirmation") {
      displayEmailCheckDialog();
    } else {
      navigation.navigate("Create Activity", {
        user: user,
      });
    }
  };

  // function isDatePassed(date) {
  //   // Convertir la date en millisecondes
  //   var givenDate = new Date(date).getTime();

  //   // Obtenir la date actuelle en millisecondes
  //   var currentDate = new Date().getTime();

  //   // Calculer la différence en millisecondes
  //   var difference = currentDate - givenDate;

  //   // Calculer le nombre de jours écoulés
  //   var daysPassed = Math.floor(difference / (1000 * 60 * 60 * 24));

  //   return daysPassed >= 0;
  // }

  const VerificationData = async () => {
    try {
      const resultUser = JSON.parse(await AsyncStorage.getItem("user"));
      if (resultUser) {
        console.log(resultUser._id);
        console.log(resultUser);
        const response = await axios.get(
          `${hostname}/api/v1/user/getuserinfo/${resultUser._id}`
        );
        console.log(response.data.user);
        const resultat = JSON.stringify(response.data.user);
        let resultatUser = JSON.parse(resultat);
        console.log(resultatUser.firstName);
        //if(check === false){
        if (
          resultatUser.firstName === "null" ||
          resultatUser.lastName === "null" ||
          resultatUser.userName === "null" ||
          resultatUser.isPersonalAccount === "null" ||
          resultatUser.city === "null"
        ) {
          navigation.navigate("Edit Profile");
          //}
        }
      } else {
        /*setCheck(true);
        const role = "user without confirmation"
        navigation.navigate("Step1", {
          role: role,
          nativeLanguage : "English"
        });*/
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    VerificationData();
  }, []);
  // const [nextActivity, setNextActivity] = useState(null);
  // const [activityList, setActivityList] = useState(null);

  /*🇫🇷 Les activités à récuperer viennent du back-end et sont stockées dans response.data
  puis insérées dans la variable events via la méthode setEvents.
  Il faudra adapter la requête pour récupérer à partir de la date du jour, lister
  les activités suivantes et les séparer par jours.
  🇬🇧 The events to get are stored in the back-end. We take response.data from our
  axios request and insert its values in setEvents to update the events variable.
  To do: Change the request to fetch from current day, show next activities and group them
  by days.
  */

  const toDateTime = (date, startTime) => {
    const dateParts = date.toString().trim().split("/");
    const hoursParts = startTime.split(":");
    return new Date(
      parseInt(dateParts[2]),
      parseInt(dateParts[1]) - 1,
      parseInt(dateParts[0]),
      parseInt(hoursParts[0]),
      parseInt(hoursParts[1])
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      // useEffect(() => {
      if (!chargement) return;

      // navigation.addListener("focus", () => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${hostname}/api/v1/activities/list?limit=${limit}&skip=${skip}`
          );
          // const url = `${hostname}/api/v1/activities/list?limit=${limit}&skip=${skip}`;
          // console.log("URL: ", url);
          // const today = new Date();
          // const todaynumber = Date.parse(today);
          // const tmpEvent = response.data.data.filter((e) => {
          // const curDate = Date.parse(toDateTime(e.date, e.startTime));
          //   return curDate > todaynumber - 4 * 60 * 60 * 1000;
          // }); //Backend3/controllers/v1/EventControllers.js
          const tmpEvent = response.data.data;
          // setDate(date);

          if (tmpEvent.length === 0) {
            setChargement(false);
            setLoading(false);
            setSplashLoading(false);
          } else {
            setEvents((prevEvents) => [...prevEvents, ...tmpEvent]);
          }
          // setEvents(tmpEvent);
          // console.log(tmpEvent);
        } catch (error) {
          console.log(error.message);
        }
      };
      try {
        fetchData();

        const timer = setInterval(() => {
          setSkip((prevSkip) => prevSkip + limit);
          console.log("skip lim", skip, limit);
        }, 1000);

        return () => {
          clearInterval(timer);
          //lorsque l'on est pas sur la page activites on recommence le chargement de la page en mettant les valeurs initiale
        };
      } catch (error) {
        console.error(error);
      }
      // });
    }, [skip, chargement])
  );

  // le sortir du useFocusEffect pour empecher de generer un double affichage
  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      setEvents([]); // Clear events
      setSkip(0); // Reset skip to 0
      setChargement(true); // Reset chargement
      setLoading(false); // Reset loading
      setSplashLoading(false); // Reset splashLoading
    });
    // The cleanup function will run when the component is unmounted
    return unsubscribe;
  }, []); // Empty dependency array means this effect only runs once, when the component mounts

  const [connectedUser, setConnectedUder] = useState();

  useEffect(() => {
    const getUser = async () => {
      const token = await AsyncStorage.getItem("userToken");
      // console.log("token", token);
      const response = await axios.post(
        `${hostname}/api/v1/user/get-user-by-token`,
        { token }
      );

      if (response && response.data) {
        const { user } = response.data;

        setConnectedUder(user);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    /*
      Regroupement selon la date
      => chaque groupe a ce format : {title: day, data : [les events du meme jour ]}
      => c'est le title du groupe qui est affiché dans renderSectionHeader
    */

    let tmpGroupedEvents = [];
    //const myevents = [...events, ...events, ...events, ...events]; //to remove: just for test (to have too many events)
    events.forEach((event) => {
      //use events
      // console.log("date", event.date, event.startTime);
      let date = toDateTime(event.date, event.startTime);
      let notExist = true;
      const day = dateFormat(date, "dddd, dd mmmm yyyy");

      event.intTime = parseInt(event.startTime.replace(":", ""));

      // tmpGroupedEvents.forEach((gpevt) => {
      //   if (gpevt.title === day) {
      //     gpevt.data.push(event);
      //     notExist = false;
      //   }
      // });
      // if (notExist) {
      //   tmpGroupedEvents.push({
      //     title: day,
      //     data: [event],
      //     intDate: Date.parse(date),
      //   });
      // }
      tmpGroupedEvents.push({
        title: day,
        data: [event],
        intDate: Date.parse(date),
      });
      // console.log(events);
    });

    //Tri des events dans un groupe selon le startTime
    tmpGroupedEvents.forEach((gbe) => {
      gbe.data = gbe.data.sort((e1, e2) => e1.intTime - e2.intTime);
    });

    //Tri des groupes selon la date
    tmpGroupedEvents = tmpGroupedEvents.sort(
      (ge1, ge2) => ge1.intDate - ge2.intDate
    );
    // Replace duplicate title date with an empty string to not show the same date multiple times
    const uniqueTitles = new Set();
    const newData = tmpGroupedEvents.map((item) => {
      if (uniqueTitles.has(item.title)) {
        return { ...item, title: "" };
      } else {
        uniqueTitles.add(item.title);
        return item;
      }
    });
    setGroupedEvents(newData);
    console.log(newData);

    //Filtrer pour laisser les events avec date non dépasser
    // A faire avec sort : laissé pour pouvoir avoir pour d'events a afficher
    // setGroupedEvents(tmpGroupedEvents);
    // setGroupedEvents(newData.slice(0,6));

    const timer = setTimeout(() => {
      setSplashLoading(false);
      setLoading(false);
    }, 400);

    // if (newData.length === 0) {
    //   setChargement(false);
    // } else {
    //   setGroupedEvents((prevEvents) => [...prevEvents, ...newData]);
    // }

    //   setGroupedEvents(prevData => {
    //     // Take the next x activities from 'data'
    //     const nextData = newData.slice(prevData.length, prevData.length + 6);
    //     // Return the concatenation of the old and new data
    //     console.log(nextData);
    //     if (nextData.length === 0) {
    //         clearInterval(timer); // Stop the timer if nextData is empty
    //         return prevData;
    //       } else {
    //         return [...prevData, ...nextData];
    //       }
    //   });
    // }, 1000);
  }, [events]);
  // console.log(groupedEvents);
  /*🇫🇷 Chaque activité récupérée en base de données est affichée dans le composant
  d'affichage ActivityCard_small.
  /*🇬🇧 Each event fetched from the database is rendered in the
  display component ActivityCard_small*/

  const renderItem = ({ item }) => {
    // const avatar = fetchAvatar(item.author);

    // console.log("test", item.date);

    return (
      <>
        <ActivityCard_small
          event={item}
          connectedUser={connectedUser}
          scr={scr}
        />
        {/* author={avatar}*/}
      </>
    );
    //}
  };

  const renderSectionHeader = ({ section: { title } }) => {
    if (!title) {
      return null; // Don't render anything if the title is empty
    }
    return (
      <View style={styles.header}>
        <View style={{ flexDirection: "row" }}>
          {/* <DatePicker date={date} setDate={setDate} /> */}
          <Image
            source={ScheduleIcon}
            style={ styles.scheduleIconImg }
          />

          <Text style={{ fontSize: 16 }}>{title}</Text>
        </View>
      </View>
    );
  };

  // return events.length > 0 && <Text>Activities page {fromStack}</Text>;
  /*🇫🇷 La variable fromStack définit l'affichage en fonction de la barre de navigation sous le titre.
  🇬🇧 The variable fromStack displays different event lists based on the navigation bar below the title*/
  if (fromStack === "calendar") {
    return (
      <>
        <EmailCheckDialog
          dialogVisible={emailCheckDialogVisible}
          displayModal={displayEmailCheckDialog}
          goToMailCheckScreen={goToMailCheckScreen}
          user={user}
          scr={scr}
        />
        {splashLoad && (
          <View style={styles.splashContainer}>
            <Image source={SplashS} style={styles.imgSplash} />
            <Spinner
              visible={loading}
              color="#000000"
              style={styles.spinnerLoad}
            />
          </View>
        )}

        {events.length > 0 && (
          <SafeAreaView
            style={[styles.container, { width: screenWidth, maxWidth: 450 }]}
          >
            <View style={ styles.safeAreaSubView }>
              {/* <Text style={{ textAlign: "center" }}>
              15000 {activity.b2022_members} 120 {activity.b2022_online}
            </Text> */}
            </View>
            <View style={ styles.calendarFieldView } >
              {/*🇫🇷 Le composant CalendarField affiche par défaut la date du jour et celle-ci
            est modifiable en appuyant dessus*/}
              {/*🇬🇧 The CalendarField component displays today's date by default, which can
            be modified by pressing it*/}
              {/* <CalendarDateField title={""} state={date} setState={setDate} /> */}
              {/* <TouchableOpacity
              onPress={() => navigation.push("FilterScreen")}
              style={{
                paddingHorizontal: 5,
                backgroundColor: "#59c09b",
                width: 75,
                height: 30,
                borderRadius: 5,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                alignSelf: "flex-end",
                marginLeft: "auto",
              }}
            >
              <Icon
                name="sliders"
                type="font-awesome"
                color="white"
                size={20}
              />
              <Text style={{ color: "white" }}>Filters</Text>
            </TouchableOpacity> */}
            </View>

            {/* <FlatList
            data={events}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
          /> */}

            <SectionList
              sections={groupedEvents}
              keyExtractor={(item, index) => item + index}
              renderItem={renderItem}
              renderSectionHeader={renderSectionHeader}
              stickySectionHeadersEnabled={true}
            />

            {/**
             * This FAB will be created using icon : "add", now it's not working with icon, I used title instead
             */}
            <FAB
              onPress={() => handleNavigationFromRole()}
              style={{ margin: 30 }}
              icon={
                <Icon
                  name="plus"
                  type="font-awesome"
                  color="#59b09c"
                  size={28}
                />
              }
              color="white"
              placement="left"
              // titleStyle = {{color : "#59c09b",fontSize : 30, padding : 0}}
              // title="+"
            />
          </SafeAreaView>
        )}
      </>
    );
  }

  if (fromStack === "upcoming activities") {
    return (
      events.length > 0 &&
      {
        /**/
      }
      /*events.length > 0 && avatar.length !== null && (
         <SafeAreaView style={styles.container}>
           <FlatList data={events} renderItem={renderItem} keyExtractor={(item) => item._id}/>
        </SafeAreaView>
        )*/
    );
  }

  if (fromStack === "past activities") {
    return (
      events.length > 0 && (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={events}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
          />
        </SafeAreaView>
      )
    );
  }

  if (fromStack === "organized activities") {
    return (
      events.length > 0 && (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={events}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
          />
          <FAB
            onPress={() => navigation.navigate("Create Activity")}
            style={{ margin: 30 }}
            icon={{ name: "add", color: "#59c09b" }}
            color="white"
            placement="left"
          />
        </SafeAreaView>
      )
    );
  }

  if (fromStack === "filtered") {
    return (
      events.length > 0 && (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={events.sort((a, b) => a.date.localeCompare(b.name))}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
          />
        </SafeAreaView>
      )
    );
  }
};

export default ActivitiesScreen;
