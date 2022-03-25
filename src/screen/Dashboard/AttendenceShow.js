/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  SectionList,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-snap-carousel';
import {WheelPicker} from 'react-native-wheel-picker-android';
import {useDispatch, useSelector} from 'react-redux';
import {AttendanceOverview, WheelDropdown} from '../../components';
import {colors, Fontsize, hp, wp} from '../../constants';
import {getmemberClass, getmemberData} from '../../redux/action/home';
import * as Action from '../../redux/action-types';
import {getLocalData} from '../../utils/LocalStorage';
import {
  fetchAttendanceOfMemberInSession,
  fetchSessionById,
} from '../../redux/service/request';
import {FlatList} from 'react-native-gesture-handler';

const itemWidth = Dimensions.get('window').width;

const AttendenceShow = () => {
  const membersdata = useSelector(state => state.memberData.memberData);
  const sessionAttendance = useSelector(
    state => state.sessionlist.sessionAttendance,
  );
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [wheelitem, setItem] = useState(0);
  const [currentMember, setCurrentMember] = useState('');
  const memberClassData = useSelector(state => state.memberClassData.classData);
  const [user, setUser] = useState('');
  const [token, setToken] = useState();
  const [currentMemberIndex, setCurrentMemberIndex] = useState(0);
  const [currentSessionId, setCurrentSessionId] = useState('');
  const [activeDotIndex, setActiveDotIndex] = React.useState(0);
  const [currentSessionAttendance, setCurrentSessionAttendance] = useState('');
  const [currentTermId, setCurrentTermId] = useState('');
  const [currentClassId, setCurrentClassId] = useState('');
  const [upcomingAttendance, setUpcomingAttendance] = useState('');
  const [dayPattern, setDayPattern] = useState(null);
  // const Item = ({title}) => (
  //   <View style={styles.item}>
  //     <Text style={styles.title}>{title}</Text>
  //   </View>
  // );

  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thusday',
    'Friday',
    'Saturday',
  ];
  const newDays = ['sun', 'mon', 'tue', 'wed', 'Thu', 'Fri', 'Sat'];
  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  var member = [];
  const accessToken = async () => {
    const Token = await getLocalData('accessToken');
    setToken(Token);
  };

  const getLocalUserData = useCallback(async () => {
    const userData = await getLocalData('user', true);
    setUser(userData);
  }, []);

  const dispatchValues = () => {
    setCurrentSessionAttendance('');
    dispatch({
      type: Action.USER_GET_SESSION_ATTENDANCE,
      payload: {
        token,
        data: {
          sessionId: id,
          memberId: currentMember._id,
        },
      },
      callback: () => {},
    });
  };

  membersdata && membersdata.map(item => member.push(item.name));

  accessToken();

  useEffect(() => {
    setCurrentSessionAttendance(sessionAttendance.attendance);
  }, [sessionAttendance]);

  useEffect(() => {
    getLocalUserData();

    token && dispatch(getmemberData(token));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMember]);
  var id = '';
  useEffect(() => {
    memberClassData.length > 1 &&
      setCurrentSessionId(
        memberClassData?.filter(item => item?.enrolledStatus === 'ENROLLED')[
          activeDotIndex
        ].session._id,
      );
    memberClassData.length > 1 &&
      setCurrentTermId(
        memberClassData?.filter(item => item?.enrolledStatus === 'ENROLLED')[
          activeDotIndex
        ].session.term._id,
      );
    console.log('termID>>>>', currentTermId);
    memberClassData.length > 1 &&
      setCurrentClassId(
        memberClassData?.filter(item => item?.enrolledStatus === 'ENROLLED')[
          activeDotIndex
        ].session.classId,
      );
    console.log('classID -- >>>>', currentClassId);

    currentTermId &&
      fetchSessionById({
        token,
        data: {
          termId: currentTermId,
          classId: currentClassId,
        },
      }).then(resp => {
        setUpcomingAttendance(resp.docs);
      });

    currentSessionId &&
      fetchAttendanceOfMemberInSession({
        token,
        data: {
          sessionId: currentSessionId,
          memberId: currentMember._id,
        },
      }).then(attendance => {
        dispatch({
          type: Action.USER_GET_CURRENT_MEMBER_ATTENDANCE,
          payload: attendance.attendance,
        });
        setCurrentSessionAttendance(attendance.attendance);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberClassData]);
  const renderItem = ({item, index}) => {
    return (
      <LinearGradient
        colors={['#ffa300', '#ff7e00']}
        style={{
          width: '100%',
          justifyContent: 'center',
          // paddingVertical: 30,
          // paddingHorizontal: 10,
          // paddingTop: 24,
          height: hp('20%'),
          // paddingBottom: 20,
          backgroundColor: colors.white,
          borderRadius: 16,
        }}>
        {/* {console.log('UPCOMING=============', upcomingAttendance)} */}
        {/* {console.log('membersdata', memberClassData)} */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            // alignItems: 'center',
            // backgroundColor: 'gray',
          }}>
          <View>
            <Text
              style={{
                fontSize: wp('3.5%'),
                color: colors.white,
                opacity: 0.8,
                fontFamily: 'Nunito-Regular',
              }}>
              Class Name
            </Text>
            <Text
              style={{
                fontSize: wp('4.3%'),

                color: colors.white,
                fontFamily: 'Nunito-SemiBold',
              }}>
              {item.class.name}
              {/* {item.business.name} */}
            </Text>

            <Text
              style={{
                fontSize: wp('3.5%'),
                color: colors.white,
                opacity: 0.8,
                fontFamily: 'Nunito-Regular',
                paddingTop: wp('2%'),
              }}>
              Club Name
            </Text>
            <Text
              style={{
                fontSize: wp('4.3%'),

                color: colors.white,
                fontFamily: 'Nunito-SemiBold',
              }}>
              {item.business.name}
              {/* {console.log('item', item.clubMembershipId)} */}
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: wp('3.5%'),
                color: colors.white,
                opacity: 0.8,
                fontFamily: 'Nunito-Regular',
                // paddingTop: wp('2%'),
              }}>
              Child's Club ID
            </Text>
            <Text
              style={{
                fontSize: wp('4.3%'),
                color: colors.white,
                fontFamily: 'Nunito-SemiBold',
              }}>
              {item.clubMembershipId}
            </Text>
          </View>
        </View>
      </LinearGradient>
    );
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{marginTop: 30}}>
          <Text
            style={{
              fontSize: wp('7%'),
              fontFamily: 'Nunito-SemiBold',
            }}>
            Attendance
          </Text>
        </View>

        <View
          style={{marginTop: 4, flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{fontSize: wp('4.5%'), fontFamily: 'Nunito-SemiBold'}}>
            {currentMember.name}
          </Text>
          <TouchableOpacity onPress={() => setShowModal(true)}>
            <View
              style={{
                backgroundColor: '#ffe49c',
                marginLeft: 6,
                marginRight: 20,
                height: 32,
                width: 32,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{height: 14, width: 18}}
                source={require('../../assets/images/icon-forward2-line-black.png')}
              />
            </View>
          </TouchableOpacity>
        </View>
        <WheelDropdown
          title="child"
          visible={showModal}
          setVisibility={modal => setShowModal(modal)}
          cancel={() => setShowModal(false)}
          confirm={() => {
            setCurrentMemberIndex(wheelitem);
            setCurrentMember(membersdata[wheelitem]);
            setShowModal(false);
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
              data={member}
              isCyclic={true}
              onItemSelected={item => setItem(item)}
              selectedItemTextColor={'black'}
              selectedItemTextSize={Fontsize}
              itemTextFontFamily="Nunito-Regular"
              selectedItemTextFontFamily="Nunito-Regular"
            />
          </View>
        </WheelDropdown>
        <View style={{marginTop: 14}}>
          <Carousel
            style={{width: 350}}
            layout={'default'}
            data={
              memberClassData &&
              memberClassData?.filter(
                item => item?.enrolledStatus === 'ENROLLED',
              )
            }
            sliderWidth={itemWidth - 30}
            itemWidth={itemWidth * 0.88}
            renderItem={renderItem}
            onSnapToItem={async index => {
              setActiveDotIndex(index);
              id =
                memberClassData &&
                memberClassData?.filter(
                  item => item?.enrolledStatus === 'ENROLLED',
                )[index].session._id;
              dispatchValues();
              // setCurrentSessionAttendance(
              //   currentSessionId &&
              //     (await fetchAttendanceOfMemberInSession({
              //       token,
              //       data: {
              //         sessionId: currentSessionId,
              //         memberId: currentMember._id,
              //       },
              //     })),
              // );
            }}
          />
        </View>
        <View style={{marginTop: 20}}>
          <AttendanceOverview
            linearGradient1={['#ffa300', '#ff7e00']}
            linearGradient2={['#68D6AB', '#33AB96']}
            linearGradient3={['#EA5C5C', '#AB3333']}
            backgroundColor1="rgba(255,244,231,1)"
            backgroundColor2="rgba(192,248,232,1)"
            backgroundColor3="rgba(255,229,229,1)"
            label1={'Total'}
            label2={'Attended'}
            label3={'No Show'}
            value1={(currentSessionAttendance?.totalCount
              ? currentSessionAttendance.totalCount
              : 0
            ).toString()}
            value2={
              currentSessionAttendance?.attendedCount
                ? currentSessionAttendance.attendedCount
                : 0
            }
            value3={
              currentSessionAttendance?.attendedCount !== undefined
                ? currentSessionAttendance.totalCount -
                  currentSessionAttendance.attendedCount
                : 0
            }
          />
        </View>
        <ScrollView>
          <View style={{marginTop: 30}}>
            {currentSessionAttendance &&
            currentSessionAttendance.records !== undefined ? (
              <>
                <View style={{marginLeft: wp('2%')}}>
                  <Text
                    style={{
                      marginBottom: wp('5%'),
                      fontSize: wp('5%'),
                      fontFamily: 'Nunito-SemiBold',
                    }}>
                    {/* {console.log('currentSessionAttendance.records', )} */}
                    {
                      month[
                        new Date(
                          currentSessionAttendance.records[0].date,
                        ).getMonth()
                      ]
                    }
                    ,{' '}
                    {new Date(
                      currentSessionAttendance.records[0].date,
                    ).getFullYear()}
                  </Text>
                </View>
                <FlatList
                  data={currentSessionAttendance.records}
                  keyExtractor={item => item._id}
                  renderItem={item => {
                    return (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingBottom: 20,
                        }}>
                        <View
                          style={{
                            width: '20%',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              fontSize: wp('4%'),
                              fontFamily: 'Nunito-Regular',
                              color: colors.blackOpacity,
                            }}>
                            {days[new Date(item.item.date).getDay()]}
                          </Text>
                          <Text
                            style={{
                              fontSize: wp('8%'),
                              fontFamily: 'Nunito-SemiBold',
                            }}>
                            {new Date(item.item.date).getDate()}
                          </Text>
                        </View>
                        <View style={{justifyContent: 'center'}}>
                          <LinearGradient
                            colors={
                              item.item.attended === true
                                ? ['#68D6AB', '#33AB96']
                                : ['#EA5C5C', '#AB3333']
                              // : item.status === 'Tardy'
                              // ? ['rgb(242,242,242)', 'rgb(242,242,242)']
                              // : item.status === 'Upcoming'
                              // ? ['rgb(255,255,255)', 'rgb(255,255,255)']
                              // : ['#ffa300', '#ff7e00']
                            }
                            style={{height: 1.5, width: 30}}
                          />
                        </View>
                        <View style={{justifyContent: 'center', width: '100%'}}>
                          <LinearGradient
                            colors={
                              item.item.attended === true
                                ? ['#68D6AB', '#33AB96']
                                : ['#EA5C5C', '#AB3333']
                              // : item.status === 'Tardy'
                              // ? ['rgb(242,242,242)', 'rgb(242,242,242)']
                              // : item.status === 'Upcoming'
                              // ? ['rgb(255,255,255)', 'rgb(255,255,255)']
                              // : ['#ffa300', '#ff7e00']
                            }
                            style={{
                              padding: 20,
                              width: '100%',
                              borderTopLeftRadius: 16,
                              borderBottomLeftRadius: 16,
                              borderColor: '#d2d2d2',
                              borderWidth: item.status === 'Upcoming' ? 0.5 : 0,
                            }}>
                            <Text
                              style={{
                                color: colors.white,
                                fontSize: wp('4.5%'),
                                fontFamily: 'Naunito-SemiBold',
                              }}>
                              {item.item.attended ? 'Attended' : 'No Show'}
                            </Text>
                          </LinearGradient>
                        </View>
                      </View>
                    );
                  }}
                />
              </>
            ) : (
              <View style={styles.remark}>
                <View style={styles.mark}>
                  <Image
                    source={require('../../assets/images/icon-info.png')}
                  />
                </View>
                <Text style={styles.marktext}>
                  No Attendance records available at this time
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
        <View
          style={{
            flex: 1,
            borderBottomWidth: 1,
            borderBottomColor: colors.lightgrey,
            marginTop: hp('1%'),
            marginBottom: hp('3%'),
          }}
        />
        {/* UPCOMING SESSIONS */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingBottom: 20,
          }}>
          <View
            style={{
              width: '20%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: wp('4%'),
                fontFamily: 'Nunito-Regular',
                color: colors.blackOpacity,
              }}>
              {/* {days[new Date(item.item.date).getDay()]} */}
              Saturday
            </Text>
            <Text
              style={{
                color: colors.lightgrey,
                fontSize: wp('8%'),
                fontFamily: 'Nunito-SemiBold',
              }}>
              {/* {new Date(item.item.date).getDate()} */}
              26
            </Text>
          </View>
          <View style={{justifyContent: 'center'}}>
            <LinearGradient
              colors={['rgb(255,255,255)', 'rgb(255,255,255)']}
              // {
              //   item.item.attended === true
              //     ? ['#68D6AB', '#33AB96']
              //     : ['#EA5C5C', '#AB3333']
              //   // : item.status === 'Tardy'
              //   // ? ['rgb(242,242,242)', 'rgb(242,242,242)']
              //   // : item.status === 'Upcoming'
              //   // ? ['rgb(255,255,255)', 'rgb(255,255,255)']
              //   // : ['#ffa300', '#ff7e00']
              // }
              style={{height: 1.5, width: 30}}
            />
          </View>
          <View style={{justifyContent: 'center', width: '100%'}}>
            <LinearGradient
              colors={['rgb(255,255,255)', 'rgb(255,255,255)']}
              // {
              // item.item.attended === true
              //   ? ['#68D6AB', '#33AB96']
              //   : ['#EA5C5C', '#AB3333']
              // : item.status === 'Tardy'
              // ? ['rgb(242,242,242)', 'rgb(242,242,242)']
              // : item.status === 'Upcoming'
              // ? ['rgb(255,255,255)', 'rgb(255,255,255)']
              // : ['#ffa300', '#ff7e00']
              // }
              style={{
                padding: 20,
                width: '100%',
                borderTopLeftRadius: 16,
                borderBottomLeftRadius: 16,
                borderColor: '#d2d2d2',
                borderWidth: 1,
              }}>
              <Text
                style={{
                  color: colors.lightgrey,
                  fontSize: wp('4.5%'),
                  fontFamily: 'Naunito-SemiBold',
                }}>
                {/* {item.item.attended ? 'Attended' : 'No Show'} */}
                Upcoming
              </Text>
            </LinearGradient>
          </View>
        </View>
        <FlatList
          data={upcomingAttendance}
          keyExtractor={item => item._id}
          renderItem={item => {
            function getDatesInRange(startDate, endDate) {
              const date = new Date(startDate.getTime());

              const dates = [];
              // });
              // console.log('pattern', item.item.pattern[0].day, dayPattern);
              while (date <= endDate) {
                // console.log('*****', items.day);
                item.item.pattern.map(items => {
                  // setDayPattern(items.day);
                  console.log('get pattern --- ', items.day);
                  if (
                    newDays[date.getDay()] == items.day
                    // days[date.getDay()] == 'Tuesday' ||
                    // days[date.getDay()] == 'Thusday' ||
                    // days[date.getDay()] == 'Saturday'
                  ) {
                    dates.push(new Date(date));
                    date.setDate(date.getDate() + 1);
                    // console.log(date);
                  } else {
                    date.setDate(date.getDate() + 1);
                  }
                });
              }
              // });
              return dates;
            }

            const d1 = new Date(item.item.term.startDate);
            const d2 = new Date(item.item.term.endDate);
            const dates = getDatesInRange(d1, d2);
            // console.log('hello', getDatesInRange(d1, d2));
            return (
              // <View>
              <View>
                <Text>Hello</Text>
                {/* hello */}
                {/* {console.log('dates', dates)} */}
                {/* {console.log('>>>Term Start & End date>>>', item.item.term.startDate, item.item.term.endDate)} */}
                {/* </View> */}
                {/* {console.log('>>>Term Pattern>>>', item.item.pattern)} */}

                {/* only getting first index i.e tuesday */}
                {dates.map(date => {
                  console.log('MAPPING FILTERED DATES', date);
                })}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingBottom: 20,
                  }}>
                  <View
                    style={{
                      width: '20%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: wp('4%'),
                        fontFamily: 'Nunito-Regular',
                        color: colors.blackOpacity,
                      }}>
                      {/* {days[new Date(date).getDay()]} */}
                    </Text>
                    <Text
                      style={{
                        color: colors.lightgrey,
                        fontSize: wp('8%'),
                        fontFamily: 'Nunito-SemiBold',
                      }}>
                      {/* {console.log('NAVED IS HERE WHY ARE YOU SAD', date)} */}
                      {/* {new Date(date).getDate()} */}
                      hhelo
                    </Text>
                  </View>
                  <View style={{justifyContent: 'center'}}>
                    <LinearGradient
                      colors={['rgb(255,255,255)', 'rgb(255,255,255)']}
                      // {
                      //   item.item.attended === true
                      //     ? ['#68D6AB', '#33AB96']
                      //     : ['#EA5C5C', '#AB3333']
                      //   // : item.status === 'Tardy'
                      //   // ? ['rgb(242,242,242)', 'rgb(242,242,242)']
                      //   // : item.status === 'Upcoming'
                      //   // ? ['rgb(255,255,255)', 'rgb(255,255,255)']
                      //   // : ['#ffa300', '#ff7e00']
                      // }
                      style={{height: 1.5, width: 30}}
                    />
                  </View>
                  <View style={{justifyContent: 'center', width: '100%'}}>
                    <LinearGradient
                      colors={['rgb(255,255,255)', 'rgb(255,255,255)']}
                      // {
                      // item.item.attended === true
                      //   ? ['#68D6AB', '#33AB96']
                      //   : ['#EA5C5C', '#AB3333']
                      // : item.status === 'Tardy'
                      // ? ['rgb(242,242,242)', 'rgb(242,242,242)']
                      // : item.status === 'Upcoming'
                      // ? ['rgb(255,255,255)', 'rgb(255,255,255)']
                      // : ['#ffa300', '#ff7e00']
                      // }
                      style={{
                        padding: 20,
                        width: '100%',
                        borderTopLeftRadius: 16,
                        borderBottomLeftRadius: 16,
                        borderColor: '#d2d2d2',
                        borderWidth: 1,
                      }}>
                      <Text
                        style={{
                          color: colors.lightgrey,
                          fontSize: wp('4.5%'),
                          fontFamily: 'Naunito-SemiBold',
                        }}>
                        {/* {item.item.attended ? 'Attended' : 'No Show'} */}
                        Upcoming
                      </Text>
                    </LinearGradient>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
    </ScrollView>
  );
};

export default AttendenceShow;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    // paddingLeft: 20,
    paddingHorizontal: 18,
  },
  remark: {
    borderRadius: 10,
    height: hp('12%'),
    paddingHorizontal: wp('1%'),
    paddingTop: hp('.1%'),
    flexDirection: 'row',
    backgroundColor: '#fff2e6',
    marginVertical: hp('1%'),
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
