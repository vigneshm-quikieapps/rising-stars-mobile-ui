import * as action from '../actiontype'

export const getmemberData = (token) =>{
console.log('idaction :', token);
    
    return{
        type:action.USER_GET_MEMBER,
        payload:token
    }
} 
