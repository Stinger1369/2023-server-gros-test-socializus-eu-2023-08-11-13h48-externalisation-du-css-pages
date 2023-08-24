import React, { useState } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text, ImageBackground, } from "react-native";
import styles from "./Styles/CountriesListHomeScreenCss"
import { useNavigation } from "@react-navigation/native";
import { countriesListRectFlags } from "../assets/countriesListRectFlags";

import { countriesListFlags } from "../assets/countriesListFlags";
import { countriesListFlags2 } from "../assets/countriesListFlags2";
import { countriesListFlags3 } from "../assets/countriesListFlags3";
import { countriesListFlags4 } from "../assets/countriesListFlags4";
import { countriesListFlags5 } from "../assets/countriesListFlags5";
import { countriesListFlags6 } from "../assets/countriesListFlags6";
import { countriesListFlags7 } from "../assets/countriesListFlags7";
import { countriesListFlags8 } from "../assets/countriesListFlags8";
import { countriesListFlags9 } from "../assets/countriesListFlags9";
import { countriesListFlags10 } from "../assets/countriesListFlags10";
import { countriesListFlags11 } from "../assets/countriesListFlags11";
import { countriesListFlags12 } from "../assets/countriesListFlags12";

const CountriesListHomeScreen = ({ setCountry, isCountryModalVisible, isSeveralFlags }) => {
    const navigation = useNavigation();
    const [selections, setSelections] = useState([]);
    
    const handlePress = (country) => {
        setCountry({ language: country.language, flag: country.flag });
        isCountryModalVisible(false);
        //future auto-translate function here; don't forget to add the event description as the fuction argument
    };
    
    const manageSelections = (country) => {
        if (!selections.includes(country)) {
        setSelections((previousArray) => {
            return [...previousArray, country];
        });
        } else {
        setSelections((previousArray) => {
            return previousArray.filter((item) => {
            return item !== country;
            });
        });
        }
    };
    
    return (
        <View style={styles.container}>
        {countriesListRectFlags.map((country, index) => {
            return (
            <View style={{ position: "relative" }} key={index}>
                <TouchableOpacity
                style={[
                    styles.countryCard,
                    {
                    backgroundColor: selections.includes(country) ? "#59c09b" : "white",
                    },
                ]}
                onPress={() => {
                    isSeveralFlags ? manageSelections(country) : handlePress(country);
                }}
                >
                <View style={ styles.countryFlagsView }>
                    <View>{country.flag}</View>
                    <View style={styles.flagShadow} />
                </View>
                </TouchableOpacity>
                <View style={styles.shadow} />
            </View>
            );
        })}
        </View>
    );
    }

export default CountriesListHomeScreen;


  

    












    





