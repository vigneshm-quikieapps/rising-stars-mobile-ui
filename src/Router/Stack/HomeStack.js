import React, { useEffect, useState } from 'react';
import { Stack, StackScreen } from '../Utils/Utils';
import { ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import jwt_decode from "jwt-decode";

import { useSelector, useDispatch } from 'react-redux'

import { AuthStack } from './AuthStack';
import { EnrollStack, Addchildren, AddPayment } from './EnrollStack';
import HomeTab from '../Tab/HomeTab';
import EnrolledChild from '../../screen/Dashboard/EnrolledChild'
import ChangeClass from '../../screen/Dashboard/ChangeClass';
import PaymentHistory from '../../screen/Dashboard/PaymentHistory';
import { getLocalData } from '../../utils/LocalStorage';
import { getmemberData } from '../../redux/action/home';


const HomeNavigation = (props) => {
  const [token, setToken] = useState('')
  const dispatch = useDispatch()
  // const membersdata = useSelector(state => state.memberData.memberData)
  // console.log('token :', token);
  const refreshToken = useSelector(state => state.LoginData.refreshToken)

  const validation = () => {
    const Today = new Date().getTime()
    const extract = jwt_decode(token)
    console.log(extract)
  }

  useEffect(async () => {
    const accesstoken = await getLocalData('accessToken')
    dispatch(getmemberData(accesstoken))
    // dispatch(getmemberClass(membersdata[0]._id))
    // const Today = new Date().getTime()/1000
    // const {exp} = jwt_decode(token)
    // const validity = (exp - Today) / (60 * 60 * 24)
    // if(validity > 0){
    //   setToken(token)
    // }
    // console.log(validity)
    gettoken()
  }, [gettoken])

  const gettoken = async () => {
    const token = await getLocalData('refreshToken')
    setToken(token)
  }
  console.log(' props.token  :', props.token);
  return (
    <NavigationContainer>
      <Stack>
        {
          props.token
          ?
            <>
              <StackScreen.Screen
                name="HomeTab"
                component={HomeTab}
                options={{ headerShown: false }}
              />
              <StackScreen.Screen
                name="EnrollStack"
                component={EnrollStack}
                options={{ headerShown: false }}
              />
              <StackScreen.Screen
                name="Addchildren"
                component={Addchildren}
                options={{ headerShown: false }}
              />
              <StackScreen.Screen
                name="AddPayment"
                component={AddPayment}
                options={{ headerShown: false }}
              />
              <StackScreen.Screen
                name="EnrolledChild"
                component={EnrolledChild}
                options={{ headerShown: false }}
              />
              <StackScreen.Screen
                name="ChangeClass"
                component={ChangeClass}
                options={{ headerShown: false }}
              />
              <StackScreen.Screen
                name="PaymentHistory"
                component={PaymentHistory}
                options={{ headerShown: false }}
              />
            </> :
            <StackScreen.Screen
              name="AuthStack"
              component={AuthStack}
              options={{ headerShown: false }}
            />
        }
      </Stack>
    </NavigationContainer>
  );
};
export default HomeNavigation;
