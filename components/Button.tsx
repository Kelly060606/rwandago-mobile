import React from 'react';
import { ActivityIndicator, StyleProp, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';

type ButtonProps = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
};

export default function Button({ title, onPress, loading = false, fullWidth = false, style }: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, fullWidth && styles.fullWidth, style]}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? <ActivityIndicator color="white" /> : <Text style={styles.text}>{title}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#191919',
    borderRadius: 28,
    minHeight: 52,
    justifyContent: 'center',
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  fullWidth: {
    width: '100%',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});


