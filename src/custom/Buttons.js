import React from 'react';
import {TouchableOpacity} from 'react-native';

const Btn = props => {
  return (
    <TouchableOpacity onPress={props.onPress} disabled={props.disabled}>
      {props.children}
    </TouchableOpacity>
  );
};

export default Btn;
