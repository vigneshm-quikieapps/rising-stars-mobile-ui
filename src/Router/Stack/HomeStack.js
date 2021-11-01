import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {Stack, StackScreen} from '../Utils/Utils';
import {NavigationContainer} from '@react-navigation/native';
import jwt_decode from 'jwt-decode';

import {AuthStack} from './AuthStack';
import {EnrollStack, Addchildren, AddPayment} from './EnrollStack';
import HomeTab from '../Tab/HomeTab';
import EnrolledChild from '../../screen/Dashboard/EnrolledChild';
import ChangeClass from '../../screen/Dashboard/ChangeClass';
import PaymentHistory from '../../screen/Dashboard/PaymentHistory';
import {AuthContext} from '../../Constant/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeNavigation = () => {
  const [token, setToken] = useState('');
  const [isLoading, setLoading] = useState(true);
  // console.log('token :', token);

  const validation = () => {
    const Today = new Date().getTime();
    const extract = jwt_decode(token);
    console.log(extract);
  };

  // useEffect(async () => {
  //   const token = await getLocalData('refreshToken')
  //   // console.log('token ---------> :', token);
  //   setToken(token)

  //   // const Today = new Date().getTime()/1000
  //   // const {exp} = jwt_decode(token)
  //   // const validity = (exp - Today) / (60 * 60 * 24)
  //   // if(validity > 0){
  //   //   setToken(token)
  //   // }
  //   // console.log(validity)
  // },[])
  const initialLoginState = {
    is_loading: true,
    userToken: null,
  };
  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RetrieveToken':
        return {
          ...prevState,
          userToken: action.token,
          is_loading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userToken: action.token,
          is_loading: false,
        };

      case 'LOGOUT':
        return {
          ...prevState,
          userToken: null,
          is_loading: false,
        };

      case 'REGISTER':
        return {
          ...prevState,
          userToken: action.token,
          is_loading: false,
        };
    }
  };

  const [loginstate, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  const authContext = React.useMemo(() => ({
    signIn: async token => {
      let userToken;

      userToken = null;

      try {
        userToken = token;
        await AsyncStorage.setItem('userToken', userToken);
      } catch (error) {
        // Error saving data
        console.log(error);
      }

      dispatch({type: 'LOGIN', token: userToken});
    },

    signOut: async () => {
      try {
        await AsyncStorage.removeItem('userToken');
      } catch (error) {
        // Error saving data
        console.log(error);
      }

      dispatch({type: 'LOGOUT'});
    },

    Register: async () => {
      let userToken;
      try {
        userToken = 'uyhoyy';
        await AsyncStorage.setItem('userToken', '');
      } catch (error) {
        // Error saving data
        console.log(error);
      }

      dispatch({type: 'REGISTER', token: userToken});
    },
    skip: async () => {
      let userToken;

      try {
        userToken = ' ';
        await AsyncStorage.setItem('userToken', userToken);
      } catch (error) {
        // Error saving data
        console.log(error);
      }

      dispatch({type: 'LOGIN', token: userToken});
    },
  }));

  useEffect(() => {
    console.log('timer1');
    const timer = setTimeout(async () => {
      let userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (error) {
        // Error saving data
        console.log(error);
      }
        setLoading(false);
      dispatch({type: 'REGISTER', token: userToken});
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} color={'orange'} />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack>
          {loginstate.userToken ? (
            <>
              <StackScreen.Screen
                name="HomeTab"
                component={HomeTab}
                options={{headerShown: false}}
              />
              <StackScreen.Screen
                name="EnrollStack"
                component={EnrollStack}
                options={{headerShown: false}}
              />
              <StackScreen.Screen
                name="Addchildren"
                component={Addchildren}
                options={{headerShown: false}}
              />
              <StackScreen.Screen
                name="AddPayment"
                component={AddPayment}
                options={{headerShown: false}}
              />
              <StackScreen.Screen
                name="EnrolledChild"
                component={EnrolledChild}
                options={{headerShown: false}}
              />
              <StackScreen.Screen
                name="ChangeClass"
                component={ChangeClass}
                options={{headerShown: false}}
              />
              <StackScreen.Screen
                name="PaymentHistory"
                component={PaymentHistory}
                options={{headerShown: false}}
              />
            </>
          ) : (
            <StackScreen.Screen
              name="AuthStack"
              component={AuthStack}
              options={{headerShown: false}}
            />
          )}
        </Stack>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};
export default HomeNavigation;
