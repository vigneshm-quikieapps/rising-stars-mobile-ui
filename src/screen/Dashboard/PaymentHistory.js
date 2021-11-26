/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, FlatList} from 'react-native';
import CustomLayout from '../../custom/custom-layout';
import LinearStudentCard from '../../custom/linear-student-card';
import ClassCard from '../../custom/class-card';
import {PaymentCard, Card} from '../../custom/payment-card';
import {colors, wp} from '../../constants';

const data = [
  {id: 1, name: 'Ayman Mongal'},
  {id: 2, name: 'Syman Mongal'},
  {id: 3, name: 'Ryman Mongal'},
];
const payment = [
  {id: 1, amount: 6, condition: true},
  {id: 2, amount: 23, condition: false},
  {id: 3, amount: 45, condition: false},
];

export default function EnrolledChild() {
  return (
    <CustomLayout
      names={'Payment History'}
      Customchildren={
        <FlatList
          data={data}
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={item => {
            return (
              <LinearStudentCard
                colors={['#ffa300', '#ff7e00']}
                name={'Ayman Mogal'}
                style={{backgroundColor: colors.orange}}
                activityRequired
                activity={'Zippy Totz Pre-school Gymnastics'}
                subActivity={'Childhood Joy Classes'}
                className={'Childhood Joy Classes'}
                clubId={'PDPS4212'}
              />
            );
          }}
        />
      }>
      <Text style={{fontFamily: 'Nunito-SemiBold'}}>Current Classes </Text>
      <ClassCard
        // id={"PDPS4212"}
        className={'Pre-school gymnastics(Age 1-3)'}
        subtitle={'Childhood Joy Classes'}
        day={'Monday'}
        time="9:30 am - 11:30 am"
        facility={'Gym Hall'}
        coach={'Henry Itondo'}
      />
      <PaymentCard>
        <Card
          paystyle={{backgroundColor: colors.reddish}}
          notify={'Overdue'}
          amount={'25'}
          body={'August 2021 fee'}
          date={'Due Date 01/08/2021'}
          button
          title="Pay Now"
          paybutton={() => {}}
          substyle={{borderColor: colors.reddish, borderWidth: 1}}
          style={{backgroundColor: colors.reddish}}
        />
        <Card
          notify={'Upcoming'}
          amount={'25'}
          body={'September 2021 fee'}
          date={'Due Date 01/09/2021'}
          button
          title="Pay Now"
          paybutton={() => {}}
          substyle={{borderColor: colors.orange, borderWidth: 1}}
          style={{backgroundColor: colors.reddish}}
        />

        <FlatList
          data={payment}
          horizontal={true}
          pagingEnabled={true}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={item => {
            return (
              <Card
                notify={item.item.condition ? 'Paid' : 'Future coming'}
                amount={item.item.amount}
                body={'Pre-school gym fee'}
                date={'Due Date 10/08/2021'}
                paidtext={'Paid on 12/08/2021'}
                substyle={{
                  backgroundColor: item.item.condition
                    ? colors.veryLightGreen
                    : colors.lightgrey,
                  borderColor: item.item.condition ? 'white' : 'white',
                  width: wp('82%'),
                }}
                style={{
                  backgroundColor: item.item.condition
                    ? colors.seafoamBlue
                    : colors.lightgrey,
                  borderWidth: item.item.condition ? 0 : 1,
                  borderColor: item.item.condition ? null : 'white',
                }}
              />
            );
          }}
        />
      </PaymentCard>
    </CustomLayout>
  );
}
