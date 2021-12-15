/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import TextInputField from './text-input-field';
import ErrorMessage from './error-message';
import {wp, colors, hp} from '../constants';
import Button from './button';
import AntIcon from 'react-native-vector-icons/AntDesign';
import PopUpCard from './pop-up-card';

export default function EmergencyCard({
  head,
  visibleName,
  value,
  crossButton,
  valueName,
  addButton,
  disabled,
  addButtons,
  children,
  errorName,
  errorContactNumber,
  visibleContactNumber,
  valuesContactNumber,
  onPress,
  onBlurName,
  onChangeTextName,
  onChangeTextContact,
  onChangeRelation,
  onBlurContact,
}) {
  return (
    <View style={{flex: 1}}>
      {head && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.emergency}>
            {'Emergency Contact (Secondary)'}
          </Text>
          <Button style={styles.cross} onPress={crossButton}>
            <AntIcon name="minus" size={hp('2%')} color={colors.white} />
          </Button>
        </View>
      )}

      <TextInputField
        placeholder="Name *"
        value={valueName}
        onChangeText={onChangeTextName}
        onBlur={onBlurName}
      />

      <ErrorMessage
        style={styles.errorMessage}
        error={errorName}
        visible={visibleName}
      />

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={styles.countryCode}>
          <Text style={{fontSize: wp('4%'), color: colors.grey}}>+44</Text>
        </View>
        <TextInputField
          placeholder="Mobile Number *"
          value={valuesContactNumber}
          onChangeText={onChangeTextContact}
          maxLength={10}
          keyboardType="number-pad"
          style={{width: wp('75%')}}
          onBlur={onBlurContact}
        />
      </View>

      <ErrorMessage
        style={styles.errorMessage}
        error={errorContactNumber}
        visible={visibleContactNumber}
      />

      {children}
      {addButtons && (
        <View style={styles.bottom}>
          <Button disabled={disabled} style={styles.button} onPress={addButton}>
            <AntIcon name="plus" size={hp('3%')} color={colors.white} />
          </Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  errorMessage: {
    alignSelf: 'flex-end',
    paddingRight: wp('1%'),
    opacity: 0.5,
  },
  countryCode: {
    borderWidth: 1,
    borderColor: '#e3e3e3',
    borderRadius: 10,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    height: 'auto',
    marginTop: hp('1.2%'),
    marginVertical: hp('0.59%'),
    width: wp('15%'),
  },
  emergency: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: hp('2.5%'),
    marginTop: hp('2.5%'),
  },
  cross: {
    height: hp('2.5%'),
    width: hp('2.5%'),
    backgroundColor: colors.orange,
    marginTop: hp('3%'),
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: hp('8%'),
    width: hp('8%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: colors.orange,
  },
  bottom: {
    flexDirection: 'row',
    marginTop: hp('0%'),
    alignItems: 'center',

    // justifyContent: 'flex-start',
    // backgroundColor: 'pink',
  },
  bottomText: {
    fontFamily: 'Nunito-SemiBold',
    // fontWeight: 'bold',
    marginLeft: wp('2%'),
    marginTop: hp('3%'),
    fontSize: wp('4%'),
    // justifyContent: 'center',
    // alignSelf: 'center',
    // alignItems: 'center',
    // alignContent: 'center',
    // backgroundColor: 'pink',
  },
});
