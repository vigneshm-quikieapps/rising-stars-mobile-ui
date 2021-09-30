import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Image, Switch} from 'react-native';
import CustomLayout from '../../custom/CustomLayout';
import Studentcard from '../../custom/Studentcard';
import ProgressTracker from '../../custom/ProgressTracker';
import {colors, hp, wp} from '../../Constant/Constant';

import Forwardbutton from '../../custom/Forwardbutton';

const Provide_Consent = props => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(false);
  const [isEnabled3, setIsEnabled3] = useState(false);
  const [isEnabled4, setIsEnabled4] = useState(false);

  return (
    <CustomLayout
      Customchildren={
        <Studentcard
          name={'Ayman Mongal'}
          id={'KKBK1211'}
          activityrequired
          activity={`Pre-school gymnastics(Age1-3)`}
          subactivity={'Childhood Joy Classes'}
          classname={'Childhood Joy Classes'}
        />
      }
      steps
      start={4}
      end={7}
      header
      headertext={`Provide ${'\n'}Consent`}
      headertextStyle={{
        fontFamily: 'Nunito-SemiBold',
        fontSize: 33,
      }}
      backbutton={() => props.navigation.goBack()}
      Customchildren2={<ProgressTracker percent={4} />}>
      <Conset
        conset={'Does your child have any allergies we should be aware of'}
        value={isEnabled}
        onValueChange={() => setIsEnabled(!isEnabled)}
      />
      {isEnabled && (
        <View style={styles.textarea}>
          <TextInput
            placeholder="Allergy details..."
            placeholderTextColor={colors.grey}
          />
        </View>
      )}

      <Conset
        conset={'Does your child have any conditions we should be aware of'}
        value={isEnabled2}
        onValueChange={() => setIsEnabled2(!isEnabled2)}
      />
      {isEnabled2 && (
        <View style={styles.textarea}>
          <TextInput
            placeholder="Condition details..."
            placeholderTextColor={colors.grey}
          />
        </View>
      )}
      <View style={styles.remark}>
        <View style={styles.mark}>
          <Image source={require('../../assets/images/icon-info.png')} />
        </View>
        <Text style={styles.marktext}>Zippy’s is the Business Trade Name</Text>
      </View>
      <Conset
        conset={'Does your child have any allergies we should be aware of'}
        value={isEnabled3}
        onValueChange={() => setIsEnabled3(!isEnabled3)}
      />
      {isEnabled3 && (
        <View style={styles.textarea}>
          <TextInput
            placeholder="Allergy details..."
            placeholderTextColor={colors.grey}
          />
        </View>
      )}
      <Conset
        conset={
          'I do consent to my child to be photographed for any purpose, Signed by Jube Bowman(Parent / Carer)'
        }
        value={isEnabled4}
        onValueChange={() => setIsEnabled4(!isEnabled4)}
      />
      {isEnabled4 && (
        <View style={styles.textarea}>
          <TextInput
            placeholder="I do consent to my child to be photographed for any purpose"
            placeholderTextColor={colors.grey}
            style={{width: wp('85%')}}
            multiline={true}
          />
        </View>
      )}
      <Forwardbutton
        style={{alignSelf: 'flex-end', marginTop: hp('1%')}}
        onPress={() => props.navigation.navigate('Additional_Sections')}
      />
    </CustomLayout>
  );
};

const Conset = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.consettext}>{props.conset}</Text>
      <Switch
        trackColor={{false: '#767577', true: colors.pumpkinorange}}
        thumbColor={props.value ? colors.orange : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={props.onValueChange}
        value={props.value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: hp('1.5%'),
    justifyContent: 'space-between',
  },
  consettext: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: wp('3.5%'),
    width: wp('80%'),
  },
  textarea: {
    borderWidth: 1,
    borderColor: colors.lightgrey,
    borderRadius: 10,
    height: hp('10%'),
    paddingLeft: wp('2%'),
    paddingTop: hp('.1%'),
  },
  remark: {
    borderRadius: 10,
    height: hp('12%'),
    paddingLeft: wp('2%'),
    paddingTop: hp('.1%'),
    flexDirection: 'row',
    backgroundColor: '#fff2e6',
    marginVertical: hp('1%'),
  },
  mark: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('3%'),
    width: hp('3%'),
    marginRight: wp('2%'),
  },
  marktext: {
    color: '#d26800',
    alignSelf: 'center',
    flex: 1,
    fontSize: wp('3.5'),
    fontFamily: 'Nunito-Regular',
  },
});

export default Provide_Consent;
