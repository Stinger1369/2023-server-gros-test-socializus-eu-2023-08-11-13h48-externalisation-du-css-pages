// FR page login small button FR //
// GB page login small button GB //


import { StyleSheet, TouchableOpacity, Text } from "react-native";
import styles from "./Styles/LogSmallButtonCss"

export default function LogSmallButton({ width, text, navigate, path }) {
  return (
    <TouchableOpacity
      onPress={() => {
        if (path) {
          navigate(path);
        }
      }}
      style={[styles.btn, { width: width }]}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

