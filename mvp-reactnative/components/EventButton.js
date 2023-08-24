import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import styles from "./Styles/EventButtonCss"

export default function EventButton({ type, bgColor, colorText }) {
  return (
    <TouchableOpacity style={[styles.btn, { backgroundColor: bgColor }]}>
      <Text
        style={[
          type === "Buy ticket" || type === "Chat"
            ? styles.buyOrChatType
            : styles.type,
          { color: colorText },
        ]}
      >
        {type}
      </Text>
      {type === "Buy ticket" ? (
        <View style={styles.emote}></View>
      ) : (
        type === "Chat" && <View style={styles.secondEmote}></View>
      )}
    </TouchableOpacity>
  );
}


