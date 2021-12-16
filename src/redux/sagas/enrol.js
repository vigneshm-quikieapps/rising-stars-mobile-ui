import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';

import * as Action from '../action-types';

import {
  addChild,
  fetchclubName,
  fetchclassName,
  fetchSessionList,
  fetchClubFinanc,
} from '../service/request';

function* handleGetClub(params) {
  try {
    const club = yield call(fetchclubName);
    yield put({type: Action.USER_GET_CLUB_SUCCESS, payload: club});
    yield call(params.payload.callback);
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
    console.log('DATA: ', action.payload.data);
    const child = yield call(addChild, action.payload.data);
    console.log('CHILD: ', child);
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
