/*🇫🇷 Liste des activités de l'utilisateur (Mes activités) (Frame 21B Figma)

Ceci est la page des activités de l'utilisateur connecté relié à la page ActivitiesScreen. 
Pour tester, la liste des activités a été récupérée pour l'afficher ici. 
Il faudra la remplacer par la liste des activités créées par l'utilisateur.
D'après moi, cette fonction n'est pas encore dans le backend. Je ne suis 
pas non plus arrivée à récupérer l'ID ou le numéro de membre de l'utilisateur,
pour ensuite l'utiliser avec la future fonction et récupérer les activités... 🇫🇷 */
/*🇬🇧 User event list (My activities) (Frame 21B Figma) 
This page shows the user's activities and is related to the ActivitiesScreen page.
For testing purposes, we simply fetched all activities. We'll need to 
update the request to show the connected user's activities. This probably wasn't
coded in the backend. And we need to know the user ID and membership number to
fetch the right activities. 🇬🇧 */
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import styles from "../Styles/MyActivitiesScreenCss";
import { CalendarDateField } from "../../components/CalendarField";
import MyActivityDetails from "../../components/MyActivityDetails";
import moment from "moment";
import { Icon } from "@rneui/themed";
import axios from "axios";
import { color } from "react-native-reanimated";
import { hostname } from "../../../../mvp-reactnative/backendconnect/hostname";
// import DateTimePicker from "@react-native-community/datetimepicker";

const MyActivitiesScreen = () => {
  const [buttonSelected, setButtonSelected] = useState("past");
  const now = moment();
  const [date, setDate] = useState(moment(now).format("dddd D MMM YYYY"));
  const [events, setEvents] = useState([]);

  const fetchData = async () => {
    //🇫🇷 Récupération des données utilisateur dans le storage
    try {
      const response = await axios.get(`${hostname}/api/activities/getlist`);
      // const response = await axios.get(
      //   `https://backoffice.socializus.com/api/activities/getlist`
      // );
      setEvents(response.data); //🇫🇷 On stocke les données dans le state
    } catch (error) {
      error.message;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderItem = ({ item }) => {
    //const avatar = fetchAvatar(item.author);
    return (
      <>
        <MyActivityDetails
          event={item}
          //author={avatar}
        />
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[ styles.upComingBtn, {backgroundColor:buttonSelected === "upcoming" ? "#59c09b" : "white"}]}
          key={"upcoming"}
          onPress={() => setButtonSelected("upcoming")}
        >
          <View style={styles.activityType}>
            <Text
              style={{
                color: buttonSelected === "upcoming" ? "white" : "#59c09b",
                fontWeight: "bold",
              }}
            >
              Upcoming
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[ styles.pastBtn, { backgroundColor: buttonSelected === "past" ? "#59c09b" : "white"}]}
          key={"past"}
          onPress={() => setButtonSelected("past")}
        >
          <View style={[styles.activityType, styles.middle]}>
            <Text
              style={{
                color: buttonSelected === "past" ? "white" : "#59c09b",
                fontWeight: "bold",
              }}
            >
              Past
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[ styles.likedBtn, { backgroundColor: buttonSelected === "Liked" ? "#59c09b" : "white"}]}
          key={"Liked"}
          onPress={() => setButtonSelected("Liked")}
        >
          <View style={[styles.activityType, styles.right]}>
            <Text
              style={{
                color: buttonSelected === "Liked" ? "white" : "#59c09b",
                fontWeight: "bold",
              }}
            >
              Liked
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[ styles.organizedBtn, {backgroundColor: buttonSelected === "organized" ? "#59c09b" : "white"}]}
          key={"organized"}
          onPress={() => setButtonSelected("organized")}
        >
          <View style={styles.activityType}>
            <Text
              style={{
                color: buttonSelected === "organized" ? "white" : "#59c09b",
                fontWeight: "bold",
              }}
            >
              Organized
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 0, marginHorizontal: 5 }}>
        <Text style={ styles.activitiesListTxt }>
          <Text>Here is a list of my activities*</Text>
          <br />
          <Text>(upcoming, past, organized or *liked)</Text>
        </Text>
      </View>
      <View style={ styles.calendarFieldView }>
        <CalendarDateField title={""} state={date} setState={setDate} />

        <TouchableOpacity style={ styles.slidersBtn }>
          <Icon name="sliders" type="font-awesome" color="white" size={20} />
          <Text style={{ color: "white" }}>Filters</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </SafeAreaView>
  );
};

export default MyActivitiesScreen;
