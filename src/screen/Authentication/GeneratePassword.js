import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import AppButton from '../../custom/app-button';
import TextInputField from '../../custom/text-input-field';
import {hp, wp} from '../../constants';
import CustomLayout from '../../custom/custom-layout';

function GeneratePassword(props) {
  const gotoLogin = () => {
    props.navigation.navigate('Login');
  };
  return (
    <CustomLayout style={styles.container}>
      <Text style={styles.title}>Create New passowrd</Text>
      <Text style={styles.subTitle}>
        Your new passowrd must be different from previous used password.
      </Text>

      <TextInputField placeholder="Password" style={{marginTop: hp('2%')}} />
      <TextInputField placeholder="Confirm Password" />
      <AppButton title="Reset Password" onPress={gotoLogin} />
    </CustomLayout>
  );
}

export default GeneratePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonStyle: {
    marginVertical: hp('1%'),
  },
  title: {
    fontSize: wp('6%'),
  },
  generateButton: {
    // marginVertical: hp('10%'),
  },
  subTitle: {
    fontSize: wp('3.5%'),
    // paddingHorizontal: wp('4%'),
    marginTop: hp('2%'),
  },
});
