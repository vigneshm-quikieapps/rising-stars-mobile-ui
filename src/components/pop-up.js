import React from 'react';
import {View, Modal, StyleSheet, TouchableOpacity} from 'react-native';

function PopUp(props) {
  return (
    <TouchableOpacity
      //onPressOut={() => props.setVisibility(false)}
      style={[styles.container, props.style]}>
      <Modal
        animationType={props.animationType}
        transparent={props.transparent}
        visible={props.visible}
        onRequestClose={props.onRequestClose}>
        <View style={{backgroundColor: 'rgba(0,0,0,0.7)'}}>
          {props.children}
        </View>
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
