/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Text, FlatList, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-snap-carousel';
import {useDispatch, useSelector} from 'react-redux';
import {
  CustomLayout,
  LinearStudentCard,
  ClassCard,
  PaymentCard,
  Card,
} from '../../components';
import {colors, Fontsize, hp, wp} from '../../constants';
import {getmemberClass} from '../../redux/action/home';

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
  const dispatch = useDispatch();
  const [activeDotIndex, setActiveDotIndex] = useState(0);

  const membersData = useSelector(state => state.memberData.memberData);
  const memberClassData = useSelector(state => state.memberClassData.classData);
  //console.log('classes: ', memberClassData);

  useEffect(() => {
    membersData && dispatch(getmemberClass(membersData[activeDotIndex]._id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeDotIndex]);
  const renderItem = item => {
    return (
      <View style={styles.carousel}>
        <View style={styles.table}>
          <Text style={styles.title}>Student Name</Text>
          <Text style={styles.body}>{item.item.name}</Text>
        </View>
        <View style={styles.table}>
          <Text style={styles.title}>Student ID</Text>
          <Text style={styles.body}>{item.item.gender}</Text>
        </View>
      </View>
    );
  };

  return (
    <CustomLayout
      names={'Payment History'}
      Customchildren={
        <>
          {membersData.length > 0 ? (
            <Carousel
              data={membersData}
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
          memberClassData &&
          memberClassData?.filter(item => item?.enrolledStatus === 'ENROLLED')
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
            </>
          );
        }}
      />
    </CustomLayout>
  );
}

const styles = StyleSheet.create({
  carousel: {
    backgroundColor: '#f7c494',
    height: hp('15%'),
    margin: 0,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  table: {
    width: wp('45%'),
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: Fontsize + wp('0.5%'),
    color: colors.grey,
  },
  body: {
    fontSize: Fontsize + wp('0.75%'),
    fontWeight: 'bold',
  },
});
