/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {
  CustomLayout,
  StudentCard,
  ProgressTracker,
  ForwardButton,
  AtmCard,
  ClassCard,
  Card,
  AppButton,
} from '../../components';
import * as Action from '../../redux/action-types';

import {colors, Fontsize, hp, Stepend, wp} from '../../constants';
import {RadioButton} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import NewAppButton from '../../components/new-app-button';
import { updateTransaction } from '../../redux/service/request';


const StandingOrderPayNow = props => {

  const bills = useSelector(state => state.memberBills);
  const dispatch = useDispatch()
  const [loading,setLoading] = useState(false)
  const currentMember = useSelector(state => state.currentMemberData.data);

 // console.log("inside standing order",props.item1.item.id)

  const handlerPayment = async () => {
    setLoading(true)
    let request = await updateTransaction(props.item1.item.id);
    if(request.message==="Transaction updated.") {
        console.log("update redux state",request,props.item1.item.id);
        dispatch({
          type: Action.USER_GET_MEMBER_BILLS,
          payload: {
            memberId: currentMember._id,
            businessId: props.item.item.businessId,
          },
        })
           setLoading(false)
    }
    else{
      setLoading(false)
      alert("something went Wrong!")
    }
  }
    return (
      <View
        style={[
          styles.container,
          {
            height: props.visible ? hp('34.5%') : hp('10%'),
            borderColor: props.visible ? colors.orange : '#f2f2f2',
            backgroundColor: props.visible ? 'white' : '#f2f2f2',
          },
        ]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <RadioButton
            onPress={props.onPress}
            status={props.visible ? 'checked' : 'unchecked'}
          />
          <View style={{marginLeft: wp('3%')}}>
            <Text
              style={[
                styles.cardText,
                {fontSize: props.visible ? hp('2.5%') : wp('5%')},
              ]}>
              Confirm Standing Order
            </Text>
          </View>
        </View>
        <View style={{display: props.visible ? 'flex' : 'none'}}>
          {loading ? 
          <ActivityIndicator
          size="large"
          color={colors.orange}
          style={{marginVertical: hp('2%')}}
        />
          :
          <>
          <AppButton
            title={"I've setup Standing Order"}
            onPress={() => {
              handlerPayment()
            }}
            style={{width: wp('72%')}}
          />
          <NewAppButton
            title={"I'll setup Standing Order late"}
            onPress={() => {props.onPress()  }}
            style={{width: wp('72%')}}
            emptyContainer={true}
          /></>}
        </View>
      </View>
    );
  };

const PayNow = props => {
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
    const {item,item1} = props
    const child = useSelector(state => state.currentMemberData.data);

  const [showAtm, setShowAtm] = useState(false);
  const [showStandingOrder, setShowStandingOrder] = useState(false);
  const [totalAmt, setTotalAmt] = useState(0);

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

  return (
    <>
    {item1.item.classId === item.item.classId ? (
      <>
      {!showStandingOrder?
        <Card
          paystyle={{backgroundColor: colors.reddish}}
          notify={
            item1.item.billStatus
              ? 'Paid'
              : 'Not Paid'
          }
          paid={item1.item.paid}
          paidtext={`Paid on ${moment(new Date(item1.item.paidAt)).format('DD/MM/YYYY')}`}
          amount={item1.item.total}
          body={findDate(item1.item)}
          date={`Due Date ${moment(
            new Date(item1.item.dueDate),
          ).format('DD/MM/YYYY')}`}
          button={!item1.item.paid}
          //button
          title="Pay Now"
          paybutton={() => {setShowStandingOrder(true)}}
          substyle={{
            borderColor:item1.item.billStatus? colors.seafoamBlue:colors.reddish,
            borderWidth: 1,
            backgroundColor:item1.item.billStatus? colors.limeGreen:colors.white,
          }}
          style={{
            backgroundColor:
              item1.item.billStatus
                ? colors.seafoamBlue
                : colors.reddish,
          }}
        /> :
        <StandingOrderPayNow 
        onPress={() => {
            setShowStandingOrder(!showStandingOrder);
          }}
          visible={showStandingOrder}
          item1={item1}
          item={item}
           />
}
      </>
    ) : null}
  </>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      borderWidth: 1,
      padding: hp('2%'),
      marginVertical: hp('1%'),
      borderRadius: 10,
    },
    cardText: {
      fontFamily: 'Nunito-SemiBold',
      // fontWeight: "bold",
    },
    cardOption: {
      fontFamily: 'Nunito-SemiBold',
      color: colors.grey,
    },
    cardDetails: {
      flex: 1,
      height: hp('20%'),
      borderWidth: 1,
      borderRadius: 10,
      borderColor: colors.lightgrey,
      padding: hp('2%'),
    },
    breaks: {
      borderWidth: 1,
      borderColor: colors.orange,
      marginHorizontal: wp('1%'),
    },
    valid: {
      fontFamily: 'Nunito-SemiBold',
      fontSize: hp('1.5%'),
      marginTop: hp('1%'),
      color: colors.grey,
      marginLeft: wp('1%'),
    },
  });
export default PayNow;
