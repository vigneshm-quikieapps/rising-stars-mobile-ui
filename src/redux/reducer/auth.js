import * as Action from '../actiontype'
import { storeLocalData, getLocalData } from '../../utils/LocalStorage'
import { setLocale } from 'yup'


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
                error: action.payload,
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
   
    switch (action.type) {
        case Action.USER_REGISTER_SUCCESS:
            return {
                ...state,
                status: action.payload,
                error: action.payload,
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
    networkerror: '',
    user:'',
}

export const LoginData = (state = loginState, action) => {

    switch (action.type) {
        case Action.USER_LOGIN_SUCCESS:
            storeLocalData('refreshToken', action.payload.refreshToken)
            storeLocalData('accessToken', action.payload.accessToken)
            storeLocalData('user',action.payload.user,true)
            console.log(action.payload)
            return {
                ...state,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                user:action.payload.user,
                networkerror: action.payload.message,              
                isloading: false,
            }
        case Action.USER_LOGIN_ERROR:
            return {
                ...state,
                sagaerror: action.error,
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