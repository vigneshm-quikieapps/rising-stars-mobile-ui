/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
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
import {enrollChildData} from '../../redux/action/enrol';
import {getLocalData} from '../../utils/LocalStorage';
import StandingOrder from '../../components/standing-order';
import {FlatList} from 'react-native-gesture-handler';
import moment from 'moment';
import NewAppButton from '../../components/new-app-button';

const StandingOrderPayNow = props => {
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
          <AppButton
            title={"I've setup Standing Order"}
            onPress={() => {
              
            }}
            style={{width: wp('72%')}}
          />
          <NewAppButton
            title={"I'll setup Standing Order late"}
            onPress={() => {props.onPress()  }}
            style={{width: wp('72%')}}
            emptyContainer={true}
          />
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
          paybutton={() => {setShowStandingOrder(true)}}
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
        /> :
        <StandingOrderPayNow 
        onPress={() => {
            setShowStandingOrder(!showStandingOrder);
          }}
          visible={showStandingOrder} />
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
