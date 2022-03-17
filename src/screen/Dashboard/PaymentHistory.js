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
import {date} from 'yup/lib/locale';
import { useNavigation } from '@react-navigation/native';
import PayNow from './PayNow';

export default function EnrolledChild() {
  const dispatch = useDispatch();
  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const [groupedData, setGroupedData] = useState('');
  const [businessList, setBusinessList] = useState('');
  const navigation = useNavigation()
  
  const membersData = useSelector(state => state.memberData.memberData);
  const memberClassData = useSelector(state => state.memberClassData.classData);
  const currentMember = useSelector(state => state.currentMemberData.data);
  const bills = useSelector(state => state.memberBills);
  //console.log('data123: ', bills);

  useEffect(() => {
    businessList && businessList.length > 0
      ? console.log("====>",currentMember, businessList[activeDotIndex].id)
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
  }, [memberClassData,bills]);


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
      style={{
        borderWidth:1,
        borderColor:colors.lightgrey,
        elevation:5,
        borderRadius:8,
        shadowColor: colors.lightgrey,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.4,
        overflow: 'hidden',
        shadowRadius: 5,
        backgroundColor:colors.white
      }}
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
         // console.log('item: ', item);
          return (
            <>
              <ClassCard
              //border={true}
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
              <View style={{flex:1,borderBottomWidth:1,borderBottomColor:colors.lightgrey}}  />
              <PaymentCard border={true}>
                <FlatList
                  data={bills.data.docs}
                  key={item1 => item1._id}
                  renderItem={item1 => {
                    //console.log(item1.item.classId, item.item.classId);
                    return (
                      <PayNow item={item} item1={item1} />
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
