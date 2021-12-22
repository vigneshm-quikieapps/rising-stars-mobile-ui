import * as React from 'react';
import {Text, View, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../../screen/Dashboard/newhome';
import ActivityProgress from '../../screen/Dashboard/ActivityProgress';
import AttendenceShow from '../../screen/Dashboard/AttendenceShow';
import {ProfileStack} from '../Stack/ProfileStack';
import {colors} from './../../constants';

const Tab = createBottomTabNavigator();

function HomeTab() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colors.orange,
      }}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? require('../../assets/images/icon-home-filled.png')
              : require('../../assets/images/icon-home-line.png');
          } else if (route.name === 'Progress') {
            iconName = focused
              ? require('../../assets/images/icon-progress-filled.png')
              : require('../../assets/images/icon-progress-line.png');
          } else if (route.name === 'Attendance') {
            iconName = focused
              ? require('../../assets/images/icon-attendance-filled.png')
              : require('../../assets/images/icon-attendance-line.png');
          } else if (route.name === 'Acount') {
            iconName = focused
              ? require('../../assets/images/icon-profile-filled.png')
              : require('../../assets/images/icon-profile-line.png');
          }

          // You can return any component that you like here!
          return <Image source={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Tab.Screen
        name="Progress"
        component={ActivityProgress}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Attendance"
        component={AttendenceShow}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Acount"
        component={ProfileStack}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}

export default HomeTab;
