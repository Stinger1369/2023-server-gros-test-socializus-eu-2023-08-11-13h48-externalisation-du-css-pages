// 🇫🇷 Ceci est un composant de mes activités détaillées, relié à la page MyActivities (Frame Figma : 21A) 🇫🇷
// 🇬🇧 This is a component page of the detailed activity at the page MyActiviites (Figma Frame : 21A) 🇬🇧
import { TouchableOpacity, View, Text, Image } from "react-native";
import styles from "./Styles/MyActivityDetailsCss";

/*****************IMPORT IMAGE SVG***********************/
import Dollar from "../assets/images/dollar.svg";
import Free from "../assets/images/free.svg";
import Canvas from "../assets/images/canvas.svg";
import Discoballs from "../assets/images/discoballs.svg";
import Apero from "../assets/images/apero.svg";
import Placeholder2 from "../assets/images/placeholder2.svg";
import Sports from "../assets/images/sports.svg";
import moment from "moment";
import Participants from "../assets/images/participants.svg";
import Heart from "../assets/images/heart.svg";
import { activitiesList } from "../assets/activityList/activityListWithIcons";
import { useNavigation } from "@react-navigation/native";

//event object => activiteé detaille

const MyActivityDetails = ({ event }) => {
  const navigation = useNavigation();

  //Split the saved address
  const splitAddress = event.address.split(", ");
  const zipCode = splitAddress[splitAddress.length - 2].slice(0, 5);

  return (
    <TouchableOpacity
      style={styles.activityOne}
      onPress={() =>
        navigation.navigate("Activity", {
          event: event,
        })
      }
    >
      <View style={ styles.viewOne } >
        <View style={ styles.viewTwo } >
          {event.topic === undefined
            ? activities[11].activityTypeIcon_On
            : activities[event.topic].activityTypeIcon_On}
        </View>

        <Text style={ styles.eventTopicTxt } >
          {event.topic === undefined
            ? "Party"
            : activities[event.topic].activityTypeTitle}
        </Text>
      </View>

      <View style={ styles.viewThree } >
        <View style={ styles.viewFour } >
          <View>
            <Text style={{ fontWeight: "bold" }}>{event.title}</Text>
          </View>
          {event.price !== 0 && (
            <View>
              <Image source={Dollar} style={ styles.participantsImg } />
            </View>
          )}
        </View>

        <View style={ styles.viewFive } >
          <Text style={ styles.startTimeTxt }>
            {event.startTime}
          </Text>

          <View style={ styles.viewSix }>
            <Image source={Participants} style={ styles.participantsImg } />
            <Text style={ styles.participantsTxt }>
              {event.attendees.length}/{event.attendeeLimit}
            </Text>
          </View>

          <View style={ styles.viewSix }>
            <Image source={Placeholder2} style={ styles.participantsImg } />
            <Text style={{ fontWeight: "bold" }}>{zipCode}</Text>
          </View>
          <Image source={Heart} style={ styles.participantsImg } />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MyActivityDetails;
