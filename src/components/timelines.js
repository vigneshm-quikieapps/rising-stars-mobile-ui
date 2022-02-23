/* eslint-disable react-native/no-inline-styles */
/*
status=Attained
status2=Progress
*/

import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {colors, wp, hp, Fontsize, Images} from '../constants';
import LinearGradient from 'react-native-linear-gradient';
import {ScrollView} from 'react-native-gesture-handler';

const Timelines = props => {
  const [expand, setExpand] = useState(0);
  console.log('data: ', props.data);
  return (
    <ScrollView style={{height: hp('70%')}}>
      <FlatList
        data={props.data}
        keyExtractor={item => item.id}
        renderItem={item => {
          console.log('item: ', item);
          console.log('expand:', props.data.length);
          return (
            <View style={styles.container}>
              <View>
                <View
                  style={[
                    styles.circle,
                    {
                      borderColor:
                        item.item.status === 'PROGRESS_AWARDED'
                          ? '#4ec0a0'
                          : item.item.status === 'NOT_STARTED'
                          ? '#e3e3e3'
                          : colors.orangeYellow,
                      marginTop: item.index === 0 ? hp('8%') : 0,
                    },
                  ]}>
                  {item.item.status === 'PROGRESS_AWARDED' ? (
                    <Image
                      source={require('../assets/images/icon-check-line.png')}
                      style={styles.tick}
                    />
                  ) : item.item.status === 'PROGRESS_IN_PROGRESS' ? (
                    <LinearGradient
                      colors={['#ffa300', '#ff7e00']}
                      style={styles.dot}
                    />
                  ) : null}
                </View>
                <View
                  style={[
                    styles.line,
                    props.line,
                    {
                      borderColor:
                        item.item.status === 'PROGRESS_AWARDED'
                          ? '#4ec0a0'
                          : item.item.status === 'NOT_STARTED'
                          ? '#e3e3e3'
                          : colors.orangeYellow,

                      height:
                        item.index !== props.data.length - 1
                          ? expand === item.index + 1
                            ? hp('30%')
                            : hp('20%')
                          : 0,
                    },
                  ]}
                />
              </View>

              <LinearGradient
                style={[
                  styles.subContainer,
                  {
                    // marginTop: hp('1%'),
                    height: expand === item.index + 1 ? hp('30%') : hp('20%'),
                    marginTop: item.index !== 0 ? -hp('7%') : 0,
                  },
                  props.subcontainer,
                ]}
                colors={
                  item.item.status === 'PROGRESS_AWARDED'
                    ? ['rgb(104,214,171)', 'rgb(51,171,150)']
                    : item.item.status === 'PROGRESS_IN_PROGRESS'
                    ? ['#ffa300', '#ff7e00']
                    : ['rgb(242,242,242)', 'rgb(242,242,242)']
                }>
                <View
                  style={{
                    marginLeft: wp('4%'),
                    marginTop: -hp('1.5%'),
                  }}>
                  {item.item && item.item.skills.length > 0 ? (
                    <>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginTop: -hp('1.5%'),
                          justifyContent: 'space-between',
                        }}>
                        <Text
                          style={[
                            styles.insideText,
                            {
                              color:
                                item.item.status === 'PROGRESS_AWARDED'
                                  ? 'white'
                                  : item.item.status === 'PROGRESS_IN_PROGRESS'
                                  ? 'white'
                                  : 'black',
                              marginBottom: -hp('0.5%'),
                              marginLeft: wp('7%'),
                              marginTop: hp('2%'),
                              backgroundColor: 'rgba(255, 255, 255, 0.3)',
                              paddingRight: wp('3%'),
                              paddingLeft: wp('3%'),
                              paddingTop: wp('1%'),
                              height: 35,
                              borderRadius: 10,
                            },
                          ]}>
                          Step {item.index + 1}
                        </Text>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <FlatList
                          data={item.item.skills}
                          keyExtractor={arg => arg.id}
                          renderItem={arg => {
                            console.log(arg);
                            return (
                              <View
                                style={{
                                  flexDirection: 'row',
                                  marginTop: hp('3.5%'),
                                  marginLeft:
                                    arg.item.status === 'PROGRESS_AWARDED'
                                      ? wp('2%')
                                      : wp('8%'),
                                }}>
                                {arg.item.status === 'PROGRESS_AWARDED' ? (
                                  <View
                                    style={{
                                      borderColor: colors.white,
                                      borderWidth: 2,
                                      borderRadius: 20,
                                      height: 22,
                                      width: 22,
                                    }}>
                                    <Image
                                      source={require('../assets/images/checkmark.png')}
                                      style={[
                                        styles.tick,
                                        {
                                          height: 10,
                                          width: 10,
                                          paddingTop: 17,
                                          paddingLeft: 17,
                                        },
                                      ]}
                                    />
                                  </View>
                                ) : null}
                                <View>
                                  <Text
                                    style={[
                                      styles.insideText,
                                      {
                                        color:
                                          item.item.status ===
                                          'PROGRESS_AWARDED'
                                            ? 'white'
                                            : item.item.status ===
                                              'PROGRESS_IN_PROGRESS'
                                            ? 'white'
                                            : 'black',
                                      },
                                      {
                                        marginTop: -hp('1%'),
                                        marginLeft: wp('5%'),
                                        fontSize: Fontsize + 6,
                                        //fontWeight: 'bold',
                                      },
                                    ]}>
                                    {arg.item.name}
                                  </Text>
                                  <Text
                                    style={[
                                      styles.insideText,
                                      {
                                        color: item.item.status
                                          ? 'white'
                                          : item.item.status2
                                          ? 'white'
                                          : colors.grey,
                                      },
                                      {
                                        marginLeft: wp('5%'),
                                        fontSize: Fontsize,
                                      },
                                    ]}>
                                    {arg.item.status === 'PROGRESS_AWARDED'
                                      ? 'Attained'
                                      : arg.item.status ===
                                        'PROGRESS_IN_PROGRESS'
                                      ? 'In progress'
                                      : 'Upcoming'}
                                  </Text>
                                </View>
                              </View>
                            );
                          }}
                        />
                        <View
                          style={{
                            marginLeft: wp('30%'),
                          }}>
                          {item.item.status !== 'NOT_STARTED' ? (
                            <TouchableOpacity
                              onPress={() => {
                                setExpand(expand === 0 ? item.index + 1 : 0);
                                console.log('123');
                              }}>
                              <LinearGradient
                                colors={[
                                  'rgba(255, 255, 255, 0.3)',
                                  'rgba(255, 255, 255, 0.3)',
                                ]}
                                style={{
                                  marginRight: 20,
                                  marginTop: 20,
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
                            </TouchableOpacity>
                          ) : null}
                        </View>
                      </View>
                    </>
                  ) : null}
                </View>
              </LinearGradient>
            </View>
          );
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  circle: {
    height: hp('5%'),
    width: hp('5%'),
    //s marginTop: hp('1%'),
    borderRadius: 50,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    borderWidth: 1.5,
    height: hp('7%'),
    width: hp('0%'),
    marginLeft: hp('2.42%'),
  },
  tick: {
    height: hp('2.5%'),
    width: hp('2.5%'),
  },
  dot: {
    height: hp('2%'),
    width: hp('2%'),
    borderRadius: 50,
  },
  subContainer: {
    flex: 1,
    // borderWidth: 1,
    // height: hp('10%'),
    paddingTop: hp('4%'),
    marginLeft: wp('5%'),
    // flexDirection: 'row',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    // padding: wp('5%'),
    //marginBottom: hp('4%'),
  },
  smallCircle: {
    height: hp('3%'),
    width: hp('3%'),
    borderRadius: 50,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
  },
  smallTick: {
    height: hp('2%'),
    width: hp('2%'),
  },
  insideText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: Fontsize + 3,
  },
  buttons: {
    height: hp('3%'),
    width: hp('3%'),
    backgroundColor: 'black',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp('2%'),
  },
});

export default Timelines;
