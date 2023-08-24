import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    forgotPage: {
        backgroundColor: "white",
        flex: 1,
    },
    title: {
        fontSize: 30,
        fontWeight: "600",
        lineHeight: 45,
        color: "#59C09B",
        marginLeft: "5%",
        marginBottom: 66
    },
    container: {
        width: 260,
        alignSelf: "center"
    },
    text: {
        fontSize: 14,
        fontWeight: "400",
        lineHeight: 18.46,
        marginBottom: 64
    },
    email: {
        alignItems: "center"
    },
    bigBtn: {
        backgroundColor: "#59c09b",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        width: 280,
        marginTop: 55
    },
    btnText: {
        color: "white",
        fontSize: 22,
        lineHeight: 33,
        fontWeight: "700"
    },
    btnContainer: {
        alignItems: "center"
    },
    opt: {
        width: 38.02,
        height: 35.24,
        backgroundColor: "white",
        borderColor: "#000000",
        borderWidth: 1,
        borderRadius: 10,
        textAlign: "center",
        marginRight: 12
    },
    errorCard : {
        width : "80%",
        height : 40,
        //padding: 10,
        backgroundColor : 'red',
        margin : 10,
        paddingHorizontal: "auto",
        paddingVertical : "auto",
        marginHorizontal : "auto",
        paddingTop:5
    ,    textAlign : "center",
        
        
      },
      error: {
        color: "white",
        marginBottom: 20,
        fontWeight : "bold",
        fontSize : 20
    
      },
    smallBtn: {
        height: 37,
        width: 88,
        borderWidth: 1,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15
    },
    smallBtnText: {
        fontSize: 14,
        fontWeight: "700",
        lineHeight: 18,
        color: "#59C09B"
    },
    txtInputContainer: {
        flexDirection: "row", 
        alignSelf: "center",
    },
    verificationCodeContainer: {
        alignItems: "center", 
        marginTop: 63, 
        marginBottom: 10,
    },
});

export default styles