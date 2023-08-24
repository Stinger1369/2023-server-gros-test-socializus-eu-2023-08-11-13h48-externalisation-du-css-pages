import { StyleSheet } from "react-native";

const styles = StyleSheet.create ({ 

    container: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        alignContent: "center",
        padding: 10,

    },
    countryCard: {
        width: 100,
        height: 100,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        margin: 10,

    },
        shadow: {
        position: "absolute",
        top: 0,
        left: 0,
        width: 100,
        height: 100,
        borderraduis: 10, 
        shadowColor : "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,

    },
    flagShadow: {
        position: "absolute",
        top: 0,
        left: 0,
        width: 100,
        height: 100,

        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation:5, 
    },
    countryFlagsView: {
        flex: 1, 
        justifyContent: "center", 
        position: "relative",   
    },

});

export default styles