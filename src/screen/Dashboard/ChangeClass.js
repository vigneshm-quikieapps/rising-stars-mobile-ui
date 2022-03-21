/* eslint-disable react-native/no-inline-styles */
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import {
  CustomLayout,
  StudentCard,
  ClassCard,
  Slot,
  AppButton,
} from '../../components';
import Alert from '../../components/alert-box';
import {hp, colors, wp, Fontsize} from '../../constants';
import {classTransfer} from '../../redux/service/request';
import {getLocalData} from '../../utils/LocalStorage';

export default function ChangeClass(props) {
  const currentMember = useSelector(state => state.currentMemberData.data);
  const sessionData = useSelector(state => state.sessionlist.sessiondata);
  console.log('session: ', sessionData);
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showFailureAlert, setShowFailureAlert] = useState(false);
  const [newSessionId, setNewSessionId] = useState('');
  const [token, setToken] = useState('');
  const currentClass = props.route.params.classes.item;
  console.log('class: ', currentClass);

  const accessToken = async () => {
    const Token = await getLocalData('accessToken');
    setToken(Token);
  };
  // console.log(props.route.params.classes.item);
  useEffect(() => {
    accessToken();
  });
  const time = (start, end) => {
    var sHr =
      start.getHours().toString().length === 1
        ? '0' + start.getHours()
        : start.getHours();
    var sMin =
      start.getMinutes().toString().length === 1
        ? '0' + start.getMinutes()
        : start.getMinutes();
    var eHr =
      end.getHours().toString().length === 1
        ? '0' + end.getHours()
        : end.getHours();
    var eMin =
      end.getMinutes().toString().length === 1
        ? '0' + end.getMinutes()
        : end.getMinutes();
    return sHr + ':' + sMin + '-' + eHr + ':' + eMin;
  };
  const sessions = () => {
    var temp =
      sessionData &&
      sessionData.filter(session => currentClass.session._id !== session._id);
    return temp.length > 0 ? temp : null;
  };
  return (
    <CustomLayout
      names={currentMember.name}
      Customchildren={
        <LinearGradient
          style={{
            height: hp('25%'),
            borderRadius: 20,
            marginTop: hp('5%'),
          }}
          colors={['#ffa300', '#ff7e00']}>
          <View style={{marginLeft: wp('2%'), marginTop: hp('2%')}}>
            <Text style={{color: '#f7cf79', fontSize: Fontsize}}>
              Child's Name
            </Text>
            <Text
              style={{
                color: colors.white,
                fontSize: Fontsize + wp('1%'),
                //fontWeight: 'bold',
              }}>
              {currentMember.name}
            </Text>
            <Text style={{color: '#f7cf79', fontSize: Fontsize}}>
              Club Name
            </Text>
            <Text
              style={{
                color: colors.white,
                fontSize: Fontsize + wp('1%'),
                //fontWeight: 'bold',
              }}>
              {currentClass.business.name}
            </Text>
            <Text style={{color: '#f7cf79', fontSize: Fontsize}}>
              Child's Club Id
            </Text>
            <Text
              style={{
                color: colors.white,
                fontSize: Fontsize + wp('1%'),
                //fontWeight: 'bold',
              }}>
              {currentClass.clubMembershipId}
            </Text>
          </View>
        </LinearGradient>
      }>
      <Text style={{fontFamily: 'Nunito-SemiBold'}}>Current Class/Session</Text>
      <ClassCard
        className={currentClass.class.name}
        // subtitle={"Childhood Joy Classes"}
        button
        title={'Change Class'}
        button2
        day={
          currentClass.session && currentClass.session.pattern.length > 0
            ? currentClass.session.pattern[0].day
            : null
        }
        time={
          currentClass.session && currentClass.session.pattern.length > 0
            ? // time(
              //     new Date(currentClass.session.pattern[0].startTime),
              //     new Date(currentClass.session.pattern[0].endTime),
              //   )
              `${moment(currentClass.session.pattern[0].startTime).format(
                'hh:mm A',
              )} - ${moment(currentClass.session.pattern[0].endTime).format(
                'hh:mm A',
              )}`
            : null
        }
        facility={currentClass.session.facility}
        coach={'Henry Itondo'}
      />
      <Text style={{fontFamily: 'Nunito-SemiBold', marginVertical: hp('1%')}}>
        Available Session
      </Text>
      {sessions() != null ? (
        <FlatList
          data={sessions()}
          key={item => item._id}
          renderItem={() => {
            return (
              <>
                <Slot
                  radio={true}
                  onPress={() => {
                    setNewSessionId(sessions._id);
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
            );
          }}
        />
      ) : (
        <View
          style={{
            width: wp('100%'),
            alignItems: 'center',
            marginTop: hp('1%'),
          }}>
          <Text
            style={{
              fontSize: Fontsize + wp('1%'),
              color: colors.orange,
            }}>
            No Sessions Available
          </Text>
        </View>
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
