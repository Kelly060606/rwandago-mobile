import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput as NativeTextInput,
  TextInputProps as NativeTextInputProps,
  View,
  ViewStyle,
} from 'react-native';

type TextInputProps = NativeTextInputProps & {
  label: string;
  error?: string;
  style?: StyleProp<ViewStyle>;
};

export default function TextInput({ label, error, style, ...inputProps }: TextInputProps) {
  return (
    <View style={style}>
      <Text style={styles.label}>{label}</Text>
      <NativeTextInput
        {...inputProps}
        style={[styles.input, error ? styles.inputError : undefined]}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: '#222',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    borderColor: '#D0D0D0',
    borderRadius: 8,
    borderWidth: 1,
    color: '#222',
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  inputError: {
    borderColor: '#D32F2F',
  },
  error: {
    color: '#D32F2F',
    fontSize: 12,
    marginTop: 4,
  },
});
