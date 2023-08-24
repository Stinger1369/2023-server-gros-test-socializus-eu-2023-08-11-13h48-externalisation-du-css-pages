import { StyleSheet, Text, TouchableOpacity } from "react-native";
import styles from "./Styles/SubUnsubButtonCss"

const SubButton = ({
  isParticipating,
  setIsParticipating,
  cancelParticipationDialogVisible,
  setCancelParticipationDialogVisible,
}) => {
  const onPressHandler = () => {
    if (isParticipating) {
      setCancelParticipationDialogVisible(!cancelParticipationDialogVisible);
    } else {
    setIsParticipating(!isParticipating);
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: isParticipating ? "red" : "#59c09b" },
      ]}
      onPress={onPressHandler}
      activeOpacity={0.4}
    >
      <Text style={styles.text}>
        {isParticipating ? "Unsubscribe" : "Participate"}
      </Text>
    </TouchableOpacity>
  );
};

export default SubButton;