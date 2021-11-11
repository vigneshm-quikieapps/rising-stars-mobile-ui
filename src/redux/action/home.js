import * as action from '../actiontype'

export const getmemberData = (token) =>{  
    return{
        type:action.USER_GET_MEMBER,
        payload:token
    }
} 

export const getmemberClass = (id) => {
    return{
        type:action.USER_GET_MEMBER_CLASS_DATA,
        payload:id
    }
}