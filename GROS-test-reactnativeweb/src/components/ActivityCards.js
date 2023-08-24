/*FR Composant Activité dans ActivitiesScreen (Login)
Les cartes sont censées changer quand l'utilisateur appuie sur la loupe, dans le header.
Je n'ai par contre pas réussi à faire fonctionner ça...
*/
/*GB Activity Component in ActivitiesScreen (login)
The cards are supposed to change when the user presses the magnifying glass in the header.
I didn't get to make it work, though...
//🇫🇷 Composant Activité dans ActivitiesScreen (Frame 21 sur Figma)
//🇬🇧 Activity Component in ActivitiesScreen (Frame 21 of Figma)
*/
//update 25/05/2023
import { Text, View, TouchableOpacity, Image, Dimensions } from "react-native";
import styles from "./Styles/ActivityCardsCss";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { hostname } from "../../../mvp-reactnative/backendconnect/hostname";
import LoveActivated from "../assets/images/heartRed.svg";
import Dollar from "../assets/images/dollar.svg";
import Placeholder2 from "../assets/images/placeholder2.svg";
import LoveDeactivated from "../assets/images/heartGrey.svg";
import Free from "../assets/images/free.svg";
import Participants from "../assets/images/participants.svg";
import inviteFriendsImage from "../assets/images/inviteFriends.svg";

import { activitiesList } from "../assets/activityList/activityListWithIcons.js";
import { async } from "@firebase/util";
import axios from "axios";

