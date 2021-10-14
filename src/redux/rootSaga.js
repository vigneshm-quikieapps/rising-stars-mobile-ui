import { all } from "redux-saga/effects"
import { watcherLoginSaga,watcherPostcode } from "./sagas/auth"
import { watcherClubSaga, watcherClassSaga, watcherSessionSaga } from "./sagas/enrol"

export default function* rootSaga() {
    yield all([
        watcherLoginSaga(),
        watcherClubSaga(),
        watcherClassSaga(),
        watcherSessionSaga(),
        watcherPostcode()
    ])
}

