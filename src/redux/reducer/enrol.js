import * as Action from "../actiontype"

const childState = {
    fullName: '',
    dob: '',
    gender: '',
    name: '',
    contactNumber: '',
    relationship: '',
    age: '',
    payload: ''
}
export const childData = (state = childState, action) => {
    switch (action.type) {
        case Action.USER_ADDCHILD:
            return {
                ...state,
                fullName: action.payload.fullName,
                dob: action.payload.dob,
                gender: action.payload.gender,
                name: action.payload.name,
                contactNumber: action.payload.contactNumber,
                relationship: action.payload.relationship,
                age: action.payload.age,
                payload: action.payload
            }
        default:
            return state
    }
}

const clubstate = {
    clubData: []
}

export const clubname = (state = clubstate, action) => {
    switch (action.type) {
        case Action.USER_GET_CLUB_SUCCESS:
            return {
                ...state,
                clubData: action.payload
            }

        default:
            return state
    }
}

const classtate = {
    classtate: [],
    error: ''
}

export const classname = (state = classtate, action) => {
    
    switch (action.type) {
        case Action.USER_GET_CLASS_SUCCESS:
            return {
                ...state,
                classtate: action.payload
            }
        case Action.USER_GET_CLASS_FAILED:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}

const sessionState = {
    sessionState:[],
    error: ''
}

export const sessionlist = (state = sessionState, action) => {
    console.log('reducer ----->',action)
    switch (action.type){
        case Action.USER_GET_SESSION_SUCCESS:
            return{
                ...state,
                sessionState:action.payload
            }
            default:
                return state
    }
}