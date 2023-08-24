//🇫🇷 Création d'activité - Etape 1(Frame 31) 
//🇬🇧 Event creation - Step 1(Frame 31)
import { createActivityStyle } from "./CreateActivityStyle";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Json from "../assets/json/en.json";
// import moment from "moment";
import { useNavigation } from "@react-navigation/native";

import InputField from "../../components/InputField";
import LogButton from "../../components/LogButtons";
import { CalendarField } from "../../components/CalendarField";
import { OptionButton } from "../../components/SelectionElements";
import AddressMap from "../../components/AddressMap";

const CreateActivityScreen_Step1_Standard = () => {
  return (
    <ScrollView
        style={createActivityStyle.container}
        keyboardShouldPersistTaps="handled"
        listViewDisplayed={false}
      >
        {/* ----------------Titles---------------- */}
        <Text
          style={[
            createActivityStyle.boldTitle,
            { width: "100%", textAlign: "center", marginVertical: 10 },
          ]}
        >{/*🇫🇷 Récupération des variables du JSON des langues  
            🇬🇧 Importing variables from JSON language file*/}
          {createActivity.step1.information}
        </Text>
        {/* "information": "Main information :" */}

        <View style={createActivityStyle.fields}>
          <InputField
            title={createActivity.step1.activity}
            state={title}
            setState={setTitle}
            specialHeight={60}
          />
          {/* "activity": "Activity Title" */}
        </View>

        <View style={createActivityStyle.localizationRow}>
          <OptionButton
            title={createActivity.step1.address}
            buttonSelected={buttonSelected}
            setButtonSelected={setButtonSelected}
          />
          <OptionButton
            title={createActivity.step1.online}
            buttonSelected={buttonSelected}
            setButtonSelected={setButtonSelected}
          />
          <OptionButton
            title={createActivity.step1.mapUrl}
            buttonSelected={buttonSelected}
            setButtonSelected={setButtonSelected}
          />
        </View>

        <AddressMap
          upperTitle={buttonSelected}
          address={address}
          setAddress={setAddress}
          location={location}
          setLocation={setLocation}
        />

        <CalendarField
          title={createActivity.step1.date}
          state={dateTime}
          setState={setDateTime}
          date={date}
          setDate={setDate}
          time={startTime}
          setTime={setStartTime}
        />

        {/* ------------Save or Continue------------ */}
        <Text
          style={createActivityStyle.important}
        >
          {errorMessage}
        </Text>

        <View style={{ margin: 15, alignSelf: "center" }}>
          <LogButton
            text={editProfile.step2.continue}
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

export default CreateActivityScreen_Step1_Standard;