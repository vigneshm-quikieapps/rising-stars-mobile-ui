import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import FeaIcons from 'react-native-vector-icons/Feather'
import EntIcons from 'react-native-vector-icons/Entypo'
import { colors, Fontsize, hp, wp } from '../Constant/Constant'
import AppButton from './AppButton'
import Buttons from './Buttons'


export default function ClassCard(props) {
    return (
        <View style={[styles.container, props.style]}>
            {props.subtitle && <Text style={styles.subtitle}>{props.subtitle}</Text>}
            {props.id && <Text style={{ color: colors.grey, fontFamily: "Nunito-SemiBold", }}> Child's Club ID <Text style={{ color: "black" }}>{props.id}</Text></Text>}
            {props.classname && <Text style={styles.classname}>{props.classname}</Text>}

            <Data calendar head={props.day} body={props.time} stylebody={{ color: colors.grey }} />
            <View style={{ flexDirection: 'row', marginTop: hp('1%') }}>
                <Data star head={"Facility"} body={props.facility} stylehead={styles.head} />
                <Data user head={"Coach"} body={props.coach} stylehead={styles.head} />
            </View>
            {props.class && <AppButton title={props.title} onPress={props.classbutton} />}

            {props.member && <TouchableOpacity onPress={props.memberbutton} style={styles.class}><Text style={{ color: colors.reddish, fontFamily: "Nunito-Regular", }}>Drop Class</Text></TouchableOpacity>}
        </View>
    )
}

const Data = (props) => {
    return (
        <View style={styles.smallcontainer}>
            {props.calendar ? <Image source={require('../assets/images/icon-date-line.png')} /> : null}
            {props.user ? <Image source={require('../assets/images/icon-coach-line.png')} /> : null}
            {props.star ? <Image source={require('../assets/images/icon-Facility-line.png')} /> : null}
            <View style={{ marginLeft: wp('2%') }}>
                <Text style={[styles.day, props.stylehead]}>{props.head}</Text>
                <Text style={[styles.time, props.stylebody]}>{props.body}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: hp('2%'),
        elevation: 1,
        shadowColor: colors.lightgrey,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        overflow: 'hidden',
        shadowRadius: 5,
        borderRadius: 5,
        padding: wp('5%')
    },
    classname: {
        fontFamily: "Nunito-Regular",
        fontSize: hp('3%'),
        color: "#ff7e00"
    },
    subtitle: {
        fontFamily: "Nunito-Regular",
        fontSize: Fontsize - wp('0.4%'),
        marginBottom: hp('1%'),
        marginLeft: wp('1%')
    },
    smallcontainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    day: {
        fontFamily: "Nunito-SemiBold",
        fontSize: hp('2%'),
    },
    head: {
        fontFamily: "Nunito-SemiBold",
        fontSize: hp('1.5%'),
        color: colors.grey
    },
    time: {
        fontFamily: "Nunito-Regular",
        fontSize: hp('2%'),
    },
    class: {
        marginTop: hp('2%'),
        alignItems: 'center'
    }
})