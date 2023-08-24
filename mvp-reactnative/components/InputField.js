import { View, TextInput, StyleSheet, Text } from "react-native";
import styles from "./Styles/InputFieldCss"

const InputField = ({ title, specialHeight, state, setState}) => {

  return (
    <View style={[styles.container, {height: specialHeight || 45 }]}>
      <Text
        style={styles.title}
      >
        {title}
      </Text>
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
