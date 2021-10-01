import React from 'react';
import {TouchableOpacity, StyleSheet, Text,KeyboardAvoidingView} from 'react-native';
import {hp, colors, wp, Fontsize} from '../Constant/Constant';
import LinearGradient from 'react-native-linear-gradient';

function AppButton({title, onPress, style}) {
  return (
    
    <LinearGradient colors={['#ffa300', '#ff7e00']} style={[styles.container, style]}>
      <TouchableOpacity  onPress={onPress}>
        <Text style={styles.button} onPress={onPress}>
          {title}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

export default AppButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('5%'),
    borderRadius:18,
    marginTop: hp('3%'),
    backgroundColor: colors.orange,
  },
  button: {
    color: colors.white,
    fontSize: Fontsize,
    fontFamily: 'Nunito-SemiBold',
  },
});