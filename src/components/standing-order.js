/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {hp, wp, colors} from '../constants';
import {RadioButton} from 'react-native-paper';
import Input from './input';
import {AppButton} from '.';
import NewAppButton from './new-app-button';

const StandingOrder = props => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <RadioButton />
        <View style={{marginLeft: wp('3%')}}>
          <Text style={styles.cardText}>Confirm Standing Order</Text>
        </View>
      </View>
      <AppButton
        title={"I've setup Standing Order"}
        onPress={() => {
          //
        }}
        style={{width: wp('83%')}}
      />
      <NewAppButton
        title={"I'll setup Standing Order late"}
        onPress={() => {
          //
        }}
        style={{width: wp('83%')}}
        emptyContainer={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: hp('34.5%'),
    borderWidth: 1,
    padding: hp('2%'),
    marginVertical: hp('1%'),
    borderRadius: 10,
    borderColor: colors.orange,
  },
  cardText: {
    fontFamily: 'Nunito-SemiBold',
    // fontWeight: "bold",
    fontSize: hp('2.5%'),
  },
  cardOption: {
    fontFamily: 'Nunito-SemiBold',
    color: colors.grey,
  },
  cardDetails: {
    flex: 1,
    height: hp('20%'),
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.lightgrey,
    padding: hp('2%'),
  },
  breaks: {
    borderWidth: 1,
    borderColor: colors.orange,
    marginHorizontal: wp('1%'),
  },
  valid: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: hp('1.5%'),
    marginTop: hp('1%'),
    color: colors.grey,
    marginLeft: wp('1%'),
  },
});

export default StandingOrder;
