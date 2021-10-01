import React from 'react'
import { View, Text, TouchableOpacity} from 'react-native'
import { hp } from '../Constant/Constant'
import LinearGradient from 'react-native-linear-gradient'

const Btn = (props) => {
    return (
        <LinearGradient colors={['#ffa300', '#ff7e00']} style={[props.style,{marginTop:hp('3%')}]}>
            <TouchableOpacity onPress={props.onPress}  disabled={props.disabled}>
                {
                    props.children
                }
            </TouchableOpacity>
        </LinearGradient>
    )
}

export default Btn