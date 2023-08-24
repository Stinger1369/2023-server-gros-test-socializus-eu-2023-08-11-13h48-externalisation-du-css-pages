import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    notification: {
        backgroundColor: "#F8F8F8",
        color: "#000000",
        borderRadius: 10,
        padding: 12,
        marginTop: 12,
        marginBottom: 12,
        marginRight: 19,
        marginLeft: 19,
    },
    shadowProp: {
        shadowOffset: { width: -2, height: 4 },
        shadowColor: '#171717',
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    notifText: {
        fontSize: 13
    },
    blockText: {
        paddingLeft: 60
    },
    blockInfos: {
        marginTop: 5,
        flexDirection: "row"
    },
    informations: {
        fontSize: 12,
        color: "#5B5B5B"
    },
    icon: {
        marginTop: 15
    }
});

export default styles