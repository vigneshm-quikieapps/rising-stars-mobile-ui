import React from 'react';
import {SafeAreaView, StyleSheet, StatusBar} from 'react-native';

export default function StatusBarScreen({children, style}) {
  return <SafeAreaView style={[styles.screen, style]}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
  },
});

// use for setting status bar height
// cut off screen issue not solved
