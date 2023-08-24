// 🇫🇷 Composants de bouton et checkbox pour sélectionner une option et  🇫🇷
// 🇬🇧 Button and checkbox components to select an option 🇬🇧

import { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import styles from "./Styles/SelectionElementsCss"
import { CheckBox } from "@rneui/themed";

const OptionButton = ({ title, buttonSelected, setButtonSelected }) => {
  const [selected, setSelected] = useState(false);

  const handlePress = () => {
    setSelected(true);
    setButtonSelected(title);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={
        selected && buttonSelected === title
          ? styles.buttonSelected
          : styles.button
      }
    >
      <Text
        style={
          selected && buttonSelected === title
            ? styles.textButtonSelected
            : styles.textButton
        }
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const CheckboxSquare = ({ title, state, setState }) => {
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
  setChecked(!checked)
  setState(checked ? true : false);
  }

  return (
    <View style={styles.checkBoxInput}>
      <CheckBox
        title={title}
        checked={checked}
        onPress={handleChange}
        containerStyle={{ padding: 5 }}
        checkedColor={"#59c09b"}
        uncheckedColor={"#59c09b"}
      />
    </View>
  );
};

export { OptionButton };
export { CheckboxSquare };


