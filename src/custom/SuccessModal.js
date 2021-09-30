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
import {colors} from '../Constant/Constant';
import AppButton from './AppButton';

function SuccessModal(props) {
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
              source={require('../assets/images/successIcon.png')}
            />
            <Text style={styles.modalText}>Cancel dropped successfully</Text>
            <View>
              <Pressable onPress={() => setModalVisible(!modalVisible)}>
                <AppButton
                  title="Done"
                  style={{
                    paddingLeft: 130,
                    paddingRight: 130,
                    fontFamily: 'Nunito-SemiBold',
                  }}
                />
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default SuccessModal;

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
    backgroundColor: colors.white,
    justifyContent: 'flex-end',
    height: 400,
    borderRadius: 20,
    padding: 10,
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
    fontSize: 23,
    paddingHorizontal: 30,
    fontFamily: 'Nunito-SemiBold',
  },
});
