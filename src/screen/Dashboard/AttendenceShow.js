import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
  SectionList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-snap-carousel';
import AttendanceOverview from '../../custom/AttendanceOverview';
import {colors, Images, wp} from '../../Constant/Constant';

const itemWidth = Dimensions.get('window').width;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Datum = [1, 2, 3, 4];
const DATA = [
  {
    title: 'August 2021',
    data: [
      {
        date: '09',
        day: 'Mon',
        status: 'Attended',
      },
      {
        date: '17',
        day: 'Mon',
        status: 'No Show',
      },

      {
        date: '',
        day: 'Mon',
        status: 'Attended',
      },
      {
        date: '18',
        day: 'Wed',
        status: 'Upcoming',
      },
    ],
  },
  {
    title: 'September 2021',
    data: [
      {
        date: '09',
        day: 'Mon',
        status: 'Upcoming',
      },
      {
        date: '12',
        day: 'Thu',
        status: 'Upcoming',
      },
      {
        date: '14',
        day: 'Sat',
        status: 'Upcoming',
      },
      {
        date: '16',
        day: 'Mon',
        status: 'Upcoming',
      },
      {
        date: '18',
        day: 'Wed',
        status: 'Upcoming',
      },
    ],
  },
  {
    title: 'October 2021',
    data: [
      {
        date: '09',
        day: 'Mon',
        status: 'Upcoming',
      },
      {
        date: '12',
        day: 'Thu',
        status: 'Upcoming',
      },
      {
        date: '14',
        day: 'Sat',
        status: 'Upcoming',
      },
      {
        date: '16',
        day: 'Mon',
        status: 'Upcoming',
      },
      {
        date: '18',
        day: 'Wed',
        status: 'Upcoming',
      },
    ],
  },
  {
    title: 'November 2021',
    data: [
      {
        date: '09',
        day: 'Mon',
        status: 'Upcoming',
      },
      {
        date: '12',
        day: 'Thu',
        status: 'Upcoming',
      },
      {
        date: '14',
        day: 'Sat',
        status: 'Upcoming',
      },
      {
        date: '16',
        day: 'Mon',
        status: 'Upcoming',
      },
      {
        date: '18',
        day: 'Wed',
        status: 'Upcoming',
      },
    ],
  },
];

