import {combineReducers} from 'redux';
import {
  childData,
  clubname,
  classname,
  sessionlist,
  clubfinance,
  addAdditionaldata,
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
  evaluationData,
  businessData,
} from './reducer/home';

const rootReducer = combineReducers({
  LoginData,
  childData,
  clubname,
  businessData,
  evaluationData,
  classname,
  sessionlist,
  Postcode,
  Postcodedata,
  RegisterData,
  currentMemberActivity,
  clubfinance,
  addProvidedata,
  memberData,
  memberClassData,
  ForgetPasswordData,
  ResetPasswordData,
  currentMemberData,
  currentMemberAttendance,
  addAdditionaldata,
  enrollChild,
});

export default rootReducer;
