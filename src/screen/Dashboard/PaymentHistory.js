/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import * as Action from '../../redux/action-types';
import {Text, FlatList, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-snap-carousel';
import {useDispatch, useSelector} from 'react-redux';
import {CustomLayout, ClassCard, PaymentCard, Card} from '../../components';
import {colors, Fontsize, hp, wp} from '../../constants';
import {getmemberClass} from '../../redux/action/home';
import moment from 'moment';
import {date} from 'yup/lib/locale';

export default function EnrolledChild() {
  const dispatch = useDispatch();
  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const [groupedData, setGroupedData] = useState('');
  const [businessList, setBusinessList] = useState('');
  const months = [
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
  const membersData = useSelector(state => state.memberData.memberData);
  const memberClassData = useSelector(state => state.memberClassData.classData);
  const currentMember = useSelector(state => state.currentMemberData.data);
  const bills = useSelector(state => state.memberBills);
  console.log('data123: ', bills.data);

  useEffect(() => {
    businessList && businessList.length > 0
      ? console.log(currentMember, businessList[activeDotIndex].id)
      : null;
    businessList && businessList.length > 0
      ? dispatch({
          type: Action.USER_GET_MEMBER_BILLS,
          payload: {
            memberId: currentMember._id,
            businessId: businessList[activeDotIndex].id,
          },
          // {
          //   memberId: ,
          //   businessId: ,
          // },
        })
      : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeDotIndex, businessList, currentMember]);
  useEffect(() => {
    setGroupedData(
      groupBy(
        memberClassData?.filter(item => item?.enrolledStatus === 'ENROLLED'),
      ),
    );
    var businesses = [];
    // eslint-disable-next-line no-unused-vars
    for (const [key, value] of Object.entries(groupedData)) {
      businesses.push({id: key});
    }
    setBusinessList(businesses);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberClassData]);
  useEffect(() => {
    membersData && dispatch(getmemberClass(membersData[activeDotIndex]._id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeDotIndex]);
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
  const findDate = item => {
    var month = new Date(item.dueDate).getMonth();
    var year = new Date(item.generatedAt).getFullYear();
    if (month === 11) {
      year = year + 1;
      month = 0;
    }
    console.log(month);
    return `${months[month]} ${year} fee`;
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
    var temp =
      memberClassData &&
      memberClassData?.filter(item1 => item1.business._id === item.item.id);
    return (
      <LinearGradient
        style={{
          height: hp('25%'),
          borderRadius: 20,
          marginTop: hp('5%'),
        }}
        colors={['#ffa300', '#ff7e00']}>
        <View style={{marginLeft: wp('2%'), marginTop: hp('2%')}}>
          <Text style={{color: '#f7cf79', fontSize: Fontsize}}>
            Student Name
          </Text>
          <Text
            style={{
              color: colors.white,
              fontSize: Fontsize + wp('1%'),
              //fontWeight: 'bold',
            }}>
            {currentMember.name}
          </Text>
          <Text style={{color: '#f7cf79', fontSize: Fontsize}}>Club Name</Text>
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
          </Text>
        </View>
      </LinearGradient>
    );
  };
  return (
    <CustomLayout
      names={'Payment History'}
      Customchildren={
        <>
          {businessList.length > 0 ? (
            <Carousel
              data={businessList}
              renderItem={renderItem}
              sliderWidth={wp('95%')}
              itemWidth={wp('90%')}
              onSnapToItem={async index => {
                setActiveDotIndex(index);
              }}
            />
          ) : null}
        </>
      }>
      <Text style={{fontFamily: 'Nunito-SemiBold'}}>Current Classes </Text>
      <FlatList
        data={
          memberClassData && businessList.length > 0
            ? memberClassData?.filter(
                item =>
                  item?.enrolledStatus === 'ENROLLED' &&
                  item.business._id === businessList[activeDotIndex].id,
              )
            : null
        }
        key={item => item._id}
        renderItem={item => {
          console.log('item: ', item);
          return (
            <>
              <ClassCard
                id={item.item.clubMembershipId}
                className={item.item.class.name}
                //subtitle={"Child's Club Id "}
                day={item.item.session.pattern[0].day}
                time={
                  item.item.session && item.item.session.pattern.length > 0
                    ? time(
                        new Date(item.item.session.pattern[0].startTime),
                        new Date(item.item.session.pattern[0].endTime),
                      )
                    : null
                }
                facility={item.item.session.facility}
                coach={'Henry Itondo'}
              />
              <PaymentCard>
                <FlatList
                  data={bills.data.docs}
                  key={item1 => item1._id}
                  renderItem={item1 => {
                    //console.log(item1.item.classId, item.item.classId);
                    return (
                      <>
                        {item1.item.classId === item.item.classId ? (
                          <>
                            <Card
                              paystyle={{backgroundColor: colors.reddish}}
                              notify={
                                item1.item.billStatus === 'PAID'
                                  ? 'Paid'
                                  : 'Not Paid'
                              }
                              amount={item1.item.total}
                              body={findDate(item1.item)}
                              date={`Due Date ${moment(
                                new Date(item1.item.dueDate),
                              ).format('DD/MM/YYYY')}`}
                              button
                              title="Pay Now"
                              paybutton={() => {}}
                              substyle={{
                                borderColor: colors.reddish,
                                borderWidth: 1,
                              }}
                              style={{
                                backgroundColor:
                                  item.item.billStatus === 'PAID'
                                    ? colors.veryLightGreen
                                    : colors.reddish,
                              }}
                            />
                          </>
                        ) : null}
                      </>
                    );
                  }}
                />
              </PaymentCard>
            </>
          );
        }}
      />
    </CustomLayout>
  );
}
