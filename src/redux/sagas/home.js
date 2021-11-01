import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import * as Action from '../actiontype'

import { fetchMemberData } from '../service/request'

function* handleGetMember(action){
console.log('action saga:', action);
    try{
        const member = yield call(fetchMemberData,action.payload)
        yield put({type:Action.USER_GET_MEMBER_SUCCESS,payload:member})
    }catch(error){
        yield put({type:Action.USER_GET_MEMBER_FAILED,error:error})
    }
}
export function* watchMemberSaga() {
    yield takeEvery(Action.USER_GET_MEMBER,handleGetMember)
}