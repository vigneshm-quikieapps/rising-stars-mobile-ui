import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {hp, wp} from '../constants';

export default function RadioButton(props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <LinearGradient
        colors={
          props.status === 'checked'
            ? ['#ffa300', '#ff7e00']
            : ['#808080', '#888888']
        }
        style={styles.container}>
        <View style={styles.subContainer}>
          <LinearGradient
            colors={
              props.status === 'checked'
                ? ['#ffa300', '#ff7e00']
                : ['#FFFFFF', '#F8F8F8']
            }
            style={styles.radio}
          />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: hp('3%'),
    width: hp('3%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    margin: wp('1%'),
  },
  subContainer: {
    height: hp('2.5%'),
    width: hp('2.5%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: 'white',
  },
  radio: {
    height: hp('1.5%'),
    width: hp('1.5%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
});
