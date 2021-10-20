import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import CustomLayout from '../../custom/CustomLayout';
import Studentcard from '../../custom/Studentcard';
import ProgressTracker from '../../custom/ProgressTracker';
import { colors, Fontsize, hp, wp,Stepend } from '../../Constant/Constant';
import Forwardbutton from '../../custom/Forwardbutton';
import Slot from '../../custom/Slot';
import AppButton from '../../custom/AppButton';
import { useSelector, useDispatch } from 'react-redux'

const Confirmation = props => {
  const fullName = useSelector(state => state.childData.fullName)
  const age = useSelector(state => state.childData.age)
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
        <Studentcard
          name={fullName}
          id={age}
          activityrequired
          activity={`Zippy Totz Pre-school Gymnastics`}
          subactivity={'Childhood Joy Classes'}
          // classname={'Childhood Joy Classes'}
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
      <View style={{ height: hp('0%') }} />
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
