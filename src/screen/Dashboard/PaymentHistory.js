/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import * as Action from '../../redux/action-types';
import {Text, FlatList, View, StyleSheet, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-snap-carousel';
import {useDispatch, useSelector} from 'react-redux';
import {
  CustomLayout,
  ClassCard,
  PaymentCard,
  Card,
  StudentCard,
  ErrorMessage,
} from '../../components';
import {clubfinance} from '../../redux/action/enrol';
import {colors, Fontsize, hp, wp} from '../../constants';
import {getmemberClass, getmemberData} from '../../redux/action/home';
import {date} from 'yup/lib/locale';
import {useNavigation} from '@react-navigation/native';
import PayNow from './PayNow';
import moment from 'moment';
import {Pagination} from 'react-native-snap-carousel';
import {ActivityIndicator} from 'react-native-paper';
import {getLocalData} from '../../utils/LocalStorage';

export default function EnrolledChild() {
  const dispatch = useDispatch();
  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const [groupedData, setGroupedData] = useState('');
  const [businessList, setBusinessList] = useState('');
  const [currentPaidBills, setCurrentPaidBills] = useState([]);
  const [currentDueBills, setCurrentDueBills] = useState([]);
  const [currentUpcomigBills, setCurrentUpcomingBills] = useState([]);
  const [paymentChannels, setpaymentChannels] = useState([]);
  const navigation = useNavigation();
  const [token, setToken] = useState();
  const [showAtm, setShowAtm] = useState('');

  const membersData = useSelector(state => state.memberData.memberData);
  const memberClassData = useSelector(state => state.memberClassData.classData);
  const currentMember = useSelector(state => state.currentMemberData.data);
  const bills = useSelector(state => state.memberBills);
  const clubfinance2 = useSelector(
    state => state.clubfinance.financedata.businessFinance,
  );
  console.log('data123: ', bills);

  useEffect(() => {
    // businessList && businessList.length > 0
    //   ? console.log('====>', businessList)
    //   : null;
    businessList && businessList.length > 0
      ? dispatch({
          type: Action.USER_GET_MEMBER_BILLS,
          payload: {
            memberId: currentMember._id,
            businessId: businessList[activeDotIndex].businessId,
          },
          // {
          //   memberId: ,
          //   businessId: ,
          // },
        })
      : null;
    // console.log('new ===', businessList[activeDotIndex].businessId);
    businessList && businessList.length > 0
      ? dispatch(clubfinance(businessList[activeDotIndex].businessId))
      : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeDotIndex, businessList, currentMember]);

  // useEffect(() => {
  //   console.log('Member class Data', memberClassData);
  //   memberClassData &&
  //     setGroupedData(
  //       groupBy(
  //         memberClassData?.filter(item => item?.enrolledStatus === 'ENROLLED'),
  //       ),
  //     );
  //   var businesses = [];
  //   // eslint-disable-next-line no-unused-vars
  //   for (const [key, value] of Object.entries(groupedData)) {
  //     businesses.push({id: key});
  //   }
  //   console.log('Business0', groupedData);
  //   setBusinessList(businesses);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [memberClassData, bills]);

  // const accessToken = async () => {
  //   const Token = await getLocalData('accessToken');
  //   setToken(Token);
  // };

  // accessToken();

  // useEffect(() => {
  //   token && dispatch(getmemberData(token));
  //   console.log('memberDAta in useEffect', membersData);
  //   membersData && dispatch(getmemberClass(membersData[0]._id));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    if (bills.data) {
      let currentBills =
        bills &&
        bills.data.docs?.filter(item => {
          return item.classId === businessList[activeDotIndex]?.classId;
        });
      handlePayments(currentBills);
    }
  }, [bills]);

  useEffect(() => {
    let businessesTemp =
      memberClassData &&
      memberClassData?.filter(
        // item => item?.enrolledStatus === 'ENROLLED',
        item => item?.enrolledStatus === 'ENROLLED' || 'WAITLISTED',
      );
    //console.log('inside payment history', businessesTemp);
    setBusinessList(businessesTemp);
  }, [memberClassData]);

  useEffect(() => {
    setpaymentChannels(clubfinance2);
    // console.log('clubfinance2 ===', clubfinance2);
  }, [clubfinance2]);

  const groupBy = objectArray => {
    let groupData = {};
    objectArray.forEach(element => {
      if (element.business._id in groupData) {
        groupData[element.business._id].push(element);
      } else {
        groupData[element.business._id] = [];
        groupData[element.business._id].push(element);
      }
    });
    return groupData;
  };

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

  const renderItem = item => {
    // var temp =
    //   memberClassData &&
    //   memberClassData?.filter(item1 => item1.business._id === item.item.id);
    return (
      <StudentCard
        style={{marginTop: hp('5%')}}
        name={currentMember.name}
        // clubid={memberClassData[0].clubMembershipId}
        // activityrequired
        // activity={club.name}
      />
      // <LinearGradient
      //   style={{
      //     height: hp('25%'),
      //     borderRadius: 20,
      //     marginTop: hp('5%'),
      //   }}
      //   colors={['#ffa300', '#ff7e00']}>

      /* <View style={{marginLeft: wp('2%'), marginTop: hp('2%')}}>
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
          </Text> */
      /* <Text style={{color: '#f7cf79', fontSize: Fontsize}}>Club Name</Text>
          <Text
            style={{
              color: colors.white,
              fontSize: Fontsize + wp('1%'),
              //fontWeight: 'bold',
            }}>
            {temp[0].business.name}
          </Text>
          <Text style={{color: '#f7cf79', fontSize: Fontsize}}>Club Id</Text>
          <Text
            style={{
              color: colors.white,
              fontSize: Fontsize + wp('1%'),
              //fontWeight: 'bold',
            }}>
            {temp[0].clubMembershipId}
          </Text> */
      /* </View> */
      // </LinearGradient>
    );
  };

  const renderItemClassCard = ({item, index}) => {
    // console.log('inside class card', item.session.pattern[0].day);
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
        style={{
          backgroundColor: 'white',
          borderRadius: 20,
          borderWidth: 1,
          borderColor: colors.orange,
          elevation: 1,
          shadowColor: colors.lightgrey,
          shadowOffset: {width: 1, height: 1},
          shadowOpacity: 0.4,
          overflow: 'hidden',
        }}
        // border={true}
      />
    );
  };

  const pagination = () => {
    return (
      <Pagination
        dotsLength={businessList ? businessList.length : 1}
        activeDotIndex={activeDotIndex}
        containerStyle={{paddingVertical: 0}}
        dotStyle={{
          width: wp('2.5%'),
          height: wp('1.5%'),
          borderRadius: wp('5%'),
          marginHorizontal: -wp('2%'),
          backgroundColor: colors.orange,
        }}
        inactiveDotStyle={{
          // Define styles for inactive dots here
          backgroundColor: colors.grey,
          width: wp('3%'),
          height: wp('3%'),
          borderRadius: wp('2%'),
        }}
        inactiveDotOpacity={0.5}
        inactiveDotScale={0.5}
      />
    );
  };

  const handleSwipe = index => {
    setActiveDotIndex(index);
    setShowAtm('');
    // let currentBills = bills.data.docs.filter(item => {
    //   return item.classId === businessList[index].classId;
    // });
    // setCurrentIndexBills(currentBills);
  };

  const handlePayments = currentBills => {
    currentBills &&
      currentBills.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(a.dueDate) - new Date(b.dueDate);
      });

    let paid = currentBills.filter(item => {
      return item.paid === true;
    });
    // setCurrentPaidBills(paid);
    let notPaid = currentBills.filter(item => {
      return item.paid === false;
    });

    let currDate = new Date();
    let dues = notPaid.filter(item => {
      let due = new Date(item.dueDate);
      if (due.setHours(0, 0, 0, 0) < currDate.setHours(0, 0, 0, 0)) {
        return item;
      }
    });
    setCurrentDueBills(dues);
    let upcoming = notPaid.filter(item => {
      let due = new Date(item.dueDate);
      if (due.setHours(0, 0, 0, 0) >= currDate.setHours(0, 0, 0, 0)) {
        return item;
      }
    });
    //console.log('upcoming', upcoming[0]);
    setCurrentUpcomingBills(upcoming);
    upcoming.shift();
    setCurrentPaidBills([...paid, ...upcoming]);
  };

  const renderPaidAndUpcoming = ({item, index}) => {
    // console.log('inside renderPaidAndUpcoming', item);
    if (item.paidAt) {
      return (
        <PayNow
          business={businessList[activeDotIndex]}
          item1={item}
          key={index}
          notify={'Paid'}
          batchstyle={{backgroundColor: colors.seafoamBlue}}
          subStyle={{
            backgroundColor: colors.limeGreen,
            borderColor: colors.white,
          }}
          dueDateStyle={{
            color: colors.grey,
            fontSize: hp('2%'),
          }}
          paidOnStyle={{fontSize: hp('2%')}}
          button={false}
        />
      );
    } else {
      return (
        <PayNow
          business={businessList[activeDotIndex]}
          item1={item}
          key={index}
          notify={'Upcoming'}
          batchstyle={{backgroundColor: colors.lightRed}}
          subStyle={{
            backgroundColor: colors.lightgrey,
            borderColor: colors.white,
          }}
          dueDateStyle={{
            color: colors.grey,
            fontSize: hp('2%'),
          }}
          button={false}
        />
      );
    }
  };

  const selectAtm = id => {
    setShowAtm(id);
  };

  return (
    <CustomLayout
      names={'Payment History'}
      back
      backbutton={() => navigation.goBack()}
      Customchildren={
        <Carousel
          data={memberClassData}
          renderItem={renderItem}
          sliderWidth={wp('100%')}
          itemWidth={wp('100%')}
          // onSnapToItem={async index => {
          //   setActiveDotIndex(index);
          // }}
        />
      }>
      <Text style={{fontFamily: 'Nunito-SemiBold', marginBottom: hp('2%')}}>
        Current Classes
      </Text>
      <View style={styles.remark}>
        <View style={[styles.mark, {borderWidth: 0}]}>
          <Image source={require('../../assets/images/icon-info.png')} />
        </View>
        <Text style={styles.marktext}>No records available at this time</Text>
      </View>
      <View style={{paddingVertical: hp('1%'), backgroundColor: 'white'}}>
        {memberClassData.length > 0 ? (
          <Carousel
            data={businessList}
            renderItem={renderItemClassCard}
            sliderWidth={wp('92%')}
            itemWidth={wp('90%')}
            onSnapToItem={index => {
              handleSwipe(index);
            }}
          />
        ) : null}
      </View>
      <View
        style={{
          paddingVertical: hp('0.8%'),
          width: wp('90%'),
          alignItems: 'center',
        }}>
        {pagination()}
      </View>
      {/* {console.log('======club fincanc', paymentChannels)} */}
      {businessList.length > 0 ? (
        <PaymentCard border={true}>
          {/* //////////////////////////////////////////Over Due bills/// */}
          <View style={styles.remark}>
            <View style={styles.mark}>
              <Image
                style={styles.tick}
                source={require('../../assets/images/checkmark.png')}
              />
            </View>
            <Text style={styles.marktext}>
              You’ve confirmed Standing Order has been setup
            </Text>
          </View>
          {currentDueBills.map((bill, index) => {
            return (
              <PayNow
                business={businessList[activeDotIndex]}
                item1={bill}
                key={index}
                notify={'Over Due'}
                batchstyle={{backgroundColor: colors.reddish}}
                subStyle={{
                  backgroundColor: colors.white,
                  borderColor: colors.reddish,
                }}
                dueDateStyle={{
                  color: colors.reddish,
                  fontSize: hp('2%'),
                }}
                button={
                  paymentChannels
                    ? paymentChannels.paymentChannels.online
                    : false
                }
                selectAtm={selectAtm}
                showAtm={showAtm}
              />
            );
          })}

          {/* ////////////////////////////////////////// Upcoming bill/// */}
          {currentUpcomigBills.map((bill, index) => {
            if (index === 0) {
              return (
                <PayNow
                  business={businessList[activeDotIndex]}
                  item1={bill}
                  key={index}
                  notify={'Not Paid'}
                  batchstyle={{backgroundColor: colors.reddish}}
                  subStyle={{
                    backgroundColor: colors.white,
                    borderColor: colors.reddish,
                  }}
                  dueDateStyle={{
                    color: colors.reddish,
                    fontSize: hp('2%'),
                  }}
                  button={
                    paymentChannels
                      ? paymentChannels.paymentChannels.online
                      : false
                  }
                  selectAtm={selectAtm}
                  showAtm={showAtm}
                />
              );
            }
          })}
        </PaymentCard>
      ) : null}
      {/* //////////////////////////////////////////Paid bills/// */}
      {businessList.length > 0 ? (
        <View
          style={{
            paddingVertical: hp('1%'),
            backgroundColor: 'white',
            width: wp('100%'),
          }}>
          {currentPaidBills.length > 0 ? (
            <Carousel
              data={currentPaidBills}
              renderItem={renderPaidAndUpcoming}
              sliderWidth={wp('95%')}
              itemWidth={wp('83%')}
              onSnapToItem={index => {
                console.log(index);
              }}
            />
          ) : null}
        </View>
      ) : null}
    </CustomLayout>
  );
}

