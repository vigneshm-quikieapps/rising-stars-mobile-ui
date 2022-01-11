import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import {hp, colors, wp, Fontsize} from '../constants';
import LinearGradient from 'react-native-linear-gradient';

function NewAppButton({title, onPress, style, color, size}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, style]}>
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.button} onPress={onPress}>
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
    borderWidth: 2,
    borderColor: colors.orange,
  },
  button: {
    color: colors.orange,
    fontSize: Fontsize,
    fontFamily: 'Nunito-SemiBold',
  },
});
