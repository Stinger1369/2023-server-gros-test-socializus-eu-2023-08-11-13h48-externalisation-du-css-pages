import { StyleSheet } from "react-native";

const styles= StyleSheet.create({
    container:{
        flex:1
    },
    photo:{
        resizeMode: 'contain',
        alignSelf: 'center',
        //width:'100%'
         
    },
    checkbox:{
        borderColor:"#59c09b",
        borderWidth:2,
        borderRadius:10,
    },
    title:{
        fontSize:20, 
        fontWeight:"700",
        textAlign: "center",
        color:"#59c09b",
        marginTop:"5%",
    },
    txt:{
        textAlign: 'center',
        fontSize:15, 
        fontWeight:"700",
        marginBottom:"7%",
    
    },
    justify:{
        textAlign:"justify",
        marginHorizontal:"10%",
        fontSize:13
    },
    checkBoxContainer:{
        flexDirection:"row",
        width:"100%",
        justifyContent:"center",
        marginTop:"5%"
    },
    checkContainer:{
        width:"50%",
    },
    btn:{
        alignSelf:"center",
        marginTop:"5%",
    },
    dotContainer:{
        flexDirection:"row",
        justifyContent:"center",
        marginTop:"5%",
    },
    dot:{
        backgroundColor:"black",
        width:15,
        height:15,
        borderRadius:99999,
        marginHorizontal:"3%"
    },
    scrollviewContainer: {
        backgroundColor:'white', 
    },
    imgContainer: {
        backgroundColor:'blue',
        width:'100%',
        height:200,
    },

})

export default styles