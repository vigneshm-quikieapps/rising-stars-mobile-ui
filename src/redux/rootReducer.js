import { combineReducers } from "redux";
import { childData, clubname, classname, sessionlist, clubfinance, addProvidedata } from "./reducer/enrol";
import { LoginData, Postcode, Postcodedata, RegisterData } from './reducer/auth'
import { memberData } from './reducer/home'
const rootReducer = combineReducers({
    LoginData,
    childData,
    clubname,
    classname,
    sessionlist,
    Postcode,
    Postcodedata,
    RegisterData,
    clubfinance,
    addProvidedata,
    memberData
})

export default rootReducer