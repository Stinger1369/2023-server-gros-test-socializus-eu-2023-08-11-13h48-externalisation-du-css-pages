// FR page de connexion et de création de compte (FR) //
// EN login and sign up page (EN) //


import { StyleSheet, TouchableOpacity, Text } from "react-native";
import styles from "./Styles/LogButtonsCss"
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
  token
}) {
//console.log(path);
  return (
    <TouchableOpacity
      onPress={() => {
        if (setPressed) {
          setPressed(true);
        }
        if (func) {
          func(arg);
        }
        if (path && !token) {
          navigate(path);
        }
        if(path && token){
          navigate(path, {token : token});
        }
        if(dataSave){
          dataSave();//(fr) Fonction permettant de mettre à jour les données des différents étapes de la création du profil
        }
      }}
      style={[styles.btn, { width: width, backgroundColor: backgroundColor }]}
      disabled={disabled}
    >
      <Text style={styles.btnText}>{text}</Text>
    </TouchableOpacity>
  );
}


