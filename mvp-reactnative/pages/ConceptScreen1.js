// 🇫🇷 Page 1 du concept (Frame Figma 23 MVP Concept1)
// 🇬🇧 Concept Page 1 (Figma Frame 23 MVP Concept1)

import { Text, ScrollView, StyleSheet, View, SafeAreaView, ImageBackground } from "react-native";
import styles from "./Styles/ConceptScreen1Css"
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import LogButtons from "../components/LogButtons"; // 🇫🇷 Permet la navigation entre les 3 écrans du concept
import { CheckBox } from "@rneui/base";
import Json from "../assets/json/en.json";

const { concept } = Json

const ConceptScreen = () => {
    
    const navigation = useNavigation();

    const [check1, setCheck1] = useState();
    const [check2, setCheck2] = useState();
    
    console.log(check1)
    console.log(check2)
    console.log("-------------")

    useEffect(() => {
        if (check1 == true) {
            setCheck2(false)
        } if (check2 == true) {
            setCheck1(false)
        }
    })

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={ styles.scrollviewContainer }>
                <View style={ styles.imgContainer }>
                    <ImageBackground source={require("../assets/images/picnic.png")} resizeMode={"cover"} style={{flex:1}} />
                </View>    

                <Text style={styles.title}>

                    {/*🇫🇷 La variable concept.title_1 dans fr.json permet d'afficher "Socializus:"*/}
                    {/*🇬🇧 The en.json variable concept.title_1 displays "Socializus:""*/}
                    {concept.title_1}</Text>

                <Text style={styles.txt}>
                    {/*🇫🇷 La variable concept.subtitle_1 dans fr.json permet d'afficher "(Pour faire des échanges culturel)"*/}
                    {/*🇬🇧 The en.json variable concept.subtitle_1 displays "(To have cultural exchanges)""*/}
                    {concept.subtitle_1}</Text>

                <Text style={styles.justify}>                    
                    {/*🇫🇷 La variable concept.description_1 dans fr.json permet d'afficher "La première application de rencontres conviviales, afin d'aider les étrangers et les organisateurs à se rencontrer et à partager leurs activités dans leur ville de résidence. Tout est géolocalisé et partagé avec quelques cartes et notifications mobiles pour ne rien manquer."*/}
                    {/*🇬🇧 The en.json variable concept.description_1 displays "The first application for friendly meetings, in order to help foreigners and organizers to meet and share their activities in their city of residence. Everything is geolocated and shared with some cards and mobile notifications to never miss anything."*/}
                    {concept.description_1}
                    </Text>

                <View style={styles.checkBoxContainer}>
                    <View style={styles.checkContainer}>
                                {/*🇫🇷 La variable concept.label_1 dans fr.json permet d'afficher "C'est top !"*/}
                                {/*🇬🇧 The en.json variable concept.label_1 displays "Let me try!"*/}
                        <CheckBox
                            title={concept.label_1}
                            containerStyle={styles.checkbox}
                            checked={check1}
                            checkedColor="#59c09b"
                            onPress={() => setCheck1(!check1)}
                        />
                    </View>
                    <View style={styles.checkContainer}>
                                {/*🇫🇷 La variable concept.label_2 dans fr.json permet d'afficher "Sans intérêt"*/}
                                {/*🇬🇧 The en.json variable concept.label_2 displays "Not interested."*/}
                        <CheckBox
                        title={concept.label_2}
                        containerStyle={styles.checkbox}
                        checked={check2}
                        checkedColor="#59c09b"
                        onPress={() => setCheck2(!check2)}
                        />
                    </View>
                </View>
                {/*🇫🇷 Pagination par points.*/}
                {/*🇬🇧 Dot pagination.*/}
                <View style={styles.dotContainer}>
                    <View style={[styles.dot, {backgroundColor:"#59c09b"}]}></View>
                    <View style={styles.dot}></View>
                    <View style={styles.dot}></View> 
                </View>
                <View style={styles.btn}>
                                {/*🇫🇷 La variable concept.button dans fr.json permet d'afficher "Passer"*/}
                                {/*🇬🇧 The en.json variable concept.button displays "Skip"*/}
                    <LogButtons
                        text={concept.button}
                        width={318}
                        backgroundColor= "#59c09b"
                        currentPage={"Concept"}
                        navigate={navigation.navigate}
                        path={"Concept 2"}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ConceptScreen;


