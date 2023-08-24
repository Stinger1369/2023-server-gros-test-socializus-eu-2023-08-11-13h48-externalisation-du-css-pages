//🇫🇷 Affichage des box au niveau de la page des paramétres (Frame 16 sur Figma)
//🇬🇧 Display of the boxes in the settings page (Frame 16 of Figma)

import { TouchableOpacity, Text, View } from "react-native";
import styles from "./Styles/EditBigSquareCss";
import { useState } from "react";

export default function EditBigSquare({ children, title, text }) {
  const [active, setActive] = useState(true);

  return (
    <>
      {/*Ajout du props children pour integer le svg */}
      <TouchableOpacity
        style={[
          styles.container,
          { backgroundColor: active ? "#59C09B" : "#F7F7F7" },
        ]}
        onPress={() => {
          setActive(!active);
        }}
      >
        <View style={styles.image}>{children}</View>
        <Text style={[styles.title, { color: active ? "white" : "black" }]}>
          {title}
        </Text>
        <Text style={[styles.text, { color: active ? "white" : "black" }]}>
          {text}{" "}
        </Text>
      </TouchableOpacity>
    </>
  );
}
