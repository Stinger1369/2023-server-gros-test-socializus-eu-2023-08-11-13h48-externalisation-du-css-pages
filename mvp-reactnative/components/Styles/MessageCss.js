import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container1: {
        flexDirection: 'row',
        gap: 20,
        marginBottom: 14
    },
    container2: {
        alignSelf: 'flex-end',
        marginBottom: 14
    },
    left: {
        justifyContent: 'flex-end',
        marginRight: 9
    },
    right: {
        position: 'relative'
    },
    myAvatar: {
        width: 38,
        height: 38,
        borderWidth: 0,
        borderRadius: 100,
        objectFit: 'cover'
    },
    name: {
        fontSize: 12,
        fontWeight: '500',
        color: '#CB55B1',
        marginLeft: 15,
        marginBottom: 3
    },
    messageContainer: {
        width: 262,
        minHeight: 72,
        borderWidth: 0,
        borderRadius: 15,
        backgroundColor: '#CB55B1',
        padding: 15
    },
    message: {
        color: '#fff'
    },
    time: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        fontSize: 10,
        fontWeight: '400'
    },
    polygonLeft: {
        position: 'absolute',
        left: -14,
        bottom: 0, 
        width: 0,
        height: 0,
        borderRadius: 15,
        borderLeftWidth: 29.68,
        borderLeftColor: 'transparent',
        borderRightWidth: 10,
        borderRightColor: 'transparent',
        borderTopWidth: 10,
        borderTopColor: 'transparent',
        borderBottomWidth: 15, 
        borderBottomColor: '#CB55B1',
        background: 'transparent'
    },
    polygonRight: {
        position: 'absolute',
        right: -14,
        bottom: 0, 
        width: 0,
        height: 0,
        borderRadius: 15,
        borderLeftWidth: 10,
        borderLeftColor: 'transparent',
        borderRightWidth: 29.68,
        borderRightColor: 'transparent',
        borderTopWidth: 10,
        borderTopColor: 'transparent',
        borderBottomWidth: 15, 
        borderBottomColor:  '#CB55B1',
        background: 'transparent'
    }

})

export default styles