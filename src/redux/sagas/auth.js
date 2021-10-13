import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import * as Action from '../actiontype'

import { fetchLogin, fetchPostCode } from '../service/request'

function* handlePostcode(action) {
   
    try {
        const postcode = yield call(fetchPostCode, action.payload)
        yield put({type:Action.USER_GET_POST_CODE_SUCCESS,payload:postcode})
    }catch(error){
        yield put({type: Action.USER_GET_POST_CODE_FAILED,payload:error.message})
    }
}

export function* watcherPostcode(){
    yield takeEvery(Action.USER_GET_POST_CODE,handlePostcode)
}

function* handleLogin(action) {

    try {
        const login = yield call(fetchLogin, action.payload.data)
        yield put({ type: Action.USER_LOGIN_SUCCESS, payload: login })
    } catch (error) {
        yield put({ type: Action.USER_LOGIN_ERROR, payload: error.message })
    }
}

export function* watcherLoginSaga() {
    yield takeEvery(Action.USER_LOGIN, handleLogin)
}