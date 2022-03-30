/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Text, View, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as Action from '../../redux/action-types';
import {CustomLayout, ClassCard, AppButton} from '../../components';
import Alert from '../../components/alert-box';
import {colors, Fontsize, hp, wp} from '../../constants';
import {getClubdata, getSessiondata} from '../../redux/action/enrol';
import {dropClass} from '../../redux/service/request';
import {getLocalData} from '../../utils/LocalStorage';
import Carousel from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

export default function EnrolledChild(props) {
  // const [modalVisible, setModalVisible] = useState(false);
  // const [modalVisible2, setModalVisible2] = useState(false);
  // const [modalVisible3, setModalVisible3] = useState(false);
  // const [modalVisible4, setModalVisible4] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showFailureAlert, setShowFailureAlert] = useState(false);
  const [enrollmentId, setEnrollmentId] = useState('');
  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const [groupedData, setGroupedData] = useState('');
  const [businessList, setBusinessList] = useState('');

  const [token, setToken] = useState('');
  const dispatch = useDispatch();
  const {from} = props.route.params;

  const memberClassData = useSelector(state => state.memberClassData.classData);
  const currentMember = useSelector(state => state.currentMemberData.data);

  const renderItem = item => {
    var temp =
      memberClassData &&
      memberClassData?.filter(item1 => item1.business._id === item.item.id);
    return (
      <LinearGradient
        style={{
          height: hp('20%'),
          borderRadius: 20,
          marginTop: hp('5%'),
        }}
        colors={['#ffa300', '#ff7e00']}>
        <View
          style={{
            marginHorizontal: wp('4%'),
            marginTop: hp('2%'),
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: wp('5%'),
          }}>
          <View>
            <Text style={{color: '#f7cf79', fontSize: Fontsize}}>
              Child Name
            </Text>
            <Text
              style={{
                color: colors.white,
                fontSize: Fontsize + wp('1%'),
                //fontWeight: 'bold',
              }}>
              {currentMember.name}
            </Text>
            <Text
              style={{
                color: '#f7cf79',
                fontSize: Fontsize,
                paddingTop: hp('1.5%'),
              }}>
              Club Name
            </Text>
            <Text
              style={{
                color: colors.white,
                fontSize: Fontsize + wp('1%'),
                //fontWeight: 'bold',
              }}>
              {temp[0].business.name}
            </Text>
          </View>
          <View>
            <Text style={{color: '#f7cf79', fontSize: Fontsize}}>
              Child's Club ID
            </Text>
            <Text
              style={{
                color: colors.white,
                fontSize: Fontsize + wp('1%'),
                //fontWeight: 'bold',
              }}>
              {temp[0].clubMembershipId}
            </Text>
          </View>
        </View>
      </LinearGradient>
    );
  };
  const time = (start, end) => {
    var sHr =
      start.getHours().toString().length === 1
        ? '0' + start.getHours()
        : start.getHours();
    var sMin =
      start.getMinutes().toString().length === 1
        ? '0' + start.getMinutes()
        : start.getMinutes();
    var eHr =
      end.getHours().toString().length === 1
        ? '0' + end.getHours()
        : end.getHours();
    var eMin =
      end.getMinutes().toString().length === 1
        ? '0' + end.getMinutes()
        : end.getMinutes();
    return sHr + ':' + sMin + '-' + eHr + ':' + eMin;
  };
  const groupBy = objectArray => {
    let groupData = {};
    objectArray.forEach(element => {
      if (element.business._id in groupData) {
        groupData[element.business._id].push(element);
      } else {
        groupData[element.business._id] = [];
        groupData[element.business._id].push(element);
      }
    });
    return groupData;
  };
  useEffect(() => {
    setGroupedData(
      groupBy(
        memberClassData?.filter(item => item?.enrolledStatus === 'ENROLLED'),
      ),
    );
    var businesses = [];
    for (const [key, value] of Object.entries(groupedData)) {
      businesses.push({id: key});
    }
    setBusinessList(businesses);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberClassData]);
  const accessToken = async () => {
    const Token = await getLocalData('accessToken');
    setToken(Token);
  };

  useEffect(() => {
    accessToken();
  }, []);
  return (
    <CustomLayout
      names={'Enrolled Classes'}
      Customchildren={
        <Carousel
          data={businessList}
          renderItem={renderItem}
          sliderWidth={wp('95%')}
          itemWidth={wp('90%')}
          onSnapToItem={index => setActiveDotIndex(index)}
        />
      }
      back
      backbutton={() => props.navigation.goBack()}>
      <Text style={{fontFamily: 'Nunito-Regular', fontSize: Fontsize}}>
        Current Classes
      </Text>
      <FlatList
        data={
          memberClassData && businessList && businessList.length > 0
            ? memberClassData.filter(
                item =>
                  item.enrolledStatus === 'ENROLLED' &&
                  item.business._id === businessList[activeDotIndex].id,
              )
            : null
        }
        key={item => item._id}
        renderItem={classes => {
          //console.log('classes: ', classes.item);
          return (
            <ClassCard
              className={classes.item.class.name}
              title={'Change Session'}
              day={classes.item.session.pattern[0].day}
              time={
                classes.item.session && classes.item.session.pattern.length > 0
                  ? // time(
                    //   new Date(classes.item.session.pattern[0].startTime),
                    //   new Date(classes.item.session.pattern[0].endTime),
                    // )
                    `${moment(classes.item.session.pattern[0].startTime).format(
                      'hh:mm A',
                    )} - ${moment(
                      classes.item.session.pattern[0].endTime,
                    ).format('hh:mm A')}`
                  : null
              }
              facility={classes.item.session.facility}
              coach={classes.item.session.coachId.name}
              class
              classbutton={() => {
                dispatch(getSessiondata(classes.item.class._id));
                props.navigation.navigate('ChangeClass', {classes});
              }}
              member
              memberbutton={() => {
                setEnrollmentId(classes.item._id);
                setShowAlert(true);
              }}
            />
          );
        }}
      />
      <AppButton
        title={'New Class'}
        onPress={() => {
          dispatch({
            type: Action.USER_ADD_CHILD_SUCCEDED,
            payload: {member: currentMember},
          });
          dispatch(
            getClubdata({
              callback: () => {
                props.navigation.navigate('New_Class_Selection', {from: from});
              },
            }),
          );
        }}
      />
      {showAlert ? (
        <Alert
          visible={showAlert}
          confirm={'No, I have changed my mind'}
          failure={async () => {
            const response = await dropClass({
              token,
              enrollmentId,
            });

            if (response.message === 'Cancellation successful.') {
              setShowSuccessAlert(true);
            } else {
              setShowFailureAlert(true);
            }
          }}
          cancel={'Yes, cancel membership'}
          success={() => setShowAlert(false)}
          image={'failure'}
          message={'Are you sure you want to cancel the membership'}
        />
      ) : null}
      {showSuccessAlert ? (
        <Alert
          visible={showSuccessAlert}
          confirm={'Done'}
          success={() => props.navigation.navigate('Profile')}
          image={'success'}
          message={'Cancelled Membership Successfully'}
        />
      ) : null}
      {showFailureAlert ? (
        <Alert
          visible={showFailureAlert}
          confirm={'Go Back'}
          success={() => props.navigation.navigate('Profile')}
          image={'failure'}
          message={'OOPS!! Something Went Wrong!!'}
        />
      ) : null}
    </CustomLayout>
  );
}
