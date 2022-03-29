import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {colors, hp} from '../constants';
import LinearGradient from 'react-native-linear-gradient';

const ForwardButton = props => {
  return (
    <TouchableOpacity
      disabled={props.disabled ? true : false}
      onPress={props.onPress}>
      <LinearGradient
        colors={['#ffa300', '#ff7e00']}
        style={[styles.backButton, props.style]}>
        <Image source={require('../assets/images/icon-forward2-line.png')} />
      </LinearGradient>
    </TouchableOpacity>
  );
};
// Style
const styles = StyleSheet.create({
  backButton: {
    backgroundColor: colors.orange,
    height: hp('7.5%'),
    width: hp('7.5%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
});
export default ForwardButton;
