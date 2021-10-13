import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity, Modal, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import CustomLayout from '../../custom/CustomLayout';
import Studentcard from '../../custom/Studentcard';
import ProgressTracker from '../../custom/ProgressTracker';
import Forwardbutton from '../../custom/Forwardbutton';
import { colors, Fontsize, hp, wp } from '../../Constant/Constant';
import PopUp from '../../custom/PopUp';
import Input from '../../custom/Input';
import PopUpCard from '../../custom/PopUpCard';
import Slot from '../../custom/Slot';
import { getClubdata, getClassdata,getSessiondata } from '../../redux/action/enrol';
import * as Action from '../../redux/actiontype'

import { useSelector, useDispatch } from 'react-redux'

export default function Class_Selection(props) {

  const [business, setBusiness] = useState("hello");
  const [classes, setClasses] = useState();
  const [showclass, setShowClass] = useState(false)
  const [showsession, setShowsession] = useState(false)

  // console.log(business)
  const fullName = useSelector(state => state.childData.fullName)
  const age = useSelector(state => state.childData.age)
  const clubData = useSelector(state => state.clubname.clubData)
  const classData = useSelector(state => state.classname.classtate)
  const sessionData = useSelector(state => state.sessionlist.sessionState)
  // clubData.unshift({_id:1,"name":"Select your Club"}) 
  //  classData.unshift({_id:1,"name":"Select your Club"}) 
  //const error = useSelector(state => state.classname.error)
  const dispatch = useDispatch()
  console.log('sessionData --------------->', sessionData)
  // console.log('classesData --------------->', classData)
  // console.log('error------------>', error)
  const handleBusiness = (itemValue, itemIndex) => {
    setBusiness(itemValue)
    setShowClass(true)
    dispatch(getClassdata(business))
  }
  const handleClasses = (itemValue, itemIndex) => {
    setClasses(itemValue)
    setShowsession(true)
    dispatch(getSessiondata(classes))   
  }
  // console.log(classes)
  useEffect(() => {
    dispatch(getClubdata())

  }, [])

  return (
    <CustomLayout
      Customchildren={<Studentcard name={fullName} id={age}  />}
      steps
      start={2}
      end={7}
      header
      headerTextBigText={true}
      headertext={'Class Selection'}
      backbutton={() => props.navigation.goBack()}
      Customchildren2={<ProgressTracker percent={2} />}>
      <PopUpCard
        headertext={'Club Name*'}
        picker={true}
      >
        <Picker
          selectedValue={business}
          style={{ height: 45, width: wp('88%') }}
          onValueChange={(itemValue, itemIndex) => handleBusiness(itemValue, itemIndex)}
        >
          {
            clubData && clubData.length > 0 && clubData.map(item => {
              return (
                <Picker.Item label={item.name} value={item._id} key={item._id} />
              )
            })
          }
        </Picker>
      </PopUpCard>

      {
        showclass ? classData && classData.length > 0 ?
          <PopUpCard
            headertext={'Class Name*'}
            picker={true}

          >
            <Picker
              selectedValue={classes}
              style={{ height: 45, width: wp('88%') }}
              onValueChange={(itemValue, itemIndex) => handleClasses(itemValue, itemIndex)}
            >
              {
                classData && classData.length > 0 && classData.map(item => {
                  return (               
                    <Picker.Item label={item.name} value={item._id} key={item._id} />                    
                  )
                })
              }
            </Picker>
          </PopUpCard> :
          <ActivityIndicator size="large" color={colors.orange} /> : null
      }

      <Text
        style={{
          fontFamily: 'Nunito-Regular',
          marginVertical: hp('1%'),
          fontSize: Fontsize,
        }}>
        Available Sessions
      </Text>
      <Slot
        white
        radio
        selected
        day={'Monday'}
        time={'9:30 am - 11:30 am'}
        facility={'Gym Hall'}
        coach={'Henry Itondo'}
      />
      <View style={{ marginVertical: hp('0.5%') }} />
      <Slot
        radio
        day={'Wednesday'}
        time={'9:30 am - 11:30 am'}
        facility={'Gym Hall'}
        coach={'Tua Manera'}
      />
      <Text
        style={{
          fontFamily: 'Nunito-SemiBold',
          marginVertical: hp('1%'),
          fontSize: wp('4%'),
        }}>
        Waitlisted Sessions
      </Text>
      <Slot
        radio
        day={'Friday'}
        time={'9:30 am - 11:30 am'}
        facility={'Gym Hall'}
        coach={'Sampson Totton'}
      />
      {/* <View style={{ height: hp('28%') }} /> */}
      <Forwardbutton
        style={{ alignSelf: 'flex-end', marginTop: hp('1%') }}
        onPress={() => props.navigation.navigate('Fees_Overview')}
      />
    </CustomLayout>
  );
}

const styles = StyleSheet.create({
  business: {
    height: hp('11%'),
    borderWidth: 1,
    marginVertical: hp('1%'),
    borderRadius: 10,
    borderColor: colors.lightgrey,
    padding: hp('2%'),
  },
  card: {
    height: hp('6%'),
    width: wp('80%'),
    // borderColor: colors.orange,
    // borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    margin: wp('0.1%'),
    // borderRadius:50
  },
  cardtext: {
    fontFamily: "Nunito-Regular",
    fontSize: Fontsize
  },
  modalView: {
    flex: 1,
    margin: 20,
    // backgroundColor: "white",
    // borderRadius: 20,
    // padding: 35,
    alignItems: "center",
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5
  },
});
