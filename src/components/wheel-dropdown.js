/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import PopUp from './pop-up';
import {wp, hp, Fontsize} from '../constants';

export default function WheelDropdown(props) {
  return (
    <PopUp
      animationType="slide"
      transparent={true}
      visible={props.visible}
      setVisibility={props.setVisibility}>
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <View
            style={{
              borderRadius: 20,
              height: 6,
              width: 60,
              backgroundColor: '#E8E8E8',
              alignSelf: 'center',
              marginTop: hp('0.8%'),
            }}
          />
          <View style={{margin: wp('5%')}}>
            <Text style={{fontFamily: 'Nunito-SemiBold', fontSize: Fontsize}}>
              Select {props.title}
            </Text>
            <View style={{alignItems: 'center'}} />
            {props.children}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.cancel} onPress={props.cancel}>
                Cancel
              </Text>
              <TouchableOpacity onPress={props.confirm}>
                <LinearGradient
                  colors={['#ffa300', '#ff7e00']}
                  style={styles.confirm}>
                  <Text style={{color: 'white', fontFamily: 'Nunito-Regular'}}>
                    Confirm
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </PopUp>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('60%'),
  },
  subContainer: {
    backgroundColor: 'white',
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    height: hp('50%'),
    width: wp('100%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  cancel: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: Fontsize,
    color: 'orange',
  },
  confirm: {
    height: hp('5%'),
    width: wp('20%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: hp('1%'),
  },
});
