import React from 'react';
import {View, Modal, StyleSheet, TouchableOpacity} from 'react-native';

function PopUp(props) {
  return (
    <TouchableOpacity
      //onPressOut={() => props.setVisibility(false)}
      style={styles.container}>
      <Modal
        animationType={props.animationType}
        transparent={props.transparent}
        visible={props.visible}
        onRequestClose={props.onRequestClose}>
        <View>{props.children}</View>
      </Modal>
    </TouchableOpacity>
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
