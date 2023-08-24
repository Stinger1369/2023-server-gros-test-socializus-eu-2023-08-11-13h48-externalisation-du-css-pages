// FR page de connexion et de création de compte (Frame 3-4 sur Figma) (FR) //
// EN login and sign up page (Frame 3-4 sur Figma) (EN) //

import { TouchableOpacity, Text } from "react-native";
import styles from "./Styles/LogButtonsCss";
import { useState, useEffect } from "react";

export default function LogButton({
  text,
  width,
  navigate,
  func,
  path,
  setPressed,
  arg,
  disabled,
  backgroundColor,
  dataSave,
  token,
}) {
  //console.log(path);
  return (
    <TouchableOpacity
      onPress={() => {
        if (!disabled) {
          if (setPressed) {
            setPressed(true);
          }
          if (func) {
            func(arg);
          }
          if (path && !token) {
            navigate(path);
          }
          if (path && token) {
            navigate(path, { token: token });
          }
          if (dataSave) {
            dataSave(); //(fr) Fonction permettant de mettre à jour les données des différents étapes de la création du profil
          }
        }
      }}
      style={[
        styles.btn,
        { width: width, backgroundColor: disabled ? "grey" : backgroundColor },
      ]}
      disabled={disabled}
    >
      <Text style={styles.btnText}>{text}</Text>
    </TouchableOpacity>
  );
}
