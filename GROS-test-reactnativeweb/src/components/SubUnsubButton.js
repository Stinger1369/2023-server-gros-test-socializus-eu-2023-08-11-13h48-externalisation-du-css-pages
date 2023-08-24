//🇫🇷 Affichage du bouton participer (Frame 41 - 42 sur Figma)
//🇬🇧 Display of the button participate (Frame 41 - 42 of Figma)

import { useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "./Styles/SubUnsubButtonCss";

const SubButton = ({
  isParticipating,
  subscribe,
  setIsParticipating,
  cancelParticipationDialogVisible,
  setCancelParticipationDialogVisible,
  scr,
}) => {
  const onPressHandler = () => {
    if (isParticipating) {
      setCancelParticipationDialogVisible(!cancelParticipationDialogVisible);
    } else {
      subscribe();
    }
  };

  const { activity } = scr; //🇫🇷 Passsage de langue depuis app.js🇫🇷
  //🇬🇧 Language passed from app.js 🇬🇧

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
        {isParticipating ? activity.unsubscribe : activity.participate}
        {/*"Unsubscribe" : "Participate"*/}
      </Text>
    </TouchableOpacity>
  );
};

export default SubButton;
