import React from 'react';
import { View } from 'react-native';
import Slider from "react-native-slider";
import { Images } from '../Constant/Constant';

export default function ProgressBarWithStar (props) {

    const [value,setValue] = React.useState(0.2)
    return (

        <Slider
          value={value}
        //   onValueChange={value => setValue(value)}
        disabled={true}
        thumbImage={Images.star}
        thumbStyle={{height:25,width:35}}
        thumbTintColor="#ffffff"
        thumbTintColor={0}
        trackStyle={{height:8,borderRadius:4.5,backgroundColor:"rgb(242,242,242)"}}
        minimumTrackTintColor={'rgb(255,163,0)'}
        maximumTrackTintColor={'rgb(255,126,0)'}
        />
        
    )
}