import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import CustomLayout from '../../custom/CustomLayout';
import Studentcard from '../../custom/Studentcard';
import ProgressTracker from '../../custom/ProgressTracker';
import Forwardbutton from '../../custom/Forwardbutton';
import {colors, Fontsize, hp, wp} from '../../Constant/Constant';
import PopUp from '../../custom/PopUp';
import Input from '../../custom/Input';
import PopUpCard from '../../custom/PopUpCard';
import Slot from '../../custom/Slot';

export default function Class_Selection(props) {
  const [business, setBusiness] = useState(false);
  const [club, setClub] = useState(false);

  return (
    <CustomLayout
      Customchildren={<Studentcard name={'Ayman Mogal'} id={'4'} />}
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
        text={'Select your Club'}
        textColor={'black'}
        style={{fontSize: Fontsize, marginLeft: -wp('1.2%')}}></PopUpCard>
      <PopUpCard
        headertext={'Class Name*'}
        text={'Select your Class'}
        textColor={'black'}
        style={{fontSize: Fontsize, marginLeft: -wp('1.2%')}}></PopUpCard>
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
