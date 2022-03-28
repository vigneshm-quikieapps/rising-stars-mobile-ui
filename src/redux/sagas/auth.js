import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {storeLocalData} from '../../utils/LocalStorage';
import * as Action from '../action-types';

import {
  fetchLogin,
  fetchPostCode,
  fetchRegister,
  forgetPassword,
  resetPassword,
} from '../service/request';

function* handlePostcode(action) {
  try {
    const postcode = yield call(fetchPostCode, action.payload);
    yield put({type: Action.USER_GET_POST_CODE_SUCCESS, payload: postcode});
  } catch (error) {
    yield put({type: Action.USER_GET_POST_CODE_FAILED, error: error.message});
  }
}

export function* watcherPostcode() {
  yield takeEvery(Action.USER_GET_POST_CODE, handlePostcode);
}

function* handleRegister(action) {
  // console.log('payload in auth', action.payload);
  // try {
  //   const register = yield call(fetchRegister, action.payload);
  //   if (register.message === 'created successfully.') {
  //     yield put({type: Action.USER_REGISTER_SUCCESS, payload: register});
  //   } else {
  //     throw new Error(register.message);
  //   }
  // } catch (error) {
  //   yield put({type: Action.USER_REGISTER_ERROR, error: error.message});
  // }
}

export function* watcherRegister() {
  yield takeEvery(Action.USER_REGISTER, handleRegister);
}

const save = async login => {
  await storeLocalData('usercred', login.user._id);
};
function* handleLogin(action) {
  try {
    const login = yield call(fetchLogin, action.payload.data);
    console.log('Login saga', login);
    save(login);
    yield put({type: Action.USER_LOGIN_SUCCESS, payload: login});
  } catch (error) {
    yield put({type: Action.USER_LOGIN_ERROR, error: error.message});
  }
}

export function* watcherLoginSaga() {
  yield takeEvery(Action.USER_LOGIN, handleLogin);
}

function* handleForgetPassword(action) {
  try {
    const forgetPass = yield call(forgetPassword, action.payload);
    forgetPass['mobileNo'] = action.payload.mobileNo;
    forgetPass['email'] = action.payload.email;

    if (
      forgetPass.message ===
      'Reset Password OTP has been sent to your mobile number.'
    ) {
      yield put({
        type: Action.USER_FORGOT_PASSWORD_SUCCESS,
        payload: forgetPass,
      });
    } else {
      throw new Error(forgetPass.message);
    }
  } catch (error) {
    yield put({type: Action.USER_FORGOT_PASSWORD_ERROR, error: error.message});
  }
}

export function* watcherForgetPassword() {
  yield takeEvery(Action.USER_FORGOT_PASSWORD, handleForgetPassword);
}

function* handleResetPassword(action) {
  try {
    const resetPass = yield call(resetPassword, action.payload);

    if (resetPass.message === 'Password has been reset successfully') {
      yield put({
        type: Action.USER_RESET_PASSWORD_SUCCESS,
        payload: resetPass,
      });
    } else {
      throw new Error(resetPass.message);
    }
  } catch (error) {
    yield put({type: Action.USER_RESET_PASSWORD_ERROR, error: error.message});
  }
}
export function* watcherResetPassword() {
  yield takeEvery(Action.USER_RESET_PASSWORD, handleResetPassword);
}
