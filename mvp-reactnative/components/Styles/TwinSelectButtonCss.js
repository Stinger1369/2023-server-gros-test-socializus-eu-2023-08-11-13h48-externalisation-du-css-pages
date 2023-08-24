import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    btnContainer: {
        flexDirection: 'row',
        width: "100%"
    },
    firstBtn: {
        width: "50%",
        height: 37,
        borderWidth: 1,
        borderRightWidth: 0.5,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        alignItems: 'center',
        flexDirection: 'row'
    },
    secondBtn: {
        width: "50%",
        height: 37,
        borderWidth: 1,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        alignItems: 'center',
        flexDirection: 'row'
    },
    text: {
        fontSize: 16,
        lineHeight: 19.2,
        fontWeight: "600",
    },
    logo: {
        width: 24,
        height: 24,
        marginRight: 20,
        marginLeft: 18
    }
});

export default styles