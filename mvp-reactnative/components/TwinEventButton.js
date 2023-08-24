import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import styles from "./Styles/TwinEventButtonCss"

export default function TwinEventButton({ attendee }) {
    return <View style={styles.container}>
        <TouchableOpacity style={[styles.btn, { backgroundColor: "#9D9D9D", marginRight: 8 }]}>
            <Text style={[styles.text, { color: "white" }]}>Invite</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, { backgroundColor: attendee ? "#FF0000" : "#23e937" }]}>
            <Text style={[styles.text, { color: attendee ? "white" : "black" }]}>{attendee ? "Unsubscribe" : "Participate"}</Text>
        </TouchableOpacity>
    </View >
}
