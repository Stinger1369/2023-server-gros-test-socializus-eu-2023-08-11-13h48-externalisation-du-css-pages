// {ENG - This is the component where the address is saved; if you ever have to change the address, just log the different data retreived after pressing an address and save the data you need  (from data and details) (Frame Figma 31) - ENG}
// {FR - Ceci est le composant où l'adresse est enregistrée; si vous devez changer les infos de cette adresse, loggez les différentes données après avoir sélectionné une adresse (à partir de data et details) (Frame Figma 31) - FR}

import { Text, View, TouchableOpacity } from "react-native";
import styles from "./Styles/AddressMapCss";
import React, { useState, useEffect, useRef } from "react";
import InputField from "./InputField";
import MapView from "react-native-web-maps";
import Marker from "react-native-web-maps/dist/Marker";
import { usePlacesWidget } from "react-google-autocomplete";
import { Icon } from "@rneui/themed";
import Json from "../assets/json/en.json";
import Fields from "./Fields";

const AddressMap = ({
  upperTitle,
  address,
  setAddress,
  location,
  setLocation,
  scr,
}) => {
  const [isOnline, setIsOnline] = useState(false);

  const { ref } = usePlacesWidget({
    apiKey: "AIzaSyC_IMygJzn2msqFyZHfZDuTAFypEUEu-YE",
    onPlaceSelected: (place) => {
      setLocation({
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng(),
        latitudeDelta: 0.002,
        longitudeDelta: 0.002,
      });
      setAddress(place.formatted_address);
      //console.log(place)
      console.log(place.formatted_address);
    },
    options: {
      types: "addresses",
    },
  });
  //FR Méthode permettant de modifier la valeur de l'input
  //GB Method to modify the value of the input

  const emptyAddress = () => {
    setAddress("");
  };

  return (
    <>
      {upperTitle === scr.step1.address ? (
        <>
          <View style={ styles.addressView }>
            <View style={ styles.addressSubView  }>
              <Text style={styles.title}>{upperTitle}</Text>

              <View style={styles.textInputContainer}>
                <input
                  ref={ref}
                  style={styles.textInput}
                  placeholder={address}
                />
                {/* <Fields ref={ref} text={createActivity.step1.address_holder}      //🇫🇷  Essaie de changement de input, mais les donnes sont pas reconnus pas google .js //🇬🇧 trying to change input , but google is no reconnising app.js
                  upperText={createActivity.step1.address_holder} placeholder={address} /> */}
              </View>
            </View>
            {/* "info": "Address / Google maps url" */}
          </View>
          <View style={ styles.mapViewStyle }>
            <MapView
              style={styles.map}
              region={location}
              // onRegionChangeComplete={(v) => { console.log(v) }}
            >
              <Marker
                coordinate={location}
                pinColor="#3A8569"
                title={address}
              />
            </MapView>
          </View>
        </>
      ) : (
        <View style={ styles.inputFieldView }>
          <InputField
            title={upperTitle}
            state={address}
            setState={setAddress}
            specialHeight={60}
          />
          <TouchableOpacity
            style={ styles.closeIconBtn }
            onPress={() => emptyAddress()}
          >
            <Icon name="close" type="font-awesome" color="#ccc" size={22} />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default AddressMap;
