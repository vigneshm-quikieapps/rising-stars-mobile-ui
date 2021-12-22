import React, {useEffect, useState, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getLocalData} from '../../utils/LocalStorage';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import moment from 'moment';
import {colors, Fontsize, hp, Images, wp} from '../../constants';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import {WheelDropdown, ClassCard} from '../../components';
import {WheelPicker} from 'react-native-wheel-picker-android';
import {getmemberClass, getmemberData} from '../../redux/action/home';
const Home = () => {
  const dispatch = useDispatch();

  const [user, setUser] = useState('');
  const [currentMemberIndex, setCurrentMemberIndex] = useState(0);
  const [memberModal, setMemberModal] = useState(false);
  const [wheelitem, setItem] = useState(0);
  const [token, setToken] = useState('');
  const [activeDotIndex, setActiveDotIndex] = React.useState(0);

  const membersdata = useSelector(state => state.memberData.memberData);
  const memberClassData = useSelector(state => state.memberClassData.classData);
  const accessToken = async () => {
    const Token = await getLocalData('accessToken');
    setToken(Token);
  };
  console.log('Token from Home: ', token);
  console.log('Member Class Data From Home: ', memberClassData);
  console.log('Member Data from Home', membersdata);
  const members = [];
  membersdata && membersdata.forEach((item, index) => (item.index = index));
  membersdata && membersdata.map(item => members.push(item.name));
  const [currentMember, setCurrentMember] = useState('');

  const getLocalUserData = useCallback(async () => {
    const userData = await getLocalData('user', true);
    setUser(userData);
  }, []);

  const wheelselected = item => {
    setItem(item);
  };

  const pagination = () => {
    return (
      <Pagination
        dotsLength={memberClassData.length}
        activeDotIndex={activeDotIndex}
        containerStyle={{paddingVertical: 0}}
        dotStyle={{
          width: wp('2.5%'),
          height: wp('1.5%'),
          borderRadius: wp('5%'),
          marginHorizontal: -wp('2%'),
          backgroundColor: colors.white,
        }}
        inactiveDotStyle={{
          // Define styles for inactive dots here
          backgroundColor: colors.white,
          width: wp('3%'),
          height: wp('3%'),
          borderRadius: wp('2%'),
        }}
        inactiveDotOpacity={0.5}
        inactiveDotScale={0.5}
      />
    );
  };

  //   useEffect(() => {
  //     getLocalUserData();
  //   }, [getLocalUserData]);

  useEffect(() => {
    console.log('inside Use Effect');
    getLocalUserData();
    accessToken();
    dispatch(getmemberData(token));
    membersdata && setCurrentMember(membersdata[currentMemberIndex]);
    membersdata && dispatch(getmemberClass(currentMember._id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, currentMember]);

  const renderItem = ({item, index}) => {
    return (
      <ClassCard
        id={item.clubMembershipId}
        className={item.class.name}
        subtitle={item.business.name}
        day={item.session.pattern[0].day}
        time={`${moment(item.session.pattern[0].startTime).format(
          'HH:SS',
        )} -${moment(item.session.pattern[0].endTime).format('HH:SS')} `}
        facility={item.session.facility}
        coach={'-- --'}
        style={{backgroundColor: 'white', borderRadius: 20}}
      />
    );
  };

  return (
    <ScrollView style={{backgroundColor: colors.white}}>
      <StatusBar backgroundColor="rgb(255,163,0)" />
      <View style={styles.container}>
        <LinearGradient
          colors={[colors.orangeYellow, colors.pumpkinOrange]}
          style={styles.linearGradient}>
          <Text style={styles.welcome}>{`Hi ${user.name}, your child`}</Text>
          <View style={styles.containerMember}>
            <View style={{marginTop: hp('1%')}}>
              <Image
                style={{
                  height: 57,
                  width: 57,
                  borderRadius: 20,
                  borderWidth: 2,
                  borderColor: 'white',
                }}
                source={Images.Child}
              />
            </View>
            <View style={{marginLeft: 10, justifyContent: 'center'}}>
              <Text style={styles.memberName}>{currentMember?.name}</Text>
            </View>
            <View style={{flex: 1}} />
            {membersdata && membersdata.length > 1 ? (
              <TouchableOpacity onPress={() => setMemberModal(!memberModal)}>
                <LinearGradient
                  colors={['#fcb12b', '#e6780e']}
                  style={{
                    marginRight: 20,
                    height: 32,
                    width: 32,
                    borderRadius: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{height: 14, width: 18}}
                    source={Images.dropDown_white}
                  />
                </LinearGradient>
              </TouchableOpacity>
            ) : null}
          </View>
          <WheelDropdown
            title="child"
            visible={memberModal}
            setVisibility={modal => setMemberModal(modal)}
            cancel={() => setMemberModal(false)}
            confirm={() => {
              setCurrentMemberIndex(wheelitem);
              setCurrentMember(membersdata[wheelitem]);
              console.log('CURRENT: ', currentMember);
              dispatch(getmemberClass(currentMember._id));
              setMemberModal(false);
            }}>
            <View
              style={{
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: wp('8%'),
              }}>
              <WheelPicker
                data={members}
                isCyclic={true}
                onItemSelected={wheelselected}
                selectedItemTextColor={'black'}
                selectedItemTextSize={Fontsize}
                itemTextFontFamily="Nunito-Regular"
                selectedItemTextFontFamily="Nunito-Regular"
              />
            </View>
          </WheelDropdown>
          <View style={styles.courosoul}></View>
          <Carousel
            data={memberClassData}
            renderItem={renderItem}
            sliderWidth={wp('95%')}
            itemWidth={wp('90%')}
            onSnapToItem={index => {
              setActiveDotIndex(index);
            }}
          />
          <View
            style={{
              paddingVertical: hp('0.8%'),
              width: wp('90%'),
              alignItems: 'center',
            }}>
            {pagination()}
          </View>
        </LinearGradient>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:colors.white
  },
  linearGradient: {
    paddingTop: hp('2%'),
    paddingLeft: wp('4%'),
    paddingBottom: hp('3%'),
    borderBottomLeftRadius: wp('5.5%'),
    borderBottomRightRadius: wp('5.5%'),
  },
  containerMember: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  welcome: {
    fontSize: Fontsize,
    color: 'white',
    fontFamily: 'Nunito-SemiBold',
    opacity: 0.9,
  },
  memberName: {
    color: colors.white,
    fontSize: wp('6%'),
    fontFamily: 'Nunito-SemiBold',
  },
  memberID: {
    color: colors.white,
    fontSize: wp('2%'),
    fontFamily: 'Nunito-SemiBold',
  },
  courosoul: {
    marginTop: hp('1%'),
  },

  reports: {
    marginTop: hp('3.5%'),
    marginHorizontal: wp('5%'),
    borderRadius: wp('5%'),
    backgroundColor: colors.white,
    padding: hp('2%'),
    elevation: 10,
    shadowColor: '#52006A',
  },
  containerTotalClasses: {
    width: wp('35%'),
    height: hp('9%'),
    marginLeft: wp('2%'),
    flexDirection: 'row',
    backgroundColor: colors.veryLightPink,
    borderRadius: wp('4%'),
    marginBottom: hp('3%'),
  },
  activityProgress: {
    marginTop: hp('3%'),
    marginLeft: wp('3.5%'),
  },
  activityProgressTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attendance: {
    marginTop: hp('3%'),
    marginLeft: wp('5%'),
    flexDirection: 'row',
    alignItems: 'center',
  },
  ProgressReports: {
    marginTop: hp('3%'),
    marginHorizontal: wp('5%'),
    borderTopLeftRadius: wp('5%'),
    borderTopRightRadius: wp('5%'),
    backgroundColor: colors.white,
    paddingLeft: wp('5%'),
    borderBottomColor: 'rgb(227,227,227)',
    borderBottomWidth: wp('1%'),
    elevation: 10,
    shadowColor: '#52006A',
  },
});

export default Home;
