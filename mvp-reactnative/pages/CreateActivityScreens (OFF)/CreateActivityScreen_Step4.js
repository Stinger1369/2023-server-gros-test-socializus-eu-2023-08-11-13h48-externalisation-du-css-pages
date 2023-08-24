// FR - Type d'activité (Frame 33) - FR
// ENG - Activity type (Frame 33) - ENG

import { createActivityStyle } from "./CreateActivityStyle";
import {
  Text,
  View,
  ScrollView,
} from "react-native";

import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Json from "../../assets/json/en.json";
// import moment from "moment";
import { useNavigation } from "@react-navigation/native";

import LogButton from "../../components/LogButtons";
import { ActivityTypesGrid_OneTopic } from "../../components/ActivityTypesGrids";

const CreateActivityScreen_Step4 = () => {
  return (
    <ScrollView>
        {/* ----------------Titles---------------- */}
        <Text style={[createActivityStyle.boldTitle, { padding: 20, textAlign: "center" }]}>
          {createActivity.step2.choose}
        </Text>
        {/* "choose": "Choose a Topics :" */}
        
        <ActivityTypesGrid_OneTopic
          topic={topic}
          setTopic={setTopic}
          selectionMode={"one"}
        />

        {/* ------------Save or Continue------------ */}
        <Text
          style={createActivityStyle.important}
        >
          {errorMessage}
        </Text>

        <View style={[createActivityStyle.savOrConButtons, { paddingHorizontal: 15 }]}>
          <LogButton
            text={createActivity.step3.goBack} // Previous
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

export default CreateActivityScreen_Step4;
