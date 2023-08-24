import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import styles from "./Styles/BurgerButtonCss"

const BurgerButton = ({ onPress }) => {
    return (
        <TouchableOpacity style={ styles.burgerButton } onPress={onPress}>
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


