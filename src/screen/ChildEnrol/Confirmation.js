import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {
  CustomLayout,
  StudentCard,
  ProgressTracker,
  Slot,
  AppButton,
} from '../../components';
import {useSelector} from 'react-redux';
import moment from 'moment';

import {colors, Fontsize, hp, wp, Stepend} from '../../constants';
import Alert from '../../components/alert-box';
const Confirmation = props => {
  const child = useSelector(state => state.childData.addchild);
  const club = useSelector(state => state.childData.clubdata);
  const slot = useSelector(state => state.childData.slotdata);
  const classes = useSelector(state => state.childData.classdata);
  const enrollment = useSelector(state => state.enrollChild.enrollstate);
  const [showAlert, setShowAlert] = useState(false);
  const memberClassData = useSelector(state => state.memberClassData.classData);

  useEffect(() => {
    enrollment && enrollment?.message == 'enrolled successful'
      ? setShowAlert(true)
      : null;
  }, [enrollment]);

  const DateDiff = () => {
    const start = new Date(memberClassData[0].session.term.startDate);
    const today   = new Date();
    const range = start.getDate()-today.getDate() + (start.getMonth()-today.getMonth())*30
  // const range = today.getDate()-start.getDate() + (start.getMonth()-today.getMonth())*30

    console.log('enrollment msg', range)
    //console.log('session Start date & end date ', memberClassData[0].session.term.startDate, memberClassData[0].session.term.endDate);
    return range;
  }
 

  return (
    <View>
      {enrollment?.message == 'enrolled successful' ? (
        <Alert
          visible={showAlert}
          confirm={'Done'}
          success={() => props.navigation.navigate('Profile')}
          image={'failure'}
          message={'Something went Wrong'}
        />
      ) : (
        <CustomLayout
          steps
          start={Stepend}
          end={Stepend}
          back
          header
          headerTextBigText={true}
          headertext={'Confirmation'}
          subheader
          subheadertext={'Thank you for enroling your child with our club'}
          Customchildren2={<ProgressTracker percent={7} />}
          Customchildren3={
            // <View
            //   name={child.member.name}
            //   id={child.member._id}
            //   activityrequired
            //   activity={club.name}
            //   subactivity={classes.name}
            // >
            <View style={styles.containera}>
              <View style={styles.subContainer}>
                <View style={{alignContent: 'center', alignItems: 'center'}}>
                  <Text style={styles.head}>Child Name</Text>
                  <Text style={styles.body}>{child.member.name}</Text>
                </View>
                <View style={{alignContent: 'center', alignItems: 'center'}}>
                  <Text style={styles.head}>Club Name</Text>
                  <Text style={styles.body}>{club.name}</Text>
                </View>
              </View>
            </View>
          }
          backbutton={() => props.navigation.goBack()}>
          <View style={styles.bordestyle}>
            <Text style={styles.classtext}>
              Class will begin from { DateDiff()} days from now
            </Text>
            <Slot
              white
              required
              waitlisted={enrollment.status == 'WAITLISTED'}
              Class={club.name}
              sessions={classes.name}
              day={slot.pattern[0].day}
              time={`${moment(slot.pattern[0].startTime).format(
                'HH:mm a',
              )} - ${moment(slot.pattern[0].endTime).format('HH:mm a')}`}
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
            onPress={() => props.navigation.navigate('Profile')}
          />
        </CustomLayout>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containera: {
    flex: 1,
    marginTop: hp('2%'),
    backgroundColor: colors.pumpkinorange,
    borderRadius: 16,
    paddingHorizontal: wp('8%'),
    paddingVertical: hp('2%'),
    width: wp('90%'),
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('1%'),
    alignItems: 'center',
  },
  head: {
    fontFamily: 'Nunito-Regular',
    fontSize: Fontsize,
    color: 'grey',
  },
  body: {
    fontFamily: 'Nunito-Regular',
    fontSize: Fontsize,
    fontWeight: 'bold',
  },
  subbody: {
    fontFamily: 'Nunito-Regular',
    fontSize: Fontsize,
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
