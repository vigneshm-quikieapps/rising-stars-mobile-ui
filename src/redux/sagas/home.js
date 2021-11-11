import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import * as Action from '../actiontype'

import { fetchMemberData,fetchMemberClassData } from '../service/request'

function* handleGetMember(action){
console.log('action saga :', action);
    try{
        const member = yield call(fetchMemberData,action.payload)
        yield put({type:Action.USER_GET_MEMBER_SUCCESS,data:member})
    }catch(error){
        yield put({type:Action.USER_GET_MEMBER_FAILED,error:error})
    }
}
export function* watcherMemberSaga() {
    yield takeEvery(Action.USER_GET_MEMBER,handleGetMember)
}

function* handleGetMemberClass(action){
    try{
        const classes = yield call(fetchMemberClassData,action.payload)
        yield put({type:Action.USER_GET_MEMBER_CLASS_DATA_SUCCESS,data:classes})
    }catch(error){
        yield put({type:Action.USER_GET_MEMBER_FAILED,error:error})
    }
}

export function* watcherMemberClassSaga(){
    yield takeEvery(Action.USER_GET_MEMBER_CLASS_DATA,handleGetMemberClass)
}