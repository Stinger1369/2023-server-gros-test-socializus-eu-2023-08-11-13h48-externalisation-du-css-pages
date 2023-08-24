import { StyleSheet, Text, View } from "react-native";
import styles from "./Styles/NotificationInteractCss"
import RightArrow from '../assets/images/right-arrow.svg';
import TimeLeft from '../assets/images/time-left.svg';

const NotificationInteract = ({ text, date, hour }) => {
    return (
        <View style={[styles.notification, styles.blockInfos, styles.shadowProp]}>
            <View style={styles.blockText}>
                <Text style={styles.notifText}>{text}</Text>
                <View style={styles.blockInfos}>
                    <TimeLeft height={17} style={{ marginRight: 8 }} />
                    <Text style={styles.informations}>{date} {hour}</Text>
                </View>
            </View>
            <View style={[StyleSheet.absoluteFill, styles.icon]}>
                <RightArrow height={40} />
            </View>
        </View>
    );
};

export default NotificationInteract;


