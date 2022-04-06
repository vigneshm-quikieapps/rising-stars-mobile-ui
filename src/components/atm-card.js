/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import {hp, wp, colors, Fontsize} from '../constants';
import {RadioButton} from 'react-native-paper';
import Input from './input';

const AtmCard = props => {
  const yearRef = useRef();
  const monthRef = useRef();
  const cvvRef = useRef();

  const [cardNumber, setCardNumber] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const handleCardNumber = text => {
    let formattedText = text.split(' ').join('');

    if (formattedText.length > 0) {
      formattedText = formattedText.match(new RegExp('.{1,4}', 'g')).join(' ');
    }
    //this.setState({ cardNumber: text });
    setCardNumber(text.split(' ').join(''));
    return formattedText;
  };

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
        {/* <Input
          placeholder="Card Number"
          maxLength={16}
          placeholderTextColor={'black'}
        /> */}

        <TextInput
          placeholder="Card Number"
          maxLength={19}
          returnKeyType="next"
          value={cardNumber}
          keyboardType="numeric"
          onChangeText={text => handleCardNumber(text)}
          onSubmitEditing={() => {
            monthRef.current.focus();
          }}
          blurOnSubmit={false}
          style={styles.textareaForCard}
        />
        <View style={styles.breaks} />
        <Text style={styles.valid}>Valid Thru</Text>

        <View style={{flexDirection: 'row'}}>
          <View>
            {/* <Input
              placeholder={'MM'}
              maxLength={2}
              style={{width: wp('11%')}}
              returnKeyType="next"
              onSubmitEditing={() => {
                yearRef.current.focus();
              }}
              blurOnSubmit={false}
            /> */}
            <TextInput
              placeholder={'MM'}
              maxLength={2}
              style={styles.textareaForCardDetails}
              returnKeyType="next"
              value={month}
              ref={monthRef}
              onChangeText={text => {
                setMonth(text);
                text.length === 2 && yearRef.current.focus();
              }}
              keyboardType="numeric"
              // onSubmitEditing={() => {
              //   yearRef.current.focus();
              // }}
              blurOnSubmit={false}
            />
            <View
              style={{
                borderWidth: 1,
                borderColor: colors.lightgrey,
                width: wp('15%'),
              }}
            />
          </View>
          <View style={{marginLeft: wp('2%')}}>
            {/* <Input
              placeholder={'YY'}
              maxLength={2}
              style={{width: wp('11%')}}
              ref={yearRef}
            /> */}
            <TextInput
              placeholder={'YY'}
              value={year}
              onChangeText={text => {
                setYear(text);
                text.length === 2 && cvvRef.current.focus();
              }}
              maxLength={2}
              style={styles.textareaForCardDetails}
              ref={yearRef}
              keyboardType="numeric"
              onSubmitEditing={() => {
                cvvRef.current.focus();
              }}
              blurOnSubmit={false}
            />
            <View
              style={{
                borderWidth: 1,
                borderColor: colors.lightgrey,
                width: wp('15%'),
              }}
            />
          </View>
          <View style={{marginLeft: wp('4%')}}>
            {/* <Input
              placeholder={'CVV'}
              maxLength={3}
              style={{width: wp('12%')}}
              ref={cvvRef}
            /> */}
            <TextInput
              placeholder={'CVV'}
              maxLength={3}
              keyboardType="numeric"
              style={styles.textareaForCardDetails}
              ref={cvvRef}
            />
            <View
              style={{
                borderWidth: 1,
                borderColor: colors.lightgrey,
                width: wp('28%'),
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
    // height: hp('31.5%'),
    borderWidth: 1,
    // padding: hp('2%'),
    // paddingBottom: hp('1%'),
    marginVertical: hp('2%'),
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('3%'),
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
    // height: hp('20%'),
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.lightgrey,
    // padding: hp('2%'),
    paddingHorizontal: wp('2.5%'),
    marginTop: hp('2%'),
    // paddingTop: hp('1%'),
    overflow: 'hidden',
    paddingTop: hp('1%'),
    paddingBottom: hp('12%'),
    // marginVertical: hp('1%'),
  },
  breaks: {
    borderWidth: 1,
    borderColor: colors.orange,
    marginHorizontal: wp('1%'),
  },
  valid: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: hp('1.5%'),
    // marginTop: hp('1%'),
    paddingTop: hp('2%'),
    color: colors.grey,
    marginLeft: wp('1%'),
  },
  textareaForCard: {
    fontFamily: 'Nunito-Regular',
    width: wp('70%'),
    fontSize: Fontsize,
    color: colors.grey,
  },
  textareaForCardDetails: {
    fontFamily: 'Nunito-Regular',
    width: wp('11%'),
    fontSize: Fontsize,
    color: colors.grey,
  },
});

export default AtmCard;
