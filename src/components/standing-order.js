/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {hp, wp, colors} from '../constants';
import {RadioButton} from 'react-native-paper';
import NewAppButton from './new-app-button';

const StandingOrder = props => {
  const  [selected,setSelected] = useState(0);
  return (
    <View
      style={[
        styles.container,
        {
          height: props.visible ? hp('34.5%') : hp('10%'),
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
            Confirm Standing Order
          </Text>
        </View>
      </View>
      <View style={{display: props.visible ? 'flex' : 'none'}}>
        <NewAppButton
          title={"I've setup Standing Order"}
          selected={selected ===1?true:false}
          onPress={() => {
            setSelected(1)
            props.isStandingOrderHandler(1)
          }}
          style={{width: wp('83%')}}
        />
        <NewAppButton
          title={"I'll setup Standing Order late"}
          selected={selected ===2?true:false}
          onPress={() => {
            setSelected(2)
            props.isStandingOrderHandler(2)
          }}
          style={{width: wp('83%')}}
          emptyContainer={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default StandingOrder;
