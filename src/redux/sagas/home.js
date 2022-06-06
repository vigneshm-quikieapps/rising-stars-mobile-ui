import {call, put, takeEvery} from 'redux-saga/effects';

import * as Action from '../action-types';

import {
  fetchMemberData,
  fetchMemberClassData,
  fetchClasses,
  fetchActivityOfMemberInSession,
  fetchParticularBusiness,
  fetchEvaluationById,
  fetchBillsOfMember,
} from '../service/request';

function* handleGetMember(action) {
  try {
    const member = yield call(fetchMemberData, action.payload);
    console.log('inside get member Saga', member, action.payload);
    yield put({type: Action.USER_GET_MEMBER_SUCCESS, data: member});
  } catch (error) {
    yield put({type: Action.USER_GET_MEMBER_FAILED, error: error});
  }
}
export function* watcherMemberSaga() {
  yield takeEvery(Action.USER_GET_MEMBER, handleGetMember);
}

function* handleGetBusinessName(action) {
  try {
    console.log('action', action.payload);
    const business = yield call(fetchParticularBusiness, action.payload);
    yield put({
      type: Action.USER_GET_CURRENT_BUSINESS_NAME_SUCCESS,
      data: business,
    });
  } catch (error) {
    yield put({
      type: Action.USER_GET_CURRENT_BUSINESS_NAME_FAILED,
      error: error,
    });
  }
}
export function* watcherBusinessNameSaga() {
  yield takeEvery(Action.USER_GET_CURRENT_BUSINESS_NAME, handleGetBusinessName);
}

function* handleGetMemberClass(action) {
  try {
    const classes = yield call(fetchMemberClassData, action.payload);
    yield put({type: Action.USER_GET_MEMBER_CLASS_DATA_SUCCESS, data: classes});
  } catch (error) {
    yield put({type: Action.USER_GET_MEMBER_FAILED, error: error});
  }
}

export function* watcherMemberClassSaga() {
  yield takeEvery(Action.USER_GET_MEMBER_CLASS_DATA, handleGetMemberClass);
}

function* handleGetMemberBills(action) {
  // console.log('inside get bills saga', action);
  try {
    const classes = yield call(fetchBillsOfMember, action.payload);
    //console.log('bills=================>', action.payload);

    yield put({type: Action.USER_GET_MEMBER_BILLS_SUCCESS, data: classes});
  } catch (error) {
    yield put({type: Action.USER_GET_MEMBER_BILLS_FAILED, error: error});
  }
}

export function* watcherMemberBillsSaga() {
  yield takeEvery(Action.USER_GET_MEMBER_BILLS, handleGetMemberBills);
}

function* handleGetMemberClasses(action) {
  try {
    const classes = yield call(fetchClasses, action.payload);
    yield put({type: Action.USER_GET_CLASSES_SUCCESS, data: classes});
  } catch (error) {
    yield put({type: Action.USER_GET_CLASS_FAILED, error: error});
  }
}

export function* watcherMemberClasses() {
  yield takeEvery(Action.USER_GET_CLASSES, handleGetMemberClasses);
}

function* handleGetMemberActivity(action) {
  try {
    const classes = yield call(fetchActivityOfMemberInSession, action.payload);

    yield put({
      type: Action.USER_GET_CURRENT_MEMBER_ACTIVITY_SUCCESS,
      data: classes,
    });
  } catch (error) {
    console.log('inside getmembers activity error', error);
    yield put({
      type: Action.USER_GET_CURRENT_MEMBER_ACTIVITY_FAILURE,
      error: error,
    });
  }
}

export function* watcherMemberActivity() {
  yield takeEvery(
    Action.USER_GET_CURRENT_MEMBER_ACTIVITY,
    handleGetMemberActivity,
  );
}

function* handleGetEvaluation(action) {
  try {
    const classes = yield call(fetchEvaluationById, action.payload);
    yield put({
      type: Action.USER_GET_CURRENT_EVALUATION_NAME_SUCCESS,
      data: classes,
    });
  } catch (error) {
    yield put({
      type: Action.USER_GET_CURRENT_EVALUATION_NAME_FAILURE,
      error: error,
    });
  }
}

export function* watcherGetEvaluation() {
  yield takeEvery(Action.USER_GET_CURRENT_EVALUATION_NAME, handleGetEvaluation);
}
