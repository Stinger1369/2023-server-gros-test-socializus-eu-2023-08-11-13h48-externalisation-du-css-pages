// ENG - Unfinishes business - Check the languages - ENG
// FR - Travail inachevé - Vérifier les langues - FR

import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import styles from "./Styles/CountriesListCss"
import { Icon } from "@rneui/themed";
import CountriesGrid_OneFlag from "./CountriesGrids";

// Méthode permettant de selectionner la langue

const countriesListRectFlags = ({ country, setCountry }) => {
  const [countryModalVisible, isCountryModalVisible] = useState(false);
  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={countryModalVisible}
        onRequestClose={() => {
          isCountryModalVisible(!countryModalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.countryModalView}>
            <TouchableOpacity
              style={{ margin: 5, alignSelf: "flex-end" }}
              onPress={() => isCountryModalVisible(!countryModalVisible)}
            >
              <Icon name="close" type="font-awesome" color="#ccc" size={28} />
            </TouchableOpacity>
            <Text style={styles.countryModalTitle}>Choose a language</Text>
            <CountriesGrid_OneFlag
              setCountry={setCountry}
              isCountryModalVisible={isCountryModalVisible}
            />
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.9}
        onPress={() => isCountryModalVisible(!countryModalVisible)}
      >
        <Text style={styles.upperText}>Select Language</Text>
        <View style={styles.innerContent}>
          <Text>{country.language}</Text>
          <View style={{padding: 2, position: "relative"}}>
            <View>{country.flag}</View>
            <View style={styles.flagShadow} />
          </View>
          <View style={{ alignSelf: "center" }}>
            <Icon
              name="caret-down"
              type="font-awesome"
              color="black"
              size={14}
            />
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default countriesListRectFlags;




