/*FR Composant Activité dans ActivitiesScreen (Login)
Les cartes sont censées changer quand l'utilisateur appuie sur la loupe, dans le header.
Je n'ai par contre pas réussi à faire fonctionner ça...
*/
/*GB Activity Component in ActivitiesScreen (login)
The cards are supposed to change when the user presses the magnifying glass in the header.
I didn't get to make it work, though...
*/
import { Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import styles from "./Styles/ActivityCardsCss"
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";

import LoveActivated from "../assets/images/heartRed.svg";
import Dollar from "../assets/images/dollar.svg";
import Placeholder2 from "../assets/images/placeholder2.svg";
import LoveDeactivated from "../assets/images/heartGrey.svg";
import Free from "../assets/images/free.svg";
import Participants from "../assets/images/participants.svg";
import { activities } from "../assets/activityList/activityListWithIcons.js";
import { hostname } from "../backendconnect/hostname";
import axios from "axios";

const ActivityCard_small = ({ event }) => {
  const navigation = useNavigation();

  // (EN)event title trim for it always fits the card
  const title =
    event.title.length >= 30 ? event.title.substr(0, 30) + "..." : event.title;

  //get the zipcode only
  if (!event.isOnline && event.address.includes(",")) {
    var splitAddress = event.address.split(", ");
    var zipCode = splitAddress[splitAddress.length - 2].slice(0, 5);
  }
  //const splitAddress = event.address;
  //event.address ? splitAddress = event.address.split(", ") : splitAddress = "No address";
  //const zipCode = splitAddress[splitAddress.length - 2].slice(0, 5);
  const [author, setAuthor] = useState();

  useEffect(() => {
    const getUser = async () => {
      //console.log("Event:", event); // Log the whole event object
      //console.log("Author:", event.author); // Log the author ID

      if (event.author) {
        try {
          const response = await axios.get(
            `${hostname}/api/v1/user/getuserinfo/${event.author}`
          );
  
          if (response && response.data) {
            setAuthor(response.data.user);
          }
        } catch (error) {
          //console.log("Erreur lors de la récupération des informations utilisateur:",error );
        }
      } else {
        //console.log("Aucun auteur n'est disponible pour cet événement ou l'auteur est ignoré");
      }
    };
  
    getUser();
  }, [event]);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Activity", {
          event: event,
        });
      }}
      style={[
        styles.container_small,
        {
          backgroundColor:
            event.attendees && event.attendees < event.attendeeLimit
              ? "#D8EDE6"
              : event.attendees && event.attendees === 15
              ? "#E1E0E0"
              : "#FDFDFD"
        },
      ]}
    >
      <View style={styles.leftSide}>
        <View style={styles.leftSideView}>
          {/* image de l'activité */}
          <Image
            source={{ uri: event.activityImage }}
            style={styles.activityImg_small}
          />
        </View>
          {/* icône liker */}
        {/* <LoveActivated
          width={20}
          height={20}
          style={{ position: "absolute", top: 6, left: 6 }}
        /> */}
        {/* tarif de participation à l'activité */}
        {event.price !== 0 && (
          
          <Dollar
            width={20}
            height={20}
            style={ styles.dollarSign }
          />
        )}

        {/* Put a conditional rendering here for this Text to display Attendee, Waiting or any other status */}
        {/* <Text style={styles.userStatusText}>Attendee</Text> */}
      </View>

      <View style={styles.rightSide}>
        <View style={styles.basicStyle}>
          <View>
            <View>
              <Text
                style={styles.basicStyleText}>
                {/* titre de l'activité */}
                {title}
              </Text>
            </View>

            <View>
              <Text style={styles.basicStyleTexttwo}>
                {/* horaire de l'activité */}
                {event.startTime}
              </Text>
            </View>
          </View>

          <View style={styles.basicStyleView}>
            {/* image montre le type de l'activité qui aura lieu */}
            {!author && (
              <Image
                source={{ uri: event.activityImage }}
                style={ styles.activityImage }
              />
            )}
            {author && (
              <Image
                source={{ uri: author.avatar }}
                style={ styles.activityImage }
              />
            )}
          </View>
        </View>

        <View style={styles.basicStyle}>
          <View style={ styles.flexCss }>
            <View style={styles.rowCenter}>
              {/* le nombre de participant à l'activité */}
              <Participants width={20} height={20} />
              <Text style={styles.textWithIcon}>
              {event.attendeeLimit === 1000000
                  ? event.attendees.length + event.nbFriends
                  : event.attendees.length +
                    event.nbFriends +
                    "/" +
                    event.attendeeLimit}
              </Text>
            </View>

            <View style={[styles.rowCenter, { marginLeft: 15 }]}>
              {/* localisation du lieu de l'activité */}
              <Placeholder2 width={18} height={18} />
              <Text style={{ fontWeight: "bold" }}>{zipCode}</Text>
            </View>
          </View>

          <View>
            <Text
              style={ styles.textTwo}>
              {event.topic === undefined
                ? "Party"
                : activities[event.topic].activityTypeTitle}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};


export default ActivityCard_small;


