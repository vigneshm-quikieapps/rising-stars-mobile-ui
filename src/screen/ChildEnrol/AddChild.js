/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {
  EmergencyCard,
  WheelDropdown,
  PopUpCard,
  CustomLayout,
  TextInputField,
  ProgressTracker,
  ForwardButton,
  ErrorMessage,
  AppButton,
} from '../../components';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useDispatch} from 'react-redux';
import {
  colors,
  hp,
  wp,
  Stepend,
  Fontsize,
  genderOfChild,
} from '../../constants';
import {setChildData, getClubdata} from '../../redux/action/enrol';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import {getLocalData} from '../../utils/LocalStorage';
import {WheelPicker} from 'react-native-wheel-picker-android';
//import {TouchableOpacity} from 'react-native-gesture-handler';

// const gender = [
//   {id: 1, gender: 'Boy'},
//   {id: 2, gender: 'Girl'},
// ];
// const relation = [
//   {id: 1, relation: 'Parents'},
//   {id: 2, relation: 'Guardian'},
//   {id: 3, relation: 'Others'},
// ];
const AddChild = props => {
  const genderef = useRef();
  const relationref = useRef();
  const relationre = useRef();
  const dispatch = useDispatch();
  const [user, setUser] = useState('');
  const [token, setToken] = useState('');

  const getuser = async () => {
    const userId = await getLocalData('usercred');
    const accesstoken = await getLocalData('accessToken');
    setToken(accesstoken);
    setUser(userId);
  };

  const genders = ['MALE', 'FEMALE', 'OTHERS'];
  const relations = [
    'FRIEND',
    'GRAND_PARENT',
    'PARENT',
    'UNCLE',
    'AUNT',
    'OTHER',
  ];
  const relationForDisplay = [
    'Friend',
    'Grand Parent',
    'Parent',
    'Uncle',
    'Aunt',
    'Other',
  ];

  useEffect(() => {
    getuser();
  }, []);
  const [count, setCount] = useState(1);
  const [data, setData] = useState([]);

  const [birthModal, setBirthModal] = useState(false);
  const [birth, setBirth] = useState(new Date());
  const [birtherror, setBirthError] = useState(false);

  // const [age, setAge] = useState('');
  // const [open, setOpen] = useState(false);

  // const [relationmodal, setRelationmodal] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true);

  // const [relationData, setRelationData] = useState('');

  const [gender, setGender] = useState('BOY');
  const [relation, setRelation] = useState('PARENT');

  const [gendererror, setGenderError] = useState(false);

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required().min(3).label('Full Name'),
    epname: Yup.string().required().min(3).label('Name'),
    esname: Yup.string().min(3).label('Name'),
    esNumber: Yup.number().min(10).label('Mobile Number'),
    dob: Yup.date().required().label('Date Of Birth'),
    eprelation: Yup.string().required().label('Relationship'),
    esrelation: Yup.string().label('Relationship'),
    gender: Yup.string().required().label('Gender'),
    epNumber: Yup.number().required().min(10).label('Mobile Number'),
  });

  // const gendersubmit = item => {
  //   setGender(item);
  //   genderef.current.close();
  // };

  // const relationsubmit = item => {
  //   setRelationData(item);
  //   relationref.current.close();
  // };

  const handleSubmits = () => {
    setCount(item => item + 1);
    setData(item => [...item, {id: count}]);
    setButtonVisible(!buttonVisible);
  };
  const backsubmit = item => {
    let datafilter = data.filter(items => items.id !== item.id);
    let idrest = datafilter.forEach(item => (item.id = item.id - 1));
    setData(datafilter);
    setButtonVisible(!buttonVisible);
  };

  var openSecondary = false;
  return (
    <CustomLayout
      steps
      start={1}
      end={Stepend}
      back
      header
      headerTextBigText={true}
      headertext={`Add Child and ${'\n'}Emergency${'\n'}Contact `}
      subheader
      subheadertext={'Child Details'}
      backbutton={() => props.navigation.goBack()}
      Customchildren2={<ProgressTracker percent={1} />}>
      <Formik
        initialValues={{
          fullName: '',
          dob: birth,
          gender: '',
          esNumber: '',
          epNumber: '',
          esrelation: '',
          eprelation: '',
          epname: '',
          esname: '',
        }}
        onSubmit={values => {
          var valuesForDispatch = {
            token: token,
            data: {
              userId: user,
              name: values.fullName,
              dob: moment(values.dob).format('YYYY-MM-DD'),
              gender: values.gender,
              contacts:
                values.esname.length != 0
                  ? [
                      {
                        addressType: 'PRIMARY',
                        name: values.epname,
                        contact: values.epNumber,
                        relationship: values.eprelation,
                      },
                      {
                        addressType: 'SECONDARY',
                        name: values.esname,
                        contact: values.esNumber,
                        relationship: values.esrelation,
                      },
                    ]
                  : [
                      {
                        addressType: 'PRIMARY',
                        name: values.epname,
                        contact: values.epNumber,
                        relationship: values.eprelation,
                      },
                    ],
            },
          };
          if (values.dob === '') {
            setBirthError(true);
          } else if (values.gender === '') {
            setGenderError(true);
          } else if (new Date().getFullYear() - values.dob.getFullYear() <= 2) {
            alert('2 year children not allowed ');
          } else {
            dispatch(
              setChildData({
                data: valuesForDispatch,
                callback: () => {
                  dispatch(
                    getClubdata({
                      callback: () => {
                        props.navigation.navigate('AddPayment');
                      },
                    }),
                  );
                },
              }),
            );
          }
        }}
        validationSchema={validationSchema}>
        {({
          handleChange,
          handleSubmit,
          setFieldTouched,
          setFieldValue,
          errors,
          touched,
          values,
        }) => {
          return (
            <>
              <TextInputField
                placeholder="Full Name*"
                onChangeText={handleChange('fullName')}
                value={values.fullName}
                onBlur={() => setFieldTouched('fullName')}
              />

              <ErrorMessage
                style={styles.errorMessage}
                error={errors.fullName}
                visible={touched.fullName}
              />

              <PopUpCard
                text={'Date of Birth*'}
                textColor={colors.grey}
                value={
                  moment(values.dob).format('DD-MM-YYYY') ===
                  moment(new Date()).format('DD-MM-YYYY')
                    ? 'Date of Birth*'
                    : moment(values.dob).format('DD-MM-YYYY')
                }
                onPress={() => setBirthModal(!birthModal)}
                onBlur={() => setBirthError(true)}
              />
              <WheelDropdown
                title=" Date of Birth*"
                visible={birthModal}
                setVisibility={setBirthModal}
                confirmbutton={false}
                cancelbutton={false}
                style={{marginTop: hp('75%')}}
                cancel={() => {
                  setBirth('');
                  setBirthModal(!birthModal);
                }}
                confirm={() => {
                  setBirthModal(false);
                  setBirthError(false);
                }}>
                <DatePicker
                  mode={'date'}
                  onDateChange={date => {
                    //handleChange('dob');
                    //setBirth(select);
                    setFieldValue('dob', date);
                  }}
                  date={values.dob}
                />
              </WheelDropdown>
              {/* <DatePicker
              modal
              mode="date"
              open={open}
              date={new Date()}
              onConfirm={(date) => {
                setOpen(false)
                setBirth(moment(date).format('YYYY/MM/DD'))
                handleChange('dob')
                let age = (new Date()).getFullYear() - date.getFullYear()
                setAge(age)
                setBirthError(false)
              }}
              onCancel={() => {
                setOpen(!open)
              }}
            /> */}
              {birtherror && (
                <Text style={styles.errors}>D.O.B. is a required</Text>
              )}
              {/* <ErrorMessage
              style={styles.errorMessage}
              error={errors.dob}
              visible={touched.dob}
            /> */}

              <PopUpCard
                text={'Gender*'}
                textColor={colors.grey}
                value={genderOfChild[genders.indexOf(values.gender)]}
                onBlur={() => setFieldTouched('gender')}
                onPress={() => genderef.current.open()}
              />
              <RBSheet
                ref={genderef}
                //closeOnDragDown={true}
                closeOnPressMask={false}
                customStyles={{
                  container: {
                    borderTopRightRadius: 16,
                    borderTopLeftRadius: 16,
                    alignItems: 'center',
                  },
                }}>
                <WheelPicker
                  selectedItem={genderOfChild.indexOf(gender)}
                  isCyclic={true}
                  data={genderOfChild}
                  onItemSelected={item => {
                    values.gender = genders[item];
                    setGender(genderOfChild[item]);
                  }}
                  indicatorWidth={1}
                  //hideIndicator={true}
                />
                <View
                  style={{
                    width: wp('100%'),
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      genderef.current.close();
                      setGender('BOY');
                    }}>
                    <Text
                      style={{
                        color: colors.orangeYellow,
                        marginBottom: hp('7.5%'),
                        marginRight: wp('12.5%'),
                        fontSize: Fontsize + wp('0.7%'),
                        fontWeight: 'bold',
                      }}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <AppButton
                    title={'Confirm'}
                    onPress={() => genderef.current.close()}
                    style={{
                      width: wp('31%'),
                      marginBottom: hp('5%'),
                      marginRight: wp('5%'),
                      //justifyContent: 'flex-end',
                    }}
                  />
                </View>
                {/* <View
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal: wp('5%'),
                    justifyContent: 'space-between',
                  }}>
                  <AppButton
                    title="Boy"
                    style={{width: wp('40%')}}
                    onPress={() => {
                      setGenderError(false);
                      //gendersubmit('Boy');
                      values.gender = 'MALE';
                      genderef.current.close();
                      setFieldValue('');
                    }}
                  />
                  <AppButton
                    title="Girl"
                    style={{width: wp('40%')}}
                    onPress={() => {
                      setGenderError(false);
                      values.gender = 'FEMALE';
                      setFieldValue('');
                      genderef.current.close();
                      //gendersubmit('Girl');
                    }}
                  />
                </View> */}
              </RBSheet>
              {gendererror && (
                <Text style={styles.errors}>Gender is a required</Text>
              )}

              {/* <ErrorMessage
              style={styles.errorMessage}
              error={errors.gender}
              visible={touched.gender}
            /> */}

              <Text style={styles.emergency}>Emergency Contact (Primary)</Text>
              <EmergencyCard
                disabled={data.length === 1 ? true : false}
                addButtons={buttonVisible}
                addButton={handleSubmits}
                valueName={values.epname}
                onChangeTextName={handleChange('epname')}
                onBlurName={() => setFieldTouched('epname')}
                errorName={errors.epname}
                visibleName={touched.epname}
                valuesContactNumber={values.epNumber}
                onChangeTextContact={handleChange('epNumber')}
                onBlurContact={() => setFieldTouched('epNumber')}
                errorContactNumber={errors.epNumber}
                visibleContactNumber={touched.epNumber}
                onChangeRelation={relations =>
                  setFieldValue('eprelation', relations)
                }
                value={values.eprelation}
                onBlur={() => setFieldTouched('gender')}
              />
              <PopUpCard
                text="Relationship *"
                onBlur={() => setFieldTouched('eprelation')}
                value={relationForDisplay[relations.indexOf(values.eprelation)]}
                onPress={() => relationref.current.open()}
              />
              <RBSheet
                ref={relationref}
                //closeOnDragDown={true}
                //closeOnPressMask={false}
                customStyles={{
                  container: {
                    //height: '18%',
                    alignItems: 'center',
                    borderTopRightRadius: 16,
                    borderTopLeftRadius: 16,
                  },
                }}>
                <WheelPicker
                  selectedItem={relations.indexOf(relation)}
                  isCyclic={true}
                  data={relationForDisplay}
                  onItemSelected={item => {
                    values.eprelation = relations[item];
                    setRelation(relations[item]);
                  }}
                  indicatorWidth={1}
                />
                <View
                  style={{
                    width: wp('100%'),
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      relationref.current.close();
                      setRelation('PARENT');
                    }}>
                    <Text
                      style={{
                        color: colors.orangeYellow,
                        marginBottom: hp('7.5%'),
                        marginRight: wp('12.5%'),
                        fontSize: Fontsize + wp('0.7%'),
                        fontWeight: 'bold',
                      }}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <AppButton
                    title={'Confirm'}
                    onPress={() => relationref.current.close()}
                    style={{
                      width: wp('31%'),
                      marginBottom: hp('5%'),
                      marginRight: wp('5%'),
                      //justifyContent: 'flex-end',
                    }}
                  />
                </View>
              </RBSheet>
              <View style={{flexDirection: 'row'}}>
                {!openSecondary ? (
                  <AppButton
                    title="+"
                    style={{width: wp('15%')}}
                    onPress={() => {
                      setFieldValue('');
                      openSecondary = true;
                    }}
                  />
                ) : null}
                <Text
                  style={{
                    fontFamily: 'Nunito-SemiBold',
                    fontSize: wp('4.5%'),
                    marginTop: hp('2.5%'),
                    paddingTop: wp('5%'),
                    paddingLeft: wp('2%'),
                  }}>
                  Emergency Contact (Secondary)
                </Text>
              </View>
              {openSecondary ? (
                <View>
                  <EmergencyCard
                    disabled={data.length === 1 ? true : false}
                    addButtons={buttonVisible}
                    addButton={handleSubmits}
                    valueName={values.esname}
                    onChangeTextName={handleChange('esname')}
                    onBlurName={() => setFieldTouched('esname')}
                    errorName={errors.esname}
                    visibleName={touched.esname}
                    valuesContactNumber={values.esNumber}
                    onChangeTextContact={handleChange('esNumber')}
                    onBlurContact={() => setFieldTouched('esNumber')}
                    errorContactNumber={errors.esNumber}
                    visibleContactNumber={touched.esNumber}
                    onChangeRelation={relations =>
                      setFieldValue('esrelation', relations)
                    }
                    value={values.esrelation}
                    onBlur={() => setFieldTouched('gender')}
                  />
                  <PopUpCard
                    text="Relationship *"
                    onBlur={() => setFieldTouched('esrelation')}
                    value={
                      relationForDisplay[relations.indexOf(values.esrelation)]
                    }
                    onPress={() => relationref.current.open()}
                  />
                  <RBSheet
                    ref={relationref}
                    closeOnDragDown={true}
                    closeOnPressMask={false}
                    customStyles={{
                      container: {
                        height: '18%',
                        borderTopRightRadius: 16,
                        borderTopLeftRadius: 16,
                      },
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        paddingHorizontal: wp('5%'),
                        justifyContent: 'space-between',
                      }}>
                      <AppButton
                        title="Parents"
                        style={{width: wp('28%')}}
                        onPress={() => {
                          values.esrelation = 'Parents';
                          relationref.current.close();
                          setFieldValue('');
                        }}
                      />
                      <AppButton
                        title="Guardian"
                        style={{width: wp('30%')}}
                        onPress={() => {
                          values.esrelation = 'Guardian';
                          setFieldValue('');
                          relationref.current.close();
                        }}
                      />
                      <AppButton
                        title="Others"
                        style={{width: wp('28%')}}
                        onPress={() => {
                          values.esrelation = 'Others';
                          setFieldValue('');
                          relationref.current.close();
                        }}
                      />
                    </View>
                  </RBSheet>
                </View>
              ) : null}
              {/* {data &&
                data.map(item => {
                  return (
                    <EmergencyCard
                      key={item.id}
                      head
                      crossButton={() => backsubmit(item)}
                      valueName={values.epname}
                      onChangeTextName={handleChange('epname')}
                      onBlurName={() => setFieldTouched('epname')}
                      errorName={errors.epname}
                      visibleName={touched.epname}
                      valuesContactNumber={values.contactNumber}
                      onChangeTextContact={handleChange('contactNumber')}
                      onBlurContact={() => setFieldTouched('contactNumber')}
                      errorContactNumber={errors.contactNumber}
                      visibleContactNumber={touched.contactNumber}
                      value={values.eprelation}
                      onPress={() => setRelationmodal(!relationmodal)}>
                      <PopUp
                        animationType="fade"
                        transparent={true}
                        visible={relationmodal}
                        onRequestClose={() => {
                          setRelationmodal(!relationmodal);
                        }}>
                        <View style={styles.modalView}>
                          {relation.map(item => {
                            return (
                              <TouchableOpacity
                                key={item.id}
                                style={styles.modalstyle}
                                onPress={() => relationsubmit(item.relation)}>
                                <Text style={styles.modaltext}>
                                  {item.relation}
                                </Text>
                              </TouchableOpacity>
                            );
                          })}
                        </View>
                      </PopUp>
                    </EmergencyCard>
                  );
                })} */}
              <ForwardButton
                style={{alignSelf: 'flex-end', marginTop: hp('2%')}}
                title="Submit"
                onPress={() => {
                  handleSubmit();
                }}
              />
            </>
          );
        }}
      </Formik>
    </CustomLayout>
  );
};

const styles = StyleSheet.create({
  emergency: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: wp('5.5%'),
    marginTop: hp('2.5%'),
  },
  errorMessage: {
    alignSelf: 'flex-end',
    paddingRight: wp('1%'),
    opacity: 0.5,
  },
  modalView: {
    // flex:1,
    // margin: 20,
    height: hp('20%'),
    backgroundColor: 'white',
    borderRadius: 10,
    // padding: 35,
    // alignItems: "center",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalstyle: {
    flex: 1,
    height: hp('5%'),
    // borderWidth:1,
    width: wp('30%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  modaltext: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: hp('2.5%'),
  },
  errors: {
    color: colors.reddish,
    fontFamily: 'Nunito-Regular',
    fontSize: wp('3%'),
    alignSelf: 'flex-end',
  },
});
export default AddChild;
