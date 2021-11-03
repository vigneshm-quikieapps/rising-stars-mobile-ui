import * as Action from "../actiontype"

const memberstate = {
    memberdata: '',
    sagaerror: '',
    error: '',
    isloading: false,
}

export const memberData = (state = memberstate, action) => {
    switch (action.type) {
        case Action.USER_GET_MEMBER_SUCCESS:
            return {
                ...state,
                memberData: action.data.docs,
                error: action.data.message,
                isloading: false,
            }
        case Action.USER_GET_MEMBER_FAILED:
            return {
                ...state,
                sagaerror: action.error,
                isloading: false,
            }
        case Action.USER_GET_MEMBER:
            return {
                ...state,
                isloading: true
            }
        default:
            return state
    }
}

const memberclassState = {
    error: '',
    sagaerror: '',
    isloading: false,
    classData: ''
}

export const memberClassData = (state = memberclassState, action) => {
    switch (action.type) {
        case Action.USER_GET_MEMBER_CLASS_DATA_SUCCESS:
            return {
                ...state,
                classData: action.data,
                isloading: false
            }
        case Action.USER_GET_MEMBER_CLASS_DATA_FAILED:
            return {
                ...state,
                error: action.error,
                isloading: false
            }
        case Action.USER_GET_MEMBER_CLASS_DATA:
            return{
                ...state,
                isloading:true,
            }    
        default:
            return state
    }
}