import React from 'react';
import {View, Modal, StyleSheet, TouchableOpacity} from 'react-native';

function PopUp(props) {
  return (
    <Modal
      animationType={props.animationType}
      transparent={props.transparent}
      visible={props.visible}
      onRequestClose={props.onRequestClose}>
      <TouchableOpacity
        onPressOut={() => props.setVisibility(false)}
        style={styles.container}>
        <View>{props.children}</View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: hp('46%')
  },
});

export default PopUp;
