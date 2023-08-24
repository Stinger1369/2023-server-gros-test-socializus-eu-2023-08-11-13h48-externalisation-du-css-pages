//🇫🇷 Affichage du bouton copie de l'activité (Frame 41 sur Figma)
//🇬🇧 Display of the button copy activity (Frame 41 of Figma)

import { TouchableOpacity, Text, View } from "react-native";
import styles from "./Styles/EventButtonCss";
export default function EventButton({
  onPress,
  type,
  bgColor,
  colorText,
  title,
}) {
  return (
    <TouchableOpacity
      style={[styles.btn, { backgroundColor: bgColor }]}
      onPress={onPress}
    >
      <Text
        style={[
          type === "Buy ticket" || type === "Chat"
            ? styles.buyOrChatType
            : styles.type,
          { color: colorText },
        ]}
      >
        {title}{" "}
        {/*🇫🇷 avant s'affichait le type de buton, maintent c'est le title, pour permetre la traduction et pas deranger le composant EventButton */}
        {/*🇬🇧 before the button type was displayed, now it's the title, to allow translation and not disturb the EventButton component*/}
      </Text>
      {type === "Buy ticket" ? (
        <View style={styles.emote}></View>
      ) : (
        type === "Chat" && <View style={styles.secondEmote}></View>
      )}
      {/*🇫🇷 Apres rechercher, button type buy ticket et chat sont inexistants*/}
      {/*🇬🇧 After searching, button type buy ticket and chat are non-existent*/}
    </TouchableOpacity>
  );
}
