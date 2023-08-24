import { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import styles from "./Styles/TimePickerComponentCss"
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import ClockIcon from "../assets/images/clock.svg";

const TimePickerComponent = ({ title, state, setState }) => {
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleDuration = (duration) => {
    hideTimePicker();
    const chosenDuration = moment(duration, "HH:mm");
    console.log("Chosen duration: " + chosenDuration);
    setState(chosenDuration);
  };

  const handleConfirm = (time) => {
    hideTimePicker();
    const chosenTime = moment(time).format("L LT");
    console.log("Chosen time: " + chosenTime);
    setState(chosenTime);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <View>
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => {
            showTimePicker(true);
          }}
        >
          <ClockIcon style={styles.icon} width={27} height={27} />
          <Text style={styles.result}>{moment(state).format("HH:mm")}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          display="default"
          positiveButtonLabel="OK"
          onConfirm={handleConfirm}
          onCancel={hideTimePicker}
        />
      </View>
    </View>
  );
};

const DurationComponent = ({ title, state, setState }) => {
  console.log(moment.duration(state).minutes());
  const [isDurationPickerVisible, setDurationPickerVisibility] = useState(false);

  const showDurationPicker = () => {
    setDurationPickerVisibility(true);
  };

  const hideDurationPicker = () => {
    setDurationPickerVisibility(false);
  };

  const handleDuration = (duration) => {
    hideDurationPicker();
    const chosenDuration = moment(state).format("HH:mm");
    console.log("Chosen duration: " + chosenDuration);
    setState(chosenDuration);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <View>
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => {
            showDurationPicker(true);
          }}
        >
          <ClockIcon style={styles.icon} width={27} height={27} />
          <Text style={styles.result}>{moment(state).format("HH:mm")}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDurationPickerVisible}
          mode="time"
          display="spinner"
          positiveButtonLabel="OK"
          onConfirm={handleDuration}
          onCancel={hideDurationPicker}
        />
      </View>
    </View>
  );
};


export default TimePickerComponent;
export { DurationComponent };
