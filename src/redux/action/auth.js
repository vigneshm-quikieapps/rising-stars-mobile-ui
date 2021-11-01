import * as Action from '../actiontype'

export const PostCode = (data) => {

    return {
        type: Action.USER_GET_POST_CODE,
        payload: data,

    }
}

export const PostDataPass = (data, size) => {

    return {
        type: Action.USER_POST_CODE_DATA_PASS,
        payload: data,
        size: size
    }
}


export const loginUserData = (data) => {

    return {
        type: Action.USER_LOGIN,
        payload: { data }
    }
}

export const RegisterData = (data) =>{
    
    return{
        type:Action.USER_REGISTER,
        payload:data
    }
}