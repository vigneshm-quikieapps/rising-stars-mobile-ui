/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ActivityIndicator,
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
  const [currentSessionAttendance, setCurrentSessionAttendance] = useState();
  const [currentTermId, setCurrentTermId] = useState('');
  const [currentClassId, setCurrentClassId] = useState('');
  const [upcomingAttendance, setUpcomingAttendance] = useState(0);
  const [numberOfSession, setNumberOfSession] = useState(0);

  const [upcomingDatesArr, setUpcomingDatesArr] = useState([]);
  const [loadingFlag, setLoadingFlag] = useState(false);
  const [attended, setAttended] = useState(0);
  const [absent, setAbsent] = useState(0);
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
  const newDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
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

  const dispatchValues = id => {
    setCurrentSessionAttendance('');
    setAbsent(0);
    setAttended(0);
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
    sessionAttendance &&
      generateAttendenceDates(sessionAttendance.attendance.records);
    //setCurrentSessionAttendance(sessionAttendance.attendance);
  }, [sessionAttendance]);

  useEffect(() => {
    getLocalUserData();

    token && dispatch(getmemberData(token));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    membersdata && setCurrentMember(membersdata[currentMemberIndex]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    //console.log('set current member', membersdata[currentMemberIndex]);
  }, [membersdata, currentMemberIndex]);

  useEffect(() => {
    currentMember && dispatch(getmemberClass(currentMember._id));

    currentMember &&
      dispatch({
        type: Action.USER_GET_CURRENT_MEMBER_DATA,
        payload: currentMember,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMember]);

  useEffect(() => {
    let currsesID =
      memberClassData.length > 0 &&
      memberClassData?.filter(item => item?.enrolledStatus === 'ENROLLED')[
        activeDotIndex
      ]?.session._id;

    setCurrentSessionId(currsesID);

    let currTermID =
      memberClassData.length > 0 &&
      memberClassData?.filter(item => item?.enrolledStatus === 'ENROLLED')[
        activeDotIndex
      ]?.session.term._id;

    setCurrentTermId(currTermID);
    //console.log('termID>>>>', currTermID);

    let currClassId =
      memberClassData.length > 0 &&
      memberClassData?.filter(item => item?.enrolledStatus === 'ENROLLED')[
        activeDotIndex
      ]?.session.classId;

    setCurrentClassId(currClassId);
    // console.log('classID -- >>>>', currClassId);

    currentTermId &&
      fetchSessionById({
        token,
        data: {
          termId: currTermID,
          classId: currClassId,
        },
      })
        .then(resp => {
          //console.log('sessions -- >>>>', resp.docs);

          setUpcomingAttendance(resp.docs);
          return resp.docs;
        })
        .then(r => generateUpcomingDates(r));

    currentSessionId &&
      fetchAttendanceOfMemberInSession({
        token,
        data: {
          sessionId: currsesID,
          memberId: currentMember._id,
        },
      }).then(attendance => {
        dispatch({
          type: Action.USER_GET_CURRENT_MEMBER_ATTENDANCE,
          payload: attendance.attendance,
        });
        attendance.attendance;
        generateAttendenceDates(attendance.attendance.records);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberClassData, activeDotIndex]);

  const generteMnthWiseDates = datesArr => {
    //console.log('mnthWiseDAtes aTteneden', datesArr);
    let monthWiseData = {};
    if (datesArr) {
      let startup = new Date(datesArr[0].date);

      let mwd = [datesArr[0]];
      for (let i = 1; i < datesArr.length; i++) {
        let currup = new Date(datesArr[i].date);
        //console.log('inside loop', startup);

        if (
          startup.getMonth() === currup.getMonth() &&
          startup.getFullYear() === currup.getFullYear()
        ) {
          //console.log('inside if', currup);
          mwd.push(datesArr[i]);
        } else {
          //console.log('inside else', currup);
          monthWiseData[startup.toString()] = [...mwd];
          mwd = [datesArr[i]];
          startup = new Date(datesArr[i].date);
        }
        if (i + 1 === datesArr.length) {
          //console.log('last element', mwd);
          monthWiseData[startup.toString()] = [...mwd];
        }
      }
    }
    return monthWiseData;
  };

  const generateAttendenceDates = datesArr => {
    let att = 0;
    let abs = 0;
    if (datesArr) {
      // console.log('inside generatea Attendance', datesArr);
      datesArr.forEach(element => {
        if (element.attended) {
          att += 1;
        } else {
          abs += 1;
        }
      });
      setAttended(att);
      setAbsent(abs);
      setCurrentSessionAttendance(generteMnthWiseDates(datesArr));
    }
    // console.log(
    //   'inside generate Attendenece dates',
    //   generteMnthWiseDates(datesArr),
    // );
  };

  const generateUpcomingDates = datesArr => {
    let upcomingDates = [];
    let today = new Date();
    let startDate = new Date(datesArr[0]?.startDate);
    let endDate = new Date(datesArr[0]?.endDate);
    let pattern = datesArr[0]?.pattern.map(item => item.day);
    let total = 0;

    while (startDate <= endDate) {
      // console.log('before includes', pattern, newDays[startDate.getDay()]);
      if (pattern.includes(newDays[startDate.getDay()])) {
        // console.log('includes', startDate, newDays[startDate.getDay()]);
        if (startDate > today) {
          upcomingDates.push(startDate.toString());
        }
        total += 1;
      }
      startDate.setDate(startDate.getDate() + 1);
    }
    setNumberOfSession(total);
    //console.log('after set attendence', upcomingDates);

    //console.log('DATE', upcomingDates);
    let monthWiseData = {};

    let startup = new Date(upcomingDates[0]);

    let mwd = [startup.toString()];
    for (let i = 1; i < upcomingDates.length; i++) {
      let currup = new Date(upcomingDates[i]);
      //console.log('inside loop', startup);

      if (
        startup.getMonth() === currup.getMonth() &&
        startup.getFullYear() === currup.getFullYear()
      ) {
        //console.log('inside if', currup);
        mwd.push(currup.toString());
      } else {
        //console.log('inside else', currup);
        monthWiseData[startup.toString()] = [...mwd];
        mwd = [upcomingDates[i]];
        startup = new Date(upcomingDates[i]);
      }
      if (i + 1 === upcomingDates.length) {
        //console.log('last element', mwd);
        monthWiseData[startup.toString()] = [...mwd];
      }
    }

    // console.log('mothwise data', monthWiseData);
    setUpcomingDatesArr(monthWiseData);
    setLoadingFlag(true);
  };

  const UpcomingClasses = () => {
    // console.log('inside UpComingClass', upcomingDatesArr);
    let keysOfData = Object.keys(upcomingDatesArr);
    return (
      <>
        <View
          style={{
            flex: 1,
            borderBottomWidth: 1,
            borderBottomColor: colors.lightgrey,
            marginTop: hp('1%'),
            marginBottom: hp('3%'),
          }}
        />
        {keysOfData.map((item, index) => {
          return (
            <View key={index}>
              <View style={{marginLeft: wp('2%')}}>
                <Text
                  style={{
                    marginBottom: wp('5%'),
                    fontSize: wp('5%'),
                    fontFamily: 'Nunito-SemiBold',
                  }}>
                  {/* {console.log('currentSessionAttendance.records', )} */}
                  {month[new Date(item).getMonth()]},{' '}
                  {new Date(item).getFullYear()}
                </Text>
              </View>
              {upcomingDatesArr[item].map((item2, index2) => {
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingBottom: 20,
                      //justifyContent: 'space-between',

                      // paddingLeft: wp('0%'),
                    }}
                    key={index2}>
                    <View
                      style={{
                        width: '24%',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: wp('4%'),
                          fontFamily: 'Nunito-Regular',
                          color: colors.blackOpacity,
                        }}>
                        {days[new Date(item2).getDay()]}
                      </Text>
                      <Text
                        style={{
                          color: colors.lightgrey,
                          fontSize: wp('8%'),
                          fontFamily: 'Nunito-SemiBold',
                        }}>
                        {new Date(item2).getDate()}
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
                    <View style={{justifyContent: 'center', width: '90%'}}>
                      <LinearGradient
                        colors={['rgb(255,255,255)', 'rgb(255,255,255)']}
                        style={{
                          padding: 20,
                          width: '100%',
                          borderTopLeftRadius: 16,
                          borderBottomLeftRadius: 16,
                          borderColor: '#d2d2d2',
                          borderWidth: 0.5,
                          //marginLeft: wp('1.5%'),
                        }}>
                        <Text
                          style={{
                            color: colors.lightgrey,
                            fontSize: wp('4.5%'),
                            fontFamily: 'Naunito-SemiBold',
                          }}>
                          Upcoming
                        </Text>
                      </LinearGradient>
                    </View>
                  </View>
                );
              })}
              <View
                style={{
                  flex: 1,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.lightgrey,
                  marginTop: hp('1%'),
                  marginBottom: hp('3%'),
                }}
              />
            </View>
          );
        })}
      </>
    );
  };

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

  const UpperComponent = () => {
    return (
      <View>
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
          {membersdata && membersdata.length > 1 ? (
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
          ) : null}
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
              isCyclic={false}
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
            onSnapToItem={index => {
              setActiveDotIndex(index);
              let id =
                memberClassData &&
                memberClassData?.filter(
                  item => item?.enrolledStatus === 'ENROLLED',
                )[index].session._id;
              dispatchValues(id);
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
            value1={numberOfSession}
            value2={attended}
            value3={absent}
          />
        </View>
      </View>
    );
  };
  return (
    <>
      {loadingFlag ? (
        <FlatList
          data={
            currentSessionAttendance && Object.keys(currentSessionAttendance)
          }
          keyExtractor={item => item}
          style={styles.container}
          ListFooterComponent={UpcomingClasses()}
          ListHeaderComponent={UpperComponent()}
          ListEmptyComponent={() => (
            <View style={styles.remark}>
              <View style={styles.mark}>
                <Image source={require('../../assets/images/icon-info.png')} />
              </View>
              <Text style={styles.marktext}>
                No Attendance records available at this time
              </Text>
            </View>
          )}
          ItemSeparatorComponent={() => (
            <View
              style={{
                flex: 1,
                borderBottomWidth: 1,
                borderBottomColor: colors.lightgrey,
                marginTop: hp('1%'),
                marginBottom: hp('3%'),
              }}
            />
          )}
          renderItem={item => {
            //console.log('currentSessionAttendance.records', item);
            return (
              <View style={{marginTop: hp('5%')}}>
                <View style={{marginLeft: wp('2%')}}>
                  <Text
                    style={{
                      marginBottom: wp('5%'),
                      fontSize: wp('5%'),
                      fontFamily: 'Nunito-SemiBold',
                    }}>
                    {/* {console.log('currentSessionAttendance.records', )} */}
                    {month[new Date(item.item).getMonth()]},{' '}
                    {new Date(item.item).getFullYear()}
                  </Text>
                </View>
                {currentSessionAttendance[item.item].map((attDate, index) => {
                  // console.log(
                  //   'currentSessionAttendance.records',
                  //   attDate,
                  // );
                  return (
                    <View
                      key={index}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingBottom: 20,
                      }}>
                      <View
                        style={{
                          width: wp('22%'),
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: wp('4%'),
                            fontFamily: 'Nunito-Regular',
                            color: colors.blackOpacity,
                          }}>
                          {days[new Date(attDate.date).getDay()]}
                        </Text>
                        <Text
                          style={{
                            fontSize: wp('8%'),
                            fontFamily: 'Nunito-SemiBold',
                          }}>
                          {new Date(attDate.date).getDate()}
                        </Text>
                      </View>
                      <View style={{justifyContent: 'center'}}>
                        <LinearGradient
                          colors={
                            attDate.attended === true
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
                      <View
                        style={{
                          justifyContent: 'center',
                          width: '100%',
                        }}>
                        <LinearGradient
                          colors={
                            attDate.attended === true
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
                            borderWidth: 0.5,
                            //item.status === 'Upcoming' ? 0.5 : 0,
                          }}>
                          <Text
                            style={{
                              color: colors.white,
                              fontSize: wp('4.5%'),
                              fontFamily: 'Naunito-SemiBold',
                            }}>
                            {attDate.attended ? 'Attended' : 'No Show'}
                          </Text>
                        </LinearGradient>
                      </View>
                    </View>
                  );
                })}
              </View>
            );
          }}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: hp('100%'),
            backgroundColor: colors.blackOpacity,
          }}>
          <ActivityIndicator size="large" color={colors.orange} />
        </View>
      )}
    </>
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
