import { combineReducers } from "redux";
import { childData, clubname,classname,sessionlist } from "./reducer/enrol";
import {LoginData} from './reducer/auth'

const rootReducer = combineReducers({
    LoginData,
    childData,
    clubname,
    classname,
    sessionlist
})

export default rootReducer