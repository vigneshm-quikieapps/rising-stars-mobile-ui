import * as Action from '../actiontype'

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
                isloading:false
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