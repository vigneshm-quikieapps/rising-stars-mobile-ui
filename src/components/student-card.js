/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {wp, hp, colors, Fontsize} from '../constants';

export default function StudentCard(props) {
  return (
    <View style={[styles.container, props.style]}>
      <View style={[styles.subContainer, props.substyle]}>
        <View>
          <Text style={styles.head}>Child Name</Text>
          <Text style={styles.body}>{props.name}</Text>
        </View>
        {props.age ? (
          <View style={{alignItems: 'center'}}>
            <Text style={styles.head}>Child Age</Text>
            <Text style={styles.body}>{props.age}</Text>
          </View>
        ) : null}
      </View>
      {props.activityrequired && (
        <View style={styles.subContainer}>
          <View>
            <Text style={styles.head}>Club Name</Text>
            <Text style={styles.body}>{props.activity}</Text>
            {/* <Text style={styles.subbody}>{props.subactivity}</Text> */}
          </View>
        </View>
      )}
      {props.classname && (
        <View style={styles.subContainer}>
          <View>
            <Text style={styles.head}>Class Name</Text>
            <Text style={styles.body}>{props.classname}</Text>
            {/* <Text style={styles.subbody}>{props.subactivity}</Text> */}
          </View>
        </View>
      )}
      {props.clubid && (
        <View style={styles.subContainer}>
          <View>
            <Text style={styles.head}>Club ID</Text>
            <Text style={styles.body}>{props.clubid}</Text>
            {/* <Text style={styles.subbody}>{props.subactivity}</Text> */}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: hp('2%'),
    backgroundColor: colors.pumpkinorange,
    borderRadius: 16,
    paddingHorizontal: wp('8%'),
    paddingVertical: hp('2%'),
    width: wp('90%'),
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('1%'),
  },
  head: {
    fontFamily: 'Nunito-Regular',
    fontSize: Fontsize,
    color: 'grey',
  },
  body: {
    fontFamily: 'Nunito-Regular',
    fontSize: Fontsize,
  },
  subbody: {
    fontFamily: 'Nunito-Regular',
    fontSize: Fontsize,
  },
});
