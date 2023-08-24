//🇫🇷 Affichage de la Burger Button
//🇬🇧 Display of the burger button

import { View, Text, TouchableOpacity } from "react-native";
import styles from "./Styles/BurgerButtonCss";
import { useNavigation, DrawerActions } from "@react-navigation/native";

const BurgerButton = ({ onPress }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={ styles.drawerBtn }
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
    >
      <View>
        <View style={styles.line} />
        <View style={styles.line} />
        <View style={styles.line} />
      </View>
      <View style={styles.menuBtn}>
        <Text style={styles.menuText}>Menu</Text>
      </View>
    </TouchableOpacity>
  );
};

export default BurgerButton;
