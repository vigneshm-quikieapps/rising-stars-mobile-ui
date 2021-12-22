/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  CustomLayout,
  StudentCard,
  ProgressTracker,
  ForwardButton,
} from '../../components';
import {colors, Fontsize, hp, wp} from '../../constants';
import {RadioButton} from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';
import EntIcon from 'react-native-vector-icons/Entypo';
import {setAdditionDetails} from '../../redux/action/enrol';
import {useSelector, useDispatch} from 'react-redux';
import {baseProps} from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlers';

const Additional_Sections = props => {
  const termref = useRef();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const child = useSelector(state => state.childData.addchild);
  const club = useSelector(state => state.childData.clubdata);

  const [email, setEmail] = useState(false);
  const [telephone, setTelephone] = useState(false);
  const [sms, setSms] = useState(false);
  const fullName = useSelector(state => state.childData.fullName);
  const age = useSelector(state => state.childData.age);
  const handleSubmit = () => {
    var det = {
      email: email,
      telephone: telephone,
      sms: sms,
    };
    console.log(det);
    dispatch(setAdditionDetails(det));
    props.navigation.navigate('Pay');
  };
  const selectaddition = way => {
    way === 'email' ? setEmail(!email) : null;
    way === 'telephone' ? setTelephone(!telephone) : null;
    way === 'sms' ? setSms(!sms) : null;
  };
  console.log(modalVisible);
  return (
    <CustomLayout
      Customchildren={
        <StudentCard
          name={child.member.name}
          id={age}
          activityrequired
          activity={club.name}
          subactivity={'Childhood Joy Classes'}
        />
      }
      steps
      start={5}
      end={7}
      header
      headertext={`Additional ${'\n'}Sections`}
      headertextStyle={{
        fontSize: wp('8%'),
        fontFamily: 'Nunito-SemiBold',
      }}
      backbutton={() => props.navigation.goBack()}
      Customchildren2={<ProgressTracker percent={5} />}>
      {/* <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.modalstyle}>
            <View style={styles.modalView}>
              <Text
                style={{ fontFamily: 'Nunito-SemiBold', marginTop: hp('1.5%'),fontSize:Fontsize }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since.
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(!modalVisible)}
                style={{
                  justifyContent: 'center',
                  backgroundColor: colors.orange,
                  width: wp('10%'),
                  alignItems: 'center',
                  borderRadius: 10,
                  height: hp('5%'),
                  alignSelf: 'flex-end',
                }}>
                <Text>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View> */}
      <RBSheet
        ref={termref}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: colors.blackOpacity,
          },
          container: {
            height: '25%',
            borderTopRightRadius: 16,
            borderTopLeftRadius: 16,
          },
        }}>
        <View style={{paddingHorizontal: wp('5%')}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                fontFamily: 'Nunito-Regular',
                fontSize: Fontsize,
                color: '#ff7e00',
              }}>
              Club Rule
            </Text>
            <TouchableOpacity onPress={() => termref.current.close()}>
              <LinearGradient
                style={styles.closePopUp}
                colors={['#ffa300', '#ff7e00']}>
                <EntIcon name="cross" size={15} color="white" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontFamily: 'Nunito-Regular',
              marginTop: hp('1.5%'),
              fontSize: Fontsize,
              alignSelf: 'center',
            }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since.
          </Text>
        </View>
      </RBSheet>
      <Text style={styles.newsheader}>News, communication and marketing</Text>
      <Text
        style={{
          fontSize: Fontsize,
          fontFamily: 'Nunito-Regular',
          marginVertical: hp('1.5%'),
        }}>
        I would like to receive{' '}
        <Text
          style={{
            // fontFamily: 'Nunito-Regular',
            // fontSize: Fontsize,
            color: '#ff7e00',
          }}>
          Zippy’s
        </Text>{' '}
        newsletter and other communications
      </Text>
      <View style={styles.container}>
        <RadioButton
          onPress={() => selectaddition('email')}
          status={email ? 'checked' : 'unchecked'}
        />
        <Text style={styles.way}>{'by Email'}</Text>
      </View>
      <View style={styles.container}>
        <RadioButton
          onPress={() => selectaddition('telephone')}
          status={telephone ? 'checked' : 'unchecked'}
        />
        <Text style={styles.way}>{'by Telephone'}</Text>
      </View>
      <View style={styles.container}>
        <RadioButton
          onPress={() => selectaddition('sms')}
          status={sms ? 'checked' : 'unchecked'}
        />
        <Text style={styles.way}>{'by SMS'}</Text>
      </View>
      <Text style={styles.newsheader}>Club Rules</Text>
      <Text
        style={{
          fontFamily: 'Nunito-SemiBold',
          marginTop: hp('1.5%'),
          fontSize: Fontsize,
          paddingRight: wp('4%'),
        }}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since.
      </Text>
      <TouchableOpacity onPress={() => termref.current.open()}>
        <Text style={styles.bottom}>Read more about Club Rule</Text>
      </TouchableOpacity>
      <ForwardButton
        style={{alignSelf: 'flex-end'}}
        onPress={() => handleSubmit()}
      />
    </CustomLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: hp('1%'),
    alignItems: 'center',
  },
  way: {
    fontFamily: 'Nunito-Regular',
    fontSize: Fontsize,
    color: '#7f7f7f',
  },
  bottom: {
    fontFamily: 'Nunito-Regular',
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: '#ff7e00',
    textDecorationLine: 'underline',
    marginVertical: 5,
  },
  optional: {
    marginTop: hp('2.5%'),
    marginLeft: hp('5.4%'),
    color: colors.grey,
  },
  newsheader: {
    fontFamily: 'Nunito-SemiBold',
    width: wp('80%'),
    fontSize: hp('2.8%'),
    marginTop: hp('2%'),
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closePopUp: {
    height: hp('3%'),
    width: hp('3%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    alignSelf: 'flex-end',
    marginTop: -hp('1%'),
  },
});

export default Additional_Sections;
