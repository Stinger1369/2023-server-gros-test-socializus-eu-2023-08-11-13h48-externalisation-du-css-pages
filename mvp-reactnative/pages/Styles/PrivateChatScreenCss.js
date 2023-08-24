import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    privateChat: {
        height: '100%'
    },
    messageBox: {
        flex: 1,
        paddingLeft: 6,
        paddingRight: 20,
        paddingTop: 10
    },
    controlBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        minHeight: 54,
        paddingHorizontal: 14,
        marginTop: 40
    },
    textBar: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 15,
        marginRight: 13,
        borderWidth: 0,
        borderRadius: 100,
        backgroundColor: 'rgba(28, 35, 43, 0.08)'
    },
    emojiBox: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0,
        marginRight: 15
    },
    emojiImage: {
        width: 24,
        height: 24
    },
    textContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%',
    },
    otherAction: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    plus: {
        width: 17,
        height: 18.2,
        marginRight: 13
    },
    plusImage: {
        width: 17,
        height: 18.2
    },
    join: {
        width: 17.38,
        height: 19.58
    },
    send: {
        width: 50,
        height: 50,
        borderWidth: 0,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 13,
        backgroundColor: '#59C09B'
    },
    sendArrow: {
        width: 20,
        height: 20,
        color: '#fff'
    }
})

export default styles