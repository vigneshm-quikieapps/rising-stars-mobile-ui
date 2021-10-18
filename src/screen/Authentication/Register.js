import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert, Modal, Pressable, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import RBSheet from 'react-native-raw-bottom-sheet';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { useSelector, useDispatch } from 'react-redux'
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';

import { RadioButton, TextInput } from 'react-native-paper';
import ErrorMessage from '../../custom/ErrorMessage';
import TextInputField from '../../custom/TextInputField';
import { colors, Fontsize, hp, wp, Term_Condition } from '../../Constant/Constant';
import InputOTPScreen from './InputOTPScreen';
import AppButton from './../../custom/AppButton';
import PopUp from './../../custom/PopUp';
import CustomLayout from '../../custom/CustomLayout';
import { PostCode, PostDataPass, RegisterData } from '../../redux/action/auth'
import PostComponent from './components/Postcode'
import { fetchMobileOTP } from '../../redux/service/request';
import * as Action from '../../redux/actiontype'


const CELL_COUNT = 6;
const validationSchema = Yup.object().shape({
  fullName: Yup.string().min(3, 'Too Short!').max(20, 'Too Long!').required().label('Full Name'),
  email: Yup.string().required().min(4).email().label('Email'),
  contactNumber: Yup.string().required().label('Mobile Number'),
  password: Yup.string().required("Password is required").min(8).label("Password"),
  passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Password must match'),
  postalCode: Yup.string().label('Postal Code'),
  AddressLine1: Yup.string().min(5).label('AddressLine1'),
  AddressLine2: Yup.string().min(5).label('AddressLine2'),
  cityTown: Yup.string().min(1).label('City/Town'),
});

