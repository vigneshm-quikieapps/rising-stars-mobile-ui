import React, {useState, useRef} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  CustomLayout,
  TextInputField,
  AppButton,
  ErrorMessage,
} from './../../components';
import {colors, Fontsize, hp, wp} from './../../constants';
import RBSheet from 'react-native-raw-bottom-sheet';
import InputOTPScreen from './InputOTPScreen';
import {forgetPasswordData} from '../../redux/action/auth';
import {ScrollView} from 'react-native-gesture-handler';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {CodeField} from 'react-native-confirmation-code-field';
import {forgetPassword} from '../../redux/service/request';
import Alert from '../../components/alert-box';

function CreateNewPassword(props) {
  const refRBSheet = useRef();
  const dispatch = useDispatch();

  // const handleSubmit1 = no => {
  //   userNumber = no;
  //   refRBSheet.current.open();
  // };

  const [button1, setButton1] = useState(false);
  const [button2, setButton2] = useState(false);

  const [email, setEmail] = useState('');
  const [OTP1, setOTP1] = useState('');

  const [number, setNumber] = useState('');
  const [OTP2, SetOTP2] = useState('');
  const [modalVisible, setModalVisible] = useState(true);
  const [showFailurealert, setFailureAlert] = useState(false);

  const gotoGeneratePassword = () => {
    // props.navigation.navigate('GeneratePassword');
    let body = {
      email: email,
      mobileNo: number,
    };
    dispatch(forgetPasswordData(body));
    // refRBSheet.current.open();
    props.navigation.navigate('InputOTPScreen');
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required().min(4).email().label('Email'),
    contactNumber: Yup.string().required().label('Mobile Number').min(10),
  });

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
      headertext={'Forgot Password'}
      subheader
      subheadertext={'Enter your details to get OTP'}
      subheadertextstyle={{
        opacity: 0.5,
        width: wp('90%'),
      }}>
      <Formik
        initialValues={{
          email: '',
          contactNumber: '',
          // mobileNoOTP: '',
          // fullName: '',
        }}
        onSubmit={async values => {
          // console.log(values.contactNumber, values.email);
          let body = {
            mobileNo: `+91${values.contactNumber}`,
            email: values.email,
          };
          const handleOTP = async () => {
            const getResp = await forgetPassword(body);
            console.log('getResp==>', getResp);
            if (getResp.errors) {
              // alert('Email or Phone No. is incorrect');
              setFailureAlert(true);
            } else {
              props.navigation.navigate('InputOTPScreen', {
                otp: getResp.otp,
                mobileNo: `+91${values.contactNumber}`,
                email: values.email,
              });
            }
          };
          handleOTP();
          // props.navigation.navigate('InputOTPScreen', {
          //   email: values.email,
          //   mobileNo: `+91${values.contactNumber}`,
          // });
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
          <>
            <TextInputField
              placeholder="Email*"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={handleChange('email')}
              onBlur={() => setFieldTouched('email')}
            />
            <ErrorMessage
              style={styles.errorMessage}
              error={errors.email}
              visible={touched.email}
            />
            <Text style={styles.orText}>Or</Text>

            <TextInputField
              placeholder="Mobile Number *"
              // value={values.contactNumber}
              onChangeText={handleChange('contactNumber')}
              maxLength={10}
              keyboardType="number-pad"
              // style={{width: wp('75%')}}
              onBlur={() => setFieldTouched('contactNumber')}
            />
            <ErrorMessage
              style={styles.errorMessage}
              error={errors.contactNumber}
              visible={touched.contactNumber}
            />
            <View style={{height: hp('26%')}} />

            <AppButton
              title="Send OTP"
              onPress={handleSubmit}
              style={{
                marginVertical: hp('0%'),
                fontFamily: 'Nunito-SemiBold',
                // marginTop: hp('1%'),
                marginTop: hp('12%'),
              }}
            />
          </>
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
          message="Email or Phone No. is incorrect"
          // success={() => props.navigation.navigate('Login')}
          // image={'failure'}
          // message={'Something Went Wrong'}
        />
      ) : null}

      {/* <View style={{paddingTop: hp('3%')}}>
        <TextInputField
          keyboardType="email"
          placeholder="Email"
          onChangeText={setEmail}
        />
        <Text style={styles.orText}>Or</Text>

        <TextInputField
          keyboardType="numeric"
          placeholder="Contact Number"
          onChangeText={setNumber}
        />
      </View>
      <View style={{height: hp('35%')}} />
      <AppButton
        title="Send OTP"
        style={[styles.generateButton, {backgroundColor: colors.orange}]}
        onPress={gotoGeneratePassword}
      /> */}
    </CustomLayout>
  );
}

export default CreateNewPassword;

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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.modalBackgroundColor,
  },
  orText: {
    opacity: 0.5,
    textAlign: 'center',
    paddingVertical: 10,
  },
  // register css
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
  codeFieldRoot: {
    marginTop: hp('2.5%'),
    marginBottom: hp('7%'),
  },
});
