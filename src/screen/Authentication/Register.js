import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert, Modal, Pressable, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import RBSheet from 'react-native-raw-bottom-sheet';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { useSelector, useDispatch } from 'react-redux'

import { RadioButton, TextInput } from 'react-native-paper';
import ErrorMessage from '../../custom/ErrorMessage';
import TextInputField from '../../custom/TextInputField';
import { colors, Fontsize, hp, wp, Term_Condition } from '../../Constant/Constant';
import InputOTPScreen from './InputOTPScreen';
import AppButton from './../../custom/AppButton';
import PopUp from './../../custom/PopUp';
import CustomLayout from '../../custom/CustomLayout';
import { PostCode, PostDataPass } from '../../redux/action/auth'
import PostComponent from './components/Postcode'
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
  const [postcodeshow, setPostCodeshow] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);





  const [temp, setTemp] = useState(false);
  const refRBSheet = useRef();
  const star = <Text style={styles.star}>Rising Star</Text>;
  const callPopUp = () => setModalVisible1(!modalVisible1);

  const [checked, setChecked] = useState('first');
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
      // backbutton={onHandleBackButton}>
      backbutton={() => props.navigation.goBack()}>
      <Formik
        initialValues={{
          fullName: '',
          email: '',
          password: '',
          passwordConfirmation: '',
          contactNumber: '',
          postCode: '',
          addressLine1: '',
          addressLine2: '',
          cityTown: '',
        }}
        onSubmit={values => {
          if (postsize !== 0) {
            values.addressLine1 = postdata.addressline1
            values.addressLine2 = postdata.addressline2
            values.cityTown = postdata.posttown
          }
          console.log(values)
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
                // editable={false}
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
                // editable={false}
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
                // editable={false}
                />
                <ErrorMessage
                  style={styles.errorMessage}
                  error={errors.cityTown}
                  visible={touched.cityTown}
                />
              </>
            ) : null}

            <View>
              <View style={styles.bottomText}>
                <Text style={styles.bottomSubText}>
                  I would like to receive {star} newsletter
                </Text>
                <Text
                  style={[
                    styles.bottomSubText,
                    { alignSelf: 'center', marginBottom: hp('0%') },
                  ]}>
                  and other communications.
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  marginBottom: hp('0%')
                }}>
                <View style={{ flexDirection: 'row' }}>
                  <RadioButton
                    value="first"
                    status={checked === 'first' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('first')}
                    color={"#ff7e00"}
                  />
                  <Text
                    style={[styles.radiotext, { color: checked === 'first' ? colors.black : colors.blackOpacity, }]}>
                    Yes, please
                  </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <RadioButton
                    value="second"
                    status={checked === 'second' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('second')}
                    color={"#ff7e00"}
                  />
                  <Text
                    style={[styles.radiotext, { color: checked === 'second' ? colors.black : colors.blackOpacity }]}>
                    No thanks
                  </Text>
                </View>
              </View>
              <PopUp
                animationType="fade"
                transparent={true}
                visible={modalVisible1}
                onRequestClose={() => {
                  setModalVisible1(!modalVisible1);
                }}>

                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={{ fontFamily: 'Nunito-Regular' }}>
                      {Term_Condition}
                    </Text>
                    <AppButton
                      title="close"
                      style={{ width: '30%' }}
                      onPress={() => setModalVisible1(!modalVisible1)}
                    />
                  </View>
                </View>
              </PopUp>

              <AppButton
                title="Register"
                onPress={handleSubmit}
                style={{
                  marginVertical: hp('0%'),
                  fontFamily: 'Nunito-SemiBold',
                }}
              />

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
          </>
        )}
      </Formik>

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: colors.blackOpacity,
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
          container: {
            height: '45%',
            borderTopRightRadius: 16,
            borderTopLeftRadius: 16,
          },
        }}>
        <InputOTPScreen
          contactNumber={userNumber}
          navigation={props.navigation}
        />
      </RBSheet>
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
    // height: 450,
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
});
