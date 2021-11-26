import React from 'react';
import {View, Text, Image} from 'react-native';
import {Images} from '../../constants';

export default function SplashScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image
        source={Images.star}
        resizeMode={'contain'}
        style={{height: 60, width: 60}}
      />

      <View style={{marginTop: 10}}>
        <Text style={{fontSize: 26, fontFamily: 'Rubik-Medium'}}>
          Rising Stars
        </Text>
      </View>
    </View>
  );
}
