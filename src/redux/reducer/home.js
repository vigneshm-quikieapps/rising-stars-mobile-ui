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
                memberData: action.payload,
                error: action.message,
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