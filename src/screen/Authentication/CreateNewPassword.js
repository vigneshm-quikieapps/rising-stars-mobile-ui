import React, {useState, useRef} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {CustomLayout, TextInputField, AppButton} from './../../components';
import {colors, hp, wp} from './../../constants';
import RBSheet from 'react-native-raw-bottom-sheet';
import InputOTPScreen from './InputOTPScreen';
import {forgetPasswordData} from '../../redux/action/auth';
import {ScrollView} from 'react-native-gesture-handler';

function CreateNewPassword(props) {
  const refRBSheet = useRef();
  const dispatch = useDispatch();

  // const handleSubmit1 = no => {
  //   userNumber = no;
  //   refRBSheet.current.open();
  // };

  const [button1, setButton1] = useState(false);
  const [button2, setButton2] = useState(false);

  const [email, setEmail] = useState('');
  const [OTP1, setOTP1] = useState('');

  const [number, setNumber] = useState('');
  const [OTP2, SetOTP2] = useState('');
  const [modalVisible, setModalVisible] = useState(true);

  const gotoGeneratePassword = () => {
    // props.navigation.navigate('GeneratePassword');
    let body = {
      email: email,
      mobileNo: number,
    };
    dispatch(forgetPasswordData(body));
    // refRBSheet.current.open();
    props.navigation.navigate('InputOTPScreen');
  };
  return (
    // <CustomLayout
    //   style={styles.container}
    //   backbutton={() => props.navigation.goBack()}
    //   header
    //   headerTextBigText
    //   headertext={`Forgot Password`}>
    <CustomLayout
      style={styles.container}
      back
      backbutton={() => props.navigation.goBack()}
      header
      headertextStyle={{
        width: wp('90%'),
        fontSize: wp('8%'),
      }}
      headertext={`Forgot Password`}
      subheader
      subheadertext={'Enter your details to get OTP'}
      subheadertextstyle={{
        opacity: 0.5,
        width: wp('90%'),
      }}>
      {/* <ScrollView style={{paddingTop: hp('3%')}}> */}
      <View style={{paddingTop: hp('3%')}}>
          {/* <Text style={styles.title}>Forget Password</Text> */}
          {/* <Text style={styles.subTitle}>
          Enter the Email associated with your account we will send an OTP to
          that Email.
        </Text> */}
          <TextInputField
            keyboardType="email"
            placeholder="Email"
            onChangeText={setEmail}
          />
          <Text style={styles.orText}>Or</Text>
          {/* <AppButton title="Send OTP" style={styles.buttonStyle} />
        <TextInputField
          keyboardType="numeric"
          placeholder="OTP"
          onChangeText={setOTP1}
        /> */}

          {/* <AppButton
          title={button1 && email !== '' && OTP1 !== '' ? 'Verified' : 'Verify'}
          style={[
            styles.buttonStyle,
            {
              backgroundColor:
                button1 && email !== '' && OTP1 !== ''
                  ? 'green'
                  : colors.orange,
            },
          ]}
          onPress={() => {
            if (email === '' && OTP1 === '') {
              alert('Invalid Credential');
            } else {
              setButton1(true);
            }
          }}
        /> */}

          {/* <Text style={styles.subTitle}>
          Enter the Contact Number associated with your account we will send an
          OTP to that Number.
        </Text> */}
          <TextInputField
            keyboardType="numeric"
            placeholder="Contact Number"
            onChangeText={setNumber}
          />
          {/* <AppButton title="Send OTP" style={styles.buttonStyle} />

        <TextInputField
          keyboardType="numeric"
          placeholder="OTP"
          onChangeText={SetOTP2}
        /> */}

          {/* <AppButton
          title={
            button2 && number !== '' && OTP2 !== '' ? 'Verified' : 'Verify'
          }
          style={[
            styles.buttonStyle,
            {backgroundColor: button2 ? 'green' : colors.orange},
          ]}
          onPress={() => {
            if (number === '' && OTP2 === '') {
              alert('Invalid Credential');
            } else {
              setButton2(true);
            }
          }}
        /> */}
          {/* <Text style={styles.subTitle}>
          Your new passowrd must be different from previous used password.
        </Text> */}
          {/* <TextInputField placeholder="Password" style={{marginTop: hp('2%')}} />
        <TextInputField placeholder="Confirm Password" /> */}
        </View>
      {/* </ScrollView> */}
      {/* <View style={{height: hp('50%')}} /> */}
      <View style={{height: hp('35%')}} />
      <AppButton
        title="Send OTP"
        style={[styles.generateButton, {backgroundColor: colors.orange}]}
        onPress={gotoGeneratePassword}
      />
      {/* BOTTOMSHEET CODE START */}
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: colors.blackOpacity,
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
          container: {
            height: '50%',
            borderTopRightRadius: 16,
            borderTopLeftRadius: 16,
          },
        }}>
        <InputOTPScreen twoInputField={true} navigation={props.navigation} />
      </RBSheet>
      {/* BOTTOMSHEET CODE END */}
    </CustomLayout>
  );
}

export default CreateNewPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
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
    paddingHorizontal: wp('4%'),
    marginTop: hp('2%'),
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.modalBackgroundColor,
  },
  orText: {
    opacity: 0.5,
    textAlign: 'center',
    paddingVertical: 10,
  },
});
