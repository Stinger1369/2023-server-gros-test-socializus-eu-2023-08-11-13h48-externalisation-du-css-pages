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
import { hostname } from "../backendconnect/hostname"
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, FlatList } from "react-native";
import styles from "./Styles/MyActivitiesScreenCss"
import { CalendarDateField } from "../components/CalendarField";
import MyActivityDetails from "../components/MyActivityDetails";
import moment from "moment";
import { Icon } from "@rneui/themed";
import axios from "axios";
import { color } from "react-native-reanimated";
import DateTimePicker from "@react-native-community/datetimepicker";

const MyActivitiesScreen = () => {
  const [buttonSelected, setButtonSelected] = useState("past");
  const now = moment();
  const [date, setDate] = useState(moment(now).format("dddd D MMM YYYY"));
  const [events, setEvents] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${hostname}/api/activities/getlist`
      );
      setEvents(response.data);
    } catch (error) {
      error.message;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderItem = ({ item }) => {
    // const avatar = fetchAvatar(item.author);
    return (
      <>
        <MyActivityDetails event={item}
          // author={avatar}
        />
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={ styles.safeViewContainer }>
        <Text style={ styles.comingSoonTxt }>
          COMING SOON
        </Text>
      </View>
      {<View
        style={ styles.calendarContainer }>
        <CalendarDateField title={""} state={date} setState={setDate} />

        <TouchableOpacity
          style={ styles.sliderBtn }>
          <Icon name="sliders" type="font-awesome" color="white" size={20} />
          <Text style={ styles.filterTxt }>Filters</Text>
        </TouchableOpacity>
      </View>}

      {/*<FlatList data={events} renderItem={renderItem} keyExtractor={(item) => item._id}/>*/}
    </SafeAreaView>
  );
}



export default MyActivitiesScreen;
