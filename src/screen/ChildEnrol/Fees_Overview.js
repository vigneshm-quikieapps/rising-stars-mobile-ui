import React,{useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import CustomLayout from '../../custom/CustomLayout';
import Studentcard from '../../custom/Studentcard';
import ProgressTracker from '../../custom/ProgressTracker';
import {colors, Fontsize, hp, wp,Stepend} from '../../Constant/Constant';
import Forwardbutton from '../../custom/Forwardbutton';

import { useSelector, useDispatch } from 'react-redux'

const Fees_Overview = props => {
  const dispatch = useDispatch()
  // const fullName = useSelector(state => state.childData.fullName)
  // const age = useSelector(state => state.childData.age)
  const child = useSelector(state => state.childData.addchild)
  const club = useSelector(state => state.childData.clubdata)
  const classes = useSelector(state => state.childData.classdata)
  console.log('classes  :', classes );
  const clubfinance = useSelector(state => state.clubfinance.financedata)

  return (
    <CustomLayout
      Customchildren={
        <Studentcard
          name={child.fullName}
          id={child.age}
          activityrequired
          activity={club.name}
          // subactivity={'Childhood Joy Classes'}
        />
      }
      steps
      start={3}
      end={Stepend}
      header
      headerTextBigText={true}
      headertext={'Fees Overview'}
      backbutton={() => props.navigation.goBack()}
      Customchildren2={<ProgressTracker percent={3} />}
      >
      <Text style={{fontFamily: 'Nunito-SemiBold',fontSize:wp('6%')}}>Fee Breakdown</Text>
      <Amount head={'Club Membership'} body={'Annual'} currency={clubfinance && clubfinance.length > 0 ? clubfinance.businessFinance[0].charges[0].amount :'0'} />
      <View style={{flex: 1, borderWidth: 1, borderColor: colors.lightgrey}} />
      <Amount head={'Pre School Gym Class'} body={'Monthly'} currency={classes.charges[0].amount} />
      <View style={{flex: 1, borderWidth: 1, borderColor: colors.lightgrey}} />
      <Amount
        head={`Scottish Gymnastics ${'\n'}Insuarance Premiun`}
        body={'Annual'}
        currency={'13'}
      />
      <View style={{marginVertical: hp('1.8%')}} />
      <Forwardbutton
        style={{alignSelf: 'flex-end', marginTop: hp('-1.7%')}}
        onPress={() => props.navigation.navigate('Provide_Consent')}
      />
    </CustomLayout>
  );
};
const Amount = props => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.head}>{props.head}</Text>
        <Text style={styles.body}>{props.body}</Text>
      </View>
      <Text style={styles.curreny}>£{props.currency}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: hp('3.2%'),
    justifyContent: 'space-between',
  },
  head: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: Fontsize,
    // fontWeight: 'bold',
  },
  body: {
    fontFamily: 'Nunito-SemiBold',
    color: colors.grey,
  },
  curreny: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: wp('7%'),
    // fontWeight: 'bold',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optional: {
    marginVertical: hp('2%'),
    marginLeft: hp('4.2%'),
    color: colors.grey,
  },
});

export default Fees_Overview;
