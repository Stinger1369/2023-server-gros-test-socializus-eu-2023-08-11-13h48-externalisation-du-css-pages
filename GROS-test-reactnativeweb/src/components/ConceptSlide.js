/* EN - This component is the layout that all the aboutUs slides share. In order to display the right data, the component uses the "id" received as a prop. Then, with the find method, it compares all the objects ids of the array with the received id and initializes the conceptContent variable. For any swiper reorganization, you need either to reoganize the json, or change the AboutUsSlides order in the AboutUsScreen page.
Pay attention to the images names; the number in it has to be the same as id of the object that contains the corresponding data. ( frame Figma : 80A - 80F) - EN  */

/* FR - Ce composant est la mise en page que tous les slides de aboutUsScreen partagent. Pour afficher les bonnes données, le composant s'aide de l'id reçu en prop. Ensuite, avec la méthode find, il compare tous les id des objets de l'array avec l'id reçu et initialise la variable conceptContent. Pour toute réorganisation du swiper, il suffit soit de réorganiser le json, soit de changer l'ordre les AboutUsSlides dans la page AboutUsScreen. Faîtes attention aux nom des images; le chiffre qu'il y a dedans doit être le meme que l'id de l'objet contenant les données correspondantes (frame Figma : 80A - 80F) - FR */

import {
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import styles from "./Styles/ConceptSlideCss";
import Logo from "../assets/images/concept_images/logo.svg";
// import Json from "../assets/json/fr.json";
import Swiper from "react-native-web-swiper";
import Json from "../assets/json/en.json";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FAB, Icon } from "@rneui/themed";
import { MaterialCommunityIcons } from "@expo/vector-icons";

//Change the id value and set the name of the activity type instead of a number, and change it in the images name as well
const ConceptSlide = (props, user) => {
  console.log("Props for ConceptSlide:", props);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const hideHeader = () => {
    navigation.setOptions({
      headerShown: true,
      drawerLabel: () => null,
    });
  };
  const [localUser, setLocalUser] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    console.log("ConceptSlide::useEffect!! user pt");
    AsyncStorage.getItem("user").then((suser) => {
      if (suser != "undefined") {
        setLocalUser(JSON.parse(suser));
        console.log(
          "ConceptSlide::useEffect!! user pt",
          user,
          JSON.parse(suser)
        );
        console.log(suser);
      } else {
      }
    });
  }, []);

  const handleNavigationFromRole = () => {
    const authorized = ["admin", "moderator", "user"];
    navigation.navigate("Create Activity", {
      user: localUser,
    });
  };

  const concept = props.concept; //avant c'etait json langue default
  const conceptButtons = props.conceptButtons;
  const conceptContent = concept.find(
    (contentId) => contentId.id === parseInt(props.id)
  );
  console.log("ConceptSlide:", concept);
  const screenHeight = Dimensions.get("screen").height;
  const ConceptButtons = Json.conceptButtons;
  console.log("ConceptSlide:");
  return (
    <ScrollView style={styles.scrollView}>
      <View
        style={{
          position: "relative",
          height: screenHeight <= 750 ? "30%" : "30%",
          maxHeight: 450,
        }}
      >
        <Image source={Logo} style={styles.logo} />
        <Image
          source={require(`../assets/images/concept_images/AboutUs${props.id}.jpg`)}
          resizeMode={"cover"}
          style={styles.conceptImage}
        />
      </View>
      <View
        style={[
          styles.navigationContainer,
          { marginTop: screenHeight <= 700 ? 105 : 100 },
        ]}
      >
        <TouchableOpacity onPress={props.prevSlide} style={styles.iconButton}>
          <MaterialCommunityIcons
            name="chevron-left-circle"
            size={40}
            color="#59b09c"
          />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={[styles.title]}>
            {/*🇫🇷 La variable concept.subtitle_1 dans fr.json permet d'afficher "(Pour faire des échanges culturel)"*/}
            {/*🇬🇧 The en.json variable concept.subtitle_1 displays "(To have cultural exchanges)""*/}
            {conceptContent?.title}
          </Text>
        </View>
        <TouchableOpacity onPress={props.nextSlide} style={styles.iconButton}>
          <MaterialCommunityIcons
            name="chevron-right-circle"
            size={40}
            color="#59b09c"
          />
        </TouchableOpacity>
      </View>
      <Text
        style={[
          styles.txt,
          {
            fontSize: screenHeight <= 750 ? 15 : 17,
            lineHeight: screenHeight <= 700 ? 15 : 30,
            marginBottom: screenHeight <= 700 ? 10 : "2%",
          },
        ]}
      >
        {/*🇫🇷 La variable concept.description_1 dans fr.json permet d'afficher "La première application de rencontres conviviales, afin d'aider les étrangers et les organisateurs à se rencontrer et à partager leurs activités dans leur ville de résidence. Tout est géolocalisé et partagé avec quelques cartes et notifications mobiles pour ne rien manquer."*/}
        {/*🇬🇧 The en.json variable concept.description_1 displays "The first application for friendly meetings, in order to help foreigners and organizers to meet and share their activities in their city of residence. Everything is geolocated and shared with some cards and mobile notifications to never miss anything."*/}
        {conceptContent?.aboutDescription}
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Activities")}
        >
          <Text style={styles.buttonText}>{conceptButtons.participate}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNavigationFromRole()}
        >
          <Text style={styles.buttonText}>{conceptButtons.share}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
export default ConceptSlide;
