import * as action from '../actiontype'

export const PostCode = (data) => {
  
    return{
        type:action.USER_GET_POST_CODE,
        payload:data
    }
}



export const loginUserData = (data) => {

    return {
        type: action.USER_LOGIN,
        payload: { data }
    }
}