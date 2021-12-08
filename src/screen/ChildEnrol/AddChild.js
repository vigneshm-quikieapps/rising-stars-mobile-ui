/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Button} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {
  EmergencyCard,
  WheelDropdown,
  PopUpCard,
  PopUp,
  CustomLayout,
  TextInputField,
  ProgressTracker,
  ForwardButton,
  ErrorMessage,
  AppButton,
} from '../../components';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useSelector, useDispatch} from 'react-redux';
import {colors, hp, wp, Stepend} from '../../constants';
import {setChildData, getClubdata} from '../../redux/action/enrol';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';

const gender = [
  {id: 1, gender: 'Boy'},
  {id: 2, gender: 'Girl'},
];
const relation = [
  {id: 1, relation: 'Parents'},
  {id: 2, relation: 'Guardian'},
  {id: 3, relation: 'Others'},
];
const AddChild = props => {
  const genderef = useRef();
  const relationref = useRef();
  const dispatch = useDispatch();
  const name = useSelector(state => state.childData.payload);

  const [count, setCount] = useState(1);
  const [data, setData] = useState([]);

  const [birthModal, setBirthModal] = useState(false);
  const [birth, setBirth] = useState(new Date());
  const [birtherror, setBirthError] = useState(false);

  const [age, setAge] = useState('');
  const [open, setOpen] = useState(false);

  const [relationmodal, setRelationmodal] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true);

  const [relationData, setRelationData] = useState('');

  const [gender, setGender] = useState('');
  const [gendererror, setGenderError] = useState(false);

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required().min(3).label('Full Name'),
    name: Yup.string().required().min(3).label('Name'),
    esNumber: Yup.number().required().min(10).label('Mobile Number'),
    dob: Yup.date().required().label('Date Of Birth'),
    gender: Yup.string().required().label('Gender'),
    epNumber: Yup.number().required().min(10).label('Mobile Number'),
  });

  const gendersubmit = item => {
    setGender(item);
    genderef.current.close();
  };

  const relationsubmit = item => {
    setRelationData(item);
    relationref.current.close();
  };

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

  return (
    <CustomLayout
      steps
      start={1}
      end={Stepend}
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
          name: '',
          contactNumber: '',
          relationship: '',
          //age: '',
        }}
        onSubmit={values => {
          values.dob = birth;
          values.gender = gender;
          values.age = age;
          values.relationship = relationData;
          console.log('Values:', values);
          if (values.dob === '') {
            setBirthError(true);
          } else if (values.gender === '') {
            setGenderError(true);
          } else if (new Date().getFullYear - values.dob.getFullYear() <= 2) {
            alert('2 year children not allowed ');
          } else {
            //console.log('values.age :', values.age);
            dispatch(setChildData(values));
            dispatch(getClubdata());
            props.navigation.navigate('Class__Selection');
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
          console.log('Errors', errors);
          console.log('Values:', values);
          return (
            <>
              <TextInputField
                placeholder="Full Name"
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
                text={'Date of Birth'}
                textColor={colors.grey}
                value={moment(values.dob).format('YYYY-MM-DD')}
                onPress={() => setBirthModal(!birthModal)}
                onBlur={() => setBirthError(true)}
              />
              <WheelDropdown
                title=" Date of Birth"
                visible={birthModal}
                setVisibility={setBirthModal}
                confirmbutton={false}
                cancelbutton={false}
                cancel={() => {
                  setBirth('');
                  setBirthModal(!birthModal);
                }}
                confirm={() => {
                  setBirthModal(false);
                  setBirthError(false);
                  //setFieldValue('dob', birth);
                  // console.log(age)
                }}>
                <DatePicker
                  mode={'date'}
                  onDateChange={date => {
                    //handleChange('dob');
                    //setBirth(select);
                    setFieldValue('dob', date);
                    console.log(birth);
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
                // console.log(age)
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
                text={'Gender'}
                textColor={colors.grey}
                value={gender}
                onBlur={() => setFieldTouched('gender')}
                onPress={() => genderef.current.open()}
              />
              <RBSheet
                ref={genderef}
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
                    title="Boy"
                    style={{width: wp('40%')}}
                    onPress={() => {
                      setGenderError(false);
                      //gendersubmit('Boy');
                      setFieldValue('');
                    }}
                  />
                  <AppButton
                    title="Girl"
                    style={{width: wp('40%')}}
                    onPress={() => {
                      setGenderError(false);
                      //gendersubmit('Girl');
                    }}
                  />
                </View>
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
                valueName={values.name}
                onChangeTextName={handleChange('name')}
                onBlurName={() => setFieldTouched('name')}
                errorName={errors.name}
                visibleName={touched.name}
                valuesContactNumber={values.contactNumber}
                onChangeTextContact={handleChange('contactNumber')}
                onBlurContact={() => setFieldTouched('contactNumber')}
                errorContactNumber={errors.contactNumber}
                visibleContactNumber={touched.contactNumber}
                value={relationData}
                onPress={() => relationref.current.open()}>
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
                      onPress={() => relationsubmit('Parents')}
                    />
                    <AppButton
                      title="Guardian"
                      style={{width: wp('30%')}}
                      onPress={() => relationsubmit('Guardian')}
                    />
                    <AppButton
                      title="Others"
                      style={{width: wp('28%')}}
                      onPress={() => relationsubmit('Others')}
                    />
                  </View>
                </RBSheet>
              </EmergencyCard>
              {data &&
                data.map(item => {
                  return (
                    <EmergencyCard
                      key={item.id}
                      head
                      crossButton={() => backsubmit(item)}
                      valueName={values.name}
                      onChangeTextName={handleChange('name')}
                      onBlurName={() => setFieldTouched('name')}
                      errorName={errors.name}
                      visibleName={touched.name}
                      valuesContactNumber={values.contactNumber}
                      onChangeTextContact={handleChange('contactNumber')}
                      onBlurContact={() => setFieldTouched('contactNumber')}
                      errorContactNumber={errors.contactNumber}
                      visibleContactNumber={touched.contactNumber}
                      value={relationData}
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
                })}
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
