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
import {hp, colors, wp} from '../../constants';

export default function ChangeClass(props) {
  const dispatch = useDispatch();
  const currentMember = useSelector(state => state.currentMemberData.data);
  const sessionData = useSelector(state => state.sessionlist.sessiondata);
  const [newSessionId, setNewSessionId] = useState('');
  const currentClass = props.route.params.classes;
  console.log('CURRENT: ', currentClass);
  console.log('CURRENT Session: ', sessionData);

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
        onPress={props.success}
        style={{
          width: wp('85%'),
          marginLeft: wp('2.5%'),
          marginBottom: wp('2%'),
        }}
      />
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
