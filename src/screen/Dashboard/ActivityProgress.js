/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {colors, Images, Fontsize, hp, wp} from '../../constants';
import Carousel from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import {WheelPicker} from 'react-native-wheel-picker-android';

import {ProgressBarWithStar, Timelines, WheelDropdown} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {getmemberClass, getmemberData} from '../../redux/action/home';
import * as Action from '../../redux/action-types';
import {getLocalData} from '../../utils/LocalStorage';
import {
  //fetchAttendanceOfMemberInSession,
  fetchProgress,
} from '../../redux/service/request';
import {currentMemberData} from '../../redux/reducer/home';
const ActivityProgress = () => {
  const itemWidth = Dimensions.get('window').width;
  const membersdata = useSelector(state => state.memberData.memberData);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [wheelitem, setItem] = useState(0);
  const [currentMember, setCurrentMember] = useState('');
  const memberClassData = useSelector(state => state.memberClassData.classData);
  const memberActivityProgress = useSelector(
    state => state.currentMemberActivity.activity,
  );
  const [user, setUser] = useState('');
  const [token, setToken] = useState();
  const [progress, setProgress] = useState();
  const [currentMemberIndex, setCurrentMemberIndex] = useState(0);
  const [currentSessionId, setCurrentSessionId] = useState('');
  const [activeDotIndex, setActiveDotIndex] = React.useState(0);
  //const [currentSessionAttendance, setCurrentSessionAttendance] = useState('');

  var member = [];
  const accessToken = async () => {
    const Token = await getLocalData('accessToken');
    setToken(Token);
  };

  const getLocalUserData = useCallback(async () => {
    const userData = await getLocalData('user', true);
    setUser(userData);
  }, []);

  membersdata && membersdata.map(item => member.push(item.name));

  accessToken();

  useEffect(() => {
    setProgress(memberActivityProgress);
  }, [memberActivityProgress]);

  useEffect(() => {
    getLocalUserData();

    token && dispatch(getmemberData(token));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  useEffect(() => {
    membersdata && setCurrentMember(membersdata[currentMemberIndex]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [membersdata]);
  useEffect(() => {
    currentMember && dispatch(getmemberClass(currentMember._id));

    currentMember &&
      dispatch({
        type: Action.USER_GET_CURRENT_MEMBER_DATA,
        payload: currentMember,
      });
    console.log(currentMember._id, token);
    currentMember &&
      token &&
      dispatch({
        type: Action.USER_GET_CURRENT_MEMBER_ACTIVITY,
        payload: {id: currentMember._id, token: token},
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMember]);
  useEffect(() => {
    memberClassData.length > 1 &&
      setCurrentSessionId(
        memberClassData?.filter(item => item?.enrolledStatus === 'ENROLLED')[
          activeDotIndex
        ].session._id,
      );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberClassData]);
  const renderItem = ({item, index}) => {
    return (
      <LinearGradient
        colors={['#ffa300', '#ff7e00']}
        style={{
          width: '100%',
          paddingVertical: 30,
          paddingHorizontal: 20,
          paddingTop: 24,
          paddingBottom: 20,
          backgroundColor: colors.white,
          borderRadius: 16,
        }}>
        <Text
          style={{
            fontSize: 16,
            color: colors.white,
            fontFamily: 'Nunito-Regular',
          }}>
          Class Name
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: colors.white,
            fontFamily: 'Nunito-SemiBold',
          }}>
          {item.class.name}
        </Text>
      </LinearGradient>
    );
  };
  return (
    <ScrollView style={styles.container}>
      <View style={{marginTop: 30}}>
        <Text style={{fontSize: 34, fontFamily: 'Nunito-SemiBold'}}>
          Progress
        </Text>
      </View>

      <View style={{marginTop: 4, flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{fontSize: 18, fontFamily: 'Nunito-SemiBold'}}>
          {currentMember.name}
        </Text>

        <TouchableOpacity onPress={() => setShowModal(true)}>
          <View
            style={{
              backgroundColor: '#ffe49c',
              marginLeft: 6,
              marginRight: 20,
              height: 32,
              width: 32,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{height: 14, width: 18}}
              source={require('../../assets/images/icon-forward2-line-black.png')}
            />
          </View>
        </TouchableOpacity>
      </View>
      <WheelDropdown
        title="child"
        visible={showModal}
        setVisibility={modal => setShowModal(modal)}
        cancel={() => setShowModal(false)}
        confirm={() => {
          setCurrentMemberIndex(wheelitem);

          setCurrentMember(membersdata[wheelitem]);

          setShowModal(false);
        }}>
        <View
          style={{
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: wp('8%'),
            marginBottom: -hp('3%'),
          }}>
          <WheelPicker
            data={member}
            isCyclic={true}
            onItemSelected={item => setItem(item)}
            selectedItemTextColor={'black'}
            selectedItemTextSize={Fontsize}
            selectedItem={wheelitem}
            itemTextFontFamily="Nunito-Regular"
            selectedItemTextFontFamily="Nunito-Regular"
          />
        </View>
      </WheelDropdown>

      <View style={{marginTop: 14}}>
        {memberClassData.length > 0 ? (
          <Carousel
            style={{width: 350}}
            layout={'default'}
            data={
              memberClassData &&
              memberClassData?.filter(
                item => item?.enrolledStatus === 'ENROLLED',
              )
            }
            sliderWidth={itemWidth - 30}
            itemWidth={itemWidth * 0.88}
            renderItem={renderItem}
            onSnapToItem={async index => {
              setProgress('');
              setActiveDotIndex(index);
              setCurrentSessionId(
                memberClassData &&
                  memberClassData?.filter(
                    item => item?.enrolledStatus === 'ENROLLED',
                  )[index].session._id,
              );
              // const attendance =
              //   currentSessionId &&
              //   (await fetchAttendanceOfMemberInSession({
              //     token,
              //     data: {
              //       sessionId: currentSessionId,
              //       memberId: currentMember._id,
              //     },
              //   }));
              // setCurrentSessionAttendance(attendance.attendance);
            }}
          />
        ) : (
          <View
            style={{
              backgroundColor: colors.orange,
              borderRadius: 20,
              alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              height: hp('15%'),
              marginRight: wp('3%'),
            }}>
            <TouchableOpacity>
              <Text style={{fontSize: wp('6%'), color: 'white'}}>
                Please add a Class
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={{marginTop: 30, marginRight: 20}}>
        <ProgressBarWithStar />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginRight: 20,
        }}>
        <Text style={{fontSize: wp('3.5%'), fontFamily: 'Nunito-Regular'}}>
          Start
        </Text>
        <Text style={{fontSize: wp('3.5%'), fontFamily: 'Nunito-Regular'}}>
          In Progress
        </Text>
        <Text style={{fontSize: wp('3.5%'), fontFamily: 'Nunito-Regular'}}>
          Finish
        </Text>
      </View>

      <View style={{marginTop: 10, paddingVertical: 20}}>
        <Timelines />
      </View>
    </ScrollView>
  );
};

export default ActivityProgress;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingLeft: 20,
  },
});
