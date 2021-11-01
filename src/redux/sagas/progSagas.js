import {
  GET_USER_PROGRESS_FAILED,
  GET_USER_PROGRESS_SAGA,
  GET_USER_PROGRESS_SUCCESS,
} from '../actiontype';
import {fetchGetUserProgress} from '../service/request';
import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';

function* handleGetUserProgress(action) {
  console.log('handlegetud');
  try {
    const user_Progress = yield call(fetchGetUserProgress, action.payload);
    console.log(user_Progress.docs);
    yield put({type: GET_USER_PROGRESS_SUCCESS, payload: user_Progress.docs});
  } catch (error) {
    yield put({type: GET_USER_PROGRESS_FAILED, payload: error.message});
  }
}
export function* watcherGetUserProgressSaga() {
  yield takeEvery(GET_USER_PROGRESS_SAGA, handleGetUserProgress);
}
