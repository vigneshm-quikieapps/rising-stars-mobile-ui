import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import {hp, colors, wp} from '../Constant/Constant';
function AppButton({title, onPress, style}) {
  return (
    <View>
      <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
        <Text style={styles.button} onPress={onPress}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default AppButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    // width: '100%',
    padding: wp('4%'),
    borderRadius: wp(' 3%'),
    // flexDirection: 'column',
    marginTop: hp('3%'),
    backgroundColor: colors.orange,
  },
  button: {
    color: colors.white,
    fontSize: 15,
    fontFamily: 'Nunito-SemiBold',
  },
});
