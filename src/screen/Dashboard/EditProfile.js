/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, Text, ActivityIndicator} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {useSelector, useDispatch} from 'react-redux';
import {
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import * as Action from '../../redux/action-types/index';
import {TextInput} from 'react-native-paper';
import {
  ErrorMessage,
  TextInputField,
  AppButton,
  PopUp,
  CustomLayout,
} from '../../components';
import {colors, Fontsize, hp, wp, Term_Condition} from '../../constants';
import {PostCode, PostDataPass} from '../../redux/action/auth';
import PostComponent from '../Authentication/components/Postcode';
import {
  fetchMobileOTP,
  fetchUser,
  updateUser,
} from '../../redux/service/request';
import Alert from '../../components/alert-box';
import {
  getLocalData,
  removeLocalData,
  storeLocalData,
} from '../../utils/LocalStorage';

const CELL_COUNT = 6;
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too Short!')
    .max(20, 'Too Long!')
    .required()
    .label('Full name'),
  postcode: Yup.string().label('Postal Code'),
  AddressLine1: Yup.string().min(5).label('AddressLine1'),
  AddressLine2: Yup.string().min(5).label('AddressLine2'),
  city: Yup.string().min(1).label('City/Town'),
  country: Yup.string().min(1).label('country'),
});

function EditProfile(props) {
  const dispatch = useDispatch();

  const postcodeData = useSelector(state => state.Postcode.postcode);
  const postdata = useSelector(state => state.Postcodedata.postdata);
  const postsize = useSelector(state => state.Postcodedata.size);
  const isloading = useSelector(state => state.Postcodedata.isloading);
  const error = useSelector(state => state.Postcodedata.error);
  // const status = useSelector(state => state.RegisterData.status);
  // const Reerror = useSelector(state => state.RegisterData.error);
  // const isRegloading = useSelector(state => state.RegisterData.isLoading);
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  // const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
  //   value,
  //   setValue,
  // });
  // const [checked, setChecked] = useState('first');
  const [postcodeshow, setPostCodeshow] = useState(false);
  const [term, setTerm] = useState(false);
  const [temp, setTemp] = useState(false);
  const [main, setMain] = useState(false);
  const [user, setUser] = useState('');
  const [token, setToken] = useState('');
  const [showSuccessalert, setSuccessAlert] = useState(false);
  const [showFailurealert, setFailureAlert] = useState(false);
  const [showValidationError, setShowValidationError] = useState(false);
  const [ValidationErrorMsg, setValidationErrorMsg] = useState(
    'Something Went Wrong!!',
  );
  const [seconds, setSeconds] = React.useState(10);
  const [cred, setCred] = useState('');
  const refRBSheet = useRef();
  var address = {
    line1: '',
    line2: '',
    city: '',
  };

  const star = <Text style={styles.star}>Rising Star</Text>;

  const callPopUp = () => setTerm(!term);

  const timeout = () => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    }
  };

  const getuser = async () => {
    const userId = await getLocalData('usercred');
    const accesstoken = await getLocalData('accessToken');
    setToken(accesstoken);
    setUser(userId);
  };

  const api = async () => {
    user &&
      token &&
      setCred(
        await fetchUser({
          id: user,
          token: token,
        }),
      );
  };
  useEffect(() => {
    timeout();
  });

  getuser();

  useEffect(() => {
    user && token && api();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, token]);
  return (
    <CustomLayout
      header
      headertext={'Edit Profile'}
      headertextStyle={{
        width: wp('90%'),
        fontSize: wp('8%'),
      }}
      subheader
      subheadertext={'Edit your details  '}
      subheadertextstyle={styles.subtitle}
      back
      backbutton={() => props.navigation.goBack()}>
      {cred !== '' ? (
        <Formik
          initialValues={{
            name: cred.user.name,
            postcode: cred.user.postcode,
            addressLine1: cred.user.addressLine1,
            addressLine2: cred.user.addressLine2,
            city: cred.user.city,
            country: cred.user.country,
          }}
          onSubmit={values => {
            if (postsize !== 0) {
              values.addressLine1 = postdata.addressline1;
              values.addressLine2 = postdata.addressline2;
              values.cityTown = postdata.posttown;
            }
            values.roles = cred.user.roles;
            console.log(values);
            updateUser({
              id: cred.user._id,
              token: token,
              body: values,
            })
              .then(response => {
                if (response.message === 'updated successfully') {
                  dispatch({
                    type: Action.USER_UPDATE_SUCCESS,
                    payload: response.user,
                  });
                  setSuccessAlert(true);
                  //POP-UP with message
                  //Navigate to Login Screen
                } else {
                  console.log('Updated successfully else');

                  if (response.message) {
                    setValidationErrorMsg(response.message);
                    setShowValidationError(true);
                  } else {
                    setShowValidationError(true);
                  }
                }
              })
              .catch(() => {
                console.log('Updated successfully catch');
                setFailureAlert(true);
              });
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
                value={values.name}
                placeholder="Your Full Name*"
                style={[styles.inputField, {marginTop: hp('0.1%')}]}
                onChangeText={handleChange('name')}
                autoCapitalize="none"
                autoCorrect={false}
                // onBlur={() => setFieldTouched('name')}
              />
              <ErrorMessage
                style={styles.errorMessage}
                error={errors.name}
                visible={touched.name}
              />

              {/* <TextInputField
                placeholder="Email*"
                value={values.email}
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
              /> */}

              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                {/* <View style={styles.countrycode}>
                  <Text style={{fontSize: wp('4.1%'), color: colors.grey}}>
                    +44
                  </Text>
                </View> */}
                {/* <TextInputField
                  placeholder="Mobile Number *"
                  // value={values.contactNumber}
                  onChangeText={handleChange('contactNumber')}
                  maxLength={10}
                  keyboardType="number-pad"
                  value={values.contactNumber}
                  style={{width: wp('75%')}}
                  onBlur={() => setFieldTouched('contactNumber')}
                /> */}
              </View>
              <ErrorMessage
                style={styles.errorMessage}
                error={errors.contactNumber}
                visible={touched.contactNumber}
              />

              <TextInputField
                placeholder="Postcode"
                onChangeText={handleChange('postcode')}
                autoCapitalize="none"
                value={values.postcode}
                keyboardType="default"
                autoCorrect={false}
                onBlur={() => setFieldTouched('postcode')}
                booleanFlag={true}
                right={
                  <TextInput.Icon
                    name={() => (
                      <EvilIcons name="search" size={30} color={'#ff7e00'} />
                    )}
                    onPress={() => {
                      if (values.postcode.length <= 6) {
                        alert('Please Enter a Valid PostCode');
                      } else {
                        const data = {};
                        setPostCodeshow(!postcodeshow);
                        dispatch(PostDataPass(data, 0));
                        dispatch(PostCode(values.postcode));
                      }
                    }}
                  />
                }
              />

              <PostComponent
                data={postcodeData}
                visible={postcodeshow}
                title={values.postCode}
                ClosePopUp={a => setPostCodeshow(!postcodeshow)}
                ManuallyButton={() => {
                  setPostCodeshow(!postcodeshow);
                  // eslint-disable-next-line no-lone-blocks
                  {
                    temp === true ? null : setTemp(!temp);
                  }
                }}
              />

              <ErrorMessage
                style={styles.errorMessage}
                error={errors.postCode}
                visible={touched.postCode}
              />
              <>
                <TextInputField
                  placeholder="Address Line 1"
                  onChangeText={handleChange('addressLine1')}
                  autoCapitalize="none"
                  editable={true}
                  autoCorrect={false}
                  onBlur={() => setFieldTouched('addressLine1')}
                  value={
                    postsize !== 0 ? postdata.addressline1 : values.addressLine1
                  }
                />
                <ErrorMessage
                  style={styles.errorMessage}
                  error={errors.addressLine1}
                  visible={touched.addressLine1}
                />

                <TextInputField
                  placeholder="Address Line 2"
                  onChangeText={
                    postsize !== 0
                      ? postdata.addressline2
                      : handleChange('addressLine2')
                  }
                  autoCapitalize="none"
                  editable={true}
                  autoCorrect={false}
                  onBlur={() => setFieldTouched('addressLine2')}
                  value={
                    postsize !== 0 ? postdata.addressline2 : values.addressLine2
                  }
                />
                <ErrorMessage
                  style={styles.errorMessage}
                  error={errors.addressLine2}
                  visible={touched.addressLine2}
                />

                <TextInputField
                  placeholder="Town / City"
                  onChangeText={
                    postsize !== 0 ? postdata.posttown : handleChange('city')
                  }
                  autoCapitalize="none"
                  editable={false}
                  autoCorrect={false}
                  onBlur={() => setFieldTouched('city')}
                  value={postsize !== 0 ? postdata.posttown : values.city}
                />
                <ErrorMessage
                  style={styles.errorMessage}
                  error={errors.cityTown}
                  visible={touched.cityTown}
                />
                <TextInputField
                  placeholder="Country"
                  onChangeText={handleChange('country')}
                  autoCapitalize="none"
                  editable={true}
                  autoCorrect={false}
                  onBlur={() => setFieldTouched('country')}
                  value={values.country}
                />
                <ErrorMessage
                  style={styles.errorMessage}
                  error={errors.country}
                  visible={touched.country}
                />
              </>

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
                      <Text style={{fontFamily: 'Nunito-Regular'}}>
                        {Term_Condition}
                      </Text>
                      <AppButton
                        title="close"
                        style={{width: '30%'}}
                        onPress={() => setTerm(!term)}
                      />
                    </View>
                  </View>
                </PopUp>

                {error ? (
                  alert({error})
                ) : isloading ? (
                  <ActivityIndicator size="large" color={colors.orange} />
                ) : (
                  <AppButton
                    title={'Done'}
                    onPress={handleSubmit}
                    style={{
                      marginVertical: hp('0%'),
                      fontFamily: 'Nunito-SemiBold',
                      marginTop: hp('12%'),
                    }}
                  />
                )}

                <Text
                  style={{
                    flex: 1,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    fontFamily: 'Nunito-Regular',
                    fontSize: wp('2.6%'),
                    color: '#7f7f7f',
                  }}>
                  By registering you are agreed to our{' '}
                  <Text style={{color: colors.orange}} onPress={callPopUp}>
                    Terms and Conditions
                  </Text>
                </Text>
              </View>
              {showSuccessalert ? (
                <Alert
                  visible={showSuccessalert}
                  confirm={'Done'}
                  success={() => props.navigation.navigate('Profile')}
                  image={'success'}
                  message={'Profile Updated Successfully'}
                />
              ) : null}
              {showFailurealert ? (
                <Alert
                  visible={showFailurealert}
                  confirm={'Retry'}
                  success={() => props.navigation.navigate('Profile')}
                  image={'failure'}
                  message={'Something Went Wrong'}
                />
              ) : null}
              {showValidationError ? (
                <Alert
                  visible={showFailurealert}
                  confirm={'Retry'}
                  success={() => props.navigation.navigate('Profile')}
                  image={'failure'}
                  message={ValidationErrorMsg}
                />
              ) : null}
            </>
          )}
        </Formik>
      ) : null}
    </CustomLayout>
  );
}

export default EditProfile;

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
