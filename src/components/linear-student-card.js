/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {wp, hp, Fontsize} from '../constants';
import LinearGradient from 'react-native-linear-gradient';

export default function LinearStudentCard({
  colors,
  style,
  subStyle,
  name,
  id,
  activityRequired,
  className,
  clubId,
  activity,
}) {
  return (
    <LinearGradient colors={colors} style={[styles.container, style]}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={[styles.subContainer, subStyle]}>
          <View
            style={{
              alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.head}>Child Name</Text>
            <Text style={styles.body}>{name}</Text>
          </View>
          {/* {id && (
            <View
              style={{
                alignItems: 'center',
                alignContent: 'center',
                justifyContent: 'center',
              }}>
              <Text style={styles.head}>Child Age</Text>
              <Text style={styles.body}>{id}</Text>
            </View>
          )} */}
        </View>
        {/* {activityRequired && (
        <View style={styles.subContainer}>
          <View>
            <Text style={styles.head}>Club Name</Text>
            <Text style={styles.body}>{activity}</Text>
            <Text style={styles.subBody}>{subactivity}</Text>
          </View>
        </View>
      )}
      {className && (
        <View style={styles.subContainer}>
          <View>
            <Text style={styles.head}>Class Name</Text>
            <Text style={styles.body}>{className}</Text>
            <Text style={styles.subBody}>{subactivity}</Text>
          </View>
        </View>
      )} */}
        {clubId && (
          <View style={styles.subContainer}>
            <View
              style={{
                alignItems: 'center',
                alignContent: 'center',
                justifyContent: 'center',
              }}>
              <Text style={styles.head}>Child's Club ID</Text>
              <Text style={styles.body}>{clubId}</Text>
              {/* <Text style={styles.subBody}>{subactivity}</Text> */}
            </View>
          </View>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: hp('2%'),
    borderRadius: 16,
    paddingHorizontal: wp('8%'),
    paddingVertical: hp('2%'),
    width: wp('90%'),
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('2%'),
    marginBottom: hp('2%'),
  },
  head: {
    fontFamily: 'Nunito-Regular',
    fontSize: Fontsize,
    //color: 'white',
    opacity: 0.7,
  },
  body: {
    fontFamily: 'Nunito-Regular',
    fontSize: Fontsize + wp('0.5%'),
    fontWeight: 'bold',
    //color: 'white',
  },
  subBody: {
    fontFamily: 'Nunito-Regular',
    fontSize: Fontsize,
  },
});
