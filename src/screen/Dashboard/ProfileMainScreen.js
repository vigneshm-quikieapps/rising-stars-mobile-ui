import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  ScrollView,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, hp, Images, wp } from '../../Constant/Constant';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import AttendanceOverview from '../../custom/AttendanceOverview';
import ProgressBarWithStar from '../../custom/progressBarWithStar';
import TimeLines from '../../custom/Timelines';
import BarIndicator from '../../custom/BarIndicator';
import AttendanceCard from '../../custom/AttendanceCard';
import ClassCard from '../../custom/ClassCard';

const ProfileMainScreen = props => {
  const Datum = [1, 2, 3, 4]; // data.length for how many time we have scroll in Carousel
  const itemWidth = Dimensions.get('window').width;
  const [activeDotIndex, setActiveDotIndex] = React.useState(0);
  const pagination = () => {
    return (
      <Pagination
        dotsLength={Datum.length}
        activeDotIndex={activeDotIndex}
        containerStyle={{ width: itemWidth * 0.8, paddingVertical: 0 }}
        dotStyle={{
          width: wp('2.5%'),
          height: wp('1.5%'),
          borderRadius: wp('5%'),
          marginHorizontal: wp('-2%'),
          backgroundColor: colors.white,
          // justifyContent: 'center',
        }}
        inactiveDotStyle={{
          // Define styles for inactive dots here
          backgroundColor: colors.white,
          width: wp('3%'),
          height: hp('2%'),
          borderRadius: wp('2%'),
          // alignSelf: 'center',
        }}
        inactiveDotOpacity={0.5}
        inactiveDotScale={0.5}
      />
    );
  };
  const renderItem = ({ item, index }) => {
    return (
      <ClassCard
        id={'KKGY1'}
        classname={'Pre-school gymnastics(Age 1-3)'}
        subtitle={'Club name'}
        day={'Monday'}
        time="9:30 am - 11:30 am"
        facility={'Gym Hall'}
        coach={'Henry Itondo'}
        style={{ backgroundColor: 'white', borderRadius: 20 }}
      />
      // <View
      //   style={{
      //     width: wp('80%'),
      //     height: hp('28%'),
      //     paddingLeft: wp('4%'),
      //     justifyContent: 'center',
      //     paddingTop: hp('5%'),
      //     paddingBottom: hp('8%'),
      //     backgroundColor: colors.white,
      //     borderRadius: wp('5%'),
      //   }}>
      //   <Text
      //     style={{
      //       fontSize: wp('6%'),
      //       color: colors.orange,
      //       fontFamily: 'Nunito-SemiBold',
      //     }}>
      //     Pre-school gymnastics
      //   </Text>
      //   <Text
      //     style={{
      //       fontSize: wp('6%'),
      //       color: colors.orange,
      //       fontFamily: 'Nunito-SemiBold',
      //     }}>
      //     (Age 1-3)
      //   </Text>
      //   {/* <Text style={{fontSize: wp('4.2%'), fontFamily: 'Nunito-Regular'}}>
      //     Childhood Joy Classes
      //   </Text> */}
      //   <View
      //     style={{
      //       flexDirection: 'row',
      //       alignItems: 'center',
      //     }}>
      //     <View style={{}}>
      //       <Image
      //         style={{ height: hp('4%'), width: wp('5%') }}
      //         source={Images.calendar}
      //       />
      //     </View>
      //     <View style={{ marginTop: hp('2%'), marginLeft: wp('2%') }}>
      //       <Text
      //         style={{
      //           fontSize: wp('4.5%'),
      //           fontFamily: 'Nunito-SemiBold',
      //         }}>
      //         Monday
      //       </Text>
      //       <Text
      //         style={{
      //           color: '#cccccc',
      //           fontSize: wp('4%'),
      //           fontFamily: 'Nunito-Regular',
      //         }}>
      //         9:30 am - 11:30 am
      //       </Text>
      //     </View>
      //   </View>
      //   <View
      //     style={{
      //       flexDirection: 'row',
      //       alignItems: 'center',
      //     }}>
      //     <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      //       <Image
      //         style={{ height: hp('4%'), width: wp('5%') }}
      //         source={Images.star_gray}
      //       />
      //     </View>
      //     <View style={{ marginTop: hp('2%'), marginLeft: wp('2%') }}>
      //       <Text
      //         style={{
      //           color: '#cccccc',
      //           fontSize: wp('3.2%'),
      //           fontFamily: 'Nunito-Regular',
      //         }}>
      //         Facility
      //       </Text>
      //       <Text style={{ fontSize: wp('4%'), fontFamily: 'Nunito-Regular' }}>
      //         Gym Hall
      //       </Text>
      //     </View>
      //     <View
      //       style={{
      //         marginLeft: wp('8%'),
      //         justifyContent: 'center',
      //         alignItems: 'center',
      //       }}>
      //       <Image
      //         style={{ height: hp('4%'), width: wp('5%') }}
      //         source={Images.user}
      //       />
      //     </View>
      //     <View style={{ marginTop: hp('2%'), marginLeft: wp('2%') }}>
      //       <Text
      //         style={{
      //           color: '#cccccc',
      //           fontSize: wp('3.2%'),
      //           fontFamily: 'Nunito-Regular',
      //         }}>
      //         Coach
      //       </Text>
      //       <Text style={{ fontSize: wp('4%'), fontFamily: 'Nunito-Regular' }}>
      //         Henry Itondo
      //       </Text>
      //     </View>
      //   </View>
      // </View>
    );
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: colors.white }}>
      <StatusBar backgroundColor="rgb(255,163,0)" />
      <View style={styles.container}>
        <LinearGradient
          colors={[colors.orangeYellow, colors.pumpkinOrange]}
          angle={90}
          style={styles.linearGradient}>
          <Text style={styles.welcome}>Hi Nizam, your child</Text>
          <View style={styles.containerMember}>
            <View
              style={{
                // backgroundColor: colors.white,
                // height: hp('9%'),
                // width: wp('15%'),
                // borderRadius: wp('6%'),
                marginTop: 7.5,
                // justifyContent: 'center',
                // alignItems: 'center',
              }}>
              <Image
                style={{
                  height: 57,
                  width: 57,
                  borderRadius: 20,
                  borderWidth: 2,
                  borderColor: 'white',
                }}
                source={Images.Child}
              />
            </View>

            <View style={{ marginLeft: 10, justifyContent: 'center' }}>
              <Text style={styles.memberName}>Ayman Mogal</Text>
            </View>

            <View style={{ flex: 1 }} />
            <LinearGradient
              colors={['#ffa300', '#ff7e00']}
              style={{
                marginRight: 20,
                height: 32,
                width: 32,
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{ height: 14, width: 18 }}
                source={Images.dropDown_white}
              />
            </LinearGradient>
          </View>

          <View style={styles.courosoul}>
            <Carousel
              // autoplay={true}
              // loop={true}
              // style={{ width: wp('0%') }}
              layout={'default'}
              data={Datum}
              sliderWidth={itemWidth - 30}
              itemWidth={itemWidth * 0.8}
              renderItem={renderItem}
              onSnapToItem={index => {
                setActiveDotIndex(index);
              }}
            />

            {Datum != '' && (
              <View
                style={{
                  paddingVertical: hp('0.5%'),
                  width: itemWidth,
                  alignItems: 'center',
                }}>
                {pagination()}
              </View>
            )}
          </View>
        </LinearGradient>

        <View style={styles.attendance}>
          <View>
            <Image
              style={
                {
                  // height: hp('4%'),
                  // width: hp('4%'),
                  // borderRadius: wp('5%'),
                }
              }
              source={Images.calendarOrange}
            />
          </View>
          <View style={{ marginLeft: wp('3.5%') }}>
            <Text style={{ fontSize: wp('5%'), fontFamily: 'Nunito-SemiBold' }}>
              Class Overview
            </Text>
          </View>
        </View>
        <View style={styles.reports}>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: wp('2%'),
              marginBottom: hp('2%'),
              justifyContent: 'space-between',
            }}>
            <View>
              <AttendanceCard
                color={['rgb(255,163,0)', 'rgb(255,126,0)']}
                class={43}
                value={'Total'}
                label={'Classes'}
                style={{ backgroundColor: '#fff4e7' }}
              />
            </View>
            <View style={{ justifyContent: 'space-evenly' }}>
              <BarIndicator
                color={['#ffa300', '#ff7e00']}
                style={{ width: wp('20%') }}
              />
              <BarIndicator
                color={['#68d6ab', '#33ab96']}
                style={{ width: wp('10%') }}
              />
              <BarIndicator
                color={['#EA5C5C', '#AB3333']}
                style={{ width: wp('4%') }}
              />
            </View>
          </View>

          <View style={{ paddingHorizontal: wp('2%'), flexDirection: 'row' }}>
            <AttendanceCard
              color={['#68D6AB', '#33AB96']}
              value={14}
              label={'Attended'}
              style={{ backgroundColor: '#c0f8e8' }}
            />
            <AttendanceCard
              color={['#EA5C5C', '#AB3333']}
              value={14}
              label={'No Show'}
              style={{ backgroundColor: '#ffe5e5' }}
            />
          </View>
        </View>
        {/* <View style={styles.reports}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.containerTotalClasses}>
              <LinearGradient
                colors={['rgb(255,163,0)', 'rgb(255,126,0)']}
                angle={90}
                style={{
                  height: '100%',
                  width: wp('4%'),
                  borderTopLeftRadius: wp('4%'),
                  borderBottomLeftRadius: wp('4%'),
                }}
              />
              <View
                style={{
                  flex: 1,
                  padding: wp('1%'),
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text
                    style={{fontSize: wp('9%'), fontFamily: 'Nunito-SemiBold'}}>
                    43
                  </Text>
                </View>
                <View style={{marginLeft: wp('2%')}}>
                  <Text
                    style={{
                      fontSize: wp('3.5%'),
                      fontFamily: 'Nunito-Regular',
                      alignSelf: 'center',
                    }}>
                    Total {'\n'} Classes
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                width: '50%',
                justifyContent: 'space-between',
                marginBottom: 20,
                transform: [{rotate: '180deg'}],
              }}>
              <LinearGradient
                colors={['#EA5C5C', '#AB3333']}
                style={{height: 7, borderRadius: wp('10%'), width: '12%'}}
              />
              <LinearGradient
                colors={['#68D6AB', '#33AB96']}
                style={{height: 7, borderRadius: wp('10%'), width: '20%'}}
              />
              <LinearGradient
                colors={['#ffa300', '#ff7e00']}
                angle={90}
                style={{height: 7, borderRadius: wp('10%'), width: '50%'}}
              />
            </View>
          </View>

          <AttendanceOverview
            linearGradient1={['#68D6AB', '#33AB96']}
            linearGradient2={['#EA5C5C', '#AB3333']}
            linearGradient3={['rgb(205,210,204)', 'rgb(205,210,204)']}
            backgroundColor1="rgba(192,248,232,1)"
            backgroundColor2="rgba(255,229,229,1)"
            backgroundColor3="rgb(242,242,242)"
            label1={'Attended'}
            label2={'No Show'}
            value1={14}
            value2={2}
          />
        </View> */}
        <View style={styles.activityProgress}>
          <View style={styles.activityProgressTitle}>
            <Image
              style={
                {
                  // height: hp('4%'),
                  // width: hp('4%'),
                  // borderRadius: wp('5%'),
                }
              }
              source={Images.medal}
            />
            <View style={{ marginLeft: wp('3.5%') }}>
              <Text style={{ fontSize: wp('5%'), fontFamily: 'Nunito-SemiBold' }}>
                Class Progress
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.ProgressReports, styles.timeline]}>
        <View style={{paddingRight:wp('4%')}}>
          <ProgressBarWithStar />
          </View>
          <View
            style={{
              height: hp('0.4%'),
              width: '100%',
              marginVertical: hp('1%'),
              backgroundColor: colors.lightgrey,
            }}
          />
          <TimeLines />
        </View>
      </View>
    </ScrollView>
  );
};
export default ProfileMainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:colors.white
  },
  linearGradient: {
    paddingTop: hp('2%'),
    paddingLeft: wp('4%'),
    borderBottomLeftRadius: wp('5.5%'),
    borderBottomRightRadius: wp('5.5%'),
  },
  containerMember: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  welcome: {
    fontSize: wp('4%'),
    color: colors.white,
    fontFamily: 'Nunito-SemiBold',
    opacity: 0.5,
  },
  memberName: {
    color: colors.white,
    fontSize: wp('6%'),
    fontFamily: 'Nunito-SemiBold',
  },
  memberID: {
    color: colors.white,
    fontSize: wp('2%'),
    fontFamily: 'Nunito-SemiBold',
  },
  courosoul: {
    marginTop: hp('1%'),
  },

  reports: {
    marginTop: hp('3.5%'),
    marginHorizontal: wp('5%'),
    borderRadius: wp('5%'),
    backgroundColor: colors.white,
    paddingVertical: hp('4%'),
    elevation: 10,
    shadowColor: '#52006A',
  },
  containerTotalClasses: {
    width: wp('35%'),
    height: hp('9%'),
    marginLeft: wp('2%'),
    flexDirection: 'row',
    backgroundColor: colors.veryLightPink,
    borderRadius: wp('4%'),
    marginBottom: hp('3%'),
  },
  activityProgress: {
    marginTop: hp('3%'),
    marginLeft: wp('3.5%'),
  },
  activityProgressTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attendance: {
    marginTop: hp('3%'),
    marginLeft: wp('5%'),
    flexDirection: 'row',
    alignItems: 'center',
  },
  ProgressReports: {
    marginTop: hp('3%'),
    marginHorizontal: wp('5%'),
    borderTopLeftRadius: wp('5%'),
    borderTopRightRadius: wp('5%'),
    backgroundColor: colors.white,
    // paddingVertical: hp('2%'),
    paddingLeft: wp('5%'),
    borderBottomColor: 'rgb(227,227,227)',
    borderBottomWidth: wp('1%'),
    elevation: 10,
    shadowColor: '#52006A',
  },
  timeline: {
    // marginHorizontal: 20,
    // backgroundColor: colors.white,
    // paddingVertical: hp('2%'),
    // paddingLeft: 10,
    // height: hp('40%'),
  },
});
