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
import { PostCode } from '../../redux/action/auth'
import PostComponent from './components/Postcode'

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
  const [postcodeshow, setPostCodeshow] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [addressData, setAddressData] = useState();
  const [selectedId, setSelectedId] = useState(null);
  const [address1, setAddress1] = useState();
  const [address2, setAddress2] = useState();
  const [city, setCity] = useState();
  const [name, setName] = useState("");
  const [postCode, setPostCode] = useState();
  const [APIPostCode, setAPIPostCode] = useState();

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
  // useEffect(() => {
  //   let url = `https://ws.postcoder.com/pcw/PCW45-12345-12345-1234X/address/UK/${APIPostCode}?format=json&lines=2`;
  //   // let url = `https://ws.postcoder.com/pcw/PCW45-12345-12345-1234X/address/UK/NR14%207PZ?format=json&lines=2`;
  //   fetch(`${url}`, {
  //     method: 'GET',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       let index = 0;
  //       data.map(item => {
  //         item['id'] = index;
  //         index++;
  //       });
  //       // console.log('====================================');
  //       // console.log('ADDRESS DATA', data);
  //       // console.log('====================================');
  //       setAddressData(data);
  //     })
  //     .catch(error => console.log('ERRORS', error));
  // }, [APIPostCode]);

  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={styles.APILabel}>AddressLine 1</Text>
      <Text style={styles.APIData}>{item.addressline1}</Text>

      <Text style={styles.APILabel}>AddressLine 2</Text>
      <Text style={styles.APIData}>{item.addressline2}</Text>

      <Text style={[styles.APILabel, { marginLeft: -1 }]}>County</Text>
      <Text style={styles.APIData}>{item.county}</Text>

      <Text style={styles.APILabel}>PostCode</Text>
      <Text style={styles.APIData}>{item.postcode}</Text>

      <Text style={styles.APILabel}>Town / City</Text>
      <Text style={styles.APIData}>{item.posttown}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    const backgroundColor =
      item.id === selectedId ? colors.lineColor : colors.orange;
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.id);
          setAddress1(item.addressline1);
          setAddress2(item.addressline2);
          setPostCode(item.postcode);
          setCity(item.posttown);
        }}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  const onHandleBackButton = () => {
    props.navigation.goBack();
  };
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
      backbutton={onHandleBackButton}>
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
            {/* {/* MODAL CODE START */}
            {/* <View style={styles.centeredView}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                  setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView1}>
                  <View style={styles.modalView1}>
                    <FlatList
                      data={addressData}
                      renderItem={renderItem}
                      keyExtractor={item => item.id}
                      extraData={selectedId}
                    />
                    <View>
                      <Pressable
                        onPress={() => setModalVisible(!modalVisible)}
                        style={{ flexDirection: 'row' }}>
                        <AppButton
                          title="Enter Manually"
                          style={{
                            fontFamily: 'Nunito-SemiBold',
                            marginHorizontal: wp('2%'),
                          }}
                          onPress={() => {
                            setModalVisible(!modalVisible);
                            setTemp(!temp);
                            setSelectedId(null);
                          }}
                        />
                        <AppButton
                          title="Close"
                          style={{
                            fontFamily: 'Nunito-SemiBold',
                          }}
                          onPress={() => setModalVisible(!modalVisible)}
                        />
                      </Pressable>
                    </View>
                  </View>
                </View>
              </Modal>
            </View> */}

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
                <Text style={{ fontSize: wp('4%'), color: colors.grey }}>+44</Text>
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
                      console.log(values.postCode.length);
                      alert('Please Enter a Valid PostCode');
                    } else {
                      console.log(values.postCode)
                      setPostCodeshow(!postcodeshow)
                      dispatch(PostCode(values.postCode))
                    }

                  }}
                />
              }
            />
            <PostComponent
              visible={postcodeshow}
              title={values.postCode}
              ClosePopUp={() =>setPostCodeshow(!postcodeshow)}
            />
           
            <ErrorMessage
              style={styles.errorMessage}
              error={errors.postCode}
              visible={touched.postCode}
            />
            {selectedId !== null || temp ? (
              <>
                <TextInputField
                  placeholder="Address Line 1"
                  onChangeText={handleChange('addressLine1')}
                  autoCapitalize="none"
                  autoCorrect={false}
                  onBlur={() => setFieldTouched('addressLine1')}
                  value={selectedId !== null ? address1 : values.addressLine1}
                // editable={false}
                />
                <ErrorMessage
                  style={styles.errorMessage}
                  error={errors.addressLine1}
                  visible={touched.addressLine1}
                />

                <TextInputField
                  placeholder="Address Line 2"
                  onChangeText={handleChange('addressLine2')}
                  autoCapitalize="none"
                  autoCorrect={false}
                  onBlur={() => setFieldTouched('addressLine2')}
                  value={selectedId !== null ? address2 : values.addressLine2}
                // editable={false}
                />
                <ErrorMessage
                  style={styles.errorMessage}
                  error={errors.addressLine2}
                  visible={touched.addressLine2}
                />

                <TextInputField
                  placeholder="Town / City"
                  onChangeText={handleChange('cityTown')}
                  autoCapitalize="none"
                  autoCorrect={false}
                  onBlur={() => setFieldTouched('cityTown')}
                  value={selectedId !== null ? city : values.cityTown}
                // editable={false}
                />
                <ErrorMessage
                  style={styles.errorMessage}
                  error={errors.cityTown}
                  visible={touched.cityTown}
                />
              </>
            ) : null}
            {/* </ScrollView> */}
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
  // container: {
  //   flex: 1,
  //   backgroundColor: 'white',
  //   paddingHorizontal: hp('2%'),
  // },
  // title: {
  //   fontSize: wp('8%'),
  //   marginLeft: wp('4%'),
  //   marginRight: wp('15%'),
  //   color: colors.black,
  //   marginTop: 15,
  //   fontFamily: 'Nunito-SemiBold',
  // },
  // subtitle: {
  //   color: colors.black,
  //   opacity: 0.5,
  //   fontSize: wp('4%'),
  //   // marginLeft: wp('4%'),
  //   fontFamily: 'Nunito-Regular',
  // },
  // image: {
  //   resizeMode: 'cover',
  //   height: hp('30%'),
  //   width: wp('100%'),
  // },
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
  // inputField: {
  //   marginTop: hp('3%'),
  // },
  star: {
    // fontWeight: 'bold',
    // marginTop:hp('0.8%'),
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
    borderRadius: 10,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    height: 'auto',
    marginTop: hp('1.2%'),
    marginVertical: hp('0.59%'),
    width: wp('15%'),
  },
});
