/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Timeline from 'react-native-timeline-flatlist';
import {Images, wp} from '../constants';

export default function TimeLine() {
  const data = [
    {
      title: 'Event 1',
      lineColor: '#009688',
      description: 'Basic stretching regim',
      status: 'Attained',
      icon: (
        <View
          style={{
            height: 34,
            width: 34,
            backgroundColor: '#ffffff',
            borderRadius: 34 / 2,
            borderWidth: 2,
            borderColor: 'rgb(78,192,160)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image style={{width: 20, height: 20}} source={Images.completed} />
        </View>
      ),
    },
    {
      title: 'Event 2',
      description: 'Walking along balancing beam',
      status: 'In Progress',
      icon: (
        <View
          style={{
            height: 34,
            width: 34,
            backgroundColor: '#ffffff',
            borderRadius: 34 / 2,
            borderWidth: 2,
            borderColor: 'rgb(255,126,0)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              height: 10,
              width: 10,
              borderRadius: 5,
              backgroundColor: 'rgb(255,126,0)',
            }}
          />
        </View>
      ),
    },
    {
      title: 'Event 3',
      description: 'Back-In, Full-Out',
      status: 'Upcoming',
      icon: (
        <View
          style={{
            height: 34,
            width: 34,
            backgroundColor: '#ffffff',
            borderRadius: 34 / 2,
            borderWidth: 2,
            borderColor: 'rgb(227,227,227)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      ),
    },
    {
      title: 'Event 4',
      description: 'Layout Position',
      status: 'Upcoming',
      icon: (
        <View
          style={{
            height: 34,
            width: 34,
            backgroundColor: '#ffffff',
            borderRadius: 34 / 2,
            borderWidth: 2,
            borderColor: 'rgb(227,227,227)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      ),
    },
    {
      title: 'Event 5',
      description: 'Layout Position',
      status: 'Upcoming',
      icon: (
        <View
          style={{
            height: 34,
            width: 34,
            backgroundColor: '#ffffff',
            borderRadius: 34 / 2,
            borderWidth: 2,
            borderColor: 'rgb(227,227,227)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      ),
    },
    {
      title: 'Event 5',
      description: 'Layout Position',
      status: 'Upcoming',
      icon: (
        <View
          style={{
            height: 34,
            width: 34,
            backgroundColor: '#ffffff',
            borderRadius: 34 / 2,
            borderWidth: 2,
            borderColor: 'rgb(227,227,227)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      ),
    },
    {
      title: 'Event 5',
      description: 'Layout Position',
      status: 'Upcoming',
      icon: (
        <View
          style={{
            height: 34,
            width: 34,
            backgroundColor: '#ffffff',
            borderRadius: 34 / 2,
            borderWidth: 2,
            borderColor: 'rgb(227,227,227)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      ),
    },
  ];

  const renderDetail = (rowData, sectionID, rowID) => {
    var desc = null;
    if (rowData.description) {
      desc = (
        <View
          style={{
            padding: 20,
            paddingRight: 0,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {rowData.status !== 'Upcoming' ? (
            <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
              <View
                style={{
                  height: 20,
                  width: 20,
                  borderRadius: 10,
                  borderColor: '#ffffff',
                  marginTop: 10,
                  borderWidth: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{height: 15, width: 15}}
                  source={Images.completed_white}
                />
              </View>
              <View style={{marginLeft: 10}}>
                <Text
                  style={{
                    color:
                      rowData.status === 'Upcoming' ? '#000000' : '#ffffff',
                    fontSize: wp('4.5%'),

                    fontFamily: 'Nunito-SemiBold',
                  }}>
                  {rowData.description}
                </Text>
                <Text
                  style={{
                    color:
                      rowData.status === 'Upcoming'
                        ? 'rgb(205,210,204)'
                        : '#ffffff',
                    fontSize: wp('4.5%'),
                    fontFamily: 'Nunito-Regular',
                  }}>
                  {rowData.status}
                </Text>
              </View>
            </View>
          ) : (
            <View style={{}}>
              <Text
                style={{
                  color: rowData.status === 'Upcoming' ? '#000000' : '#ffffff',
                  fontSize: wp('4.5%'),

                  fontFamily: 'Nunito-SemiBold',
                }}>
                {rowData.description}
              </Text>
              <Text
                style={{
                  color:
                    rowData.status === 'Upcoming'
                      ? 'rgb(205,210,204)'
                      : '#ffffff',
                  fontSize: wp('4.5%'),

                  fontFamily: 'Nunito-Regular',
                }}>
                {rowData.status}
              </Text>
            </View>
          )}
        </View>
      );
    }
    return (
      <View style={{flex: 1}}>
        <LinearGradient
          colors={
            rowData.status === 'Attained'
              ? ['rgb(104,214,171)', 'rgb(51,171,150)']
              : rowData.status === 'In Progress'
              ? ['#ffa300', '#ff7e00']
              : ['rgb(242,242,242)', 'rgb(242,242,242)']
          }
          style={{
            padding: 20,
            flexDirection: 'row',
            borderRadius: 16,
          }}>
          {desc}
        </LinearGradient>
      </View>
    );
  };

  // const renderCircle = (rowData, sectionID, rowID) => {
  //   return (
  //     <View
  //       style={{
  //         justifyContent: 'flex-start',
  //         position: 'absolute',
  //         left: width * 0.5,
  //         transform: [{translateX: wp('-47%')}],
  //         marginTop: 30,
  //       }}>
  //       {rowData.icon}
  //     </View>
  //   );
  // };

  return (
    <Timeline
      data={data}
      keyExtractor={item => item.key}
      showTime={false}
      lineColor={'#cccccc'}
      innerCircle={'icon'}
      renderDetail={renderDetail}
      circleSize={34}
      lineWidth={2}
    />
  );
}
