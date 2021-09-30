import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView, } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { wp, hp } from '../Constant/Constant'

const BarIndicator = (props) => {
    return (
        <LinearGradient
            colors={props.color}            
            style={[styles.container,props.style]}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        height: hp('1%'),
        borderRadius: 16,
        width: hp('2%'),
        alignSelf:'flex-end'
    }
})
export default BarIndicator