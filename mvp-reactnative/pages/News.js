//🇫🇷 Page d'informations (à propos de nous) (Figma Frame 91)
//🇬🇧 News page (Figma Frame 91)

import { Text, ScrollView, Image, StyleSheet, View, SafeAreaView, ImageBackground, TouchableOpacity } from "react-native";
import styles from "./Styles/NewsCss"
import { useEffect, useState } from "react";
import JSON from "../assets/json/en.json";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Bug from "../assets/images/ContactBug.svg";
import Facebook from "../assets/images/Facebook.svg";
import NonProfit from "../assets/images/non-profit.svg";
import StarUsers from "../assets/images/starUsers.svg";
import Idea from "../assets/images/idea_1.svg";
import FreeApp from "../assets/images/free_app.svg";

//🇫🇷 L'image du haut et les icônes sont manquantes
//🇬🇧 The top picture and the three icons are missing

const News = () => {
    const { b2022_news } = JSON;
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={ styles.scrollViewContainer }>
                <View style={ styles.imgViewContainer }>
                    <ImageBackground source={require("../assets/images/rectangle230.png")} resizeMode={"cover"} style={{flex:1}}></ImageBackground>
                </View>    
                {/* TITRE DE LA PAGE */}
                <Text style={styles.title}>{b2022_news.mainTitle}</Text>
                {/* Remplacer ce titre par "Socializus is ..." " */}          
                {/* PARTIE AVEC LES LOGOS ET LES TEXTES */} 

                {/* PREMIERE LIGNE */}         
                <View style={styles.newslist}>
                    <NonProfit style={styles.img}/>
                    {/*Insrer ici la premiere image*/}                
                    <Text style={styles.txt}>{b2022_news.nonProfit}</Text>
                    {/*Remplacer ce texte par la pemiere description */}               
                </View>

                {/* DEUXIEME LIGNE */}         
                <View style={styles.newslist}>
                    <StarUsers style={styles.img} />
                    {/*Inserer ici la deuxieme image*/}                
                    <Text style={styles.txt}>{b2022_news.activeUsers}</Text>
                    {/*Remplacer ce texte par la deuxieme description */}               
                </View>

                {/* TROISIEME LIGNE */}         
                <View style={styles.newslist}>
                    <FreeApp style={styles.img} />
                    {/*Inserer ici la troisieme image*/}
                    <Text style={styles.txt}>{b2022_news.freeApp}</Text>
                    {/*En cas de difficulte pour vous connecter ... */}               
                </View>

                <View style={styles.helpParagraph}>
                    <Idea style={styles.img} />
                    {/*Inserer ici la troisieme image*/}
                    <Text style={styles.txt}>{b2022_news.helpTheApp}</Text>
                    {/*En cas de difficulte pour vous connecter ... */}               
                </View>
                
                {/*LIEN VERS FACEBOOK*/}
                <TouchableOpacity style={styles.ButtonFB} 
                onPress={() =>
                    Linking.openURL(
                    "https://www.facebook.com/groups/socializus"
                    //Inserer le lien facebook a la place
                    )
                }>
                    <Facebook/>  
                    <View style={styles.row}>
                        <Text style={styles.buttonTextFB} >{b2022_news.joinFB}</Text>
                    </View>  
                </TouchableOpacity>

                {/*LIEN VERS MY ACTIVITY*/} 
                <TouchableOpacity 
                    style={styles.eventRedirectButton}
                    onPress={()=>navigation.push("Activities List")}>
                    <View>
                        <Text style={styles.buttonText}>{b2022_news.findEvent}</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

export default News;





