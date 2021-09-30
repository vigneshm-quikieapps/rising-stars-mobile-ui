import * as React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import {wp,colors} from '../Constant/Constant';


const TextInputField = ({placeholder, label, style, ...otherProps}) => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  return (
    <TextInput
      label={placeholder}
      placeholder={label}
      mode="outlined"
      placeholderTextColor={colors.blackOpacity}
      outlineColor={colors.orange}
      theme={{
        roundness: 10,
        colors: {
          primary: colors.orange,
        },
      }}
      style={[styles.textInput, style]}
      {...otherProps}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    marginVertical: wp('1%'),
    // marginHorizontal: wp('5.5%'),
    fontSize: wp('4%'),
    // fontSize: 20,
    fontFamily: 'Nunito-Regular',
    borderColor: colors.orange,
    // fontFamily:"Nunito-SemiBold",
    backgroundColor: '#ffffff',
  },
});

export default TextInputField;
