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
        placeholderTextColor="#B7B7B7"
        style={[styles.input, error ? styles.inputError : undefined]}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: '#222',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 7,
  },
  input: {
    backgroundColor: '#FAFAFA',
    borderColor: '#BDBDBD',
    borderRadius: 22,
    borderWidth: 1,
    color: '#222',
    fontSize: 13,
    minHeight: 44,
    paddingHorizontal: 16,
    paddingVertical: 9,
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
