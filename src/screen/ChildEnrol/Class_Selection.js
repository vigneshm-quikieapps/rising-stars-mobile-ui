import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';

import {
  CustomLayout,
  StudentCard,
  ProgressTracker,
  ForwardButton,
  Slot,
  PopUpCard,
} from '../../components';
import {colors, Fontsize, hp, wp, Stepend} from '../../constants';
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

const Class_Selection = props => {
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
  const handleClasses = item => {
    setClasses(item.name);
    dispatch(setClassData(item));
    dispatch(clubfinance(item._id));
    dispatch(getSessiondata(item._id));
    setClassModal(!classmodal);
    setShowsession(true);
  };

  const handleforward = () => {
    dispatch(setSlotData(selectdata));
    props.navigation.navigate('Fees_Overview');
  };
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
      {/* {classmodal &&
                  classData.map(item => {
                    return (
                      <TouchableOpacity
                        onPressOut={() => setClubModal(false)}
                        key={item._id}
                        onPress={() => handleClasses(item)}
                        style={{
                          marginLeft: wp('8%'),
                          justifyContent: 'center',
                          alignContent: 'center',
                        }}>
                        <Text
                          style={{
                            backgroundColor: colors.lightgrey,
                            fontFamily: 'Nunito-Regular',
                            fontSize: Fontsize,
                            paddingTop: wp('2%'),
                            margin: wp('0.5%'),
                          }}>
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  })} */}
      {/* {clubmodal &&
        clubData.map(item => {
          return (
            <TouchableOpacity
              onPressOut={() => setClubModal(false)}
              key={item._id}
              onPress={() => handleBusiness(item)}
              style={{
                marginLeft: wp('8%'),
                justifyContent: 'center',
                alignContent: 'center',
                backgroundColor: colors.lightgrey,
              }}>
              <Text
                style={{
                  margin: wp('0.5%'),
                  fontFamily: 'Nunito-Regular',
                  paddingTop: wp('2%'),
                  fontSize: Fontsize,
                }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })} */}
      {showclass ? (
        classData && classData.length > 0 ? (
          <>
            <PopUpCard
              headertext={'Class Name*'}
              text="Select Your Class Name"
              value={classes}
              onPress={() => setClassModal(!classmodal)}
            />
            <PopUpClass
              ClosePopUp={() => setClassModal(!classmodal)}
              visible={classmodal}
              title={'Available Classes'}
              data={classData}
              setClub={classData => {
                handleClasses(classData);
              }}
              setVisibility={bin => {
                setClassModal(bin);
              }}
            />
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
                  required={true}
                  Class={classes}
                  radio
                  sessions={item.name}
                  onPress={() => setSelectdata(item)}
                  status={selectdata === item && 'checked'}
                  day={item.pattern[0].day}
                  time={`${moment(item.pattern[0].startTime).format(
                    'HH:mm A',
                  )} - ${moment(item.pattern[0].endTime).format('HH:mm A')}`}
                  facility={item.name}
                  coach={item.coach.name}
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
});
export default Class_Selection;
