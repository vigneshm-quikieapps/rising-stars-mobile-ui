import React from 'react';
import {View, Text,Image, StyleSheet, TouchableOpacity} from 'react-native';
import {colors, hp, wp} from '../Constant/Constant';

const Forwardbutton = (props) => {
    return (
        <TouchableOpacity style={[styles.backbutton,props.style]} onPress={props.onPress}>
              <Image source={require('../assets/images/icon-forward2-line.png')}/>
        </TouchableOpacity>
    )
} 
// Style
const styles = StyleSheet.create({
  backbutton: {
    backgroundColor: colors.orange,
    height: hp('6.5%'),
    width: hp('6.5%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
});
export default Forwardbutton;
