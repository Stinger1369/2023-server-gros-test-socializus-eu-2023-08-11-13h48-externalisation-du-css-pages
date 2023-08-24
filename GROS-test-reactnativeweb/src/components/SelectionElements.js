// 🇫🇷 Composants de bouton et checkbox pour sélectionner une option (Frame Figma 17) 🇫🇷
// 🇬🇧 Button and checkbox components to select an option (Frame Figma 17) 🇬🇧

import { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styles from "./Styles/SelectionElementsCss";
import { CheckBox } from "@rneui/themed";

const OptionButtonProfile = ({
  title,
  buttonSelected,
  setButtonSelected,
  index,
  setIndex,
  scr,
}) => {
  const { editProfile } = scr;

  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (index === 0) {
      setButtonSelected(editProfile.step3.secret);
      setSelected(true);
    }
    if (index === 1) {
      console.log("title pour button", title);
      if (editProfile.step3.yes === title) {
        setButtonSelected(editProfile.step3.yes);
        setSelected(true);
      }
      setButtonSelected(editProfile.step3.sometimes);
      setSelected(true);
    }
    if (index === 2) {
      setButtonSelected(editProfile.step3.no);
      setSelected(true);
    }
  }, []);

  useEffect(() => {
    if (buttonSelected === editProfile.step3.secret) {
      setIndex(0);
    }
    if (
      buttonSelected === editProfile.step3.yes ||
      buttonSelected === editProfile.step3.sometimes
    ) {
      setIndex(1);
    }

    if (buttonSelected === editProfile.step3.no) {
      setIndex(2);
    }
  }, [buttonSelected]);

  const handlePress = () => {
    setSelected(true);
    setButtonSelected(title);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[
        { flex: 1 },
        selected && buttonSelected === title
          ? styles.buttonSelected
          : styles.button,
      ]}
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

const OptionButton = ({
  title,
  buttonSelected,
  setButtonSelected,
  setOption,
  buttonselect,
  scr,
}) => {
  const { createActivity } = scr;

  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (
      buttonSelected === createActivity.step1.address &&
      buttonselect === true
    ) {
      setSelected(true);
      setOption(false);
    }
    if (
      buttonSelected === createActivity.step1.online &&
      buttonselect === true
    ) {
      setOption(true);
    }
  }, [buttonSelected]);

  const handlePress = () => {
    setSelected(true);
    setButtonSelected(title);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[
        { flex: 1 },
        selected && buttonSelected === title
          ? styles.buttonSelected
          : styles.button,
      ]}
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
    setChecked(!checked);
    setState(checked ? true : false);
  };

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

export { OptionButtonProfile };
export { OptionButton };
export { CheckboxSquare };
