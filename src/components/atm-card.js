/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {hp, wp, colors} from '../constants';
import {RadioButton} from 'react-native-paper';
import Input from './input';

const AtmCard = props => {
  return (
    <View
      style={[
        styles.container,
        {
          height: props.visible ? hp('31.5%') : hp('10%'),
          borderColor: props.visible ? colors.orange : '#f2f2f2',
          backgroundColor: props.visible ? 'white' : '#f2f2f2',
        },
      ]}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <RadioButton
          color={colors.orange}
          onPress={props.onPress}
          status={props.visible ? 'checked' : 'unchecked'}
        />
        <View style={{marginLeft: wp('3%')}}>
          <Text
            style={[
              styles.cardText,
              {fontSize: props.visible ? hp('2.5%') : wp('5%')},
            ]}>
            Cards
          </Text>
          <Text style={styles.cardOption}>Credit / Debit / ATM Card</Text>
        </View>
      </View>
      <View
        style={[
          styles.cardDetails,
          {display: !props.visible ? 'none' : 'flex'},
        ]}>
        <Input placeholder="Card Number" placeholderTextColor={'black'} />
        <View style={styles.breaks} />
        <Text style={styles.valid}>Valid thru</Text>

        <View style={{flexDirection: 'row'}}>
          <View>
            <Input placeholder={'MM'} style={{width: wp('11%')}} />
            <View
              style={{
                borderWidth: 1,
                borderColor: colors.lightgrey,
                width: wp('15%'),
              }}
            />
          </View>
          <View style={{marginLeft: wp('2%')}}>
            <Input placeholder={'YY'} style={{width: wp('11%')}} />
            <View
              style={{
                borderWidth: 1,
                borderColor: colors.lightgrey,
                width: wp('15%'),
              }}
            />
          </View>
          <View style={{marginLeft: wp('4%')}}>
            <Input placeholder={'CVV'} style={{width: wp('12%')}} />
            <View
              style={{
                borderWidth: 1,
                borderColor: colors.lightgrey,
                width: wp('35%'),
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: hp('31.5%'),
    borderWidth: 1,
    padding: hp('2%'),
    marginVertical: hp('1%'),
    borderRadius: 10,
  },
  cardText: {
    fontFamily: 'Nunito-SemiBold',
    // fontWeight: "bold",
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

export default AtmCard;
