import React from 'react';
import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import {AppButton} from '.';
import {hp, colors, wp, Fontsize} from '../constants';

function Alert(props) {
  return (
    <Modal style={styles.container} transparent={true} visible={props.visible}>
      <Text>{props.message}</Text>
      <View>
        {props.confirm && (
          <AppButton title={props.confirm} onPress={props.success} />
        )}
        {props.cancel && (
          <TouchableOpacity onPress={props.failure}>
            {props.cancel}
          </TouchableOpacity>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    height: hp('60%'),
    width: wp('90%'),
    marginBottom: hp('20%'),
  },
  cancel: {
    color: colors.reddish,
    fontSize: Fontsize,
  },
});

export default Alert;
