import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import styles from "./Styles/SwitchBtnCss"

const SwitchBtn = ({ state, setState }) => {
    return <TouchableOpacity 
        style={[styles.container, { backgroundColor: state ? "#4caf50" : "#E64C3C" }]} 
        onPress={() => { setState(!state) }}>
        <View style={[styles.circle, { marginLeft: state ? 23 : 2 }]} />
        <Text style={[styles.switchInfo, state ? { right: 22 } : { left: 20 }]}>{ state ? "ON" : "OFF" }</Text>
    </TouchableOpacity>;
};

export default SwitchBtn;

