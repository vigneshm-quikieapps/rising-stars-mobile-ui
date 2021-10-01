import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../Constant/Constant';

export default function AttendanceOverview(props) {
  return (
    <View style={styles.container}>

      <View
        style={[
          styles.subcontainer,
          { backgroundColor: props.backgroundColor1 },
        ]}>
        <LinearGradient
          colors={props.linearGradient1}
          angle={90}
          style={styles.linearGradient}
        />
        <View style={{ flex: 1, padding: 7.5 }}>
          <Text style={styles.value}> {props.value1}</Text>
          <Text style={styles.label}>{props.label1}</Text>
        </View>
      </View>

      <View
        style={[
          styles.subcontainer,
          { backgroundColor: props.backgroundColor2 },
        ]}>
        <LinearGradient
          colors={props.linearGradient2}
          angle={90}
          style={styles.linearGradient}
        />
        <View style={{ flex: 1, padding: 7.5 }}>
          <Text style={styles.value}> {props.value2}</Text>
          <Text style={styles.label}>{props.label2}</Text>
        </View>
      </View>

      <View
        style={[
          styles.subcontainer,
          { backgroundColor: props.backgroundColor3 },
        ]}>
        <LinearGradient
          colors={props.linearGradient3}
          angle={90}
          style={styles.linearGradient}
        />
        <View style={{ flex: 1, padding: 7.5 }}>
          <Text style={styles.value}> {props.value3}</Text>
          <Text style={styles.label}>{props.label3}</Text>
        </View>
      </View>

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 10,
  },
  subcontainer: {
    width: '31%',
    flexDirection: 'row',
    borderTopLeftRadius: 11,
    borderBottomLeftRadius: 11,
    borderTopRightRadius: 11,
    borderBottomRightRadius: 11,
  },
  linearGradient: {
    height: '100%',
    width: 8,
    borderTopLeftRadius: 11,
    borderBottomLeftRadius: 11,
  },
  value: {
    fontSize: 18,
  },
  label: {
    fontSize: 16,
    color: '#555555',
    fontFamily: 'Nunito-Regular',
  },
});
