import React from 'react';
import {SafeAreaView, StyleSheet, View,StatusBar} from 'react-native';

export default function StatusBarScreen({children, style}) {
  return (
    <SafeAreaView
      style={[styles.screen, style, {backgroundColor: 'yellogreen'}]}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
  },
});

// use for setting status bar height
// cut off screen issue not solved
