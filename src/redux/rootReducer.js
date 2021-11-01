import {combineReducers} from 'redux';
import {ProgReducer} from './reducer/progReducer';

import {
  childData,
  clubname,
  classname,
  sessionlist,
  clubfinance,
  addProvidedata,
} from './reducer/enrol';
import {LoginData, Postcode, Postcodedata, RegisterData} from './reducer/auth';
import {memberData} from './reducer/home';
const rootReducer = combineReducers({
  LoginData,
  childData,
  clubname,
  classname,
  sessionlist,
  Postcode,
  Postcodedata,
  RegisterData,
  ProgReducer,
  clubfinance,
  addProvidedata,
  memberData,
});

export default rootReducer;
