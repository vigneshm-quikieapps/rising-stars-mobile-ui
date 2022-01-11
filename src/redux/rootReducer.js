import {combineReducers} from 'redux';
import {
  childData,
  clubname,
  classname,
  sessionlist,
  clubfinance,
  addProvidedata,
} from './reducer/enrol';
import {
  LoginData,
  Postcode,
  Postcodedata,
  RegisterData,
  ForgetPasswordData,
  ResetPasswordData,
} from './reducer/auth';
import {
  memberData,
  memberClassData,
  currentMemberData,
  currentMemberAttendance,
} from './reducer/home';

const rootReducer = combineReducers({
  LoginData,
  childData,
  clubname,
  classname,
  sessionlist,
  Postcode,
  Postcodedata,
  RegisterData,
  clubfinance,
  addProvidedata,
  memberData,
  memberClassData,
  ForgetPasswordData,
  ResetPasswordData,
  currentMemberData,
  currentMemberAttendance,
});

export default rootReducer;
