/* eslint-disable react-native/no-inline-styles */
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
// import {Item} from 'react-native-paper/lib/typescript/components/List/List';

const NewTimelines = props => {
  const [expand, setExpand] = useState(0);
  //console.log('data: ', expand);
  return (
    <View style={{marginBottom: hp('10%')}}>
      {props.data &&
        props.data.map((item, index) => {
          return (
            <View key={index} style={styles.container}>
              <View>
                <View
                  style={[
                    styles.circle,
                    {
                      borderColor:
                        item.status === 'AWARDED'
                          ? '#4ec0a0'
                          : item.status === 'IN_PROGRESS'
                          ? colors.orangeYellow
                          : '#e3e3e3',
                      marginTop: index === 0 ? hp('8%') : 0,
                    },
                  ]}>
                  {item.status === 'AWARDED' ? (
                    <Image
                      source={require('../assets/images/icon-check-line.png')}
                      style={styles.tick}
                    />
                  ) : item.status === 'IN_PROGRESS' ? (
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
                        item.status === 'AWARDED'
                          ? '#4ec0a0'
                          : item.status === 'IN_PROGRESS'
                          ? colors.orangeYellow
                          : '#e3e3e3',

                      height:
                        index !== props.data.length - 1
                          ? expand === index + 1
                            ? hp('30%')
                            : hp('12%')
                          : 0,
                    },
                  ]}
                />
              </View>

              <LinearGradient
                style={[
                  styles.subContainer,
                  {
                    height: expand === index + 1 ? hp('30%') : hp('12%'),
                    marginTop: index !== 0 ? -hp('4%') : hp('4%'),
                  },
                  props.subcontainer,
                ]}
                colors={
                  item.status === 'AWARDED'
                    ? ['rgb(104,214,171)', 'rgb(51,171,150)']
                    : item.status === 'IN_PROGRESS'
                    ? ['#ffa300', '#ff7e00']
                    : ['rgb(242,242,242)', 'rgb(242,242,242)']
                }>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: -hp('2.5%'),
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={[
                      styles.insideText,
                      {
                        color:
                          item.status === 'AWARDED'
                            ? 'white'
                            : item.status === 'IN_PROGRESS'
                            ? 'white'
                            : 'black',
                        marginBottom: -hp('0.5%'),
                        marginLeft: wp('7%'),
                        marginTop: hp('2%'),
                        backgroundColor:
                          item.status === 'NOT_STARTED'
                            ? '#dbdbdb'
                            : 'rgba(255, 255, 255, 0.3)',
                        paddingRight: wp('3%'),
                        paddingLeft: wp('3%'),
                        paddingTop: wp('1%'),
                        height: 35,
                        borderRadius: 10,
                      },
                    ]}>
                    Level {index + 1}
                  </Text>

                  <View
                    style={{
                      marginLeft: wp('24%'),
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setExpand(expand === 0 ? index + 1 : 0);
                      }}>
                      <LinearGradient
                        colors={[
                          'rgba(255, 255, 255, 0.3)',
                          'rgba(255, 255, 255, 0.3)',
                        ]}
                        style={{
                          // marginRight: 50,
                          marginTop: 20,
                          height: 32,
                          width: 32,
                          borderRadius: 8,
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor:
                            item.skills[0].status === 'NOT_STARTED'
                              ? '#dbdbdb'
                              : null,
                        }}>
                        {item.skills[0].status === 'NOT_STARTED' ? (
                          <Image
                            style={{
                              height: 14,
                              width: 18,
                            }}
                            source={Images.dropDown_black}
                          />
                        ) : (
                          <Image
                            style={{height: 14, width: 18}}
                            source={Images.dropDown_white}
                          />
                        )}
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </View>
                {item.skills.length > 0 && expand === index + 1 ? (
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}>
                    {item.skills.map((skill, skillindex) => {
                      return (
                        <View
                          key={skillindex}
                          style={{
                            flexDirection: 'row',
                            marginTop: hp('3.5%'),
                            marginLeft:
                              skill.status === 'AWARDED' ? wp('4%') : wp('8%'),
                          }}>
                          {skill.status === 'AWARDED' ? (
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
                                    item.status === 'AWARDED'
                                      ? 'white'
                                      : item.status === 'IN_PROGRESS'
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
                              {/* skill 1 */}
                              {skill.name}
                            </Text>

                            <Text
                              style={[
                                styles.insideText,
                                {
                                  color:
                                    item.status === 'AWARDED' ||
                                    item.status === 'IN_PROGRESS'
                                      ? 'white'
                                      : item.status === 'AWARDED' ||
                                        item.status === 'IN_PROGRESS'
                                      ? 'white'
                                      : colors.grey,
                                },
                                {
                                  marginLeft: wp('5%'),
                                  fontSize: Fontsize,
                                },
                              ]}>
                              {skill.status === 'AWARDED'
                                ? 'Attained'
                                : skill.status === 'IN_PROGRESS'
                                ? 'In progress'
                                : 'Upcoming'}
                            </Text>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                ) : null}
              </LinearGradient>
            </View>
          );
        })}
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

export default NewTimelines;