const styles = StyleSheet.create({
  remark: {
    borderRadius: 10,
    height: hp('12%'),
    // marginHorizontal: wp('4%'),
    marginVertical: hp('2%'),
    paddingHorizontal: wp('1.8%'),
    paddingTop: hp('.1%'),
    flexDirection: 'row',
    backgroundColor: '#fff2e6',
    // marginVertical: hp('1%'),
  },
  tick: {
    height: hp('3%'),
    width: hp('3%'),
  },
  mark: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('4%'),
    width: hp('4%'),
    marginRight: wp('2%'),
    borderColor: '#ff7e00',
    borderWidth: 1,
    borderRadius: 20,
  },
  marktext: {
    color: '#d26800',
    alignSelf: 'center',
    flex: 1,
    fontSize: Fontsize,
    fontFamily: 'Nunito-Regular',
  },
});
{
  /* <View style={{}}>
          {currentPaidBills.map((bill, index) => {
            if (bill.paidAt) {
              return (
                <PayNow
                  business={businessList[activeDotIndex]}
                  item1={bill}
                  key={index}
                  notify={'Paid'}
                  batchstyle={{backgroundColor: colors.seafoamBlue}}
                  subStyle={{
                    backgroundColor: colors.limeGreen,
                    borderColor: colors.white,
                  }}
                  dueDateStyle={{
                    color: colors.grey,
                    fontSize: hp('2%'),
                  }}
                  paidOnStyle={{fontSize: hp('2%')}}
                  button={false}
                />
              );
            } else {
              return (
                <PayNow
                  business={businessList[activeDotIndex]}
                  item1={bill}
                  key={index}
                  notify={'Upcoming'}
                  batchstyle={{backgroundColor: colors.lightRed}}
                  subStyle={{
                    backgroundColor: colors.lightgrey,
                    borderColor: colors.white,
                  }}
                  dueDateStyle={{
                    color: colors.grey,
                    fontSize: hp('2%'),
                  }}
                  button={false}
                />
              );
            }
          })}

          {/* //////////////////////////////////////////Future Upcoming bills/// */
}
{
  /* {currentUpcomigBills.map((bill, index) => {
            if (index !== 0) {
              return (
                <PayNow
                  business={businessList[activeDotIndex]}
                  item1={bill}
                  key={index}
                  notify={'Upcoming'}
                  batchstyle={{backgroundColor: colors.lightRed}}
                  subStyle={{
                    backgroundColor: colors.lightgrey,
                    borderColor: colors.white,
                  }}
                  button={false}
                />
              );
            }
          })} */
}
// </View> */}
