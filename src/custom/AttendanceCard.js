import React from 'react';
import { View, StyleSheet, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { wp, hp, colors, Fontsize } from '../Constant/Constant';

const radius = 15
const AttendanceCard = (props) => {

    return (
        <View style={styles.container}>
            <LinearGradient colors={props.color} style={styles.linearGradient} />
            <View style={{}}>
                <View style={[styles.subContainer, props.style]}>
                    {
                        props.class && <Text style={styles.class}> {props.class}</Text>
                    }
                    <View style={{ marginLeft: wp('2%') }}>
                        <Text style={styles.value}>{props.value}</Text>
                        <Text style={styles.label}>{props.label}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    subContainer: {
        height: hp('8%'),
        width: wp('36%'),
        paddingRight:wp('4%'),
        borderTopRightRadius: radius,
        borderBottomRightRadius: radius,
        flexDirection: "row",
        alignItems: "center"
    },
    linearGradient: {
        height: hp('8%'),
        width: 8,
        borderTopLeftRadius: radius,
        borderBottomLeftRadius: radius
    },
    value: {
        fontSize:Fontsize,
        fontFamily: "Nunito-Regular"
    },
    label: {
        fontSize: Fontsize,
        color: "#555555",
        fontFamily: "Nunito-Regular"
    },
    class: {
        fontSize: hp('5%'),
        fontFamily: "Nunito-Regular"
    },
})

export default AttendanceCard