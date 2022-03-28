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
import {updateTransaction} from '../../redux/service/request';
import {useNavigation} from '@react-navigation/native';
import Alert from '../../components/alert-box';

const StandingOrderPayNow = props => {
  const bills = useSelector(state => state.memberBills);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const [showSuccessalert, setSuccessAlert] = useState(false);
  const [showFailurealert, setFailureAlert] = useState(false);
  const currentMember = useSelector(state => state.currentMemberData.data);

  //console.log("inside standing order",props.item1)

  const handlerPayment = async () => {
    setLoading(true);
    let request = await updateTransaction(props.item1.id);
    if (request.message === 'Transaction updated.') {
      //console.log("update redux state",request,props.item1.id);
      dispatch({
        type: Action.USER_GET_MEMBER_BILLS,
        payload: {
          memberId: currentMember._id,
          businessId: props.business.businessId,
        },
      });

      setLoading(false);
      setSuccessAlert(true);
      props.onPress();
      alert('Sucessful');
      navigation.navigate('Acount');
    } else {
      setLoading(false);
      setFailureAlert(true);
      alert('something wnet wrong!');
      navigation.navigate('Acount');
    }
  };
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
        {loading ? (
          <ActivityIndicator
            size="large"
            color={colors.orange}
            style={{marginVertical: hp('2%')}}
          />
        ) : (
          <>
            <NewAppButton
              title={"I've setup Standing Order"}
              onPress={() => {
                handlerPayment();
              }}
              style={{width: wp('72%')}}
            />
            <NewAppButton
              title={"I'll setup Standing Order later"}
              onPress={() => {
                props.onPress();
              }}
              style={{width: wp('72%')}}
              emptyContainer={true}
            />
          </>
        )}
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
  const {business, item1} = props;
  const child = useSelector(state => state.currentMemberData.data);

  const [showAtm, setShowAtm] = useState(false);
  const [showStandingOrder, setShowStandingOrder] = useState(false);
  const [totalAmt, setTotalAmt] = useState(0);
  // console.log('inside pay now', business, item1);

  const findDate = item => {
    var month = new Date(item.dueDate).getMonth();
    var year = new Date(item.generatedAt).getFullYear();
    if (month === 11) {
      year = year + 1;
      month = 0;
    }
    // console.log(month);
    return `${months[month]} ${year} fee`;
  };

  //console.log('items', business, item1);

  return (
    <>
      {item1.classId === business.classId ? (
        <Card
          paystyle={{backgroundColor: colors.reddish}}
          notify={props.notify}
          paid={item1.paid}
          paidtext={`Paid on ${moment(new Date(item1.paidAt)).format(
            'DD/MM/YYYY',
          )}`}
          amount={item1.total}
          body={findDate(item1)}
          date={`Due Date ${moment(new Date(item1.dueDate)).format(
            'DD/MM/YYYY',
          )}`}
          button={props.button}
          //button
          title="Pay Now"
          paybutton={() => {
            setShowStandingOrder(true);
          }}
          substyle={props.subStyle}
          batchstyle={props.batchstyle}
        />
      ) : // {/*
      //             <StandingOrderPayNow
      //               onPress={() => {
      //                 setShowStandingOrder(!showStandingOrder);
      //               }}
      //               visible={showStandingOrder}
      //               item1={item1}
      //               business={business}
      //             /> */}

      null}
    </>
  );
};

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
