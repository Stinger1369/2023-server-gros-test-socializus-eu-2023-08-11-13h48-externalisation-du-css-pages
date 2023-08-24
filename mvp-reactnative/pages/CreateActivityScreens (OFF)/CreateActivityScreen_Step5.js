// FR - Détails de l'activité, parité,... (Frame 35) - FR
// ENG - Activity details, parity,... (Frame 35) - ENG

import { createActivityStyle } from "./CreateActivityStyle";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Json from "../assets/json/en.json";
// import moment from "moment";
import { useNavigation } from "@react-navigation/native";

import LogButton from "../components/LogButtons";

const CreateActivityScreen_Step5 = () => {
  return (
    <ScrollView style={createActivityStyle.container}>
        {/* ----------------Titles---------------- */}
        <Text style={[createActivityStyle.boldTitle, { marginVertical: 10 }]}>
          {createActivity.step3.please}
        </Text>
        {/* "please": "Please explain your activity a bit more:" */}

        <ActivityPhoto
          topic={topic}
          activityImage={activityImage}
          setActivityImage={setActivityImage}
        />

        <View style={[createActivityStyle.fields, { marginVertical: 30 }]}>
          <MultilineFields
            title={createActivity.step3.description}
            state={description}
            setState={setDescription}
            lines={15}
          />
        </View>
        <View style={createActivityStyle.fields}>
          <MultilineFields
            title={createActivity.step3.how} // How to find me
            state={howToFind}
            setState={setHowToFind}
            lines={10}
          />
        </View>

        {/* ------------Save or Continue------------ */}

        <Text
          style={createActivityStyle.important}
        >
          {errorMessage}
        </Text>

        <View style={createActivityStyle.savOrConButtons}>
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
  )
}

export default CreateActivityScreen_Step5;