/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {hp, wp, colors, Fontsize} from '../constants';
import {RadioButton} from 'react-native-paper';
import Input from './input';
const CURRENCY = 'USD';
var CARD_TOKEN = null;

/**
 * The method imitates a request to our server.
 *
 * @param creditCardToken
 * @return {Promise<Response>}
 */
function subscribeUser(creditCardToken) {
  return new Promise(resolve => {
    console.log('Credit card token\n', creditCardToken);
    CARD_TOKEN = creditCardToken.id;
    setTimeout(() => {
      resolve({status: true});
    }, 1000);
  });
}
const AtmCard = props => {
  const yearRef = useRef();
  const monthRef = useRef();
  const cvvRef = useRef();

  const [cardNumber, setCardNumber] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [cvv, setCvv] = useState('');
  const handleCardNumber = text => {
    let formattedText = text.split(' ').join('');

    if (formattedText.length > 0) {
      formattedText = formattedText.match(new RegExp('.{1,4}', 'g')).join(' ');
    }
    //this.setState({ cardNumber: text });
    setCardNumber(text.split(' ').join(''));
    return formattedText;
  };
  function getCreditCardToken() {
    // console.log('credit card input', creditCardData);
    // alert()
    const card = {
      'card[number]': cardNumber,
      'card[exp_month]': month,
      'card[exp_year]': year,
      'card[cvc]': cvv,
    };
    return fetch('https://api.stripe.com/v1/tokens', {
      headers: {
        // Use the correct MIME type for your server
        Accept: 'application/json',
        // Use the correct Content Type to send data to Stripe
        'Content-Type': 'application/x-www-form-urlencoded',
        // Use the Stripe publishable key as Bearer
        //   Authorization: `Bearer ${STRIPE_PUBLISHABLE_KEY}`,
        Authorization:
          'Bearer pk_test_51Ksh15SAUwfPAgPBKluCWFDCFIOtcWwvWOEuxSEl1Td74iRMElq1xpFjFgwdVguEBLyK5rMY7RnKk5VU5B4Jt7p900jbGSgiiC',
      },
      // Use a proper HTTP method
      method: 'post',
      // Format the credit card data to a string of key-value pairs
      // divided by &
      body: Object.keys(card)
        .map(key => key + '=' + card[key])
        .join('&'),
    })
      .then(response => response.json())
      .catch(error => console.log(error));
  }
  const onSubmit = async () => {
    // console.log('clicked', cardNumber, month,year,cvv);
    let creditCardToken;
    try {
      // Create a credit card token
      creditCardToken = await getCreditCardToken();
      // console.log("creditCardToken", creditCardToken)
      if (creditCardToken.error) {
        alert('creditCardToken error');
        return;
      }
    } catch (e) {
      console.log('e', e);
      return;
    }
    // Send a request to your server with the received credit card token
    const {error} = await subscribeUser(creditCardToken);
    // Handle any errors from your server
    if (error) {
      alert(error);
    } else {
      let pament_data = await charges();
      console.log('pament_data', pament_data);
      if (pament_data.status == 'succeeded') {
        alert('Payment Successfully');
      } else {
        alert('Payment failed');
      }
    }
  };
  // charges
  const charges = async () => {
    const card = {
      amount: props.amount,
      currency: CURRENCY,
      source: CARD_TOKEN,
      description: 'Developers Sin Subscription',
    };

    return fetch('https://api.stripe.com/v1/charges', {
      headers: {
        // Use the correct MIME type for your server
        Accept: 'application/json',
        // Use the correct Content Type to send data to Stripe
        'Content-Type': 'application/x-www-form-urlencoded',
        // Use the Stripe publishable key as Bearer
        Authorization:
          'Bearer sk_test_51Ksh15SAUwfPAgPBxKtj6tic99dEKqYlAKqTjLdEc2BGybztZDUlRLnJ79zQEm76lF3upHmu4QBxIIMT18PSKwYA00tPIqpN3q',
      },
      // Use a proper HTTP method
      method: 'post',
      // Format the credit card data to a string of key-value pairs
      // divided by &
      body: Object.keys(card)
        .map(key => key + '=' + card[key])
        .join('&'),
    }).then(response => response.json());
  };

  return (
    <View
      style={[
        styles.container,
        {
          height: props.visible ? hp('44.5%') : hp('10%'),
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
              onChangeText={text => {
                setCvv(text);
              }}
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
        <TouchableOpacity onPress={onSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Pay Now</Text>
        </TouchableOpacity>
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
  button: {
    backgroundColor: 'orange',
    width: 150,
    height: 45,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 15,
    color: '#f4f4f4',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default AtmCard;
