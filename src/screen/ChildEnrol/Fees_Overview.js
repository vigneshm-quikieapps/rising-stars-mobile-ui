import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CustomLayout from '../../custom/CustomLayout';
import Studentcard from '../../custom/Studentcard';
import ProgressTracker from '../../custom/ProgressTracker';
import {colors, Fontsize, hp, wp} from '../../Constant/Constant';
import {RadioButton} from 'react-native-paper';
import Forwardbutton from '../../custom/Forwardbutton';

const Fees_Overview = props => {
  return (
    <CustomLayout
      Customchildren={
        <Studentcard
          name={'Ayman Mogal'}
          id={'4'}
          activityrequired
          activity={`Zippy Totz Pre-school Gymnastics`}
          subactivity={'Childhood Joy Classes'}
        />
      }
      steps
      start={3}
      end={7}
      header
      headerTextBigText={true}
      headertext={'Fees Overview'}
      backbutton={() => props.navigation.goBack()}
      Customchildren2={<ProgressTracker percent={3} />}
      >
      <Text style={{fontFamily: 'Nunito-SemiBold'}}>Fee Breakdown</Text>
      <Amount head={'Club Membership'} body={'Annual'} currency={'6'} />
      <View style={{flex: 1, borderWidth: 1, borderColor: colors.lightgrey}} />
      <Amount head={'Pre School Gym Class'} body={'Monthly'} currency={'25'} />
      <View style={{flex: 1, borderWidth: 1, borderColor: colors.lightgrey}} />
      {/* <Text style={styles.optional}>Optional</Text> */}
      <Amount
        head={`Scottish Gymnastics ${'\n'}Insuarance Premiun`}
        body={'Annual'}
        currency={'13'}
      />

      {/* <View style={styles.bottom}>
                <View style={{ flexDirection: 'row' }}>
                    <RadioButton />
                    <View>
                        <Text style={styles.head}>Scottish Gymnastics {'\n'}Insuarance Premiun</Text>
                        <Text style={styles.body}>Annual</Text>
                    </View>
                </View>
                <Text style={styles.curreny}>£13</Text>
            </View> */}
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
