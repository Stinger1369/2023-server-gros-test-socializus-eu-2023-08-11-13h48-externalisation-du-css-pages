//🇫🇷 Affichage des champs de texte multiline (Frame 17 - 34 sur Figma)
//🇬🇧 Display of multiline Input text fields (Frame 17 - 34 of Figma)

import { TextInput, View, Text } from "react-native";
import styles from "./Styles/MultilineFieldsCss";
export default function MultilineFields({ lines, title, setState, state }) {
  return (
    <View>
      <TextInput
        value={state}
        onChangeText={(text) => {
          setState(text);
        }}
        multiline={lines ? true : false}
        numberOfLines={lines ? lines : null}
        style={styles.multiline}
      />
      <View style={[styles.textContainer, { width: title.length * 9 }]}>
        <Text>{title}</Text>
      </View>
    </View>
  );
}
