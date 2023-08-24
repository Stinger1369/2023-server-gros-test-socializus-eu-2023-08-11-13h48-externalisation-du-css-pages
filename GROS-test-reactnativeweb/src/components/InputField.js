//🇫🇷 component Input Field (Frame 15 - 16 sur Figma)
//🇬🇧 Input field component (Frame 15 - 16 of Figma)

import { View, TextInput, Text } from "react-native";
import styles from "./Styles/InputFieldCss";
const InputField = ({ title, specialHeight, state, setState }) => {
  return (
    <View style={[styles.container, { height: specialHeight || 45 }]}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.btnContainer}>
        <TextInput
          style={styles.input}
          value={state}
          onChangeText={(text) => setState(text)}
        />
      </View>
    </View>
  );
};
export default InputField;
