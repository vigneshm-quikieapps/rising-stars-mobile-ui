import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';

import {hp, wp, colors} from '../../constants';
import {CustomLayout, TextInputField, AppButton} from './../../components';

function ForgotPassword(props) {
  const [button1, setButton1] = useState(false);
  const [button2, setButton2] = useState(false);

  const [email, setEmail] = useState('');
  const [OTP1, setOTP1] = useState('');

  const [number, setNumber] = useState('');
  const [OTP2, SetOTP2] = useState('');

  const gotoGeneratePassword = () => {
    props.navigation.navigate('GeneratePassword');
  };
  return (
    <CustomLayout style={styles.container}>
      <View>
        <Text style={styles.title}>RESET PASSWORD</Text>
        {/* <Text style={styles.subTitle}>
          Enter the Email associated with your account we will send an OTP to
          that Email.
        </Text> */}
        <TextInputField
          keyboardType="email"
          placeholder="Email"
          onChangeText={setEmail}
          style={styles.inputFiled}
        />
        <AppButton title="Send OTP" style={styles.buttonStyle} />
        <TextInputField
          keyboardType="numeric"
          placeholder="OTP"
          onChangeText={setOTP1}
        />

        <AppButton
          title={button1 && email !== '' && OTP1 !== '' ? 'Verified' : 'Verify'}
          style={[
            styles.buttonStyle,
            {
              backgroundColor:
                button1 && email !== '' && OTP1 !== ''
                  ? 'green'
                  : colors.orange,
            },
          ]}
          onPress={() => {
            if (email === '' && OTP1 === '') {
              alert('Invalid Credential');
            } else {
              setButton1(true);
            }
          }}
        />

        <Text style={styles.subTitle}>
          Enter the Contact Number associated with your account we will send an
          OTP to that Number.
        </Text>
        <TextInputField
          keyboardType="numeric"
          placeholder="Contact Number"
          onChangeText={setNumber}
        />
        <AppButton title="Send OTP" style={styles.buttonStyle} />

        <TextInputField
          keyboardType="numeric"
          placeholder="OTP"
          onChangeText={SetOTP2}
        />

        <AppButton
          title={
            button2 && number !== '' && OTP2 !== '' ? 'Verified' : 'Verify'
          }
          style={[
            styles.buttonStyle,
            {backgroundColor: button2 ? 'green' : colors.orange},
          ]}
          onPress={() => {
            if (number === '' && OTP2 === '') {
              alert('Invalid Credential');
            } else {
              setButton2(true);
            }
          }}
        />
      </View>
      <AppButton
        title="Generate New Password"
        style={[styles.generateButton, {backgroundColor: 'green'}]}
        onPress={gotoGeneratePassword}
      />
    </CustomLayout>
  );
}

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  buttonStyle: {
    marginVertical: hp('1%'),
  },
  title: {
    fontSize: wp('6%'),
  },
  generateButton: {
    // marginVertical: hp('10%'),
  },
  subTitle: {
    fontSize: wp('3.5%'),
    paddingHorizontal: wp('4%'),
    marginTop: hp('2%'),
  },
});