function Register(props) {
  const dispatch = useDispatch()

  const postcodeData = useSelector(state => state.Postcode.postcode)
  const postdata = useSelector(state => state.Postcodedata.postdata)
  const postsize = useSelector(state => state.Postcodedata.size)
  const isloading = useSelector(state => state.Postcodedata.isloading)
  const error = useSelector(state => state.Postcodedata.error)
  const status = useSelector(state => state.RegisterData.status)
  const Reerror = useSelector(state => state.RegisterData.error)
  const isRegloading = useSelector(state => state.RegisterData.isLoading)

  console.log('error ----------->',Reerror.errors)
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [checked, setChecked] = useState('first');
  const [postcodeshow, setPostCodeshow] = useState(false);
  const [term, setTerm] = useState(false);
  const [temp, setTemp] = useState(false);
  const [main, setMain] = useState(false);
  const [seconds, setSeconds] = React.useState(10);
  const refRBSheet = useRef();

  const star = <Text style={styles.star}>Rising Star</Text>;

  const callPopUp = () => setTerm(!term);

  const timeout = () => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    }
  }

  useEffect(() => {
    timeout()
  });




  let userNumber;
  const handleSubmit1 = no => {
    userNumber = no;
    refRBSheet.current.open();
  };

  const icon = (
    <EvilIcons
      name="search"
      size={40}
      color={colors.grey}
      onPress={() => {
        console.log('Pressed');
      }}
      style={{
        backgroundColor: 'green',
        padding: 120,
        zIndex: 0.5,
      }}
    />
  );
  return (
    <CustomLayout
      header
      headertext={'Parent Registration'}
      headertextStyle={{
        width: wp('90%'),
        fontSize: wp('8%'),
      }}
      subheader
      subheadertext={'Enter your details to register'}
      subheadertextstyle={styles.subtitle}
      back
      backbutton={() => props.navigation.goBack()}>
      <Formik
        initialValues={{
          fullName: '',
          email: '',
          password: '',
          passwordConfirmation: '',
          contactNumber: '',
          mobileNoOTP: '',
          postCode: '',
          addressLine1: '',
          addressLine2: '',
          cityTown: '',
        }}
        onSubmit={values => {

          if (values.mobileNoOTP.length === 0) {
            fetchMobileOTP(values.contactNumber)
            console.log(values)
            timeout()
            refRBSheet.current.open()
          } else if (postsize !== 0) {
            values.addressLine1 = postdata.addressline1
            values.addressLine2 = postdata.addressline2
            values.cityTown = postdata.posttown
            console.log(values)
            dispatch(RegisterData(values))
            if (status.message === "created successfully") {
              props.navigation.navigate('Login')
            }
            if (Reerror != '') {
              alert(`${Reerror}`)
            }
          }
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
              placeholder="Your Full Name*"
              style={[styles.inputField, { marginTop: hp('0.1%') }]}
              onChangeText={handleChange('fullName')}
              autoCapitalize="none"
              autoCorrect={false}
            // onBlur={() => setFieldTouched('fullName')}
            />
            <ErrorMessage
              style={styles.errorMessage}
              error={errors.fullName}
              visible={touched.fullName}
            />

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

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={styles.countrycode}>
                <Text style={{ fontSize: wp('4.1%'), color: colors.grey }}>+44</Text>
              </View>
              <TextInputField
                placeholder="Mobile Number *"
                // value={values.contactNumber}
                onChangeText={handleChange("contactNumber")}
                maxLength={10}
                keyboardType="number-pad"
                style={{ width: wp('75%') }}
                onBlur={() => setFieldTouched('contactNumber')}
              />
            </View>
            <ErrorMessage
              style={styles.errorMessage}
              error={errors.contactNumber}
              visible={touched.contactNumber}
            />
           
            <TextInputField
              placeholder="Password*"
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
              placeholder="Confirm Password*"
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

            <TextInputField
              placeholder="Postcode"
              onChangeText={handleChange('postCode')}
              autoCapitalize="none"
              keyboardType="default"
              autoCorrect={false}
              onBlur={() => setFieldTouched('postCode')}
              booleanFlag={true}
              right={
                <TextInput.Icon
                  name={() => <EvilIcons name="search" size={30} color={"#ff7e00"} />}
                  onPress={() => {
                    if (values.postCode.length <= 6) {
                      alert('Please Enter a Valid PostCode');
                    } else {
                      const data = {}
                      setPostCodeshow(!postcodeshow)
                      dispatch(PostDataPass(data, 0))
                      dispatch(PostCode(values.postCode))
                    }

                  }}
                />
              }
            />

            <PostComponent
              data={postcodeData}
              visible={postsize !== 0 ? !postcodeshow : postcodeshow}
              title={values.postCode}
              ClosePopUp={() => setPostCodeshow(!postcodeshow)}
              ManuallyButton={() => {
                setPostCodeshow(!postcodeshow)
                { temp === true ? null : setTemp(!temp) }
                values.addressLine1 = ''
                values.addressLine2 = ''
                values.cityTown = ''
              }}
            />

            <ErrorMessage
              style={styles.errorMessage}
              error={errors.postCode}
              visible={touched.postCode}
            />

            {postsize !== 0 || temp ? (
              <>
                <TextInputField
                  placeholder="Address Line 1"
                  onChangeText={postsize !== 0 ? postdata.addressline1 : handleChange('addressLine1')}
                  autoCapitalize="none"
                  editable={postsize !== 0 ? false : true}
                  autoCorrect={false}
                  onBlur={() => setFieldTouched('addressLine1')}
                  value={postsize !== 0 ? postdata.addressline1 : values.addressLine1}

                />
                <ErrorMessage
                  style={styles.errorMessage}
                  error={errors.addressLine1}
                  visible={touched.addressLine1}
                />

                <TextInputField
                  placeholder="Address Line 2"
                  onChangeText={postsize !== 0 ? postdata.addressline2 : handleChange('addressLine2')}
                  autoCapitalize="none"
                  editable={postsize !== 0 ? false : true}
                  autoCorrect={false}
                  onBlur={() => setFieldTouched('addressLine2')}
                  value={postsize !== 0 ? postdata.addressline2 : values.addressLine2}

                />
                <ErrorMessage
                  style={styles.errorMessage}
                  error={errors.addressLine2}
                  visible={touched.addressLine2}
                />

                <TextInputField
                  placeholder="Town / City"
                  onChangeText={postsize !== 0 ? postdata.posttown : handleChange('cityTown')}
                  autoCapitalize="none"
                  editable={postsize !== 0 ? false : true}
                  autoCorrect={false}
                  onBlur={() => setFieldTouched('cityTown')}
                  value={postsize !== 0 ? postdata.posttown : values.cityTown}

                />
                <ErrorMessage
                  style={styles.errorMessage}
                  error={errors.cityTown}
                  visible={touched.cityTown}
                />
              </>
            ) : null}

            <View>


              <PopUp
                animationType="fade"
                transparent={true}
                visible={term}
                onRequestClose={() => {
                  setTerm(!term);
                }}>

                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={{ fontFamily: 'Nunito-Regular' }}>
                      {Term_Condition}
                    </Text>
                    <AppButton
                      title="close"
                      style={{ width: '30%' }}
                      onPress={() => setTerm(!term)}
                    />
                  </View>
                </View>
              </PopUp>

              {error ? alert({ error }) : isloading ?
                <ActivityIndicator size="large" color={colors.orange} />
                :
                <AppButton
                  title={main ? isRegloading ? <ActivityIndicator size="large" color="white" /> : "Register" : "Send OTP"}
                  onPress={handleSubmit}
                  style={{
                    marginVertical: hp('0%'),
                    fontFamily: 'Nunito-SemiBold',
                    marginTop: hp('12%')
                  }}
                />}

              <Text
                style={{
                  flex: 1,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  fontFamily: 'Nunito-Regular',
                  fontSize: wp('2.6%'),
                  color: "#7f7f7f"
                }}>
                By registering you are agreed to our {' '}
                <Text style={{ color: colors.orange }} onPress={callPopUp}>
                  Terms and Conditions
                </Text>
              </Text>
            </View>
            <RBSheet
              ref={refRBSheet}
              closeOnDragDown={true}
              closeOnPressMask={false}
              customStyles={{
                wrapper: {
                  backgroundColor: colors.blackOpacity,
                },
                draggableIcon: {
                  backgroundColor: colors.lightgrey,
                },
                container: {
                  height: hp('40%'),
                  borderTopRightRadius: 16,
                  borderTopLeftRadius: 16,
                },
              }}>
              <View style={{ paddingHorizontal: wp('5%') }}>
                <Text style={styles.otptitle}>Enter Your OTP</Text>
                <CodeField
                  ref={ref}
                  {...prop}
                  value={value}
                  onChangeText={setValue}
                  cellCount={CELL_COUNT}
                  rootStyle={styles.codeFieldRoot}
                  keyboardType="number-pad"
                  textContentType="oneTimeCode"
                  renderCell={({ index, symbol, isFocused }) => (
                    <Text
                      key={index}
                      style={[styles.cell, isFocused && styles.focusCell]}
                      onLayout={getCellOnLayoutHandler(index)}>
                      {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                  )}
                />

                <AppButton title="Verification" style={{ margin: 0 }} onPress={() => {
                  if (value.length < 6) {
                    alert("Please Enter Valid OTP")
                  } else {
                    values.mobileNoOTP = value
                    setMain(!main)
                    refRBSheet.current.close()
                  }
                }} />
                <Text style={{ fontFamily: 'Nunito-Regular', alignSelf: 'center', marginTop: hp('1%'), fontSize: Fontsize }}>
                  Resend OTP {seconds === 0 ? <Text style={{ color: colors.orange }} onPress={() => fetchMobileOTP(values.contactNumber)}>Press</Text> : <Text>in {seconds} sec</Text>}
                </Text>
              </View>
            </RBSheet>
          </>
        )}
      </Formik>
    </CustomLayout>
  );
}

export default Register;

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
    color: "#ff7e00",
  },
  errorMessage: {
    alignSelf: 'flex-end',
    paddingRight: wp('1%'),
    opacity: 0.5,
    fontFamily: 'Nunito-Regular'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.modalBackgroundColor,
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
  title: {
    fontSize: wp('8%'),
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
    borderColor: "#e3e3e3",
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
    padding: 20
  },
  title: {
    fontFamily: 'Nunito-Regular',
    textAlign: 'center',
    fontSize: 30
  },
  codeFieldRoot: {
    marginTop: hp('2.5%'),
    marginBottom: hp('7%')
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
    textDecorationLine: 'underline'
  }
});
