/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {Formik} from 'formik';
import {useSelector, useDispatch} from 'react-redux';
import * as Yup from 'yup';
import {
  ErrorMessage,
  TextInputField,
  AppButton,
  CustomLayout,
  SuccessModal,
} from '../../components';
import {colors, Fontsize, hp, wp} from '../../constants';
import {useNavigation} from '@react-navigation/core';
import {resetPasswordData} from '../../redux/action/auth';
import {ScrollView} from 'react-native-gesture-handler';
import Alert from '../../components/alert-box';
import {useRoute} from '@react-navigation/native';
import {resetPassword} from '../../redux/service/request';

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required('Password is required')
    .min(8)
    .label('Password'),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Password must match',
  ),
});

function SetPassword(props) {
  const navigation = useNavigation();
  const [showFailurealert, setFailureAlert] = useState(false);
  const dispatch = useDispatch();
  const otp = useSelector(state => state.ForgetPasswordData.otp);
  const email = useSelector(state => state.ForgetPasswordData.email);
  const mobileNo = useSelector(state => state.ForgetPasswordData.mobileNo);
  const route = useRoute();
  console.log('get data from InputOTP screen', route.params);
  // console.log('email',email);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  return (
    <CustomLayout
      // style={{height: '100%'}}
      back
      backbutton={() => props.navigation.goBack()}
      header
      headertext={'Set password'}
      headertextStyle={{
        width: wp('90%'),
        fontSize: wp('8%'),
      }}
      subheader
      subheadertext={'Setup your password'}
      subheadertextstyle={{fontSize: wp('5.3%'), opacity: 0.5}}>
      <ScrollView>
        {/* <SuccessModal
          title="Password changed successfully"
          isVisible={successModalVisible}
          onDone={() => {
            setSuccessModalVisible(false);
            navigation.navigate('Login');
          }}
        /> */}
        <Alert
          visible={successModalVisible}
          confirm={'Done'}
          success={() => props.navigation.navigate('Login')}
          image={'success'}
          message={`Profile Changed ${'\n'} Successfully`}
        />
        <Formik
          initialValues={{
            password: '',
            passwordConfirmation: '',
          }}
          // onSubmit={values => {
          // console.log('values', values);
          onSubmit={async values => {
            console.log(values);
            let body = {
              mobileNo: route.params.mobileNo,
              email: route.params.email,
              password: values.password,
              otp: route.params.otp,
            };
            // console.log('body', body);
            const reset = async () => {
              const getResp = await resetPassword(body);
              console.log('getResp==>', getResp);
              if (getResp.errors) {
                // alert('OTP has been expired. Please try again');
                setFailureAlert(true);
              } else {
                // alert('password changed successfully');
                setSuccessModalVisible(true);
                //   setTimeout(() => {
                //     setSuccessModalVisible(false);
                //     navigation.navigate('Login');
                //   }, 3000);
              }
            };
            reset();
          }}
          validationSchema={validationSchema}>
          {({
            handleChange,
            handleSubmit,
            errors,
            setFieldTouched,
            touched,
            values,
            initialValues,
          }) => (
            // <View style={{height: '100%'}}>
            <View style={{paddingTop: hp('3%')}}>
              <TextInputField
                placeholder="New Password"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={handleChange('password')}
                onBlur={() => setFieldTouched('password')}
              />
              <ErrorMessage
                style={styles.errorMessage}
                error={errors.password}
                visible={touched.password}
              />
              <TextInputField
                placeholder="Confirm Password"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={handleChange('passwordConfirmation')}
                onBlur={() => setFieldTouched('passwordConfirmation')}
              />
              <ErrorMessage
                style={styles.errorMessage}
                error={errors.passwordConfirmation}
                visible={touched.passwordConfirmation}
              />
              <View style={{height: hp('38%')}} />
              <AppButton
                title="Confirm Password"
                // style={{marginTop: hp('40%')}}
                onPress={handleSubmit}
                //   () => {
                //   dispatch(
                //     resetPasswordData({
                //       mobileNo: mobileNo,
                //       otp: otp,
                //       password: values.password,
                //       email: email,
                //     }),
                //   );
                //   setSuccessModalVisible(true);
                //   setTimeout(() => {
                //     setSuccessModalVisible(false);
                //     navigation.navigate('Login');
                //   }, 3000);
                // }
                // }
              />
            </View>
          )}
        </Formik>
        {showFailurealert ? (
          <Alert
            visible={showFailurealert}
            confirm={'Retry'}
            success={() => {
              setFailureAlert(false);
            }}
            image={'failure'}
            message="OTP has been expired. Please try again"
          />
        ) : null}
      </ScrollView>
    </CustomLayout>
  );
}

export default SetPassword;

const styles = StyleSheet.create({
  bottomText: {
    paddingTop: hp('1%'),
    justifyContent: 'center',
  },
  bottomSubText: {
    color: 'rgb(127, 127, 127)',
    fontSize: Fontsize,
    fontFamily: 'Nunito-Regular',
    alignSelf: 'center',
  },
  star: {
    fontSize: wp('3.7%'),
    fontFamily: 'Nunito-Regular',
    color: '#ff7e00',
  },
  errorMessage: {
    alignSelf: 'flex-end',
    paddingRight: wp('1%'),
    opacity: 0.5,
    fontFamily: 'Nunito-Regular',
  },
  modalView1: {
    margin: wp('5%'),
    backgroundColor: colors.white,
    justifyContent: 'flex-end',
    height: hp('90%'),
    borderRadius: wp('7%'),
    padding: wp('5%'),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: wp('8%'),
    padding: wp('3%'),
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: hp('10%'),
    textAlign: 'center',
    fontSize: wp('10%'),
    paddingHorizontal: wp('10%'),
    fontFamily: 'Nunito-SemiBold',
  },
  item: {
    padding: wp('5%'),
    marginVertical: hp('3%'),
    paddingHorizontal: wp('9%'),
    borderRadius: wp('6%'),
  },
  APIData: {
    color: 'white',
    fontSize: wp('3.3%'),
    fontFamily: 'Nunito-Regular',
  },
  APILabel: {
    fontSize: wp('3.8%'),
    fontFamily: 'Nunito-SemiBold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.modalBackgroundColor,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  radiotext: {
    marginTop: 6,
    fontFamily: 'Nunito-Regular',
    fontSize: Fontsize,
  },
  countrycode: {
    borderWidth: 1,
    borderColor: '#e3e3e3',
    borderRadius: 15,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    height: 'auto',
    marginTop: hp('1.2%'),
    marginVertical: hp('0.599%'),
    width: wp('15%'),
  },
  root: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontFamily: 'Nunito-Regular',
    textAlign: 'center',
    fontSize: 30,
  },
  codeFieldRoot: {
    marginTop: hp('2.5%'),
    marginBottom: hp('7%'),
  },
  cell: {
    width: wp('12%'),
    height: wp('12%'),
    borderRadius: 50,
    lineHeight: 38,
    fontFamily: 'Nunito-Regular',
    fontSize: Fontsize,
    color: colors.orange,
    borderWidth: 1,
    borderColor: colors.lightgrey,
    textAlign: 'center',
  },
  focusCell: {
    borderColor: colors.orange,
  },
  otptitle: {
    fontFamily: 'Nunito-Regular',
    fontSize: Fontsize + wp('1.5%'),
    alignSelf: 'center',
    textDecorationLine: 'underline',
  },
});
