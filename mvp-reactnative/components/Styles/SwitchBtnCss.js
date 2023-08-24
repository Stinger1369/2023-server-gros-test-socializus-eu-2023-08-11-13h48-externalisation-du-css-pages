import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        marginLeft: 10,
        width: 45,
        height: 24,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: "#ccc",
        justifyContent: "center",
    },
    circle: {
        width: 16,
        height: 16,
        borderRadius: 8,
        margin: 2,
        backgroundColor: "#ffffff"
    },
    switchInfo: {
        fontSize: 10,
        fontWeight: "bold",
        color: "white",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        top: 3,
    },
});

export default styles