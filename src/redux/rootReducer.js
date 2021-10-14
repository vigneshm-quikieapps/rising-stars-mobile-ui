import { combineReducers } from "redux";
import { childData, clubname,classname,sessionlist } from "./reducer/enrol";
import {LoginData,Postcode,Postcodedata} from './reducer/auth'

const rootReducer = combineReducers({
    LoginData,
    childData,
    clubname,
    classname,
    sessionlist,
    Postcode,
    Postcodedata
})

export default rootReducer