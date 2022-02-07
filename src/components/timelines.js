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

const Timelines = props => {
  const [expand, setExpand] = useState(false);

  return (
    <View style={{height: hp('70%')}}>
      <FlatList
        data={props.data}
        keyExtractor={item => item.id}
        renderItem={item => {
          return (
            <View style={styles.container}>
              <View>
                {item.item.mark ? (
                  <View style={{height: hp('2%')}} />
                ) : (
                  <View style={{height: hp('0%')}} />
                )}
                <View
                  style={[
                    styles.circle,
                    props.circle,
                    {
                      borderColor: item.item.status
                        ? '#4ec0a0'
                        : item.item.status2
                        ? colors.orange
                        : '#e3e3e3',
                    },
                  ]}>
                  {item.item.status ? (
                    <Image
                      source={require('../assets/images/icon-check-line.png')}
                      style={styles.tick}
                    />
                  ) : item.item.status2 ? (
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
                      borderColor: item.item.status
                        ? '#4ec0a0'
                        : item.item.status2
                        ? '#e3e3e3'
                        : '#e3e3e3',
                      height: !expand
                        ? hp('22%')
                        : item.item.status
                        ? hp('28%')
                        : item.item.status2
                        ? hp('26%')
                        : hp('11%'),
                    },
                  ]}
                />
              </View>

              <LinearGradient
                style={[
                  styles.subContainer,
                  {
                    marginTop: item.item.mark ? hp('0%') : -hp('2%'),
                    height: !expand ? hp('25%') : 'auto',
                  },
                  props.subcontainer,
                ]}
                colors={
                  item.item.status
                    ? ['rgb(104,214,171)', 'rgb(51,171,150)']
                    : item.item.status2
                    ? ['#ffa300', '#ff7e00']
                    : ['rgb(242,242,242)', 'rgb(242,242,242)']
                }>
                {/* {
                  item.item.status ? <View style={styles.smallCircle}><Image source={require('../assets/images/checkmark.png')} style={styles.smallTick} /></View> : item.item.status2 ? <View style={styles.smallCircle}><Image source={require('../assets/images/checkmark.png')} style={styles.smallTick} /></View> : null
                } */}
                <View
                  style={{
                    marginLeft: item.item.status
                      ? wp('4%')
                      : item.item.status2
                      ? wp('4%')
                      : wp('4%'),
                    marginTop: -hp('1.5%'),
                  }}>
                  {item.item.labelId1 && (
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
                              color: item.item.status
                                ? 'white'
                                : item.item.status2
                                ? 'white'
                                : 'black',
                              marginBottom: hp('2%'),
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
                          Step {item.item.id}
                        </Text>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <View
                          style={{
                            borderColor: colors.white,
                            borderWidth: 2,
                            marginTop: 20,
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
                        <View>
                          <Text
                            style={[
                              styles.insideText,
                              {
                                color: item.item.status
                                  ? 'white'
                                  : item.item.status2
                                  ? 'white'
                                  : 'black',
                              },
                              {
                                marginLeft: wp('2%'),
                                fontSize: Fontsize + 6,
                                //fontWeight: 'bold',
                              },
                            ]}>
                            {item.item.label1}
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
                                marginLeft: wp('2%'),
                                fontSize: Fontsize + 2,
                              },
                            ]}>
                            {item.item.label1status}
                          </Text>
                        </View>
                        <View
                          style={{
                            marginLeft: wp('10%'),
                          }}>
                          {item.item.status ? (
                            <TouchableOpacity
                              onPress={() => setExpand(!expand)}>
                              <LinearGradient
                                colors={[
                                  'rgba(255, 255, 255, 0.3)',
                                  'rgba(255, 255, 255, 0.3)',
                                ]}
                                style={{
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
                            </TouchableOpacity>
                          ) : item.item.status2 ? (
                            <TouchableOpacity
                              onPress={() => setExpand(!expand)}>
                              <LinearGradient
                                colors={[
                                  'rgba(255, 255, 255, 0.3)',
                                  'rgba(255, 255, 255, 0.3)',
                                ]}
                                style={{
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
                            </TouchableOpacity>
                          ) : null}
                        </View>
                      </View>
                    </>
                  )}
                </View>
              </LinearGradient>
            </View>
          );
        }}
      />
    </View>
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
    marginBottom: hp('4%'),
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
