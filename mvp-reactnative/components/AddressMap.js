// {ENG - This is the component where the address is saved; if you ever have to change the address, just log the different data retreived after pressing an address and save the data you need  (from data and details) - ENG}
// {FR - Ceci est le composant où l'adresse est enregistrée; si vous devez changer les infos de cette adresse, loggez les différentes données après avoir sélectionné une adresse (à partir de data et details) - FR}

import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import styles from "./Styles/AddressMapCss"
import React, { useState, useEffect, useRef } from "react";
import InputField from "./InputField";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Geocoder from "react-native-geocoding";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Icon } from "@rneui/themed";

const AddressMap = ({
  upperTitle,
  address,
  setAddress,
  location,
  setLocation,
}) => {

  const googleMapKey = "AIzaSyC_IMygJzn2msqFyZHfZDuTAFypEUEu-YE";
  Geocoder.init(googleMapKey);

  const ref = useRef(address);
//FR Méthode permettant de modifier la valeur de l'input
//GB Method to modify the value of the input 
  const emptyInput = () => {
    setAddress("");
  };

  return (
    <>
      {upperTitle !== "Online" ? (
        <>
          <View style={ styles.titleView }>
            <View style={{ position: "relative" }}>
              <Text style={styles.title}>{upperTitle}</Text>
              <GooglePlacesAutocomplete
                query={{
                  key: googleMapKey,
                }}
                onPress={(data, details = null) => {
                  setAddress(details.formatted_address);
                  setLocation({
                    latitude: details.geometry.location.lat,
                    longitude: details.geometry.location.lng,
                    latitudeDelta: 0.002,
                    longitudeDelta: 0.002,
                  });
                }}
                ref={ref}
                minLength={2}
                fetchDetails={true}
                //       textInputProps={{
                // 	clearButtonMode: 'never',
                // 	ref: input => {
                // 		textInput = input;
                // 	}
                // }}
                styles={{
                  textInputContainer: {
                    marginVertical: 5,
                    paddingHorizontal: 10,
                    justifyContent: "center",
                    borderWidth: 1,
                    borderColor: "black",
                    borderRadius: 15,
                  },
                  textInput: {
                    paddingTop: 10,
                    height: 50,
                    fontSize: 16,
                    textAlignVertical: "center",
                  },
                }}
              />
            </View>
            {/* "info": "Address / Google maps url" */}
          </View>
          <View>
            <MapView
              style={styles.map}
              region={location}
              provider={PROVIDER_GOOGLE}
            >
              <Marker coordinate={location} pinColor="#3A8569" />
            </MapView>
          </View>
        </>
      ) : (
        <View style={ styles.inputFieldStyle }>
          <InputField
            title={upperTitle}
            state={address}
            setState={setAddress}
            specialHeight={60}
          />
          <TouchableOpacity
            style={ styles.InputFieldButton }
            onPress={() => setAddress("")}
          >
            <Icon name="close" type="font-awesome" color="#ccc" size={22} />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default AddressMap;


