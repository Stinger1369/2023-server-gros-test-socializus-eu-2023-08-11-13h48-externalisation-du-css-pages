// 🇫🇷 Page 2 du concept (Figma 23 Concept2)🇫🇷
// 🇬🇧 Concept Page 2 (Figma 23 Concept2) 🇬🇧

import { Text, ScrollView, StyleSheet, View, SafeAreaView, ImageBackground } from "react-native";
import styles from "./Styles/ConceptScreen2Css"
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
                    <ImageBackground source={require("../assets/images/mousses.png") } resizeMode={"cover"} style={{flex:1}} />
                </View>
                <Text style={styles.title}>
                    {/*🇫🇷 La variable concept.title_1 dans fr.json permet d'afficher "Socializus:"*/}
                    {/*🇬🇧 The en.json variable concept.title_1 displays "Socializus:""*/}
                    {concept.title_1}
                    </Text>
                <Text style={styles.txt}>
                        {/*🇫🇷 La variable concept.title_1 dans fr.json permet d'afficher "(Pour organiser et se rencontrer)"*/}
                        {/*🇬🇧 The en.json variable concept.title_1 displays "(To organize and meet)"*/}
                    {concept.subtitle_2}
                    </Text>
                <Text style={styles.justify}>
                        {/*🇫🇷 La variable concept.description_2 dans fr.json permet d'afficher "Partir en pique-nique, faire une fête à la maison, faire une séance de sport, aller au cinéma, visiter un musée, faire un voyage culturel, un concert, aller au restaurant... les thèmes ne manquent pas pour partager vos propres événements avec SOCIALIZUS et fonctionnalités pour inviter vos amis, rassembler et interagir avec les commentaires."*/}
                        {/*🇬🇧 The en.json variable concept.description_2 displays " Going on a picnic, a house party, a sport session, to the movies, a museum tour, a cultural trip, a concert, to the restaurant... there are plenty of themes to choose from to share your own events with SOCIALIZUS and features to invite your friends, gather and interact with comments."*/}
                    {concept.description_2}
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
                    <View style={styles.dot}></View>
                    <View style={[styles.dot, {backgroundColor:"#59c09b"}]}></View>
                    <View style={styles.dot}></View>
                </View>
                <View style={styles.btn}>
                            {/*🇫🇷 La variable concept.button dans fr.json permet d'afficher "Passer"*/}
                            {/*🇬🇧 The en.json variable concept.button displays "Skip"*/}
                    <LogButtons
                        text={concept.button}
                        width={318}
                        backgroundColor= "#59c09b"
                        currentPage={"Concept 2"}
                        navigate={navigation.navigate}
                        path={"Concept 3"}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ConceptScreen;


