import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import CustomLayout from '../../custom/CustomLayout';
import Studentcard from '../../custom/Studentcard';
import ProgressTracker from '../../custom/ProgressTracker';
import {colors, hp, wp} from '../../Constant/Constant';
import Forwardbutton from '../../custom/Forwardbutton';
import Slot from '../../custom/Slot';
import AppButton from '../../custom/AppButton';

const Confirmation = props => {
  return (
    <CustomLayout
      steps
      start={7}
      end={7}
      header
      headerTextBigText={true}
      headertext={'Confirmation'}
      subheader
      subheadertext={'Thank you for enroling your child with our club'}
      Customchildren2={<ProgressTracker percent={7} />}
      Customchildren3={
        <Studentcard
          name={'Ayman Mongal'}
          id={'KKBK1211'}
          activityrequired
          activity={`Pre-school gymnastics(Age1-3)`}
          subactivity={'Childhood Joy Classes'}
          classname={'Childhood Joy Classes'}
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
          sessions={'Childhood Joy Classes'}
          day={'Monday'}
          time={'9:30 am - 11:30 am'}
          facility={'Gym Hall'}
          coach={'Henry Itondo'}
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
    fontFamily: 'Nunito-SemiBold',
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
    fontSize: wp('4%'),
  },
});
export default Confirmation;
