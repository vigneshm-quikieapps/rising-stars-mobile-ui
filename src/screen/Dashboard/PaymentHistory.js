/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import * as Action from '../../redux/action-types';
import {Text, FlatList, View} from 'react-native';
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
import {colors, Fontsize, hp, wp} from '../../constants';
import {getmemberClass} from '../../redux/action/home';
import {date} from 'yup/lib/locale';
import {useNavigation} from '@react-navigation/native';
import PayNow from './PayNow';
import moment from 'moment';
import {Pagination} from 'react-native-snap-carousel';
import {ActivityIndicator} from 'react-native-paper';

export default function EnrolledChild() {
  const dispatch = useDispatch();
  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const [groupedData, setGroupedData] = useState('');
  const [businessList, setBusinessList] = useState('');
  const [currentPaidBills, setCurrentPaidBills] = useState([]);
  const [currentDueBills, setCurrentDueBills] = useState([]);
  const [currentUpcomigBills, setCurrentUpcomingBills] = useState([]);

  const navigation = useNavigation();

  const membersData = useSelector(state => state.memberData.memberData);
  const memberClassData = useSelector(state => state.memberClassData.classData);
  const currentMember = useSelector(state => state.currentMemberData.data);
  const bills = useSelector(state => state.memberBills);
  // console.log('data123: ', bills);

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

  // useEffect(() => {
  //   membersData && dispatch(getmemberClass(membersData[activeDotIndex]._id));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [activeDotIndex]);

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
      memberClassData?.filter(item => item?.enrolledStatus === 'ENROLLED');
    setBusinessList(businessesTemp);
  }, []);

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
        )} -${moment(item.session.pattern[0].endTime).format('hh:mm A')} `}
        facility={item.session.facility}
        coach={item.session.coachId.name}
        style={{backgroundColor: 'white', borderRadius: 20}}
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
    setCurrentPaidBills(paid);
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
    console.log('upcoming', upcoming[0]);
    setCurrentUpcomingBills(upcoming);
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
      <PaymentCard border={true}>
        {/* //////////////////////////////////////////Over Due bills/// */}

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
              button={true}
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
                button={true}
              />
            );
          }
        })}

        {/* //////////////////////////////////////////Paid bills/// */}
        {currentPaidBills.map((bill, index) => {
          if (index === 0) {
            return (
              <PayNow
                business={businessList[activeDotIndex]}
                item1={bill}
                key={index}
                notify={'Paid'}
                batchstyle={{backgroundColor: colors.seafoamBlue}}
                subStyle={{
                  backgroundColor: colors.limeGreen,
                  borderColor: colors.seafoamBlue,
                }}
                button={false}
              />
            );
          }
        })}

        {/* //////////////////////////////////////////Future Upcoming bills/// */}
        {currentUpcomigBills.map((bill, index) => {
          if (index !== 0) {
            return (
              <PayNow
                business={businessList[activeDotIndex]}
                item1={bill}
                key={index}
                notify={'Upcoming'}
                batchstyle={{backgroundColor: colors.lightRed}}
                subStyle={{
                  backgroundColor: colors.white,
                  borderColor: colors.orange,
                }}
                button={false}
              />
            );
          }
        })}
      </PaymentCard>
    </CustomLayout>
  );
}

{
  /* <FlatList
data={currentUpcomigBills}
key={item1 => item1._id}
ListEmptyComponent={() => (
  <ErrorMessage
    error={'No history to show'}
    visible={true}
    style={{fontSize: wp('3%')}}
  />
)}
renderItem={item1 => {
  //console.log(item1.item.classId, item.item.classId);
  return (
    <PayNow business={businessList[activeDotIndex]} item1={item1} />
  );
}}
/> */
}

//  <FlatList
// style={{
//   borderWidth: 1,
//   borderColor: colors.white,
//   elevation: 5,
//   borderRadius: 8,
//   // shadowColor: colors.lightgrey,
//   // shadowOffset: {width: 1, height: 1},
//   // shadowOpacity: 0.9,
//   overflow: 'hidden',
//   // shadowRadius: 5,
//   backgroundColor: colors.white,
// }}
// data={
//   memberClassData && businessList.length > 0
//     ? memberClassData?.filter(
//         item =>
//           item?.enrolledStatus === 'ENROLLED' &&
//           item.business._id === businessList[activeDotIndex].id,
//       )
//     : null
// }
// key={item => item._id}
// renderItem={item => {
//   // console.log('item: ', item);
//   return (
//     <>

//       <ClassCard
//         id={item.item.clubMembershipId}
//         className={item.item.class.name}
//         subtitle={item.item.business.name}
//         day={item.item.session.pattern[0].day}
//         time={`${moment(item.item.session.pattern[0].startTime).format(
//           'hh:mm A',
//         )} -${moment(item.item.session.pattern[0].endTime).format(
//           'hh:mm A',
//         )} `}
//         facility={item.item.session.facility}
//         // coach={'Henry Itondo'}
//         coach={item.item.session.coachId.name}
//         style={{backgroundColor: 'white', borderRadius: 20}}
//       />
//       {/* {console.log('item.item.session.coachId.name', item.item.session.coachId.name)} */}
//       <View
//         style={{
//           flex: 1,
//           borderBottomWidth: 1,
//           borderBottomColor: colors.lightgrey,
//         }}
//       />
//       <PaymentCard border={true}>
//         <FlatList
//           data={bills.data.docs}
//           key={item1 => item1._id}
//           ListEmptyComponent={() => (
//             <ErrorMessage
//               error={'No history to show'}
//               visible={true}
//               style={{fontSize: wp('3%')}}
//             />
//           )}
//           renderItem={item1 => {
//             //console.log(item1.item.classId, item.item.classId);
//             return <PayNow item={item} item1={item1} />;
//           }}
//         />
//       </PaymentCard>
//     </>
//   );
// }}
// />
