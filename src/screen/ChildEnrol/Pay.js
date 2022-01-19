/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  CustomLayout,
  StudentCard,
  ProgressTracker,
  ForwardButton,
  AtmCard,
} from '../../components';
import {colors, Fontsize, hp, Stepend, wp} from '../../constants';
import {RadioButton} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {enrollChildData} from '../../redux/action/enrol';
import {getLocalData} from '../../utils/LocalStorage';
import StandingOrder from '../../components/standing-order';

const Pay = props => {
  const child = useSelector(state => state.childData.addchild);
  const slot = useSelector(state => state.childData.slotdata);
  const club = useSelector(state => state.childData.clubdata);
  const [showAtm, setShowAtm] = useState(false);
  const [showStandingOrder, setShowStandingOrder] = useState(false);

  const dispatch = useDispatch();
  const handleforward = async () => {
    console.log(
      'Details: ',
      slot._id,
      child.member._id,
      await getLocalData('accessToken'),
    );
    //{"message": "Bill validation failed: subtotal: Path `subtotal` is required., total: Path `total` is required., items.0.amount: Path `amount` is required."}
    dispatch(
      enrollChildData({
        data: {
          sessionId: slot._id,
          memberId: child.member._id,
          newsletter: {
            email: 'false',
            telephone: 'false',
            sms: 'false',
          },
        },
        token: await getLocalData('accessToken'),
      }),
    );
    props.navigation.navigate('Confirmation');
  };
  return (
    <CustomLayout
      Customchildren={
        <StudentCard
          name={child.member.name}
          id={child.member._id}
          activityrequired
          activity={club.name}
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
      Customchildren2={<ProgressTracker percent={6} />}>
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
      <StandingOrder
        onPress={() => {
          setShowAtm(false);
          setShowStandingOrder(!showStandingOrder);
        }}
        visible={showStandingOrder}
      />
      <AtmCard
        onPress={() => {
          setShowAtm(!showAtm);
          setShowStandingOrder(false);
        }}
        visible={showAtm}
      />
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
      <ForwardButton
        style={{alignSelf: 'flex-end', marginTop: hp('2%')}}
        onPress={() => handleforward()}
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
  },
});

export default Pay;
