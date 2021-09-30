import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {colors} from '../Constant/Constant';

function ErrorMessage({error, visible, style}) {
  if (!visible || !error) return null;

  return <Text style={[styles.text, style]}>{error}</Text>;
}

export default ErrorMessage;

const styles = StyleSheet.create({
  text: {
    color: colors.errorColor,
  },
});
