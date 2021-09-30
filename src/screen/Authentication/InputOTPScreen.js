import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, StyleSheet, Button} from 'react-native';
import AppButton from './../../custom/AppButton';
import {hp, wp} from '../../Constant/Constant';
import {useNavigation} from '@react-navigation/native';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const CELL_COUNT = 6;

function InputOTPScreen(props) {
  const navigation = useNavigation();
  const [value1, setValue1] = useState('');
  // const [value2, setValue2] = useState('');
  // const [value3, setValue3] = useState('');

  const ref = useBlurOnFulfill({value1, cellCount: CELL_COUNT});
  const [propss1, getCellOnLayoutHandler1] = useClearByFocusCell({
    value1,
    setValue1,
  });
  // const [propss2, getCellOnLayoutHandler2] = useClearByFocusCell({
  //   value2,
  //   setValue2,
  // });
  // const [propss3, getCellOnLayoutHandle3] = useClearByFocusCell({
  //   value3,
  //   setValue3,
  // });
  const RESEND_OTP_TIME_LIMIT = 90;
  const [resendButtonDisabledTime, setResendButtonDisabledTime] = useState(
    RESEND_OTP_TIME_LIMIT,
  );

  let resendOtpTimerInterval;
  //to start resent otp option
  const startResendOtpTimer = () => {
    if (resendOtpTimerInterval) {
      clearInterval(resendOtpTimerInterval);
    }
    resendOtpTimerInterval = setInterval(() => {
      if (resendButtonDisabledTime <= 0) {
        clearInterval(resendOtpTimerInterval);
      } else {
        setResendButtonDisabledTime(resendButtonDisabledTime - 1);
      }
    }, 1000);
  };

  //start timer on screen on launch
  useEffect(() => {
    startResendOtpTimer();
    return () => {
      if (resendOtpTimerInterval) {
        clearInterval(resendOtpTimerInterval);
      }
    };
  }, [resendButtonDisabledTime]);

  const OTPValidation = () => {
    if (value1 < 6) {
      alert('Please Enter a Valid OTP');
    } else {
      if (props.twoInputField) {
        props.navigation.navigate('Login');
      } else {
        props.navigation.navigate('EnrollStack');
      }
    }
  };
  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.title}>OTP Verificaton</Text>
      {props.twoInputField ? (
        <Text style={[styles.subtitle, {alignSelf: 'flex-start'}]}>
          Enter Mobile OTP
        </Text>
      ) : (
        <>
          <Text style={[styles.subtitle, {marginTop: hp('2%')}]}>
            Enter the verificaton code we
          </Text>
          <Text style={[styles.subtitle, {marginBottom: hp('5%')}]}>
            {' '}
            just sent to your Number.
          </Text>
        </>
      )}

      {/* {props.twoInputField ? (
        <>
          <Text style={[styles.subtitle, {alignSelf: 'flex-start'}]}>
            Enter Mobile OTP
          </Text>
          <CodeField
            ref={ref}
            {...props}
            // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
            value={value1}
            onChangeText={setValue1}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler1(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
          <Text style={[styles.subtitle, {alignSelf: 'flex-start'}]}>
            Enter Email OTP
          </Text>

          <CodeField
            ref={ref}
            {...props}
            // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
            value={value2}
            onChangeText={setValue2}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler2(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
        </>
      ) : (
       
      )} */}
      {/* <Text style={[styles.subtitle, {alignSelf: 'flex-start'}]}>
        Enter Mobile OTP
      </Text> */}
      <CodeField
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={value1}
        onChangeText={setValue1}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler1(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />

      {/* <Text style={{alignSelf: 'center', paddingVertical: 10}}>
        Resend OTP in 50
      </Text> */}

      <AppButton
        title={props.twoInputField ? 'Verify' : 'Verify Account'}
        onPress={OTPValidation}
        style={{marginVertical: 30}}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
  subtitle: {
    fontSize: wp('4%'),
    maxWidth: '85%',
    alignSelf: 'center',
    // paddingVertical: 10,
  },
});

export default InputOTPScreen;
