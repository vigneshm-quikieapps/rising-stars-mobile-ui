import { all } from "redux-saga/effects"
import { watcherLoginSaga,watcherPostcode,watcherRegister } from "./sagas/auth"
import { watcherClubSaga, watcherClassSaga, watcherSessionSaga } from "./sagas/enrol"
import { watcherGetUserProgressSaga } from "./sagas/progSagas"

export default function* rootSaga() {
    yield all([
        watcherLoginSaga(),
        watcherClubSaga(),
        watcherClassSaga(),
        watcherSessionSaga(),
        watcherPostcode(),
        watcherRegister(),
        watcherGetUserProgressSaga()
    ])
}

