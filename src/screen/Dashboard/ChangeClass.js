/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  CustomLayout,
  StudentCard,
  ClassCard,
  Slot,
  AppButton,
} from '../../components';
import Alert from '../../components/alert-box';
import {hp, colors, wp} from '../../constants';
import {classTransfer} from '../../redux/service/request';
import {getLocalData} from '../../utils/LocalStorage';

export default function ChangeClass(props) {
  const dispatch = useDispatch();
  const currentMember = useSelector(state => state.currentMemberData.data);
  const sessionData = useSelector(state => state.sessionlist.sessiondata);
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showFailureAlert, setShowFailureAlert] = useState(false);
  const [newSessionId, setNewSessionId] = useState('');
  const [token, setToken] = useState('');
  const currentClass = props.route.params.classes;
  console.log('CURRENT: ', currentClass);
  console.log('CURRENT Session: ', sessionData);

  const accessToken = async () => {
    const Token = await getLocalData('accessToken');
    setToken(Token);
  };

  useEffect(() => {
    accessToken();
  });
  return (
    <CustomLayout
      names={currentMember.name}
      Customchildren={
        <StudentCard
          name={currentMember.name}
          id={'KKBK1211'}
          activityrequired
          activity={'Pre-school gymnastics(Age1-3)'}
          subactivity={'Childhood Joy Classes'}
          clubid={'PDPS4212'}
          style={{backgroundColor: colors.orange}}
        />
      }>
      <Text style={{fontFamily: 'Nunito-SemiBold'}}>Current Class/Session</Text>
      <ClassCard
        className={currentClass.class.name}
        // subtitle={"Childhood Joy Classes"}
        button
        title={'Change Class'}
        button2
        day={currentClass.session.pattern[0].day}
        time="9:30 am - 11:30 am"
        facility={currentClass.session.facility}
        coach={'Henry Itondo'}
      />
      <Text style={{fontFamily: 'Nunito-SemiBold', marginVertical: hp('1%')}}>
        Available Session
      </Text>
      {sessionData &&
        sessionData.map(
          sessions =>
            currentClass.session._id !== sessions._id && (
              <>
                <Slot
                  radio={true}
                  onPress={() => {
                    setNewSessionId(sessions._id);
                    console.log(newSessionId);
                  }}
                  status={
                    newSessionId === sessions._id ? 'checked' : 'unchecked'
                  }
                  day={sessions.pattern[0].day}
                  time="9:30 am - 11:30 am"
                  facility={sessions.facility}
                  coach={sessions.coach.name}
                />
                <View style={{height: hp('1%')}} />
              </>
            ),
        )}
      <AppButton
        title={'Change Class'}
        onPress={() => setShowAlert(true)}
        style={{
          width: wp('85%'),
          marginLeft: wp('2.5%'),
          marginBottom: wp('2%'),
        }}
      />
      {showAlert ? (
        <Alert
          visible={showAlert}
          confirm={'Yes, Change Class'}
          success={async () => {
            const response = await classTransfer({
              token: token,
              data: {
                enrolmentId: currentClass._id,
                newSessionId: newSessionId,
              },
            });
            console.log('Response: ', response);
            if (response.message === 'Transfer successful') {
              setShowSuccessAlert(true);
            } else {
              setShowFailureAlert(true);
            }
          }}
          cancel={'No, Dont change'}
          failure={() => setShowAlert(false)}
          image={'failure'}
          message={'Are you sure you want to change the class'}
        />
      ) : null}
      {showSuccessAlert ? (
        <Alert
          visible={showSuccessAlert}
          confirm={'Done'}
          success={() => props.navigation.navigate('Profile')}
          image={'success'}
          message={'Class Changed Successfully'}
        />
      ) : null}
      {showFailureAlert ? (
        <Alert
          visible={showFailureAlert}
          confirm={'Go Back'}
          success={() => props.navigation.navigate('Profile')}
          image={'failure'}
          message={'OOPS!! Something Went Wrong!!'}
        />
      ) : null}
      {/* <Slot
        radio
        day={'Wednesday'}
        time={'9:30 am - 11:30 am'}
        facility={'Gym Hall'}
        coach={'Tua Manera'}
      />
      <View style={{height: hp('1%')}} />
      <Slot
        radio
        day={'Friday'}
        time={'9:30 am - 11:30 am'}
        facility={'Gym Hall'}
        coach={'Sampson Totton'}
      /> */}
    </CustomLayout>
  );
}
