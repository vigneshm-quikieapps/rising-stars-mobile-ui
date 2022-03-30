import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {
  CustomLayout,
  StudentCard,
  ProgressTracker,
  ForwardButton,
} from '../../components';
import {colors, Fontsize, hp, wp, Stepend} from '../../constants';

import {useSelector} from 'react-redux';
import {FlatList} from 'react-native-gesture-handler';

const Fees_Overview = props => {
  //const dispatch = useDispatch();
  // const fullName = useSelector(state => state.childData.fullName)
  // const age = useSelector(state => state.childData.age)
  const child = useSelector(state => state.childData.addchild);
  const club = useSelector(state => state.childData.clubdata);
  const classes = useSelector(state => state.childData.classdata);
  const {from} = props.route.params;

  //console.log('classes', from);
  //const clubfinance = useSelector(state => state.clubfinance.financedata);

  return (
    <CustomLayout
      Customchildren={
        <StudentCard
          name={child.member.name}
          id={child.member._id}
          activityrequired
          activity={club.name}
          age={
            new Date().getFullYear() - parseInt(child.member.dob.slice(0, 4))
          }
          // subactivity={'Childhood Joy Classes'}
        />
      }
      steps
      start={3}
      end={Stepend}
      back
      header
      headerTextBigText={true}
      headertext={'Fees Overview'}
      backbutton={() => props.navigation.goBack()}
      Customchildren2={<ProgressTracker percent={3} />}>
      <Text style={{fontFamily: 'Nunito-SemiBold', fontSize: wp('6%')}}>
        Fee Breakdown
      </Text>
      <FlatList
        data={classes && classes.charges.length > 0 ? classes.charges : null}
        keyExtractor={item => item.id}
        renderItem={item => (
          <>
            <Amount
              head={item.item.name}
              body={item.item.payFrequency === 'MONTHLY' ? 'Monthly' : 'Annual'}
              currency={item.item.amount}
            />
            <View
              style={{flex: 1, borderWidth: 1, borderColor: colors.lightgrey}}
            />
          </>
        )}
      />
      {/* <Amount
        head={classes.charges[0].name}
        body={
          classes.charges[0].payFrequency === 'MONTHLY' ? 'Monthly' : 'Annual'
        }
        currency={classes.charges[0].amount}
      />
      <View style={{flex: 1, borderWidth: 1, borderColor: colors.lightgrey}} />
      <Amount
        head={classes.charges[1].name}
        body={
          classes.charges[1].payFrequency === 'MONTHLY' ? 'Monthly' : 'Annual'
        }
        currency={classes.charges[1].amount}
      />
      <View style={{flex: 1, borderWidth: 1, borderColor: colors.lightgrey}} />
      <Amount
        head={classes.charges[2].name}
        body={
          classes.charges[2].payFrequency === 'MONTHLY' ? 'Monthly' : 'Annual'
        }
        currency={classes.charges[2].amount}
      />
      <View style={{marginVertical: hp('1.8%')}} /> */}
      <ForwardButton
        style={{alignSelf: 'flex-end', marginTop: hp('-1.7%')}}
        onPress={() =>
          props.navigation.navigate('Provide_Consent', {from: from})
        }
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
