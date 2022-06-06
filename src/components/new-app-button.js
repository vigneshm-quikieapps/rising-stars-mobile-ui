import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import {hp, colors, wp, Fontsize} from '../constants';
import LinearGradient from 'react-native-linear-gradient';

function NewAppButton({title, onPress, style, color, size,selected}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[
        styles.container, 
        style,
        {  
          backgroundColor:selected? colors.orange:colors.white,
          borderWidth: selected? 0:2
          }]}>
        <TouchableOpacity onPress={onPress}>
          <Text style={[styles.button,{color: !selected? colors.orange:colors.white,}]} onPress={onPress}>
            {title}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

export default NewAppButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('5%'),
    borderRadius: 18,
    marginTop: hp('3%'),
    backgroundColor: colors.white,
   
    borderColor: colors.orange,
  },
  button: {
    //color: colors.orange,
    fontSize: Fontsize,
    fontFamily: 'Nunito-SemiBold',
  },
});
