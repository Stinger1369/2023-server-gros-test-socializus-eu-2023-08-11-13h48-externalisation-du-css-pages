import React from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import { hostname } from "../../../../mvp-reactnative/backendconnect/hostname";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../Styles/deleteAccountScreenCss";

const DeleteAccountScreen = () => {
  // Contenu de la page blockedUser

  const DeleteAccount = async () => {
    let resultat = JSON.parse(await AsyncStorage.getItem("id"));
    console.log(resultat?.role.name[0]);
    const FormRole = {
      role: resultat?.role.name[0],
    };
    const res = await axios.post(
      `${hostname}/api/v1/user/delete/${resultat._id}`,
      FormRole
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
        //onPress={()=>DeleteAccount()}
        >
          <Text>Delete Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DeleteAccountScreen;
