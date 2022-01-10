import {call, put, takeEvery} from 'redux-saga/effects';

import * as Action from '../action-types';

import {
  addChild,
  fetchclubName,
  fetchclassName,
  fetchSessionList,
  fetchClubFinanc,
  regularEnrollment,
} from '../service/request';

function* handleGetClub(params) {
  try {
    const club = yield call(fetchclubName);
    yield put({type: Action.USER_GET_CLUB_SUCCESS, payload: club});
    if (params.payload) {
      yield call(params.payload.callback);
    }
  } catch (error) {
    yield put({type: Action.USER_GET_CLUB_FAILED, message: error.message});
  }
}

export function* watcherClubSaga() {
  yield takeEvery(Action.USER_GET_CLUB_NAME, handleGetClub);
}

function* handleGetClass(action) {
  try {
    const classes = yield call(fetchclassName, action.payload);
    yield put({type: Action.USER_GET_CLASS_SUCCESS, payload: classes});
  } catch (error) {
    yield put({type: Action.USER_GET_CLASS_FAILED, payload: error.message});
  }
}

export function* watcherClassSaga() {
  yield takeEvery(Action.USER_GET_CLASS_NAME, handleGetClass);
}

function* handleGetSession(action) {
  try {
    const session = yield call(fetchSessionList, action.payload);
    yield put({type: Action.USER_GET_SESSION_SUCCESS, payload: session});
  } catch (error) {
    yield put({type: Action.USER_GET_SESSION_FAILED, error: error.message});
  }
}

export function* watcherSessionSaga() {
  yield takeEvery(Action.USER_GET_SESSION_LIST, handleGetSession);
}

function* handleClubfinance(action) {
  try {
    const finance = yield call(fetchClubFinanc, action.payload);
    yield put({type: Action.USER_GET_CLUB_FINANCE_SUCCESS, payload: finance});
  } catch (error) {
    yield put({
      type: Action.USER_GET_CLUB_FINANCE_FAILED,
      error: error.message,
    });
  }
}

export function* watcherClubfinance() {
  yield takeEvery(Action.USER_GET_CLUB_FINANCE, handleClubfinance);
}

function* handleAddChild(action) {
  try {
    const child = yield call(addChild, action.payload.data);
    yield put({type: Action.USER_ADD_CHILD_SUCCEDED, payload: child});
    yield call(action.payload.callback);
  } catch (error) {
    yield put({
      type: Action.USER_ADD_CHILD_FAILED,
      error: error.message,
    });
  }
}

export function* watcherAddChild() {
  yield takeEvery(Action.USER_ADD_CHILD, handleAddChild);
}
//calling enrollment api
function* handleEnrollChild(action) {
  try {
    console.log('inside sagas');
    const enrolledChild = yield call(regularEnrollment, action.payload);
    console.log('enrolledChild: ', enrolledChild);
    yield put({
      type: Action.USER_ENROLL_CHILD_SUCCEDED,
      payload: enrolledChild,
    });
  } catch (error) {
    yield put({
      type: Action.USER_ENROLL_CHILD_FAILED,
      payload: error.message,
    });
  }
}

export function* watcherEnrollChild() {
  yield takeEvery(Action.USER_ENROLL_CHILD, handleEnrollChild);
}
