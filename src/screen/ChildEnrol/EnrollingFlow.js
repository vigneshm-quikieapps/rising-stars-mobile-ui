import React, { useState } from 'react';
import { View, StyleSheet, Text, Dimensions, FlatList } from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
import AppButton from './../../custom/AppButton';
import { colors, wp, hp, Fontsize, EnrollData } from './../../Constant/Constant';
import CustomLayout from './../../custom/CustomLayout';
import LinearGradient from 'react-native-linear-gradient';


function EnrollingFlow(props) {

  return (
    <CustomLayout
      backbutton={() => props.navigation.goBack()}
      headertext={'Enter Child To a Club Activity'}
      headertextStyle={{
        fontSize: wp('8%'),

      }}>
      <View style={{ height: hp('3%') }} />
      <FlatList
        data={EnrollData}
        keyExtractor={item => item.id}
        renderItem={item => {
          return (
            <View style={styles.container}>
              <View>
                <LinearGradient colors={['#ffa300', '#ff7e00']} style={styles.circle}><Text style={styles.circlecontainer}>{item.item.id}</Text></LinearGradient>
                {item.item.id < 6 ? <View style={styles.line} /> : null}
              </View>
              <View style={{ marginLeft: wp('2%') }}>
                <Text style={{ color: colors.grey, fontFamily: 'Nunito-Regular' }}>{item.item.title}</Text>
                <Text style={{ fontFamily: 'Nunito-SemiBold', fontSize: Fontsize }}>{item.item.description}</Text>
              </View>
            </View>
          )
        }}
      />
      <AppButton
        title="Let's Start"
        onPress={() => props.navigation.navigate('AddChild')}
        style={{ fontFamily: 'Nunito-SemiBold', marginTop: hp('6%') }}
      />
    </CustomLayout>
  );
}
export default EnrollingFlow;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  circle: {
    height: hp('6%'),
    width: hp('6%'),
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  circlecontainer: {
    fontFamily: "Nunito-SemiBold",
    color: "white",
    fontSize: Fontsize
  },
  line: {
    height: hp('5%'),
    width: wp('0.3%'),
    backgroundColor: colors.orange,
    alignSelf: 'center'
  }
});