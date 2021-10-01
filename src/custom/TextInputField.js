import * as React from 'react';
import { StyleSheet } from 'react-native';
import { configureFonts, TextInput } from 'react-native-paper';
import { wp, colors, Fontsize } from '../Constant/Constant';


const TextInputField = ({ placeholder, label, style, ...otherProps }) => {

  const fontConfig = {
    default: {
      regular: {
        fontFamily: 'Nunito-Regular',
        fontWeight: 'normal',
      },
    },
  };


  return (
    <TextInput
      label={placeholder}
      placeholder={label}
      mode="outlined"
      placeholderTextColor={"#e3e3e3"}
      outlineColor={"#e3e3e3"}
      // outlineTextColor={"red"}
      theme={{
        roundness: 15,
        colors: {
          primary: colors.orange,

        },
        fonts: configureFonts(fontConfig)
      }}
      style={[styles.textInput, style]}
      {...otherProps}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    marginVertical: wp('1%'),
    fontSize: Fontsize,
    fontFamily: 'Nunito-Regular',
    borderColor: colors.orange,
    backgroundColor: '#ffffff',
  }
});

export default TextInputField;
