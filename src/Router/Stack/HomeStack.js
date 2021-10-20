import React,{useEffect,useState} from 'react';
import { Stack, StackScreen } from '../Utils/Utils';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux'

import { AuthStack } from './AuthStack';
import { EnrollStack, Addchildren, AddPayment } from './EnrollStack';
import HomeTab from '../Tab/HomeTab';
import EnrolledChild from '../../screen/Dashboard/EnrolledChild'
import ChangeClass from '../../screen/Dashboard/ChangeClass';
import PaymentHistory from '../../screen/Dashboard/PaymentHistory';
import { getLocalData } from '../../utils/LocalStorage';


const HomeNavigation = () => {
  
  const [token,setToken] = useState('')
  useEffect(async()=>{
    const token = await getLocalData('refreshToken') 
    setToken(token)
  },[])
 
 
  return (
    <NavigationContainer>
      <Stack>
        {
          token ?
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
