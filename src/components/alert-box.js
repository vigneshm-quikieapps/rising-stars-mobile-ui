import React, {useRef} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {AppButton} from '.';
import {hp, colors, wp, Fontsize} from '../constants';

function Alert(props) {
  const ref = useRef();
  return (
    <Modal transparent={false} visible={props.visible} tra>
      <View style={styles.container}>
        <View style={{alignContent: 'center', alignItems: 'center'}}>
          {props.image === 'success' ? (
            <Image
              style={styles.image}
              source={require('../assets/images/successIcon.png')}
            />
          ) : (
            <Image
              style={styles.image}
              source={require('../assets/images/cancelIcon.png')}
            />
          )}
          <Text style={styles.message}>{props.message}</Text>
        </View>
        {props.confirm && (
          <AppButton
            title={props.confirm}
            onPress={props.success}
            style={{
              width: wp('85%'),
              marginLeft: wp('2.5%'),
              marginBottom: wp('2%'),
            }}
          />
        )}
        {props.cancel && (
          <TouchableOpacity onPress={props.failure} style={styles.text}>
            <Text style={styles.cancel}>{props.cancel}</Text>
          </TouchableOpacity>
        )}
      </View>
    </Modal>
  );
}

export default Alert;

const styles = StyleSheet.create({
  cancel: {
    color: colors.reddish,
    fontSize: Fontsize + wp('0.5%'),
    marginTop: hp('1%'),
    marginBottom: hp('2%'),
  },
  text: {
    alignContent: 'center',
    alignItems: 'center',
  },
  container: {
    // flex: 1,
    //borderWidth: 3,
    marginVertical: hp('1%'),
    borderRadius: 20,
    //borderColor: colors.orangeYellow,
    padding: wp('1%'),
    marginTop: hp('11%'),
    paddingHorizontal: wp('3%'),
    backgroundColor: colors.white,
    justifyContent: 'center',
    width: wp('95%'),
    marginLeft: wp('2%'),
  },
  image: {
    marginTop: hp('10%'),
    marginBottom: hp('5%'),
    // marginLeft: wp('32%'),
  },
  // cancel: {
  //   color: colors.reddish,
  //   fontSize: Fontsize,
  // },
  message: {
    fontSize: hp('4%'),
    // marginLeft: wp('15%'),
    paddingBottom: hp('15%'),
    //paddingTop: hp('15%'),
  },
});
