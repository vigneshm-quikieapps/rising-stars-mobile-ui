import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import * as Action from '../actiontype'

import { fetchLogin } from '../service/request'

function* handleLogin(action) {
   
    try {
        const login = yield call(fetchLogin,action.payload.data)
        yield put({ type: Action.USER_LOGIN_SUCCESS, payload: login })
    } catch (error) {
        yield put({ type: Action.USER_LOGIN_ERROR, payload: error.message })
    }
}

export function* watcherLoginSaga(){
    yield takeEvery(Action.USER_LOGIN,handleLogin)
}