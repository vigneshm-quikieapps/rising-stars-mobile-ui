/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AppButton from './app-button';
import {hp, colors, wp} from '../constants';

export const PaymentCard = props => {
  return (
    <View style={styles.container}>
      <Text style={{marginVertical: hp('1%')}}>Payment History</Text>
      {props.children}
    </View>
  );
};

export const Card = props => {
  return (
    <View style={[styles.subContainer, props.substyle]}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{fontSize: hp('2%'), fontFamily: 'Nunito-SemiBold'}}>
          £{props.amount}
        </Text>
        <View style={[styles.notify, props.style]}>
          <Text style={{color: colors.white, fontFamily: 'Nunito-SemiBold'}}>
            {props.notify}
          </Text>
        </View>
      </View>
      <Text style={{fontFamily: 'Nunito-SemiBold'}}>{props.body}</Text>
      <Text style={{fontFamily: 'Nunito-SemiBold'}}>{props.date}</Text>
      {props.button ? (
        <AppButton
          title={props.title}
          style={props.paystyle}
          onPress={props.paybutton}
        />
      ) : null}
      {props.paid ? (
        <Text style={{fontFamily: 'Nunito-SemiBold'}}>{props.paidtext}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    elevation: 1,
    shadowColor: colors.lightgrey,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    overflow: 'hidden',
    shadowRadius: 5,
    borderRadius: 5,
    padding: wp('5%'),
  },
  subContainer: {
    flex: 1,
    borderRadius: 20,
    padding: hp('2%'),
    marginBottom: hp('1%'),
  },
  notify: {
    fontFamily: 'Nunito-SemiBold',
    padding: wp('2%'),
    borderRadius: 10,
  },
});
