import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
// import {AppButton} from './../../components';
import {hp, wp} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import {CustomLayout, AppButton} from './../../components';
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

  const ref = useBlurOnFulfill({value1, cellCount: CELL_COUNT});
  const [propss1, getCellOnLayoutHandler1] = useClearByFocusCell({
    value1,
    setValue1,
  });

  const RESEND_OTP_TIME_LIMIT = 90;
  const [resendButtonDisabledTime, setResendButtonDisabledTime] = useState(
    RESEND_OTP_TIME_LIMIT,
  );

  let resendOtpTimerInterval;

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

  // useEffect(() => {
  //   startResendOtpTimer();
  //   return () => {
  //     if (resendOtpTimerInterval) {
  //       clearInterval(resendOtpTimerInterval);
  //     }
  //   };
  // }, [resendButtonDisabledTime]);

  const OTPValidation = () => {
    if (value1 < 6) {
      alert('Please Enter a Valid OTP');
    } else {
      props.navigation.navigate('SetPassword');
      // if (props.twoInputField) {
      //   props.navigation.navigate('SetPassword');
      // } else {
      //   props.navigation.navigate('EnrollStack');
      // }
    }
  };
  return (
    <CustomLayout
      // style={styles.container}
      backbutton={() => props.navigation.goBack()}
      header
      headertextStyle={{
        width: wp('90%'),
        fontSize: wp('8%'),
      }}
      headertext={`OTP`}
      subheader
      subheadertext={'Enter OTP'}
      subheadertextstyle={{
        opacity: 0.5,
        width: wp('90%'),
      }}>
      <View style={{paddingTop: hp('3%')}}>
        <CodeField
          ref={ref}
          {...props}
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
      </View>
      <View style={{height: hp('48%')}} />
      <AppButton
        title={props.twoInputField ? 'Verify' : 'Verify Account'}
        onPress={OTPValidation}
        style={{marginVertical: 30}}
      />
    </CustomLayout>
    // <SafeAreaView style={{paddingHorizontal: wp('4%')}}>
    //   <KeyboardAvoidingView
    //     behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    //     // style={styles.root}
    //   >
    //     <Text style={styles.title}>OTP Verificaton</Text>
    //     {props.twoInputField ? (
    //       <Text style={[styles.subtitle, {alignSelf: 'flex-start'}]}>
    //         Enter Mobile OTP
    //       </Text>
    //     ) : (
    //       <>
    //         <Text style={[styles.subtitle, {marginTop: hp('2%')}]}>
    //           Enter the verificaton code we
    //         </Text>
    //         <Text style={[styles.subtitle, {marginBottom: hp('5%')}]}>
    //           {' '}
    //           just sent to your Number.
    //         </Text>
    //       </>
    //     )}

    //     <CodeField
    //       ref={ref}
    //       {...props}
    //       value={value1}
    //       onChangeText={setValue1}
    //       cellCount={CELL_COUNT}
    //       rootStyle={styles.codeFieldRoot}
    //       keyboardType="number-pad"
    //       textContentType="oneTimeCode"
    //       renderCell={({index, symbol, isFocused}) => (
    //         <Text
    //           key={index}
    //           style={[styles.cell, isFocused && styles.focusCell]}
    //           onLayout={getCellOnLayoutHandler1(index)}>
    //           {symbol || (isFocused ? <Cursor /> : null)}
    //         </Text>
    //       )}
    //     />

    //     <AppButton
    //       title={props.twoInputField ? 'Verify' : 'Verify Account'}
    //       onPress={OTPValidation}
    //       style={{marginVertical: 30}}
    //     />
    //   </KeyboardAvoidingView>
    // </SafeAreaView>
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
    // borderRadius: 10,
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
  },
});

export default InputOTPScreen;
