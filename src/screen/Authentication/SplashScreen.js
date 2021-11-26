/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {wp, hp} from '../../constants';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/icon-Activity_Progress-star.png')}
        style={{height: wp('13%'), width: wp('13%')}}
      />
      <Text
        style={{
          fontFamily: 'Nunito-SemiBold',
          fontSize: hp('3%'),
          fontWeight: 'bold',
        }}>
        Rising Stars
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
