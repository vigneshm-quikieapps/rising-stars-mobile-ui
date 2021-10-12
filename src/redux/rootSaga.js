import { all } from "redux-saga/effects"
import { watcherClubSaga, watcherClassSaga,watcherSessionSaga } from "./sagas/enrol"

export default function* rootSaga() {
    yield all([watcherClubSaga(), watcherClassSaga(),watcherSessionSaga()])
}

