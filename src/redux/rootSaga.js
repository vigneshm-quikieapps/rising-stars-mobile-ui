import { all } from "redux-saga/effects"
import { watcherLoginSaga,watcherPostcode,watcherRegister } from "./sagas/auth"
import { watcherClubSaga, watcherClassSaga, watcherSessionSaga } from "./sagas/enrol"
import { watcherGetUserProgressSaga } from "./sagas/progSagas"
import { watcherClubSaga, watcherClassSaga, watcherSessionSaga, watcherClubfinance } from "./sagas/enrol"
import {watchMemberSaga} from './sagas/home'

export default function* rootSaga() {
    yield all([
        watcherLoginSaga(),
        watcherClubSaga(),
        watcherClassSaga(),
        watcherSessionSaga(),
        watcherPostcode(),
        watcherRegister(),
        watcherGetUserProgressSaga(),
        watcherClubfinance(),
        watchMemberSaga()
    ])
}

