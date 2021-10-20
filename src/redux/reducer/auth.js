import * as Action from '../actiontype'

const postcodeState = {
    postcode: [],
    isLoading: false,
    error: ''
}

export const Postcode = (state = postcodeState, action) => {

    switch (action.type) {
        case Action.USER_GET_POST_CODE_SUCCESS:
            return {
                ...state,
                postcode: action.payload,
                error:action.payload,
                isloading: false
            }
        case Action.USER_GET_POST_CODE_FAILED:
            return {
                ...state,
                error: action.error,
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
    size: 0

}

export const Postcodedata = (state = postPassState, action) => {

    switch (action.type) {
        case Action.USER_POST_CODE_DATA_PASS:
            return {
                ...state,
                postdata: action.payload,
                size: action.size
            }
        default:
            return state
    }
}

const RegisterState = {
    isloading: false,
    error: '',
    status: ''
}

export const RegisterData = (state = RegisterState, action) => {
    console.log('reducer ------>', action)
    switch (action.type) {
        case Action.USER_REGISTER_SUCCESS:
            return {
                ...state,
                status: action.payload,
                error:action.payload,
                isloading: false
            }
        case Action.USER_REGISTER_ERROR:
            return {
                ...state,
                error: action.error,
                isloading: false
            }
        case Action.USER_REGISTER:
            return {
                ...state,
                isloading: true
            }
        default:
            return state
    }
}

const loginState = {
    accessToken: '',
    refreshToken: '',
    isloading: false,
    sagaerror: '',
    networkerror:''
}

export const LoginData = (state = loginState, action) => {

    switch (action.type) {
        case Action.USER_LOGIN_SUCCESS:
            return {
                ...state,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                networkerror:action.payload.message,
                isloading: false,      
            }
        case Action.USER_LOGIN_ERROR:
            return {
                ...state,
                error: action.error,
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