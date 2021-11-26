import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  Pressable,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import moment from 'moment';

import CustomLayout from '../../custom/custom-layout';
import Studentcard from '../../custom/student-card';
import ProgressTracker from '../../custom/progress-tracker';
import Forwardbutton from '../../custom/forward-button';
import {colors, Fontsize, hp, wp, Stepend} from '../../constants';
import PopUpCard from '../../custom/pop-up-card';
import Slot from '../../custom/slot';
import {
  getClassdata,
  getSessiondata,
  setClubData,
  setClassData,
  setSlotData,
  clubfinance,
} from '../../redux/action/enrol';

import {useSelector, useDispatch} from 'react-redux';

export default function Class_Selection(props) {
  const [business, setBusiness] = useState();
  const [classes, setClasses] = useState();

  const [clubmodal, setClubModal] = useState(false);
  const [classmodal, setClassModal] = useState(false);

  const [showclass, setShowClass] = useState(false);
  const [showsession, setShowsession] = useState(false);

  const [selectdata, setSelectdata] = useState();

  const child = useSelector(state => state.childData.addchild);

  const clubData = useSelector(state => state.clubname.clubData);

  const classData = useSelector(state => state.classname.classtate);

  const sessionData = useSelector(state => state.sessionlist.sessiondata);

  const dispatch = useDispatch();

  const handleBusiness = item => {
    setBusiness(item.name);
    setShowClass(true);
    setClubModal(!clubmodal);
    dispatch(setClubData(item));
    dispatch(getClassdata(item._id));
  };
  const handleClasses = item => {
    setClasses(item.name);
    setShowsession(true);
    setClassModal(!classmodal);
    dispatch(setClassData(item));
    dispatch(clubfinance(item._id));
    dispatch(getSessiondata(item._id));
  };

  const handleforward = () => {
    dispatch(setSlotData(selectdata));
    props.navigation.navigate('Fees_Overview');
  };

  return (
    <CustomLayout
      Customchildren={<Studentcard name={child.fullName} id={child.age} />}
      steps
      start={2}
      end={Stepend}
      header
      headerTextBigText={true}
      headertext={'Class Selection'}
      backbutton={() => props.navigation.goBack()}
      Customchildren2={<ProgressTracker percent={2} />}>
      <PopUpCard
        headertext={'Club Name*'}
        text="Select Your Club Name"
        value={business}
        onPress={() => setClubModal(!clubmodal)}
      />
      {clubmodal &&
        clubData.map(item => {
          return (
            <TouchableOpacity
              key={item._id}
              onPress={() => handleBusiness(item)}
              style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontFamily: 'Nunito-Regular', fontSize: Fontsize}}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      {showclass ? (
        classData && classData.length > 0 ? (
          <>
            <PopUpCard
              headertext={'Class Name*'}
              text="Select Your Class Name"
              value={classes}
              onPress={() => setClassModal(!classmodal)}
            />
            {classmodal &&
              classData.map(item => {
                return (
                  <TouchableOpacity
                    key={item._id}
                    onPress={() => handleClasses(item)}
                    style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Text
                      style={{
                        fontFamily: 'Nunito-Regular',
                        fontSize: Fontsize,
                      }}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
          </>
        ) : (
          <ActivityIndicator size="large" color={colors.orange} />
        )
      ) : null}
      {showsession ? (
        sessionData && sessionData.length > 0 ? (
          <>
            <Text
              style={{
                fontFamily: 'Nunito-Regular',
                marginVertical: hp('1%'),
                fontSize: Fontsize,
              }}>
              Available Sessions
            </Text>
            {sessionData.map(item => {
              return (
                <Slot
                  white
                  radio
                  onPress={() => setSelectdata(item)}
                  status={selectdata === item && 'checked'}
                  day={item.pattern[0].day}
                  time={`${moment(item.pattern[0].startTime).format(
                    'HH:mm',
                  )} - ${moment(item.pattern[0].endTime).format('HH:mm')}`}
                  facility={item.name}
                  coach={item.coach[0].name}
                  key={item._id}
                  style={{marginVertical: wp('1%')}}
                />
              );
            })}
          </>
        ) : (
          <ActivityIndicator size="large" color={colors.orange} />
        )
      ) : null}
      {selectdata && (
        <Forwardbutton
          style={{alignSelf: 'flex-end', marginTop: hp('1%')}}
          onPress={handleforward}
        />
      )}
    </CustomLayout>
  );
}

const styles = StyleSheet.create({
  business: {
    height: hp('11%'),
    borderWidth: 1,
    marginVertical: hp('1%'),
    borderRadius: 10,
    borderColor: colors.lightgrey,
    padding: hp('2%'),
  },
  card: {
    height: hp('6%'),
    width: wp('80%'),
    // borderColor: colors.orange,
    // borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    margin: wp('0.1%'),
    // borderRadius:50
  },
  cardtext: {
    fontFamily: 'Nunito-Regular',
    fontSize: Fontsize,
  },
  modalView: {
    flex: 1,
    margin: 20,
    // backgroundColor: "white",
    // borderRadius: 20,
    // padding: 35,
    alignItems: 'center',
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5
  },
});
