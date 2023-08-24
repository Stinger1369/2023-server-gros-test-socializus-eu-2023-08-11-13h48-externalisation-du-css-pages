import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import styles from "./Styles/DateTimePickerCss"
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

const DateTimePicker = ({ title, date, setDate, time, setTime }) => {
  const resetDate = null;
  const resetTime = null;
  const todayDate = new Date(Date.now());
    const startingDate = new Date(todayDate);
  startingDate.setDate(startingDate.getDate() +1);

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
    if(minutes <= 0 || minutes < 10) {
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
            <img
              src={ScheduleIcon}
              style={styles.icon}
              width={24}
              height={24}
            />
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


