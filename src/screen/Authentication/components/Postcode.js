import React,{useState} from 'react'
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Button, TouchableOpacity } from 'react-native'
import { RadioButton } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'
import EntIcon from 'react-native-vector-icons/Entypo'

import PopUp from '../../../custom/PopUp'
import AppButton from '../../../custom/AppButton'
import Buttons from '../../../custom/Buttons'
import { colors, Fontsize, wp, hp } from '../../../Constant/Constant'


export default function PostComponent(props) {
    const dispatch = useDispatch()
    const postcodeData = useSelector(state => state.Postcode.postcode)
    const isloading = useSelector(state => state.Postcode.isloading)
    console.log('post code----------->', postcodeData)
    const [show,setShow] = useState('')
    const [data,setData] = useState(false)

    const handlemore = (item) => {
        console.log(item)
        setShow(item)
        setData(!data)
    }

    return (
        <PopUp
            animationType="slide"
            transparent={true}
            visible={props.visible}
            onRequestClose={() => { }}
        >
            <View style={[styles.container, { borderColor: isloading ? "white" : colors.orange, backgroundColor: isloading ? null : "white" }]}>

                {
                    isloading ? <ActivityIndicator size="large" color={colors.orange} />
                        :
                        <View >
                            <View>
                                <TouchableOpacity onPress={props.ClosePopUp}>
                                    <LinearGradient style={styles.closePopUp} colors={['#ffa300', '#ff7e00']}>
                                        {/* <Text style={{ fontFamily: "Nunito-Regural", color: "white" }}>x</Text> */}
                                        <EntIcon name="cross" size={15} color="white" />
                                    </LinearGradient>
                                </TouchableOpacity>
                                <View style={styles.titlestyle}>

                                    <Text style={styles.herderstyle}>Search for address</Text>
                                    <Text style={styles.title}>Your PostCode <Text style={{ fontWeight: 'bold' }}>{props.title}</Text></Text>
                                </View>
                                <View style={{
                                    borderBottomWidth: 1,
                                    borderColor: colors.lightgrey, marginBottom: hp('0.1%')
                                }} />
                            </View>
                            {
                                postcodeData && postcodeData.length > 0 &&
                                <FlatList
                                    data={postcodeData}
                                    keyExtractor={item => item.addressline1}
                                    initialNumToRender={10}
                                    renderItem={item => {
                                        // console.log(item)
                                        return (
                                            <View style={styles.postcodeconatiner}>
                                                <RadioButton />
                                                <View style={{width:wp('65%')}}>
                                                    <Text style={styles.head} ellipsizeMode='head'>{item.item.organisation}</Text>
                                                    <Text style={styles.body} numberOfLines={show === item.item.addressline1 && data ? 0 : 1} ellipsizeMode='tail'>{item.item.addressline1}<Text>{item.item.addressline2}</Text></Text>
                                                   <Text onPress={() => handlemore(item.item.addressline1)} style={{alignSelf:'flex-end',fontSize:wp('2.5%'),color:colors.orange, textDecorationLine: 'underline',}}>More info</Text> 
                                                </View>
                                            </View>
                                        )
                                    }}
                                />
                            }
                            <View style={{borderBottomWidth:1,borderBottomColor:colors.lightgrey}}/>
                            <View style={styles.bottomView}>
                                <AppButton title="Enter Manually" style={{paddingVertical:12}}/>
                                <AppButton title="OK" style={{paddingVertical:12,marginVertical:0}}/>
                            </View>
                        </View>
                }
            </View>
        </PopUp>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginHorizontal: wp('7%'),
        marginVertical: hp('2%'),
        paddingHorizontal: wp('3%'),
        paddingVertical: hp('2%'),
        borderRadius: 10,
        borderWidth: 1,

    },
    postcodeconatiner: {
        flexDirection: 'row',
        marginVertical: hp('0.5%'),

    },
    head: {
        fontFamily: "Nunito-Regular",
        fontSize: Fontsize + wp('0.5%'),
        fontWeight: "bold"
    },
    herderstyle: {
        fontFamily: 'Nunito-Regular',
        fontSize: Fontsize + wp('1%'),
        fontWeight: "bold",

    },
    body: {
        fontFamily: 'Nunito-Regular',
        width: wp('65%')
    },
    title: {
        fontFamily: "Nunito-Regular"
    },
    titlestyle: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    closePopUp: {
        height: hp('3%'),
        width: hp('3%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        alignSelf: 'flex-end',
        marginTop: -hp('1%')
    },
    bottomView:{
    // position:'absolute',
    // height:hp('8%'),
    // width:wp('80%'),
    //backgroundColor:'pink',
    // bottom:0.1,
    margin:0,
    flexDirection:'row',
    justifyContent:'space-between'
    }

})
