import React from 'react'
import { Text, View, TextInput, StyleSheet } from 'react-native'
import { hp, wp, colors, } from '../Constant/Constant'
import { RadioButton } from 'react-native-paper'
import Input from './Input'

const Atmcard = (props) => {
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton />
                <View style={{ marginLeft: wp('3%') }}>
                    <Text style={styles.cardtext}>Cards</Text>
                    <Text style={styles.cardOption}>Credit / Debit / ATM Card</Text>
                </View>
            </View>
            <View style={styles.carddetails}>
                <Input
                    placeholder="Card Number"
                    placeholderTextColor={"black"}
                />
                <View style={styles.breaks} />
                <Text style={styles.valid}>Valid thru</Text>

                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Input
                            placeholder={"MM"}
                            style={{ width: wp('11%') }}
                        />
                        <View style={{ borderWidth: 1, borderColor: colors.lightgrey, width: wp('15%') }} />
                    </View>
                    <View style={{ marginLeft: wp('2%') }}>
                        <Input
                            placeholder={"YY"}
                            style={{ width: wp('11%') }}
                        />
                        <View style={{ borderWidth: 1, borderColor: colors.lightgrey, width: wp('15%') }} />
                    </View>
                    <View style={{ marginLeft: wp('4%') }}>
                        <Input
                            placeholder={"CVV"}
                            style={{ width: wp('12%') }}
                        />
                        <View style={{ borderWidth: 1, borderColor: colors.lightgrey, width: wp('35%') }} />
                    </View>
                </View>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: hp('31.5%'),
        borderWidth: 1,
        padding: hp('2%'),
        marginVertical: hp('1%'),
        borderRadius: 10,
        borderColor: colors.orange
    },
    cardtext: {
        fontFamily: "Nunito-SemiBold",
        // fontWeight: "bold",
        fontSize: hp('2.5%')
    },
    cardOption: {
        fontFamily: "Nunito-SemiBold",
        color: colors.grey
    },
    carddetails: {
        flex: 1,
        height: hp('20%'),
        borderWidth: 1,
        borderRadius: 10,
        borderColor: colors.lightgrey,
        padding: hp('2%')
    },
    breaks: {
        borderWidth: 1,
        borderColor: colors.orange,
        marginHorizontal: wp('1%')
    },
    valid: {
        fontFamily: "Nunito-SemiBold",
        fontSize: hp('1.5%'),
        marginTop: hp('1%'),
        color: colors.grey,
        marginLeft: wp('1%')
    }
})

export default Atmcard


