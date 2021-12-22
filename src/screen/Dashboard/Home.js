/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {WheelPicker} from 'react-native-wheel-picker-android';

import {
  WheelDropdown,
  ProgressBarWithStar,
  Timelines,
  BarIndicator,
  AttendanceCard,
  ClassCard,
} from '../../components';

import {colors, Fontsize, hp, Images, wp} from '../../constants';
import {getLocalData} from '../../utils/LocalStorage';
import {getmemberClass, getmemberData} from '../../redux/action/home';

const Home = () => {
  const Datum = [1, 2, 3, 4]; // data.length for how many time we have scroll in Carousel
  const dispatch = useDispatch();
  const [user, setUser] = useState('');

  const [memberName, setMemberName] = useState(0);
  const [initdata, setInitdata] = useState(false);
  const [memberid, setMemberId] = useState('');
  console.log('memberid :');
  const [memberModal, setMemberModal] = useState(false);
  const members = [];

  const [activeDotIndex, setActiveDotIndex] = React.useState(0);
  const membersdata = useSelector(state => state.memberData.memberData);
  const memberclassdata = useSelector(state => state.memberClassData.classData);

  console.log(' memberclassdata :', memberclassdata);

  membersdata && membersdata.forEach((item, index) => (item.index = index));
  membersdata && membersdata.map(item => members.push(item.name));
  const token = async () => {
    const accToken = await getLocalData('accessToken');
    console.log('token token', accToken);
    setAccessTocken(accToken);
  };
  const [accessTocken, setAccessTocken] = useState('');

  useEffect(() => {
    getLocalUserData();
    token();
    console.log('access tocken:', accessTocken);
    dispatch(getmemberData(accessTocken));

    membersdata?.length &&
      dispatch(getmemberClass(membersdata[membersdata.length - 1]._id));
  }, [dispatch, getLocalUserData]);

  const getLocalUserData = useCallback(async () => {
    const userData = await getLocalData('user', true);
    setUser(userData);
  }, []);

  const pagination = () => {
    return (
      <Pagination
        dotsLength={memberclassdata.length}
        activeDotIndex={activeDotIndex}
        containerStyle={{paddingVertical: 0}}
        dotStyle={{
          width: wp('2.5%'),
          height: wp('1.5%'),
          borderRadius: wp('5%'),
          marginHorizontal: -wp('2%'),
          backgroundColor: colors.white,
        }}
        inactiveDotStyle={{
          // Define styles for inactive dots here
          backgroundColor: colors.white,
          width: wp('3%'),
          height: wp('3%'),
          borderRadius: wp('2%'),
        }}
        inactiveDotOpacity={0.5}
        inactiveDotScale={0.5}
      />
    );
  };
  const renderItem = ({memberclassdata, index}) => {
    console.log(memberclassdata.length);
    return (
      <ClassCard
        id={item.businessId}
        className={item.class.name}
        subtitle={item.business.name}
        day={item.session.pattern[0].day}
        time={`${moment(item.session.pattern[0].startTime).format(
          'HH:SS',
        )} -${moment(item.session.pattern[0].endTime).format('HH:SS')} `}
        facility={item.session.facility}
        coach={item.session.coach}
        style={{backgroundColor: 'white', borderRadius: 20}}
      />
    );
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={true}
      style={{backgroundColor: colors.white}}>
      <StatusBar backgroundColor="rgb(255,163,0)" />
      <View style={styles.container}>
        <LinearGradient
          colors={[colors.orangeYellow, colors.pumpkinOrange]}
          // angle={90}
          style={styles.linearGradient}>
          <Text style={styles.welcome}>{`Hi ${user.name}, your child`}</Text>
          <View style={styles.containerMember}>
            <View style={{marginTop: hp('1%')}}>
              <Image
                style={{
                  height: 57,
                  width: 57,
                  borderRadius: 20,
                  borderWidth: 2,
                  borderColor: 'white',
                }}
                source={Images.Child}
              />
            </View>

            <View style={{marginLeft: 10, justifyContent: 'center'}}>
              <Text style={styles.memberName}>{memberName}</Text>
            </View>

            <View style={{flex: 1}} />
            {membersdata && membersdata.length > 0 && (
              <TouchableOpacity onPress={() => setMemberModal(!memberModal)}>
                <LinearGradient
                  colors={['#fcb12b', '#e6780e']}
                  style={{
                    marginRight: 20,
                    height: 32,
                    width: 32,
                    borderRadius: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{height: 14, width: 18}}
                    source={Images.dropDown_white}
                  />
                </LinearGradient>
              </TouchableOpacity>
            )}
          </View>

          <WheelDropdown
            title="child"
            visible={memberModal}
            setVisibility={visibility => setMemberModal(visibility)}
            cancel={() => setMemberModal(!memberModal)}
            confirm={() => {
              const member = membersdata.filter(
                item => item.index === memberName,
              );
              setMemberId(member);
              dispatch(getmemberClass(member[0]._id));
              console.log('memberid :', memberid);
              setInitdata(true);
              // console.log('member :', member);
            }}>
            <WheelPicker
              isCyclic={true}
              selectedItem={memberName}
              onItemSelected={item => setMemberName(item)}
              selectedItemTextColor={'black'}
              selectedItemTextSize={Fontsize}
              hideIndicator={false}
              itemTextFontFamily="Nunito-Regular"
              selectedItemTextFontFamily="Nunito-Regular"
              data={members}
            />
          </WheelDropdown>
          <View style={styles.courosoul}>
            {memberclassdata && memberclassdata.length ? (
              <Carousel
                // autoplay={true}
                // loop={true}
                // style={{ width: wp('0%') }}
                layout={'default'}
                data={memberclassdata}
                sliderWidth={wp('95%')}
                itemWidth={wp('90%')}
                renderItem={renderItem}
                onSnapToItem={index => {
                  setActiveDotIndex(index);
                }}
              />
            ) : (
              <ActivityIndicator size="large" color={'white'} />
            )}

            {Datum != '' && (
              <View
                style={{
                  paddingVertical: hp('0.8%'),
                  width: wp('90%'),
                  alignItems: 'center',
                }}>
                {pagination()}
              </View>
            )}
          </View>
        </LinearGradient>

        <View style={styles.attendance}>
          <View>
            <Image source={Images.calendarOrange} />
          </View>
          <View style={{marginLeft: wp('3.5%')}}>
            <Text style={{fontSize: wp('5%'), fontFamily: 'Nunito-SemiBold'}}>
              Class Overview
            </Text>
          </View>
        </View>
        <View style={styles.reports}>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: wp('2%'),
              marginBottom: hp('2%'),
              justifyContent: 'space-between',
            }}>
            <View>
              <AttendanceCard
                color={['rgb(255,163,0)', 'rgb(255,126,0)']}
                class={43}
                value={'Total'}
                label={'Classes'}
                style={{backgroundColor: '#fff4e7'}}
              />
            </View>
            <View style={{justifyContent: 'space-evenly'}}>
              <BarIndicator
                color={['#ffa300', '#ff7e00']}
                style={{width: wp('20%')}}
              />
              <BarIndicator
                color={['#68d6ab', '#33ab96']}
                style={{width: wp('10%')}}
              />
              <BarIndicator
                color={['#EA5C5C', '#AB3333']}
                style={{width: wp('4%')}}
              />
            </View>
          </View>

          <View style={{paddingHorizontal: wp('2%'), flexDirection: 'row'}}>
            <AttendanceCard
              color={['#68D6AB', '#33AB96']}
              value={14}
              label={'Attended'}
              style={{backgroundColor: '#c0f8e8'}}
            />
            <AttendanceCard
              color={['#EA5C5C', '#AB3333']}
              value={14}
              label={'No Show'}
              style={{backgroundColor: '#ffe5e5'}}
            />
          </View>
        </View>
        <View style={styles.activityProgress}>
          <View style={styles.activityProgressTitle}>
            <Image source={Images.medal} />
            <View style={{marginLeft: wp('3.5%')}}>
              <Text style={{fontSize: wp('5%'), fontFamily: 'Nunito-SemiBold'}}>
                Class Progress
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.ProgressReports, styles.timeline]}>
          <View style={{paddingRight: wp('4%')}}>
            <ProgressBarWithStar />
          </View>
          <View
            style={{
              height: hp('0.4%'),
              width: '100%',
              marginVertical: hp('1%'),
              backgroundColor: colors.lightgrey,
            }}
          />
          <Timelines />
        </View>
      </View>
    </ScrollView>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:colors.white
  },
  linearGradient: {
    paddingTop: hp('2%'),
    paddingLeft: wp('4%'),
    borderBottomLeftRadius: wp('5.5%'),
    borderBottomRightRadius: wp('5.5%'),
  },
  containerMember: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  welcome: {
    fontSize: Fontsize,
    color: 'white',
    fontFamily: 'Nunito-SemiBold',
    opacity: 0.9,
  },
  memberName: {
    color: colors.white,
    fontSize: wp('6%'),
    fontFamily: 'Nunito-SemiBold',
  },
  memberID: {
    color: colors.white,
    fontSize: wp('2%'),
    fontFamily: 'Nunito-SemiBold',
  },
  courosoul: {
    marginTop: hp('1%'),
  },

  reports: {
    marginTop: hp('3.5%'),
    marginHorizontal: wp('5%'),
    borderRadius: wp('5%'),
    backgroundColor: colors.white,
    padding: hp('2%'),
    elevation: 10,
    shadowColor: '#52006A',
  },
  containerTotalClasses: {
    width: wp('35%'),
    height: hp('9%'),
    marginLeft: wp('2%'),
    flexDirection: 'row',
    backgroundColor: colors.veryLightPink,
    borderRadius: wp('4%'),
    marginBottom: hp('3%'),
  },
  activityProgress: {
    marginTop: hp('3%'),
    marginLeft: wp('3.5%'),
  },
  activityProgressTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attendance: {
    marginTop: hp('3%'),
    marginLeft: wp('5%'),
    flexDirection: 'row',
    alignItems: 'center',
  },
  ProgressReports: {
    marginTop: hp('3%'),
    marginHorizontal: wp('5%'),
    borderTopLeftRadius: wp('5%'),
    borderTopRightRadius: wp('5%'),
    backgroundColor: colors.white,
    paddingLeft: wp('5%'),
    borderBottomColor: 'rgb(227,227,227)',
    borderBottomWidth: wp('1%'),
    elevation: 10,
    shadowColor: '#52006A',
  },
});