const AttendenceShow = () => {
  const Item = ({title}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
  const renderItem = ({item, index}) => {
    return (
      <LinearGradient
        colors={['#ffa300', '#ff7e00']}
        style={{
          width: '100%',
          paddingVertical: 30,
          paddingHorizontal: 20,
          paddingTop: 24,
          paddingBottom: 20,
          backgroundColor: colors.white,
          borderRadius: 16,
        }}>
        <Text
          style={{
            fontSize: wp('3.5%'),
            color: colors.white,
            opacity: 0.8,
            fontFamily: 'Nunito-Regular',
          }}>
          Class Name
        </Text>
        <Text
          style={{
            fontSize: wp('4.3%'),

            color: colors.white,
            fontFamily: 'Nunito-SemiBold',
          }}>
          K23lJ56
        </Text>
        <Text
          style={{
            fontSize: wp('4.3%'),

            color: colors.white,
            fontFamily: 'Nunito-SemiBold',
          }}>
          Pre-school gymnastics (Age 1-3)
        </Text>
      </LinearGradient>
    );
  };
  return (
    <ScrollView style={styles.container}>
      <View style={{marginTop: 30}}>
        <Text
          style={{
            fontSize: wp('7%'),
            fontFamily: 'Nunito-SemiBold',
          }}>
          Attendance
        </Text>
      </View>

      <View style={{marginTop: 4, flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{fontSize: wp('4.5%'), fontFamily: 'Nunito-SemiBold'}}>
          Ayman Mogal
        </Text>
        <LinearGradient
          colors={['#ffa300', '#ff7e00']}
          style={{
            marginLeft: 6,
            marginRight: 20,
            height: 32,
            width: 32,
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{height: 14, width: 18}}
            source={Images.dropDown_white}
          />
        </LinearGradient>
      </View>

      <View style={{marginTop: 14}}>
        <Carousel
          // autoplay={true}
          // loop={true}
          style={{width: 350}}
          layout={'default'}
          data={Datum}
          sliderWidth={itemWidth - 30}
          itemWidth={itemWidth * 0.88}
          renderItem={renderItem}
          //    onSnapToItem = { index =>{

          //      setActiveDotIndex(index)
          //      }}
        />
      </View>
      <View style={{marginTop: 20}}>
        <AttendanceOverview
          linearGradient1={['#ffa300', '#ff7e00']}
          linearGradient2={['#68D6AB', '#33AB96']}
          linearGradient3={['#EA5C5C', '#AB3333']}
          backgroundColor1="rgba(255,244,231,1)"
          backgroundColor2="rgba(192,248,232,1)"
          backgroundColor3="rgba(255,229,229,1)"
          label1={'Total'}
          label2={'Attended'}
          label3={'No Show'}
          value1={43}
          value2={14}
          value3={2}
        />
      </View>

      <View style={{marginTop: 30}}>
        <SectionList
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingBottom: 20,
              }}>
              <View style={{width: '20%', justifyContent: 'center'}}>
                <Text
                  style={{
                    fontSize: wp('4%'),
                    fontFamily: 'Nunito-Regular',
                    color: colors.blackOpacity,
                  }}>
                  {item.day}
                </Text>
                <Text
                  style={{fontSize: wp('8%'), fontFamily: 'Nunito-SemiBold'}}>
                  {item.date}
                </Text>
              </View>
              <View style={{justifyContent: 'center'}}>
                <LinearGradient
                  colors={
                    item.status === 'Attended'
                      ? ['#68D6AB', '#33AB96']
                      : item.status === 'No Show'
                      ? ['#EA5C5C', '#AB3333']
                      : item.status === 'Tardy'
                      ? ['rgb(242,242,242)', 'rgb(242,242,242)']
                      : item.status === 'Upcoming'
                      ? ['rgb(255,255,255)', 'rgb(255,255,255)']
                      : ['#ffa300', '#ff7e00']
                  }
                  style={{height: 1.5, width: 30}}
                />
              </View>
              <View style={{justifyContent: 'center', width: '100%'}}>
                <LinearGradient
                  colors={
                    item.status === 'Attended'
                      ? ['#68D6AB', '#33AB96']
                      : item.status === 'No Show'
                      ? ['#EA5C5C', '#AB3333']
                      : item.status === 'Tardy'
                      ? ['rgb(242,242,242)', 'rgb(242,242,242)']
                      : item.status === 'Upcoming'
                      ? ['rgb(255,255,255)', 'rgb(255,255,255)']
                      : ['#ffa300', '#ff7e00']
                  }
                  style={{
                    padding: 20,
                    width: '100%',
                    borderTopLeftRadius: 16,
                    borderBottomLeftRadius: 16,
                    borderColor: '#d2d2d2',
                    borderWidth: item.status === 'Upcoming' ? 0.5 : 0,
                  }}>
                  <Text
                    style={{
                      color:
                        item.status === 'Attended' || item.status === 'No Show'
                          ? colors.white
                          : item.status === 'Tardy'
                          ? '#000000'
                          : 'rgb(205,210,204)',
                      fontSize: wp('4.5%'),
                      fontFamily: 'Naunito-SemiBold',
                    }}>
                    {item.status}
                  </Text>
                </LinearGradient>
              </View>
            </View>
          )}
          renderSectionHeader={({section: {title}}) => (
            <Text
              style={{
                fontSize: wp('5%'),
                fontFamily: 'Nunito-SemiBold',
                paddingBottom: 20,
              }}>
              {title}
            </Text>
          )}
        />
      </View>
    </ScrollView>
  );
};

export default AttendenceShow;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingLeft: 20,
  },
});
