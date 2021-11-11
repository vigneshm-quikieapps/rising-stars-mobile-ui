import * as React from 'react';
import {Stack, StackScreen} from '../Utils/Utils';

import Login from '../../screen/Authentication/Login';
import Register from '../../screen/Authentication/Register';
import CreateNewPassword from './../../screen/Authentication/CreateNewPassword';
import Profile from '../../screen/Dashboard/Profile';
import HomeTab from '../Tab/HomeTab';

export const AuthStack = props => {
  return (
    <Stack>
      <StackScreen.Screen
        name="Login"
        component={Login}
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
    </Stack>
  );
};
