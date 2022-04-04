import React, {useState} from 'react';
import {useDispatch} from 'react-redux';

import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Button,
} from 'react-native';
// import {AppButton} from './../../components';
import {colors, hp, wp} from '../../constants';
import {useNavigation, useRoute} from '@react-navigation/native';
import {CustomLayout, AppButton} from './../../components';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Alert from '../../components/alert-box';
import {forgetPassword} from '../../redux/service/request';
import {forgetPasswordData} from '../../redux/action/auth';

const CELL_COUNT = 6;

function InputOTPScreen(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  console.log('get otp, mobileNo, email. from fp', route.params);
  // let body = {
  //   mobileNo: route.params.mobileNo,
  //   email: route.params.email,
  // };
  // const handleOTP = async () => {
  //   const getResp = await forgetPassword(body);
  //   console.log('getResp==>', getResp.message, getResp.otp);
  // };
  // handleOTP();
  // console.log('response ==', dispatch(forgetPassword(body)));
  const [value1, setValue1] = useState('');
  const [showFailurealert, setFailureAlert] = useState(false);
  const [OTPAlert, setOTPAlert] = useState(false);
  const [OTPError, setOTPError] = useState(false);
  const [OTP, setOTP] = useState(route.params.otp);
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
    // if (value1 < 6) {
    if (OTP.length < 6) {
      // alert('Please Enter a Valid OTP');
      setFailureAlert(true);
    } else if (OTP == route.params.otp) {
      props.navigation.navigate('SetPassword', {
        mobileNo: route.params.mobileNo,
        otp: route.params.otp,
        email: route.params.email,
      });
      // if (props.twoInputField) {
      //   props.navigation.navigate('SetPassword');
      // } else {
      //   props.navigation.navigate('EnrollStack');
      // }
    } else {
      setOTPAlert(true);
      // alert('OTP must match.Please check OTP.');
    }
  };
  let body = {
    mobileNo: route.params.mobileNo,
    email: route.params.email,
  };
  const resendOTP = async () => {
    const newOTP = await forgetPassword(body);
    console.log('newotp', newOTP.otp);
    if (newOTP.otp) {
      setOTP(newOTP.otp);
    } else {
      setOTPError(false);
    }
  };
  return (
    <CustomLayout
      // style={styles.container}
      back
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
          value={OTP}
          onChangeText={setOTP}
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
        {/* <Text style={{alignSelf: 'center', marginTop: hp('10%')}}>
          This is otp: <Text style={{color: 'red'}}>{route.params.otp}</Text>
        </Text> */}
      </View>
      {showFailurealert ? (
        <Alert
          visible={showFailurealert}
          confirm={'Retry'}
          success={() => {
            setFailureAlert(false);
          }}
          image={'failure'}
          message={'Please Enter a Valid OTP'}
        />
      ) : null}
      {OTPAlert ? (
        <Alert
          visible={OTPAlert}
          confirm={'Retry'}
          success={() => {
            setOTPAlert(false);
          }}
          image={'failure'}
          message="OTP must match.Please check OTP Again"
        />
      ) : null}
      {OTPError ? (
        <Alert
          visible={OTPError}
          confirm={'Retry'}
          success={() => {
            setOTPError(false);
          }}
          image={'failure'}
          message="Something went wrong. Please Try Again"
        />
      ) : null}
      <View style={{height: hp('45%')}} />
      {/* <View style={{height: hp('32%')}} /> */}
      <AppButton
        title={props.twoInputField ? 'Verify' : 'Verify Account'}
        onPress={OTPValidation}
        style={{marginVertical: 10}}
      />
      <TouchableOpacity onPress={resendOTP} style={{alignItems: 'center'}}>
        <Text style={styles.resendText}>RESEND OTP</Text>
      </TouchableOpacity>
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
  resendText: {
    color: colors.orange,
    fontWeight: 'bold',
  },
});

export default InputOTPScreen;
