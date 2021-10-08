import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, hp, wp } from '../Constant/Constant';
import LinearGradient from 'react-native-linear-gradient';

const Forwardbutton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <LinearGradient colors={['#ffa300', '#ff7e00']} style={[styles.backbutton, props.style]} >
        <Image source={require('../assets/images/icon-forward2-line.png')} />
      </LinearGradient>
    </TouchableOpacity>
  )
}
// Style
const styles = StyleSheet.create({
  backbutton: {
    backgroundColor: colors.orange,
    height: hp('7.5%'),
    width: hp('7.5%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
});
export default Forwardbutton;
