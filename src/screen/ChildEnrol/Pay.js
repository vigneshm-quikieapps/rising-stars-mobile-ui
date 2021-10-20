import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CustomLayout from '../../custom/CustomLayout';
import Studentcard from '../../custom/Studentcard';
import ProgressTracker from '../../custom/ProgressTracker';
import {colors, Fontsize, hp, Stepend, wp} from '../../Constant/Constant';
import {RadioButton} from 'react-native-paper';
import Forwardbutton from '../../custom/Forwardbutton';
import Atmcard from '../../custom/AtmCard';
import { useSelector, useDispatch } from 'react-redux'

const Pay = props => {
  const fullName = useSelector(state => state.childData.fullName)
  const age = useSelector(state => state.childData.age)
  return (
    <CustomLayout
      Customchildren={
        <Studentcard
        name={fullName}
          id={age}
          activityrequired
          activity={`Zippy Totz Pre-school Gymnastics`}
          subactivity={'Childhood Joy Classes'}
          // classname={'Childhood Joy Classes'}
        />
      }
      steps
      start={5}
      end={Stepend}
      header
      headerTextBigText={true}
      headertext={'Pay'}
      backbutton={() => props.navigation.goBack()}
      Customchildren2={<ProgressTracker percent={6} />}
      >
      <Amount head={'Club Membership'} currency={'6'} />
      <Amount head={`Pre School Gym Class${'\n'}(Monthly)`} currency={'25'} />
      <Amount
        head={'Scottish Gymnastics Insuarance Premium (Annual)'}
        currency={'25'}
      />
      <Amount
        head={'Total Payable'}
        stylehead={{fontSize: wp('5%')}}
        currency={'123'}
        stylecurrency={{fontSize: wp('7%s')}}
      />
      <View style={styles.breaks} />
      <Text style={styles.optional}>Payment Options</Text>
      <Atmcard />
      <View style={styles.bottom}>
        <RadioButton />
        <Text
          style={{
            fontFamily: 'Nunito-SemiBold',
            fontSize: wp('5%'),
          }}>
          Net Banking
        </Text>
      </View>
      <View style={styles.bottom}>
        <RadioButton />
        <Text
          style={{
            fontFamily: 'Nunito-SemiBold',
            fontSize: wp('5%'),
          }}>
          Wallets
        </Text>
      </View>
      <Forwardbutton
        style={{alignSelf: 'flex-end', marginTop: hp('2%')}}
        onPress={() => props.navigation.navigate('Confirmation')}
      />
    </CustomLayout>
  );
};

const Amount = props => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={[styles.head, props.stylehead]}>{props.head}</Text>
        <Text style={[styles.body, props.stylebody]}>{props.body}</Text>
      </View>
      <Text style={[styles.currency, props.stylecurrency]}>
        £{props.currency}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  head: {
    fontFamily: 'Nunito-SemiBold',
    fontSize:Fontsize,
    width: wp('65%'),
  },
  body: {
    fontFamily: 'Nunito-SemiBold',
    color: colors.grey,
  },
  currency: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: Fontsize,
  },
  optional: {
    fontFamily: 'Nunito-SemiBold',
    marginTop: hp('1%'),
    fontSize:Fontsize,
    marginVertical: hp('1%'),
  },
  breaks: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.lightgrey,
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    height: hp('10%'),
    borderRadius: 15,
    padding: wp('2%'),
    marginTop: hp('2%'),
    backgroundColor: '#f2f2f2',
  },
});

export default Pay;
