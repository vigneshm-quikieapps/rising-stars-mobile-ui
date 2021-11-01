import { combineReducers } from "redux";
import { childData, clubname, classname, sessionlist } from "./reducer/enrol";
import { LoginData, Postcode, Postcodedata, RegisterData } from './reducer/auth';
import { ProgReducer } from './reducer/progReducer'

const rootReducer = combineReducers({
    LoginData,
    childData,
    clubname,
    classname,
    sessionlist,
    Postcode,
    Postcodedata,
    RegisterData,
    ProgReducer
})

export default rootReducer