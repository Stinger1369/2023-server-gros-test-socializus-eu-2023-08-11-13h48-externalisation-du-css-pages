import React, { useEffect, useRef, useState } from "react";
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Swiper from "react-native-web-swiper";
import ConceptSlide from "../components/ConceptSlide";
import { MaterialCommunityIcons } from "@expo/vector-icons";
//import { FAB, Icon } from "@rneui/themed"
import { hostname } from "../../../mvp-reactnative/backendconnect/hostname.js";
import axios from "axios";
// supposez que la langue désirée est l'anglais
import Json from "../assets/json/en.json";
import styles from "./Styles/ConceptScreenCss";

const ConceptScreen = (props) => {
  console.log("Props for ConceptScreen:", props);
  const conc = props.scr.concept;
  const conceptButtons = props.scr.conceptButtons;
  const screenHeight = Dimensions.get("screen").height;
  const ref = useRef(null);

  //console.log(props.scr);
  const hideHeader = () => {
    navigation.setOptions({
      headerShown: false,
      drawerLabel: () => null,
    });
  };
  const displayEmailCheckDialog = () => {
    setEmailCheckDialogVisible(!emailCheckDialogVisible);
  };
  const handleNavigationFromRole = () => {
    const authorized = ["admin", "moderator", "user"];
    const user = {
      role: {
        name: [
          "xxxxx user without confirmation",
          "autre role 1",
          "autre role 2",
        ],
      },
    };
    if (user?.role.name[0] === "user without confirmation") {
      displayEmailCheckDialog();
    } else {
      navigation.navigate("Create Activity", {
        user: user,
      });
    }
  };

  const slides = [1, 2, 3, 4, 5, 6];
  slides.sort(() => Math.random() - 0.5);
  const nextSlide = () => {
    setActiveSlideIndex((prevIndex) => {
      if (prevIndex === slides.length - 1) {
        ref.current.goTo(0);
        return 0;
      } else {
        ref.current.goTo(prevIndex + 1);
        return prevIndex + 1;
      }
    });
  };

  const prevSlide = () => {
    setActiveSlideIndex((prevIndex) => {
      if (prevIndex === 0) {
        ref.current.goTo(slides.length - 1);
        return slides.length - 1;
      } else {
        ref.current.goTo(prevIndex - 1);
        return prevIndex - 1;
      }
    });
  };

  const navigation = useNavigation();
  //const Concept = Json.concept.find((item) => item.id === 1);
  const Concept = Json.concept[0];

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [swiperKey, setSwiperKey] = useState(Math.random());
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.slideContainer}>
        <Swiper
          key={swiperKey}
          ref={ref}
          index={activeSlideIndex}
          onChangeIndex={({ index }) => {
            setActiveSlideIndex(index);
            //setSwiperKey(Math.random());
          }}
          controlsProps={{
            prevTitle: (
              <MaterialCommunityIcons
                style={styles.leftCircle}
                name="chevron-left-circle"
                color="#59b09c"
                size={26}
              />
            ),
            nextTitle: (
              <MaterialCommunityIcons
                style={styles.rightCircle}
                name="chevron-right-circle"
                color="#59b09c"
                size={26}
              />
            ),
            dotsTouchable: true,
            dotsWrapperStyle: {
              display: "none",
              marginBottom: "10px",
            },
          }}
        >
          {slides.map((id) => (
            <ConceptSlide
              key={id}
              id={id}
              concept={conc}
              conceptButtons={conceptButtons}
              nextSlide={nextSlide}
              prevSlide={prevSlide}
            />
          ))}
        </Swiper>
      </SafeAreaView>
    </View>
  );
};

export default ConceptScreen;
