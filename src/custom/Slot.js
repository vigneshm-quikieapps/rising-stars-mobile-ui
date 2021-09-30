import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {hp, wp, colors} from '../Constant/Constant';

const Slot = props => {
  return (
    <View
      style={[
        styles.container,
        props.style,
        {
          borderColor: props.selected || props.white ? colors.orange : 'white',
          backgroundColor: props.selected || props.white ? 'white' : '#f2f2f2',
        },
      ]}>
      {props.radio ? (
        <RadioButton
          value={props.value}
          status={props.selected ? 'checked' : 'unchecked'}
          onPress={props.onPress}
          color={colors.orange}
          uncheckedColor={props.uncheckedColor}
        />
      ) : null}

      <View style={styles.slotdetails}>
        {props.required && (
          <View>
            <Text style={styles.day}>{props.Class}</Text>
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
    marginLeft: wp('1%'),
  },
  day: {
    fontFamily: 'Nunito-SemiBold',
    // fontWeight: 'bold',
    fontSize: wp('4%'),
  },
  time: {
    fontFamily: 'Nunito-SemiBold',
    color: colors.grey,
    fontSize: wp('3.5%'),
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
    fontSize: wp('3%'),
    color: colors.grey,
  },
  body: {
    fontFamily: 'Nunito-SemiBold',
  },
});

export default Slot;
