import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {storeLocalData} from '../../utils/LocalStorage';
import * as Action from '../action-types';

import {fetchLogin, fetchPostCode, fetchRegister} from '../service/request';

function* handlePostcode(action) {
  try {
    const postcode = yield call(fetchPostCode, action.payload);
    console.log('Postcode Saga:', postcode);
    yield put({type: Action.USER_GET_POST_CODE_SUCCESS, payload: postcode});
  } catch (error) {
    yield put({type: Action.USER_GET_POST_CODE_FAILED, error: error.message});
  }
}

export function* watcherPostcode() {
  yield takeEvery(Action.USER_GET_POST_CODE, handlePostcode);
}

function* handleRegister(action) {
  try {
    const register = yield call(fetchRegister, action.payload);
    yield put({type: Action.USER_REGISTER_SUCCESS, payload: register});
  } catch (error) {
    yield put({type: Action.USER_REGISTER_ERROR, error: error.message});
  }
}

export function* watcherRegister() {
  yield takeEvery(Action.USER_REGISTER, handleRegister);
}

const save = async login => {
  console.log('LOGIN: ', login.user._id);
  await storeLocalData('usercred', login.user._id, true);
};
function* handleLogin(action) {
  try {
    const login = yield call(fetchLogin, action.payload.data);
    save(login);
    yield put({type: Action.USER_LOGIN_SUCCESS, payload: login});
  } catch (error) {
    yield put({type: Action.USER_LOGIN_ERROR, error: error.message});
  }
}

export function* watcherLoginSaga() {
  yield takeEvery(Action.USER_LOGIN, handleLogin);
}
