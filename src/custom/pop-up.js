import React from 'react';
import {View, Modal, StyleSheet} from 'react-native';

function PopUp(props) {
  return (
    <Modal
      animationType={props.animationType}
      transparent={props.transparent}
      visible={props.visible}
      onRequestClose={props.onRequestClose}>
      <View style={styles.container}>{props.children}</View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: hp('46%')
  },
});

export default PopUp;
