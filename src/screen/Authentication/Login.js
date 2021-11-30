/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {colors, Fontsize, hp, wp} from '../../constants';
import {TextInputField, ErrorMessage, AppButton} from '../../components';
import {loginUserData} from '../../redux/action/auth';
import {getLocalData} from '../../utils/LocalStorage';

const validationSchema = Yup.object().shape({
  mobileNumber: Yup.number().required().min(10).label('Mobile Number'),
  password: Yup.string().required().min(6).label('Password'),
});

const Login = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.LoginData.user);
  const isLoading = useSelector(state => state.LoginData.isloading);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log(isLoading);

  const gotoRegister = () => {
    props.navigation.navigate('Register');
  };

  const gotoForgotPassword = () => {
    props.navigation.navigate('CreateNewPassword');
  };
  const star = <Text style={styles.star}>Star</Text>;

  useEffect(() => {
    getToken();
  }, [getToken, currentUser]);

  const getToken = useCallback(async () => {
    const refreshToken = await getLocalData('refreshToken');
    setIsLoggedIn(refreshToken);
  }, []);

  useEffect(() => {
    console.log('check login status: ', isLoggedIn);
    isLoggedIn && navigation.navigate('HomeTab');
  }, [navigation, isLoggedIn]);

  return (
    <ScrollView style={styles.container}>
      <Text
        style={{
          fontSize: 22,
          fontWeight: 'bold',
          paddingTop: hp('2%'),
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
        initialValues={{mobileNumber: '', password: ''}}
        onSubmit={values => {
          console.log(values);
          dispatch(loginUserData(values));
        }}
        validationSchema={validationSchema}>
        {({handleChange, handleSubmit, errors, setFieldTouched, touched}) => (
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

            {isLoading ? (
              <ActivityIndicator
                size="large"
                color={colors.orange}
                style={{marginVertical: hp('2%')}}
              />
            ) : (
              <AppButton
                title="Login"
                onPress={handleSubmit}
                style={{
                  fontFamily: 'Nunito-SemiBold',
                  marginTop: touched.password === true ? hp('1%') : hp('3%'),
                }}
                size="small"
                color="white"
              />
            )}
            <TouchableOpacity
              onPress={gotoForgotPassword}
              style={{alignItems: 'center'}}>
              <Text style={styles.forgotPasswordText}>Forgot Password</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>

      <View style={styles.text}>
        <Text style={(styles.forgotPasswordText, {color: '#7f7f7f'})}>
          Don't have an account?
        </Text>
        <TouchableOpacity onPress={gotoRegister}>
          <Text style={styles.forgotPasswordText}>Register</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: wp('4%'),
  },
  title: {
    fontSize: wp('7%'),
    fontFamily: 'Nunito-Regular',
  },
  image: {
    resizeMode: 'center',
    height: hp('30%'),
    width: hp('44'),
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
    color: '#ff7e00',
    fontSize: Fontsize,
    marginTop: hp('1%'),
    alignSelf: 'center',
    fontFamily: 'Nunito-Regular',
  },
});

export default Login;
