import React from 'react'
import { View, Text, TouchableOpacity} from 'react-native'
import { hp } from '../Constant/Constant'

const Btn = (props) => {
    return (
        <View>
            <TouchableOpacity onPress={props.onPress}  disabled={props.disabled} style={[props.style,{marginTop:hp('3%')}]}>
                {
                    props.children
                }
            </TouchableOpacity>
        </View>
    )
}

export default Btn