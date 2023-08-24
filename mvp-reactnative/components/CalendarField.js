import { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";
import styles from "./Styles/CalendarFieldCss"
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import ScheduleIcon from "../assets/images/schedule.svg";

const CalendarField = ({
  title,
  state,
  setState,
  date,
  setDate,
  time,
  setTime,
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
const dateWith24HoursMore = new Date();
dateWith24HoursMore.setHours(dateWith24HoursMore.getHours() + 24);
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
//FR Méthode permettant d'afficher le date et l'heure
  const handleConfirm = (dateTime) => {
    hideDatePicker();
    const chosenDate = moment(dateTime).format("DD/MM/YYYY à HH:mm");
    setState(chosenDate);
    const date = chosenDate.substring(0, 10)
    const hours = chosenDate.split(" ")[2]
    // const dateParts = date.split("/");
    // const dateAsNumber = dateParts[2] + "/" + dateParts[1] + "/" + dateParts[0];
    // const dateAsDate = new Date(dateAsNumber);
    // const millisecondsDate = Date.parse(dateAsDate);
    // const hoursParts = hours.split(":");
    // const hour = hoursParts[0];
    // const minutes =hoursParts[1];
    // const millisecondsHour  = hour * 60 * 60 * 1000;
    // const millisecondsMinutes  = minutes * 60 * 1000;
    // const milliseconds = millisecondsHour + millisecondsMinutes
    // const finalDateString = millisecondsDate + milliseconds
    // const finalDate = parseInt(finalDateString);
    // console.log(typeof(finalDate));
    //setDate(finalDate);
    setDate(date)
    setTime(hours);
  };

  return (
    <>
      {/*FR icône du calendrier */}
      {/*GB calendar icon  */}
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          showDatePicker(true);
        }}>
        <View style={styles.row}>
          <Text style={styles.boldTitle}>Date and Time</Text>
          <ScheduleIcon style={styles.icon} width={24} height={24} />
          {/*FR champs remplir pour date et l'heure */}
          {/*GB fill fields for date and time */}
          <TextInput
            style={styles.textInput}
            placeholder="__/__/____"
            value={String(state)}
            onChangeText={handleConfirm}
            editable={false}
          />
        </View>
      </TouchableOpacity>

      <View>
        {/*FR le modal pour la date et l'heure */}
        {/*GB the modal for the date and time  */}
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          display="default"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          minimumDate={dateWith24HoursMore}
        />
      </View>
    </>
  );
};

const DateField = ({ title, state, setState }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    const chosenDate = moment(date).format("DD/MM/YYYY");
    setState(chosenDate);
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
          <ScheduleIcon style={styles.icon} width={24} height={24} />
          <TextInput
            style={styles.textInput}
            placeholder="__/__/____"
            value={String(state)}
            onChangeText={handleConfirm}
            editable={false}
          />
        </View>
      </TouchableOpacity>

      <View>
        <DateTimePickerModal
          // style={{ width: "100%" }}
          isVisible={isDatePickerVisible}
          mode="date"
          display="default"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
    </>
  );
};

const CalendarDateField = ({ title, state, setState }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    const chosenDate = moment(date).format("Do MMMM YYYY");
    setState(chosenDate);
  };

  return (
    <>
      <TouchableOpacity
        style={ styles.datePicker }
        onPress={() => {
          showDatePicker(true);
        }}
      >
        <View style={ styles.titleView }>
          <Text style={styles.boldTitle}>{title}</Text>
          <ScheduleIcon
            style={ styles.scheduleIconStyle }
            width={24}
            height={24}
          />
          <TextInput
            style={ styles.textInputStyle }
            value={String(state)}
            onChangeText={handleConfirm}
            editable={false}
          />
        </View>
      </TouchableOpacity>

      <View>
        <DateTimePickerModal
          // style={{ width: "100%" }}
          isVisible={isDatePickerVisible}
          mode="date"
          display="default"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
    </>
  );
};

export { CalendarField };
export { DateField };
export { CalendarDateField };

