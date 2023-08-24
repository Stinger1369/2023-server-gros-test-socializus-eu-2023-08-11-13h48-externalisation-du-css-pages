import { StyleSheet } from "react-native";

//Creation des styles
const styles= StyleSheet.create({
    container: {
        flex: 1
    },
    photo: {
        //width:'100%',
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    title: {
        fontSize: 20, 
        fontWeight:"700",
        textAlign: "center",
        marginTop:"5%",
        marginBottom:25
    
    
    },
    txt: {
        textAlign: 'center',
        fontSize: 15, 
        fontWeight:"700",
        marginBottom:"7%",
        width:272,
        marginLeft:"8%",
        textAlign:"start"
    
    },
    ButtonFB: {
        backgroundColor: "#3e61bc",
        alignSelf:"center",
        borderRadius: 10,
        flexDirection:"row",
        height:50,
        width:150,
    },
    buttonText: {
        color: "white",
        fontWeight:"700",
        textAlign:'center',
        paddingTop:10
    },
    buttonTextFB: {
        color: "white",
        fontWeight:"700",
        textAlign:'center',
        paddingTop:17
    },
    eventRedirectButton: {
        backgroundColor: "#59c09b",
        alignSelf:"center",
        marginTop:"5%",
        padding: "2%",
        borderRadius: 10,
        marginBottom:50,
        height:50,
        width:150,
    },
    newslist: {
        flexDirection:"row",
        paddingLeft:25,
        paddingBottom:15,
        paddingRight:70,
    },
    helpParagraph: {
        alignItems:"center",    
    },
    scrollViewContainer: {
        backgroundColor:'white',
    },
    imgViewContainer: {
        backgroundColor:'blue',
        width:'100%',
        height:200,  
    },
    })

export default styles