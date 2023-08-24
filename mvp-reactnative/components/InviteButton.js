import { TouchableOpacity, Text, StyleSheet, View, Image } from "react-native";
import styles from "./Styles/InviteButtonCss"
import Share from "../assets/images/share.svg";

export default function InviteButton({ type, bgColor, colorText }) {
  return (
    <TouchableOpacity style={[styles.btn, { backgroundColor: bgColor }]}>
      <Text
        style={[
          type === "Buy ticket" || type === "Chat"
            ? styles.buyOrChatType
            : styles.type,
          { color: colorText, marginRight: 5 },
        ]}
      >
        {type}
      </Text>

      <Share fill="white" width={26} />

      {type === "Buy ticket" ? (
        <View style={styles.emote}></View>
      ) : (
        type === "Chat" && <View style={styles.secondEmote}></View>
      )}
    </TouchableOpacity>
  );
}

