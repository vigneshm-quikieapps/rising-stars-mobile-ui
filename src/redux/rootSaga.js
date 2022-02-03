import {all} from 'redux-saga/effects';
import {
  watcherLoginSaga,
  watcherPostcode,
  watcherRegister,
  watcherForgetPassword,
  watcherResetPassword,
} from './sagas/auth';
import {
  watcherClubSaga,
  watcherClassSaga,
  watcherSessionSaga,
  watcherClubfinance,
  watcherAddChild,
  watcherEnrollChild,
  watcherSessionAttendance,
} from './sagas/enrol';
import {
  watcherMemberSaga,
  watcherMemberClassSaga,
  watcherMemberClasses,
  watcherMemberActivity,
  watcherBusinessNameSaga,
} from './sagas/home';

export default function* rootSaga() {
  yield all([
    watcherSessionAttendance(),
    watcherMemberActivity(),
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
    watcherEnrollChild(),
    watcherForgetPassword(),
    watcherResetPassword(),
    watcherBusinessNameSaga(),
  ]);
}
