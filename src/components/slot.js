/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {hp, wp, colors, Fontsize} from '../constants';
import RadioButton from './radio-button';

const Slot = props => {
  const [selected, setSelected] = useState(false);
  const combinedOnpress = () => {
    props.onPress();
    setSelected(!selected);
  };
  return (
    <View
      style={[
        styles.container,
        props.style,
        {
          borderColor: selected ? '#ff7e00' : 'white',
          backgroundColor: selected ? 'white' : '#f2f2f2',
        },
      ]}>
      {props.waitlisted ? (
        <View style={styles.waitlistedContainer}>
          <Text style={styles.waitlistedText}>Waitlisted Class</Text>
        </View>
      ) : null}
      {props.radio ? (
        <RadioButton onPress={combinedOnpress} status={props.status} />
      ) : null}

      <View
        style={
          props.waitlisted ? styles.slotwithwaitlisted : styles.slotdetails
        }>
        {props.required && (
          <View style={{marginBottom: hp('1%')}}>
            <Text style={(styles.day, {marginLeft: wp('0.5%')})}>
              {props.Class}
            </Text>
            <Text style={styles.time}>{props.sessions}</Text>
          </View>
        )}
        <Text style={styles.day}> {props.day}</Text>
        <Text style={styles.time}>{props.time}</Text>
        <View style={styles.subdetails}>
          <View style={styles.left}>
            <Text style={styles.head}>Facility</Text>
            <Text style={styles.body}>{props.facility}</Text>
          </View>
          <View>
            <Text style={styles.head}>Coach</Text>
            <Text style={styles.body}>{props.coach}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: hp('2.5%'),
    borderWidth: 1,
    borderRadius: 15,
    flexDirection: 'row',
    paddingHorizontal: wp('5%'),
  },
  slotdetails: {
    marginLeft: wp('4%'),
  },
  slotwithwaitlisted: {
    marginTop: hp('7%'),
  },
  waitlistedContainer: {
    backgroundColor: '#d56b6b',
    width: wp('40%'),
    height: hp('5%'),
    position: 'absolute',
    top: hp('3%'),
    left: 0,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    justifyContent: 'center',
  },
  waitlistedText: {
    color: 'white',
    paddingHorizontal: 20,
    fontFamily: 'Nunito-Regular',
  },
  day: {
    fontFamily: 'Nunito-SemiBold',
    // fontWeight: 'bold',
    fontSize: Fontsize,
    marginLeft: -wp('1%'),
  },
  time: {
    fontFamily: 'Nunito-Regular',
    color: colors.grey,
    fontSize: Fontsize,
  },
  subdetails: {
    flexDirection: 'row',
    marginTop: hp('1%'),
  },
  left: {
    width: wp('40%'),
  },
  head: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: wp('3.5%'),
    color: colors.grey,
  },
  body: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: Fontsize,
  },
});

export default Slot;
