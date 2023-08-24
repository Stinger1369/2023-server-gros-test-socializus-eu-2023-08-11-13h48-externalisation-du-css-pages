import { useNavigation } from "@react-navigation/native";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Edit from "../assets/images/settings_blanc.svg";

const HeaderRightProfile = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {navigation.navigate("Edit Profile")}}>
        <View>
            <Edit width="25" height="25"/>
        </View>
    </TouchableOpacity>    
  );
};

export default HeaderRightProfile;

const styles = StyleSheet.create({

})



