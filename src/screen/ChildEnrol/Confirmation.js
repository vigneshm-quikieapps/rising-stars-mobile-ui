import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {
  CustomLayout,
  StudentCard,
  ProgressTracker,
  Slot,
  AppButton,
} from '../../components';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';

import {colors, Fontsize, hp, wp, Stepend} from '../../constants';
const Confirmation = props => {
  const child = useSelector(state => state.childData.addchild);
  const club = useSelector(state => state.childData.clubdata);
  const slot = useSelector(state => state.childData.slotdata);
  const classes = useSelector(state => state.childData.classdata);

  console.log('Session :', slot);

  return (
    <CustomLayout
      steps
      start={Stepend}
      end={Stepend}
      header
      headerTextBigText={true}
      headertext={'Confirmation'}
      subheader
      subheadertext={'Thank you for enroling your child with our club'}
      Customchildren2={<ProgressTracker percent={7} />}
      Customchildren3={
        <StudentCard
          name={child.member.name}
          id={child.member._id}
          activityrequired
          activity={club.name}
          subactivity={classes.name}
        />
      }
      backbutton={() => props.navigation.goBack()}>
      <View style={styles.bordestyle}>
        <Text style={styles.classtext}>
          Class will begin from 20 days from now
        </Text>
        <Slot
          white
          required
          Class={'Pre-school gymnastics (Age 1-3)'}
          sessions={classes.name}
          day={slot.pattern[0].day}
          time={`${moment(slot.pattern[0].startTime).format(
            'HH:mm',
          )} - ${moment(slot.pattern[0].endTime).format('HH:mm')}`}
          facility={slot.facility}
          coach={slot.coach.name}
        />
      </View>
      <View style={styles.remark}>
        <View style={styles.mark}>
          <Image source={require('../../assets/images/icon-info.png')} />
        </View>
        <Text style={styles.marktext}>
          waitlisted enrolments, pay charges offline
        </Text>
      </View>
      <View style={{height: hp('0%')}} />
      <AppButton
        title={'Done'}
        onPress={() => props.navigation.navigate('HomeTab')}
      />
    </CustomLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  remark: {
    flex: 1,
    borderRadius: 10,
    height: hp('10%'),
    paddingLeft: wp('2%'),
    paddingRight: wp('2%'),
    paddingTop: hp('.1%'),
    flexDirection: 'row',
    backgroundColor: '#fff2e6',
  },
  mark: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('3%'),
    width: hp('3%'),
    marginRight: wp('2%'),
  },
  marktext: {
    fontFamily: 'Nunito-Regular',
    color: '#d26800',
    alignSelf: 'center',
    width: wp('80%'),
  },
  bordestyle: {
    backgroundColor: colors.orange,
    borderRadius: 15,
    // paddingTop: hp('4%'),
    marginVertical: hp('2%'),
  },
  classtext: {
    color: 'white',
    alignSelf: 'center',
    marginVertical: hp('1%'),
    fontFamily: 'Nunito-Regular',
    fontSize: Fontsize,
  },
});
export default Confirmation;
