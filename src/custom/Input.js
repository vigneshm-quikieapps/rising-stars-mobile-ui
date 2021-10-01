import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import { wp, hp, colors, Fontsize } from '../Constant/Constant'

const Input = (props) => {
    return (          
            <TextInput
                placeholder={props.placeholder}
                onChangeText={props.onChangeText}
                value={props.value}
                keyboardType={props.keyboardType}
                autoCapitalize={props.autoCapitalize}
                autoCompleteType={props.autoCompleteType}
                autoCorrect={props.autoCorrect}
                autoFocus={props.autoFocus}
                maxLength={props.maxLength}
                multiline={props.multiline}
                onFocus={props.onFocus}
                placeholderTextColor={props.placeholderTextColor}
                returnKeyType={props.returnKeyType}
                editable={props.editable}
                style={[styles.textarea, props.style]}
            />
    )
}

const styles = StyleSheet.create({
    textarea: {
        fontFamily: 'Nunito-Regular',
        width: wp('70%'),
        fontSize:wp('4%'),
        fontSize:Fontsize,
        color:colors.grey
    }
})
export default Input
