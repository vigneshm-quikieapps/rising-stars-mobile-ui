import React from 'react';
import {View, Modal, StyleSheet, TouchableOpacity} from 'react-native';

function PopUp(props) {
  return (
<<<<<<< HEAD
    <Modal
      animationType={props.animationType}
      transparent={props.transparent}
      visible={props.visible}
      onRequestClose={props.onRequestClose}>
      <TouchableOpacity
        onPressOut={() => props.setVisibility(true)}
        style={styles.container}>
=======
    <TouchableOpacity
      //onPressOut={() => props.setVisibility(false)}
      style={styles.container}>
      <Modal
        animationType={props.animationType}
        transparent={props.transparent}
        visible={props.visible}
        onRequestClose={props.onRequestClose}>
>>>>>>> 49d4136f31f3ef951e04427067ed2b8dd87d6423
        <View>{props.children}</View>
      </Modal>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    marginLeft: 0,
    // justifyContent: 'center',
    // alignItems: 'center',
    // marginTop: hp('46%')
  },
});

export default PopUp;
