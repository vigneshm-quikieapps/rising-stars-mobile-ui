import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CustomLayout from '../../custom/CustomLayout';
import TextInputField from '../../custom/TextInputField';
import ProgressTracker from '../../custom/ProgressTracker';
import { colors, hp, wp } from '../../Constant/Constant';
import Forwardbutton from '../../custom/Forwardbutton';
import ErrorMessage from '../../custom/ErrorMessage';
import { Formik } from 'formik';
import * as Yup from 'yup';
import EmergencyCard from '../../custom/EmergencyCard';
import PopUpCard from '../../custom/PopUpCard';
import PopUp from '../../custom/PopUp';
import { useRoute, useNavigation } from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import AppButton from '../../custom/AppButton';

// import {  useNavigationParam } from 'react-navigation-hooks';

const validationSchema = Yup.object().shape({
  // fullName: Yup.string().required().min(3).label('FullName'),
  // name: Yup.string().required().min(3).label('Name'),
  // contactNumber: Yup.number().required().min(10).label('Contact Number'),
});

const gender = [
  { id: 1, gender: 'Boy' },
  { id: 2, gender: 'Girl' },
];
const relation = [
  { id: 1, relation: 'Parents' },
  { id: 2, relation: 'Guardian' },
  { id: 3, relation: 'Others' },
];
const AddChild = props => {
  const genderef = useRef()
  const relationref = useRef()
  const [count, setCount] = useState(1);
  const [data, setData] = useState([]);

  const [relationmodal, setRelationmodal] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [relationdata, setRelationdata] = useState('');
  const [modalvalue, setModalValue] = useState('');



  // const route = useRoute()
  // console.log(route)
  // console.log(props.params.id)
  // const {id} = props.navigation.getParam('id')
  // console.log(id)
  // const {steps} = props.route.params
  // const id = useNavigationParam('id')

  // console.log(relationdata);



  const gendersubmit = item => {
    setModalValue(item)
    genderef.current.close()
  };

  const relationsubmit = item => {
    setRelationdata(item);
    relationref.current.close()
  };

  const handleSubmits = () => {
    setCount(item => item + 1);
    setData(item => [...item, { id: count }]);
    setButtonVisible(!buttonVisible)
  };
  const backsubmit = item => {
    console.log(item);
    let datafilter = data.filter(items => items.id !== item.id);
    console.log(datafilter);
    let idrest = datafilter.forEach(item => (item.id = item.id - 1));
    setData(datafilter);
    setButtonVisible(!buttonVisible)
  };

  return (
    <CustomLayout
      steps
      start={1}
      end={7}
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
          name: '',
          contactNumber: '',
        }}
        onSubmit={values => {
          console.log('VALUES....', values);
          props.navigation.navigate('Class_Selection');
        }}
        validationSchema={validationSchema}>
        {({
          handleChange,
          handleSubmit,
          setFieldTouched,
          errors,
          touched,
          values,
        }) => (
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

            <TextInputField placeholder="Date of Birth" label="DD-MM-YYYY" />
            <PopUpCard
              text={'Gender'}
              textColor={colors.grey}
              value={modalvalue}
              onPress={() => genderef.current.open()}
            />
            <RBSheet
              ref={genderef}
              closeOnDragDown={true}
              closeOnPressMask={false}
              customStyles={{
                // wrapper: {
                //   backgroundColor: colors.blackOpacity,
                // },
                // draggableIcon: {
                //   backgroundColor: '#000',
                // },
                container: {
                  height: '18%',
                  borderTopRightRadius: 16,
                  borderTopLeftRadius: 16,
                },
              }}>
              <View style={{ flexDirection: 'row', paddingHorizontal: wp('5%'), justifyContent: 'space-between' }}>
                <AppButton title="Boy" style={{ width: wp('40%') }} onPress={() => gendersubmit('Boy')} />
                <AppButton title="Girl" style={{ width: wp('40%') }} onPress={() => gendersubmit('Girl')} />
              </View>
            </RBSheet>
            {/* <PopUp
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.modalView}>
                {gender.map(item => {
                  return (
                    <TouchableOpacity
                      key={item.id}
                      style={styles.modalstyle}
                      onPress={() => gendersubmit(item.gender)}>
                      <Text style={styles.modaltext}>{item.gender}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </PopUp> */}

            <Text style={styles.emergency}>Emergency Contact (Primary)</Text>
            <EmergencyCard
              disabled={data.length === 1 ? true : false}
              addbuttons={buttonVisible}
              addbutton={handleSubmits}
              valuename={values.name}
              onChangeTextname={handleChange('name')}
              onBlurname={() => setFieldTouched('name')}
              errorname={errors.name}
              visiblename={touched.name}
              valuescontactNumber={values.contactNumber}
              onChangeTextcontact={handleChange('contactNumber')}
              onBlurcontact={() => setFieldTouched('contactNumber')}
              errorcontactNumber={errors.contactNumber}
              visiblecontactNumber={touched.contactNumber}
              value={relationdata}
              onPress={() => relationref.current.open()}

            // valuesrelationships={values.relationships}
            // onChangeTextrelation={handleChange("relationships")}
            // onBlurrelation={() => setFieldTouched('relationships')}
            // errorsrelationships={errors.relationships}
            // visiblerelationships={touched.relationships}
            >
              <RBSheet
                ref={relationref}
                closeOnDragDown={true}
                closeOnPressMask={false}
                customStyles={{
                  // wrapper: {
                  //   backgroundColor: colors.blackOpacity,
                  // },
                  // draggableIcon: {
                  //   backgroundColor: '#000',
                  // },
                  container: {
                    height: '18%',
                    borderTopRightRadius: 16,
                    borderTopLeftRadius: 16,
                  },
                  
                }}>
                <View style={{ flexDirection: 'row', paddingHorizontal: wp('5%'), justifyContent: 'space-between' }}>
                  <AppButton title="Parents" style={{ width: wp('28%') }} onPress={() => relationsubmit("Parents")} />
                  <AppButton title='Guardian' style={{ width: wp('30%') }} onPress={() =>relationsubmit('Guardian')} />
                  <AppButton title='Others' style={{ width: wp('28%') }} onPress={() => relationsubmit('Others')} />
                </View>
              </RBSheet>
              {/* <PopUp
                animationType="fade"
                transparent={true}
                visible={relationmodal}
                onRequestClose={() => {
                  setRelationmodal(!relationmodal);
                }}
              >
                <View style={styles.modalView}>
                  {
                    relation.map(item => {
                      return (
                        <TouchableOpacity key={item.id} style={styles.modalstyle} onPress={() => relationsubmit(item.relation)}>
                          <Text style={styles.modaltext}>{item.relation}</Text>
                        </TouchableOpacity>
                      )
                    })
                  }
                </View>
              </PopUp> */}
            </EmergencyCard>
            {data &&
              data.map(item => {
                return (
                  <EmergencyCard
                    key={item.id}
                    head
                    crossbutton={() => backsubmit(item)}
                    valuename={values.name}
                    onChangeTextname={handleChange('name')}
                    onBlurname={() => setFieldTouched('name')}
                    errorname={errors.name}
                    visiblename={touched.name}
                    valuescontactNumber={values.contactNumber}
                    onChangeTextcontact={handleChange('contactNumber')}
                    onBlurcontact={() => setFieldTouched('contactNumber')}
                    errorcontactNumber={errors.contactNumber}
                    visiblecontactNumber={touched.contactNumber}
                    value={relationdata}
                    onPress={() => setRelationmodal(!relationmodal)}

                  // valuesrelationships={values.relationships}
                  // onChangeTextrelation={handleChange("relationships")}
                  // onBlurrelation={() => setFieldTouched('relationships')}
                  // errorsrelationships={errors.relationships}
                  // visiblerelationships={touched.relationships}
                  >
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
            <Forwardbutton
              style={{ alignSelf: 'flex-end', marginTop: hp('2%') }}
              onPress={handleSubmit}
            />
          </>
        )}
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
    paddingRight: wp('10%'),
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
});
export default AddChild;
