//🇫🇷 Recherche de l'image de l'activité (Frame 34C sur Figma)
//🇬🇧 Search for Activity image (Frame 34C of Figma)

import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./Styles/CustomDateTimePickerCss";
import ScheduleIcon from "../assets/images/schedule.svg";

export default function CustomDateTimePicker({
  value,
  setDate,
  setStartTime,
  title,
}) {
  const dateChange = (v) => {
    if (v && v.target && v.target.value) {
      const dateParts = v.target.value.split("-");
      const dateGoodFormat =
        dateParts[2] + "/" + dateParts[1] + "/" + dateParts[0];
      setDate(dateGoodFormat);
      console.log(dateGoodFormat);
    }
  };
  const timeChange = (v) => {
    setStartTime(v.target.value);
  };
  return (
    <View style={styles.container}>
      <View style={styles.row2}>
        <Text style={styles.boldTitle}>{title}</Text>
        <Image source={ScheduleIcon} style={styles.icon} />
      </View>
      <View style={styles.row}>
        <View>
          {React.createElement("input", {
            type: "date",
            value: value,
            onInput: dateChange,
          })}
        </View>
        <View>
          {React.createElement("input", {
            type: "time",
            value: value,
            onInput: timeChange,
          })}
        </View>
      </View>
    </View>
  );
}
