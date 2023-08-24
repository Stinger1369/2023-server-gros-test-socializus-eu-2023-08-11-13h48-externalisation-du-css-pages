import React, { useState } from 'react';
import { Text, TouchableOpacity, Image, View, StyleSheet } from 'react-native';
import styles from "./Styles/MessagesScreenCss"
import { launchImageLibrary } from 'react-native-image-picker';

const MessagesScreen = () => {

const [image, setImage] = useState(null);

const pickImage = () => {
    let options = {
        mediaType: 'photo',
        includeBase64: false,
    };

    launchImageLibrary(options, (response) => {
        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.errorCode) {
            console.log('ImagePicker Error: ', response.errorMessage);
        } else {
            const source = { uri: response.assets[0].uri };
            setImage(source);
        }
    });
};

  return (
  <View style={styles.msg}>  
    <Text style={styles.text}>Comming soon</Text>
    <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={pickImage}>
                <Text style={styles.buttonText}>Pick an image from camera roll</Text>
            </TouchableOpacity>
            {image && <Image source={image} style={styles.image} />}
        </View>
  </View>
  
  );
};

export default MessagesScreen;



