import { combineReducers } from "redux";
import { childData, clubname,classname,sessionlist } from "./reducer/enrol";

const rootReducer = combineReducers({
    childData,
    clubname,
    classname,
    sessionlist
})

export default rootReducer