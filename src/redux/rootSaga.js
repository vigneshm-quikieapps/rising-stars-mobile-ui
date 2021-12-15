import {all} from 'redux-saga/effects';
import {watcherLoginSaga, watcherPostcode, watcherRegister} from './sagas/auth';
import {
  watcherClubSaga,
  watcherClassSaga,
  watcherSessionSaga,
  watcherClubfinance,
  watcherAddChild,
} from './sagas/enrol';
import {
  watcherMemberSaga,
  watcherMemberClassSaga,
  watcherMemberClasses,
} from './sagas/home';

export default function* rootSaga() {
  yield all([
    watcherLoginSaga(),
    watcherClubSaga(),
    watcherClassSaga(),
    watcherSessionSaga(),
    watcherPostcode(),
    watcherRegister(),
    watcherClubfinance(),
    watcherMemberSaga(),
    watcherMemberClassSaga(),
    watcherMemberClasses(),
    watcherAddChild(),
  ]);
}
