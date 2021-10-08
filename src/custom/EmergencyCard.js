import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import TextInputField from './TextInputField';
import ErrorMessage from './ErrorMessage';
import {wp, colors, hp} from '../Constant/Constant';
import Buttons from './Buttons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import PopUpCard from './PopUpCard';
import PopUp from './PopUp';

export default function EmergencyCard(props) {
  return (
    <View style={{flex: 1}}>
      {props.head && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.emergency}>{`Emergenct Contact (Secondary)`}</Text>
          <Buttons style={styles.cross} onPress={props.crossbutton}>
            <AntIcon name="minus" size={hp('2%')} color={colors.white} />
          </Buttons>
        </View>
      )}

      <TextInputField
        placeholder="Name *"
        value={props.valuename}
        onChangeText={props.onChangeTextname}
        onBlur={props.onBlurname}
      />

      <ErrorMessage
        style={styles.errorMessage}
        error={props.errorname}
        visible={props.visiblename}
      />

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={styles.countrycode}>
          <Text style={{fontSize: wp('4%'), color: colors.grey}}>+44</Text>
        </View>
        <TextInputField
          placeholder="Mobile Number *"
          value={props.valuescontactNumber}
          onChangeText={props.onChangeTextcontact}
          maxLength={10}
          keyboardType="number-pad"
          style={{width: wp('75%')}}
          onBlur={props.onBlurcontact}
        />
      </View>

      <ErrorMessage
        style={styles.errorMessage}
        error={props.errorcontactNumber}
        visible={props.visiblecontactNumber}
      />

      <PopUpCard
        text="Relationship"
        value={props.value}
        onPress={props.onPress}
      />
      {props.children}
      {props.addbuttons && (
        <View style={styles.bottom}>
          <Buttons
            disabled={props.disabled}
            style={styles.button}
            onPress={props.addbutton}>
            <AntIcon name="plus" size={hp('3%')} color={colors.white} />
          </Buttons>
          <Text style={styles.bottomtext}>Emergency Contact (Secondary)</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  errorMessage: {
    alignSelf: 'flex-end',
    paddingRight: wp('10%'),
    opacity: 0.5,
  },
  countrycode: {
    borderWidth: 1,
    borderColor: "#e3e3e3",
    borderRadius: 10,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    height: 'auto',
    marginTop: hp('1.2%'),
    marginVertical: hp('0.59%'),
    width: wp('15%'),
  },
  emergency: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: hp('2.5%'),
    marginTop: hp('2.5%'),
  },
  cross: {
    height: hp('2.5%'),
    width: hp('2.5%'),
    backgroundColor: colors.orange,
    marginTop: hp('3%'),
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: hp('8%'),
    width: hp('8%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: colors.orange,
  },
  bottom: {
    flexDirection: 'row',
    marginTop: hp('0%'),
    alignItems: 'center',

    // justifyContent: 'flex-start',
    // backgroundColor: 'pink',
  },
  bottomtext: {
    fontFamily: 'Nunito-SemiBold',
    // fontWeight: 'bold',
    marginLeft: wp('2%'),
    marginTop: hp('3%'),
    fontSize: wp('4%'),
    // justifyContent: 'center',
    // alignSelf: 'center',
    // alignItems: 'center',
    // alignContent: 'center',
    // backgroundColor: 'pink',
  },
});
