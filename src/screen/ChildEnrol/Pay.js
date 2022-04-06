/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  CustomLayout,
  StudentCard,
  ProgressTracker,
  ForwardButton,
  AtmCard,
} from '../../components';
import * as Action from '../../redux/action-types';

import {colors, Fontsize, hp, Stepend, wp} from '../../constants';
import {ActivityIndicator, RadioButton} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {enrollChildData} from '../../redux/action/enrol';
import {getLocalData} from '../../utils/LocalStorage';
import StandingOrder from '../../components/standing-order';
import {FlatList} from 'react-native-gesture-handler';

const Pay = props => {
  const child = useSelector(state => state.childData.addchild);
  const slot = useSelector(state => state.childData.slotdata);
  const club = useSelector(state => state.childData.clubdata);
  const clubfinance = useSelector(
    state => state.clubfinance.financedata.businessFinance,
  );
  const classes = useSelector(state => state.childData.classdata);
  const addData = useSelector(state => state.addAdditionaldata.additionalData);
  const consent = useSelector(state => state.addProvidedata);
  const [showAtm, setShowAtm] = useState(false);
  const [showStandingOrder, setShowStandingOrder] = useState(false);
  const [standingOrderValue, setStandingOrderValue] = useState(0);
  const {from} = props.route.params;

  // console.log('pay', from);
  const [totalAmt, setTotalAmt] = useState(0);

  useEffect(() => {
    dispatch({type: Action.USER_GET_CLUB_FINANCE, payload: club._id});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    classes && classes.charges.length > 0
      ? classes.charges.forEach(element => {
          setTotalAmt(totalAmt + element.amount);
        })
      : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classes]);
  const dispatch = useDispatch();

  const isStandingOrderHandler = value => {
    // if (value === 1) {
    //   setStandingOrderValue(false);
    // } else if (value === 2) {
    //   setStandingOrderValue(true);
    // }
    setStandingOrderValue(value);
  };

  const handleforward = async () => {
    console.log(
      'Details: ',
      slot._id,
      child.member._id,
      await getLocalData('accessToken'),
    );
    var data = {
      sessionId: slot._id,
      memberId: child.member._id,
      newsletter: {
        email: addData.email,
        telephone: addData.telephone,
        sms: addData.sms,
      },
      isStandingOrder:
        standingOrderValue === 1
          ? true
          : standingOrderValue === 2
          ? false
          : null,
      consent: {},
    };
    consent.allergie !== '' ? (data.consent.allergie = consent.allergie) : null;
    consent.condition !== ''
      ? (data.consent.condition = consent.condition)
      : null;
    consent.photograhConsent !== ''
      ? (data.consent.photograhConsent = consent.photograhConsent)
      : null;
    consent.signedByParent !== ''
      ? (data.consent.signedByParent = consent.signedByParent)
      : null;

    dispatch(
      enrollChildData({
        data,
        token: await getLocalData('accessToken'),
      }),
    );
    props.navigation.navigate('Confirmation', {from: from});
  };
  return (
    <CustomLayout
      Customchildren={
        <StudentCard
          name={child.member.name}
          age={
            new Date().getFullYear() - parseInt(child.member.dob.slice(0, 4))
          }
          // id={child.member._id}
          // activityrequired
          // activity={club.name}
          // subactivity={'Childhood Joy Classes'}
        />
      }
      steps
      start={5}
      end={Stepend}
      header
      headerTextBigText={true}
      headertext={'Pay'}
      back
      backbutton={() => props.navigation.goBack()}
      Customchildren2={<ProgressTracker percent={6} />}>
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
            {/* <View
              style={{flex: 1, borderWidth: 1, borderColor: colors.lightgrey}}
            /> */}
          </>
        )}
      />
      <Amount
        head={'Total Payable'}
        stylehead={{fontSize: wp('5%')}}
        currency={totalAmt}
        stylecurrency={{fontSize: wp('7%s')}}
      />
      <View style={styles.breaks} />
      <Text style={styles.optional}>Payment Options</Text>
      {!clubfinance ? (
        <ActivityIndicator size="small" color={colors.orange} />
      ) : null}
      {clubfinance && clubfinance.paymentChannels.manual === true ? (
        <StandingOrder
          onPress={() => {
            setShowAtm(false);
            setShowStandingOrder(!showStandingOrder);
          }}
          isStandingOrderHandler={isStandingOrderHandler}
          visible={showStandingOrder}
        />
      ) : null}
      {clubfinance && clubfinance.paymentChannels.online === true ? (
        <>
          <AtmCard
            onPress={() => {
              setShowAtm(!showAtm);
              setShowStandingOrder(false);
            }}
            visible={showAtm}
          />
          <View style={styles.bottom}>
            <RadioButton color={colors.orange} />
            <Text
              style={{
                fontFamily: 'Nunito-SemiBold',
                fontSize: wp('5%'),
                marginLeft: wp('4%'),
              }}>
              Net Banking
            </Text>
          </View>
          <View style={styles.bottom}>
            <RadioButton color={colors.orange} />
            <Text
              style={{
                fontFamily: 'Nunito-SemiBold',
                fontSize: wp('5%'),
                marginLeft: wp('4%'),
              }}>
              Wallets
            </Text>
          </View>
        </>
      ) : null}
      {showStandingOrder && standingOrderValue !== 0 && (
        <ForwardButton
          style={{alignSelf: 'flex-end', marginTop: hp('2%')}}
          onPress={() => handleforward()}
        />
      )}
    </CustomLayout>
  );
};

const Amount = props => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={[styles.head, props.stylehead]}>
          {props.head}
          {props.body && (
            <>
              <Text> (</Text>
              <Text>{props.body}</Text>
              <Text>)</Text>
            </>
          )}
        </Text>
        {/* <Text style={[styles.body, props.stylebody]}></Text> */}
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
    fontSize: Fontsize,
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
    fontSize: Fontsize,
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
    paddingLeft: wp('4%'),
  },
});

export default Pay;
