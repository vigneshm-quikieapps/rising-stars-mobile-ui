import * as React from 'react';
import {Stack, StackScreen} from '../Utils/Utils';
import {useDispatch, useSelector} from 'react-redux';

import EnrollingFlow from '../../screen/ChildEnrol/EnrollingFlow';
import AddChild from '../../screen/ChildEnrol/AddChild';
import Additional_Sections from '../../screen/ChildEnrol/Additional_Sections';
import Class_Selection from '../../screen/ChildEnrol/Class_Selection';
import Confirmation from '../../screen/ChildEnrol/Confirmation';
import Fees_Overview from '../../screen/ChildEnrol/Fees_Overview';
import Pay from '../../screen/ChildEnrol/Pay';
import Provide_Consent from '../../screen/ChildEnrol/Provide_Consent';
import New_Class_Selection from '../../screen/ChildEnrol/newClassSelection';

export const EnrollStack = props => {
  return (
    <Stack>
      {/* <StackScreen.Screen
        name="EnrollingFlow"
        component={EnrollingFlow}
        options={{headerShown: false}}
      /> */}
      <StackScreen.Screen
        name="AddChild"
        component={AddChild}
        options={{headerShown: false}}
      />
      <StackScreen.Screen
        name="Class_Selection"
        component={Class_Selection}
        options={{headerShown: false}}
      />
      <StackScreen.Screen
        name="New_Class_Selection"
        component={New_Class_Selection}
        options={{headerShown: false}}
      />
      <StackScreen.Screen
        name="Fees_Overview"
        component={Fees_Overview}
        options={{headerShown: false}}
      />
      <StackScreen.Screen
        name="Provide_Consent"
        component={Provide_Consent}
        options={{headerShown: false}}
      />
      {/* <StackScreen.Screen
        name="Additional_Sections"
        component={Additional_Sections}
        options={{headerShown: false}}
      /> */}
      <StackScreen.Screen
        name="Pay"
        component={Pay}
        options={{headerShown: false}}
      />
      <StackScreen.Screen
        name="Confirmation"
        component={Confirmation}
        options={{headerShown: false}}
      />
    </Stack>
  );
};

export const Addchildren = props => {
  return (
    <Stack>
      <StackScreen.Screen
        name="AddChild"
        component={AddChild}
        options={{headerShown: false}}
      />
    </Stack>
  );
};

export const AddPayment = () => {
  return (
    <Stack>
      <StackScreen.Screen
        name="Class_Selection"
        component={Class_Selection}
        options={{headerShown: false}}
      />
      <StackScreen.Screen
        name="Fees_Overview"
        component={Fees_Overview}
        options={{headerShown: false}}
      />
      <StackScreen.Screen
        name="Provide_Consent"
        component={Provide_Consent}
        options={{headerShown: false}}
      />
      <StackScreen.Screen
        name="Additional_Sections"
        component={Additional_Sections}
        options={{headerShown: false}}
      />
      <StackScreen.Screen
        name="Pay"
        component={Pay}
        options={{headerShown: false}}
      />
      <StackScreen.Screen
        name="Confirmation"
        component={Confirmation}
        options={{headerShown: false}}
      />
    </Stack>
  );
};
