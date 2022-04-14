/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getLocalData, removeLocalData} from '../../utils/LocalStorage';
import * as Action from '../../redux/action-types';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import {colors, Fontsize, hp, Images, wp} from '../../constants';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import {
  WheelDropdown,
  ClassCard,
  ProgressBarWithStar,
  Timelines,
  AttendanceCard,
  BarIndicator,
} from '../../components';
import {WheelPicker} from 'react-native-wheel-picker-android';
import {getmemberClass, getmemberData} from '../../redux/action/home';
import {
  fetchAttendanceOfMemberInSession,
  fetchCurrentUser,
  fetchSessionById,
} from '../../redux/service/request';
import {getClubdata} from '../../redux/action/enrol';
import {useNavigation} from '@react-navigation/native';
import NewTimelines from '../../components/newTimelines';
import Alert from '../../components/alert-box';

const Home = () => {
  const dispatch = useDispatch();

  const [user, setUser] = useState('');
  const [currentMemberIndex, setCurrentMemberIndex] = useState(0);
  const [memberModal, setMemberModal] = useState(false);
  const [wheelitem, setItem] = useState(0);
  const [token, setToken] = useState();
  const [activeDotIndex, setActiveDotIndex] = React.useState(0);
  const [currentSessionId, setCurrentSessionId] = useState('');
  const [currentSessionAttendance, setCurrentSessionAttendance] = useState('');
  const membersdata = useSelector(state => state.memberData.memberData);
  const errorMemberData = useSelector(state => state.memberData.error);
  const memberClassData = useSelector(state => state.memberClassData.classData);
  const [value, setValue] = useState(0);
  const [classList, setClassList] = useState([]);
  const [numberOfSession, setNumberOfSession] = useState('');
  const [signOutFlag, setSignOutFlag] = useState(false);

  const sessionAttendance = useSelector(
    state => state.sessionlist.sessionAttendance,
  );
  const memberActivityProgress = useSelector(
    state => state.currentMemberActivity.activity,
  );
  const newDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

  const accessToken = async () => {
    const Token = await getLocalData('accessToken');
    setToken(Token);
  };
  const navigation = useNavigation();
  const members = [];
  membersdata && membersdata.forEach((item, index) => (item.index = index));
  membersdata && membersdata.map(item => members.push(item.name));
  const parent = useSelector(state => state.LoginData.updatedUser);

  const [currentMember, setCurrentMember] = useState('');
  var count = 0;
  //var value;
  const getLocalUserData = useCallback(async () => {
    const userData = await getLocalData('user', true);
    setUser(userData);
  }, []);

  const wheelselected = item => {
    setItem(item);
  };

  const pagination = () => {
    return (
      <Pagination
        dotsLength={
          memberClassData && memberClassData
            ? memberClassData.filter(
                item =>
                  item?.enrolledStatus === 'ENROLLED' ||
                  item?.enrolledStatus === 'WAITLISTED',
              ).length
            : 1
        }
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

  accessToken();

  useEffect(() => {
    getLocalUserData();

    token && dispatch(getmemberData(token));

    token &&
      fetchCurrentUser({
        token: token,
      }).then(response => {
        dispatch({
          type: Action.USER_UPDATE_SUCCESS,
          payload: response.user,
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  const SignOut = async () => {
    await removeLocalData('refreshToken');
    await removeLocalData('usercred');
    await removeLocalData('accesstoken');
    navigation.navigate('AuthStack');
  };
  useEffect(() => {
    if (errorMemberData === 'jwt expired') {
      setSignOutFlag(true);
    }
  }, [errorMemberData]);

  useEffect(() => {
    membersdata && setCurrentMember(membersdata[currentMemberIndex]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [membersdata]);

  useEffect(() => {
    currentMember && dispatch(getmemberClass(currentMember._id));
    currentMember &&
      dispatch({
        type: Action.USER_GET_CURRENT_MEMBER_DATA,
        payload: currentMember,
      });

    currentMember &&
      dispatch({
        type: Action.USER_GET_CURRENT_MEMBER_ACTIVITY,
        payload: {id: currentMember._id},
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMember]);

  useEffect(() => {
    memberClassData.length > 0 &&
      setCurrentSessionId(
        memberClassData?.filter(
          item =>
            item?.enrolledStatus === 'ENROLLED' ||
            item?.enrolledStatus === 'WAITLISTED',
        )[activeDotIndex]?.session._id,
      );

    memberClassData.length > 0 &&
      dispatch({
        type: Action.USER_GET_SESSION_ATTENDANCE,
        payload: {
          token,
          data: {
            sessionId: memberClassData?.filter(
              item =>
                item?.enrolledStatus === 'ENROLLED' ||
                item?.enrolledStatus === 'WAITLISTED',
            )[activeDotIndex]?.session._id,
            memberId: currentMember._id,
          },
        },
      });

    //console.log('checking session', classList[activeDotIndex]?.session);
    if (classList[activeDotIndex]?.session) {
      let upcomingDates = [];
      let today = new Date();
      let startDate = new Date(classList[activeDotIndex]?.session?.startDate);
      let endDate = new Date(classList[activeDotIndex]?.session?.endDate);
      let pattern = classList[activeDotIndex]?.session?.pattern.map(
        item => item.day,
      );

      while (startDate <= endDate) {
        // console.log('before includes', pattern, newDays[startDate.getDay()]);
        if (pattern.includes(newDays[startDate.getDay()])) {
          // console.log('includes', startDate, newDays[startDate.getDay()]);
          if (startDate > today) {
            upcomingDates.push(startDate.toString());
          }
        }
        startDate.setDate(startDate.getDate() + 1);
        //console.log('after set', upcomingDates);
      }

      setNumberOfSession(upcomingDates.length);
    }

    // currentSessionId &&
    //   fetchAttendanceOfMemberInSession({
    //     token,
    //     data: {
    //       sessionId: currentSessionId,
    //       memberId: currentMember._id,
    //     },
    //   }).then(attendance => {
    //     dispatch({
    //       type: Action.USER_GET_CURRENT_MEMBER_ATTENDANCE,
    //       payload: attendance.attendance,
    //     });
    //     setCurrentSessionAttendance(attendance.attendance);
    //   });

    // eslint-disable-next-line react-hooks/exhaustive-deps

    memberClassData &&
      setClassList(
        memberClassData?.filter(
          item =>
            item?.enrolledStatus === 'ENROLLED' ||
            item?.enrolledStatus === 'WAITLISTED',
        ),
      );
  }, [memberClassData, activeDotIndex]);
  //console.log('class list in home', classList);
  const renderItem = ({item, index}) => {
    // console.log('inside class card', item.session);
    return (
      <ClassCard
        id={item.clubMembershipId}
        className={item.class.name}
        subtitle={item.business.name}
        day={item.session.pattern[0].day}
        time={`${moment(item.session.pattern[0].startTime).format(
          'hh:mm A',
        )} - ${moment(item.session.pattern[0].endTime).format('hh:mm A')} `}
        facility={item.session.facility}
        coach={item.session.coachId.name}
        style={{backgroundColor: 'white', borderRadius: 20}}
      />
    );
  };

  useEffect(() => {
    // console.log('inside Attendence card', sessionAttendance);
    setCurrentSessionAttendance(sessionAttendance.attendance);
  }, [sessionAttendance]);
  //console.log('memberClassData length', memberClassData);
  useEffect(() => {
    setCurrentSessionAttendance('');

    memberActivityProgress &&
    memberActivityProgress.docs.length > 0 &&
    memberActivityProgress.docs[activeDotIndex]
      ? memberActivityProgress.docs[activeDotIndex].levels &&
        memberActivityProgress.docs[activeDotIndex].levels.forEach(levels => {
          // console.log('levels ', levels);
          if (levels.status === 'AWARDED') {
            count += 1;
          } else if (levels.status === 'IN_PROGRESS') {
            count += 0.5;
          }
        })
      : null;
    //console.log('count', count);
    if (count > 0) {
      // console.log(
      //   'inside if ',
      //   count / memberActivityProgress.docs[activeDotIndex].levelCount,
      //   memberActivityProgress.docs[activeDotIndex].levelCount,
      // );
      setValue(count / memberActivityProgress.docs[activeDotIndex].levelCount);
    } else {
      setValue(count);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeDotIndex, currentMember, memberActivityProgress]);
  return (
    <ScrollView style={{backgroundColor: colors.white}}>
      <StatusBar backgroundColor="rgb(255,163,0)" />
      <View style={styles.container}>
        <LinearGradient
          colors={[colors.orangeYellow, colors.pumpkinOrange]}
          style={styles.linearGradient}>
          <Text style={styles.welcome}>{`Hi ${
            parent ? parent.name : 'Parent'
          }`}</Text>
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
              <Text style={styles.memberName}>{currentMember?.name}</Text>
            </View>
            <View style={{flex: 1}} />
            {membersdata && membersdata.length > 1 ? (
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
            ) : null}
          </View>
          <WheelDropdown
            title="child"
            visible={memberModal}
            isCyclic={false}
            setVisibility={modal => setMemberModal(modal)}
            cancel={() => setMemberModal(false)}
            confirm={() => {
              setCurrentMemberIndex(wheelitem);
              setCurrentMember(membersdata[wheelitem]);

              dispatch({
                type: Action.USER_GET_CURRENT_MEMBER_DATA,
                payload: currentMember,
              });
              dispatch(getmemberClass(membersdata[wheelitem]._id));
              setMemberModal(false);
            }}>
            <View
              style={{
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: wp('8%'),
                marginBottom: -hp('3%'),
              }}>
              <WheelPicker
                data={members}
                isCyclic={false}
                onItemSelected={wheelselected}
                selectedItem={wheelitem}
                selectedItemTextColor={'black'}
                selectedItemTextSize={Fontsize}
                itemTextFontFamily="Nunito-Regular"
                selectedItemTextFontFamily="Nunito-Regular"
              />
            </View>
          </WheelDropdown>
          <View style={styles.courosoul} />
          {classList.length > 0 ? (
            <Carousel
              data={
                memberClassData &&
                memberClassData?.filter(
                  item =>
                    item?.enrolledStatus === 'ENROLLED' ||
                    item?.enrolledStatus === 'WAITLISTED',
                )
              }
              renderItem={renderItem}
              sliderWidth={wp('95%')}
              itemWidth={wp('90%')}
              onSnapToItem={async index => {
                setActiveDotIndex(index);
                setCurrentSessionId(
                  memberClassData &&
                    memberClassData?.filter(
                      item =>
                        item?.enrolledStatus === 'ENROLLED' ||
                        item?.enrolledStatus === 'WAITLISTED',
                    )[index].session._id,
                );
                // const attendance =
                //   currentSessionId &&
                //   (await fetchAttendanceOfMemberInSession({
                //     token,
                //     data: {
                //       sessionId: currentSessionId,
                //       memberId: currentMember._id,
                //     },
                //   }));
                // setCurrentSessionAttendance(attendance.attendance);
              }}
            />
          ) : (
            // <View
            //   style={{
            //     backgroundColor: 'white',
            //     borderRadius: 20,
            //     alignContent: 'center',
            //     justifyContent: 'center',
            //     alignItems: 'center',
            //     height: hp('15%'),
            //     marginRight: wp('3%'),
            //   }}>
            <TouchableOpacity
              // activeOpacity={3}
              style={{
                backgroundColor: 'white',
                borderRadius: 20,
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                height: hp('15%'),
                marginRight: wp('3%'),
              }}
              onPress={() => {
                dispatch({
                  type: Action.USER_ADD_CHILD_SUCCEDED,
                  payload: {member: currentMember},
                });
                dispatch(
                  getClubdata({
                    callback: () => {
                      navigation.navigate('New_Class_Selection', {
                        from: 'homeTab',
                      });
                    },
                  }),
                );
                // dispatch({
                //   type: Action.USER_GET_CURRENT_MEMBER_DATA,
                //   payload: currentMember,
                // });
                // navigation.navigate('EnrolledChild' );
              }}>
              <Text style={{fontSize: wp('6%'), color: colors.orange}}>
                Please add a Class
              </Text>
            </TouchableOpacity>
            // </View>
          )}
          <View
            style={{
              paddingVertical: hp('0.8%'),
              width: wp('90%'),
              alignItems: 'center',
            }}>
            {pagination()}
          </View>
        </LinearGradient>
      </View>

      {/* /////////////////////class Overview/////////// */}
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
              class={(numberOfSession ? numberOfSession : 0).toString()}
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
            value={
              currentSessionAttendance?.attendedCount !== undefined
                ? currentSessionAttendance.attendedCount
                : 0
            }
            label={'Attended'}
            style={{backgroundColor: '#c0f8e8'}}
          />
          <AttendanceCard
            color={['#EA5C5C', '#AB3333']}
            value={
              currentSessionAttendance?.attendedCount !== undefined
                ? currentSessionAttendance.totalCount -
                  currentSessionAttendance.attendedCount
                : 0
            }
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
      {memberActivityProgress &&
      memberActivityProgress.docs.length > 0 &&
      memberActivityProgress.docs[activeDotIndex] ? (
        <View style={[styles.ProgressReports, styles.timeline]}>
          <View style={{paddingRight: wp('4%'), paddingTop: wp('3%')}}>
            <ProgressBarWithStar value={value} />
          </View>
          <View
            style={{
              height: hp('0.4%'),
              width: '100%',
              marginVertical: hp('1%'),
              backgroundColor: colors.lightgrey,
            }}
          />
          {/* <Timelines
            data={
              memberActivityProgress &&
              memberActivityProgress.docs.length > 0 &&
              memberActivityProgress.docs[activeDotIndex]
                ? memberActivityProgress.docs[activeDotIndex]?.levels
                : null
            }
          /> */}
          <NewTimelines
            data={
              memberActivityProgress &&
              memberActivityProgress.docs.length > 0 &&
              memberActivityProgress.docs[activeDotIndex]
                ? memberActivityProgress.docs[activeDotIndex]?.levels
                : null
            }
          />
        </View>
      ) : (
        <View style={styles.remark}>
          <View style={styles.mark}>
            <Image source={require('../../assets/images/icon-info.png')} />
          </View>
          <Text style={styles.marktext}>
            No Attendance records available at this time
          </Text>
        </View>
      )}

      {signOutFlag ? (
        <Alert
          visible={signOutFlag}
          confirm={'Sign In'}
          success={() => {
            setSignOutFlag(false);
            SignOut();
          }}
          image={'failure'}
          message={'Session expired.'}
          // success={() => props.navigation.navigate('Login')}
          // image={'failure'}
          // message={'Something Went Wrong'}
        />
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:colors.white
  },
  linearGradient: {
    paddingTop: hp('2%'),
    paddingLeft: wp('4%'),
    paddingBottom: hp('3%'),
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
  remark: {
    borderRadius: 10,
    height: hp('12%'),
    marginHorizontal: wp('4%'),
    marginVertical: hp('7%'),
    paddingHorizontal: wp('1.8%'),
    paddingTop: hp('.1%'),
    flexDirection: 'row',
    backgroundColor: '#fff2e6',
    // marginVertical: hp('1%'),
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
    color: '#d26800',
    alignSelf: 'center',
    flex: 1,
    fontSize: Fontsize,
    fontFamily: 'Nunito-Regular',
  },
});

export default Home;
