import {all} from 'redux-saga/effects'
import { watchchildData } from './sagas/enrol'


export default function* rootSaga(){
    yield all([
            watchchildData(), 
    ])
}