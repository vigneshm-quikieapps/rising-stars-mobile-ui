import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import CustomLayout from '../../custom/CustomLayout';
import Studentcard from '../../custom/Studentcard';
import ProgressTracker from '../../custom/ProgressTracker';
import Forwardbutton from '../../custom/Forwardbutton';
import {colors, hp, wp} from '../../Constant/Constant';
import PopUp from '../../custom/PopUp';
import Input from '../../custom/Input';
import PopUpCard from '../../custom/PopUpCard';
import Slot from '../../custom/Slot';

export default function Class_Selection(props) {
  const [business, setBusiness] = useState(false);
  const [club, setClub] = useState(false);

  return (
    <CustomLayout
      Customchildren={<Studentcard name={'Ayman Mongal'} id={'KKBK1211'} />}
      steps
      start={2}
      end={7}
      header
      headerTextBigText={true}
      headertext={'Activity Selection'}
      backbutton={() => props.navigation.goBack()}
      Customchildren2={<ProgressTracker percent={2} />}>
      <PopUpCard
        headertext={'Club Name*'}
        text={'Select your Business name'}
        textColor={'black'}
        style={{fontSize: wp('4%'), marginLeft: -wp('1.2%')}}></PopUpCard>
      <PopUpCard
        headertext={'Class Name*'}
        text={'Select your Session name'}
        textColor={'black'}
        style={{fontSize: wp('4.5%'), marginLeft: -wp('1.2%')}}></PopUpCard>
      <Text
        style={{
          fontFamily: 'Nunito-SemiBold',
          marginVertical: hp('1%'),
          fontSize: wp('4%'),
        }}>
        Available Session
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
      <View style={{marginVertical: hp('0.5%')}} />
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
        Waitlisted Session
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
        style={{alignSelf: 'flex-end', marginTop: hp('1%')}}
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
});
