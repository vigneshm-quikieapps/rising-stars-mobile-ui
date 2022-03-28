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
  watcherSessionUpcomingAttendance,
} from './sagas/enrol';
import {
  watcherMemberSaga,
  watcherMemberClassSaga,
  watcherMemberClasses,
  watcherGetEvaluation,
  watcherMemberActivity,
  watcherBusinessNameSaga,
  watcherMemberBillsSaga,
} from './sagas/home';

export default function* rootSaga() {
  yield all([
    watcherSessionAttendance(),
    watcherSessionUpcomingAttendance(),
    watcherLoginSaga(),
    watcherMemberBillsSaga(),
    watcherClubSaga(),
    watcherClassSaga(),
    watcherSessionSaga(),
    watcherPostcode(),
    watcherGetEvaluation(),
    watcherMemberActivity(),
    watcherBusinessNameSaga(),
    watcherRegister(),
    watcherClubfinance(),
    watcherMemberSaga(),
    watcherMemberClassSaga(),
    watcherMemberClasses(),
    watcherAddChild(),
    watcherEnrollChild(),
    watcherForgetPassword(),
    watcherResetPassword(),
  ]);
}
