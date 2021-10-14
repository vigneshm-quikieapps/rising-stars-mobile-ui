import * as Action from '../actiontype'

const postcodeState = {
    postcode: [],
    isLoading: false
}

export const Postcode = (state = postcodeState, action) => {

    switch (action.type) {
        case Action.USER_GET_POST_CODE_SUCCESS:
            return {
                ...state,
                postcode: action.payload,
                isloading: false
            }
        case Action.USER_GET_POST_CODE_FAILED:
            return {
                ...state,
                postcode: action.payload,
                isloading: false
            }
        case Action.USER_GET_POST_CODE:
            return {
                ...state,
                isloading: true
            }
        default:
            return state
    }
}

const postPassState = {
    postdata: {},
    size:0
   
}

export const Postcodedata = (state = postPassState, action) => {
    
    switch (action.type) {
        case Action.USER_POST_CODE_DATA_PASS:
            return {
                ...state,
                postdata: action.payload,
                size:action.size
            }
        default:
            return state
    }
}


const loginState = {
    mobile: '',
    password: '',
    accessToken: '',
    refreshToken: '',
    isloading: false,
    error: ''
}

export const LoginData = (state = loginState, action) => {

    switch (action.type) {
        case Action.USER_LOGIN_SUCCESS:
            return {
                ...state,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                isloading: false
            }
        case Action.USER_LOGIN_ERROR:
            return {
                ...state,
                error: action.payload,
                isloading: false
            }
        case Action.USER_LOGIN:
            return {
                ...state,
                isloading: true
            }
        default:
            return state

    }
}