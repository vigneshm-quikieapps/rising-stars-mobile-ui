import { combineReducers } from "redux";
import { childData, clubname,classname,sessionlist } from "./reducer/enrol";
import {LoginData,Postcode} from './reducer/auth'

const rootReducer = combineReducers({
    LoginData,
    childData,
    clubname,
    classname,
    sessionlist,
    Postcode
})

export default rootReducer