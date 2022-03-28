import * as React from 'react';
import {Stack, StackScreen} from '../Utils/Utils';

import SetPassword from '../../screen/Authentication/set-password';
import Login from '../../screen/Authentication/Login';
import Register from '../../screen/Authentication/Register';
import CreateNewPassword from './../../screen/Authentication/CreateNewPassword';
import InputOTPScreen from '../../screen/Authentication/InputOTPScreen';

export const AuthStack = props => {
  return (
    <Stack>
      <StackScreen.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <StackScreen.Screen
        name="SetPassword"
        component={SetPassword}
        options={{headerShown: false}}
      />
      <StackScreen.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <StackScreen.Screen
        name="CreateNewPassword"
        component={CreateNewPassword}
        options={{headerShown: false}}
      />
      <StackScreen.Screen
        name="InputOTPScreen"
        component={InputOTPScreen}
        options={{headerShown: false}}
      />
    </Stack>
  );
};
