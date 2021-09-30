import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Alert,
  Modal,
  Pressable,
} from 'react-native';
import {colors} from './../Constant/Constant';
import AppButton from './AppButton';

function cancelModal(props) {
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <View style={styles.centeredView}>
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
              source={require('../assets/images/cancelIcon.png')}
            />
            <Text style={styles.modalText}>
              Are you sure you want to drop the class
            </Text>

            <Pressable onPress={() => setModalVisible(!modalVisible)}>
              <AppButton
                title="No, I have changed my mind"
                style={{fontFamily: 'Nunito-SemiBold'}}
              />
            </Pressable>

            <Pressable onPress={() => setModalVisible(!modalVisible)}>
              <Text
                style={{
                  color: colors.cancelMembership,
                  fontFamily: 'Nunito-SemiBold',
                }}>
                Yes, drop class
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default cancelModal;

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
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 65,
    textAlign: 'center',
    fontSize: 20,
    paddingHorizontal: 10,
    fontFamily: 'Nunito-SemiBold',
  },
});
