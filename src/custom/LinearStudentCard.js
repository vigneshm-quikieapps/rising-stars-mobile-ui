import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {wp, hp, colors,Fontsize} from '../Constant/Constant';
import LinearGradient from 'react-native-linear-gradient';

export default function LinearStudentcard(props) {
  return (
    <LinearGradient colors={props.colors} style={[styles.container, props.style]}>
      <View style={[styles.subcontainer, props.substyle]}>
        <View>
          <Text style={styles.head}>Child Name</Text>
          <Text style={styles.body}>{props.name}</Text>
        </View>
        {props.id && (
          <View style={{alignItems:'center'}}>
            <Text style={styles.head}>Child Age</Text>
            <Text style={styles.body}>{props.id}</Text>
          </View>
        )}
      </View>
      {props.activityrequired && (
        <View style={styles.subcontainer}>
          <View>
            <Text style={styles.head}>Club Name</Text>
            <Text style={styles.body}>{props.activity}</Text>
            {/* <Text style={styles.subbody}>{props.subactivity}</Text> */}
          </View>
        </View>
      )}
      {props.classname && (
        <View style={styles.subcontainer}>
          <View>
            <Text style={styles.head}>Class Name</Text>
            <Text style={styles.body}>{props.classname}</Text>
            {/* <Text style={styles.subbody}>{props.subactivity}</Text> */}
          </View>
        </View>
      )}
      {props.clubid && (
        <View style={styles.subcontainer}>
          <View>
            <Text style={styles.head}>Club ID</Text>
            <Text style={styles.body}>{props.clubid}</Text>
            {/* <Text style={styles.subbody}>{props.subactivity}</Text> */}
          </View>
        </View>
      )}
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
  subcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('1%'),
  },
  head: {
    fontFamily: 'Nunito-Regular',
    fontSize:Fontsize,
    color: 'white',
    opacity:0.7
  },
  body: {
    fontFamily: 'Nunito-Regular',
    fontSize:Fontsize,
    color: 'white',
  },
  subbody: {
    fontFamily: 'Nunito-Regular',
    fontSize:Fontsize,
  },
});
