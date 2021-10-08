import React,{useState,useEffect} from 'react';
import {  View,  StyleSheet,  Text,  Image,  ScrollView,  TouchableOpacity,ActivityIndicator} from 'react-native';
import { colors, Fontsize, hp, wp } from '../../Constant/Constant';
import { Formik } from 'formik';
import * as Yup from 'yup';
import TextInputField from '../../custom/TextInputField';
import ErrorMessage from '../../custom/ErrorMessage';
import AppButton from '../../custom/AppButton';

// import * as Action from '../../redux/actiontype';
// import {connect} from 'react-redux'
// import {bindActionCreators} from 'redux'
// import { login,loginError } from '../../redux/action/auth';

const validationSchema = Yup.object().shape({
  // mobileNumber: Yup.number().required().min(10).label('Mobile Number'),
  // password: Yup.string().required().min(6).label('Password'),
});

function Login(props) {

  const onHandleSubmit = data => {
    const {mobileNumber, password } = data;
    // props.actions.login({mobileNumber,password})
    props.navigation.navigate('HomeTab');
  };

  const gotoRegister = () => {
    props.navigation.navigate('Register');
  };

  const gotoForgotPassword = () => {
    props.navigation.navigate('CreateNewPassword');
  };
  
  const star = <Text style={styles.star}>Star</Text>;
  return (
    <ScrollView style={styles.container}>
      <Text
        style={{
          fontSize: 22,
          fontWeight: 'bold',
          paddingTop: hp('2%'),
          // paddingLeft: 30,
          fontFamily: 'Nunito-Regular',
        }}>
        Rising Stars
      </Text>
      <Image
        style={styles.image}
        source={require('../../assets/images/loginImage.png')}
      />
      <Text style={styles.title}>
        Hey, Welcome {'\n'}Create account for {'\n'}your {star}
      </Text>

      <Formik
        initialValues={{ mobileNumber: '', password: '' }}
        onSubmit={onHandleSubmit}
        validationSchema={validationSchema}>
        {({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
          <>
            <TextInputField
              placeholder="Mobile Number"
              style={styles.inputField}
              onChangeText={handleChange('mobileNumber')}
              autoCapitalize="none"
              keyboardType="phone-pad"
              maxLength={10}
              autoCorrect={false}
              onBlur={() => setFieldTouched('mobileNumber')}
            />
            <ErrorMessage
              style={styles.errorMessage}
              error={errors.mobileNumber}
              visible={touched.mobileNumber}
            />
          
            <TextInputField
              placeholder="Password"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={() => setFieldTouched('password')}
            />
            <ErrorMessage
              style={styles.errorMessage}
              error={errors.password}
              visible={touched.password}
            />

            <AppButton
              title="Login"
              onPress={handleSubmit}
              style={{
                fontFamily: 'Nunito-SemiBold',
                marginTop:touched.password === true ? hp('1%') : hp('3%'),
              }}
            />
            <TouchableOpacity onPress={gotoForgotPassword} style={{ alignItems: 'center' }}>
              <Text style={styles.forgotPasswordText}>Forgot Password</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>

      <View style={styles.text}>
        <Text style={styles.forgotPasswordText, { color: "#7f7f7f" }}>
          Don't have an account?
        </Text>
        <TouchableOpacity onPress={gotoRegister}>
          <Text style={styles.forgotPasswordText}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: wp('4%'),
  },
  title: {
    fontSize: wp('7%'),
    // marginLeft: wp('4%'),
    // marginRight: wp('25%'),
    fontFamily: 'Nunito-Regular',
  },
  image: {
    resizeMode: 'center',
    height: hp('30%'),
    width: hp('44'),
    // borderWidth:1,
    // borderColor:'red'
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp('2%'),
  },
  inputField: {
    marginTop: hp('3%'),
  },
  star: {
    fontWeight: 'bold',
    fontSize: wp('8%'),
    fontFamily: 'Nunito-Regular',
  },
  errorMessage: {
    alignSelf: 'flex-end',
    paddingRight: wp('1%'),
    opacity: 0.5,
    fontFamily: 'Nunito-Regular',
  },
  forgotPasswordText: {
    color: "#ff7e00",
    // marginHorizontal: wp('6%'),
    fontSize:Fontsize,
    marginTop: hp('1%'),
    alignSelf: 'center',
    fontFamily: 'Nunito-Regular',
  },
});

// const mapStateToProps = state => {
//   return{
//     auth:state.auth
//   }
// }

// const mapDispatchToProps = dispactch =>({
//   actions:bindActionCreators({login},dispactch)
// })
// export default connect(mapStateToProps,mapDispatchToProps)(Login);
export default Login