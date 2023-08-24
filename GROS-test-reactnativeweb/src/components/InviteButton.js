/* 🇫🇷 Affichage de bouton d'invitation (Frame 41 - 62) 🇫🇷 
/* 🇬🇧 Display invite button (Frame 41 - 62) 🇬🇧 */

import { TouchableOpacity, Text, View, Image } from "react-native";
import styles from "./Styles/InviteButtonCss";
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

      <Image source={Share} style={{ width: 26 }} />

      {type === "Buy ticket" ? (
        <View style={styles.emote}></View>
      ) : (
        type === "Chat" && <View style={styles.secondEmote}></View>
      )}
    </TouchableOpacity>
  );
}
