//🇫🇷 Affichage de la partie date et heure au niveau de la page de création d'activité (Frame 31b-31c sur Figma)
//🇬🇧 Display of the date and time picker (Frame 31b-31c of Figma)

import React, { useState, useCallback, useEffect } from "react";
import { Text, View, TouchableOpacity, TextInput, Image } from "react-native";
import styles from "./Styles/DateTimePickerCss";
import moment from "moment";
import ScheduleIcon from "../assets/images/schedule.svg";
import { Icon } from "@rneui/themed";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { DatePickerModal, TimePickerModal } from "react-native-paper-dates";
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

const DateTimePicker = ({
  title,
  date,
  setDate,
  time,
  setTime,
  event,
  scr,
}) => {
  console.log("DateTimePicker scr:", scr);
  const resetDate = null;
  const resetTime = null;
  var todayDate = new Date(Date.now());
  var startingDate = new Date(todayDate);
  console.log(date);
  let dater;
  let parts;
  let reversedDate;
  useEffect(() => {
    if (date) {
      dater = date;
      parts = dater.split("/"); // Sépare la chaîne en un tableau ["10", "06", "2023"]
      reversedDate = parts[1] + "/" + parts[0] + "/" + parts[2]; // Inverse les éléments du tableau
      setFormattedEventDate(reversedDate);
    }
  }, []);
  var dateEvent = new Date(reversedDate);
  console.log(dateEvent);
  var day = startingDate.getDate();
  var month = startingDate.getMonth() + 1; // Les mois sont indexés à partir de zéro
  var year = startingDate.getFullYear();
  const [formattedDate, setFormattedDate] = useState("");
  const [formattedEventDate, setFormattedEventDate] = useState("");

  useEffect(() => {
    if (formattedDate === "" && formattedEventDate === "") {
      if (day < 10) {
        day = "0" + day;
      }
      if (month < 10) {
        month = "0" + month;
      }
      setFormattedDate(month + "/" + day + "/" + year);
    }
  });
  //console.log(days);
  console.log(formattedDate);
  console.log(formattedEventDate);

  if (formattedDate === formattedEventDate) {
    startingDate.setDate(startingDate.getDate());
  } else {
    startingDate.setDate(startingDate.getDate() + 1);
  }

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showDatePicker = () => {
    if (date !== null || time !== null) {
      setDate(resetDate);
      setTime(resetTime);
    }
    setDatePickerVisibility(!isDatePickerVisible);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(!isDatePickerVisible);
  };

  const showTimePicker = () => {
    setTimePickerVisibility(!isTimePickerVisible);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(!isTimePickerVisible);
  };

  const handleDateConfirm = ({ date }) => {
    let chosenDate = moment(date).format("DD/MM/YYYY");
    setDate(chosenDate);
    hideDatePicker();
    showTimePicker();
  };

  const handleTimeConfirm = ({ hours, minutes }) => {
    let chosenTime;
    if (minutes <= 0 || minutes < 10) {
      chosenTime = hours.toString() + ":0" + minutes.toString();
    } else {
      chosenTime = hours.toString() + ":" + minutes.toString();
    }
    setTime(chosenTime);
    hideTimePicker();
  };

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          showDatePicker(true);
        }}
      >
        <View style={styles.row}>
          <Text style={styles.boldTitle}>{title}</Text>
          <View style={{ flexDirection: "row" }}>
            <Image source={ScheduleIcon} style={styles.icon} />
            {/*FR champs remplir pour date et l'heure */}
            {/*GB fill fields for date and time */}
          </View>
          {date === null && time === null ? (
            <Text style={styles.placeholder}>__ / __ /____ à __ : __</Text>
          ) : (
            <Text style={styles.dateTime}>
              {date} à {time}
            </Text>
          )}
        </View>
      </TouchableOpacity>

      <PaperProvider theme={theme}>
        <DatePickerModal
          locale="en"
          mode="single"
          visible={isDatePickerVisible}
          onDismiss={hideDatePicker}
          date={date}
          onConfirm={handleDateConfirm}
          onChange={handleDateConfirm}
          closeIcon={
            <Icon name="close" type="font-awesome" color="#ccc" size={28} />
          }
          validRange={{ startDate: startingDate }}
          startYear={todayDate.getFullYear}
          saveLabel={
            <Icon name="check" type="font-awesome" color="#58c09b" size={28} />
          }
          label="Select Date"
        />
        <TimePickerModal
          visible={isTimePickerVisible}
          onDismiss={hideTimePicker}
          hours={18}
          minutes={30}
          format="HH:mm"
          onConfirm={handleTimeConfirm}
          closeIcon={
            <Icon name="close" type="font-awesome" color="#ccc" size={28} />
          }
        />
      </PaperProvider>
    </>
  );
};

export default DateTimePicker;
