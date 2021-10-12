import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import * as Action from '../actiontype'

import { fetchclubName, fetchclassName,fetchSessionList } from '../service/request'

function* handleGetClub() {
    try {
        const club = yield call(fetchclubName)

        yield put({ type: Action.USER_GET_CLUB_SUCCESS, payload: club })
    } catch (error) {
        yield put({ type: Action.USER_GET_CLUB_FAILED, message: error.message })
    }
}

export function* watcherClubSaga() {
    yield takeEvery(Action.USER_GET_CLUB_NAME, handleGetClub)
}

function* handleGetClass(action) {
    
    try {
        const classes = yield call(fetchclassName,action.payload)
        yield put({ type: Action.USER_GET_CLASS_SUCCESS, payload: classes })
        
    } catch (error) {
        yield put({ type: Action.USER_GET_CLASS_FAILED, payload: error.message })
    }
   
}

export function* watcherClassSaga(){
    yield takeEvery(Action.USER_GET_CLASS_NAME,handleGetClass)
}

function* handleGetSession(action){
    console.log("saga------------------->",action)
    try{
        const session = yield call(fetchSessionList,action.payload)
        yield put({type:Action.USER_GET_SESSION_SUCCESS,payload:session})
    }catch(error){
        yield put({type:Action.USER_GET_SESSION_FAILED,payload:error.message})
    }
}

export function* watcherSessionSaga(){
    yield takeEvery(Action.USER_GET_SESSION_LIST,handleGetSession)
}