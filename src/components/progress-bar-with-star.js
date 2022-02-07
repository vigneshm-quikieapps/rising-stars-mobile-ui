/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Slider from 'react-native-slider';
import {Images} from '../constants';

export default function ProgressBarWithStar(props) {
  return (
    <Slider
      value={props.value}
      //   onValueChange={value => setValue(value)}
      disabled={true}
      thumbImage={Images.star}
      thumbStyle={{height: 25, width: 35}}
      // thumbTintColor="#ffffff"
      thumbTintColor={0}
      trackStyle={{
        height: 8,
        borderRadius: 4.5,
        backgroundColor: 'rgb(242,242,242)',
      }}
      minimumTrackTintColor={'rgb(255,163,0)'}
      maximumTrackTintColor={'rgb(255,126,0)'}
    />
  );
}
