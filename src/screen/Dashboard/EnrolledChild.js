/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {
  CustomLayout,
  LinearStudentCard,
  ClassCard,
  AppButton,
} from '../../components';
import {colors, Fontsize} from '../../constants';

export default function EnrolledChild(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [modalVisible4, setModalVisible4] = useState(false);

  const memberClassData = useSelector(state => state.memberClassData.classData);
  const currentMember = useSelector(state => state.currentMemberData.data);

  const handlesubmit = () => {
    setModalVisible(!modalVisible);
    setModalVisible2(!modalVisible2);
  };
  const submithandle = () => {
    setModalVisible3(!modalVisible3);
    setModalVisible4(!modalVisible4);
  };

  return (
    <CustomLayout
      names={'Enrolled Classes'}
      Customchildren={
        <LinearStudentCard
          colors={['#ffa300', '#ff7e00']}
          name={currentMember.name}
          style={{backgroundColor: colors.orange}}
          activityRequired
          activity={'Zippy Totz Pre-school Gymnastics'}
          subActivity={'Childhood Joy Classes'}
          className={'Childhood Joy Classes'}
          clubId={'PDPS4212'}
        />
      }
      backbutton={() => props.navigation.goBack()}>
      {/* <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible3}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible3(!modalVisible3);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Image
                style={{
                  height: 70,
                  width: 70,
                  marginVertical: 20,
                }}
                source={require('../../assets/images/cancelIcon.png')}
              />
              <Text style={styles.modalText}>
                Are you sure you want to change the Session?
              </Text>
              <AppButton
                title="Yes,Change Session"
                onPress={() => submithandle()}
              />

              <Buttons
                onPress={() => setModalVisible3(!modalVisible3)}
                style={{marginBottom: hp('1%')}}>
                <Text
                  style={{
                    color: colors.reddish,
                    fontFamily: 'Nunito-SemiBold',
                    marginBottom: hp('2%'),
                  }}>
                  No,Don't change
                </Text>
              </Buttons>
            </View>
          </View>
        </Modal>
      </View> */}
      {/* <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible4}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible4(!modalVisible4);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Image
                style={{
                  height: 70,
                  width: 70,
                  marginVertical: 20,
                }}
                source={require('../../assets/images/successIcon.png')}
              />
              <Text style={styles.modalText}>Session Changed successfully</Text>
              <View>
                <AppButton
                  title="Done"
                  style={{
                    paddingLeft: 130,
                    paddingRight: 130,
                    marginBottom: wp('5%'),
                  }}
                  onPress={() => setModalVisible4(!modalVisible4)}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View> */}

      <Text style={{fontFamily: 'Nunito-Regular', fontSize: Fontsize}}>
        Current Classes
      </Text>
      {memberClassData &&
        memberClassData?.map(classes => (
          <ClassCard
            className={classes.class.name}
            title={'Change Session'}
            day={classes.session.pattern[0].day}
            time={
              '10-11'
              // ""classes.session.pattern[0].startTime.getTime() +
              // '-' +
              // classes.session.pattern[0].endTime.getTime()"
            }
            facility={classes.session.facility}
            coach={'Henry Itondo'}
            class
            classbutton={() => {
              props.navigation.navigate('ChangeClass', {classes});
            }}
            member
            memberbutton={() => props.navigation.navigate('Profile')}
          />
        ))}
      {/* <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Image
                style={{
                  height: 70,
                  width: 70,
                  marginVertical: 20,
                }}
                source={require('../../assets/images/cancelIcon.png')}
              />
              <Text style={styles.modalText}>
                Are you sure you want to drop the class?
              </Text>
              <AppButton
                title="No, I have changed my mind"
                onPress={() => setModalVisible(!modalVisible)}
              />

              <Buttons
                onPress={() => handlesubmit()}
                style={{marginBottom: hp('1%')}}>
                <Text
                  style={{
                    color: colors.reddish,
                    fontFamily: 'Nunito-SemiBold',
                    marginBottom: hp('2%'),
                  }}>
                  Yes,Drop Class
                </Text>
              </Buttons>
            </View>
          </View>
        </Modal>
      </View> */}
      {/* <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible2}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible2(!modalVisible2);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Image
                style={{
                  height: 70,
                  width: 70,
                  marginVertical: 20,
                }}
                source={require('../../assets/images/successIcon.png')}
              />
              <Text style={styles.modalText}>Class dropped successfully</Text>
              <View>
                <AppButton
                  title="Done"
                  style={{
                    paddingLeft: 130,
                    paddingRight: 130,
                    marginBottom: wp('5%'),
                  }}
                  onPress={() => setModalVisible2(!modalVisible2)}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View> */}

      {/* <ClassCard
        className={'Pre-school gymnastics (Age 1-3)'}
        title={'Change Session'}
        day={'Monday'}
        time="9:30 am - 11:30 am"
        facility={'Gym Hall'}
        coach={'Henry Itondo'}
        class
        member
      /> */}
      <AppButton
        title={'New Class'}
        onPress={() => props.navigation.navigate('AddPayment')}
      />
    </CustomLayout>
  );
}

const styles = StyleSheet.create({
  container: {},
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.modalBackgroundColor,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    height: 450,
    borderRadius: 20,
    // padding: 35,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 65,
    textAlign: 'center',
    fontSize: 20,
    paddingHorizontal: 10,
  },
});
