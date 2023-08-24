//🇫🇷 Page de filtres de recherche d'activités (Frame Figma 60)
//🇬🇧 Filter Page and Filter View Page (Figma Frame 60)

import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState } from "react";

// Components
import { OneValueSlider, TwoValuesSlider } from "../components/Sliders";
import { DateField } from "../components/CalendarField";
import { CheckboxSquare } from "../components/SelectionElements";
import Fields from "../components/Fields";

import moment from "moment";
import { SelectList } from "react-native-dropdown-select-list";
import Json from "../assets/json/en.json";
import activities from "../assets/json/activityList.json";

import styles from "./Styles/FilterScreenCss";

// import CreateProfileScreenStepThree from "./CreateProfileScreenStepThree";

const FilterScreen = () => {
  {
    /*const { createActivity } = Json;*/
  }
  //Variables en.json permettant de rendre dynamique le texte front-end
  const { filter } = Json;
  const { createProfile } = Json;
  // const {activities} = Json;

  const [state, setState] = useState(false);
  const [ages, setAges] = useState([20, 40]); //🇫🇷 Valeurs par défaut pour le slider d'âge
  const [date, setDate] = useState(moment(date).format("L")); //🇫🇷 Valeur par défaut pour le calendrier
  const [nbKms, setNbKms] = useState(0);
  const [selected, setSelected] = useState();
  const data = [
    { key: "0", value: "Ready for everything" },
    { key: "1", value: "Afterwork" }, //🇫🇷 Données pouvant être remplacées par le JSON de langues (à voir au niveau "activities")
    { key: "2", value: "Aperitif" },
    { key: "3", value: "Business" },
    { key: "4", value: "Culture" },
    { key: "5", value: "Dancing" },
    { key: "6", value: "Games" },
    { key: "7", value: "Linguistic" },
    { key: "8", value: "Meal" },
    { key: "9", value: "Movie" },
    { key: "10", value: "Music" },
    { key: "11", value: "Mutual help" },
    { key: "12", value: "Party" },
    { key: "13", value: "Picnic" },
    { key: "14", value: "Private Party" },
    { key: "15", value: "Sport" },
    { key: "16", value: "Travel" },
  ];
  // Données pouvant être remplacées par le JSON de langues (à voir au niveau "activities")
  // This "data" could be inserted in the JSON

  const [selected1, setSelected1] = useState(false);
  const [selected2, setSelected2] = useState(false);

  const handlePress = () => {
    //🇫🇷 Fonction permettant de changer l'état des boutons "Evénement passé" et "Evénement à venir"
    setSelected1(true);
    if (selected2 === true) {
      setSelected2(false);
    } else {
      setSelected1(true);
    }
  };

  const handlePress2 = () => {
    console.log(selected1);
    if (selected1 === true) {
      setSelected1(false);
      setSelected2(true);
    } else {
      setSelected2(true);
    }
  };

  return (
    <ScrollView style={[styles.container]}>
      <DateField
        title={"Choose a Date"}
        state={date}
        setState={setDate}
        style={styles.fields}
      />
      <View style={styles.fields}>
        <Text style={styles.boldTitle}>{filter.radius}</Text>
        <OneValueSlider
          minVal={1}
          maxVal={100}
          state={nbKms}
          setState={setNbKms}
        />
      </View>
      <View style={styles.fields}>
        <Text style={styles.boldTitle}>
          {/*🇫🇷 La variable editProfile.step3.submit dans fr.json permet d'afficher "Choissisez un thème"*/}
          {/*🇬🇧 The en.json variable filter.select displays "Select Theme:"*/}
          {filter.select}
        </Text>
        <View style={styles.fields}>
          <SelectList
            setSelected={setSelected}
            data={data}
            style={styles.margin}
          />
        </View>
      </View>
      <View style={styles.fields}>
        {/*🇫🇷 La variable createProfile.city dans fr.json permet d'afficher "Ville"*/}
        {/*🇬🇧 The en.json variable createProfile.city displays "City"*/}
        <Fields text={createProfile.city} style={styles.fields} />
      </View>
      <View style={styles.fields}>
        <Text style={styles.boldTitle}>
          {/*🇫🇷 La variable filter.specifications dans fr.json permet d'afficher "Activité avec spécification"*/}
          {/*🇬🇧 The en.json filter.specifications displays "Activities with specifications:"*/}
          {filter.specifications}
        </Text>
        <View style={styles.row}>
          <CheckboxSquare
            title={"Girls only"}
            state={state}
            setState={setState}
          />
          <CheckboxSquare
            title={"Guys only"}
            state={state}
            setState={setState}
          />
          <CheckboxSquare
            title={"50% Guys 50% Girls"}
            state={state}
            setState={setState}
          />
          <CheckboxSquare
            title={"With people I already met"}
            state={state}
            setState={setState}
          />
        </View>
      </View>
      <View style={styles.fields}>
        <Text style={styles.boldTitle}>
          {/*🇫🇷 La variable filter.age dans fr.json permet d'afficher "Age:"*/}
          {/*🇬🇧 The en.json filter.age displays "Age:"*/}
          {filter.age}
        </Text>
        <TwoValuesSlider
          minVal={18}
          maxVal={99}
          state={ages}
          setState={setAges}
        />
      </View>
      <View style={styles.dButton}>
        <TouchableOpacity
          onPress={handlePress}
          style={
            selected1 === true ? styles.leftButtonSelected : styles.leftButton
          }
        >
          <Text
            style={
              selected1 === true ? styles.boldTextSelected : styles.boldText
            }
          >
            {/*🇫🇷 La variable filter.past dans fr.json permet d'afficher "Evénement passé"*/}
            {/*🇬🇧 The en.json filter.past displays "Past events"*/}
            {filter.past}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handlePress2}
          style={
            selected2 === true ? styles.rightButtonSelected : styles.rightButton
          }
        >
          <Text
            style={
              selected2 === true ? styles.boldTextSelected : styles.boldText
            }
          >
            {filter.next}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={
          selected1 === true || selected2 === true
            ? styles.buttonActive
            : styles.button
        }
      >
        <Text style={styles.buttonText}>
          {/*🇫🇷 La variable filter.apply dans fr.json permet d'afficher "Appliquer les filtres"*/}
          {/*🇬🇧 The en.json filter.apply displays "Apply filter"*/}
          {filter.apply}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default FilterScreen;
