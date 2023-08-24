//🇫🇷 Affichage de la date (Frame 31b sur Figma)
//🇬🇧 Display the date (Frame 31b of Figma)

import React, { useState, useCallback, useEffect } from "react";
import { Text, View, TouchableOpacity, TextInput, Image } from "react-native";
import styles from "./Styles/DatePickerCss";
import moment from "moment";
import ScheduleIcon from "../assets/images/schedule.svg";
import { Icon } from "@rneui/themed";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import Json from "../assets/json/en.json";
const { createActivity } = Json;

const theme = {
  ...DefaultTheme,
  colors: {
    primary: "#59c09b",
    primaryContainer: "black",
    secondary: "#008078",
    secondaryContainer: "white",
    tertiary: "black",
    tertiaryContainer: "white",
    surface: "white",
    surfaceVariant: "#dcf1ea",
    surfaceDisabled: "#ccc",
    background: "skyblue",
    error: "crimson",
    errorContainer: "crimson",
    onPrimary: "white",
    onPrimaryContainer: "black",
    onSecondary: "#008078",
    onSecondaryContainer: "white",
    onTertiary: "white",
    onTertiaryContainer: "white",
    onSurface: "black",
    onSurfaceVariant: "black",
    onSurfaceDisabled: "#ccc",
    onError: "crimson",
    onErrorContainer: "crimson",
    onBackground: "white",
    outline: "aqua",
    outlineVariant: "#008078",
    inverseSurface: "white",
    inverseOnSurface: "black",
    inversePrimary: "#59c09b",
    shadow: "#008078",
    scrim: "white",
    backdrop: "rgba(0,0,0,0.3)",
  },
};

const DatePicker = ({ date, setDate }) => {
  const resetDate = null;
  var todayDate = new Date(Date.now());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    if (date !== null) {
      setDate(resetDate);
    }
    setDatePickerVisibility(!isDatePickerVisible);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(!isDatePickerVisible);
  };
  const handleDateConfirm = ({ date }) => {
    if (!date) {
      showDatePicker(false);
    }
    let chosenDate = moment(date).format("DD/MM/YYYY");
    setDate(chosenDate);
    hideDatePicker();
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          showDatePicker(true);
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Image
            source={ScheduleIcon}
            style={ styles.scheduleIconStyle }
          />
          {/*FR champs remplir pour date et l'heure */}
          {/*GB fill fields for date and time */}
        </View>
      </TouchableOpacity>

      <PaperProvider theme={theme}>
        <DatePickerModal
          locale="en"
          mode="single"
          visible={isDatePickerVisible}
          onDismiss={hideDatePicker}
          onChange={handleDateConfirm}
          onConfirm={handleDateConfirm}
          closeLabel={
            <Icon name="close" type="font-awesome" color="#58c09b" size={28} />
          }
          startYear={todayDate.getFullYear}
          saveLabel={
            <Icon name="check" type="font-awesome" color="#58c09b" size={28} />
          }
          label="Select Date"
        />
      </PaperProvider>
    </>
  );
};

export default DatePicker;
