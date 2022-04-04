/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, StyleSheet, ActivityIndicator, View, Image} from 'react-native';
import moment from 'moment';

import {
  CustomLayout,
  StudentCard,
  newPopUpClass,
  ProgressTracker,
  ForwardButton,
  Slot,
  PopUpCard,
} from '../../components';
import {colors, Fontsize, hp, wp, Stepend, fullDays} from '../../constants';
import {
  getClassdata,
  getSessiondata,
  setClubData,
  setClassData,
  setSlotData,
  clubfinance,
} from '../../redux/action/enrol';
import {getLocalData} from '../../utils/LocalStorage';

import {useSelector, useDispatch} from 'react-redux';
import PopUpClass from '../../components/pop-up-class_selection';
import NewPopUpClass from '../../components/new- popup-class';

const New_Class_Selection = props => {
  const [business, setBusiness] = useState();
  const [classes, setClasses] = useState();

  const [clubmodal, setClubModal] = useState(false);
  const [classmodal, setClassModal] = useState(false);

  const [showclass, setShowClass] = useState(false);
  const [showsession, setShowsession] = useState(false);

  const [selectdata, setSelectdata] = useState();
  const [enroll, setEnroll] = useState();
  const [waitlisted, setWaitlisted] = useState();

  const child = useSelector(state => state.childData.addchild);

  const clubData = useSelector(state => state.clubname.clubData);

  const classData = useSelector(state => state.classname.classtate);

  const sessionData = useSelector(state => state.sessionlist.sessiondata);

  const memberClassData = useSelector(state => state.memberClassData.classData);

  const dispatch = useDispatch();
  //console.log('abc', selectdata);
  //console.log('def', child);
  const {from} = props.route.params;

  const handleBusiness = async item => {
    setBusiness(item.name);
    setClubModal(!clubmodal);
    // item.MemberId = child.member._id;
    // item.Token = await getLocalData('accessToken');
    dispatch(setClubData(item));
    dispatch(
      getClassdata({
        id: item._id,
        token: await getLocalData('accessToken'),
        businessid: item._id,
      }),
    );
    setShowClass(true);
  };

  const handleSessionsDevide = () => {
    setEnroll(
      sessionData &&
        sessionData.filter(item => item.status === 'OPEN_FOR_ENROLMENT'),
    );
    setWaitlisted(
      sessionData &&
        sessionData.filter(
          item => item.status === 'OPEN_FOR_WAITLIST_ENROLLMENT',
        ),
    );
  };

  const handleClasses = item => {
    //console.log('after selecting class', item);
    setClasses(item.name);
    dispatch(setClassData(item));
    dispatch(clubfinance(item._id));
    dispatch(getSessiondata(item._id));
    setClassModal(!classmodal);
    setShowsession(true);
    handleSessionsDevide();
  };

  const handleforward = () => {
    dispatch(setSlotData(selectdata));
    props.navigation.navigate('Fees_Overview', {from: from});
  };

  // useEffect(() => {
  //   checkEnroll();
  // }, []);

  function checkEnroll() {
    let classesOfChild = memberClassData.filter(
      item =>
        item.enrolledStatus === 'ENROLLED' ||
        item.enrolledStatus === 'WAITLISTED',
    );
    classesOfChild = classesOfChild.map(item => item.class._id);
    let currentClassData = [...classData];
    let extraClasses = [];
    //console.log('qwerty', memberClassData, classesOfChild, currentClassData);

    for (var i = 0; i < currentClassData.length; i++) {
      if (classesOfChild.includes(currentClassData[i]._id)) {
        //console.log('includes', currentClassData[i]);
      } else {
        extraClasses.push(currentClassData[i]);
      }
    }
    return extraClasses;
  }

  return (
    <CustomLayout
      Customchildren={
        <StudentCard
          name={child.member.name}
          age={
            new Date().getFullYear() - parseInt(child.member.dob.slice(0, 4))
          }
        />
      }
      steps
      start={2}
      end={Stepend}
      back
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
      <PopUpClass
        ClosePopUp={() => setClubModal(!clubmodal)}
        visible={clubmodal}
        title={'Available Clubs'}
        data={clubData}
        setClub={club => {
          handleBusiness(club);
        }}
        setVisibility={bin => {
          setClubModal(bin);
        }}
      />
      {showclass ? (
        <>
          <PopUpCard
            headertext={'Class Name*'}
            text="Select Your Class Name"
            value={classes}
            onPress={() => setClassModal(!classmodal)}
          />
          <NewPopUpClass
            ClosePopUp={() => setClassModal(!classmodal)}
            visible={classmodal}
            title={'Available Classes'}
            data={checkEnroll()}
            setClub={classData1 => {
              handleClasses(classData1);
            }}
            setVisibility={bin => {
              setClassModal(bin);
            }}
          />
        </>
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
            {enroll.map(item => {
              //console.log('sessionData==>', item);

              return (
                <Slot
                  white
                  required={true}
                  Class={classes}
                  radio
                  sessions={item.name}
                  onPress={() => setSelectdata(item)}
                  status={selectdata === item && 'checked'}
                  day={fullDays[item.pattern[0].day]}
                  time={`${moment(item.pattern[0].startTime).format(
                    'hh:mm A',
                  )} - ${moment(item.pattern[0].endTime).format('hh:mm A')}`}
                  facility={item.facility}
                  // coach={item.coach.name == null ? '---' : item.coach.name}
                  coach={item.coach.name}
                  key={item._id}
                  style={{marginVertical: wp('1%')}}
                />
              );
            })}
            {enroll.length === 0 ? (
              <View style={styles.remark}>
                <View style={styles.mark}>
                  <Image
                    style={styles.tick}
                    source={require('../../assets/images/icon-info.png')}
                  />
                </View>
                <Text style={styles.marktext}>No Session Available</Text>
              </View>
            ) : null}

            <Text
              style={{
                fontFamily: 'Nunito-Regular',
                marginVertical: hp('1%'),
                fontSize: Fontsize,
              }}>
              Waitlisted Sessions
            </Text>
            {waitlisted.map(item => {
              //console.log('sessionData==>', item);

              return (
                <Slot
                  white
                  required={true}
                  Class={classes}
                  radio
                  sessions={item.name}
                  onPress={() => setSelectdata(item)}
                  status={selectdata === item && 'checked'}
                  day={fullDays[item.pattern[0].day]}
                  time={`${moment(item.pattern[0].startTime).format(
                    'hh:mm A',
                  )} - ${moment(item.pattern[0].endTime).format('hh:mm A')}`}
                  facility={item.facility}
                  // coach={item.coach.name == null ? '---' : item.coach.name}
                  coach={item.coach.name}
                  key={item._id}
                  style={{marginVertical: wp('1%')}}
                />
              );
            })}
            {waitlisted.length === 0 ? (
              <View style={styles.remark}>
                <View style={styles.mark}>
                  <Image
                    style={styles.tick}
                    source={require('../../assets/images/icon-info.png')}
                  />
                </View>
                <Text style={styles.marktext}>
                  No Waitlisted Session Available
                </Text>
              </View>
            ) : null}
          </>
        ) : (
          <ActivityIndicator size="large" color={colors.orange} />
        )
      ) : null}
      {selectdata && (
        // <ForwardButton
        //   style={{alignSelf: 'flex-end', marginTop: hp('1%')}}
        //   onPress={() => handleforward()}
        // />
        <ForwardButton
          style={{alignSelf: 'flex-end', marginTop: hp('2%')}}
          title="Submit"
          onPress={() => {
            handleforward();
          }}
        />
      )}
    </CustomLayout>
  );
};
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
  remark: {
    borderRadius: 10,
    height: hp('12%'),
    // marginHorizontal: wp('4%'),
    marginVertical: hp('2%'),
    paddingHorizontal: wp('1.8%'),
    paddingTop: hp('.1%'),
    flexDirection: 'row',
    backgroundColor: '#fff2e6',
    // marginVertical: hp('1%'),
  },
  tick: {
    height: hp('3%'),
    width: hp('3%'),
  },
  mark: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('4%'),
    width: hp('4%'),
    marginRight: wp('2%'),
  },
  marktext: {
    color: '#d26800',
    alignSelf: 'center',
    flex: 1,
    fontSize: Fontsize,
    fontFamily: 'Nunito-Regular',
  },
});

export default New_Class_Selection;
