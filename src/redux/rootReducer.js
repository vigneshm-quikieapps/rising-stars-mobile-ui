import {combineReducers} from 'redux';
import {
  childData,
  clubname,
  classname,
  sessionlist,
  clubfinance,
  addProvidedata,
  enrollChild,
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
  currentMemberActivity,
  businessData,
  evaluationData,
} from './reducer/home';

const rootReducer = combineReducers({
  currentMemberActivity,
  LoginData,
  childData,
  clubname,
  classname,
  sessionlist,
  businessData,
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
  evaluationData,
  enrollChild,
});

export default rootReducer;
