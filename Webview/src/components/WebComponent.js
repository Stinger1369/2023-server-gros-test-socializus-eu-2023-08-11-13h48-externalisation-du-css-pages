import React, { useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';
import ReloadImg from '../../assets/ion_reload-circle.png'

export default function WebComponent() {
  const webViewRef = useRef(null);
  const [cacheEnabled, setCacheEnabled] = useState(true);

  const handleReloadWeb = () => {

    setCacheEnabled(false);
    webViewRef.current?.reload();
    setCacheEnabled(true);

  };

    return (
        <View style={styles.container}>
          <StatusBar hidden={false} />
          <TouchableOpacity onPress={handleReloadWeb} style={styles.reloadButton}>
            <Image source={ReloadImg} style={styles.svgImage} />      
          </TouchableOpacity>
          <WebView source={{ uri: 'https://socializus.eu/' }} style={styles.webView} ref={webViewRef} cacheEnabled={cacheEnabled}/>
        </View>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#59C09B'
  },
  reloadButton: {
    zIndex: 1,
  },
  svgImage: {
    position: 'absolute',
    top: 10,
    right: 20,
    width: 40,
    height: 40,
  },
});
