import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import * as action from '../actiontype'

function* handlechildData(){
    yield put({type:action.USER_ADDCHILD,payload:payload})
}

export function* watchchildData(){
    yield takeEvery(action.USER_ADDCHILD,handlechildData)
}