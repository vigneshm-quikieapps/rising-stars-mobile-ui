/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {colors, Fontsize, hp, wp} from '../../constants';
import Carousel from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import {WheelPicker} from 'react-native-wheel-picker-android';

import {ProgressBarWithStar, Timelines, WheelDropdown} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import * as Action from '../../redux/action-types';
const ActivityProgress = () => {
  const itemWidth = Dimensions.get('window').width;
  const membersdata = useSelector(state => state.memberData.memberData);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [wheelitem, setItem] = useState(0);
  const [currentMember, setCurrentMember] = useState('');
  const memberActivityProgress = useSelector(
    state => state.currentMemberActivity.activity,
  );
  const evaluationName = useSelector(
    state => state.evaluationData.evaluationData,
  );
  const businessName = useSelector(state => state.businessData.businessData);
  const [progress, setProgress] = useState();
  const [currentMemberIndex, setCurrentMemberIndex] = useState(0);
  const [currentBusinessId, setBusinessId] = useState('');
  const [currentEvaluationId, setcurrentEvaluationId] = useState('');
  const [activedotIndex, setactivedotIndex] = useState(0);
  var value;
  var member = [];
  var count = 0;

  membersdata && membersdata.map(item => member.push(item.name));

  useEffect(() => {
    setProgress(memberActivityProgress);
    progress && progress.docs.length > 0
      ? setBusinessId(progress.docs[0].businessId)
      : null;
    progress && progress.docs.length > 0
      ? setcurrentEvaluationId(progress.docs[0].evaluationSchemeId)
      : null;
    progress && progress.docs.length > 0
      ? progress.docs.levels.forEach(levels => {
          if (levels.status === 'AWARDED') {
            count += 1;
          } else if (levels.status === 'IN_PROGRESS') {
            count += 0.5;
          }
        })
      : null;
    if (count > 0) {
      value = (count / progress.docs[activedotIndex].levelCount) * 10;
    }
  }, [memberActivityProgress]);

  useEffect(() => {
    dispatch({
      type: Action.USER_GET_CURRENT_BUSINESS_NAME,
      payload: {id: currentBusinessId},
    });
    dispatch({
      type: Action.USER_GET_CURRENT_EVALUATION_NAME,
      payload: {id: currentEvaluationId},
    });
  }, [currentBusinessId, currentEvaluationId]);

  console.log('Activity: ', progress);
  useEffect(() => {
    membersdata && setCurrentMember(membersdata[currentMemberIndex]);
  }, [membersdata]);
  useEffect(() => {
    currentMember &&
      dispatch({
        type: Action.USER_GET_CURRENT_MEMBER_ACTIVITY,
        payload: {id: currentMember._id},
      });
    currentMember &&
      dispatch({
        type: Action.USER_GET_CURRENT_BUSINESS_NAME,
        payload: {id: currentMember._id},
      });
  }, [currentMember]);
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
          Business Name
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: colors.white,
            fontFamily: 'Nunito-SemiBold',
          }}>
          {businessName.name}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: colors.white,
            fontFamily: 'Nunito-Regular',
            marginTop: hp('2%'),
          }}>
          Evaluation Scheme Name
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: colors.white,
            fontFamily: 'Nunito-SemiBold',
          }}>
          {/* {item.class.name} */}
          {evaluationName.name}
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
        {progress && progress.docs.length > 0 ? (
          <Carousel
            style={{width: 350}}
            layout={'default'}
            data={progress.docs && progress.docs}
            sliderWidth={itemWidth - 30}
            itemWidth={itemWidth * 0.88}
            renderItem={renderItem}
            onSnapToItem={index => {
              setProgress('');
              setactivedotIndex(index);
              setBusinessId(progress.docs[index].businessId);
              setcurrentEvaluationId(progress.docs[index].evaluationSchemeId);
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
                Progress will be added soon
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={{marginTop: 30, marginRight: 20}}>
        <ProgressBarWithStar value={value} />
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
        <Timelines
          data={
            progress && progress.docs.length > 0
              ? progress.docs[activedotIndex].levels
              : null
          }
        />
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
