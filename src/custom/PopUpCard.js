import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { hp, wp, colors } from '../Constant/Constant'
import Input from "./Input";

const PopUpCard = (props) => {
    return (
        <View style={styles.container}>
            {
                props.headertext && <Text style={{ color: colors.grey }}>{props.headertext}</Text>
            }
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Input
                    placeholder={props.text}
                    placeholderTextColor={props.textColor}
                    style={[props.style]}
                    editable={false}
                    value={props.value}
                /> 
                <TouchableOpacity onPress={props.onPress}>
                    <Image source={require("../assets/images/icon-forward2-line-black.png")} style={styles.image} />
                </TouchableOpacity>
            </View>
        </View>      

    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        borderWidth: 1,
        marginVertical: hp('1%'),
        borderRadius: 10,
        borderColor: colors.orange,
        padding: wp('1%'),
        paddingHorizontal: wp('3%'),
        backgroundColor: colors.white,
        minHeight:hp('7%'),
        justifyContent:'center'
    },
    image:{
        height:hp('3%'),
        width:hp('3%')
    }
})

export default PopUpCard
