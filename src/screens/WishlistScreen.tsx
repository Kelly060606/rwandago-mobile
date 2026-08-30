import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function WishlistScreen() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Wishlist</Text>
			<Text>Your saved places will appear here.</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center',
		padding: 16,
		paddingBottom: 80,
	},
	title: {
		fontSize: 26,
		fontWeight: 'bold',
		marginBottom: 8,
	},
});
