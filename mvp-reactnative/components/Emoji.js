import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import styles from "./Styles/EmojiCss"

import EmojiContext from "../context/EmojiContext";

const Emoji = ({ emoji }) => {
	const { setEmoji } = useContext(EmojiContext);
	return (
		<TouchableOpacity style={styles.container} onPress={() => setEmoji(emoji)}>
			<Text style={styles.text}>{emoji}</Text>
		</TouchableOpacity>
	)
};



export default Emoji;