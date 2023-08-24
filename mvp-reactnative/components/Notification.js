import { StyleSheet, Text, View } from "react-native";
import styles from "./Styles/NotificationCss"
import Cloche from '../assets/images/cloche.svg';
import TimeLeft from '../assets/images/time-left.svg';
const Notification = ({ text, date, hour }) => {
    return (
        <View style={[styles.notification, styles.blockInfos, styles.shadowProp]}>
            <View style={[StyleSheet.absoluteFill, { marginTop: 25 }]}>
                <Cloche width={70} height={40} />
            </View>
            <View style={styles.blockText}>
                <Text style={styles.notifText}>{text}</Text>
                <View style={styles.blockInfos}>
                    <TimeLeft width={10} height={17} style={{ marginRight: 8 }} />
                    <Text style={styles.informations}>{date} {hour}</Text>
                </View>
            </View>
        </View>
    );
};

export default Notification;



/* --------------------------------- */

// import { StyleSheet, Text, Alert } from "react-native";

// const BurgerMenu = () => {
//     const menuBtn = () => {
//         return <Text style={styles.menuBtn}
//             onPress={() => Alert.alert('Simple Button pressed')}
//         >Menu</Text>;
//     };

//     return (
//         { menuBtn }
//     );
// };

// export default BurgerMenu;

// const styles = StyleSheet.create({
//     menuBtn: {
//         backgroundColor: "red"
//     }
// });
