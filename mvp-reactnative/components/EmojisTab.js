import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import styles from "./Styles/EmojisTabCss"

import Emoji from "./Emoji";

const EmojisTab = ({ emojis }) => {
	return (
		<FlatList
			style={styles.container}
			data={emojis}
			renderItem={({ item }) => <Emoji emoji={item.char} />} 
			keyExtractor={item => item.char}
			numColumns={8}
		/>

	)
};



export default EmojisTab;