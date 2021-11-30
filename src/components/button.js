import React from 'react';
import {TouchableOpacity} from 'react-native';

const Button = props => {
  return (
    <TouchableOpacity onPress={props.onPress} disabled={props.disabled}>
      {props.children}
    </TouchableOpacity>
  );
};

export default Button;