const ActivityCard_small = ({ event, connectedUser, scr }) => {
  const { activity } = scr;

  //Il faut trouver un truc pour la waiting list; comment voir si l'utilisateur veut participer, mais la liste des utilisateur est déjà remplie...
  const navigation = useNavigation();
  const screenWidth = Dimensions.get("screen").width;

  const [author, setAuthor] = useState();
  // const [cardBackgroundColor, setCardBackgroundColor] = useState("#FDFDFD");
  // const [userStatus, setUserStatus] = useState({status: "", backgroundColor: "transparent"})

  // useEffect(() => {
  //   const getUser = async () => {
  //     // console.log("getting user");

  //     const response = await axios.get(
  //       `${hostname}/api/v1/user/getuserinfo/${event.author}`
  //     );
  //     //console.log("USERINFOOOOOOOO",response.data);

  //     if (response && response.data) {
  //       setAuthor(response.data.user);
  //     }
  //   };
  //   getUser();
  // }, [event]);

  useEffect(() => {
    const getUser = async () => {
      //console.log("Event:", event); // Log the whole event object
      //console.log("Author:", event.author); // Log the author ID

      // Ignore these specific user IDs
      const ignoredUserIds = [
        "647f2d2a6080595ba0822471",
        "647857aafc63f4b426a7ede7",
      ];

      if (event.author && !ignoredUserIds.includes(event.author)) {
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

  /* For a future update, the following commented data will be for when a user is in the waiting list.
  When the time to add this comes, just add a condition that states if the user is in the attendee list but the quota of prticipants for the activity has been reached */

  // {status: "Waiting list",
  //  backgroundColor: "#FFC107",
  //  cardBackgroundColor: "#FFFCF3"}

  const [userStatus, setUserStatus] = useState({
    status: "",
    backgroundColor: "transparent",
    cardBackgroundColor: "#FDFDFD",
  });
  useEffect(() => {
    if (connectedUser) {
      let userS = event.attendees.includes(connectedUser._id)
        ? {
            status: activity.t2022_Attendee, //  pour afficher "Participant" dans ActivityCard
            backgroundColor: "#59c09b",
            cardBackgroundColor: "#D8EDE6",
          }
        : {
            status: "",
            backgroundColor: "transparent",
            cardBackgroundColor: "#FDFDFD",
          };
      if (event.waitingList && event.waitingList.includes(connectedUser._id)) {
        userS = {
          status: activity.t2022_WaintingList, //  pour afficher "Liste d'attente" dans ActivityCard
          backgroundColor: "#FFC107",
          cardBackgroundColor: "#FFFCF3",
        };
      }
      setUserStatus(userS);
    }
  }, [event, connectedUser]);

  // (EN)event title trim for it always fits the card (update: 28.01: better responsiveness)

  let title = "";
  if (screenWidth < 390) {
    if (event.title.length > 30) {
      title = event.title.substr(0, 30) + "...";
    } else {
      title = event.title;
    }
  } else {
    if (event.title.length > 60) {
      title = event.title.substr(0, 59) + "...";
    } else {
      title = event.title;
    }
  }

  //get the zipcode only
  if (!event.isOnline) {
    if (typeof event.address === "string") {
      var splitAddress = event.address.split(", ");
      if (splitAddress.length >= 2) {
        var zipCode = splitAddress[splitAddress.length - 2].slice(0, 5);
        // utilisez 'zipCode' ici
      } else {
        // gérer le cas où 'splitAddress' n'a pas au moins deux éléments
      }
    } else {
      // gérer le cas où 'event.address' n'est pas une chaîne de caractères
    }
  }
  //const splitAddress = event.address;
  //event.address ? splitAddress = event.address.split(", ") : splitAddress = "No address";
  //const zipCode = splitAddress[splitAddress.length - 2].slice(0, 5);
const [resizeMode, setResizeMode] = useState("cover");

useEffect(() => {
  Image.getSize(
    event.activityImage,
    (width, height) => {
      const imageRatio = width / height;
      setResizeMode(imageRatio > 1 ? "cover" : "contain"); // Modifiez la condition ici
    },
    (error) => {
      console.error(`Couldn't get the image size: ${error}`);
    }
  );
}, [event.activityImage]);


  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Activity", {
          event: event,
          pageTitle: activitiesList[event.topic].activityTypeTitle,
        });
      }}
      style={[
        styles.container_small,
        {
          backgroundColor: userStatus.cardBackgroundColor,
        },
      ]}>
      <View style={styles.leftSide}>
        <View
          style={ styles.imgContainer }>
          <Image
            source={{ uri: event.activityImage }}
            style={[styles.activityImg_small, { resizeMode: resizeMode }]}
          />
        </View>
        {/* icône liker */}
        {/* <img
          src={LoveActivated}
          width={20}
          height={20}
          style={{ position: "absolute", top: 6, left: 6 }}
        /> */}
        {/* tarif de participation à l'activité */}
        {event.hasPrice && (
          <Image
            source={require("../assets/images/dollar.svg")}
            style={ styles.dollarImgStyle }
          />
        )}

        {/* Put a conditional rendering here for this Text to display Attendee, Waiting or any other status */}
        <Text
          style={[
            styles.userStatusText,
            { backgroundColor: userStatus.backgroundColor },
          ]}>
          {userStatus.status}
        </Text>
      </View>

      <View style={styles.rightSide}>
        <View style={styles.basicStyle}>
          <View style={{ flex: 1 }}>
            <Text
              style={ styles.titleTxt }>
              {/* titre de l'activité */}
              {title}
            </Text>
            <Text
              style={ styles.startTimeTxt }>
              {/* horaire de l'activité */}
              {event.startTime}
            </Text>
          </View>
          <View
            style={ styles.activityTypeContainer }>
            {/* image montre le type de l'activité qui aura lieu */}
            {!author && (
              <Image
                source={{ uri: event.activityImage }}
                style={ styles.activityTypeImg }
              />
            )}
            {author && (
              <Image
                source={{ uri: author.avatar }}
                style={ styles.activityTypeImgTwo }
              />
            )}
          </View>
        </View>

        <View style={styles.basicStyle}>
          <View style={ styles.flexContainer }>
            <View style={styles.rowCenter}>
              {/* le nombre de participant à l'activité */}
              <Image source={Participants} style={ styles.participantsImg } />
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
              <Image source={Placeholder2} style={ styles.placeHolderImg } />
              {!event.isOnline ? (
                <Text style={{ fontWeight: "bold" }}>{zipCode}</Text>
              ) : (
                <Text></Text>
              )}
            </View>
          </View>

          <View>
            <Text
              style={ styles.eventTopicTxt }>
              {event.topic === undefined
                ? "Party"
                : activitiesList[event.topic].activityTypeTitle}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ActivityCard_small;
