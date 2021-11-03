import React from 'react'
import { View, Text, TouchableOpacity} from 'react-native'
import { hp } from '../Constant/Constant'
import LinearGradient from 'react-native-linear-gradient'

const Btn = (props) => {
    return (
       
            <TouchableOpacity onPress={props.onPress}  disabled={props.disabled}>
                {
                    props.children
                }
            </TouchableOpacity>
 
    )
}

export default Btn